/**
 * The label color is the only user-controlled value that lands in a
 * `style="..."` attribute. A compromised or buggy Kaneo server could otherwise
 * slip a CSS primitive (a `background: url(...)` exfil, a click-jack offset)
 * into the document. The allowlist is the narrowest shape that still renders
 * every color the Kaneo UI emits today; anything else falls back to the muted
 * token so a bad value is a missing fill, never a working injection.
 */

const COLOR_FALLBACK = "var(--k-muted)";

const HEX3 = /^#[0-9a-fA-F]{3}$/;
const HEX6 = /^#[0-9a-fA-F]{6}$/;
const RGB = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
const RGBA = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/;
const HSL = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/;
const HSLA = /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;

export function safeBackgroundColor(value: string | null | undefined): string {
  if (typeof value !== "string") return COLOR_FALLBACK;
  const trimmed = value.trim();
  if (
    HEX3.test(trimmed) ||
    HEX6.test(trimmed) ||
    RGB.test(trimmed) ||
    RGBA.test(trimmed) ||
    HSL.test(trimmed) ||
    HSLA.test(trimmed)
  ) {
    return trimmed;
  }
  return COLOR_FALLBACK;
}
