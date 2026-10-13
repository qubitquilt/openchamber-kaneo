/**
 * Values the manifest and every surface have to agree on.
 *
 * `API_ORIGIN` is the one source of truth for the Kaneo server. The manifest
 * copies it into `openchamber.contributes.integration.token.apiOrigin` because
 * OpenChamber only calls the origin declared there. `npm run check:manifest`
 * fails the build when the two drift apart.
 */
export const API_ORIGIN = "https://kaneo.qubitquilt.dev";

/** The web app origin, used to build the "open in Kaneo" links. */
export const WEB_ORIGIN = API_ORIGIN.replace(/\/api\/?$/, "");

/** Chip provider id. Matches `panel.id`, so OpenChamber groups our chips. */
export const PROVIDER_ID = "kaneo";

/** Highest accepted response size for a single host request, in characters. */
export const PAGE_SIZE = 100;

export const PRIORITIES = ["no-priority", "low", "medium", "high", "urgent"] as const;

export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_TONE: Record<Priority, "neutral" | "info" | "warning" | "error"> = {
  "no-priority": "neutral",
  low: "info",
  medium: "info",
  high: "warning",
  urgent: "error",
};

export const PRIORITY_RANK: Record<Priority, number> = {
  "no-priority": 0,
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
};

/** `POST /task/{projectId}` and `PUT /task/{id}` both reject anything else. */
export function isPriority(value: string): value is Priority {
  return (PRIORITIES as readonly string[]).includes(value);
}

export function normalizePriority(value: string | null | undefined): Priority {
  return isPriority(value ?? "") ? (value as Priority) : "no-priority";
}
