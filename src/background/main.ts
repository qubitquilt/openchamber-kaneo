import { createKaneoClient } from "../shared/client";
import { host } from "../shared/host";
import { serviceTransport } from "../shared/service";
import { chipFor } from "../shared/attachments";
import { columnLabel, ticketIdOf } from "../shared/format";
import { loadPreferences } from "../shared/preferences";

/**
 * The hidden frame behind `/kaneo`.
 *
 * OpenChamber routes slash commands to `background.entry` whenever it is
 * declared, so this is the only place the command resolver can live while a
 * visible panel exists. The frame draws nothing: `background/index.html` keeps
 * `#root` hidden, and `ctx.surface` is `background` for every invocation.
 */

const client = createKaneoClient(serviceTransport);

/** `GEN-4`, `GEN 4`, or a bare `4` resolved against the selected project. */
function normalizeTicketId(raw: string, projectSlug: string | undefined): string | null {
  const text = raw.trim().toUpperCase();
  if (text.length === 0) return null;

  const dashed = /^([A-Z][A-Z0-9]*)-(\d+)$/.exec(text);
  if (dashed) return `${dashed[1]}-${dashed[2]}`;

  const spaced = /^([A-Z][A-Z0-9]*)\s+(\d+)$/.exec(text);
  if (spaced) return `${spaced[1]}-${spaced[2]}`;

  if (/^\d+$/.test(text) && projectSlug) return ticketIdOf(projectSlug, Number(text));
  return null;
}

/**
 * `/kaneo GEN-4` attaches a chip for that task. Returning `null` attaches
 * nothing and leaves a short notice in the composer, so a wrong id stays quiet
 * while a malformed one explains itself.
 */
host.onResolve(async ({ command, args }) => {
  if (command !== "kaneo") return null;

  const preferences = await loadPreferences();
  const bareNumber = /^\d+$/.test(args.trim());

  if (bareNumber && (!preferences.projectId || !preferences.workspaceId)) {
    throw new Error("Open the Kaneo panel and pick a project first, then use the full ticket id.");
  }

  let projectSlug: string | undefined;
  if (bareNumber && preferences.workspaceId && preferences.projectId) {
    const projects = await client.listProjects(preferences.workspaceId);
    projectSlug = projects.find((project) => project.id === preferences.projectId)?.slug;
  }

  const ticketId = normalizeTicketId(args, projectSlug);
  if (!ticketId) {
    throw new Error(
      "Use a Kaneo ticket id such as GEN-4, or a task number for the selected project.",
    );
  }

  const task = await client.getTaskByTicketId(ticketId, preferences.workspaceId ?? undefined);

  // Name the column rather than shipping its slug on the chip; a lookup that
  // fails falls back to the prettified slug.
  const columnName = await client
    .listColumns(task.projectId)
    .then((columns) => columns.find((column) => column.slug === task.status)?.name)
    .catch(() => undefined);

  return chipFor({
    task,
    ticketId,
    workspaceId: task.workspaceId ?? preferences.workspaceId ?? "",
    columnName: columnName ?? columnLabel(task.status),
  });
});
