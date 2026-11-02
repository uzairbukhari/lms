import { THEMES } from "@lms/schema";
import { useAuth } from "../auth";
import { THEME_LABELS } from "../theme";

export function ThemeSwitcher() {
  const { theme, chooseTheme } = useAuth();
  return (
    <div role="group" aria-label="Pick a look" className="flex flex-wrap justify-center gap-3">
      {THEMES.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={theme === id}
          onClick={() => chooseTheme(id)}
          className={"btn !min-h-14 " + (theme === id ? "btn-primary" : "")}
        >
          {THEME_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
