import type { Priority } from "./constants";

export type { Priority };

/**
 * Shapes returned by the Kaneo API. Field lists follow the live OpenAPI
 * document at `<server>/api/openapi`; optional fields are the ones the server
 * itself marks nullable or that only some views populate.
 */

export interface ApiError {
  message: string;
  code?: string;
  issues?: Array<{ path: string; message: string }>;
  missingPermissions?: string[];
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  role?: string | null;
}

export interface Project {
  id: string;
  workspaceId: string;
  slug: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  archivedAt?: string | null;
  position?: number;
  lastTaskNumber?: number;
}

export interface ProjectStatistics {
  completionPercentage: number;
  totalTasks: number;
  dueDate?: string | null;
}

/** `GET /project?workspaceId=` returns the project plus its rollup stats. */
export interface ProjectListItem extends Project {
  statistics: ProjectStatistics;
}

export interface TaskLabel {
  id: string;
  name: string;
  color: string;
}

export interface SubtaskCounts {
  completed: number;
  total: number;
}

export interface BoardTask {
  id: string;
  projectId: string;
  title: string;
  number: number | null;
  description: string | null;
  /** True when the list dropped a description above 64 KiB. */
  descriptionDeferred?: boolean;
  status: string;
  priority: Priority;
  startDate?: string | null;
  dueDate?: string | null;
  position?: number | null;
  createdAt: string;
  userId?: string | null;
  assigneeId?: string | null;
  assigneeName?: string | null;
  assigneeImage?: string | null;
  subtaskCounts?: SubtaskCounts;
  labels?: TaskLabel[];
  externalLinks?: Array<{ id: string; url: string; type?: string | null }>;
}

/** `GET /column/{projectId}`: the stored column, richer than the board view. */
export interface Column {
  id: string;
  projectId: string;
  name: string;
  slug: string;
  position: number;
  icon?: string | null;
  color?: string | null;
  isFinal: boolean;
}

export interface BoardColumn {
  /** The column slug, same as `slug`. */
  id: string;
  slug: string;
  name: string;
  icon?: string | null;
  isFinal: boolean;
  position?: number;
  tasks: BoardTask[];
}

export interface Board {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  descriptionDeferred?: boolean;
  workspaceId: string;
  columns: BoardColumn[];
  archivedTasks: BoardTask[];
  plannedTasks: BoardTask[];
}

export interface BoardPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  relatedPage: number;
  relatedPageSize: number;
  relatedTotalPages: number;
}

export interface BoardResponse {
  data: Board;
  pagination: BoardPagination;
}

/** `GET /task/{id}` and `GET /task/by-ticket-id/{ticketId}`. */
export interface TaskDetail extends BoardTask {
  workspaceId?: string;
  columnId?: string | null;
  description: string | null;
  assigneeName?: string | null;
  parentSubtaskCounts?: Array<{ taskId: string; completed: number; total: number }>;
}

export interface AssignedTask {
  id: string;
  projectId: string;
  number: number | null;
  title: string;
  status: string;
  statusName: string | null;
  statusIcon: string | null;
  priority: Priority;
  dueDate: string | null;
  projectName: string;
  projectSlug: string;
  projectIcon: string | null;
  labels: TaskLabel[];
}

export interface AssignedTasksResponse {
  tasks: AssignedTask[];
  total: number;
}

export interface CommentAuthor {
  id?: string;
  name: string;
  image?: string | null;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: CommentAuthor;
}

export interface SearchResult {
  id: string;
  type: "task" | "project" | "workspace" | "comment" | "activity";
  title: string;
  description?: string;
  content?: string;
  projectId?: string;
  projectName?: string;
  projectSlug?: string;
  workspaceId?: string;
  userName?: string;
  createdAt: string;
  taskNumber?: number;
  priority?: Priority;
  status?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  searchQuery: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  taskId?: string | null;
  workspaceId?: string | null;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

/** The task fields accepted by `POST /task/{projectId}`. */
export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  status: string;
  startDate?: string;
  dueDate?: string;
  userId?: string;
}
