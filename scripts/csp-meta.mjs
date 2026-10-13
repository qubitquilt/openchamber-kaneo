/**
 * The canonical Content-Security-Policy meta tag for every entry HTML.
 *
 * `scripts/check-manifest.mjs` parses the meta out of each entry and asserts
 * the directives below. The build fails when an entry drifts, so a future
 * panel can't ship without a CSP and silently open the door to an injected
 * script or a remote image.
 *
 * `script-src 'self'`: bundles ship as `panel/*.js` and `background/*.js`,
 * loaded from the same origin. `'wasm-unsafe-eval'` is added when the SDK
 * needs it; today it does not.
 *
 * `style-src 'self' 'unsafe-inline'`: the host writes its variables onto the
 * root and the entry HTMLs carry a small inline `<style>`. Tightening this
 * means moving the inline rules into `SHARED_CSS`.
 *
 * `img-src data: https:`: avatar and label images come back from the Kaneo
 * server over `https:`; `data:` covers the inline ones.
 *
 * `connect-src https://kaneo.qubitquilt.dev`: the only network egress. Any
 * future telemetry that wants a different origin must add it here and to the
 * manifest, so both lists are reviewed in one diff.
 *
 * `base-uri 'none'`, `form-action 'none'`: the surfaces have no `<base>` and
 * no forms; refusing both stops a misnested HTML block from quietly
 * re-pointing relative URLs.
 *
 * `frame-ancestors *`: OpenChamber embeds these surfaces; we do not pick the
 * ancestor.
 *
 * The literal:
 *
 *   <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src data: https:; connect-src https://kaneo.qubitquilt.dev; base-uri 'none'; form-action 'none'; frame-ancestors *">
 */
export const CSP_DIRECTIVES = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src data: https:",
  "connect-src https://kaneo.qubitquilt.dev",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors *",
].join("; ");
