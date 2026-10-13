import { host } from "./host";
import { sessionComment, type SessionPhase } from "./format";
import { loadSessionLinks, markSessionPosted } from "./preferences";
import type { KaneoClient } from "./client";

/**
 * Session status comments, the Kaneo counterpart of Linear's status comments.
 *
 * A session started from a task is remembered with that task; while any Kaneo
 * surface is open, its lifecycle events post one comment per phase on the
 * task. The comments are read by the whole team, so a failure to post them is
 * swallowed: a missing comment must never break a running session.
 *
 * The Linear integration posts these from the server's event hub, which an
 * extension cannot do; here the watcher lives in whichever surface is open,
 * so a session that outlives every Kaneo surface posts no further comments.
 */

const PHASE_TO_COMMENT: Record<string, SessionPhase> = {
  started: "started",
  completed: "completed",
  failure: "failed",
};

let watching = false;

/**
 * Register once per surface. `onReady` can repeat, so a second call is a
 * no-op rather than a second handler that posts twice.
 */
export function watchSessionLifecycle(
  client: KaneoClient,
  openchamberUrl: string | undefined,
): void {
  if (watching) return;
  watching = true;
  host.onSessionLifecycle(async (event) => {
    const phase = PHASE_TO_COMMENT[event.phase];
    if (!phase) return;

    const links = await loadSessionLinks();
    const link = links[event.sessionId];
    if (!link || link.posted.includes(phase)) return;

    await markSessionPosted(event.sessionId, phase);
    try {
      await client.createComment(
        link.taskId,
        sessionComment(phase, link.title, openchamberUrl, event.sessionId),
      );
    } catch {
      // The comment is best effort. The phase is marked posted either way, so
      // a transient failure does not double-post from a second surface.
    }
  });
}
