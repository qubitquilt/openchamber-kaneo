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

import { createKaneoClient } from "../shared/client";
import { describeAndLog } from "../shared/errors";
import { PRIORITIES, PRIORITY_RANK, type Priority } from "../shared/constants";
import { clear, el } from "../shared/dom";
import { host } from "../shared/host";
import { disconnect } from "../shared/auth";
import { mountSignIn } from "../shared/signin";
import { kaneoAccount, serviceTransport } from "../shared/service";
import { reportFailure, type ChipTarget } from "../shared/attachments";
import { labelChip } from "../shared/chips";
import { detailScaffold, type CommentState } from "../shared/detail";
import { loadPreferences, savePreferences, type Preferences } from "../shared/preferences";
import { watchSessionLifecycle } from "../shared/lifecycle";
import { renderTaskRow } from "../shared/list-row";
import { columnLabel, dueLabel, isOverdue, priorityLabel, ticketIdOf } from "../shared/format";
import { installStyles } from "../shared/styles";
import { kaneoWordmark } from "../shared/logo";
import type {
  Board,
  BoardColumn,
  BoardTask,
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

const client = createKaneoClient(serviceTransport);

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
  /** The Mine tab's selected row, with the task detail fetched for it. */
  mineDetail: { entry: MineEntry; task: TaskDetail } | null;
  /** Comments per task, loaded once when a preview opens. */
  comments: Record<string, CommentState>;
  listWidth: number | null;
  /** The Mine tab's rows, from listAssignedTasks. */
  mineEntries: MineEntry[];
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
    priorityFilter: "any",
    statusFilter: null,
    view: "list",
    assigneeFilter: "any",
    labelFilter: null,
    createInWorktree: false,
    serverUrl: "",
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
/** `onReady` repeats on theme and session changes; only the first one loads. */
let booted = false;

/** The menu label for the signed-in account. Prefers the host's `account`, then the loaded user. */
function accountLabel(): string {
  const fromHost = state.ready?.connection?.account?.trim();
  if (fromHost) return fromHost;
  const fromUser = state.context?.user?.email?.trim();
  if (fromUser) return fromUser;
  return "Kaneo account";
}

function ticketFor(task: BoardTask): string {
  return ticketIdOf(state.project?.slug ?? "", task.number);
}

function columnOf(task: BoardTask): BoardColumn | undefined {
  return state.board?.columns.find((column) => column.id === task.status);
}

function targetFor(task: BoardTask): ChipTarget {
  return {
    task,
    ticketId: ticketFor(task),
    workspaceId: state.context?.workspaceId ?? "",
    projectName: state.project?.name,
    columnName: columnOf(task)?.name ?? columnLabel(task.status),
    comments: state.comments[task.id]?.items,
  };
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
    state.error = context.projectsError
      ? describeAndLog("List projects", context.projectsError)
      : null;
    render();

    const [boardResult, labelResult, mineResult] = await Promise.allSettled([
      state.project ? client.getBoard(state.project.id) : Promise.resolve(null),
      context.workspaceId ? client.listLabels(context.workspaceId) : Promise.resolve([]),
      context.workspaceId
        ? client.listAssignedTasks(context.workspaceId)
        : Promise.resolve({ tasks: [], total: 0 }),
    ]);
    if (boardResult.status === "rejected") {
      state.error = describeAndLog("Load board", boardResult.reason);
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
        : `Could not reach Kaneo. ${describeAndLog("Reach Kaneo", error)}`;
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
}

/* ----------------------------------------------------------------- render */

/**
 * The results region, kept between renders so typing in the search box
 * refreshes the rows without rebuilding the toolbar and dropping focus.
 */
let resultsRoot: HTMLElement | null = null;

/** The sign-in view, mounted once and kept across renders so its polling lives. */
let signInRoot: HTMLElement | null = null;
let disposeSignIn: (() => void) | null = null;
/** False until the service has told us whether a token exists. */
let accountsResolved = false;

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

function render(): void {
  if (!root) return;
  clear(root);
  resultsRoot = null;

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
  mountSearchField(searchHolder, {
    value: state.search,
    label: "Filter tasks",
    placeholder: "Filter by title, ticket or description",
    onChange: (value) => {
      state.search = value;
      // Repaint the results only: rebuilding the toolbar would drop focus from
      // the search input after the first keystroke.
      renderResults();
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

  const accountHolder = el("div");
  bar.append(accountHolder);
  mountMenu(accountHolder, {
    label: accountLabel(),
    size: "sm",
    variant: "ghost",
    items: [{ id: "disconnect", label: "Disconnect", destructive: true }],
    onSelect: (id) => {
      if (id === "disconnect") void onDisconnect();
    },
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
  if (detail) preview.append(renderPreview(targetFor(detail)));
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
        selected: state.mineDetail?.entry.id === entry.id,
        onActivate: () => void openMineEntry(entry),
      });
      list.append(row);
    }
  }

  const sep = el("div", { className: "split-sep" });
  sep.addEventListener("pointerdown", startListResize);

  const preview = el("div", { className: "split-preview" });
  if (state.mineDetail) {
    preview.append(renderPreview(mineTarget(state.mineDetail)));
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
  state.mineDetail = { entry, task: stubFromEntry(entry) };
  render();
  try {
    const detail = await client.getTask(entry.id);
    if (state.mineDetail?.entry.id === entry.id) {
      state.mineDetail = { entry, task: detail };
      render();
    }
  } catch (error) {
    await reportFailure("Open task", error);
  }
}

/** An assigned task lives in its own project, so name that project, not the board's. */
function mineTarget(detail: { entry: MineEntry; task: TaskDetail }): ChipTarget {
  return {
    task: detail.task,
    ticketId: detail.entry.ticketId,
    workspaceId: state.context?.workspaceId ?? "",
    projectName: detail.entry.projectName,
    columnName: detail.entry.statusName ?? columnLabel(detail.task.status),
    comments: state.comments[detail.task.id]?.items,
  };
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
      console.error("Load comments failed:", error);
      state.comments[taskId] = {
        loading: false,
        error: error instanceof Error ? error.message : String(error),
      };
      render();
    });
}

/**
 * The shared task detail, drawing the status picker and comments like the rail
 * panel. A task from the Mine tab lives in another project, so it gets no
 * status picker: this board's columns cannot move it.
 */
function renderTaskDetail(target: ChipTarget, onBack: () => void): HTMLElement {
  ensureComments(target.task.id);
  const columns = state.board?.columns ?? [];
  const onBoard = Boolean(columnOf(target.task));
  const finalColumn = columns.find((column) => column.isFinal);
  return detailScaffold(target, {
    columns: onBoard ? columns : [],
    comments: state.comments[target.task.id] ?? null,
    worktree: state.preferences.createInWorktree,
    onWorktreeChange: (worktree) => {
      state.preferences = { ...state.preferences, createInWorktree: worktree };
      void savePreferences({ createInWorktree: worktree });
    },
    onMove: (columnId) => void moveTask(target.task.id, columnId),
    onCloseIssue: () => {
      if (finalColumn) void moveTask(target.task.id, finalColumn.id);
    },
    canCloseIssue: onBoard && Boolean(finalColumn) && target.task.status !== finalColumn?.id,
    onBack,
  });
}

function dismissPreview(): void {
  state.detailId = null;
  state.mineDetail = null;
  render();
}

function renderPreview(target: ChipTarget): HTMLElement {
  return renderTaskDetail(target, dismissPreview);
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
  for (const label of task.labels ?? []) meta.append(labelChip(label));

  // Status pill: pick a column to move the task there.
  const statusPillHolder = el("span", { className: "status-pill-holder" });
  meta.append(statusPillHolder);
  const columns = state.board?.columns ?? [];
  const columnName = columns.find((column) => column.id === task.status)?.name ?? task.status;
  mountMenu(statusPillHolder, {
    label: columnName,
    size: "xs",
    items: columns
      .filter((column) => column.id !== task.status)
      .map((column) => ({ id: column.id, label: column.name })),
    onSelect: (id) => {
      void moveTask(task.id, id);
    },
  });
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
  const backdrop = el("div", { className: "backdrop" });
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });

  const card = el("div", { className: "backdrop-card" });
  card.append(renderTaskDetail(targetFor(task), close));
  backdrop.append(card);
  return backdrop;
}

function close(): void {
  state.detailId = null;
  render();
}

/* ------------------------------------------------------------------- host */

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  installStyles();
  document.body.dataset.theme = ctx.theme.mode;
  document.body.dataset.surface = ctx.surface;
  state.ready = ctx;
  render();
  // The connection is the local service's token, not a host integration, so it
  // is read here once and again after a sign-in. Later `onReady` calls are
  // theme or session updates that must not refetch the board.
  if (!booted) {
    booted = true;
    void refreshConnection();
  }
});

async function refreshConnection(): Promise<void> {
  state.connected = Boolean((await kaneoAccount().catch(() => null))?.connected);
  accountsResolved = true;
  render();
  if (state.connected) void load();
}

async function onSignedIn(): Promise<void> {
  clearSignIn();
  state.connected = true;
  await load();
}

async function onDisconnect(): Promise<void> {
  await disconnect();
  clearSignIn();
  state.connected = false;
  state.context = null;
  state.board = null;
  render();
}

// Status comments on Kaneo for sessions this extension started.
host.onReady((ctx) => {
  const url = ctx.settings["openchamber-url"]?.trim();
  watchSessionLifecycle(client, url || undefined);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.detailId) close();
});
