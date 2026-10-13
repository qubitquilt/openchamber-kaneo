import { el, safeBackgroundColor } from "./dom";

/**
 * The small inline chips the list rows, the previews and the detail sheets all
 * share. They are built here once so a label reads the same on every surface.
 */

function initialOf(name: string | null | undefined): string {
  return (name ?? "").trim().slice(0, 1).toUpperCase() || "?";
}

/** A coloured dot plus the label's name. */
export function labelChip(label: { name: string; color: string }): HTMLElement {
  return el(
    "span",
    { className: "label-chip" },
    el("span", { className: "label-dot", style: `background:${safeBackgroundColor(label.color)}` }),
    label.name,
  );
}

/** Up to `max` label chips, with a `+n` tail when more are hidden. */
export function labelChips(
  labels: Array<{ name: string; color: string }>,
  max = 2,
): HTMLElement | null {
  if (labels.length === 0) return null;
  const shown = labels.slice(0, max);
  const wrap = el("span", { className: "label-chips" });
  for (const label of shown) wrap.append(labelChip(label));
  if (labels.length > shown.length) {
    wrap.append(el("span", { className: "label-more" }, `+${labels.length - shown.length}`));
  }
  return wrap;
}

/** Every label, uncapped, for the detail sheet. */
export function allLabelChips(labels: Array<{ name: string; color: string }>): HTMLElement | null {
  if (labels.length === 0) return null;
  const wrap = el("div", { className: "label-chips" });
  for (const label of labels) wrap.append(labelChip(label));
  return wrap;
}

/** An avatar initial plus the person's name. */
export function personChip(name: string): HTMLElement {
  return el(
    "span",
    { className: "person" },
    el("span", { className: "person-avatar" }, initialOf(name)),
    el("span", { className: "person-name" }, name),
  );
}

/** The round initial used in a comment header. */
export function avatarNode(name: string | null | undefined): HTMLElement {
  return el("span", { className: "person-avatar" }, initialOf(name));
}
