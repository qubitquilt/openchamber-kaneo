import { WEB_ORIGIN } from "./constants";
import type { BoardTask, Priority } from "./types";

const DAY_MS = 86_400_000;

/** Kaneo ticket id, the `{PROJECT}-{number}` form people type and paste. */
export function ticketIdOf(projectSlug: string, number: number | null | undefined): string {
  if (number === null || number === undefined) return projectSlug.toUpperCase();
  return `${projectSlug.toUpperCase()}-${number}`;
}

/**
 * Human wording for a Kaneo column when only its slug is at hand: the chip's
 * status line must never read `in-progress`. A value that already looks like a
 * display name (contains a space) is returned as typed, so a board's own
 * column name always wins.
 */
export function columnLabel(nameOrSlug: string | null | undefined): string {
  const value = (nameOrSlug ?? "").trim();
  if (value === "") return "";
  if (value.includes(" ")) return value;
  return value
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(" ");
}

export function taskUrl(workspaceId: string, projectId: string, taskId: string): string {
  return `${WEB_ORIGIN}/dashboard/workspace/${workspaceId}/project/${projectId}/task/${taskId}`;
}

export function projectUrl(workspaceId: string, projectId: string): string {
  return `${WEB_ORIGIN}/dashboard/workspace/${workspaceId}/project/${projectId}`;
}

export function workspaceUrl(workspaceId: string): string {
  return `${WEB_ORIGIN}/dashboard/workspace/${workspaceId}`;
}

const PRIORITY_LABEL: Record<Priority, string> = {
  "no-priority": "None",
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export function priorityLabel(priority: Priority): string {
  return PRIORITY_LABEL[priority] ?? priority;
}

/**
 * A due date is worth more than a timestamp: "Today" and "Overdue by 3 days"
 * answer the question the reader actually has.
 */
export function dueLabel(value: string | null | undefined, today = new Date()): string | null {
  if (!value) return null;
  const due = new Date(value);
  if (Number.isNaN(due.getTime())) return null;

  const days = Math.round((startOfDay(due).getTime() - startOfDay(today).getTime()) / DAY_MS);
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days === -1) return "Due yesterday";
  if (days < 0) return `Overdue ${Math.abs(days)}d`;
  if (days <= 7) return `Due in ${days}d`;
  return `Due ${due.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

export function isOverdue(value: string | null | undefined, today = new Date()): boolean {
  if (!value) return false;
  const due = new Date(value);
  if (Number.isNaN(due.getTime())) return false;
  return startOfDay(due).getTime() < startOfDay(today).getTime();
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** One line for a task row subtitle: assignee, labels, due date, subtasks. */
export function taskSummary(task: BoardTask): string {
  const parts: string[] = [];
  if (task.assigneeName) parts.push(task.assigneeName);
  const labels = task.labels ?? [];
  if (labels.length > 0) {
    parts.push(labels.map((label) => label.name).join(", "));
  }
  const due = dueLabel(task.dueDate);
  if (due) parts.push(due);
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    parts.push(`${subtasks.completed}/${subtasks.total} subtasks`);
  }
  return parts.join(" · ");
}

/** Strip Markdown down to the first line, for list rows and chip titles. */
export function firstLine(markdown: string | null | undefined, limit = 160): string {
  if (!markdown) return "";
  const line = markdown
    .split("\n")
    .map((entry) => entry.trim())
    .find((entry) => entry.length > 0);
  if (!line) return "";
  const text = line
    .replace(/^#{1,6}\s+/, "")
    .replace(/^[*_>]+/, "")
    .trim();
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

/** Clipboard-friendly Markdown for the "send to chat" text. */
export function taskToMarkdown(
  task: BoardTask,
  meta: { ticketId: string; columnName?: string; url?: string },
): string {
  const lines = [`**${meta.ticketId}** ${task.title}`];
  const details: string[] = [];
  if (meta.columnName) details.push(`Status: ${meta.columnName}`);
  if (task.priority && task.priority !== "no-priority") {
    details.push(`Priority: ${priorityLabel(task.priority)}`);
  }
  if (task.assigneeName) details.push(`Assignee: ${task.assigneeName}`);
  const due = dueLabel(task.dueDate);
  if (due) details.push(due);
  if (details.length > 0) lines.push(details.join(" · "));
  if (meta.url) lines.push(meta.url);
  const description = task.description?.trim();
  if (description) lines.push("", description);
  return lines.join("\n");
}

/** The text handed to the model when a Kaneo chip is attached to a session. */
export function taskContext(
  task: BoardTask,
  meta: { ticketId: string; projectName?: string; columnName?: string; url?: string },
): string {
  const parts = [`Kaneo task ${meta.ticketId}: ${task.title}`];
  if (meta.projectName) parts.push(`Project: ${meta.projectName}`);
  if (meta.columnName) parts.push(`Status: ${meta.columnName}`);
  if (task.priority && task.priority !== "no-priority") {
    parts.push(`Priority: ${priorityLabel(task.priority)}`);
  }
  if (task.dueDate) parts.push(`Due: ${task.dueDate.slice(0, 10)}`);
  if (meta.url) parts.push(meta.url);
  const description = task.description?.trim();
  if (description) parts.push("", description);
  return parts.join("\n");
}

/** A git-safe branch name for a session started from a task. */
export function branchForTicket(ticketId: string): string {
  const slug = ticketId
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `kaneo/${slug || "task"}`;
}

export type SessionPhase = "started" | "completed" | "failed";

const SESSION_COMMENT_TITLE: Record<SessionPhase, string> = {
  started: "OpenChamber session started",
  completed: "OpenChamber session completed",
  failed: "OpenChamber session failed",
};

/**
 * The comment posted to the Kaneo task when a linked session changes phase.
 * One markdown link when an OpenChamber web URL is configured, plain text
 * otherwise; the team reads this on Kaneo, so it stays short and English.
 */
export function sessionComment(
  phase: SessionPhase,
  sessionTitle: string,
  openchamberUrl?: string,
  sessionId?: string,
): string {
  const title = SESSION_COMMENT_TITLE[phase];
  const detail = sessionTitle.trim() || "Untitled session";
  if (openchamberUrl) {
    const base = openchamberUrl.replace(/\/+$/, "");
    const link = sessionId ? `${base}/?session=${encodeURIComponent(sessionId)}` : base;
    return `[${title}](${link}) — ${detail}`;
  }
  return `${title} — ${detail}`;
}

const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS2 = 86_400_000;

/**
 * "just now / 5m / 3h / 2d / 5w", the way the OpenChamber reference rows show
 * an item's age. Returns `null` when there is nothing worth showing.
 */
export function relativeTimeOf(
  iso: string | null | undefined,
  now: number = Date.now(),
): string | null {
  if (!iso) return null;
  const at = Date.parse(iso);
  if (!Number.isFinite(at)) return null;
  const elapsed = Math.max(0, now - at);
  if (elapsed < MINUTE_MS) return "just now";
  if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)}m`;
  if (elapsed < DAY_MS2) return `${Math.floor(elapsed / HOUR_MS)}h`;
  if (elapsed < 7 * DAY_MS2) return `${Math.floor(elapsed / DAY_MS2)}d`;
  return `${Math.floor(elapsed / (7 * DAY_MS2))}w`;
}

export type ColumnGlyph = "blank" | "progress" | "review" | "done";

/**
 * The state glyph of a board column, matching the OpenChamber reference rows:
 * an empty circle for not started, a ring with a dot for started, an eye for
 * review, and a check for a final column. Kaneo columns are custom, so the
 * slug picks a default and `isFinal` always wins.
 */
export function columnGlyphOf(column: { slug: string; isFinal: boolean }): ColumnGlyph {
  if (column.isFinal) return "done";
  if (/progress|started|active/.test(column.slug)) return "progress";
  if (/review|test/.test(column.slug)) return "review";
  if (/done|complete|closed|cancel/.test(column.slug)) return "done";
  return "blank";
}
