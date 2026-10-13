import { TASKS_PER_PAGE } from "./constants";
import type {
  ApiError,
  AssignedTasksResponse,
  Board,
  Column,
  BoardPagination,
  BoardResponse,
  BoardTask,
  Comment,
  CreateTaskInput,
  CurrentUser,
  Label,
  Priority,
  ProjectListItem,
  SearchResponse,
  TaskDetail,
  Workspace,
} from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | undefined | null;

/** Exactly the shape `host.request` accepts, so it can be passed straight in. */
export interface RequestInput {
  method: HttpMethod;
  path: string;
  query?: Record<string, string>;
  body?: string;
}

export interface RequestResult {
  status: number;
  body: string;
}

/**
 * The transport. `host.request` from `@openchamber/sdk` matches this shape, and
 * so does a plain stub in tests.
 */
export type RequestFn = (input: RequestInput) => Promise<RequestResult>;

/** An error the Kaneo API itself reported, or a status we could not read. */
export class KaneoError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "KaneoError";
    this.status = status;
    this.code = code;
  }
}

function buildQuery(
  query: Record<string, QueryValue> | undefined,
): Record<string, string> | undefined {
  if (!query) return undefined;
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params[key] = String(value);
  }
  return Object.keys(params).length > 0 ? params : undefined;
}

function toKaneoError(status: number, raw: unknown): KaneoError {
  const error = (typeof raw === "object" && raw !== null ? raw : {}) as ApiError;
  const message =
    typeof error.message === "string" && error.message
      ? error.message
      : `Kaneo answered ${status}.`;
  return new KaneoError(status, error.code ?? `HTTP_${status}`, message);
}

/** One page of tasks per project is 100; ten pages is 1000 tasks. */
const MAX_BOARD_PAGES = 10;

/** Retries for a 429 before giving up, with a doubling delay between them. */
const RATE_LIMIT_RETRIES = 2;
const RATE_LIMIT_BACKOFF_MS = 800;

export interface BoardPage {
  board: Board;
  pagination: BoardPagination;
  /** True when the project holds more tasks than we walked through. */
  truncated: boolean;
}

export interface KaneoClient {
  currentUser(): Promise<CurrentUser>;
  listWorkspaces(): Promise<Workspace[]>;
  listProjects(workspaceId: string, includeArchived?: boolean): Promise<ProjectListItem[]>;
  /** Walks task pages so the caller sees the whole board, not the first page. */
  getBoard(projectId: string): Promise<BoardPage>;
  getTask(taskId: string): Promise<TaskDetail>;
  getTaskByTicketId(ticketId: string, workspaceId?: string): Promise<TaskDetail>;
  listAssignedTasks(workspaceId: string): Promise<AssignedTasksResponse>;
  search(
    workspaceId: string,
    query: string,
    options?: { projectId?: string; limit?: number },
  ): Promise<SearchResponse>;
  listLabels(workspaceId: string): Promise<Label[]>;
  /** A project's columns, for turning a task's status slug into a name. */
  listColumns(projectId: string): Promise<Column[]>;
  listComments(taskId: string): Promise<Comment[]>;
  createComment(taskId: string, content: string): Promise<Comment>;
  createTask(projectId: string, input: CreateTaskInput): Promise<TaskDetail>;
  updateTaskStatus(taskId: string, status: string): Promise<TaskDetail>;
  updateTaskPriority(taskId: string, priority: Priority): Promise<TaskDetail>;
}

export function createKaneoClient(request: RequestFn): KaneoClient {
  /** Ergonomic input: a query of loose values and an object body. */
  type Call = {
    method: HttpMethod;
    path: string;
    query?: Record<string, QueryValue>;
    body?: unknown;
  };

  async function call<T>({ method, path, query, body }: Call): Promise<T> {
    const search = buildQuery(query);
    const apiPath = "/api" + path;

    // A 429 is normal when several surfaces open at once, so back off and try
    // again rather than showing the user an error they cannot act on.
    let result: RequestResult | undefined;
    for (let attempt = 0; ; attempt += 1) {
      result = await request({
        method,
        path: apiPath,
        ...(search ? { query: search } : {}),
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
      if (result.status !== 429 || attempt >= RATE_LIMIT_RETRIES) break;
      await new Promise((done) => setTimeout(done, RATE_LIMIT_BACKOFF_MS * 2 ** attempt));
    }
    const final = result as RequestResult;

    let parsed: unknown = undefined;
    if (final.body) {
      try {
        parsed = JSON.parse(final.body);
      } catch {
        if (final.status >= 400) {
          throw new KaneoError(final.status, "INVALID_RESPONSE", final.body.slice(0, 400));
        }
        throw new KaneoError(
          final.status,
          "INVALID_RESPONSE",
          "Kaneo sent a body that is not JSON.",
        );
      }
    }

    if (final.status >= 400) throw toKaneoError(final.status, parsed);
    return parsed as T;
  }

  async function getBoard(projectId: string): Promise<BoardPage> {
    const encoded = encodeURIComponent(projectId);
    const first = await call<BoardResponse>({
      method: "GET",
      path: `/task/tasks/${encoded}`,
      query: { page: 1, limit: TASKS_PER_PAGE },
    });

    const board = first.data;
    const pagination = first.pagination;
    let page = 1;

    while (page < Math.min(pagination.totalPages, MAX_BOARD_PAGES)) {
      page += 1;
      const next = await call<BoardResponse>({
        method: "GET",
        path: `/task/tasks/${encoded}`,
        query: { page, limit: TASKS_PER_PAGE },
      });
      for (const column of next.data.columns) {
        const target = board.columns.find((entry) => entry.id === column.id);
        if (target) target.tasks.push(...column.tasks);
      }
      board.archivedTasks.push(...next.data.archivedTasks);
      board.plannedTasks.push(...next.data.plannedTasks);
    }

    // Truncated only when the project holds pages we deliberately stopped
    // before, not merely because it needed more than one request.
    return { board, pagination, truncated: pagination.totalPages > page };
  }

  return {
    currentUser: () => call<CurrentUser>({ method: "GET", path: "/user/me" }),

    listWorkspaces: () => call<Workspace[]>({ method: "GET", path: "/workspace" }),

    listProjects: (workspaceId, includeArchived = false) =>
      call<ProjectListItem[]>({
        method: "GET",
        path: "/project",
        query: { workspaceId, includeArchived: includeArchived ? "true" : undefined },
      }),

    getBoard,

    getTask: (taskId) =>
      call<TaskDetail>({
        method: "GET",
        path: `/task/${encodeURIComponent(taskId)}`,
        query: { view: "detail" },
      }),

    getTaskByTicketId: (ticketId, workspaceId) =>
      call<TaskDetail>({
        method: "GET",
        path: `/task/by-ticket-id/${encodeURIComponent(ticketId)}`,
        query: { workspaceId },
      }),

    listAssignedTasks: (workspaceId) =>
      call<AssignedTasksResponse>({
        method: "GET",
        path: "/task/assigned",
        query: { workspaceId },
      }),

    search: (workspaceId, query, options = {}) =>
      call<SearchResponse>({
        method: "GET",
        path: "/search",
        query: {
          q: query,
          type: "tasks",
          workspaceId,
          projectId: options.projectId,
          limit: options.limit ?? 30,
        },
      }),

    listLabels: (workspaceId) =>
      call<Label[]>({
        method: "GET",
        path: `/label/workspace/${encodeURIComponent(workspaceId)}`,
      }),

    listColumns: (projectId) =>
      call<Column[]>({ method: "GET", path: `/column/${encodeURIComponent(projectId)}` }),

    listComments: (taskId) =>
      call<Comment[]>({ method: "GET", path: `/comment/${encodeURIComponent(taskId)}` }),

    createComment: (taskId, content) =>
      call<Comment>({
        method: "POST",
        path: `/comment/${encodeURIComponent(taskId)}`,
        body: { content },
      }),

    createTask: (projectId, input) =>
      call<TaskDetail>({
        method: "POST",
        path: `/task/${encodeURIComponent(projectId)}`,
        body: input,
      }),

    updateTaskStatus: (taskId, status) =>
      call<TaskDetail>({
        method: "PUT",
        path: `/task/status/${encodeURIComponent(taskId)}`,
        body: { status },
      }),

    updateTaskPriority: (taskId, priority) =>
      call<TaskDetail>({
        method: "PUT",
        path: `/task/priority/${encodeURIComponent(taskId)}`,
        body: { priority },
      }),
  };
}

/** Flatten a board into one list, keeping column order and task position. */
export function boardTasks(
  board: Board,
): Array<{ task: BoardTask; columnName: string; isFinal: boolean }> {
  const rows: Array<{ task: BoardTask; columnName: string; isFinal: boolean }> = [];
  for (const column of board.columns) {
    const sorted = [...column.tasks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    for (const task of sorted)
      rows.push({ task, columnName: column.name, isFinal: column.isFinal });
  }
  return rows;
}
