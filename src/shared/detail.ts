import { mountButton, mountCheckbox, mountSelect } from "@openchamber/sdk/ui";

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
import { dueLabel, priorityLabel, relativeTimeOf } from "./format";
import type { BoardColumn, Comment } from "./types";

/**
 * The rail sheet and the board page draw the same task detail, in the shape of
 * the Linear issue view: a header bar, a title block, a status row, a metadata
 * grid, the description, the comment timeline and a footer that starts
 * sessions. Keeping it in one module is what stops the two surfaces drifting.
 */

export interface CommentState {
  loading: boolean;
  error: string | null;
  items?: Comment[];
}

/** Attach a button with the shared loading and error handling. */
function actionButton(
  root: HTMLElement,
  label: string,
  run: () => Promise<void>,
  options: { variant?: "default" | "secondary" | "outline" | "ghost"; block?: boolean } = {},
): void {
  const handle = mountButton(root, {
    label,
    variant: options.variant ?? "secondary",
    size: "sm",
    onClick: () => {
      handle.update({ loading: true });
      void run()
        .catch((error: unknown) => reportFailure(label, error))
        .finally(() => handle.update({ loading: false }));
    },
  });
  if (options.block) root.classList.add("block");
}

/** The header bar: Back to the list, then Open in Kaneo. */
export function detailHeader(target: ChipTarget, onBack: () => void): HTMLElement {
  const bar = el("div", { className: "detail-header" });
  const back = el("div");
  bar.append(back);
  mountButton(back, { label: "Back", variant: "ghost", size: "sm", onClick: onBack });
  const open = el("div", { style: "margin-left:auto;" });
  bar.append(open);
  mountButton(open, {
    label: "Open in Kaneo",
    variant: "ghost",
    size: "sm",
    onClick: () => void openInKaneo(target),
  });
  return bar;
}

/** The ticket id and the title that head the detail. */
export function detailTitle(target: ChipTarget): HTMLElement {
  return el(
    "div",
    { className: "detail-heading" },
    el("div", { className: "detail-id" }, target.ticketId),
    el("h2", { className: "detail-title" }, target.task.title),
  );
}

/** The status picker plus a Close button, the way Linear's issue card acts. */
export function detailStatusRow(
  target: ChipTarget,
  columns: BoardColumn[],
  handlers: { onMove: (columnId: string) => void; onClose: () => void; canClose: boolean },
): HTMLElement {
  const row = el("div", { className: "detail-row" });
  if (columns.length > 0) {
    const holder = el("div", { className: "detail-status" });
    row.append(holder);
    mountSelect(holder, {
      value: target.task.status,
      options: columns.map((column) => ({ id: column.id, label: column.name })),
      onChange: handlers.onMove,
    });
  }
  if (handlers.canClose) {
    const holder = el("div");
    row.append(holder);
    mountButton(holder, {
      label: "Close issue",
      variant: "outline",
      size: "sm",
      onClick: handlers.onClose,
    });
  }
  return row;
}

/** Project, assignee, priority, due date, subtask progress and labels. */
export function detailMeta(target: ChipTarget): HTMLElement {
  const { task } = target;
  const grid = el("dl", { className: "meta-grid" });
  const rows: Array<[string, string]> = [];
  if (target.projectName) rows.push(["Project", target.projectName]);
  if (task.priority !== "no-priority") rows.push(["Priority", priorityLabel(task.priority)]);
  rows.push(["Assignee", task.assigneeName ?? "Unassigned"]);
  const due = dueLabel(task.dueDate);
  if (due) rows.push(["Due", due]);
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    rows.push(["Subtasks", `${subtasks.completed}/${subtasks.total} done`]);
  }
  if (task.descriptionDeferred) {
    rows.push(["Description", "Too large to inline; open the task for the full text."]);
  }
  for (const [key, value] of rows) grid.append(el("dt", {}, key), el("dd", {}, value));

  const labels = allLabelChips(task.labels ?? []);
  if (labels) {
    const cell = el("dd", { className: "meta-labels" });
    cell.append(labels);
    grid.append(el("dt", {}, "Labels"), cell);
  }
  return grid;
}

/** The description, collapsed behind a Read more toggle past `limit`. */
export function detailDescription(target: ChipTarget, limit = 320): HTMLElement {
  return el(
    "div",
    { className: "detail-section" },
    collapsibleMarkdown(target.task.description, limit),
  );
}

/** The comment timeline, or the loading/error line that stands in for it. */
export function detailComments(state: CommentState | null): HTMLElement {
  const section = el("div", { className: "detail-section" });
  section.append(el("h3", { className: "detail-section-title" }, "Comments"));
  if (!state) return section;
  if (state.error) {
    section.append(el("p", { className: "muted" }, `Comments unavailable: ${state.error}`));
    return section;
  }
  if (state.loading) {
    section.append(el("p", { className: "muted" }, "Loading comments…"));
    return section;
  }
  const items = state.items ?? [];
  if (items.length === 0) {
    section.append(el("p", { className: "muted" }, "No comments yet."));
    return section;
  }

  const thread = el("div", { className: "comments" });
  items.forEach((comment, index) => {
    const isLast = index === items.length - 1;
    const when = relativeTimeOf(comment.createdAt);
    const row = el("div", { className: "comment" });
    if (!isLast) row.append(el("div", { className: "comment-line" }));
    row.append(avatarNode(comment.user?.name));
    const card = el("div", { className: "comment-card" });
    card.append(
      el(
        "div",
        { className: "comment-head" },
        el("span", { className: "comment-author" }, comment.user?.name ?? "Unknown"),
        when ? el("span", {}, when) : null,
      ),
      el("div", { className: "comment-body" }, renderMarkdown(comment.content)),
    );
    row.append(card);
    thread.append(row);
  });
  section.append(thread);
  return section;
}

export interface DetailOptions {
  /** The board's columns, for the status picker; empty hides it. */
  columns: BoardColumn[];
  comments: CommentState | null;
  /** Worktree choice, owned by the surface so it survives a re-render. */
  worktree: boolean;
  onWorktreeChange: (worktree: boolean) => void;
  onMove: (columnId: string) => void;
  onCloseIssue: () => void;
  canCloseIssue: boolean;
  /** Hide the secondary attach actions, for a read-only surface. */
  showChatActions?: boolean;
}

/** Title, status, metadata, description and comments, the scrolling body. */
export function detailBody(target: ChipTarget, options: DetailOptions): HTMLElement {
  const body = el("div", { className: "detail-body" });
  body.append(detailTitle(target));
  if (options.columns.length > 0 || options.canCloseIssue) {
    body.append(
      detailStatusRow(target, options.columns, {
        onMove: options.onMove,
        onClose: options.onCloseIssue,
        canClose: options.canCloseIssue,
      }),
    );
  }
  body.append(detailMeta(target));
  body.append(detailDescription(target, 1200));
  body.append(detailComments(options.comments));
  return body;
}

/** The footer: the worktree toggle, a full-width Start session, then chat. */
export function detailFooter(
  target: ChipTarget,
  options: Pick<DetailOptions, "worktree" | "onWorktreeChange" | "showChatActions">,
): HTMLElement {
  const footer = el("div", { className: "detail-footer" });
  const toggle = el("div");
  footer.append(toggle);
  mountCheckbox(toggle, {
    label: "Create in a new worktree",
    checked: options.worktree,
    onChange: options.onWorktreeChange,
  });

  const start = el("div", { className: "detail-start block" });
  footer.append(start);
  actionButton(
    start,
    "Start session",
    () => startSessionForTask(target, { worktree: options.worktree }).then(() => undefined),
    { variant: "default", block: true },
  );

  if (options.showChatActions !== false) {
    const secondary = el("div", { className: "toolbar detail-secondary" });
    footer.append(secondary);
    actionButton(secondary, "Attach", () => attachTask(target));
    actionButton(secondary, "Send to chat", () => composeChip(target));
  }
  return footer;
}

/** A full detail: header bar, scrolling body and footer. */
export function detailScaffold(
  target: ChipTarget,
  options: DetailOptions & { onBack: () => void },
): HTMLElement {
  const shell = el("div", { className: "detail" });
  shell.append(detailHeader(target, options.onBack));
  shell.append(detailBody(target, options));
  shell.append(detailFooter(target, options));
  return shell;
}
