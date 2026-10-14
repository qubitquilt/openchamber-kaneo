/**
 * The pure half of the task-to-session links: reading a possibly stale stored
 * blob and dropping the oldest entries. Kept free of `host` so `npm test` can
 * exercise it without an iframe.
 */

/** A session started from a task, so a lifecycle event can comment on it. */
export interface SessionLink {
  taskId: string;
  ticketId: string;
  /** Chip title captured at start, since lifecycle events carry no title. */
  title: string;
  /** When the session started, used to drop the oldest links. */
  at: number;
  /** Phases already posted, so two open surfaces do not comment twice. */
  posted: string[];
}

/** How many task-linked sessions to keep for status comments. */
export const SESSION_LINKS_MAX = 50;

/** Read whatever is in storage into well-formed links, ignoring junk entries. */
export function sanitizeSessionLinks(raw: unknown): Record<string, SessionLink> {
  if (!raw || typeof raw !== "object") return {};
  const links: Record<string, SessionLink> = {};
  for (const [id, value] of Object.entries(raw as Record<string, SessionLink>)) {
    if (!value || typeof value !== "object" || typeof value.taskId !== "string") continue;
    links[id] = {
      taskId: value.taskId,
      ticketId: typeof value.ticketId === "string" ? value.ticketId : "",
      title: typeof value.title === "string" ? value.title : "",
      at: typeof value.at === "number" ? value.at : 0,
      posted: Array.isArray(value.posted)
        ? value.posted.filter((phase) => typeof phase === "string")
        : [],
    };
  }
  return links;
}

/** Keep the newest `max` links, by start time. */
export function pruneSessionLinks(
  links: Record<string, SessionLink>,
  max: number = SESSION_LINKS_MAX,
): Record<string, SessionLink> {
  const newest = Object.entries(links)
    .sort((a, b) => b[1].at - a[1].at)
    .slice(0, Math.max(0, max));
  return Object.fromEntries(newest);
}
