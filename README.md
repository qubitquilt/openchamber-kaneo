# OpenChamber extension for Kaneo

Kaneo tasks inside OpenChamber: a rail panel that lists a board, an attach picker behind the composer's
`+` menu, a `/kaneo` slash command, and a full-screen board page.

## What you get

| Surface                     | How you reach it                            | What it does                                                                                                                       |
| --------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Rail panel                  | the Kaneo icon on the right-hand rail       | the project's tasks in one list, search and status/priority/assignee/label filters, an in-place detail with a Start session footer |
| Attach picker               | `+` next to the chat box                    | search the workspace, preview the highlighted task, attach it as a chip, start a session, or create one                            |
| `Kaneo Board` page          | Extension pages menu above the session list | every column side by side, drag and drop between columns, a List/Mine split and a detail overlay                                   |
| `/kaneo GEN-4`              | the chat box                                | attaches that ticket as a chip without opening anything                                                                            |
| Message and session actions | the `⋯` menu on a message or a session      | opens the picker with a title drafted from the text                                                                                |

Every detail surface reads the same: status and priority, assignee, due date, labels, the description and the comment
timeline, then one row of actions. The attach picker is the host's reference-picker shape: search, the task list on the
left, a preview of the highlighted task on the right, and Attach in the footer. An attached chip carries the
description and the comments, so the agent reads what the team already said.

A session started from any surface is remembered, so the task gets started, completed and failed status comments from
whichever Kaneo surface is open.

## Install

1. Run OpenChamber on web or desktop, open **Settings → Extensions**, paste the absolute path of this
   folder, and click **Add**. Approve the capability list, including the **local service** it asks for.
2. Open the Kaneo icon on the rail. It shows a **Kaneo server URL** field and a **Sign in with Kaneo**
   button. Leave the field blank for Kaneo Cloud, or type your instance (for example
   `https://kaneo.qubitquilt.dev`).
3. Click **Sign in with Kaneo**. OpenChamber shows a short code and opens that server's Kaneo sign-in
   page; enter the code and approve. This is the `kaneo login` flow — no token, client id or redirect to
   enter.
4. The panel loads once approved. The `+` picker, the board page and `/kaneo` all share the same login.

The server URL is remembered, so a later sign-in and every request go back to the same instance. Sign out
from the account menu in the panel or the board toolbar; sign in again to switch accounts.

There is no card on **Settings → Integrations**. OpenChamber's card runs its own OAuth, which needs a
registered client id and a redirect URI that Kaneo accepts only over `https` or loopback — neither fits a
tailnet `http` origin. The panel's device flow uses no redirect URI and no client id, so it works anywhere.

A folder install runs from this folder, so edit, `npm run build`, and reload. A Git install copies the
folder instead, so commit the built `panel/*.js`, `background/*.js` and `service/main.js` and bump
`version` to ship an update.

## How sign-in works

OpenChamber sandboxes an extension's page and lets the host attach a credential only to `host.request`; a
guest has no call to store one, and OpenChamber's guest OAuth needs a pasted client id. So the part of the
`kaneo` CLI that signs in lives in a **local service**: a Node process the host spawns from this package
(`service/main.js`). It runs Kaneo's device authorization, keeps the access token, and forwards the
panel's API calls with it.

1. The panel asks the service for a device code (`POST /api/auth/device/code`).
2. The service returns the code and the verification URL; the panel shows the code and opens the URL.
3. The service polls `/api/auth/device/token`; once Kaneo issues the token it stores it, and the panel
   loads.

The token never enters the page. It is written to
`$XDG_CONFIG_HOME/openchamber-kaneo/auth.json` (or `~/.config/openchamber-kaneo/auth.json`), mode `0600`,
alongside the origin it was signed in against. Kaneo issues a 30-day token with no refresh, so a
long-idle install asks you to sign in again.

The service runs with your user's rights — the approval dialog says so — which is why this extension is
not a pure sandboxed guest. It reaches the network only for the configured origin.

## The server URL

The panel's sign-in reads a **Kaneo server URL**, remembered in the extension's own storage. Blank means
the bundled origin; anything else must be a bare `https` origin. The origin is stored with the token, so
every later call goes back to the instance it was signed in against. The service validates it again
before use.

## Point it at your own Kaneo

Two ways, and they compose:

- **At runtime:** the panel's **Kaneo server URL** field. Leave it blank for cloud, or set it to another
  instance. No rebuild.
- **At build time:** change `API_ORIGIN` in `src/shared/constants.ts` — the service's default origin and
  the web-app links the panel opens — and rerun `npm run build`. That is the origin a blank field means.

## Develop

```sh
npm ci
npm run check      # lint, format, typecheck, manifest check, build, tests
npm run build      # rebuild the bundles OpenChamber loads
npm test           # pure logic only: the API client and the formatters
```

OpenChamber never compiles TypeScript. The built bundles are what ship:

| Source                   | Built file           | Loaded by                                                 |
| ------------------------ | -------------------- | --------------------------------------------------------- |
| `src/panel/main.ts`      | `panel/main.js`      | `panel/index.html`, the rail panel                        |
| `src/page/main.ts`       | `panel/page.js`      | `panel/page.html`, the full-screen board                  |
| `src/attach/main.ts`     | `panel/attach.js`    | `panel/attach.html`, the `+` picker and open-mode actions |
| `src/background/main.ts` | `background/main.js` | `background/index.html`, the `/kaneo` resolver            |
| `src/service/main.ts`    | `service/main.js`    | the host-spawned local service (Node)                     |

`src/shared/` holds everything the surfaces share: the API client, the service client and sign-in
helpers, the attachment builders, the persisted preferences and the stylesheet. `src/service/main.ts` is
a Node bundle with its own `tsconfig.service.json`.

## Capabilities

The extension asks for `prompt` and `sessions`, and `contributes.service` adds `service` (the local
process the user approves at install). There is no `contributes.integration`, so no `network` capability
and no Integrations card.

- `prompt` and `sessions` cover `host.attach`, `host.compose`, `host.startSession` and `host.prompt`.

The page never sees a Kaneo access token; the local service holds the device-flow token and forwards
every call.

## API surface

Every call goes through `src/shared/client.ts`, which is the only place that knows Kaneo's routes, and
`src/shared/service.ts`, which carries each one to the local service. The routes, under the signed-in
origin:

| Call                 | Route                                              |
| -------------------- | -------------------------------------------------- |
| `currentUser`        | `GET /user/me`                                     |
| `listWorkspaces`     | `GET /workspace`                                   |
| `listProjects`       | `GET /project?workspaceId=`                        |
| `getBoard`           | `GET /task/tasks/{projectId}`, walked across pages |
| `getTask`            | `GET /task/{id}?view=detail`                       |
| `getTaskByTicketId`  | `GET /task/by-ticket-id/{ticketId}`                |
| `listAssignedTasks`  | `GET /task/assigned?workspaceId=`                  |
| `search`             | `GET /search?type=tasks`                           |
| `listLabels`         | `GET /label/workspace/{workspaceId}`               |
| `createTask`         | `POST /task/{projectId}`                           |
| `updateTaskStatus`   | `PUT /task/status/{id}`                            |
| `updateTaskPriority` | `PUT /task/priority/{id}`                          |

Boards come back paginated at 100 tasks a page. `getBoard` walks up to ten pages and reports
`truncated` when the project holds more, so a large board asks the user to narrow it instead of freezing
the panel.

## Notes

- Extensions load in OpenChamber web and desktop. VS Code and mobile do not load them, and neither
  spawns the local service.
- The selected workspace and project are remembered per server in `host.storage`, and are shared by all
  four surfaces. A stale project choice falls back to the first project in the workspace.
- Requests made with the session token are not counted against a Kaneo API key's rate limit.
- Status comments are English and read by the whole team; they post as plain text (no OpenChamber web URL
  is configured).
- The newest 50 task-linked sessions are remembered for those comments; older links fall off. A session
  that outlives every open Kaneo surface posts no further comments, because the watcher lives in the
  surface, unlike Linear's server-side event hub.

## Contributing

PRs run `npm run check` in CI, which lints, typechecks, checks the manifest, builds and tests. A
contributor who has run the same gate locally and confirmed the panel, the `+` picker and the board page
in OpenChamber lands a faster review. See `CONTRIBUTING.md` for the workflow and `AGENTS.md` for the
trust boundaries and code conventions a PR is expected to respect.

## Security

Report a vulnerability through `SECURITY.md`. The four entry HTMLs each carry a `Content-Security-Policy`
meta; the canonical line lives in `scripts/csp-meta.mjs` and the build fails when an entry drifts. The
panel opens no direct network (`connect-src 'none'`); every Kaneo call travels through the host proxy to
the local service. The service is the one component that reaches Kaneo directly, and the one that runs
with the user's rights.
