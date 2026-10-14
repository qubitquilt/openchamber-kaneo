/**
 * The OpenChamber Kaneo service.
 *
 * The sandboxed panel cannot hold a credential for `host.request` — the host
 * attaches whatever the integration stored, and no guest call can store one —
 * and OpenChamber's guest OAuth needs a client id pasted on the Integrations
 * card. So the part of the `kaneo` CLI that signs in lives here, in the one
 * component that can: a host-spawned local process. It runs Kaneo's device
 * authorization, keeps the access token, and forwards the panel's API calls
 * with it. The panel reaches it only through `host.serviceRequest`.
 *
 * The server to talk to comes from the panel per sign-in (the Integrations
 * card's `server-url` setting), defaulting to `API_ORIGIN`. It is stored with
 * the token, so every later call goes to the server it was signed in against.
 *
 * Contract (`GUEST_SERVICES.md`): bind `OPENCHAMBER_SERVICE_PORT` on 127.0.0.1,
 * require `Authorization: Bearer ${OPENCHAMBER_SERVICE_TOKEN}` on every request,
 * and answer `GET /health` with 200 once ready.
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

import { API_ORIGIN } from "../shared/constants";

const PORT = Number(process.env.OPENCHAMBER_SERVICE_PORT ?? "");
const SERVICE_TOKEN = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";

/** The bundled server when the panel names none. */
const DEFAULT_ORIGIN = API_ORIGIN;

/** The allowlisted device client `kaneo login` uses, so there is no client id to paste. */
const DEVICE_CLIENT_ID = "kaneo-cli";
const DEVICE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
const UPSTREAM_TIMEOUT_MS = 20_000;
const MAX_BODY_BYTES = 2_000_000;

/** Where the token lives. `HOME`/`XDG_CONFIG_HOME` are passed to the service. */
const configHome =
  process.env.XDG_CONFIG_HOME?.trim() || join(process.env.HOME?.trim() || homedir(), ".config");
const AUTH_FILE = join(configHome, "openchamber-kaneo", "auth.json");

if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error("OPENCHAMBER_SERVICE_PORT is missing.");
}

/** A bare https origin (no path, query, hash or credentials), or "" when the value is not one. */
function normalizeOrigin(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") {
    return "";
  }
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return "";
    if (url.username || url.password) return "";
    if (url.pathname !== "/" && url.pathname !== "") return "";
    if (url.search || url.hash) return "";
    return url.origin;
  } catch {
    return "";
  }
}

/* ------------------------------------------------------------------ storage */

interface StoredAuth {
  origin: string;
  accessToken: string;
  account: string;
  savedAt: number;
}

async function readAuth(): Promise<StoredAuth | null> {
  try {
    const raw = JSON.parse(await readFile(AUTH_FILE, "utf8")) as Partial<StoredAuth>;
    if (typeof raw.accessToken === "string" && raw.accessToken) {
      return {
        origin: normalizeOrigin(raw.origin) || DEFAULT_ORIGIN,
        accessToken: raw.accessToken,
        account: typeof raw.account === "string" ? raw.account : "",
        savedAt: typeof raw.savedAt === "number" ? raw.savedAt : 0,
      };
    }
  } catch {
    // Missing or unreadable is signed out, not an error.
  }
  return null;
}

async function writeAuth(auth: StoredAuth | null): Promise<void> {
  if (!auth) {
    await rm(AUTH_FILE, { force: true });
    return;
  }
  await mkdir(dirname(AUTH_FILE), { recursive: true });
  await writeFile(AUTH_FILE, JSON.stringify(auth), { mode: 0o600 });
}

/* --------------------------------------------------------------- device flow */

interface PendingDevice {
  origin: string;
  deviceCode: string;
  interval: number;
  expiresAt: number;
}

interface DeviceStart {
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string;
  interval: number;
  expiresIn: number;
}

type DevicePoll =
  | { status: "pending"; interval: number }
  | { status: "connected"; account: string }
  | { status: "expired" }
  | { status: "denied" }
  | { status: "error"; message: string };

let pending: PendingDevice | null = null;

/** One JSON call to a Kaneo origin. Returns the raw text too, so a non-JSON answer survives. */
async function kaneoJson<T>(
  origin: string,
  path: string,
  init: { method: string; body?: unknown; token?: string },
): Promise<{ status: number; payload: T | null; text: string }> {
  const response = await fetch(`${origin}${path}`, {
    method: init.method,
    headers: {
      Accept: "application/json",
      ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  const text = await response.text();
  let payload: T | null = null;
  try {
    payload = JSON.parse(text) as T;
  } catch {
    payload = null;
  }
  return { status: response.status, payload, text };
}

async function fetchAccount(origin: string, token: string): Promise<string> {
  try {
    const { payload } = await kaneoJson<{ email?: string }>(origin, "/api/user/me", {
      method: "GET",
      token,
    });
    return typeof payload?.email === "string" ? payload.email : "";
  } catch {
    return "";
  }
}

async function startDevice(origin: string): Promise<DeviceStart> {
  const { status, payload } = await kaneoJson<{
    device_code?: string;
    user_code?: string;
    verification_uri?: string;
    verification_uri_complete?: string;
    interval?: number;
    expires_in?: number;
  }>(origin, "/api/auth/device/code", { method: "POST", body: { client_id: DEVICE_CLIENT_ID } });

  if (
    status >= 400 ||
    typeof payload?.device_code !== "string" ||
    typeof payload.user_code !== "string"
  ) {
    throw new Error("Kaneo refused the sign-in request.");
  }
  const userCode = payload.user_code;
  const interval = Number(payload.interval) > 0 ? Number(payload.interval) : 5;
  const expiresIn = Number(payload.expires_in) > 0 ? Number(payload.expires_in) : 600;
  pending = {
    origin,
    deviceCode: payload.device_code,
    interval,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  return {
    userCode,
    verificationUri: payload.verification_uri || `${origin}/device`,
    verificationUriComplete:
      payload.verification_uri_complete ||
      `${origin}/device?user_code=${encodeURIComponent(userCode)}`,
    interval,
    expiresIn,
  };
}

async function pollDevice(): Promise<DevicePoll> {
  if (!pending) {
    return { status: "expired" };
  }
  if (Date.now() > pending.expiresAt) {
    pending = null;
    return { status: "expired" };
  }
  const { origin } = pending;
  const { payload } = await kaneoJson<{
    access_token?: string;
    error?: string;
    error_description?: string;
  }>(origin, "/api/auth/device/token", {
    method: "POST",
    body: {
      grant_type: DEVICE_GRANT,
      device_code: pending.deviceCode,
      client_id: DEVICE_CLIENT_ID,
    },
  });

  if (typeof payload?.access_token === "string" && payload.access_token) {
    const account = await fetchAccount(origin, payload.access_token);
    await writeAuth({ origin, accessToken: payload.access_token, account, savedAt: Date.now() });
    pending = null;
    return { status: "connected", account };
  }

  const error = typeof payload?.error === "string" ? payload.error : "";
  if (error === "authorization_pending") {
    return { status: "pending", interval: pending.interval };
  }
  if (error === "slow_down") {
    pending.interval = Math.min(pending.interval + 5, 30);
    return { status: "pending", interval: pending.interval };
  }
  pending = null;
  if (error === "access_denied") return { status: "denied" };
  if (error === "expired_token") return { status: "expired" };
  const description =
    typeof payload?.error_description === "string" ? payload.error_description : "";
  return { status: "error", message: description || error || "Kaneo refused the sign-in." };
}

/* ------------------------------------------------------------------ forward */

interface ForwardInput {
  method: string;
  path: string;
  query?: Record<string, string>;
  body?: string;
}

const FORWARD_METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);

function forwardError(
  status: number,
  message: string,
  code: string,
): { status: number; body: string } {
  return { status, body: JSON.stringify({ message, code }) };
}

async function forward(input: ForwardInput): Promise<{ status: number; body: string }> {
  const auth = await readAuth();
  if (!auth) {
    return forwardError(401, "Not connected. Sign in to Kaneo.", "DISCONNECTED");
  }
  if (typeof input?.path !== "string" || !FORWARD_METHODS.has(input.method)) {
    return forwardError(400, "Bad request.", "BAD_REQUEST");
  }
  let url: URL;
  try {
    url = new URL(`${auth.origin}${input.path}`);
  } catch {
    return forwardError(400, "Bad path.", "BAD_PATH");
  }
  // A path like `//evil.com` would escape the origin; refuse anything off it.
  if (url.origin !== auth.origin) {
    return forwardError(400, "Bad path.", "BAD_PATH");
  }
  if (input.query) {
    for (const [key, value] of Object.entries(input.query)) {
      if (typeof value === "string") url.searchParams.set(key, value);
    }
  }
  const sendBody = input.method !== "GET" && input.body !== undefined;
  try {
    const response = await fetch(url, {
      method: input.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
        ...(sendBody ? { "Content-Type": "application/json" } : {}),
      },
      body: sendBody ? input.body : undefined,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    return { status: response.status, body: await response.text() };
  } catch {
    return forwardError(502, "Could not reach Kaneo.", "UPSTREAM_FAILED");
  }
}

/* ------------------------------------------------------------------- server */

function send(response: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
}

function readBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        request.destroy();
        reject(new Error("Request body too large."));
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

async function handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.headers.authorization !== `Bearer ${SERVICE_TOKEN}`) {
    send(response, 401, { error: "unauthorized" });
    return;
  }
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  const route = `${request.method} ${pathname}`;

  try {
    if (route === "GET /health") {
      send(response, 200, { ok: true });
      return;
    }
    if (route === "GET /account") {
      const auth = await readAuth();
      send(response, 200, {
        connected: Boolean(auth),
        account: auth?.account ?? "",
        origin: auth?.origin ?? DEFAULT_ORIGIN,
      });
      return;
    }
    if (route === "POST /auth/signout") {
      pending = null;
      await writeAuth(null);
      send(response, 200, { ok: true });
      return;
    }
    if (route === "POST /auth/device/start") {
      const body = JSON.parse((await readBody(request)) || "{}") as { origin?: unknown };
      const raw = typeof body.origin === "string" ? body.origin.trim() : "";
      const origin = raw ? normalizeOrigin(raw) : DEFAULT_ORIGIN;
      if (!origin) {
        send(response, 400, {
          error: "bad-origin",
          message: "The server URL must be an https origin, like https://cloud.kaneo.app.",
        });
        return;
      }
      send(response, 200, await startDevice(origin));
      return;
    }
    if (route === "POST /auth/device/poll") {
      send(response, 200, await pollDevice());
      return;
    }
    if (route === "POST /forward") {
      const input = JSON.parse(await readBody(request)) as ForwardInput;
      send(response, 200, await forward(input));
      return;
    }
    send(response, 404, { error: "not-found" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Service error.";
    send(response, 500, { error: "service-error", message });
  }
}

createServer((request, response) => {
  void handle(request, response);
}).listen(PORT, "127.0.0.1");
