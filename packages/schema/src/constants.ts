// Constants shared by the web app and the Worker.
export const THEMES = ["space", "candy", "sunny", "forest"] as const;
export type ThemeId = (typeof THEMES)[number];

/** Space Explorers is the default theme (docs/PLAN.md section 4a). */
export const DEFAULT_THEME: ThemeId = "space";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export const SUBJECTS = ["maths", "science", "data-ai", "general-knowledge", "english"] as const;
export type SubjectId = (typeof SUBJECTS)[number];

