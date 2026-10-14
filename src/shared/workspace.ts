import { API_ORIGIN } from "./constants";
import { host } from "./host";
import { loadPreferences, savePreferences } from "./preferences";
import type { CurrentUser, ProjectListItem, Workspace } from "./types";

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

export interface WorkspaceContext {
  user: CurrentUser | null;
  workspaces: Workspace[];
  workspaceId: string;
  projects: ProjectListItem[];
  /** Set when projects could not be listed, for example a missing scope. */
  projectsError: Error | null;
}

export class NoWorkspaceError extends Error {
  constructor() {
    super("This account is not a member of any Kaneo workspace.");
    this.name = "NoWorkspaceError";
  }
}

export class NotConnectedError extends Error {
  readonly reason: unknown;

  constructor(reason?: unknown) {
    super("Kaneo is not connected. Sign in with Kaneo from the extension's empty state.");
    this.name = "NotConnectedError";
    this.reason = reason;
  }
}

/**
 * Resolve the account, the workspace and the projects every surface starts
 * from. The workspace comes from stored preferences, then from the seed slug,
 * then from the first workspace the account can see.
 */
export async function bootstrap(
  client: {
    currentUser(): Promise<CurrentUser>;
    listWorkspaces(): Promise<Workspace[]>;
    listProjects(workspaceId: string, includeArchived?: boolean): Promise<ProjectListItem[]>;
  },
  seedSlug?: string,
  options: { force?: boolean } = {},
): Promise<WorkspaceContext> {
  if (!options.force) {
    const cached = await readCache();
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.context;
  }

  const [user, workspaces] = await Promise.all([
    client.currentUser().catch(() => null),
    client.listWorkspaces(),
  ]);
  if (workspaces.length === 0) throw new NoWorkspaceError();

  const stored = await loadPreferences();
  const bySlug = seedSlug ? workspaces.find((entry) => entry.slug === seedSlug) : undefined;
  const workspaceId =
    (stored.workspaceId && workspaces.find((entry) => entry.id === stored.workspaceId)?.id) ??
    bySlug?.id ??
    (workspaces[0] as Workspace).id;

  if (workspaceId !== stored.workspaceId) {
    await savePreferences({ workspaceId, projectId: null });
  }

  let projects: ProjectListItem[] = [];
  let projectsError: Error | null = null;
  try {
    projects = await client.listProjects(workspaceId);
  } catch (error) {
    projectsError = error instanceof Error ? error : new Error(String(error));
  }

  const context: WorkspaceContext = { user, workspaces, workspaceId, projects, projectsError };
  await writeCache(context);
  return context;
}

/**
 * The account, workspace and project lists change rarely, and the panel, the
 * picker and the board each run this on open. Caching for a minute keeps a
 * burst of surface opens from tripping the API's rate limit. Pass
 * `force: true` after a create or a move to read past it.
 */
const CACHE_KEY = "bootstrap-cache";
const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  at: number;
  context: WorkspaceContext;
}

async function readCache(): Promise<CacheEntry | null> {
  return read(CACHE_KEY, (raw) => {
    if (!raw || typeof raw !== "object") return null;
    const entry = raw as Partial<CacheEntry>;
    return entry && typeof entry.at === "number" && entry.context ? (entry as CacheEntry) : null;
  });
}

async function writeCache(context: WorkspaceContext): Promise<void> {
  // Serializing and parsing again hands the host a plain object, which is what
  // its `JsonValue` parameter requires; the interface itself stays typed.
  await write(CACHE_KEY, { at: Date.now(), context });
}

export async function invalidateBootstrapCache(): Promise<void> {
  try {
    await host.storage.delete(CACHE_KEY);
  } catch {
    // Nothing to do if it is already gone.
  }
}

/**
 * The project to show: the stored choice, else the seed slug, else the first
 * project. A stored choice that was archived, deleted or moved falls through
 * to the later candidates.
 */
export function resolveProject(
  projects: ProjectListItem[],
  storedProjectId: string | null,
  preferredSlug?: string,
): ProjectListItem | null {
  if (projects.length === 0) return null;
  const stored = projects.find((project) => project.id === storedProjectId);
  if (stored) return stored;
  const slug = preferredSlug?.toLowerCase();
  const mapped = slug ? projects.find((project) => project.slug.toLowerCase() === slug) : undefined;
  return mapped ?? (projects[0] as ProjectListItem);
}

/**
 * The declared settings, as `ready.settings`. The extension declares none (no
 * integration card), so every field reads `undefined` and the surfaces fall
 * back to their persisted selection.
 */
export function readSettings(settings: Record<string, string> | undefined): {
  workspaceSlug: string | undefined;
  projectSlug: string | undefined;
} {
  const workspace = settings?.workspace?.trim();
  const project = settings?.project?.trim();
  return {
    workspaceSlug: workspace || undefined,
    projectSlug: project || undefined,
  };
}

/**
 * Validate a typed server URL to a bare https origin, or report the problem.
 * Empty means the bundled origin, which is what the field defaults to.
 */
export function parseServerUrl(value: string | undefined): {
  origin: string;
  error: string | null;
} {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return { origin: API_ORIGIN, error: null };
  try {
    const url = new URL(trimmed);
    const bare =
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (url.pathname === "/" || url.pathname === "") &&
      !url.search &&
      !url.hash;
    if (bare) return { origin: url.origin, error: null };
  } catch {
    // Not a URL; fall through to the error.
  }
  return { origin: API_ORIGIN, error: "Enter an https origin, like https://cloud.kaneo.app." };
}

/** Shared badge: how many tasks are open for the account across the workspace. */
export async function refreshBadge(openTaskCount: number): Promise<void> {
  try {
    await host.setBadge(openTaskCount > 999 ? 999 : openTaskCount);
  } catch {
    // A badge is decoration. Never let it break a surface.
  }
}
