/**
 * Values every surface and the service share.
 *
 * `API_ORIGIN` is the one source of truth for the Kaneo server. The service
 * (`src/service/main.ts`) is the only place that reaches it, for the sign-in
 * and every forwarded call, so retargeting the extension means changing this
 * one line and rebuilding.
 */
export const API_ORIGIN = "https://cloud.kaneo.app";

/** The web app origin, used to build the "open in Kaneo" links. */
export const WEB_ORIGIN = API_ORIGIN.replace(/\/api\/?$/, "");

/** Chip provider id. Matches `panel.id`, so OpenChamber groups our chips. */
export const PROVIDER_ID = "kaneo-tasks";

/** Tasks requested per board page. Kaneo accepts 1 to 100 and caps the response. */
export const TASKS_PER_PAGE = 100;

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
