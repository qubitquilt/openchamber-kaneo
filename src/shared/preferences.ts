import { host } from "./host";
import type { Priority } from "./constants";
import { PRIORITY_RANK } from "./constants";
import { pruneSessionLinks, sanitizeSessionLinks, type SessionLink } from "./session-links";

/**
 * One place that talks to `host.storage`. Every read passes its raw value
 * through a sanitizer so a hand-edited storage blob from outside the extension
 * cannot inject a novel value; every write goes through `JSON.parse(JSON.stringify)`
 * to strip functions, `Map`s and `Date`s that the SDK's `JsonValue` shape would
 * reject. A future key only has to be added in one place, not in four
 * try/catch blocks.
 */
async function read<T>(key: string, sanitize: (raw: unknown) => T): Promise<T> {
  try {
    return sanitize(await host.storage.get(key));
  } catch {
    return sanitize(undefined);
  }
}

async function write<T>(key: string, value: T): Promise<void> {
  try {
    const plain = JSON.parse(JSON.stringify(value));
    await host.storage.set(key, plain);
  } catch {
    // Storage is a convenience. A full namespace must not break the panel.
  }
}

/** Selection persisted between surfaces, kept in the extension's own storage. */
export interface Preferences {
  [key: string]: string | null | boolean;
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
  /** Whether "Start session" creates a worktree, like Linear's toggle. */
  createInWorktree: boolean;
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
  createInWorktree: false,
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
    createInWorktree: value.createInWorktree === true,
  };
}

export async function loadPreferences(): Promise<Preferences> {
  return read(PREFERENCES_KEY, (raw) => sanitize(raw));
}

export async function savePreferences(next: Partial<Preferences>): Promise<Preferences> {
  const merged = sanitize({ ...(await loadPreferences()), ...next });
  await write(PREFERENCES_KEY, merged);
  return merged;
}

/**
 * Sessions started from a task, so a later lifecycle event can post the
 * status comment on the right task. Kept small: the newest 50 links, oldest
 * dropped, one storage key.
 */
const SESSION_LINKS_KEY = "session-links";

export type { SessionLink } from "./session-links";

export async function loadSessionLinks(): Promise<Record<string, SessionLink>> {
  return read(SESSION_LINKS_KEY, sanitizeSessionLinks);
}

export async function rememberSession(
  sessionId: string,
  link: { taskId: string; ticketId: string; title: string },
): Promise<void> {
  const links = await loadSessionLinks();
  links[sessionId] = { ...link, at: Date.now(), posted: [] };
  // The previous code pruned a copy taken before it deleted anything, so the
  // oldest never actually fell off; prune the whole record and store that.
  const kept = pruneSessionLinks(links);
  await write(SESSION_LINKS_KEY, kept);
}

export async function markSessionPosted(sessionId: string, phase: string): Promise<void> {
  const links = await loadSessionLinks();
  const link = links[sessionId];
  if (!link) return;
  if (!link.posted.includes(phase)) link.posted.push(phase);
  await write(SESSION_LINKS_KEY, links);
}
