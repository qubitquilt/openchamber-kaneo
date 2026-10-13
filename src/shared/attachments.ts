import { PROVIDER_ID } from "./constants";
import { host } from "./host";
import { rememberSession } from "./preferences";
import { branchForTicket, taskContext, taskToMarkdown, taskUrl } from "./format";
import type { BoardTask } from "./types";

/**
 * The JSON stored with a chip. It comes back as `ready.item.data` when the user
 * clicks the chip, so the panel can reopen the task without another lookup.
 * Every value is a plain string, which is what keeps the object assignable to
 * the host's `JsonValue`; absent fields are stored as an empty string.
 */
export interface TaskChipData {
  [key: string]: string;
  workspaceId: string;
  projectId: string;
  taskId: string;
  ticketId: string;
  projectName: string;
  columnName: string;
}

export interface ChipTarget {
  task: BoardTask;
  ticketId: string;
  workspaceId: string;
  projectName?: string;
  /**
   * The task's column as a display name, never its slug; callers that hold
   * only the status pass `columnLabel(status)`. It reaches the chip's model
   * context, so a slug here would read `in-progress` next to `In Progress`.
   */
  columnName: string;
}

export function chipUrl(target: ChipTarget): string {
  return taskUrl(target.workspaceId, target.task.projectId, target.task.id);
}

export function chipData(target: ChipTarget): TaskChipData {
  return {
    workspaceId: target.workspaceId,
    projectId: target.task.projectId,
    taskId: target.task.id,
    ticketId: target.ticketId,
    projectName: target.projectName ?? "",
    columnName: target.columnName,
  };
}

/** The composer chip. `title` is capped at 200 characters by the host. */
export function chipFor(target: ChipTarget) {
  return {
    providerId: PROVIDER_ID,
    id: target.task.id,
    title: `${target.ticketId} ${target.task.title}`.slice(0, 200),
    url: chipUrl(target),
    text: taskContext(target.task, {
      ticketId: target.ticketId,
      ...(target.projectName ? { projectName: target.projectName } : {}),
      columnName: target.columnName,
      url: chipUrl(target),
    }),
    author: target.task.assigneeName ?? undefined,
    data: chipData(target),
  };
}

export async function attachChip(target: ChipTarget): Promise<void> {
  await host.attach(chipFor(target));
}

/**
 * Attach, then open a fresh session with the task as first message.
 *
 * With `worktree: true` the session opens in a new worktree whose branch is
 * named from the ticket, like Linear's start-from-issue. `branch` reports the
 * branch the host created, not the one we asked for: it may adjust the name,
 * and the success toasts must not claim otherwise. `sessionId` is `null` when
 * the worktree was created but the session was not; the worktree is kept, so
 * the caller should not blind-retry.
 */
export async function startSessionWithChip(
  target: ChipTarget,
  options: { projectId?: string; worktree?: boolean } = {},
): Promise<{ sessionId: string | null; sent: string; failure?: string; branch?: string }> {
  const requestedBranch = options.worktree ? branchForTicket(target.ticketId) : undefined;
  const result = await host.startSession({
    ...chipFor(target),
    navigation: "preserve",
    ...(requestedBranch ? { worktree: { kind: "new" as const, name: requestedBranch } } : {}),
    text: `Work on ${target.ticketId}. Start by reading the task and restating the plan before changing anything.`,
    ...(options.projectId ? { projectId: options.projectId } : {}),
  });

  if (result.sessionId === null) {
    return {
      sessionId: null,
      sent: result.sent,
      failure: result.failure,
      branch: result.worktree.branch,
    };
  }
  return {
    sessionId: result.sessionId,
    sent: result.sent,
    branch: result.worktree?.branch ?? requestedBranch,
  };
}

/** Attach the task and confirm it, the way every detail surface does. */
export async function attachTask(target: ChipTarget): Promise<void> {
  await attachChip(target);
  await host.toast({ kind: "success", message: `${target.ticketId} attached to the chat.` });
}

/**
 * Start a session for the task, remember it for status comments, and report the
 * outcome. The panel, the picker and the board all call this, so a new session
 * reads the same everywhere and the worktree wording stays in one place.
 */
export async function startSessionForTask(
  target: ChipTarget,
  options: { worktree?: boolean; projectId?: string } = {},
): Promise<boolean> {
  const result = await startSessionWithChip(target, options);

  if (result.sessionId === null) {
    const kept = result.branch ? ` The worktree ${result.branch} was kept.` : "";
    const reason = result.failure ? ` (${result.failure})` : "";
    await host.toast({
      kind: "error",
      message: `No session was created${reason}.${kept} Check the session list before retrying.`,
      dismiss: true,
    });
    return false;
  }

  await rememberSession(result.sessionId, {
    taskId: target.task.id,
    ticketId: target.ticketId,
    title: `${target.ticketId} ${target.task.title}`,
  });
  await host.toast({
    kind: "success",
    message:
      options.worktree && result.branch
        ? `Session started on ${result.branch} for ${target.ticketId}.`
        : `Session started for ${target.ticketId}.`,
  });
  return true;
}

/** Put the task in the chat box without sending it. */
export async function composeChip(target: ChipTarget): Promise<void> {
  await host.compose({
    mode: "append",
    text: `\n${taskToMarkdown(target.task, {
      ticketId: target.ticketId,
      ...(target.columnName ? { columnName: target.columnName } : {}),
      ...(chipUrl(target) ? { url: chipUrl(target) } : {}),
    })}\n`,
  });
}

export async function openInKaneo(target: ChipTarget): Promise<void> {
  await host.openUrl(chipUrl(target));
}

/** Everything the panel offers on one task, gathered into a toast on failure. */
export async function reportFailure(action: string, error: unknown): Promise<void> {
  const message =
    error instanceof Error ? `${action} failed: ${error.message}` : `${action} failed.`;
  await host.toast({ kind: "error", message: message.slice(0, 400), dismiss: true });
}
