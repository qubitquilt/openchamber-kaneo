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
import {
  loadPreferences,
  rememberSession,
  savePreferences,
  type Preferences,
} from "../shared/preferences";
import { watchSessionLifecycle } from "../shared/lifecycle";
import { renderTaskRow } from "../shared/list-row";
import { dueLabel, isOverdue, priorityLabel, ticketIdOf, relativeTimeOf } from "../shared/format";
import { renderMarkdown } from "../shared/dom";
import { installStyles } from "../shared/styles";
import { kaneoWordmark } from "../shared/logo";
import type {
  Board,
  BoardColumn,
  BoardTask,
  Comment,
  Label,
  ProjectListItem,
  TaskDetail,
} from "../shared/types";
import {
  NoWorkspaceError,
  bootstrap,
  readSettings,
  resolveProject,
  type WorkspaceContext,
} from "../shared/workspace";

/**
 * The full-screen board from the Extension pages menu. It shows every column of
 * the selected project side by side, with drag and drop between columns, and a
 * detail overlay that shares the same attach actions as the rail panel.
 */

const root = document.querySelector<HTMLElement>("#root");
if (!root) throw new Error("Kaneo board is missing its #root element.");

const client = createKaneoClient((input) => host.request(input));

interface BoardState {
  ready: HostReadyContext | null;
  connected: boolean;
  context: WorkspaceContext | null;
  project: ProjectListItem | null;
  board: Board | null;
  truncated: boolean;
  labels: Label[];
  preferences: Preferences;
  search: string;
  detailId: string | null;
  loading: boolean;
  error: string | null;
  /** Task details fetched for the Mine tab preview. */
  mineDetail: { id: string; task: TaskDetail } | null;
  /** Comments per task, loaded once when a preview opens. */
  comments: Record<string, CommentEntry>;
  listWidth: number | null;
  /** The Mine tab's rows, from listAssignedTasks. */
  mineEntries: MineEntry[];
}

interface CommentEntry {
  loading: boolean;
  error: string | null;
  items?: Comment[];
}

const state: BoardState = {
  ready: null,
  connected: false,
  context: null,
  project: null,
  board: null,
  truncated: false,
  labels: [],
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
  detailId: null,
  loading: true,
  error: null,
  mineDetail: null,
  comments: {},
  listWidth: null,
  mineEntries: [],
};

let renderToken = 0;
let searchHandle: ReturnType<typeof mountSearchField> | null = null;

function describe(error: unknown): string {
  if (error instanceof KaneoError) return `${error.code}: ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

function ticketFor(task: BoardTask): string {
  return ticketIdOf(state.project?.slug ?? "", task.number);
}

function columnOf(task: BoardTask): BoardColumn | undefined {
  return state.board?.columns.find((column) => column.id === task.status);
}

/** Board, priority, label and text filters, applied the same way everywhere. */
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
  return (
    task.title.toLowerCase().includes(needle) ||
    ticketFor(task).toLowerCase().includes(needle) ||
    (task.description ?? "").toLowerCase().includes(needle)
  );
}

function findTask(taskId: string | null): BoardTask | null {
  if (!taskId || !state.board) return null;
  for (const column of state.board.columns) {
    const match = column.tasks.find((task) => task.id === taskId);
    if (match) return match;
  }
  return null;
}

/* ------------------------------------------------------------------- data */

async function load(): Promise<void> {
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

    const [boardResult, labelResult, mineResult] = await Promise.allSettled([
      state.project ? client.getBoard(state.project.id) : Promise.resolve(null),
      context.workspaceId ? client.listLabels(context.workspaceId) : Promise.resolve([]),
      context.workspaceId
        ? client.listAssignedTasks(context.workspaceId)
        : Promise.resolve({ tasks: [], total: 0 }),
    ]);
    if (boardResult.status === "rejected") {
      state.error = describe(boardResult.reason);
      state.board = null;
    } else if (boardResult.value) {
      state.board = boardResult.value.board;
      state.truncated = boardResult.value.truncated;
    }
    if (labelResult.status === "fulfilled") state.labels = dedupeLabels(labelResult.value);
    if (mineResult.status === "fulfilled") {
      state.mineEntries = mineResult.value.tasks.map((task) => ({
        id: task.id,
        ticketId: ticketIdOf(task.projectSlug, task.number),
        title: task.title,
        projectName: task.projectName,
        statusName: task.statusName,
        priority: task.priority,
        dueDate: task.dueDate,
      }));
    }
    if (token !== renderToken) return;
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

function dedupeLabels(labels: Label[]): Label[] {
  const seen = new Set<string>();
  return labels.filter((label) => {
    if (seen.has(label.name)) return false;
    seen.add(label.name);
    return true;
  });
}

async function moveTask(taskId: string, columnId: string): Promise<void> {
  const task = findTask(taskId);
  if (!task || task.status === columnId) return;
  const columnName = columnOf(task)?.name ?? task.status;
  const target = state.board?.columns.find((entry) => entry.id === columnId)?.name ?? columnId;

  // Move locally first so the card lands under the pointer, then confirm with
  // the server. A failed move puts the card back where it was.
  const from = state.board?.columns.find((entry) => entry.id === task.status);
  from?.tasks.splice(from.tasks.indexOf(task), 1);
  const destination = state.board?.columns.find((entry) => entry.id === columnId);
  destination?.tasks.push(task);
  const previousStatus = task.status;
  task.status = columnId;
  render();

  try {
    await client.updateTaskStatus(taskId, columnId);
    await host.toast({ kind: "success", message: `${ticketFor(task)} moved to ${target}.` });
    render();
  } catch (error) {
    task.status = previousStatus;
    from?.tasks.push(task);
    destination?.tasks.splice(destination.tasks.indexOf(task), 1);
    render();
    await reportFailure(`Move to ${target}`, error);
  }
  void columnName;
}

/* ----------------------------------------------------------------- render */

/**
 * The results region, kept between renders so typing in the search box
 * refreshes the rows without rebuilding the toolbar and dropping focus.
 */
let resultsRoot: HTMLElement | null = null;

function render(): void {
  if (!root) return;
  clear(root);
  searchHandle = null;
  resultsRoot = null;

  if (!state.ready) {
    mountSpinner(root, { label: "Connecting to Kaneo" });
    return;
  }

  if (!state.connected) {
    mountEmpty(root, {
      title: "Kaneo is not connected",
      body: "Add an API token in Settings → Integrations → Kaneo.",
      action: { label: "Reload", onClick: () => void load() },
    });
    return;
  }

  root.append(renderBar());

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

  resultsRoot = el("div", { style: "flex:1; min-height:0; display:flex; flex-direction:column;" });
  root.append(resultsRoot);
  renderResults();
}

/** Rebuild only the board body; the toolbar, and the search focus, stay put. */
function renderResults(): void {
  if (!resultsRoot) return;
  clear(resultsRoot);

  if (!state.project) {
    mountEmpty(resultsRoot, {
      title: "No project",
      body: "This workspace has no Kaneo project yet.",
    });
    return;
  }

  if (!state.board) {
    mountSpinner(resultsRoot, { label: "Loading board" });
    return;
  }

  if (state.preferences.view === "kanban") {
    const board = el("div", { className: "board" });
    for (const column of state.board.columns) {
      board.append(renderColumn(column));
    }
    resultsRoot.append(board);
    if (state.truncated) {
      resultsRoot.append(
        el(
          "div",
          { className: "muted" },
          "This board holds more tasks than one page. Narrow it with the search box or filters.",
        ),
      );
    }
    const kanbanDetail = findTask(state.detailId);
    if (kanbanDetail) resultsRoot.append(renderDetail(kanbanDetail));
    return;
  }

  if (state.preferences.view === "mine") {
    resultsRoot.append(renderMineSplit());
    return;
  }

  resultsRoot.append(renderListSplit());
}

/** The toolbar row: kind tabs, project, search, filters, refresh. */
function renderBar(): HTMLElement {
  const bar = el("div", { className: "oc-toolbar" });

  const tabsHolder = el("div", { style: "flex-shrink:0;" });
  bar.append(tabsHolder);
  const tab = state.preferences.view;
  mountTabs(tabsHolder, {
    items: [
      { id: "list", label: "Tasks" },
      { id: "kanban", label: "Kanban" },
      { id: "mine", label: "Mine" },
    ],
    activeId: tab,
    onChange: (id) => {
      const view = id as "list" | "kanban" | "mine";
      void savePreferences({ view }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });

  const projects = state.context?.projects ?? [];
  if (projects.length > 0) {
    const holder = el("div", { style: "min-width:150px;" });
    bar.append(holder);
    mountSelect(holder, {
      label: "Project",
      searchable: projects.length > 8,
      value: state.project?.id ?? "",
      options: projects.map((project) => ({
        id: project.id,
        label: project.slug.toUpperCase(),
        hint: project.statistics ? `${project.statistics.totalTasks}` : undefined,
      })),
      onChange: (id) => {
        void savePreferences({ projectId: id }).then(() => {
          state.board = null;
          state.detailId = null;
          state.mineDetail = null;
          void load();
        });
      },
    });
  }

  const searchHolder = el("div", { style: "flex:1; min-width:180px;" });
  bar.append(searchHolder);
  searchHandle = mountSearchField(searchHolder, {
    value: state.search,
    label: "Filter tasks",
    placeholder: "Filter by title, ticket or description",
    onChange: (value) => {
      state.search = value;
      render();
      searchHandle?.update({ value });
    },
  });

  bar.append(
    renderPriorityFilter(),
    renderStatusFilter(),
    renderAssigneeFilter(),
    renderLabelFilter(),
  );

  const refreshHolder = el("div", { style: "margin-left:auto;" });
  bar.append(refreshHolder);
  mountButton(refreshHolder, {
    label: "Refresh",
    variant: "ghost",
    size: "sm",
    loading: state.loading,
    onClick: () => void load(),
  });

  bar.append(kaneoWordmark("Kaneo"));

  return bar;
}

function renderPriorityFilter(): HTMLElement {
  const holder = el("div");
  mountMenu(holder, {
    label:
      state.preferences.priorityFilter === "any"
        ? "Any priority"
        : priorityLabel(state.preferences.priorityFilter),
    size: "sm",
    items: [
      { id: "any", label: "Any priority" },
      { separator: true },
      ...PRIORITIES.map((priority) => ({ id: priority, label: priorityLabel(priority) })),
    ],
    onSelect: (id) => {
      void savePreferences({ priorityFilter: id as Priority | "any" }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });
  return holder;
}

function renderStatusFilter(): HTMLElement {
  const holder = el("div");
  const columns = state.board?.columns ?? [];
  const current = columns.find((column) => column.id === state.preferences.statusFilter);
  mountMenu(holder, {
    label: current ? current.name : "Any status",
    size: "sm",
    items: [
      { id: "", label: "Any status" },
      { separator: true },
      ...columns.map((column) => ({ id: column.id, label: column.name })),
    ],
    onSelect: (id) => {
      void savePreferences({ statusFilter: id || null }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });
  return holder;
}

function renderAssigneeFilter(): HTMLElement {
  const holder = el("div");
  mountMenu(holder, {
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
  return holder;
}

function renderLabelFilter(): HTMLElement {
  const holder = el("div");
  const current = state.labels.find((label) => label.id === state.preferences.labelFilter);
  mountMenu(holder, {
    label: current ? current.name : "Any label",
    size: "sm",
    items: [
      { id: "", label: "Any label" },
      { separator: true },
      ...state.labels.map((label) => ({ id: label.id, label: label.name })),
    ],
    onSelect: (id) => {
      void savePreferences({ labelFilter: id || null }).then((preferences) => {
        state.preferences = preferences;
        render();
      });
    },
  });
  return holder;
}

/* ----- the split views: a resizable list beside a preview ---------------- */

function columnById(id: string): BoardColumn | undefined {
  return state.board?.columns.find((column) => column.id === id);
}

function allBoardTasks(): BoardTask[] {
  if (!state.board) return [];
  return state.board.columns.flatMap((column) => column.tasks);
}

function renderListSplit(): HTMLElement {
  const tasks = allBoardTasks().filter(taskMatches);
  const split = el("div", { className: "split" });

  const list = el("div", { className: "split-list" });
  if (tasks.length === 0) {
    const holder = el("div");
    list.append(holder);
    mountEmpty(holder, { title: "Nothing matches", body: "Clear the search box or the filters." });
  } else {
    for (const task of tasks) {
      const column = columnById(task.status);
      if (!column) continue;
      list.append(
        renderTaskRow({
          task,
          ticketId: ticketFor(task),
          column,
          selected: task.id === state.detailId,
          onActivate: () => {
            state.detailId = task.id;
            render();
          },
        }),
      );
    }
  }

  const sep = el("div", { className: "split-sep" });
  sep.addEventListener("pointerdown", startListResize);

  const preview = el("div", { className: "split-preview" });
  const detail = findTask(state.detailId);
  if (detail) preview.append(renderPreview(detail));
  else {
    const holder = el("div", { style: "flex:1; display:flex; align-items:center;" });
    preview.append(holder);
    mountEmpty(holder, {
      title: "Select a task",
      body: "Pick a task on the left to preview it here, attach it or start a session.",
    });
  }

  split.append(list, sep, preview);
  if (state.listWidth !== null) list.style.width = `${state.listWidth}px`;
  return split;
}

interface MineEntry {
  id: string;
  ticketId: string;
  title: string;
  projectName: string;
  statusName: string | null;
  priority: string;
  dueDate: string | null;
}

function renderMineSplit(): HTMLElement {
  const needle = state.search.trim().toLowerCase();
  const rows = state.mineEntries.filter(
    (entry) =>
      !needle ||
      entry.title.toLowerCase().includes(needle) ||
      entry.ticketId.toLowerCase().includes(needle),
  );
  const split = el("div", { className: "split" });

  const list = el("div", { className: "split-list" });
  if (rows.length === 0) {
    const holder = el("div");
    list.append(holder);
    mountEmpty(holder, {
      title: state.mineEntries.length === 0 ? "Nothing assigned to you" : "Nothing matches",
      body:
        state.mineEntries.length === 0
          ? "Tasks assigned to your Kaneo account in this workspace show up here."
          : undefined,
    });
  } else {
    for (const entry of rows) {
      const row = renderTaskRow({
        task: {
          id: entry.id,
          projectId: "",
          title: entry.title,
          number: null,
          description: null,
          status: entry.statusName ?? "",
          priority: "no-priority",
          createdAt: "",
          dueDate: entry.dueDate,
        },
        ticketId: entry.ticketId,
        column: {
          slug: entry.statusName?.toLowerCase() ?? "",
          isFinal: false,
          name: entry.statusName ?? "",
        },
        selected: state.mineDetail?.id === entry.id,
        onActivate: () => void openMineEntry(entry),
      });
      list.append(row);
    }
  }

  const sep = el("div", { className: "split-sep" });
  sep.addEventListener("pointerdown", startListResize);

  const preview = el("div", { className: "split-preview" });
  if (state.mineDetail) {
    preview.append(renderPreview(state.mineDetail.task));
  } else {
    const holder = el("div", { style: "flex:1; display:flex; align-items:center;" });
    preview.append(holder);
    mountEmpty(holder, {
      title: "Select a task",
      body: "Pick an assigned task on the left to preview it.",
    });
  }

  split.append(list, sep, preview);
  if (state.listWidth !== null) list.style.width = `${state.listWidth}px`;
  return split;
}

/** The resizable divider between list and preview, like the source board's. */
function startListResize(event: PointerEvent): void {
  event.preventDefault();
  const startWidth =
    (event.target as HTMLElement).previousElementSibling instanceof HTMLElement
      ? ((event.target as HTMLElement).previousElementSibling as HTMLElement).offsetWidth
      : 280;
  const startX = event.clientX;
  const onMove = (move: PointerEvent) => {
    const width = Math.min(
      Math.max(280, startWidth + (move.clientX - startX)),
      Math.floor(window.innerWidth * 0.6),
    );
    state.listWidth = width;
    // Restyle in place; a full render per pointer move would stutter and,
    // worse, is unnecessary — nothing but the width changes.
    if (resultsRoot) {
      const list = resultsRoot.querySelector<HTMLElement>(".split-list");
      if (list) list.style.width = `${width}px`;
    }
  };
  const onUp = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

async function openMineEntry(entry: MineEntry): Promise<void> {
  state.mineDetail = { id: entry.id, task: stubFromEntry(entry) };
  render();
  try {
    const detail = await client.getTask(entry.id);
    if (state.mineDetail?.id === entry.id) {
      state.mineDetail = { id: entry.id, task: detail };
      render();
    }
  } catch (error) {
    await reportFailure("Open task", error);
  }
}

function stubFromEntry(entry: MineEntry): TaskDetail {
  return {
    id: entry.id,
    projectId: "",
    title: entry.title,
    number: null,
    description: null,
    status: entry.statusName ?? "",
    priority: "no-priority",
    createdAt: "",
    dueDate: entry.dueDate,
  };
}

/* ----- the preview pane --------------------------------------------------- */

function ensureComments(taskId: string): void {
  const entry = state.comments[taskId];
  if (entry) return;
  state.comments[taskId] = { loading: true, error: null };
  void client
    .listComments(taskId)
    .then((comments) => {
      state.comments[taskId] = { loading: false, error: null, items: comments };
      render();
    })
    .catch((error: unknown) => {
      state.comments[taskId] = {
        loading: false,
        error: error instanceof Error ? error.message : String(error),
      };
      render();
    });
}

function renderPreview(task: BoardTask): HTMLElement {
  ensureComments(task.id);
  const fragment = document.createDocumentFragment();
  const wrap = el("div", { style: "display:flex; flex-direction:column; gap:8px;" });

  const columnName = columnById(task.status)?.name ?? task.status;
  const ticketId = ticketFor(task);
  const target = {
    task,
    ticketId,
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName,
  };

  const head = el("div", { className: "preview-head" });
  const stateHolder = el("div");
  head.append(stateHolder);
  mountMenu(stateHolder, {
    label: columnName,
    items: (state.board?.columns ?? [])
      .filter((column) => column.id !== task.status)
      .map((column) => ({ id: column.id, label: column.name })),
    onSelect: (id) => {
      void moveTask(task.id, id);
    },
  });
  head.append(el("span", { className: "task-key" }, ticketId));
  const closeHolder = el("div", { style: "margin-left:auto;" });
  head.append(closeHolder);
  mountButton(closeHolder, {
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: () => {
      state.detailId = null;
      state.mineDetail = null;
      render();
    },
  });
  wrap.append(head, el("div", { className: "preview-title" }, task.title));

  const meta = el("div", { className: "row-meta" });
  if (task.assigneeName) meta.append(el("span", {}, task.assigneeName));
  if (task.priority !== "no-priority") meta.append(el("span", {}, priorityLabel(task.priority)));
  const due = dueLabel(task.dueDate);
  if (due) meta.append(el("span", { className: isOverdue(task.dueDate) ? "overdue" : "" }, due));
  const age = relativeTimeOf(task.createdAt);
  if (age) meta.append(el("span", {}, age));
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    meta.append(
      el("span", { className: "tabular" }, `${subtasks.completed}/${subtasks.total} subtasks`),
    );
  }
  if (meta.childElementCount > 0) wrap.append(meta);

  const labels = task.labels ?? [];
  if (labels.length > 0) {
    const chips = el("div", { className: "label-chips" });
    for (const label of labels) {
      chips.append(
        el(
          "span",
          { className: "label-chip" },
          el("span", { className: "label-dot", style: `background:${label.color}` }),
          label.name,
        ),
      );
    }
    wrap.append(chips);
  }

  wrap.append(collapsibleMarkdown(task.description, 1200));

  const comments = state.comments[task.id];
  const items = comments?.items;
  if (comments?.error) {
    wrap.append(el("div", { className: "muted" }, `Comments unavailable: ${comments.error}`));
  } else if (comments?.loading) {
    wrap.append(el("div", { className: "muted" }, "Loading comments…"));
  } else if (items && items.length > 0) {
    const list = el("div", { className: "comments" });
    list.append(el("span", { className: "eyebrow" }, `Comments (${items.length})`));
    for (const comment of items) {
      const when = relativeTimeOf(comment.createdAt);
      const node = el("div", { className: "comment" });
      node.append(
        el(
          "div",
          { className: "comment-head" },
          el(
            "span",
            { className: "person-avatar" },
            (comment.user?.name ?? "?").slice(0, 1).toUpperCase(),
          ),
          el("span", {}, comment.user?.name ?? "Unknown"),
          when ? el("span", {}, when) : null,
        ),
        el("div", { className: "comment-body" }, renderMarkdown(comment.content)),
      );
      list.append(node);
    }
    wrap.append(list);
  }

  const actions = el("div", { className: "toolbar" });
  previewAction(actions, "Attach", async () => {
    await attachChip(target);
    await host.toast({ kind: "success", message: `${ticketId} attached to the chat.` });
  });
  previewAction(actions, "New session", async () => {
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
  previewAction(actions, "Worktree session", async () => {
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
  previewAction(actions, "Send to chat", async () => {
    await composeChip(target);
  });
  previewAction(actions, "Open in Kaneo", async () => {
    await openInKaneo(target);
  });
  wrap.append(actions);

  fragment.append(wrap);
  return fragment as unknown as HTMLElement;
}

function previewAction(root: HTMLElement, label: string, run: () => Promise<void>): void {
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

function renderColumn(column: BoardColumn): HTMLElement {
  const tasks = column.tasks
    .filter(taskMatches)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  const wrapper = el("div", { className: "board-column" });
  wrapper.append(
    el(
      "div",
      { className: "group-head" },
      el("span", { className: "eyebrow" }, column.name),
      el("span", { className: "count-pill" }, String(tasks.length)),
    ),
  );

  const cards = el("div", { className: "board-cards" });
  for (const task of tasks) cards.append(renderCard(task));

  if (tasks.length === 0) {
    cards.append(el("div", { className: "muted" }, "Empty"));
  }

  cards.addEventListener("dragover", (event) => {
    event.preventDefault();
    wrapper.classList.add("drag-over");
  });
  cards.addEventListener("dragleave", () => wrapper.classList.remove("drag-over"));
  cards.addEventListener("drop", (event) => {
    event.preventDefault();
    wrapper.classList.remove("drag-over");
    const taskId = event.dataTransfer?.getData("text/plain");
    if (taskId) void moveTask(taskId, column.id);
  });

  wrapper.append(cards);
  return wrapper;
}

function renderCard(task: BoardTask): HTMLElement {
  const due = dueLabel(task.dueDate);
  const overdue = isOverdue(task.dueDate);

  const card = el("div", { className: "card", draggable: true, tabIndex: 0 });
  card.append(
    el(
      "div",
      { className: "row", style: "gap:6px; align-items:flex-start;" },
      el("span", { className: `priority-bar priority-${task.priority}` }),
      el("span", { className: "task-key" }, ticketFor(task)),
    ),
    el("div", { className: "card-title" }, task.title),
  );

  const meta = el("div", { className: "card-meta" });
  if (task.priority !== "no-priority") meta.append(el("span", {}, priorityLabel(task.priority)));
  if (due) meta.append(el("span", { className: overdue ? "overdue" : "" }, due));
  if (task.assigneeName) meta.append(el("span", {}, task.assigneeName));
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    meta.append(el("span", {}, `${subtasks.completed}/${subtasks.total}`));
  }
  for (const label of task.labels ?? []) {
    meta.append(
      el(
        "span",
        { className: "label-chip" },
        el("span", { className: "label-dot", style: `background:${label.color}` }),
        label.name,
      ),
    );
  }

  // Status pill: pick a column to move the task there.
  const statusPillHolder = el("span", { className: "status-pill-holder" });
  meta.append(statusPillHolder);
  const columns = state.board?.columns ?? [];
  const columnName = columns.find((column) => column.id === task.status)?.name ?? task.status;
  const statusMenu = mountMenu(statusPillHolder, {
    label: columnName,
    size: "xs",
    items: columns
      .filter((column) => column.id !== task.status)
      .map((column) => ({ id: column.id, label: column.name })),
    onSelect: (id) => {
      void moveTask(task.id, id);
    },
  });
  statusMenu.update({ label: columnName });
  for (const label of task.labels ?? []) {
    meta.append(
      el(
        "span",
        { className: "label-chip" },
        el("span", { className: "label-dot", style: `background:${label.color}` }),
        label.name,
      ),
    );
  }
  card.append(meta);

  card.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", task.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    card.classList.add("dragging");
  });
  card.addEventListener("dragend", () => card.classList.remove("dragging"));

  const open = () => {
    state.detailId = task.id;
    render();
  };
  card.addEventListener("click", open);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });

  return card;
}

function renderDetail(task: BoardTask): HTMLElement {
  const ticketId = ticketFor(task);
  const columnName = columnOf(task)?.name ?? task.status;
  const target = {
    task,
    ticketId,
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName,
  };

  const backdrop = el("div", { className: "backdrop" });
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });

  const card = el("div", { className: "backdrop-card" });
  card.append(
    el(
      "div",
      { className: "sheet-head" },
      el(
        "div",
        { style: "flex:1; min-width:0;" },
        el("div", { className: "task-key" }, ticketId),
        el("div", { className: "sheet-title" }, task.title),
      ),
      el("button", { className: "link-button", type: "button", onClick: close }, "Close"),
    ),
  );

  const meta = el("dl", { className: "meta-grid" });
  const rows: Array<[string, string]> = [["Status", columnName]];
  if (task.priority !== "no-priority") rows.push(["Priority", priorityLabel(task.priority)]);
  if (task.assigneeName) rows.push(["Assignee", task.assigneeName]);
  const due = dueLabel(task.dueDate);
  if (due) rows.push(["Due", due]);
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    rows.push(["Subtasks", `${subtasks.completed}/${subtasks.total} done`]);
  }
  if (task.descriptionDeferred) rows.push(["Description", "Too large to inline here."]);
  for (const [key, value] of rows) meta.append(el("dt", {}, key), el("dd", {}, value));
  card.append(meta);

  card.append(collapsibleMarkdown(task.description, 1200));

  const actions = el("div", { className: "toolbar" });
  action(actions, "Attach", async () => {
    await attachChip(target);
    await host.toast({ kind: "success", message: `${ticketId} attached to the chat.` });
  });
  action(actions, "New session", async () => {
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
  action(actions, "Worktree session", async () => {
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
  action(actions, "Send to chat", async () => {
    await composeChip(target);
  });
  action(actions, "Open in Kaneo", async () => {
    await openInKaneo(target);
  });
  card.append(actions);

  const columns = (state.board?.columns ?? []).filter((column) => column.id !== task.status);
  if (columns.length > 0) {
    const moveHolder = el("div", { className: "toolbar" });
    moveHolder.append(el("span", { className: "eyebrow" }, "Move to"));
    for (const column of columns) {
      action(moveHolder, column.name, async () => {
        await moveTask(task.id, column.id);
      });
    }
    card.append(moveHolder);
  }

  backdrop.append(card);
  return backdrop;
}

function close(): void {
  state.detailId = null;
  render();
}

function action(root: HTMLElement, label: string, run: () => Promise<void>): void {
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

/* ------------------------------------------------------------------- host */

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  installStyles();
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  state.ready = ctx;
  state.connected = ctx.connection.connected;
  render();
  // Without a token every call answers 401, so the board stays on the connect
  // screen instead of flashing an error banner.
  if (state.connected) void load();
});

host.onConnection((connection) => {
  const changed = connection.connected !== state.connected;
  state.connected = connection.connected;
  if (changed) render();
});

// Status comments on Kaneo for sessions this extension started.
host.onReady((ctx) => {
  const url = ctx.settings["openchamber-url"]?.trim();
  watchSessionLifecycle(client, url || undefined);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.detailId) close();
});
