import type { HostReadyContext } from "@openchamber/sdk";
import {
  applyHostReady,
  mountBanner,
  mountButton,
  mountEmpty,
  mountMenu,
  mountSearchField,
  mountSelect,
  mountSpinner,
  mountTabs,
} from "@openchamber/sdk/ui";

import { KaneoError, createKaneoClient } from "../shared/client";
import { PRIORITIES, PRIORITY_RANK, type Priority } from "../shared/constants";
import { clear, collapsibleMarkdown, el } from "../shared/dom";
import { host } from "../shared/host";
import {
  attachChip,
  composeChip,
  openInKaneo,
  reportFailure,
  startSessionWithChip,
  startWorktreeWithChip,
} from "../shared/attachments";
import { dueLabel, priorityLabel, ticketIdOf } from "../shared/format";
import {
  loadPreferences,
  rememberSession,
  savePreferences,
  type Preferences,
} from "../shared/preferences";
import { installStyles } from "../shared/styles";
import { renderTaskRow } from "../shared/list-row";
import { watchSessionLifecycle } from "../shared/lifecycle";
import type { BoardTask, Label, ProjectListItem } from "../shared/types";
import {
  NoWorkspaceError,
  bootstrap,
  invalidateBootstrapCache,
  readSettings,
  refreshBadge,
  resolveProject,
  type WorkspaceContext,
} from "../shared/workspace";

const root = document.querySelector<HTMLElement>("#root");
if (!root) throw new Error("Kaneo panel is missing its #root element.");

const client = createKaneoClient((input) => host.request(input));

interface MineRow {
  id: string;
  ticketId: string;
  title: string;
  summary: string;
  /** The task's own project, which may differ from the panel's selection. */
  projectName: string;
  projectId: string;
  statusName: string | null;
}

interface PanelState {
  ready: HostReadyContext | null;
  connected: boolean;
  context: WorkspaceContext | null;
  project: ProjectListItem | null;
  board: Awaited<ReturnType<typeof client.getBoard>> | null;
  labels: Label[];
  mine: MineRow[];
  mineTotal: number;
  preferences: Preferences;
  search: string;
  tab: "board" | "mine";
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
  mineTotal: 0,
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
  },
  search: "",
  tab: "board",
  loading: true,
  error: null,
};

/** A newer render always wins, so a slow answer never overwrites a newer one. */
let renderToken = 0;

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

/* ------------------------------------------------------------------- data */

async function reloadBoard(): Promise<void> {
  state.board = state.project ? await client.getBoard(state.project.id) : null;
}

async function reloadMine(): Promise<void> {
  const workspaceId = state.context?.workspaceId;
  if (!workspaceId) {
    state.mine = [];
    state.mineTotal = 0;
    return;
  }
  const assigned = await client.listAssignedTasks(workspaceId);
  state.mineTotal = assigned.total;
  state.mine = assigned.tasks.map((task) => ({
    id: task.id,
    ticketId: ticketIdOf(task.projectSlug, task.number),
    title: task.title,
    summary: `${task.projectName} · ${task.statusName ?? task.status}`,
    projectName: task.projectName,
    projectId: task.projectId,
    statusName: task.statusName,
  }));
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
 * refresh the rows without rebuilding the toolbar — rebuilding it would drop
 * the input's focus after one character.
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

  root.append(renderSelectors());

  const tabsHolder = el("div");
  root.append(tabsHolder);
  mountTabs(tabsHolder, {
    items: [
      { id: "board", label: "Board" },
      { id: "mine", label: "Mine", count: state.mineTotal },
    ],
    activeId: state.tab,
    onChange: (id) => {
      state.tab = id === "mine" ? "mine" : "board";
      render();
    },
  });

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

  const searchHolder = el("div");
  root.append(searchHolder);
  mountSearchField(searchHolder, {
    value: state.search,
    label: "Filter tasks",
    placeholder: state.tab === "mine" ? "Filter assigned tasks" : "Filter this board",
    onChange: (value) => {
      state.search = value;
      renderResults();
    },
  });

  root.append(renderFilters());

  resultsRoot = el("div", { className: "scroll" });
  root.append(resultsRoot);
  renderResults();

  const detail = findTask(state.preferences.openTaskId);
  if (detail) root.append(renderDetail(detail));
}

/** Rebuild only the task lists, leaving the toolbar (and its focus) alone. */
function renderResults(): void {
  if (!resultsRoot) return;
  clear(resultsRoot);
  if (state.tab === "mine") renderMine(resultsRoot);
  else renderBoard(resultsRoot);
}

function renderSelectors(): HTMLElement {
  const bar = el("div", { className: "toolbar" });

  const workspaces = state.context?.workspaces ?? [];
  if (workspaces.length > 1) {
    const holder = el("div", { style: "flex:1; min-width:120px;" });
    bar.append(holder);
    mountSelect(holder, {
      label: "Workspace",
      value: state.context?.workspaceId ?? "",
      options: workspaces.map((entry) => ({ id: entry.id, label: entry.name })),
      onChange: (id) => void switchWorkspace(id),
    });
  }

  const projects = state.context?.projects ?? [];
  if (projects.length > 0) {
    const holder = el("div", { style: "flex:1; min-width:120px;" });
    bar.append(holder);
    mountSelect(holder, {
      label: "Project",
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

  return bar;
}

function renderFilters(): HTMLElement {
  const bar = el("div", { className: "toolbar" });

  const priorityItems = [
    { id: "any", label: "Any priority" },
    { separator: true as const },
    ...PRIORITIES.map((priority) => ({ id: priority, label: priorityLabel(priority) })),
  ];
  const priorityHolder = el("div");
  bar.append(priorityHolder);
  mountMenu(priorityHolder, {
    label:
      state.preferences.priorityFilter === "any"
        ? "Priority"
        : priorityLabel(state.preferences.priorityFilter),
    size: "sm",
    items: priorityItems,
    onSelect: (id) => {
      void savePreferences({ priorityFilter: id as Priority | "any" }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  const columns = state.board?.board.columns ?? [];
  const statusHolder = el("div");
  bar.append(statusHolder);
  const statusName = columns.find((column) => column.id === state.preferences.statusFilter)?.name;
  mountMenu(statusHolder, {
    label: statusName ?? "Status",
    size: "sm",
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

  const assigneeHolder = el("div");
  bar.append(assigneeHolder);
  mountMenu(assigneeHolder, {
    label: state.preferences.assigneeFilter === "me" ? "Assigned to me" : "Assignee",
    size: "sm",
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

  const labelItems = [
    { id: "", label: "Any label" },
    { separator: true as const },
    ...state.labels.map((label) => ({ id: label.id, label: label.name })),
  ];
  const labelHolder = el("div");
  bar.append(labelHolder);
  const label = activeLabel();
  mountMenu(labelHolder, {
    label: label ? label.name : "Label",
    size: "sm",
    items: labelItems,
    onSelect: (id) => {
      void savePreferences({ labelFilter: id || null }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  const refreshHolder = el("div", { style: "margin-left:auto;" });
  bar.append(refreshHolder);
  mountButton(refreshHolder, {
    label: "Refresh",
    variant: "ghost",
    size: "sm",
    loading: state.loading,
    onClick: () => void load({ keepDetail: true }),
  });

  return bar;
}

function renderBoard(scroller: HTMLElement): void {
  if (!state.project) {
    mountEmpty(scroller, { title: "No project", body: "This workspace has no Kaneo project yet." });
    return;
  }
  if (!state.board) {
    mountSpinner(scroller, { label: "Loading tasks" });
    return;
  }

  const board = state.board.board;
  const total = board.columns.reduce((sum, column) => sum + column.tasks.length, 0);
  const shown = board.columns.reduce(
    (sum, column) => sum + column.tasks.filter(taskMatches).length,
    0,
  );

  if (shown === 0) {
    mountEmpty(scroller, {
      title: total === 0 ? "This board is empty" : "Nothing matches the filters",
      body:
        total === 0
          ? "Open the + button next to the chat box to create the first task."
          : "Clear the search box or the priority and label filters.",
      ...(total === 0
        ? { action: { label: "Where do I add one?", onClick: openAttachPicker } }
        : {}),
    });
    return;
  }

  if (state.board.truncated) {
    scroller.append(
      el("div", { className: "muted" }, `Showing the first ${shown} of ${total} tasks.`),
    );
  }

  for (const column of board.columns) {
    const tasks = column.tasks.filter(taskMatches);
    const group = el("div", { className: "group" });
    group.append(
      el(
        "div",
        { className: "group-head" },
        el("span", { className: "eyebrow" }, column.name),
        el("span", { className: "count-pill" }, String(tasks.length)),
      ),
    );
    if (tasks.length === 0) {
      group.append(el("div", { className: "muted" }, "Empty"));
    } else {
      for (const task of tasks) {
        group.append(
          renderTaskRow({
            task,
            ticketId: ticketIdOf(state.project?.slug ?? "", task.number),
            column,
            selected: task.id === state.preferences.openTaskId,
            onActivate: () => void openDetail(task.id),
          }),
        );
      }
    }
    scroller.append(group);
  }
}

function renderMine(scroller: HTMLElement): void {
  const needle = state.search.trim().toLowerCase();
  const rows = state.mine.filter(
    (row) =>
      !needle ||
      row.title.toLowerCase().includes(needle) ||
      row.ticketId.toLowerCase().includes(needle),
  );

  if (rows.length === 0) {
    mountEmpty(scroller, {
      title: state.mine.length === 0 ? "Nothing assigned to you" : "Nothing matches the filter",
      body:
        state.mine.length === 0
          ? "Tasks assigned to your Kaneo account in this workspace show up here."
          : undefined,
    });
    return;
  }

  for (const row of rows) {
    scroller.append(
      renderTaskRow({
        task: {
          id: row.id,
          projectId: "",
          title: row.title,
          number: null,
          description: null,
          status: "",
          priority: "no-priority",
          createdAt: "",
        },
        ticketId: row.ticketId,
        column: { slug: "", isFinal: false, name: row.projectName },
        selected: false,
        onActivate: () => void attachMineRow(row.id),
      }),
    );
  }
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

function ticketFor(task: BoardTask): string {
  return ticketIdOf(state.project?.slug ?? "", task.number);
}

function columnNameFor(task: BoardTask): string {
  return (
    state.board?.board.columns.find((column) => column.id === task.status)?.name ?? task.status
  );
}

async function openDetail(taskId: string): Promise<void> {
  state.preferences = await savePreferences({ openTaskId: taskId });
  render();
}

async function closeDetail(): Promise<void> {
  state.preferences = await savePreferences({ openTaskId: null });
  render();
}

function renderDetail(task: BoardTask): HTMLElement {
  const ticketId = ticketFor(task);
  const columnName = columnNameFor(task);
  const target = {
    task,
    ticketId,
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName,
  };

  const sheet = el("div", { className: "sheet" });

  sheet.append(
    el(
      "div",
      { className: "sheet-head" },
      el(
        "div",
        { style: "flex:1; min-width:0;" },
        el("div", { className: "task-key" }, ticketId),
        el("div", { className: "sheet-title" }, task.title),
      ),
      closeButton(() => void closeDetail()),
    ),
  );

  const meta = el("dl", { className: "meta-grid" });
  const rows: Array<[string, string]> = [["Status", columnName]];
  if (task.priority !== "no-priority") rows.push(["Priority", priorityLabel(task.priority)]);
  if (task.assigneeName) rows.push(["Assignee", task.assigneeName]);
  const due = dueLabel(task.dueDate);
  if (due) rows.push(["Due", due]);
  if (task.subtaskCounts && task.subtaskCounts.total > 0) {
    rows.push(["Subtasks", `${task.subtaskCounts.completed}/${task.subtaskCounts.total} done`]);
  }
  if (task.descriptionDeferred)
    rows.push(["Description", "Too large to inline; open the task for the full text."]);
  for (const [key, value] of rows) meta.append(el("dt", {}, key), el("dd", {}, value));
  sheet.append(meta);

  const labels = task.labels ?? [];
  if (labels.length > 0) {
    sheet.append(
      el(
        "div",
        { className: "row", style: "flex-wrap:wrap;" },
        ...labels.map((label) =>
          el(
            "span",
            { className: "label-chip" },
            el("span", { className: "label-dot", style: `background:${label.color}` }),
            label.name,
          ),
        ),
      ),
    );
  }

  sheet.append(collapsibleMarkdown(task.description));

  const actions = el("div", { className: "toolbar" });
  button(actions, "Attach", async () => {
    await attachChip(target);
    await host.toast({ kind: "success", message: `${ticketId} attached to the chat.` });
  });
  button(actions, "New session", async () => {
    const result = await startSessionWithChip(target);
    if (result.sessionId === null) {
      await host.toast({
        kind: "error",
        message: `No session was created${result.failure ? ` (${result.failure})` : ""}. Check the session list before retrying.`,
        dismiss: true,
      });
      return;
    }
    await rememberSession(result.sessionId, {
      taskId: task.id,
      ticketId,
      title: `${ticketId} ${task.title}`,
    });
    await host.toast({ kind: "success", message: `Session started for ${ticketId}.` });
  });
  button(actions, "Worktree session", async () => {
    const result = await startWorktreeWithChip(target);
    if (result.sessionId === null) {
      await host.toast({
        kind: "error",
        message: `No session was created${result.failure ? ` (${result.failure})` : ""}. The worktree ${result.branch ?? ""} was kept, so check the session list before retrying.`,
        dismiss: true,
      });
      return;
    }
    await rememberSession(result.sessionId, {
      taskId: task.id,
      ticketId,
      title: `${ticketId} ${task.title}`,
    });
    await host.toast({
      kind: "success",
      message: `Session started on ${result.branch} for ${ticketId}.`,
    });
  });
  button(actions, "Send to chat", async () => {
    await composeChip(target);
  });
  button(actions, "Open in Kaneo", async () => {
    await openInKaneo(target);
  });
  sheet.append(actions);

  const columns = (state.board?.board.columns ?? []).filter((column) => column.id !== task.status);
  if (columns.length > 0) {
    const moveHolder = el("div", { className: "toolbar" });
    moveHolder.append(el("span", { className: "eyebrow" }, "Move to"));
    for (const column of columns) {
      button(moveHolder, column.name, async () => {
        await client.updateTaskStatus(task.id, column.id);
        await host.toast({ kind: "success", message: `${ticketId} moved to ${column.name}.` });
        // A move changes the project's statistics, so do not serve the
        // cached project list here.
        await invalidateBootstrapCache();
        await load({ keepDetail: true });
      });
    }
    sheet.append(moveHolder);
  }

  return sheet;
}

function button(root: HTMLElement, label: string, run: () => Promise<void>): void {
  const handle = mountButton(root, {
    label,
    variant: "secondary",
    size: "sm",
    onClick: () => {
      handle.update({ loading: true });
      void run()
        .catch((error: unknown) => reportFailure(label, error))
        .finally(() => handle.update({ loading: false }));
    },
  });
}

function closeButton(onClick: () => void): HTMLButtonElement {
  return el("button", { className: "link-button", type: "button", onClick }, "Close");
}

/* ---------------------------------------------------------------- actions */

async function switchWorkspace(workspaceId: string): Promise<void> {
  if (workspaceId === state.context?.workspaceId) return;
  state.preferences = await savePreferences({ workspaceId, projectId: null, openTaskId: null });
  state.board = null;
  state.mine = [];
  await load();
}

async function switchProject(projectId: string): Promise<void> {
  if (projectId === state.project?.id) return;
  state.preferences = await savePreferences({ projectId, openTaskId: null });
  state.project = state.context?.projects.find((entry) => entry.id === projectId) ?? null;
  state.board = null;
  await load();
}

async function attachMineRow(taskId: string): Promise<void> {
  try {
    const detail = await client.getTask(taskId);
    // The ticket, project and column all come from the task itself: a task
    // assigned in another project must not inherit this panel's selection.
    const assigned = state.mine.find((row) => row.id === taskId);
    await attachChip({
      task: detail,
      ticketId: assigned?.ticketId ?? ticketIdOf(state.project?.slug ?? "", detail.number),
      workspaceId: state.context?.workspaceId ?? detail.workspaceId ?? "",
      projectName: assigned?.projectName ?? state.project?.name,
      columnName: assigned?.statusName ?? detail.status,
    });
    await host.toast({ kind: "success", message: "Task attached to the chat." });
  } catch (error) {
    await reportFailure("Attach", error);
  }
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
  // screen instead of flashing an error banner.
  if (state.connected) void load();
});

host.onConnection((connection) => {
  const changed = connection.connected !== state.connected;
  state.connected = connection.connected;
  if (changed) render();
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
