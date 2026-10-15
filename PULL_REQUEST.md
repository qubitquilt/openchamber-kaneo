# Pull Request: Cleanup and documentation updates

**Branch:** `quick-zebra` → `main`
**Commit:** `5d50888`

## What changed

### Refactoring (recommended changes from code review)
- **New `src/shared/storage.ts`** — Extracted shared `read`/`write`/`deleteStorage` helpers with `StorageStore` interface (testable, injects mock store). Eliminates duplication from `preferences.ts` and `workspace.ts`.
- **New `src/shared/errors.ts`** — Consolidated `describe()` and `describeAndLog()` used by `panel/main.ts`, `attach/main.ts`, and `page/main.ts`.
- **Fixed `DAY_MS2` duplicate** in `src/shared/format.ts` (`DAY_MS` already defined).
- **Cleaned `Preferences` interface** — Removed unused `groupBy` field and unnecessary index signature (`[key: string]`).
- **Fixed silent storage failures** — `read`/`write`/`deleteStorage` log `console.warn` on failure; `read` separates `store.get` catch from sanitizer.
- **Fixed cache round-trip** — `writeCache` serializes `projectsError` message; `readCache` reconstructs it; stricter shape check on cached context.

### Documentation
- **README.md** — Added Screenshots section with real PNGs under `assets/` (`assets/screenshot-side-panel.png` and `assets/screenshot-modal-panel.png`).
- **AGENTS.md** — Updated layout description to include `storage.ts` and `errors.ts`.
- **Removed stale `review.md`** from repo.

### Verification
- `npm run check` passes: lint, format, typecheck (`tsc`), manifest check, build (all 5 bundles rebuilt), and 51 tests pass (including 4 new `test/storage.test.mjs` cases).
- All `.js` bundles rebuilt and pushed (required by the project's "one rule").
