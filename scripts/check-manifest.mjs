#!/usr/bin/env node
/**
 * The manifest and the code must name the same Kaneo server.
 *
 * OpenChamber only calls the origin declared in
 * `openchamber.contributes.integration.token.apiOrigin`, so a stale copy in the
 * manifest sends every request to the wrong host with no runtime warning. This
 * check turns that into a build failure.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const problems = [];

/** Read `API_ORIGIN` out of the TypeScript constant instead of repeating it. */
async function readApiOrigin() {
  const source = await readFile(resolve(root, "src/shared/constants.ts"), "utf8");
  const match = /export const API_ORIGIN = "([^"]+)";/.exec(source);
  if (!match) {
    problems.push("src/shared/constants.ts no longer declares a quoted API_ORIGIN.");
    return null;
  }
  return match[1];
}

const REQUIRED_API_ORIGIN = await readApiOrigin();

const manifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const contributes = manifest.openchamber?.contributes ?? {};
const token = contributes.integration?.token ?? {};

if (manifest.openchamber?.apiVersion !== 1) {
  problems.push("openchamber.apiVersion must be 1.");
}
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(manifest.version ?? "")) {
  problems.push(`version must be semver, found ${JSON.stringify(manifest.version)}.`);
}
if (REQUIRED_API_ORIGIN && token.apiOrigin !== REQUIRED_API_ORIGIN) {
  problems.push(
    `integration.token.apiOrigin is ${JSON.stringify(token.apiOrigin)}, expected ${REQUIRED_API_ORIGIN}. Change one of them.`,
  );
}
if (token.scheme !== "bearer") {
  problems.push('integration.token.scheme must be "bearer" for the Kaneo API key.');
}

// Every declared HTML entry must ship, and every script it loads must be built.
const entries = new Set();
if (contributes.panel?.entry) entries.add(contributes.panel.entry);
if (contributes.page?.entry) entries.add(contributes.page.entry);
if (typeof contributes.attach === "object" && contributes.attach.entry) {
  entries.add(contributes.attach.entry);
}
if (contributes.background?.entry) entries.add(contributes.background.entry);

const relative = (entry) => entry.replace(/^\.\//, "");

// A package SVG icon must exist on disk; install fails without it.
const icon = contributes.panel?.icon;
if (typeof icon === "string" && icon.toLowerCase().endsWith(".svg")) {
  try {
    await readFile(resolve(root, relative(icon)), "utf8");
  } catch {
    problems.push(`panel.icon ${icon} is missing from disk.`);
  }
}

for (const entry of entries) {
  if (!relative(entry).endsWith(".html")) {
    problems.push(`entry ${entry} is not an HTML file.`);
    continue;
  }
  let html;
  try {
    html = await readFile(resolve(root, relative(entry)), "utf8");
  } catch {
    problems.push(`entry ${entry} is missing from disk.`);
    continue;
  }
  for (const match of html.matchAll(/<script[^>]+src="([^"]+)"/g)) {
    const src = match[1];
    if (/^(https?:)?\/\//.test(src)) {
      problems.push(`${entry} loads ${src}; scripts must ship inside the package.`);
      continue;
    }
    const scriptPath = resolve(root, relative(entry).replace(/[^/]+$/, ""), src);
    try {
      await readFile(scriptPath, "utf8");
    } catch {
      problems.push(`${entry} loads ${src}, which is not built. Run npm run build.`);
    }
  }
}

if (problems.length > 0) {
  console.error("Manifest check failed:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`Manifest check passed: ${entries.size} entries, apiOrigin ${token.apiOrigin}.`);
