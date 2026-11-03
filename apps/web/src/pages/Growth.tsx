import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import type { Growth as GrowthData } from "../lib/rewards";
import { SUBJECT_LOOK } from "./StudentHome";

/** "My growth": a plant per subject that grows with finished lessons, and first try next to best try. Only her own numbers. */
export function Growth() {
  const [data, setData] = useState<GrowthData | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { api<GrowthData>("/api/growth").then(setData).catch(() => setFailed(true)); }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">🌱 My growth</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      <p className="text-lg text-muted">Every lesson you finish makes your plants grow. Look how much better your best try is than your first try!</p>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't load this. Please try again.</p>}
      {!data && !failed && <p className="text-lg text-muted">Growing…</p>}
      {data && data.subjects.length === 0 && <p className="card p-5 text-lg">Finish your first lesson to plant a seed! 🌰</p>}
      {data?.subjects.map((s) => {
        const look = SUBJECT_LOOK[s.subject] ?? { emoji: "📘", label: s.subject };
        return (
          <section key={s.subject} aria-label={look.label} className="card flex flex-col gap-4 p-5">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="text-7xl">{s.stage.emoji}</span>
              <div>
                <h2 className="font-display text-2xl font-extrabold"><span aria-hidden="true">{look.emoji} </span>{look.label}</h2>
                <p className="text-lg">{s.stage.label} · {s.lessonsDone} {s.lessonsDone === 1 ? "lesson" : "lessons"} finished{s.improved > 0 ? ` · you improved on ${s.improved} ${s.improved === 1 ? "quiz" : "quizzes"}` : ""}</p>
              </div>
            </div>
            {s.lessons.length > 0 && (
              <ul className="flex flex-col gap-3">
                {s.lessons.map((l) => (
                  <li key={l.id} className="flex flex-col gap-1">
                    <p className="font-bold">{l.title}</p>
                    <div className="flex items-center gap-3" role="img" aria-label={`First try ${l.first} percent, best try ${l.best} percent`}>
                      <div className="relative h-5 flex-1 overflow-hidden rounded-full border-2 border-line" style={{ background: "var(--track)" }}>
                        <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${Math.max(3, l.best)}%`, opacity: 0.9 }} />
                        <div className="absolute inset-y-0 w-1 bg-black/70" style={{ left: `calc(${Math.min(97, l.first)}% - 2px)` }} title="First try" />
                      </div>
                      <span className="w-40 text-sm font-bold">{l.tries === 1 ? `${l.best}%` : l.best > l.first ? `${l.first}% → ${l.best}% 🎉` : `${l.first}% → ${l.best}%`}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {s.lessons.length > 0 && <p className="text-sm text-muted">The dark mark shows your first try. The coloured bar shows your best try.</p>}
          </section>
        );
      })}
    </main>
  );
}
