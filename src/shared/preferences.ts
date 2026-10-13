import { host } from "./host";
import type { Priority } from "./constants";
import { PRIORITY_RANK } from "./constants";

/** Selection persisted between surfaces, kept in the extension's own storage. */
export interface Preferences {
  [key: string]: string | null;
  workspaceId: string | null;
  projectId: string | null;
  /** Task shown in the panel's detail sheet, shared with the board page. */
  openTaskId: string | null;
  groupBy: "column" | "flat";
  priorityFilter: Priority | "any";
  /** Column slug filter, `null` for every column. */
  statusFilter: string | null;
  /** Which board the full-screen page shows. */
  view: "list" | "kanban" | "mine";
  /** `"me"` shows only tasks assigned to the account. */
  assigneeFilter: "any" | "me";
  labelFilter: string | null;
}

const PREFERENCES_KEY = "preferences";

const DEFAULTS: Preferences = {
  workspaceId: null,
  projectId: null,
  openTaskId: null,
  groupBy: "column",
  priorityFilter: "any",
  statusFilter: null,
  view: "list",
  assigneeFilter: "any",
  labelFilter: null,
};

function sanitize(raw: unknown): Preferences {
  if (typeof raw !== "object" || raw === null) return { ...DEFAULTS };
  const value = raw as Partial<Preferences>;
  const priority = value.priorityFilter;
  const knownPriority = priority === "any" || (!!priority && priority in PRIORITY_RANK);
  return {
    workspaceId: typeof value.workspaceId === "string" ? value.workspaceId : null,
    projectId: typeof value.projectId === "string" ? value.projectId : null,
    openTaskId: typeof value.openTaskId === "string" ? value.openTaskId : null,
    groupBy: value.groupBy === "flat" ? "flat" : "column",
    priorityFilter: knownPriority ? (priority as Priority | "any") : "any",
    statusFilter: typeof value.statusFilter === "string" ? value.statusFilter : null,
    view: value.view === "kanban" || value.view === "mine" ? value.view : "list",
    assigneeFilter: value.assigneeFilter === "me" ? "me" : "any",
    labelFilter: typeof value.labelFilter === "string" ? value.labelFilter : null,
  };
}

export async function loadPreferences(): Promise<Preferences> {
  try {
    return sanitize(await host.storage.get(PREFERENCES_KEY));
  } catch {
    return { ...DEFAULTS };
  }
}

export async function savePreferences(next: Partial<Preferences>): Promise<Preferences> {
  const merged = sanitize({ ...(await loadPreferences()), ...next });
  try {
    await host.storage.set(PREFERENCES_KEY, merged);
  } catch {
    // Storage is a convenience. A full namespace must not break the panel.
  }
  return merged;
}

/**
 * Sessions started from a task, so a later lifecycle event can post the
 * status comment on the right task. Kept small: the newest 50 links, oldest
 * dropped, one storage key.
 */
const SESSION_LINKS_KEY = "session-links";
const SESSION_LINKS_MAX = 50;

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

export async function loadSessionLinks(): Promise<Record<string, SessionLink>> {
  try {
    const raw = (await host.storage.get(SESSION_LINKS_KEY)) as unknown;
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
  } catch {
    return {};
  }
}

export async function rememberSession(
  sessionId: string,
  link: { taskId: string; ticketId: string; title: string },
): Promise<void> {
  try {
    const links = await loadSessionLinks();
    links[sessionId] = { ...link, at: Date.now(), posted: [] };
    // Keep the newest links; the previous code pruned a copy taken before it
    // deleted anything, so the oldest never actually fell off.
    const newest = Object.entries(links)
      .sort((a, b) => b[1].at - a[1].at)
      .slice(0, SESSION_LINKS_MAX);
    await host.storage.set(
      SESSION_LINKS_KEY,
      JSON.parse(JSON.stringify(Object.fromEntries(newest))),
    );
  } catch {
    // Without the link the status comment is skipped; the session itself is fine.
  }
}

export async function markSessionPosted(sessionId: string, phase: string): Promise<void> {
  try {
    const links = await loadSessionLinks();
    const link = links[sessionId];
    if (!link) return;
    if (!link.posted.includes(phase)) link.posted.push(phase);
    await host.storage.set(SESSION_LINKS_KEY, JSON.parse(JSON.stringify(links)));
  } catch {
    // A repeated comment is preferable to a crash.
  }
}
