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
  mountEmpty,
  mountSearchField,
  mountSelect,
  mountSpinner,
  mountTabs,
  mountTextField,
} from "@openchamber/sdk/ui";

import { KaneoError, createKaneoClient } from "../shared/client";
import { PRIORITIES, type Priority } from "../shared/constants";
import { clear, el } from "../shared/dom";
import { host } from "../shared/host";
import { attachChip, startSessionWithChip } from "../shared/attachments";
import { firstLine, priorityLabel, ticketIdOf } from "../shared/format";
import { loadPreferences } from "../shared/preferences";
import { installStyles } from "../shared/styles";
import { kaneoWordmark } from "../shared/logo";
import { renderTaskRow } from "../shared/list-row";
import type { BoardTask, ProjectListItem } from "../shared/types";
import {
  NoWorkspaceError,
  bootstrap,
  readSettings,
  resolveProject,
  type WorkspaceContext,
} from "../shared/workspace";

/**
 * The picker behind the composer's + menu. It lists tasks from the selected
 * project, searches the workspace, and attaches the chosen one as a chip.
 *
 * Two entry paths share this page. The + menu arrives with no item; a message
 * or session action arrives with `ready.item`, and the page opens in create
 * mode with the item's text as the draft title and description.
 */

const root = document.querySelector<HTMLElement>("#root");
if (!root) throw new Error("Kaneo attach dialog is missing its #root element.");

const client = createKaneoClient((input) => host.request(input));
const TITLE_MAX = 200;

type Draft = {
  title: string;
  description: string;
  priority: Priority;
};

interface State {
  ready: HostReadyContext | null;
  context: WorkspaceContext | null;
  project: ProjectListItem | null;
  /** Every task in the selected project, grouped by column name. */
  boardTasks: BoardTask[];
  columnNames: Record<string, string>;
  defaultStatus: string;
  /** Search hits, or null while the picker shows the plain board. */
  results: BoardTask[] | null;
  search: string;
  tab: "board" | "create";
  loading: boolean;
  error: string | null;
  draft: Draft;
  /** The message or session that opened create mode, if any. */
  source: GuestMessageItem | GuestSessionItem | null;
}

const state: State = {
  ready: null,
  context: null,
  project: null,
  boardTasks: [],
  columnNames: {},
  defaultStatus: "to-do",
  results: null,
  search: "",
  tab: "board",
  loading: true,
  error: null,
  draft: { title: "", description: "", priority: "medium" },
  source: null,
};

let renderToken = 0;
let renderSearch = 0;

function describe(error: unknown): string {
  if (error instanceof KaneoError) return `${error.code}: ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

function ticketFor(task: BoardTask): string {
  return ticketIdOf(state.project?.slug ?? "", task.number);
}

function boardMatches(task: BoardTask): boolean {
  const needle = state.search.trim().toLowerCase();
  if (!needle) return true;
  return (
    task.title.toLowerCase().includes(needle) || ticketFor(task).toLowerCase().includes(needle)
  );
}

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
    state.error = context.projectsError ? describe(context.projectsError) : null;
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
        : `Could not reach Kaneo. ${describe(error)}`;
    render();
  }
}

async function searchWorkspace(): Promise<void> {
  const token = ++renderSearch;
  const workspaceId = state.context?.workspaceId;
  const query = state.search.trim();
  if (!workspaceId || query.length < 2) {
    state.results = null;
    render();
    return;
  }
  state.loading = true;
  render();
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
    render();
  } catch (error) {
    if (token !== renderSearch) return;
    state.loading = false;
    state.error = describe(error);
    renderResults();
  }
}

async function attach(task: BoardTask): Promise<void> {
  try {
    await attachChip({
      task,
      ticketId: ticketFor(task),
      workspaceId: state.context?.workspaceId ?? "",
      projectName: state.project?.name,
      columnName: state.columnNames[task.status] ?? task.status,
    });
    await host.toast({ kind: "success", message: `${ticketFor(task)} attached to the chat.` });
    await host.close();
  } catch (error) {
    await host.toast({
      kind: "error",
      message: `Attach failed: ${describe(error)}`,
      dismiss: true,
    });
  }
}

async function attachAndStart(task: BoardTask): Promise<void> {
  const result = await startSessionWithChip({
    task,
    ticketId: ticketFor(task),
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName: state.columnNames[task.status] ?? task.status,
  });
  if (result.sessionId === null) {
    await host.toast({
      kind: "error",
      message: `No session was created${result.failure ? ` (${result.failure})` : ""}. The worktree was kept.`,
      dismiss: true,
    });
    return;
  }
  await host.toast({ kind: "success", message: `Session started for ${ticketFor(task)}.` });
  await host.close();
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
    state.error = describe(error);
    render();
  }
}

/* ----------------------------------------------------------------- render */

/**
 * The results region, kept between renders so typing in the search box
 * refreshes the rows without rebuilding the toolbar and dropping focus.
 */
let resultsRoot: HTMLElement | null = null;
let footRoot: HTMLElement | null = null;

function render(): void {
  if (!root) return;
  clear(root);
  resultsRoot = null;
  footRoot = null;

  if (!state.ready) {
    mountSpinner(root, { label: "Connecting to Kaneo" });
    return;
  }

  if (!state.ready.connection.connected) {
    mountEmpty(root, {
      title: "Kaneo is not connected",
      body: "Add an API token in Settings → Integrations → Kaneo.",
    });
    return;
  }

  if (state.source) {
    renderCreate();
    return;
  }
  renderPicker();
}

function renderPicker(): void {
  root?.append(kaneoWordmark("Attach a Kaneo task"));
  const tabsHolder = el("div");
  root?.append(tabsHolder);
  mountTabs(tabsHolder, {
    items: [
      { id: "board", label: state.project?.slug.toUpperCase() ?? "Board" },
      { id: "create", label: "New" },
    ],
    activeId: state.tab,
    onChange: (id) => {
      state.tab = id === "create" ? "create" : "board";
      render();
    },
  });

  if (state.tab === "create") {
    renderCreate();
    return;
  }

  if (state.context && state.context.projects.length > 1) {
    const holder = el("div");
    root?.append(holder);
    mountSelect(holder, {
      label: "Project",
      searchable: true,
      value: state.project?.id ?? "",
      options: state.context.projects.map((project) => ({
        id: project.id,
        label: project.slug.toUpperCase(),
      })),
      onChange: (id) => {
        state.project = state.context?.projects.find((entry) => entry.id === id) ?? null;
        state.search = "";
        state.results = null;
        state.loading = true;
        void load();
      },
    });
  }

  const searchHolder = el("div");
  root?.append(searchHolder);
  mountSearchField(searchHolder, {
    value: state.search,
    label: "Search Kaneo",
    placeholder: "Search this workspace",
    onChange: (value) => {
      state.search = value;
      if (value.trim().length >= 2) {
        void searchWorkspace();
        return;
      }
      state.results = null;
      renderResults();
    },
  });

  resultsRoot = el("div", { className: "dialog-body" });
  root?.append(resultsRoot);
  footRoot = el("div", { className: "dialog-foot" });
  root?.append(footRoot);
  renderResults();
}

/** Rebuild the task list and footer; the search field keeps its focus. */
function renderResults(): void {
  if (!resultsRoot || !footRoot) return;
  clear(resultsRoot);
  clear(footRoot);

  if (state.error) {
    const holder = el("div");
    resultsRoot.append(holder);
    mountBanner(holder, {
      tone: state.results ? "warning" : "error",
      title: "Kaneo",
      body: state.error,
      ...(state.results ? {} : { action: { label: "Retry", onClick: () => void load() } }),
    });
  }

  const rows = (state.results ?? state.boardTasks).filter(boardMatches);

  if (state.loading && rows.length === 0) {
    mountSpinner(resultsRoot, { label: "Loading tasks" });
    return;
  }

  if (rows.length === 0) {
    mountEmpty(resultsRoot, {
      title: state.search.trim() ? "No task matches" : "This project has no tasks",
      body: state.search.trim()
        ? "Search runs inside the selected workspace."
        : "Use the New tab to create the first one.",
    });
    return;
  }

  const listHolder = el("div", { className: "scroll" });
  resultsRoot.append(listHolder);
  for (const task of rows) {
    listHolder.append(
      renderTaskRow({
        task,
        ticketId: ticketFor(task),
        column: {
          slug: task.status,
          isFinal: false,
          name: state.columnNames[task.status] ?? task.status,
        },
        selected: false,
        onActivate: () => void attach(task),
      }),
    );
  }

  mountButton(footRoot, {
    label: "Cancel",
    variant: "ghost",
    onClick: () => void host.close(),
  });
  const first = rows[0];
  if (first) {
    mountButton(footRoot, {
      label: "Attach and start session",
      variant: "secondary",
      onClick: () => void attachAndStart(first),
    });
  }
}

function renderCreate(): void {
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

  const foot = el("div", { className: "dialog-foot" });
  root?.append(foot);
  mountButton(foot, {
    label: "Cancel",
    variant: "ghost",
    onClick: () => void host.close(),
  });
  mountButton(foot, {
    label: "Create and attach",
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

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  installStyles();
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  state.ready = ctx;

  if (isGuestMessageItem(ctx.item) || isGuestSessionItem(ctx.item)) {
    state.source = ctx.item;
    state.draft = draftFromSource(ctx.item);
    state.tab = "create";
  } else {
    // A chip click reopens this dialog for the task already attached.
    state.tab = "board";
  }

  render();
  // Without a token every call answers 401, so the picker stays on the connect
  // screen instead of flashing an error banner.
  if (state.ready.connection.connected) void load();
});

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
