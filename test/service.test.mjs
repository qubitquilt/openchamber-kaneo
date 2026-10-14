import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * The service's loopback contract (`GUEST_SERVICES.md`): bind the given port,
 * require the bearer on every request, answer `/health` with 200, and wrap
 * forwarded calls and service errors in the shape `src/shared/service.ts`
 * expects. No Kaneo call is made here, so the run needs no account or network.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SERVICE = resolve(root, "service/main.js");
const TOKEN = "contract-test-token";

let child;
let port;
let configHome;

function freePort() {
  return new Promise((res, rej) => {
    const server = createServer();
    server.on("error", rej);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => res(address.port));
    });
  });
}

const auth = { Authorization: `Bearer ${TOKEN}` };
const url = (path) => `http://127.0.0.1:${port}${path}`;

async function waitForHealth() {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url("/health"), { headers: auth });
      if (response.status === 200) return true;
    } catch {
      // not up yet
    }
    await new Promise((done) => setTimeout(done, 100));
  }
  return false;
}

before(async () => {
  assert.ok(existsSync(SERVICE), "service/main.js is not built. Run npm run build.");
  configHome = await mkdtemp(join(tmpdir(), "oc-kaneo-service-"));
  port = await freePort();
  child = spawn(process.execPath, [SERVICE], {
    env: {
      ...process.env,
      OPENCHAMBER_SERVICE_PORT: String(port),
      OPENCHAMBER_SERVICE_TOKEN: TOKEN,
      XDG_CONFIG_HOME: configHome,
    },
    stdio: "ignore",
  });
  assert.ok(await waitForHealth(), "the service never answered /health");
});

after(async () => {
  child?.kill("SIGTERM");
  if (configHome) await rm(configHome, { recursive: true, force: true });
});

test("answers /health only with the bearer", async () => {
  const authed = await fetch(url("/health"), { headers: auth });
  assert.equal(authed.status, 200);
  assert.deepEqual(await authed.json(), { ok: true });

  const anon = await fetch(url("/health"));
  assert.equal(anon.status, 401);
});

test("reports a signed-out account without a token", async () => {
  const response = await fetch(url("/account"), { headers: auth });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.connected, false);
  assert.equal(body.account, "");
  assert.match(body.origin, /^https:\/\//);
});

test("refuses a sign-in origin that is not a bare https origin", async () => {
  const response = await fetch(url("/auth/device/start"), {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ origin: "http://cloud.kaneo.app/path" }),
  });
  assert.equal(response.status, 400);
});

test("wraps a signed-out forward as a DISCONNECTED envelope", async () => {
  const response = await fetch(url("/forward"), {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ method: "GET", path: "/api/user/me" }),
  });
  assert.equal(response.status, 200);
  const envelope = await response.json();
  assert.equal(envelope.status, 401);
  assert.deepEqual(JSON.parse(envelope.body), {
    message: "Not connected. Sign in to Kaneo.",
    code: "DISCONNECTED",
  });
});

test("refuses an unknown route", async () => {
  const response = await fetch(url("/nope"), { headers: auth });
  assert.equal(response.status, 404);
});
