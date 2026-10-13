# Working in this repository

An OpenChamber extension for Kaneo. Read `README.md` first for what ships and how it is installed.

## The one rule

**OpenChamber never compiles this code.** It loads the built `.js` files as they sit on disk. A change to
`src/` is invisible until `npm run build` runs, and a change that is not committed never reaches a Git or
zip install. Run `npm run check`, which lints, typechecks, checks the manifest, builds and tests.

## Layout

```
src/shared/     code every surface shares: the API client, chip builders, preferences, stylesheet
src/panel/      the rail panel        -> panel/main.js
src/page/       the full-screen board -> panel/page.js
src/attach/     the + picker          -> panel/attach.js
src/background/ the /kaneo resolver   -> background/main.js
panel/*.html    one entry per surface, each loading its own built bundle
test/           node:test suites for the pure logic
scripts/        the manifest check
```

`src/shared/` must stay free of DOM-at-import-time work if you want it testable: `client.ts` and
`format.ts` are bundled separately for `npm test` and run under Node.

## Changing the Kaneo server

`API_ORIGIN` in `src/shared/constants.ts` is the single source of truth. The manifest repeats it because
OpenChamber only calls a declared origin. Change both, or `npm run check:manifest` fails.

## Conventions

- `host.request` is the only network path. Never reach for `fetch`; the sandbox blocks it.
- A surface that answers nothing on screen still registers `onReady` and bails when
  `ctx.surface` is not what it expects.
- Render with `@openchamber/sdk/ui` first. Reach for `src/shared/dom.ts` `el()` only for layout the kit
  has no block for, and style it with the host's own variables so light and dark both follow the app.
- Every async paint takes a render token and drops its result when a newer render started. The panel, the
  picker and the board all reload independently and would otherwise overwrite each other.
- Errors from the API surface as a banner or a toast, never as a silent blank screen. `describe()` turns
  any thrown value into one line of text.
- Tests cover `client.ts` and `format.ts` only. Anything that needs the host is verified by opening the
  panel in OpenChamber, not by a unit test.

## Trust boundaries

Four fences, named so a future contributor knows where they sit:

- **Inbound trust.** Anything that comes back from `https://kaneo.qubitquilt.dev` is untrusted. Strings
  go through `DOMPurify.sanitize` in `src/shared/dom.ts`; user-controlled colors go through
  `safeBackgroundColor` (in `src/shared/colors.ts`) before they reach a `style=""` attribute; URLs only
  open through `host.openUrl` after a `^https?://` check.
- **Outbound trust.** The only network egress is `host.request`, which is locked to the `apiOrigin` in
  the manifest, which is locked to `API_ORIGIN` in `src/shared/constants.ts`, which is locked by
  `npm run check:manifest`. Adding a second origin means changing all three.
- **Storage trust.** The only writer of `host.storage` keys is this extension's code. Reads pass through
  a sanitizer in `src/shared/preferences.ts` (`read<T>(key, sanitize)`). A new key needs a sanitizer and
  a test.
- **Renderer trust.** The renderer never uses `innerHTML` outside `renderMarkdown` in
  `src/shared/dom.ts`. If you need HTML somewhere new, route it through `renderMarkdown` or extend `el()`;
  do not call `innerHTML` from a panel or page.

The four entry HTMLs (`panel/*.html`, `background/index.html`) each carry a matching
`Content-Security-Policy` meta. The canonical line lives in `scripts/csp-meta.mjs`; `check:manifest`
fails when any entry drifts from it.

## Before you call a task done

```sh
npm run check
```

Then load the folder in **Settings → Extensions**, open the panel, the `+` picker and the board page, and
confirm each surface renders and its actions work. Report what you verified.
