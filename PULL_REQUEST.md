# Pull Request: Cleanup and documentation updates

**Branch:** `quick-zebra` → `main`
**Commit:** `70f3a79`

## What changed

### Refactoring (recommended changes from code review)
- **New `src/shared/storage.ts`** — Extracted shared `read`/`write` storage helpers from `preferences.ts` and `workspace.ts`, eliminating duplication.
- **New `src/shared/errors.ts`** — Consolidated `describe()` and `describeAndLog()` used by `panel/main.ts`, `attach/main.ts`, and `page/main.ts`.
- **Fixed `DAY_MS2` duplicate** in `src/shared/format.ts` (`DAY_MS` already defined).
- **Cleaned `Preferences` interface** — Removed unused `groupBy` field and unnecessary index signature (`[key: string]`).

### Documentation
- **README.md** — Added Screenshots section with side panel (`screenshot-side-panel.png`) and picker modal (`screenshot-modal-panel.png`) references.
- **AGENTS.md** — Updated layout description to include `storage.ts` and `errors.ts`.

### Verification
- `npm run check` passes: lint, format, typecheck (`tsc`), manifest check, build (all 5 bundles rebuilt), and 47 tests pass.
- All `.js` bundles rebuilt and pushed (required by the project's "one rule").

## Review

Full review document: `review.md`
