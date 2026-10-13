/**
 * One stylesheet for all four surfaces. The colours come from the host through
 * `applyHostReady`, which writes the `--oc-*` and `--primary-*` variables, so
 * this file only adds layout the UI kit does not cover.
 */
export const SHARED_CSS = `
* { box-sizing: border-box; }

html, body {
  margin: 0;
  height: 100%;
  font-family: var(--oc-font, system-ui, -apple-system, sans-serif);
  font-size: 13px;
  color: var(--oc-primary-text);
  background: var(--oc-bg, transparent);
}

#root {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 2px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.toolbar > * { min-width: 0; }

.row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spacer { flex: 1; }

.muted {
  color: var(--oc-muted);
  font-size: 12px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--oc-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
}

/* Column groups on the rail panel. */
.group { display: flex; flex-direction: column; gap: 4px; }

.group-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 2px 0;
}

.count-pill {
  font-size: 11px;
  color: var(--oc-muted);
  background: var(--oc-muted-surface);
  border-radius: 999px;
  padding: 1px 7px;
}

/* Task rows. */
.task-key {
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  color: var(--oc-muted);
}

.task-subtitle { color: var(--oc-muted); font-size: 12px; }

.priority-bar {
  width: 3px;
  align-self: stretch;
  border-radius: 999px;
  background: var(--oc-muted-surface);
  min-height: 18px;
}

.priority-low { background: var(--oc-info); }
.priority-medium { background: var(--oc-info); }
.priority-high { background: var(--oc-warning); }
.priority-urgent { background: var(--oc-error); }

/* The panel header: search, filters, then the scope pickers. */
.panel-head { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }

.filters { gap: 4px; }
.filter-active .oc-sdk-btn { color: var(--oc-primary-text); }
.filter-refresh { margin-left: auto; }
.scope { gap: 8px; }

/* The task detail, laid out like the host's Linear issue view. */
.detail {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--oc-border);
  padding: 8px 12px;
}

.detail-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 16px;
}

.detail-heading { display: flex; flex-direction: column; }
.detail-id { font-size: 12px; color: var(--oc-muted); }
.detail-title { margin: 2px 0 0; font-size: 15px; font-weight: 650; line-height: 1.35; }

.detail-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.detail-status { min-width: 150px; }

.detail-section { display: flex; flex-direction: column; gap: 8px; }
.detail-section-title { margin: 0; font-size: 13px; font-weight: 600; }

.detail-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--oc-border);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block .oc-sdk-btn { width: 100%; }
.detail-secondary .oc-sdk-btn { width: auto; }
.detail-secondary { justify-content: flex-start; }

.meta-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 10px;
  align-items: baseline;
  font-size: 12px;
}

.meta-grid dt { color: var(--oc-muted); }

.meta-grid dd { margin: 0; }

.link-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--oc-primary);
  cursor: pointer;
  text-align: left;
}

.link-button:hover { text-decoration: underline; }

.overdue { color: var(--oc-error-text); }

/* Markdown bodies. */
.md {
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.md > :first-child { margin-top: 0; }
.md > :last-child { margin-bottom: 0; }
.md p { margin: 0 0 8px; }
.md ul, .md ol { margin: 0 0 8px; padding-left: 18px; }
.md li { margin: 2px 0; }
.md h1, .md h2, .md h3, .md h4 { margin: 12px 0 6px; line-height: 1.3; }
.md h1 { font-size: 15px; }
.md h2 { font-size: 14px; }
.md h3, .md h4 { font-size: 13px; }
.md code {
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  background: var(--oc-muted-surface);
  padding: 1px 4px;
  border-radius: 4px;
}
.md pre {
  background: var(--oc-muted-surface);
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0 0 8px;
}
.md pre code { background: none; padding: 0; }
.md blockquote {
  margin: 0 0 8px;
  padding-left: 10px;
  border-left: 2px solid var(--oc-border);
  color: var(--oc-muted);
}
.md table { border-collapse: collapse; font-size: 12px; }
.md th, .md td { border: 1px solid var(--oc-border); padding: 3px 6px; text-align: left; }
.md a { color: var(--oc-primary); }

.md-collapsed {
  max-height: 168px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 60%, transparent 100%);
}

.md-wrap { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }

/* Dialog and page chrome. */
.dialog-body { display: flex; flex-direction: column; gap: 8px; min-height: 0; flex: 1; }
.dialog-foot { display: flex; gap: 6px; justify-content: flex-end; padding-top: 6px; }

.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

.page-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.board {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  gap: 10px;
  overflow-x: auto;
  align-items: start;
}

.board-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--oc-muted-surface);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 8px);
  padding: 8px;
  max-height: 100%;
  min-height: 120px;
}

.board-column.drag-over { border-color: var(--oc-primary); }

.board-cards {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  min-height: 24px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 8px);
  padding: 8px;
  cursor: grab;
  text-align: left;
  font: inherit;
  color: inherit;
  width: 100%;
}

.card:hover { border-color: var(--oc-primary); }
.card.dragging { opacity: 0.5; }
.card-title { font-size: 13px; line-height: 1.35; }
.card-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--oc-muted); }

.label-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--oc-muted);
}

.label-dot { width: 7px; height: 7px; border-radius: 999px; }

.backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--oc-bg) 72%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 20;
}

.backdrop-card {
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 10px);
  box-shadow: 0 12px 40px rgb(0 0 0 / 28%);
  width: min(560px, 100%);
  height: min(680px, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 720px) {
  .board { grid-auto-columns: minmax(220px, 80vw); }
}
/* ---- Linear-source-board mirror --------------------------------------- */

/* The one toolbar row: kind tabs, scope picker, search, filters. */
.oc-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--oc-border);
}

/* The master-detail split behind the full-screen board. */
.split {
  flex: 1;
  min-height: 0;
  display: flex;
}

.split-list {
  min-width: min(280px, 50%);
  max-width: 60%;
  flex-shrink: 0;
  overflow-y: auto;
  padding-right: 4px;
}

.split-sep {
  width: 1px;
  flex-shrink: 0;
  background: var(--oc-border);
}

.split-preview {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* List rows, shaped like the reference rows. */
.row-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.row-item:hover { background: var(--oc-hover); }
.row-item-selected { background: var(--oc-selection); }

.row-glyph { margin-top: 2px; flex-shrink: 0; }

.row-body { min-width: 0; flex: 1; }

.row-title {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
}

.row-meta {
  margin-top: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
  row-gap: 2px;
  font-size: 11px;
  color: var(--oc-muted);
}

.tabular { font-variant-numeric: tabular-nums; }

.person { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
.person-avatar {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--oc-muted-surface);
  color: var(--oc-muted);
  font-size: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.person-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.label-chips { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.label-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--oc-muted);
  max-width: 144px;
}
.label-chip > :last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.label-dot { width: 6px; height: 6px; border-radius: 999px; flex-shrink: 0; }
.label-more { font-size: 11px; color: var(--oc-muted); }

/* The comment timeline: avatar on a line, then the comment card. */
.comments { display: flex; flex-direction: column; }
.comment { position: relative; padding-left: 40px; padding-bottom: 20px; }
.comment:last-child { padding-bottom: 0; }
.comment-line {
  position: absolute;
  left: 16px;
  top: 38px;
  bottom: 6px;
  width: 1px;
  background: color-mix(in srgb, var(--oc-border) 60%, transparent);
}
.comment > .person-avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  font-size: 12px;
  border: 1px solid color-mix(in srgb, var(--oc-border) 60%, transparent);
  background: var(--oc-elevated, var(--oc-muted-surface));
}
.comment-card {
  background: var(--oc-elevated, var(--oc-muted-surface));
  border-radius: var(--oc-radius, 8px);
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.comment-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--oc-muted);
}
.comment-author { color: var(--oc-primary-text); }
.comment-body { font-size: 12px; }

.kaneo-mark { flex-shrink: 0; fill: currentColor; }

.kaneo-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}
`;

/** Add the stylesheet once per document. Safe to call on every `onReady`. */
export function installStyles(target: HTMLElement = document.documentElement): void {
  const id = "kaneo-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = SHARED_CSS;
  target.append(style);
}
