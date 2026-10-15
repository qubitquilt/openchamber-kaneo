import {
  isGuestMessageItem,
  isGuestSessionItem,
  type GuestMessageItem,
  type GuestSessionItem,
  type HostReadyContext,
} from "@openchamber/sdk";
import {
  applyHostReady,
  mountBanner,
  mountButton,
  mountCheckbox,
  mountEmpty,
  mountMenu,
  mountSearchField,
  mountSelect,
  mountSpinner,
  mountTabs,
  mountTextField,
} from "@openchamber/sdk/ui";

import { createKaneoClient } from "../shared/client";
import { describeAndLog } from "../shared/errors";
import { PRIORITIES, type Priority } from "../shared/constants";
import { clear, el } from "../shared/dom";
import { host } from "../shared/host";
import { mountSignIn } from "../shared/signin";
import { kaneoAccount, serviceTransport } from "../shared/service";
import {
  attachChip,
  openInKaneo,
  startSessionForTask,
  type ChipTarget,
} from "../shared/attachments";
import { detailComments, detailDescription, detailMeta, type CommentState } from "../shared/detail";
import { columnLabel, firstLine, priorityLabel, ticketIdOf } from "../shared/format";
import { loadPreferences } from "../shared/preferences";
import { installStyles } from "../shared/styles";
import { renderTaskRow } from "../shared/list-row";
import type { BoardTask, Comment, ProjectListItem } from "../shared/types";
import {
  NoWorkspaceError,
  bootstrap,
  readSettings,
  resolveProject,
  type WorkspaceContext,
} from "../shared/workspace";

/**
 * The picker behind the composer's + menu, shaped like OpenChamber's reference
 * picker: a search header, the workspace's tasks on the left and a preview of
 * the highlighted one on the right, with Attach in the footer.
 *
 * Two entry paths share this page. The + menu arrives with no item; a message
 * or session action arrives with `ready.item`, which opens create mode with the
 * item's text as the draft title and description.
 */

const root = document.querySelector<HTMLElement>("#root");
if (!root) throw new Error("Kaneo attach dialog is missing its #root element.");

const client = createKaneoClient(serviceTransport);
const TITLE_MAX = 200;
/** Below this the dialog shows the list or the preview, never both. */
const NARROW_WIDTH = 560;

type Draft = {
  title: string;
  description: string;
  priority: Priority;
};

interface State {
  ready: HostReadyContext | null;
  connected: boolean;
  context: WorkspaceContext | null;
  project: ProjectListItem | null;
  /** Every task in the selected project. */
  boardTasks: BoardTask[];
  columnNames: Record<string, string>;
  defaultStatus: string;
  /** Search hits, or null while the picker shows the plain board. */
  results: BoardTask[] | null;
  search: string;
  /** Column slug filter, `""` for every column. */
  statusFilter: string;
  tab: "board" | "create";
  loading: boolean;
  error: string | null;
  draft: Draft;
  /** The message or session that opened create mode, if any. */
  source: GuestMessageItem | GuestSessionItem | null;
  highlightedId: string | null;
  comments: Record<string, CommentState>;
  worktree: boolean;
  wide: boolean;
  /** Narrow layout: whether the preview replaced the list. */
  previewOpen: boolean;
}

const state: State = {
  ready: null,
  connected: false,
  context: null,
  project: null,
  boardTasks: [],
  columnNames: {},
  defaultStatus: "to-do",
  results: null,
  search: "",
  statusFilter: "",
  tab: "board",
  loading: true,
  error: null,
  draft: { title: "", description: "", priority: "medium" },
  source: null,
  highlightedId: null,
  comments: {},
  worktree: false,
  wide: true,
  previewOpen: false,
};

let renderToken = 0;
let renderSearch = 0;
/** `onReady` repeats on theme and session changes; only the first one seeds. */
let booted = false;
/** The board is loaded on the first connect and after a reconnect. */
let loaded = false;

/** The sign-in view, mounted once and kept across renders so its polling lives. */
let signInRoot: HTMLElement | null = null;
let disposeSignIn: (() => void) | null = null;
/** False until the service has told us whether a token exists. */
let accountsResolved = false;
let accountsChecking = false;

function showSignIn(): void {
  if (!signInRoot) {
    signInRoot = el("div", { className: "signin-fill" });
    disposeSignIn = mountSignIn(signInRoot, () => void onSignedIn());
  }
  root?.append(signInRoot);
}

function clearSignIn(): void {
  disposeSignIn?.();
  disposeSignIn = null;
  signInRoot = null;
}

async function onSignedIn(): Promise<void> {
  clearSignIn();
  state.connected = true;
  loaded = true;
  await load();
}

function ticketFor(task: BoardTask): string {
  return ticketIdOf(state.project?.slug ?? "", task.number);
}

function columnNameFor(task: BoardTask): string {
  return state.columnNames[task.status] ?? columnLabel(task.status);
}

function targetFor(task: BoardTask): ChipTarget {
  return {
    task,
    ticketId: ticketFor(task),
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName: columnNameFor(task),
    comments: state.comments[task.id]?.items,
  };
}

function highlighted(): BoardTask | null {
  const id = state.highlightedId;
  if (!id) return null;
  return (
    state.boardTasks.find((task) => task.id === id) ??
    state.results?.find((task) => task.id === id) ??
    null
  );
}

function boardMatches(task: BoardTask): boolean {
  if (state.statusFilter && task.status !== state.statusFilter) return false;
  const needle = state.search.trim().toLowerCase();
  if (!needle) return true;
  return (
    task.title.toLowerCase().includes(needle) || ticketFor(task).toLowerCase().includes(needle)
  );
}

function visibleRows(): BoardTask[] {
  return (state.results ?? state.boardTasks).filter(boardMatches);
}

/* ------------------------------------------------------------------- data */

async function load(): Promise<void> {
  const token = ++renderToken;
  state.loading = true;
  render();

  try {
    const { workspaceSlug, projectSlug } = readSettings(state.ready?.settings);
    const context = await bootstrap(client, workspaceSlug, { force: true });
    if (token !== renderToken) return;
    state.context = context;

    const preferences = await loadPreferences();
    state.project = resolveProject(context.projects, preferences.projectId, projectSlug);

    state.loading = false;
    state.error = context.projectsError
      ? describeAndLog("List projects", context.projectsError)
      : null;
    render();

    if (state.project) {
      const board = await client.getBoard(state.project.id);
      if (token !== renderToken) return;
      state.boardTasks = board.board.columns.flatMap((column) => column.tasks);
      state.columnNames = Object.fromEntries(
        board.board.columns.map((column) => [column.id, column.name]),
      );
      state.defaultStatus = board.board.columns[0]?.id ?? "to-do";
      state.results = null;
    }
    render();
  } catch (error) {
    if (token !== renderToken) return;
    state.loading = false;
    state.error =
      error instanceof NoWorkspaceError
        ? error.message
        : `Could not reach Kaneo. ${describeAndLog("Reach Kaneo", error)}`;
    render();
  }
}

async function searchWorkspace(): Promise<void> {
  const token = ++renderSearch;
  const workspaceId = state.context?.workspaceId;
  const query = state.search.trim();
  if (!workspaceId || query.length < 2) {
    state.results = null;
    renderBody();
    return;
  }
  state.loading = true;
  renderBody();
  try {
    const found = await client.search(workspaceId, query, {
      ...(state.project ? { projectId: state.project.id } : {}),
      limit: 40,
    });
    if (token !== renderSearch) return;
    // Search hits carry identifiers and titles only, so keep the ones already
    // loaded from the board and report the rest as unavailable in this picker.
    const byId = new Map(state.boardTasks.map((task) => [task.id, task]));
    const matched = found.results.filter((result) => result.type === "task");
    state.results = matched
      .map((result) => byId.get(result.id))
      .filter((task): task is BoardTask => Boolean(task));
    const misses = matched.length - state.results.length;
    state.loading = false;
    state.error =
      misses > 0
        ? `${misses} match${misses === 1 ? " is" : "es are"} outside the loaded board. Open the Kaneo web app to reach them.`
        : null;
    renderBody();
  } catch (error) {
    if (token !== renderSearch) return;
    state.loading = false;
    state.error = describeAndLog("Search Kaneo", error);
    renderBody();
  }
}

/** Comments with the chip, like Linear: fetch once if they are not loaded. */
async function commentsFor(taskId: string): Promise<Comment[] | undefined> {
  const cached = state.comments[taskId]?.items;
  if (cached) return cached;
  try {
    const items = await client.listComments(taskId);
    state.comments[taskId] = { loading: false, error: null, items };
    return items;
  } catch {
    return undefined;
  }
}

async function attach(task: BoardTask): Promise<void> {
  try {
    const target = { ...targetFor(task), comments: await commentsFor(task.id) };
    await attachChip(target);
    await host.toast({ kind: "success", message: `${target.ticketId} attached to the chat.` });
    await host.close();
  } catch (error) {
    await host.toast({
      kind: "error",
      message: `Attach failed: ${describeAndLog("Attach", error)}`,
      dismiss: true,
    });
  }
}

async function attachAndStart(task: BoardTask): Promise<void> {
  const target = { ...targetFor(task), comments: await commentsFor(task.id) };
  const started = await startSessionForTask(target, { worktree: state.worktree });
  if (started) await host.close();
}

async function createTask(): Promise<void> {
  if (!state.project) return;
  const title = state.draft.title.trim();
  if (title.length === 0) {
    state.error = "A task needs a title.";
    render();
    return;
  }
  try {
    const created = await client.createTask(state.project.id, {
      title: title.slice(0, TITLE_MAX),
      description: state.draft.description,
      priority: state.draft.priority,
      status: state.defaultStatus,
    });
    await host.toast({
      kind: "success",
      message: `Created ${ticketIdOf(state.project.slug, created.number)} in ${state.project.name}.`,
    });
    await attach(created);
  } catch (error) {
    state.error = describeAndLog("Create task", error);
    render();
  }
}

/* ----------------------------------------------------------------- render */

let headRoot: HTMLElement | null = null;
let bodyRoot: HTMLElement | null = null;
let footRoot: HTMLElement | null = null;

function render(): void {
  if (!root) return;
  clear(root);
  headRoot = null;
  bodyRoot = null;
  footRoot = null;

  if (!state.ready) {
    mountSpinner(root, { label: "Connecting to Kaneo" });
    return;
  }
  if (!state.connected) {
    if (!accountsResolved) {
      mountSpinner(root, { label: "Loading Kaneo" });
      return;
    }
    showSignIn();
    return;
  }

  if (state.source) {
    renderCreateForm(false);
    return;
  }
  if (state.tab === "create") {
    renderCreateForm(true);
    return;
  }
  renderPicker();
}

function renderPicker(): void {
  headRoot = el("div", { className: "attach-head" });
  root?.append(headRoot);
  renderHead();

  bodyRoot = el("div", { className: "attach-body" });
  root?.append(bodyRoot);

  footRoot = el("div", { className: "attach-foot" });
  root?.append(footRoot);

  renderBody();
  renderFoot();
}

function renderHead(): void {
  if (!headRoot) return;
  clear(headRoot);

  const tabsHolder = el("div");
  headRoot.append(tabsHolder);
  mountTabs(tabsHolder, {
    items: [
      { id: "board", label: state.project?.slug.toUpperCase() ?? "Tasks" },
      { id: "create", label: "New" },
    ],
    activeId: state.tab,
    onChange: (id) => {
      if (id === "create") {
        state.tab = "create";
        render();
        return;
      }
      state.tab = "board";
      render();
    },
  });

  const row = el("div", { className: "attach-head-row" });

  const searchHolder = el("div", { className: "attach-search" });
  row.append(searchHolder);
  mountSearchField(searchHolder, {
    value: state.search,
    label: "Search Kaneo",
    placeholder: "Search, or paste a ticket id",
    onChange: (value) => {
      state.search = value;
      if (value.trim().length >= 2) {
        void searchWorkspace();
        return;
      }
      state.results = null;
      renderBody();
    },
  });

  const columns = Object.entries(state.columnNames);
  if (columns.length > 0) {
    const holder = el("div", { className: state.statusFilter ? "filter filter-active" : "filter" });
    row.append(holder);
    mountMenu(holder, {
      label: state.statusFilter ? (state.columnNames[state.statusFilter] ?? "Status") : "Status",
      size: "sm",
      variant: "ghost",
      items: [
        { id: "", label: "Any status" },
        { separator: true as const },
        ...columns.map(([id, label]) => ({ id, label })),
      ],
      onSelect: (id) => {
        state.statusFilter = id;
        renderBody();
      },
    });
  }

  const projects = state.context?.projects ?? [];
  if (projects.length > 1) {
    const holder = el("div", { className: "attach-project" });
    row.append(holder);
    mountSelect(holder, {
      searchable: true,
      searchPlaceholder: "Find a project",
      value: state.project?.id ?? "",
      options: projects.map((project) => ({
        id: project.id,
        label: project.slug.toUpperCase(),
      })),
      onChange: (id) => {
        state.project = state.context?.projects.find((entry) => entry.id === id) ?? null;
        state.search = "";
        state.results = null;
        state.highlightedId = null;
        state.loading = true;
        void load();
      },
    });
  }

  headRoot.append(row);
}

/** The list and the preview, side by side on a wide dialog. */
function renderBody(): void {
  if (!bodyRoot) return;
  clear(bodyRoot);

  const rows = visibleRows();
  if (!state.highlightedId || !rows.some((task) => task.id === state.highlightedId)) {
    state.highlightedId = rows[0]?.id ?? null;
  }
  const task = highlighted();

  bodyRoot.classList.toggle("narrow", !state.wide);
  if (!state.wide && state.previewOpen && task) {
    bodyRoot.append(renderPreview(task));
    return;
  }

  const split = el("div", { className: "attach-split" });
  split.append(renderList(rows));
  if (state.wide) split.append(renderPreview(task));
  bodyRoot.append(split);
}

function renderList(rows: BoardTask[]): HTMLElement {
  const list = el("div", { className: "attach-list scroll" });

  if (state.error) {
    const holder = el("div");
    list.append(holder);
    mountBanner(holder, {
      tone: state.results ? "warning" : "error",
      title: "Kaneo",
      body: state.error,
      ...(state.results ? {} : { action: { label: "Retry", onClick: () => void load() } }),
    });
  }

  if (state.loading && rows.length === 0) {
    mountSpinner(list, { label: "Loading tasks" });
    return list;
  }
  if (rows.length === 0) {
    mountEmpty(list, {
      title: state.search.trim() ? "No task matches" : "This project has no tasks",
      body: state.search.trim()
        ? "Search runs inside the selected workspace."
        : "Use the New tab to create the first one.",
    });
    return list;
  }

  for (const task of rows) {
    const row = renderTaskRow({
      task,
      ticketId: ticketFor(task),
      column: { slug: task.status, isFinal: false, name: columnNameFor(task) },
      selected: task.id === state.highlightedId,
      onActivate: () => highlight(task),
    });
    row.addEventListener("dblclick", () => void attach(task));
    list.append(row);
  }
  return list;
}

function highlight(task: BoardTask): void {
  state.highlightedId = task.id;
  syncComments(task.id);
  if (!state.wide) {
    state.previewOpen = true;
    renderBody();
    return;
  }
  renderBody();
}

function renderPreview(task: BoardTask | null): HTMLElement {
  const preview = el("div", { className: "attach-preview" });
  if (!task) {
    const holder = el("div", { style: "flex:1; display:flex; align-items:center;" });
    preview.append(holder);
    mountEmpty(holder, {
      title: "Select a task",
      body: "Pick a task on the left to preview it here before attaching.",
    });
    return preview;
  }

  syncComments(task.id);
  const target = targetFor(task);

  if (!state.wide) {
    const back = el("div");
    preview.append(back);
    mountButton(back, {
      label: "Back",
      variant: "ghost",
      size: "sm",
      onClick: () => {
        state.previewOpen = false;
        renderBody();
      },
    });
  }

  const head = el("div", { className: "picker-head" });
  head.append(el("span", { className: "state-pill" }, target.columnName));
  head.append(el("span", { className: "task-key" }, target.ticketId));
  const open = el("div", { style: "margin-left:auto;" });
  head.append(open);
  mountButton(open, {
    label: "Kaneo",
    variant: "ghost",
    size: "sm",
    onClick: () => void openInKaneo(target),
  });
  preview.append(head);

  preview.append(el("h2", { className: "detail-title" }, task.title));
  preview.append(detailMeta(target));
  preview.append(detailDescription(target, 1200));
  preview.append(detailComments(state.comments[task.id] ?? null));

  const note = el("div", { className: "pick-note" });
  const toggle = el("div");
  note.append(toggle);
  mountCheckbox(toggle, {
    label: "Create in a new worktree",
    checked: state.worktree,
    onChange: (worktree) => {
      state.worktree = worktree;
    },
  });
  note.append(el("p", { className: "muted" }, "The agent gets the description and comments."));
  const start = el("div", { className: "block" });
  note.append(start);
  mountButton(start, {
    label: "Start session",
    variant: "secondary",
    size: "sm",
    onClick: () => {
      void attachAndStart(task).catch((error: unknown) => {
        void host.toast({
          kind: "error",
          message: describeAndLog("Start session", error),
          dismiss: true,
        });
      });
    },
  });
  preview.append(note);

  return preview;
}

function renderFoot(): void {
  if (!footRoot) return;
  clear(footRoot);

  const task = highlighted();
  footRoot.append(
    el(
      "span",
      { className: "attach-hint" },
      task ? "Enter attaches the highlighted task." : "Select a task to attach.",
    ),
  );

  mountButton(footRoot, {
    label: "Cancel",
    variant: "outline",
    size: "sm",
    onClick: () => void host.close(),
  });
  const attachHolder = el("div");
  footRoot.append(attachHolder);
  mountButton(attachHolder, {
    label: "Attach",
    size: "sm",
    disabled: !task,
    onClick: () => {
      if (task) void attach(task);
    },
  });
}

function renderCreateForm(showTabs: boolean): void {
  const head = el("div", { className: "attach-head" });
  root?.append(head);
  if (showTabs) {
    const tabsHolder = el("div");
    head.append(tabsHolder);
    mountTabs(tabsHolder, {
      items: [
        { id: "board", label: state.project?.slug.toUpperCase() ?? "Tasks" },
        { id: "create", label: "New" },
      ],
      activeId: "create",
      onChange: (id) => {
        state.tab = id === "board" ? "board" : "create";
        render();
      },
    });
  } else {
    head.append(el("h2", { className: "detail-title" }, "New Kaneo task"));
  }

  const body = el("div", { className: "dialog-body" });
  root?.append(body);

  if (state.error) {
    const holder = el("div");
    body.append(holder);
    mountBanner(holder, { tone: "error", title: "Kaneo", body: state.error });
  }

  const titleHolder = el("div");
  body.append(titleHolder);
  mountTextField(titleHolder, {
    label: "Title",
    value: state.draft.title,
    placeholder: "What needs doing?",
    error:
      state.draft.title.length > TITLE_MAX ? `Keep it under ${TITLE_MAX} characters.` : undefined,
    onChange: (value) => {
      state.draft.title = value;
    },
  });

  const priorityHolder = el("div");
  body.append(priorityHolder);
  mountSelect(priorityHolder, {
    label: "Priority",
    value: state.draft.priority,
    options: PRIORITIES.map((priority) => ({ id: priority, label: priorityLabel(priority) })),
    onChange: (id) => {
      state.draft.priority = id as Priority;
    },
  });

  const descriptionHolder = el("div");
  body.append(descriptionHolder);
  mountTextField(descriptionHolder, {
    label: "Description",
    value: state.draft.description,
    multiline: true,
    rows: 5,
    placeholder: "Markdown is supported.",
    onChange: (value) => {
      state.draft.description = value;
    },
  });

  const foot = el("div", { className: "attach-foot" });
  root?.append(foot);
  mountButton(foot, {
    label: "Cancel",
    variant: "outline",
    size: "sm",
    onClick: () => void host.close(),
  });
  const createHolder = el("div");
  foot.append(createHolder);
  mountButton(createHolder, {
    label: "Create and attach",
    size: "sm",
    onClick: () => void createTask(),
  });
}

/** Turn a message or session into the starting point of a new task. */
function draftFromSource(item: GuestMessageItem | GuestSessionItem): Draft {
  const raw = item.kind === "message" ? item.text : item.sessionTitle;
  const lines = raw.split("\n").filter((line) => line.trim().length > 0);
  const title = (firstLine(lines[0] ?? "", TITLE_MAX) || "Untitled task").slice(0, TITLE_MAX);
  const rest = lines.slice(1).join("\n").trim();
  const source = item.kind === "session" ? `Session: ${item.sessionTitle}` : `From a chat message`;
  return {
    title,
    description: [source, rest].filter(Boolean).join("\n\n"),
    priority: "medium",
  };
}

/**
 * Resolve a task's comments once, then repaint the preview. Called from a
 * render path, so it must not recurse before the fetch settles.
 */
function syncComments(taskId: string): void {
  if (state.comments[taskId]) return;
  state.comments[taskId] = { loading: true, error: null };
  void client
    .listComments(taskId)
    .then((comments) => {
      state.comments[taskId] = { loading: false, error: null, items: comments };
      renderBody();
    })
    .catch((error: unknown) => {
      state.comments[taskId] = { loading: false, error: describeAndLog("Load comments", error) };
      renderBody();
    });
}

/** Enter attaches the highlighted task, the way the reference picker does. */
document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.shiftKey || state.tab !== "board" || state.source) return;
  const tag = document.activeElement?.tagName.toLowerCase() ?? "";
  if (tag === "textarea" || tag === "button") return;
  const task = highlighted();
  if (!task) return;
  event.preventDefault();
  void attach(task);
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  installStyles();
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  state.ready = ctx;

  // Seed the tab and the draft from the opening item only once; a later
  // `onReady` is a theme or session update and must not reset the user's tab.
  if (!booted) {
    booted = true;
    if (isGuestMessageItem(ctx.item) || isGuestSessionItem(ctx.item)) {
      state.source = ctx.item;
      state.draft = draftFromSource(ctx.item);
      state.tab = "create";
    }
    observeWidth();
  }

  render();
  // The connection is the local service's token, not a host integration, so it
  // is read once here and again after a sign-in.
  if (!accountsResolved && !accountsChecking) {
    accountsChecking = true;
    void refreshConnection();
  }
});

async function refreshConnection(): Promise<void> {
  state.connected = Boolean((await kaneoAccount().catch(() => null))?.connected);
  accountsChecking = false;
  accountsResolved = true;
  render();
  if (state.connected && !loaded) {
    loaded = true;
    void load();
  }
}

/** The dialog can be resized; below the breakpoint the panes stack. */
function observeWidth(): void {
  if (!root || !globalThis.ResizeObserver) return;
  const observer = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width ?? 0;
    const wide = width === 0 || width >= NARROW_WIDTH;
    if (wide === state.wide) return;
    state.wide = wide;
    if (wide) state.previewOpen = false;
    render();
  });
  observer.observe(root);
}

host.onItem((item) => {
  if (!item || !("providerId" in item)) return;
  const data = item.data as { ticketId?: string } | undefined;
  void host.toast({
    kind: "info",
    message: data?.ticketId
      ? `${data.ticketId} is already attached to this chat.`
      : "That item is already attached to this chat.",
  });
});
