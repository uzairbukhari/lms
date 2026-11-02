import { useCallback, useState } from "react";
import { DEFAULT_THEME, isThemeId, type ThemeId } from "@lms/schema";

const STORAGE_KEY = "lms-theme";

export const THEME_LABELS: Record<ThemeId, string> = {
  space: "Space Explorers",
  candy: "Candy Arcade",
  sunny: "Sunny Playground",
  forest: "Storybook Forest",
};

/** The theme saved in this browser, or the default (Space Explorers). Storage can be blocked, so never throws. */
export function getStoredTheme(): ThemeId {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isThemeId(value) ? value : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/** Switch the whole UI to a theme and remember it in this browser. */
export function applyTheme(theme: ThemeId): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }
}

export function useTheme(): [ThemeId, (theme: ThemeId) => void] {
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme);
  const setTheme = useCallback((next: ThemeId) => {
    applyTheme(next);
    setThemeState(next);
  }, []);
  return [theme, setTheme];
}
