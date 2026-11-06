import { gradeQuestion, type CheckQuestion, type Response } from "@lms/schema";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api, ApiError } from "../api";
import { Loader } from "../components/Loader";
import { QuestionView } from "../components/QuestionView";
import { KIND, pastel, starsFor, type TopicLesson } from "../lib/topic";
import { SUBJECT_LOOK, shortTitle } from "./StudentHome";

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
  const total = topic.subLessons.length;
  const allDone = doneCount === total;
  const next = topic.subLessons.find((s) => !s.viewed);
  const hasGoals = topic.successCriteria.length > 0 || !!topic.realLife;
  const stars = data.quiz && topic.lastQuiz ? starsFor(topic.lastQuiz.percent) : 0;
  return <TopicBody lesson={lesson} topic={topic} quiz={data.quiz} look={look} doneCount={doneCount} total={total} allDone={allDone} nextId={next?.id ?? null} hasGoals={hasGoals} stars={stars} />;
}

type BodyProps = { lesson: TopicLesson["lesson"]; topic: NonNullable<TopicLesson["topic"]>; quiz: TopicLesson["quiz"]; look: { emoji: string; label: string }; doneCount: number; total: number; allDone: boolean; nextId: string | null; hasGoals: boolean; stars: number };

/** A topic as a swipeable row of cards: one per part, then the big quiz. */
function TopicBody({ lesson, topic, quiz, look, doneCount, total, allDone, nextId, hasGoals, stars }: BodyProps) {
  const navigate = useNavigate();
  const [panel, setPanel] = useState<null | "goals" | "remember">(null);
  const [at, setAt] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const items = total + 1;
  const first = Math.max(0, nextId ? topic.subLessons.findIndex((s) => s.id === nextId) : total);
  useEffect(() => { rail.current?.children[first]?.scrollIntoView?.({ inline: "center", block: "nearest" }); }, [first]);
  const onScroll = () => {
    const el = rail.current;
    if (!el?.children[0]) return;
    setAt(Math.min(items - 1, Math.round(el.scrollLeft / ((el.children[0] as HTMLElement).offsetWidth + 20))));
  };
  const toggle = (k: "goals" | "remember") => setPanel(panel === k ? null : k);
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-3 px-4 py-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Back" onClick={() => navigate(-1)} className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-line bg-surface"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
          <div>
            <p className="text-base font-bold text-muted"><span aria-hidden="true">{look.emoji} </span>{look.label} · {total} parts</p>
            <h1 className="font-display text-4xl font-extrabold leading-none">{shortTitle(lesson.title)}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-40 overflow-hidden rounded-full" style={{ background: "var(--track)" }} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={doneCount}><div className="m-shine h-full rounded-full" style={{ width: `${(doneCount / Math.max(1, total)) * 100}%`, background: "var(--accent)" }} /></div>
          <p className="text-lg font-bold">{doneCount} of {total}</p>
        </div>
      </header>
      <p className="text-lg text-muted">{lesson.summary}</p>

      <div className="flex flex-wrap gap-2">
        {hasGoals && <button type="button" aria-pressed={panel === "goals"} className="btn !min-h-11 !text-base" onClick={() => toggle("goals")}>🎯 By the end I can…</button>}
        {topic.warmUp.length > 0 && <button type="button" aria-pressed={panel === "remember"} className="btn !min-h-11 !text-base" onClick={() => toggle("remember")}>🧠 Remember</button>}
      </div>
      {panel === "goals" && (
        <section className="card grid gap-4 p-5 sm:grid-cols-2" aria-label="What you will learn">
          {topic.successCriteria.length > 0 && <div><h2 className="font-display text-xl font-bold">By the end I can…</h2><ul className="mt-1 list-disc pl-5 text-lg">{topic.successCriteria.map((c) => <li key={c}>{c.replace(/^I can /i, "")}</li>)}</ul></div>}
          {topic.realLife && <div><h2 className="font-display text-xl font-bold">Where you will use it</h2><p className="mt-1 text-lg">{topic.realLife}</p></div>}
        </section>
      )}
      {panel === "remember" && <Remember questions={topic.warmUp as CheckQuestion[]} />}
      {topic.practise.length > 0 && (
        <p role="status" className="card p-3 text-lg font-bold" style={{ borderColor: "var(--accent)" }}>💪 Practise again: {topic.practise.map((p) => p.title).join(" and ")}. Then try the big quiz again.</p>
      )}

      <div ref={rail} onScroll={onScroll} tabIndex={0} aria-label="Parts. Swipe sideways to see them all." className="flex min-h-[420px] flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-150px)] pb-3 pt-2">
        {topic.subLessons.map((s, i) => {
          const k = KIND[s.kind];
          const here = nextId === s.id;
          return (
            <article key={s.id} aria-label={`Part ${i + 1}, ${k.label}: ${s.title}${s.viewed ? " (done)" : ""}`} className={"card flex w-[300px] shrink-0 snap-center flex-col gap-3 p-4 " + (here ? "m-glow" : "")} style={here ? { borderColor: "#ffd166", borderWidth: 3 } : undefined}>
              <div className="relative flex flex-1 items-center justify-center rounded-2xl text-7xl" style={{ minHeight: 130, maxHeight: 280, background: pastel(i), color: "#161a40" }}>
                <span aria-hidden="true" className="m-bob inline-block" style={{ "--i": i } as CSSProperties}>{k.emoji}</span>
                {s.viewed && <span aria-hidden="true" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg font-extrabold" style={{ background: "#161a40", color: "#ffd166" }}>✓</span>}
              </div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Part {i + 1} · {k.label}{s.viewed ? " · Done" : here ? " · Your quest" : ""}</p>
              <h2 className="font-display text-2xl font-bold leading-tight">{s.title}</h2>
              <p className="text-sm font-bold text-muted">{s.weak ? "💪 Practise again" : s.miniBest !== null ? `Mini quiz best ${s.miniBest}%` : `${s.miniCount} question mini quiz`}</p>
              <Link to={`/topic/${lesson.id}/part/${s.id}`} className={"btn btn-primary mt-auto !min-h-12 text-lg " + (here ? "m-shine" : "")}>{s.viewed ? "Do it again" : "▶ " + (here ? "Keep going" : "Start")}</Link>
            </article>
          );
        })}
        <article aria-label="Big quiz" className={"card flex w-[300px] shrink-0 snap-center flex-col gap-3 p-4 " + (allDone ? "m-glow" : "")} style={allDone ? { borderColor: "#ffd166", borderWidth: 3 } : { borderStyle: "dashed", opacity: 0.85 }}>
          <div className="flex flex-1 items-center justify-center rounded-2xl text-7xl" style={{ minHeight: 130, maxHeight: 280, background: allDone ? "#ffd166" : "var(--done-bg)", color: "#161a40" }}>
            <span aria-hidden="true" className="m-bob inline-block">{allDone ? "🏁" : "🔒"}</span>
          </div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Big quiz{topic.lastQuiz ? (topic.lastQuiz.passed ? " · Passed" : " · Try again") : allDone ? " · Ready" : " · Locked"}</p>
          <h2 className="font-display text-2xl font-bold leading-tight">Show what you know</h2>
          <p className="text-sm font-bold text-muted">{quiz.questionCount} questions. You need {quiz.passPercent}% to open the next topic.{!allDone && " Finish all the parts first."}</p>
          {topic.lastQuiz && <span aria-label={`${stars} of 3 stars`} className="text-xl" style={{ color: "#ffd166" }}>{"★".repeat(stars)}<span style={{ opacity: 0.3 }}>{"★".repeat(3 - stars)}</span></span>}
          {allDone ? <Link className="btn btn-primary m-shine mt-auto !min-h-12 text-lg" to={`/lesson/${lesson.id}/quiz`}>▶ {topic.lastQuiz ? "Try again" : "Start the big quiz"}</Link> : <span className="btn mt-auto !min-h-12 opacity-60" aria-disabled="true">🔒 Locked</span>}
        </article>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-2" aria-hidden="true">{Array.from({ length: items }, (_, i) => <span key={i} className="h-2.5 rounded-full" style={{ width: i === at ? 26 : 10, background: i === at ? "var(--accent)" : "var(--done-bg)" }} />)}</div>
        <p className="text-sm font-bold text-muted">Swipe to see all parts</p>
      </div>
    </main>
  );
}
