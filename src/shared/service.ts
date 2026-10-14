import { host } from "./host";
import { KaneoError, type RequestInput, type RequestResult } from "./client";

/**
 * The panel's side of the local Kaneo service.
 *
 * Every network call the extension makes now goes through this module: the
 * sandboxed iframe cannot hold a Kaneo credential, so a host-spawned service
 * does. `serviceTransport` is the drop-in `RequestFn` for `createKaneoClient`;
 * the rest drive the device-authorization sign-in and the account state.
 *
 * `host.serviceRequest` refuses with `NO_SERVICE` until the user allows the
 * local service in Settings → Extensions, and with `SERVICE_FAILED` when the
 * process cannot start; both surface here as thrown errors the banner shows.
 */

/** One line describing any thrown value, for a banner or a toast. */
export function describeServiceError(error: unknown): string {
  if (error instanceof KaneoError) return `${error.code}: ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

function readError(json: unknown, fallback: string): string {
  const value = (typeof json === "object" && json !== null ? json : {}) as {
    message?: unknown;
    error?: unknown;
  };
  if (typeof value.message === "string" && value.message) return value.message;
  if (typeof value.error === "string" && value.error) return value.error;
  return fallback;
}

async function serviceCall(
  path: string,
  method: "GET" | "POST" = "POST",
  body?: unknown,
): Promise<{ status: number; body: string }> {
  const result = await host.serviceRequest({
    method,
    path,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  return { status: result.status, body: result.body };
}

async function serviceJson<T>(
  path: string,
  method: "GET" | "POST" = "POST",
  body?: unknown,
): Promise<T> {
  const result = await serviceCall(path, method, body);
  let parsed: unknown;
  try {
    parsed = JSON.parse(result.body);
  } catch {
    throw new KaneoError(
      result.status,
      "SERVICE_BAD_RESPONSE",
      `Kaneo service answered ${result.status} with a body that is not JSON.`,
    );
  }
  if (result.status >= 400) {
    throw new KaneoError(
      result.status,
      "SERVICE_ERROR",
      readError(parsed, `Kaneo service answered ${result.status}.`),
    );
  }
  return parsed as T;
}

/**
 * The `RequestFn` `createKaneoClient` takes. Wraps each call in a `POST
 * /forward` the service unwraps, so a GET still travels as a POST to the
 * loopback and the service performs the real method against Kaneo.
 */
export async function serviceTransport(input: RequestInput): Promise<RequestResult> {
  const result = await host.serviceRequest({
    method: "POST",
    path: "/forward",
    body: JSON.stringify(input),
  });
  let envelope: unknown;
  try {
    envelope = JSON.parse(result.body);
  } catch {
    throw new KaneoError(
      result.status,
      "SERVICE_BAD_RESPONSE",
      "Kaneo service answered with a body that is not JSON.",
    );
  }
  const shaped = (typeof envelope === "object" && envelope !== null ? envelope : {}) as {
    status?: unknown;
    body?: unknown;
  };
  if (typeof shaped.status !== "number") {
    throw new KaneoError(
      result.status >= 400 ? result.status : 502,
      "SERVICE_ERROR",
      readError(envelope, "Kaneo service returned an unexpected answer."),
    );
  }
  return { status: shaped.status, body: typeof shaped.body === "string" ? shaped.body : "" };
}

/* ------------------------------------------------------------------ account */

export interface KaneoAccount {
  connected: boolean;
  account: string;
}

export const kaneoAccount = () => serviceJson<KaneoAccount>("/account", "GET");

/* ---------------------------------------------------------------- sign-in */

export interface DeviceStart {
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string;
  interval: number;
  expiresIn: number;
}

export type DevicePoll =
  | { status: "pending"; interval: number }
  | { status: "connected"; account: string }
  | { status: "expired" }
  | { status: "denied" }
  | { status: "error"; message: string };

export const startDeviceSignIn = (origin: string) =>
  serviceJson<DeviceStart>("/auth/device/start", "POST", { origin });
export const pollDeviceSignIn = () => serviceJson<DevicePoll>("/auth/device/poll", "POST");
export const signOutOfKaneo = () => serviceJson<{ ok: true }>("/auth/signout", "POST");
