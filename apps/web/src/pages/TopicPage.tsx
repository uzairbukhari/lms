import { gradeQuestion, type CheckQuestion, type Response } from "@lms/schema";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api";
import { Loader } from "../components/Loader";
import { QuestionView } from "../components/QuestionView";
import { KIND, type TopicLesson } from "../lib/topic";
import { SUBJECT_LOOK } from "./StudentHome";

/** A 3-question "Remember" warm-up on earlier learning. Marked on screen; never saved. */
function Remember({ questions }: { questions: CheckQuestion[] }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [value, setValue] = useState<Response>(undefined);
  const [result, setResult] = useState<boolean | null>(null);
  if (questions.length === 0) return null;
  const q = questions[i];
  if (!open) return <button type="button" className="card flex items-center gap-3 p-4 text-left text-lg font-bold" onClick={() => setOpen(true)}><span aria-hidden="true" className="text-3xl">🧠</span> Remember: {questions.length} quick questions from before. Tap to warm up!</button>;
  if (!q) return <p role="status" className="card p-4 text-lg font-bold">🧠 Warm-up done. Your brain is ready!</p>;
  return (
    <section className="card flex flex-col gap-3 p-5" aria-label="Remember warm-up">
      <p className="text-sm font-extrabold uppercase tracking-wide text-muted">🧠 Remember · {i + 1} of {questions.length}</p>
      <QuestionView q={q} value={value} onChange={(v) => { setValue(v); setResult(null); }} />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-primary !min-h-12" onClick={() => setResult(gradeQuestion(q, value).correct)}>Check ✔</button>
        {result !== null && <button type="button" className="btn !min-h-12" onClick={() => { setI(i + 1); setValue(undefined); setResult(null); }}>{i + 1 < questions.length ? "Next" : "Finish"}</button>}
        <p role="status" aria-live="polite" className="text-lg font-bold">{result === true ? `🎉 Yes! ${q.explanation ?? ""}` : result === false ? `🤔 Not quite. ${q.explanation ?? ""}` : ""}</p>
      </div>
    </section>
  );
}

/** One topic: a card for each sub-lesson (learn, try, play, use) and the big quiz at the end. */
export function TopicPage() {
  const { id } = useParams();
  const [data, setData] = useState<TopicLesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api<TopicLesson>(`/api/lessons/${id}`).then(setData).catch((e: unknown) => setError(e instanceof ApiError && e.status === 404 ? "This topic isn't open yet." : "We couldn't load this topic. Please try again."));
  }, [id]);
  if (error) return <main className="mx-auto max-w-3xl p-8"><p role="alert" className="text-xl">{error}</p><Link className="btn mt-4" to="/">← Back</Link></main>;
  if (!data) return <Loader label="Opening your topic…" fullScreen />;
  const { lesson, topic } = data;
  if (!topic) return <main className="mx-auto max-w-3xl p-8"><p className="text-xl">This is a normal lesson.</p><Link className="btn btn-primary mt-4" to={`/lesson/${lesson.id}`}>Open it</Link></main>;

  const look = SUBJECT_LOOK[lesson.subject] ?? { emoji: "📘", label: lesson.subject };
  const doneCount = topic.subLessons.filter((s) => s.viewed).length;
  const allDone = doneCount === topic.subLessons.length;
  const next = topic.subLessons.find((s) => !s.viewed);
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-5 px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-lg font-extrabold uppercase tracking-wide text-muted"><span aria-hidden="true">{look.emoji} </span>{look.label}</p>
          <h1 className="font-display text-4xl font-extrabold">{lesson.title}</h1>
          <p className="text-lg text-muted">{lesson.summary}</p>
        </div>
        <Link className="btn !min-h-14" to="/">← Back</Link>
      </header>

      {(topic.successCriteria.length > 0 || topic.realLife) && (
        <section className="card grid gap-4 p-5 sm:grid-cols-2" aria-label="What you will learn">
          {topic.successCriteria.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">By the end I can…</h2>
              <ul className="mt-1 list-disc pl-5 text-lg">{topic.successCriteria.map((c) => <li key={c}>{c.replace(/^I can /i, "")}</li>)}</ul>
            </div>
          )}
          {topic.realLife && <div><h2 className="font-display text-xl font-bold">Where you will use it</h2><p className="mt-1 text-lg">{topic.realLife}</p></div>}
        </section>
      )}

      <Remember questions={topic.warmUp as CheckQuestion[]} />

      {topic.practise.length > 0 && (
        <p role="status" className="card p-4 text-lg font-bold" style={{ borderColor: "var(--accent)" }}>
          💪 Practise again: {topic.practise.map((p) => p.title).join(" and ")}. Then try the big quiz again.
        </p>
      )}

      <section aria-labelledby="parts" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="parts" className="font-display text-2xl font-bold">Your parts</h2>
          <p className="text-lg text-muted">{doneCount} of {topic.subLessons.length} done</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topic.subLessons.map((s, i) => {
            const k = KIND[s.kind];
            const here = next?.id === s.id;
            return (
              <Link key={s.id} to={`/topic/${lesson.id}/part/${s.id}`} className="card flex flex-col gap-2 p-5" style={here ? { borderColor: "var(--accent)", borderWidth: 4 } : undefined} aria-label={`Part ${i + 1}, ${k.label}: ${s.title}${s.viewed ? " (done)" : ""}`}>
                <span aria-hidden="true" className="flex h-24 items-center justify-center rounded-2xl text-5xl" style={{ background: ["#ff7a59", "#2fb6f0", "#4cc35a", "#a779ff"][i % 4] }}>{k.emoji}</span>
                <span className="flex items-center justify-between">
                  <span className="text-sm font-extrabold uppercase tracking-wide text-muted">Part {i + 1} · {k.label}</span>
                  {s.viewed && <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full text-base" style={{ background: "var(--stamp)", color: "var(--on-stamp)" }}>✓</span>}
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-auto text-sm font-bold text-muted">
                  {s.weak ? "💪 Practise again" : s.miniBest !== null ? `Mini quiz best ${s.miniBest}%` : `${s.miniCount} question mini quiz`}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="card flex flex-wrap items-center justify-between gap-4 p-5" aria-labelledby="big">
        <div>
          <h2 id="big" className="font-display text-2xl font-bold">🏁 Big quiz</h2>
          <p className="text-lg text-muted">
            {data.quiz.questionCount} questions. You need {data.quiz.passPercent}% to open the next topic.
            {!allDone && " Finish all the parts first."}
          </p>
        </div>
        {allDone ? <Link className="btn btn-primary !min-h-16 !px-8 text-xl" to={`/lesson/${lesson.id}/quiz`}>{topic.lastQuiz ? "Try again" : "Start the big quiz"}</Link> : <span className="btn !min-h-16 !px-8 text-xl opacity-60" aria-disabled="true">🔒 Locked</span>}
      </section>
    </main>
  );
}
