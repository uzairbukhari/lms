// Shared types and validation used by both the web app and the Worker.
// The lesson JSON schema (docs/PLAN.md section 5) is added in Phase 3.

export const THEMES = ["space", "candy", "sunny", "forest"] as const;
export type ThemeId = (typeof THEMES)[number];

/** Space Explorers is the default theme (docs/PLAN.md section 4a). */
export const DEFAULT_THEME: ThemeId = "space";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export const SUBJECTS = ["maths", "science", "data-ai", "general-knowledge"] as const;
export type SubjectId = (typeof SUBJECTS)[number];

export interface HealthResponse {
  ok: true;
  service: "lms";
  time: string;
}
