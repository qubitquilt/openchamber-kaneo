## Plugin Review: openchamber-kaneo (quick-zebra branch)

**Scope:** Full codebase — `src/`, `test/`, `scripts/`, `panel/*.html`, `service/`, `background/`
**Review date:** 2026-10-14
**Branch state:** Clean (`git status` clean), no open PR linked.
**Skills consulted:** `typescript-advanced-types`, `architecture-patterns`

---

### Executive Summary

The extension is well-structured: clean architecture boundaries (surface → shared client → local service → Kaneo), strong trust fences (CSP, `normalizeOrigin`, `safeBackgroundColor`, no `innerHTML` outside `renderMarkdown`), and good test coverage for the pure-logic modules (`client`, `format`, `colors`, `session-links`, `service`).

The main improvement opportunity is **code duplication** across surfaces (`describeAndLog`, sign-in patterns) and the duplicate storage helpers in `workspace.ts` vs. `preferences.ts`. There are also a few type-safety gaps, an unused preference field (`groupBy`), and a duplicated constant (`DAY_MS2`) in `format.ts`.

---

### 1. Duplication (Highest Impact)

| File | Issue | Details |
|---|---|---|
| `src/shared/workspace.ts` (lines 14–29) | **Identical `read`/`write` storage helpers duplicated from `preferences.ts`** | `read<T>` and `write<T>` are copy-pasted. If storage behavior changes, these can diverge. Should import from `preferences.ts` or extract to `src/shared/storage.ts`. |
| `src/panel/main.ts` (lines 105–121), `src/attach/main.ts` (lines 158–174), `src/page/main.ts` (lines 114–139) | **Identical `describe()` and `describeAndLog()` functions** | Same error-formatting contract in all three surfaces. Should live in `shared/service.ts` or a new `shared/errors.ts`. |
| `src/panel/main.ts`, `src/attach/main.ts`, `src/page/main.ts` | **Sign-in state machinery duplicated** (`signInRoot`, `disposeSignIn`, `accountsResolved`, `showSignIn`, `clearSignIn`, `refreshConnection`) | Each surface manages its own `accountsResolved` / `accountsChecking` / `booted` flags independently. This is acceptable for isolation, but a shared `SignInController` class could reduce the ~30 lines of boilerplate per surface. |
| `src/panel/main.ts` (line 470), `src/page/main.ts` (line 460), `src/attach/main.ts` (line 469) | **Status/priority/label/assignee filter menus rebuilt identically** | Filter rendering patterns are very similar; a `FilterBar` component (if the SDK allowed) would consolidate them, but the SDK's `mountMenu` is sufficient. Lower priority. |

**Recommendation:** Extract `read`/`write` from `workspace.ts` into a shared module (or import from `preferences`). Extract `describe` / `describeAndLog` to `shared/service.ts` (or a new file) and have surfaces import it.

---

### 2. Type Safety

| File | Issue | Details |
|---|---|---|
| `src/shared/preferences.ts` (line 33) | **Loose index signature on `Preferences`** | `interface Preferences { [key: string]: string | null | boolean; ... }` allows arbitrary keys, which weakens the guarantee that only declared fields exist. The sanitizer (`sanitize`) enforces the known fields, but TypeScript won't catch typos like `labelFiltre`. Consider removing the index signature. |
| `src/shared/client.ts` (line 21) | `HttpMethod` is fine. `QueryValue` (line 23) allows `undefined` and `null`, which `buildQuery` handles correctly. Good. |
| `src/shared/types.ts` (line 50) | `TaskLabel.color: string` — unvalidated string. Used only through `labelChip` which passes it to `safeBackgroundColor`. Safe. |

**Recommendation:** Remove the index signature from `Preferences`. It does not serve any purpose (no dynamic key access is used in the code) and only weakens type safety.

---

### 3. Unused / Dead Code

| File | Issue | Details |
|---|---|---|
| `src/shared/preferences.ts` (line 38) | **`groupBy: "column" | "flat"` is never referenced in any surface** | `panel/main.ts` does not use `groupBy`. `page/main.ts` uses `view: "list" | "kanban" | "mine"`. The `groupBy` preference appears to be a leftover from an earlier design. It is preserved by `loadPreferences` / `savePreferences` but never read. Should either be used (e.g., flat list mode) or removed to reduce confusion. |
| `src/shared/format.ts` (line 224) | **`DAY_MS2` is a duplicate of `DAY_MS` (line 4)** | `DAY_MS = 86_400_000`; `DAY_MS2 = 86_400_000`. The second is only used in `relativeTimeOf`. Should be `DAY_MS`. This is a straightforward cleanup. |
| `src/shared/workspace.ts` (line 112) | **`CACHE_TTL_MS = 60_000`** — fine, but the comment says "one minute" which is accurate. No issue. |

---

### 4. Potential Bugs / Edge Cases

| File | Issue | Details |
|---|---|---|
| `src/service/main.ts` (line 49) | `normalizeOrigin` allows `pathname === "/"` but not `""` — actually it allows both (`"/"` or `""`). The check `if (url.pathname !== "/" && url.pathname !== "") return "";` allows both. Good. |
| `src/service/main.ts` (line 278–282) | `forward` validates `url.origin !== auth.origin`. This is the critical escape-prevention check. Good. |
| `src/client.ts` (line 163) | `getBoard` walks `while (page < Math.min(pagination.totalPages, MAX_BOARD_PAGES))`. If `totalPages = 0`, the loop skips (page starts at 1, `1 < 0` false). Fine. If `totalPages = 1`, loop skips. Fine. The `truncated` logic (`pagination.totalPages > page`) is correct: after walking pages 1..page, `page` is the last page visited; if totalPages > page, there are more. Fine. |
| `src/panel/main.ts` (line 233) | `load()` uses `++renderToken`. If `token !== renderToken`, it returns early. This is the standard render-token pattern. Good. |
| `src/page/main.ts` (line 191) | `load()` uses the same token pattern. Good. |
| `src/attach/main.ts` (line 221) | `load()` uses the same token pattern. Good. |

No critical bugs found.

---

### 5. Performance / Optimization

| File | Issue | Details |
|---|---|---|
| `src/panel/main.ts` (line 150) | `visibleTasks()` rebuilds the list from scratch on every render when filters/search are active. For boards < 1000 tasks (10-page max), this is acceptable. For very large boards, it could be cached per filter/state combo, but not necessary given the `truncated` safeguard. |
| `src/attach/main.ts` (line 280) | `searchWorkspace()` creates `new Map(state.boardTasks.map(...))`. This is fine for small boards. |
| `src/page/main.ts` (line 594) | `renderListSplit()` calls `allBoardTasks()` which flattens columns on every render. Fine. |
| `src/service/main.ts` (line 127) | `kaneoJson` uses `AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)`. The timeout is 20s. Fine. |

---

### 6. Naming / Readability

| File | Issue | Details |
|---|---|---|
| `src/shared/client.ts` (line 78) | `MAX_BOARD_PAGES = 10`. Good descriptive name. |
| `src/service/main.ts` (line 34) | `DEVICE_CLIENT_ID = "kaneo-cli"`. Fine. |
| `src/shared/workspace.ts` (line 15) | `WorkspaceContext` interface is clear. |
| `src/shared/types.ts` (line 136) | `TaskDetail extends BoardTask`. Clear inheritance. |

No naming anti-patterns detected.

---

### 7. Security / Trust Boundaries (Verified)

All four fences from `AGENTS.md` are respected in the code:

- **Inbound trust:** All user-controlled strings from Kaneo go through `DOMPurify` (`renderMarkdown` in `dom.ts`), colors through `safeBackgroundColor`, URLs through `host.openUrl` with a `^https?://` check (`workspace.ts` / attachments). Confirmed.
- **Outbound trust:** Only `service/main.ts` reaches the network. Confirmed.
- **Credential trust:** Token only in `service/main.ts`, stored at `~/.config/openchamber-kaneo/auth.json` (mode `0600`). Confirmed.
- **Storage trust:** Only `preferences.ts` writes `host.storage`. Confirmed.
- **Renderer trust:** `innerHTML` only in `renderMarkdown` (`dom.ts`). Confirmed.

---

### 8. Tests / Verification

- `npm run check` includes lint, format, typecheck, manifest check, build, and `node:test`.
- Tests cover: `client.test.mjs`, `format.test.mjs`, `colors.test.mjs`, `service.test.mjs`, `session-links.test.mjs`.
- No unit tests for surface files (`panel/main.ts`, etc.). This is by design (`AGENTS.md`: "Anything that needs the host is verified by opening the panel in OpenChamber").
- The `test/service.test.mjs` validates the loopback service contract (`/health`, bearer check, `DISCONNECTED` envelope, 404). Good.

---

### 9. Build / Manifest

- `scripts/check-manifest.mjs` validates CSP, entry scripts, `service/main.js` build, `panel.id` / `PROVIDER_ID` agreement, and `openchamber` manifest shape. Confirmed.
- `build:test` produces `build/*.mjs` for test imports. `clean` removes both `.js` and `build/` directory. Confirmed.
- The CSP meta (`scripts/csp-meta.mjs`) is canonical and enforced. Confirmed.

---

### 10. Recommended Changes (Ordered by Safety / Impact)

1. **Extract shared storage helpers** — Move `read`/`write` from `preferences.ts` to a new `shared/storage.ts` (or keep them in `preferences.ts` and import from `workspace.ts`). This eliminates duplication and divergence risk.
2. **Remove index signature from `Preferences`** — Strengthen type safety by removing `[key: string]: ...`.
3. **Remove or use `groupBy` preference** — If it's not used, delete it from the interface, defaults, and sanitizer. If it is intended for a future flat/kanban split, implement it.
4. **Consolidate `DAY_MS2` to `DAY_MS`** in `format.ts`.
5. **Extract `describe` / `describeAndLog`** to a shared module (`shared/errors.ts` or `shared/service.ts`) and import from surfaces.
6. **(Optional) Shared sign-in controller** — Extract the `accountsResolved` / `signInRoot` / `disposeSignIn` pattern into a reusable helper if the SDK permits.

---

### Final Verdict

The plugin is **high quality** — clean boundaries, good security practices, solid test coverage, and well-structured surfaces. The improvements above are mostly **cleanup and consolidation**, not behavioral fixes. No breaking changes are required.
