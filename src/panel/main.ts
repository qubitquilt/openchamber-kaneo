import type { HostReadyContext } from "@openchamber/sdk";
import {
  applyHostReady,
  mountBanner,
  mountButton,
  mountEmpty,
  mountList,
  mountMenu,
  mountSearchField,
  mountSelect,
  mountSpinner,
} from "@openchamber/sdk/ui";

import { KaneoError, createKaneoClient } from "../shared/client";
import { PRIORITIES, PRIORITY_RANK, type Priority } from "../shared/constants";
import { clear, el } from "../shared/dom";
import { host } from "../shared/host";
import { reportFailure, type ChipTarget } from "../shared/attachments";
import { detailScaffold, type CommentState } from "../shared/detail";
import { columnLabel, priorityLabel, ticketIdOf } from "../shared/format";
import { loadPreferences, savePreferences, type Preferences } from "../shared/preferences";
import { installStyles } from "../shared/styles";
import { watchSessionLifecycle } from "../shared/lifecycle";
import type { AssignedTask, BoardColumn, BoardTask, Label, ProjectListItem } from "../shared/types";
import {
  NoWorkspaceError,
  bootstrap,
  invalidateBootstrapCache,
  readSettings,
  refreshBadge,
  resolveProject,
  type WorkspaceContext,
} from "../shared/workspace";

/**
 * The rail panel, shaped like OpenChamber's own Linear issues panel: one list of
 * the selected project's tasks with a search box and a row of filters, and an
 * in-place detail that opens the task with its status, metadata and comments.
 */

const root = document.querySelector<HTMLElement>("#root");
if (!root) throw new Error("Kaneo panel is missing its #root element.");

const client = createKaneoClient((input) => host.request(input));

interface PanelState {
  ready: HostReadyContext | null;
  connected: boolean;
  context: WorkspaceContext | null;
  project: ProjectListItem | null;
  board: Awaited<ReturnType<typeof client.getBoard>> | null;
  labels: Label[];
  /** Tasks assigned to the account across the whole workspace. */
  mine: AssignedTask[];
  mineLoaded: boolean;
  mineTotal: number;
  /** A task fetched for a chip click that is not on the selected board. */
  extraTask: BoardTask | null;
  /** Comments per task, loaded once when a detail opens. */
  comments: Record<string, CommentState>;
  preferences: Preferences;
  search: string;
  loading: boolean;
  error: string | null;
}

const state: PanelState = {
  ready: null,
  connected: false,
  context: null,
  project: null,
  board: null,
  labels: [],
  mine: [],
  mineLoaded: false,
  mineTotal: 0,
  extraTask: null,
  comments: {},
  preferences: {
    workspaceId: null,
    projectId: null,
    openTaskId: null,
    groupBy: "column",
    priorityFilter: "any",
    statusFilter: null,
    view: "list",
    assigneeFilter: "any",
    labelFilter: null,
    createInWorktree: false,
  },
  search: "",
  loading: true,
  error: null,
};

/** A newer render always wins, so a slow answer never overwrites a newer one. */
let renderToken = 0;
/** `onReady` repeats on theme and session changes; only the first one loads. */
let booted = false;

function describe(error: unknown): string {
  if (error instanceof KaneoError) return `${error.code}: ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

/* --------------------------------------------------------------- filtering */

function activeLabel(): Label | null {
  const id = state.preferences.labelFilter;
  return id ? (state.labels.find((label) => label.id === id) ?? null) : null;
}

function taskMatches(task: BoardTask): boolean {
  const { priorityFilter, labelFilter, statusFilter, assigneeFilter } = state.preferences;
  if (priorityFilter !== "any" && PRIORITY_RANK[task.priority] < PRIORITY_RANK[priorityFilter]) {
    return false;
  }
  if (labelFilter && !(task.labels ?? []).some((label) => label.id === labelFilter)) {
    return false;
  }
  if (statusFilter && task.status !== statusFilter) return false;
  if (assigneeFilter === "me" && task.assigneeId !== state.context?.user?.id) return false;
  const needle = state.search.trim().toLowerCase();
  if (!needle) return true;
  const ticket = ticketIdOf(state.project?.slug ?? "", task.number).toLowerCase();
  return (
    task.title.toLowerCase().includes(needle) ||
    ticket.includes(needle) ||
    (task.description ?? "").toLowerCase().includes(needle)
  );
}

function visibleTasks(): BoardTask[] {
  const board = state.board?.board;
  if (!board) return [];
  const rows: BoardTask[] = [];
  for (const column of board.columns) {
    for (const task of column.tasks) {
      if (taskMatches(task)) rows.push(task);
    }
  }
  return rows;
}

/** The same filters the board uses, over a workspace-wide assigned task. */
function mineMatches(task: AssignedTask): boolean {
  const { priorityFilter, labelFilter, statusFilter } = state.preferences;
  if (priorityFilter !== "any" && PRIORITY_RANK[task.priority] < PRIORITY_RANK[priorityFilter]) {
    return false;
  }
  if (labelFilter && !(task.labels ?? []).some((label) => label.id === labelFilter)) {
    return false;
  }
  if (statusFilter && task.status !== statusFilter) return false;
  const needle = state.search.trim().toLowerCase();
  if (!needle) return true;
  const ticket = ticketIdOf(task.projectSlug, task.number).toLowerCase();
  return task.title.toLowerCase().includes(needle) || ticket.includes(needle);
}

function anyFilterActive(): boolean {
  const { priorityFilter, statusFilter, assigneeFilter, labelFilter } = state.preferences;
  return (
    state.search.trim().length > 0 ||
    priorityFilter !== "any" ||
    statusFilter !== null ||
    assigneeFilter !== "any" ||
    labelFilter !== null
  );
}

/* ------------------------------------------------------------------- data */

async function reloadBoard(): Promise<void> {
  state.board = state.project ? await client.getBoard(state.project.id) : null;
}

async function reloadMine(): Promise<void> {
  const workspaceId = state.context?.workspaceId;
  if (!workspaceId) {
    state.mine = [];
    state.mineLoaded = true;
    state.mineTotal = 0;
    return;
  }
  const assigned = await client.listAssignedTasks(workspaceId);
  state.mine = assigned.tasks;
  state.mineLoaded = true;
  state.mineTotal = assigned.total;
}

async function reloadLabels(): Promise<void> {
  const workspaceId = state.context?.workspaceId;
  if (!workspaceId) {
    state.labels = [];
    return;
  }
  const labels = await client.listLabels(workspaceId);
  const seen = new Set<string>();
  state.labels = labels.filter((label) => {
    if (seen.has(label.name)) return false;
    seen.add(label.name);
    return true;
  });
}

async function load(options: { keepDetail?: boolean } = {}): Promise<void> {
  const token = ++renderToken;
  state.loading = true;
  render();
  try {
    const { workspaceSlug, projectSlug } = readSettings(state.ready?.settings);
    const context = await bootstrap(client, workspaceSlug);
    if (token !== renderToken) return;

    state.context = context;
    state.preferences = await loadPreferences();
    state.project = resolveProject(context.projects, state.preferences.projectId, projectSlug);
    if (state.project && state.project.id !== state.preferences.projectId) {
      state.preferences = await savePreferences({ projectId: state.project.id });
    }

    state.loading = false;
    state.error = context.projectsError ? describe(context.projectsError) : null;
    render();

    const [boardResult, mineResult, labelResult] = await Promise.allSettled([
      reloadBoard(),
      reloadMine(),
      reloadLabels(),
    ]);
    if (boardResult.status === "rejected") state.error = describe(boardResult.reason);
    if (labelResult.status === "rejected") state.labels = [];
    if (mineResult.status === "rejected") {
      state.mine = [];
      state.mineLoaded = true;
      state.mineTotal = 0;
    }
    if (token !== renderToken) return;

    if (!options.keepDetail) {
      state.preferences = await savePreferences({ openTaskId: null });
    }
    await refreshBadge(state.mineTotal);
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

/* ----------------------------------------------------------------- render */

/**
 * The results region, kept between renders so typing in the search box can
 * refresh the list without rebuilding the toolbar and dropping focus.
 */
let resultsRoot: HTMLElement | null = null;

function render(): void {
  if (!root) return;
  clear(root);
  resultsRoot = null;

  if (!state.connected) {
    const holder = el("div", { style: "flex:1; display:flex; align-items:center;" });
    root.append(holder);
    mountEmpty(holder, {
      title: "Kaneo is not connected",
      body: "Add an API token in Settings → Integrations → Kaneo. Create one in Kaneo under Settings, Account, API Keys.",
      action: { label: "Reload", onClick: () => void load() },
    });
    return;
  }

  if (!state.context && state.loading) {
    const holder = el("div", { style: "flex:1; display:flex; align-items:center;" });
    root.append(holder);
    mountSpinner(holder, { label: "Loading Kaneo" });
    return;
  }

  const detail = detailTask();
  if (detail) {
    root.append(renderDetail(detail));
    return;
  }

  root.append(renderToolbar());

  if (state.error) {
    const holder = el("div");
    root.append(holder);
    mountBanner(holder, {
      tone: "error",
      title: "Kaneo",
      body: state.error,
      action: { label: "Retry", onClick: () => void load() },
    });
  }

  resultsRoot = el("div", { className: "scroll" });
  root.append(resultsRoot);
  renderList();
}

function mountTaskList(items: Array<{ id: string; title: string; leading: string }>): void {
  if (!resultsRoot) return;
  const holder = el("div");
  resultsRoot.append(holder);
  mountList(holder, {
    items,
    selectedId: state.preferences.openTaskId,
    ariaLabel: "Kaneo tasks",
    onSelect: (id) => void openDetail(id),
  });
}

/** Rebuild only the task list, leaving the toolbar (and its focus) alone. */
function renderList(): void {
  if (!resultsRoot) return;
  clear(resultsRoot);

  // "Assigned to me" is the workspace-wide list Linear's assignee filter gives.
  if (state.preferences.assigneeFilter === "me") {
    if (!state.mineLoaded) {
      mountSpinner(resultsRoot, { label: "Loading tasks" });
      return;
    }
    if (state.mine.length === 0) {
      mountEmpty(resultsRoot, {
        title: "Nothing assigned to you",
        body: "Tasks assigned to your Kaneo account across this workspace show up here.",
      });
      return;
    }
    const tasks = state.mine.filter(mineMatches);
    if (tasks.length === 0) {
      mountEmpty(resultsRoot, {
        title: "Nothing matches the filters",
        body: "Clear the search box or the filters.",
      });
      return;
    }
    mountTaskList(
      tasks.map((task) => ({
        id: task.id,
        title: task.title,
        leading: ticketIdOf(task.projectSlug, task.number),
      })),
    );
    return;
  }

  if (!state.project) {
    mountEmpty(resultsRoot, {
      title: "No project",
      body: "This workspace has no Kaneo project yet.",
    });
    return;
  }
  if (!state.board) {
    mountSpinner(resultsRoot, { label: "Loading tasks" });
    return;
  }

  const board = state.board.board;
  const tasks = visibleTasks();
  const total = board.columns.reduce((sum, column) => sum + column.tasks.length, 0);

  if (tasks.length === 0) {
    mountEmpty(resultsRoot, {
      title: total === 0 ? "This board is empty" : "Nothing matches the filters",
      body:
        total === 0
          ? "Open the + button next to the chat box to create the first task."
          : "Clear the search box or the filters.",
      ...(total === 0
        ? { action: { label: "Where do I add one?", onClick: openAttachPicker } }
        : {}),
    });
    return;
  }

  if (state.board.truncated) {
    resultsRoot.append(
      el("div", { className: "muted" }, `Showing the first ${tasks.length} tasks.`),
    );
  }

  mountTaskList(
    tasks.map((task) => ({ id: task.id, title: task.title, leading: ticketFor(task) })),
  );
}

function renderToolbar(): HTMLElement {
  const wrap = el("div", { className: "panel-head" });

  const searchHolder = el("div");
  wrap.append(searchHolder);
  mountSearchField(searchHolder, {
    value: state.search,
    label: "Filter tasks",
    placeholder: "Filter by title, ticket or description",
    onChange: (value) => {
      state.search = value;
      renderList();
    },
  });

  const bar = el("div", { className: "toolbar filters" });

  const columns = state.board?.board.columns ?? [];
  const statusName = columns.find((column) => column.id === state.preferences.statusFilter)?.name;
  filterMenu(bar, {
    label: statusName ?? "Status",
    active: state.preferences.statusFilter !== null,
    items: [
      { id: "", label: "Any status" },
      { separator: true as const },
      ...columns.map((column) => ({ id: column.id, label: column.name })),
    ],
    onSelect: (id) => {
      void savePreferences({ statusFilter: id || null }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  filterMenu(bar, {
    label:
      state.preferences.priorityFilter === "any"
        ? "Priority"
        : priorityLabel(state.preferences.priorityFilter),
    active: state.preferences.priorityFilter !== "any",
    items: [
      { id: "any", label: "Any priority" },
      { separator: true as const },
      ...PRIORITIES.map((priority) => ({ id: priority, label: priorityLabel(priority) })),
    ],
    onSelect: (id) => {
      void savePreferences({ priorityFilter: id as Priority | "any" }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  filterMenu(bar, {
    label: state.preferences.assigneeFilter === "me" ? "Assigned to me" : "Assignee",
    active: state.preferences.assigneeFilter === "me",
    items: [
      { id: "any", label: "Anyone" },
      { id: "me", label: "Assigned to me" },
    ],
    onSelect: (id) => {
      void savePreferences({ assigneeFilter: id === "me" ? "me" : "any" }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  const label = activeLabel();
  filterMenu(bar, {
    label: label ? label.name : "Labels",
    active: label !== null,
    items: [
      { id: "", label: "Any label" },
      { separator: true as const },
      ...state.labels.map((entry) => ({ id: entry.id, label: entry.name })),
    ],
    onSelect: (id) => {
      void savePreferences({ labelFilter: id || null }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  if (anyFilterActive()) {
    const holder = el("div", { className: "filter-clear" });
    bar.append(holder);
    mountButton(holder, {
      label: "Clear",
      variant: "ghost",
      size: "sm",
      onClick: () => {
        state.search = "";
        void savePreferences({
          priorityFilter: "any",
          statusFilter: null,
          assigneeFilter: "any",
          labelFilter: null,
        }).then((preferences) => {
          state.preferences = preferences;
          render();
        });
      },
    });
  }

  const refreshHolder = el("div", { className: "filter-refresh" });
  bar.append(refreshHolder);
  mountButton(refreshHolder, {
    label: "Refresh",
    variant: "ghost",
    size: "sm",
    loading: state.loading,
    onClick: () => void load({ keepDetail: true }),
  });

  wrap.append(bar);

  const scopes = el("div", { className: "toolbar scope" });
  const workspaces = state.context?.workspaces ?? [];
  if (workspaces.length > 1) {
    const holder = el("div", { style: "flex:1; min-width:120px;" });
    scopes.append(holder);
    mountSelect(holder, {
      value: state.context?.workspaceId ?? "",
      options: workspaces.map((entry) => ({ id: entry.id, label: entry.name })),
      onChange: (id) => void switchWorkspace(id),
    });
  }
  const projects = state.context?.projects ?? [];
  if (projects.length > 0) {
    const holder = el("div", { style: "flex:1; min-width:120px;" });
    scopes.append(holder);
    mountSelect(holder, {
      searchable: projects.length > 8,
      searchPlaceholder: "Find a project",
      value: state.project?.id ?? "",
      options: projects.map((project) => ({
        id: project.id,
        label: project.slug.toUpperCase(),
        hint: project.statistics ? `${project.statistics.totalTasks}` : undefined,
      })),
      onChange: (id) => void switchProject(id),
    });
  }
  if (scopes.childElementCount > 0) wrap.append(scopes);

  return wrap;
}

function filterMenu(
  bar: HTMLElement,
  props: {
    label: string;
    items: Array<{ id: string; label: string } | { separator: true }>;
    active: boolean;
    onSelect: (id: string) => void;
  },
): void {
  const holder = el("div", { className: props.active ? "filter filter-active" : "filter" });
  bar.append(holder);
  mountMenu(holder, {
    label: props.label,
    size: "sm",
    variant: "ghost",
    items: props.items,
    onSelect: props.onSelect,
  });
}

/* ----------------------------------------------------------------- detail */

function findTask(taskId: string | null): BoardTask | null {
  if (!taskId || !state.board) return null;
  for (const column of state.board.board.columns) {
    const match = column.tasks.find((task) => task.id === taskId);
    if (match) return match;
  }
  return null;
}

/** The task behind the open detail: a board task, else a fetched off-board one. */
function detailTask(): BoardTask | null {
  const id = state.preferences.openTaskId;
  if (!id) return null;
  return findTask(id) ?? (state.extraTask?.id === id ? state.extraTask : null);
}

/** The project a task belongs to, which may differ from the panel's selection. */
function projectFor(task: BoardTask): ProjectListItem | null {
  return state.context?.projects.find((project) => project.id === task.projectId) ?? state.project;
}

function ticketFor(task: BoardTask): string {
  return ticketIdOf(projectFor(task)?.slug ?? "", task.number);
}

function columnNameFor(task: BoardTask): string {
  return (
    state.board?.board.columns.find((column) => column.id === task.status)?.name ??
    columnLabel(task.status)
  );
}

function targetFor(task: BoardTask): ChipTarget {
  return {
    task,
    ticketId: ticketFor(task),
    workspaceId: state.context?.workspaceId ?? "",
    projectName: projectFor(task)?.name,
    columnName: columnNameFor(task),
    comments: state.comments[task.id]?.items,
  };
}

function ensureComments(taskId: string): void {
  if (state.comments[taskId]) return;
  state.comments[taskId] = { loading: true, error: null };
  void client
    .listComments(taskId)
    .then((comments) => {
      state.comments[taskId] = { loading: false, error: null, items: comments };
      render();
    })
    .catch((error: unknown) => {
      state.comments[taskId] = { loading: false, error: describe(error) };
      render();
    });
}

/** A chip click can name a task outside the selected board; fetch it first. */
async function openDetail(taskId: string): Promise<void> {
  if (!findTask(taskId) && state.extraTask?.id !== taskId) {
    try {
      state.extraTask = await client.getTask(taskId);
    } catch (error) {
      await reportFailure("Open task", error);
      return;
    }
  }
  state.preferences = await savePreferences({ openTaskId: taskId });
  render();
}

async function closeDetail(): Promise<void> {
  state.preferences = await savePreferences({ openTaskId: null });
  render();
}

async function moveFromPanel(task: BoardTask, columnId: string): Promise<void> {
  if (task.status === columnId) return;
  const column = state.board?.board.columns.find((entry) => entry.id === columnId);
  await client.updateTaskStatus(task.id, columnId);
  await host.toast({
    kind: "success",
    message: `${ticketFor(task)} moved to ${column?.name ?? columnId}.`,
  });
  // A move changes the project's statistics, so do not serve the cached list.
  await invalidateBootstrapCache();
  await load({ keepDetail: true });
}

function renderDetail(task: BoardTask): HTMLElement {
  ensureComments(task.id);
  const target = targetFor(task);
  const columns: BoardColumn[] = state.board?.board.columns ?? [];
  const finalColumn = columns.find((column) => column.isFinal);
  return detailScaffold(target, {
    columns,
    comments: state.comments[task.id] ?? null,
    worktree: state.preferences.createInWorktree,
    onWorktreeChange: (worktree) => {
      state.preferences = { ...state.preferences, createInWorktree: worktree };
      void savePreferences({ createInWorktree: worktree });
    },
    onMove: (columnId) => void moveFromPanel(task, columnId),
    onCloseIssue: () => {
      if (finalColumn) void moveFromPanel(task, finalColumn.id);
    },
    canCloseIssue: Boolean(finalColumn) && task.status !== finalColumn?.id,
    onBack: () => void closeDetail(),
  });
}

/* ---------------------------------------------------------------- actions */

async function switchWorkspace(workspaceId: string): Promise<void> {
  if (workspaceId === state.context?.workspaceId) return;
  state.preferences = await savePreferences({ workspaceId, projectId: null, openTaskId: null });
  state.board = null;
  state.mine = [];
  state.mineLoaded = false;
  state.extraTask = null;
  await load();
}

async function switchProject(projectId: string): Promise<void> {
  if (projectId === state.project?.id) return;
  state.preferences = await savePreferences({ projectId, openTaskId: null });
  state.project = state.context?.projects.find((entry) => entry.id === projectId) ?? null;
  state.board = null;
  state.extraTask = null;
  await load();
}

function openAttachPicker(): void {
  // The host owns the composer + menu and exposes no call that opens it from a
  // panel, so the button teaches the path instead of pretending to open it.
  void host.toast({
    kind: "info",
    message: "Open the + button next to the chat box to pick and attach a task.",
    dismiss: true,
  });
}

/** Mount the panel once, then refresh when the theme or the connection moves. */
host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  installStyles();
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  state.ready = ctx;
  state.connected = ctx.connection.connected;
  render();
  // Without a token every call answers 401, so the panel stays on the connect
  // screen instead of flashing an error banner. Later `onReady` calls are
  // theme or session updates, which must not refetch the whole board.
  if (state.connected && !booted) {
    booted = true;
    void load();
  }
});

host.onConnection((connection) => {
  const wasConnected = state.connected;
  state.connected = connection.connected;
  if (wasConnected === connection.connected) return;
  render();
  // Reconnecting is the one time after the first load that the data is stale.
  if (connection.connected) void load();
});

// Status comments on Kaneo for sessions this extension started. The
// OpenChamber web URL is optional; without it the comment has no link.
host.onReady((ctx) => {
  const url = ctx.settings["openchamber-url"]?.trim();
  watchSessionLifecycle(client, url || undefined);
});

/** Chip clicks land here; a chip click restores the task it came from. */
host.onItem((item) => {
  if (!item || !("providerId" in item) || item.providerId !== "kaneo") return;
  const data = item.data as { taskId?: string } | undefined;
  if (!data?.taskId) return;
  void openDetail(data.taskId);
});
