import { el } from "./dom";
import { columnGlyphOf, dueLabel, priorityLabel, relativeTimeOf, type ColumnGlyph } from "./format";
import { isOverdue } from "./format";
import type { BoardColumn, BoardTask } from "./types";

/**
 * A list row in the shape of the OpenChamber reference rows: a state glyph,
 * a two-line-clamped semibold title, and one muted meta line holding the
 * ticket id, the assignee, the age, subtask progress, the priority and up to
 * two label chips. The rail, the board page and the attach picker all render
 * their tasks through this one builder, so the three surfaces stay identical.
 */

const GLYPH_COLOR: Record<ColumnGlyph, string> = {
  blank: "var(--oc-muted)",
  progress: "var(--oc-primary)",
  review: "var(--oc-warning)",
  done: "var(--oc-success)",
};

/** Tiny inline SVGs; the sandbox cannot load an icon font or sprite. */
function glyphNode(kind: ColumnGlyph): SVGSVGElement {
  const color = GLYPH_COLOR[kind];
  const paths: Record<ColumnGlyph, string> = {
    blank: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="${color}" stroke-width="1.5"/>`,
    progress: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="${color}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${color}"/>`,
    review: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="${color}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${color}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${color}" stroke-width="1.5" fill="none"/>`,
    done: `<circle cx="8" cy="8" r="6.5" fill="${color}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = paths[kind];
  svg.classList.add("row-glyph");
  return svg;
}

function personChip(name: string): HTMLElement {
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";
  return el(
    "span",
    { className: "person" },
    el("span", { className: "person-avatar" }, initial),
    el("span", { className: "person-name" }, name),
  );
}

function labelChips(labels: Array<{ name: string; color: string }>, max = 2): HTMLElement | null {
  if (labels.length === 0) return null;
  const shown = labels.slice(0, max);
  const chip = el("span", { className: "label-chips" });
  for (const label of shown) {
    chip.append(
      el(
        "span",
        { className: "label-chip" },
        el("span", { className: "label-dot", style: `background:${label.color}` }),
        label.name,
      ),
    );
  }
  if (labels.length > shown.length) {
    chip.append(el("span", { className: "label-more" }, `+${labels.length - shown.length}`));
  }
  return chip;
}

export interface TaskRowOptions {
  task: BoardTask;
  ticketId: string;
  /** The task's column, for the glyph and the tooltip. */
  column: Pick<BoardColumn, "slug" | "isFinal" | "name">;
  selected: boolean;
  /** A click activates (opens the preview); the host list handles keyboard. */
  onActivate: () => void;
}

export function renderTaskRow(options: TaskRowOptions): HTMLElement {
  const { task, ticketId, column, selected, onActivate } = options;
  const due = dueLabel(task.dueDate);
  const overdue = isOverdue(task.dueDate);
  const age = relativeTimeOf(task.createdAt);

  const row = el("div", {
    className: selected ? "row-item row-item-selected" : "row-item",
    dataset: { taskId: task.id },
    onClick: onActivate,
  });

  const content = el("div", { className: "row-body" });
  content.append(el("div", { className: "row-title" }, task.title));

  const meta = el("div", { className: "row-meta" });
  meta.append(el("span", { className: "task-key" }, ticketId));
  if (task.assigneeName) meta.append(personChip(task.assigneeName));
  if (age) meta.append(el("span", {}, age));
  const subtasks = task.subtaskCounts;
  if (subtasks && subtasks.total > 0) {
    meta.append(el("span", { className: "tabular" }, `${subtasks.completed}/${subtasks.total}`));
  }
  if (task.priority !== "no-priority") {
    meta.append(el("span", {}, priorityLabel(task.priority)));
  }
  if (due) meta.append(el("span", { className: overdue ? "overdue" : "" }, due));
  const chips = labelChips(task.labels ?? []);
  if (chips) meta.append(chips);
  content.append(meta);

  row.append(glyphNode(columnGlyphOf(column)), content);
  row.title = `${ticketId} · ${column.name}`;
  return row;
}
