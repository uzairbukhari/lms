import { useEffect, useState } from "react";
import { SUBJECTS, THEMES, type HealthResponse, type SubjectId } from "@lms/schema";
import { THEME_LABELS, useTheme } from "./theme";

const SUBJECT_LABELS: Record<SubjectId, string> = {
  maths: "Maths",
  science: "Science",
  "data-ai": "Computer Science, Data & AI",
  "general-knowledge": "General Knowledge",
};

type ApiState = "checking" | "online" | "offline";

function useApiStatus(): ApiState {
  const [state, setState] = useState<ApiState>("checking");
  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((res) => (res.ok ? (res.json() as Promise<HealthResponse>) : Promise.reject(new Error("bad status"))))
      .then(() => !cancelled && setState("online"))
      .catch(() => !cancelled && setState("offline"));
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}

export function App() {
  const [theme, setTheme] = useTheme();
  const api = useApiStatus();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Learning Adventures</h1>
          <p className="mt-1 text-lg text-muted">Setup complete. Lessons are coming soon!</p>
        </div>
        <p className="card px-4 py-2 text-base" role="status">
          Server: {api === "checking" ? "checking…" : api === "online" ? "online" : "offline"}
        </p>
      </header>

      <section aria-labelledby="theme-heading" className="flex flex-col gap-3">
        <h2 id="theme-heading" className="font-display text-2xl font-bold">
          Pick a look
        </h2>
        <div className="flex flex-wrap gap-3">
          {THEMES.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={theme === id}
              onClick={() => setTheme(id)}
              className={
                "min-h-12 cursor-pointer rounded-card px-5 text-lg font-bold " +
                (theme === id ? "bg-accent text-on-accent" : "card")
              }
            >
              {THEME_LABELS[id]}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="subjects-heading" className="flex flex-col gap-3">
        <h2 id="subjects-heading" className="font-display text-2xl font-bold">
          Subjects
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {SUBJECTS.map((id) => (
            <li key={id} className="card p-5">
              <span className="font-display text-2xl font-bold">{SUBJECT_LABELS[id]}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
