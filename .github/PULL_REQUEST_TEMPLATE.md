## What

A short description of the change.

## Why

The motivation. Link an issue if there is one.

## Trust boundary

If the PR touches `src/shared/dom.ts`, the CSP, the manifest, the API client or the storage
sanitizers, name which boundary and why the change is safe.

## Checked

- [ ] `npm run check` is clean locally.
- [ ] The four built bundles (`panel/main.js`, `panel/page.js`, `panel/attach.js`,
      `background/main.js`) are committed alongside the `src/` change.
- [ ] I opened the extension in OpenChamber and confirmed the panel, the `+` picker and the
      board page still render and act.
