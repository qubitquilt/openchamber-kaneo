import { el } from "./dom";

/**
 * The Kaneo mark, inlined rather than loaded: the sandbox's CSP serves images
 * only from the package, and an inline SVG follows the text colour for free.
 * Same path data as `assets/kaneo.svg`, the rail icon.
 */
const MARK =
  '<path d="M38.9 510.4C15 515.5 0 507.7 0 498.4V314.3c0-1 0-2 .1-3V127.7c.1-7.5 1.5-12.8 19-16.5l81.8-16.5c23.9-5.1 38.9 2.7 38.9 12v370.8c-.1 7.5-1.5 12.8-19 16.5zm186.2-46.6c-23.9 5.1-38.9-2.7-38.9-12v-184c0-1 0-2 .1-3V81.1c.1-7.5 1.5-12.8 19-16.5l81.8-16.5C311 43 326 50.8 326 60.1v370.8c-.1 7.5-1.5 12.8-19 16.5zm248-462.2C497-3.5 512 4.3 512 13.6v63.1L407.6 212.4 512 342v42.3c-.1 7.5-1.5 12.8-19 16.5l-81.8 16.5c-23.9 5.1-38.9-2.7-38.9-12V221.2c0-1 0-2 .1-3V34.6c.1-7.5 1.5-12.8 19-16.5z"/>';

export function kaneoMark(size = 16): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 512 512");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = MARK;
  svg.classList.add("kaneo-mark");
  return svg;
}

/** The wordmark row used to head the full-screen board and the attach dialog. */
export function kaneoWordmark(text: string): HTMLElement {
  return el("span", { className: "kaneo-wordmark" }, kaneoMark(16), el("span", {}, text));
}
