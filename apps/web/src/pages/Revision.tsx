import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { api } from "../api";
import type { Revision as RevisionData } from "../lib/cards";
import { SUBJECT_LOOK } from "./StudentHome";

/** Before the exam: for each subject, the words to know and the questions missed this semester, with their answers. */
export function Revision() {
  const [params] = useSearchParams();
  const [data, setData] = useState<RevisionData | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const semester = params.get("semester");
  useEffect(() => { api<RevisionData>(`/api/revision${semester ? `?semester=${semester}` : ""}`).then(setData).catch(() => setFailed(true)); }, [semester]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">📚 Exam revision{data ? `: semester ${data.semester}` : ""}</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't load your revision pack. Please try again.</p>}
      {data && data.subjects.length === 0 && <p className="card p-6 text-xl">Nothing to revise yet. Finish some lessons first! 🌱</p>}
      {data && data.subjects.length > 0 && <Link className="btn btn-primary self-start !min-h-14" to={`/cards/semester?semester=${data.semester}`}>🃏 Practise with cards</Link>}
      {data?.subjects.map((s) => {
        const look = SUBJECT_LOOK[s.subject] ?? { emoji: "📘", label: s.subject };
        return (
          <section key={s.subject} aria-label={look.label} className="card flex flex-col gap-4 p-5">
            <h2 className="font-display text-2xl font-extrabold"><span aria-hidden="true">{look.emoji} </span>{look.label}</h2>
            <p className="text-muted">{s.lessons.length} {s.lessons.length === 1 ? "lesson" : "lessons"}: {s.lessons.join(", ")}</p>
            {s.words.length > 0 && (
              <>
                <h3 className="font-display text-xl font-bold">Words to know</h3>
                <dl className="grid gap-2">
                  {s.words.map((w) => <div key={w.term}><dt className="inline font-extrabold">{w.term}</dt> <dd className="inline">: {w.meaning}</dd></div>)}
                </dl>
              </>
            )}
            {s.questions.length > 0 && (
              <>
                <h3 className="font-display text-xl font-bold">Questions to try again</h3>
                <ul className="flex flex-col gap-3">
                  {s.questions.map((q) => (
                    <li key={q.id} className="flex flex-col gap-1 rounded-2xl border-2 border-line p-3">
                      <p className="text-lg font-bold">{q.prompt}</p>
                      {shown[q.id] ? <p role="status">{q.answer ? <>Answer: <strong>{q.answer}</strong></> : q.explanation}{q.answer && q.explanation ? <span className="text-muted"> · {q.explanation}</span> : null}</p>
                        : <button type="button" className="btn self-start !min-h-12" onClick={() => setShown((x) => ({ ...x, [q.id]: true }))}>Show the answer</button>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        );
      })}
    </main>
  );
}
