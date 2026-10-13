# OpenChamber extension for Kaneo

Kaneo tasks inside OpenChamber: a rail panel that lists a board, an attach picker behind the composer's
`+` menu, a `/kaneo` slash command, and a full-screen board page.

## What you get

| Surface                     | How you reach it                            | What it does                                                                                                                       |
| --------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Rail panel                  | the Kaneo icon on the right-hand rail       | the project's tasks in one list, search and status/priority/assignee/label filters, an in-place detail with a Start session footer |
| Attach picker               | `+` next to the chat box                    | search the workspace, attach a task as a chip, start a session, or create one                                                      |
| `Kaneo Board` page          | Extension pages menu above the session list | every column side by side, drag and drop between columns, a List/Mine split and a detail overlay                                   |
| `/kaneo GEN-4`              | the chat box                                | attaches that ticket as a chip without opening anything                                                                            |
| Message and session actions | the `⋯` menu on a message or a session      | opens the picker with a title drafted from the text                                                                                |

Every detail surface reads the same: status and priority, assignee, due date, labels, the description and the comment
timeline, then one row of actions. A session started from any surface is remembered, so the task gets started,
completed and failed status comments once you set an OpenChamber web URL in the integration settings.

## Install

1. Create an API token in Kaneo under **Settings, Account, API Keys**. It needs `project:read`,
   `project:update`, `task:read`, `task:update` and `task:create`.
2. Run OpenChamber on web or desktop, open **Settings → Integrations → Kaneo**, and paste the token.
   The card shows the account name once it works.
3. Open **Settings → Extensions**, paste the absolute path of this folder, and click **Add**. Approve the
   capability list.
4. Open the Kaneo icon on the rail.

A folder install runs from this folder, so edit, `npm run build`, and reload. A Git install copies the
folder instead, so commit the built `panel/*.js` and `background/*.js` and bump `version` to ship an
update.

## Point it at your own Kaneo

The origin is declared once in `src/shared/constants.ts` and mirrored in the manifest:

- `src/shared/constants.ts` → `API_ORIGIN`
- `package.json` → `openchamber.contributes.integration.token.apiOrigin`

`npm run check:manifest` fails when the two disagree, because a stale manifest sends every request to the
wrong server with no runtime warning. To retarget the extension, change both. The web-app links the panel
opens are derived from the same origin by dropping the trailing `/api`.

## Develop

```sh
npm ci
npm run check      # lint, format, typecheck, manifest check, build, tests
npm run build      # rebuild the four bundles OpenChamber loads
npm test           # pure logic only: the API client and the formatters
```

OpenChamber never compiles TypeScript. The four built bundles are what ship:

| Source                   | Built file           | Loaded by                                                 |
| ------------------------ | -------------------- | --------------------------------------------------------- |
| `src/panel/main.ts`      | `panel/main.js`      | `panel/index.html`, the rail panel                        |
| `src/page/main.ts`       | `panel/page.js`      | `panel/page.html`, the full-screen board                  |
| `src/attach/main.ts`     | `panel/attach.js`    | `panel/attach.html`, the `+` picker and open-mode actions |
| `src/background/main.ts` | `background/main.js` | `background/index.html`, the `/kaneo` resolver            |

`src/shared/` holds everything the four bundles share: the Kaneo API client, the attachment builders, the
persisted preferences and the stylesheet.

## Capabilities

The extension asks for `prompt`, `sessions` and `model`, and the declared integration adds `network`.

- `prompt` and `sessions` cover `host.attach`, `host.compose`, `host.startSession` and `host.prompt`.
- `model` is declared so a drafted task description can be improved with `host.generate`; drop it from the
  manifest if you do not add that.

The page never sees the Kaneo token. OpenChamber attaches it to every `host.request` call.

## API surface

Every call goes through `src/shared/client.ts`, which is the only place that knows Kaneo's routes. The
routes it uses, all under the declared origin:

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

- Extensions load in OpenChamber web and desktop. VS Code and mobile do not load them.
- The selected workspace and project are remembered per server in `host.storage`, and are shared by all
  four surfaces. A stale project choice falls back to the first project in the workspace.
- The `workspace` field on the integration card seeds the first workspace on a fresh install. Leave it
  blank to take the first one the token can see.
- Status comments are English and read by the whole team, so they only post when you set an OpenChamber
  web URL. Without it the extension leaves the task untouched apart from the chip you attach.
- The newest 50 task-linked sessions are remembered for those comments; older links fall off. A session
  that outlives every open Kaneo surface posts no further comments, because the watcher lives in the
  surface, unlike Linear's server-side event hub.
