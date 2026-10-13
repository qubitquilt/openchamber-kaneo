import { test } from "node:test";
import assert from "node:assert/strict";

import { safeBackgroundColor } from "../build/colors.mjs";

test("safeBackgroundColor accepts the shapes the Kaneo UI emits", () => {
  assert.equal(safeBackgroundColor("#fff"), "#fff");
  assert.equal(safeBackgroundColor("#ff00aa"), "#ff00aa");
  assert.equal(safeBackgroundColor("#FF00AA"), "#FF00AA");
  assert.equal(safeBackgroundColor("rgb(1, 2, 3)"), "rgb(1, 2, 3)");
  assert.equal(safeBackgroundColor("rgba(1, 2, 3, 0.5)"), "rgba(1, 2, 3, 0.5)");
  assert.equal(safeBackgroundColor("hsl(1, 2%, 3%)"), "hsl(1, 2%, 3%)");
  assert.equal(safeBackgroundColor("hsla(1, 2%, 3%, 0.5)"), "hsla(1, 2%, 3%, 0.5)");
});

test("safeBackgroundColor trims surrounding whitespace", () => {
  assert.equal(safeBackgroundColor("  #abcdef  "), "#abcdef");
});

test("safeBackgroundColor falls back on anything that is not a color", () => {
  const fallback = "var(--k-muted)";
  assert.equal(safeBackgroundColor(null), fallback);
  assert.equal(safeBackgroundColor(undefined), fallback);
  assert.equal(safeBackgroundColor(""), fallback);
  assert.equal(safeBackgroundColor("red"), fallback);
  assert.equal(safeBackgroundColor("tomato"), fallback);
  assert.equal(safeBackgroundColor("#zzz"), fallback);
  assert.equal(safeBackgroundColor("#abcd"), fallback);
  // The injection attempts the allowlist exists to stop.
  assert.equal(safeBackgroundColor("#fff; background: url(//evil/x)"), fallback);
  assert.equal(safeBackgroundColor("rgb(1, 2, 3); background-image: url(//evil/x)"), fallback);
  assert.equal(safeBackgroundColor("expression(alert(1))"), fallback);
});

test("safeBackgroundColor does not accept numeric coercion", () => {
  // A number or boolean must not be turned into a string the allowlist likes.
  assert.equal(safeBackgroundColor(0xff00aa), "var(--k-muted)");
  assert.equal(safeBackgroundColor(true), "var(--k-muted)");
});
