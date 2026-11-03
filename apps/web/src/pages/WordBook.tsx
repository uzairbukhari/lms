import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import type { WordRow } from "../lib/cards";
import { speak } from "../lib/sound";
import { SUBJECT_LOOK } from "./StudentHome";

/** Every word the child pressed and held in a lesson, with its meaning, grouped by subject. */
export function WordBook() {
  const [words, setWords] = useState<WordRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { api<{ words: WordRow[] }>("/api/words").then((r) => setWords(r.words)).catch(() => setFailed(true)); }, []);
  const bySubject = new Map<string, WordRow[]>();
  for (const w of words ?? []) bySubject.set(w.subject, [...(bySubject.get(w.subject) ?? []), w]);
  const practisable = (words ?? []).filter((w) => w.source === "lesson").length;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">📖 My Word Book</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      <p className="text-lg text-muted">Press and hold any word in a lesson to see what it means. It lands here!</p>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't open your Word Book. Please try again.</p>}
      {words && words.length === 0 && <p className="card p-6 text-xl">No words yet. In a lesson, press and hold a word you'd like to know. ✋</p>}
      {practisable > 0 && <Link className="btn btn-primary self-start !min-h-14" to="/cards/words">🃏 Practise my words ({practisable})</Link>}
      {[...bySubject].map(([subject, list]) => {
        const look = SUBJECT_LOOK[subject] ?? { emoji: "📘", label: subject };
        return (
          <section key={subject} aria-label={look.label} className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold"><span aria-hidden="true">{look.emoji} </span>{look.label}</h2>
            <ul className="flex flex-col gap-3">
              {list.map((w) => (
                <li key={`${w.lesson}:${w.word}`} className="card flex items-start gap-3 p-4">
                  <div className="flex-1">
                    <p className="text-xl font-extrabold">{w.word} {w.mastered && <span title="You know this one!">🏅</span>}</p>
                    <p className="text-lg">{w.meaning}</p>
                    <p className="text-sm text-muted">From: {w.lesson}</p>
                  </div>
                  <button type="button" className="btn !min-h-12 !px-4" aria-label={`Hear ${w.word}`} onClick={() => speak(`${w.word}. ${w.meaning}`, undefined, { force: true })}>🔊</button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
