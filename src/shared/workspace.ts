import { API_ORIGIN } from "./constants";
import { host } from "./host";
import { loadPreferences, savePreferences } from "./preferences";
import { deleteStorage, read, write } from "./storage";
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
  /** Serialized form of the error, reconstructed on read. */
  errorMessage?: string;
}

async function readCache(): Promise<CacheEntry | null> {
  return read(
    CACHE_KEY,
    (raw) => {
      if (!raw || typeof raw !== "object") return null;
      const entry = raw as Partial<CacheEntry>;
      if (typeof entry.at !== "number" || !entry.context || typeof entry.context !== "object")
        return null;
      const contextRaw = entry.context as Partial<WorkspaceContext>;
      if (!Array.isArray(contextRaw.workspaces) || typeof contextRaw.workspaceId !== "string")
        return null;
      // Reconstruct the error from its serialized message so it never arrives as an empty object.
      const reconstructed: WorkspaceContext = {
        user: contextRaw.user ?? null,
        workspaces: (contextRaw.workspaces ?? []) as Workspace[],
        workspaceId: contextRaw.workspaceId,
        projects: (contextRaw.projects ?? []) as ProjectListItem[],
        projectsError: entry.errorMessage ? new Error(entry.errorMessage) : null,
      };
      return { at: entry.at, context: reconstructed } as CacheEntry;
    },
    host.storage,
  );
}

async function writeCache(context: WorkspaceContext): Promise<void> {
  await write(
    CACHE_KEY,
    {
      at: Date.now(),
      context,
      errorMessage: context.projectsError
        ? String(context.projectsError.message ?? context.projectsError)
        : undefined,
    },
    host.storage,
  );
}

export async function invalidateBootstrapCache(): Promise<void> {
  await deleteStorage(CACHE_KEY, host.storage);
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
