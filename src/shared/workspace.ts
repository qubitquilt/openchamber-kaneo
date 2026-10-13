import { host } from "./host";
import { loadPreferences, savePreferences } from "./preferences";
import type { CurrentUser, ProjectListItem, Workspace } from "./types";

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
    super("Kaneo is not connected. Add an API token in Settings → Integrations → Kaneo.");
    this.name = "NotConnectedError";
    this.reason = reason;
  }
}

/**
 * Resolve the account, the workspace and the projects every surface starts
 * from. The workspace comes from stored preferences, then from the
 * `workspace` field on the integration card, then from the first workspace the
 * account can see.
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
  try {
    const entry = (await host.storage.get(CACHE_KEY)) as CacheEntry | undefined;
    return entry && typeof entry.at === "number" && entry.context ? entry : null;
  } catch {
    return null;
  }
}

async function writeCache(context: WorkspaceContext): Promise<void> {
  // Serializing and parsing again hands the host a plain object, which is what
  // its `JsonValue` parameter requires; the interface itself stays typed.
  const plain = JSON.parse(JSON.stringify({ at: Date.now(), context }));
  try {
    await host.storage.set(CACHE_KEY, plain);
  } catch {
    // A cache that cannot persist only costs a request.
  }
}

export async function invalidateBootstrapCache(): Promise<void> {
  try {
    await host.storage.delete(CACHE_KEY);
  } catch {
    // Nothing to do if it is already gone.
  }
}

/**
 * The project to show: the stored choice, else the slug mapped on the
 * integration card, else the first project. A stored choice that was
 * archived, deleted or moved falls through to the later candidates.
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

/** The integration card's free-text fields, as `ready.settings`. */
export function readSettings(settings: Record<string, string> | undefined): {
  workspaceSlug: string | undefined;
  projectSlug: string | undefined;
  openchamberUrl: string | undefined;
} {
  const workspace = settings?.workspace?.trim();
  const project = settings?.project?.trim();
  const url = settings?.["openchamber-url"]?.trim();
  return {
    workspaceSlug: workspace || undefined,
    projectSlug: project || undefined,
    openchamberUrl: url || undefined,
  };
}

/** Shared badge: how many tasks are open for the account across the workspace. */
export async function refreshBadge(openTaskCount: number): Promise<void> {
  try {
    await host.setBadge(openTaskCount > 999 ? 999 : openTaskCount);
  } catch {
    // A badge is decoration. Never let it break a surface.
  }
}
