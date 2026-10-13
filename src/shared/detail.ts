import { mountButton } from "@openchamber/sdk/ui";

import {
  attachTask,
  composeChip,
  openInKaneo,
  reportFailure,
  startSessionForTask,
  type ChipTarget,
} from "./attachments";
import { allLabelChips, avatarNode } from "./chips";
import { collapsibleMarkdown, el, renderMarkdown } from "./dom";
import { dueLabel, isOverdue, priorityLabel, relativeTimeOf } from "./format";
import type { BoardColumn, Comment } from "./types";

/**
 * The pieces a task detail shares across surfaces. The rail panel's sheet, the
 * board page's overlay and its split-view preview all compose these, so a
 * change to the metadata rows, the action row or the comment list lands in one
 * place instead of three.
 */

export interface CommentState {
  loading: boolean;
  error: string | null;
  items?: Comment[];
}

/** Attach a task's action buttons with the shared loading and error handling. */
function actionButton(root: HTMLElement, label: string, run: () => Promise<void>): void {
  const handle = mountButton(root, {
    label,
    variant: "secondary",
    size: "sm",
    onClick: () => {
      handle.update({ loading: true });
      void run()
        .catch((error: unknown) => reportFailure(label, error))
        .finally(() => handle.update({ loading: false }));
    },
  });
}

/** Ticket id, title and a close control, shared by the overlay and the sheet. */
export function detailHead(target: ChipTarget, onClose: () => void): HTMLElement {
  return el(
    "div",
    { className: "sheet-head" },
    el(
      "div",
      { style: "flex:1; min-width:0;" },
      el("div", { className: "task-key" }, target.ticketId),
      el("div", { className: "sheet-title" }, target.task.title),
    ),
    el("button", { className: "link-button", type: "button", onClick: onClose }, "Close"),
  );
}

/** Status, priority, assignee, due date and subtask progress as a definition list. */
export function detailMeta(target: ChipTarget): HTMLElement {
  const { task } = target;
  const meta = el("dl", { className: "meta-grid" });
  const rows: Array<[string, string]> = [["Status", target.columnName]];
  if (task.priority !== "no-priority") rows.push(["Priority", priorityLabel(task.priority)]);
  if (task.assigneeName) rows.push(["Assignee", task.assigneeName]);
  const due = dueLabel(task.dueDate);
  if (due) rows.push(["Due", due]);
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    rows.push(["Subtasks", `${subtasks.completed}/${subtasks.total} done`]);
  }
  if (task.descriptionDeferred) {
    rows.push(["Description", "Too large to inline; open the task for the full text."]);
  }
  for (const [key, value] of rows) meta.append(el("dt", {}, key), el("dd", {}, value));
  return meta;
}

/** Every label on the task, uncapped. */
export function detailLabels(target: ChipTarget): HTMLElement | null {
  return allLabelChips(target.task.labels ?? []);
}

/** One muted meta line: assignee, priority, due date, age, subtask progress. */
export function detailMetaLine(target: ChipTarget): HTMLElement {
  const { task } = target;
  const meta = el("div", { className: "row-meta" });
  if (task.assigneeName) meta.append(el("span", {}, task.assigneeName));
  if (task.priority !== "no-priority") meta.append(el("span", {}, priorityLabel(task.priority)));
  const due = dueLabel(task.dueDate);
  if (due) meta.append(el("span", { className: isOverdue(task.dueDate) ? "overdue" : "" }, due));
  const age = relativeTimeOf(task.createdAt);
  if (age) meta.append(el("span", {}, age));
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    meta.append(
      el("span", { className: "tabular" }, `${subtasks.completed}/${subtasks.total} subtasks`),
    );
  }
  return meta;
}

/** The description, collapsed behind a Read more toggle past `limit`. */
export function detailDescription(target: ChipTarget, limit = 320): HTMLElement {
  return collapsibleMarkdown(target.task.description, limit);
}

/** The comment timeline, or the loading/error line that stands in for it. */
export function detailComments(state: CommentState | null): HTMLElement | null {
  if (!state) return null;
  if (state.error) {
    return el("div", { className: "muted" }, `Comments unavailable: ${state.error}`);
  }
  if (state.loading) return el("div", { className: "muted" }, "Loading comments…");
  const items = state.items ?? [];
  if (items.length === 0) return null;

  const list = el("div", { className: "comments" });
  list.append(el("span", { className: "eyebrow" }, `Comments (${items.length})`));
  for (const comment of items) {
    const when = relativeTimeOf(comment.createdAt);
    list.append(
      el(
        "div",
        { className: "comment" },
        el(
          "div",
          { className: "comment-head" },
          avatarNode(comment.user?.name),
          el("span", {}, comment.user?.name ?? "Unknown"),
          when ? el("span", {}, when) : null,
        ),
        el("div", { className: "comment-body" }, renderMarkdown(comment.content)),
      ),
    );
  }
  return list;
}

/** Attach, start a session or worktree, send to chat, open in Kaneo. */
export function detailActions(target: ChipTarget): HTMLElement {
  const actions = el("div", { className: "toolbar" });
  actionButton(actions, "Attach", () => attachTask(target));
  actionButton(actions, "New session", () => startSessionForTask(target).then(() => undefined));
  actionButton(actions, "Worktree session", () =>
    startSessionForTask(target, { worktree: true }).then(() => undefined),
  );
  actionButton(actions, "Send to chat", () => composeChip(target));
  actionButton(actions, "Open in Kaneo", () => openInKaneo(target));
  return actions;
}

/** A "Move to" row of buttons, one per column other than the current one. */
export function detailMove(
  columns: BoardColumn[],
  currentStatus: string,
  onMoveTo: (columnId: string) => void,
): HTMLElement | null {
  const targets = columns.filter((column) => column.id !== currentStatus);
  if (targets.length === 0) return null;
  const row = el("div", { className: "toolbar" });
  row.append(el("span", { className: "eyebrow" }, "Move to"));
  for (const column of targets) {
    actionButton(row, column.name, async () => onMoveTo(column.id));
  }
  return row;
}
