import type { Response } from "@lms/schema";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api, ApiError } from "../api";
import { Loader } from "../components/Loader";
import { TopicFollowUp } from "../components/TopicFollowUp";
import { StuckButton } from "../components/StuckButton";
import { QuestionView, type ViewQuestion } from "../components/QuestionView";
import { questionToSpeech } from "../lib/quizSpeech";
import { speak, stopSpeech } from "../lib/sound";
import { ROUNDS_FROM, resumeRound, roundEnd, roundOf, roundStart, roundsFor, writeActive } from "../lib/rounds";
import { QuizCelebration } from "../anim/rewards/QuizCelebration";
import { RewardBurst } from "../anim/rewards/RewardBurst";

type Question = ViewQuestion & { id: string; hasHint: boolean };
type Started = { attemptId: string; attemptNumber: number; mode: "graded" | "practice"; resumed: boolean; passPercent: number; questions: Question[]; draft?: Draft | null; ageBand?: string | null };
type Draft = { answers: Record<string, Response>; hintsUsed: string[]; index: number };
type ReviewItem = { questionId: string; correct: boolean; points: number; maxPoints: number; response: unknown; answer: unknown; explanation: string | null };
type Result = { attemptId: string; mode: "graded" | "practice"; attemptNumber: number; score: number; maxScore: number; percent: number; passed: boolean; review: ReviewItem[] };

/** Shows an answer in words, from the ids the server stores. */
function words(q: Question, v: unknown): string {
  const text = (list: { id: string; text: string }[] | undefined, id: unknown) => list?.find((o) => o.id === id)?.text ?? String(id);
  if (v === null || v === undefined || v === "") return "(no answer)";
  switch (q.type) {
    case "multiple_choice":
    case "multi_select":
      return (Array.isArray(v) ? v : [v]).map((id) => text(q.options, id)).join(", ");
    case "true_false":
      return (Array.isArray(v) ? v[0] : v) === true ? "True" : "False";
    case "number":
      return typeof v === "object" ? String((v as { value: number }).value) : String(v);
    case "short_text":
      return typeof v === "object" && v !== null ? (v as { accepted: string[] }).accepted[0] ?? "" : String(v);
    case "order":
      return Array.isArray(v) ? v.map((id) => text(q.items, id)).join(" → ") : "(no answer)";
    case "match":
      return Object.entries(v as Record<string, string>).map(([l, r]) => `${text(q.left, l)} = ${text(q.right, r)}`).join("; ");
    case "fill_blank":
      return Object.entries(v as Record<string, string>).map(([b, o]) => `${b.replace(/^b/, "gap ")}: ${q.blanks?.find((x) => x.id === b)?.options.find((x) => x.id === o)?.text ?? o}`).join("; ");
    case "hotspot":
      return (Array.isArray(v) ? v : [v]).map((id) => q.scene?.items.find((i) => i.id === id)?.label ?? String(id)).join(", ");
    case "slider": {
      const n = typeof v === "object" && v !== null ? (v as { value: number }).value : v;
      return `${n}${q.range?.unit ? ` ${q.range.unit}` : ""}`;
    }
  }
}

const localKey = (attemptId: string) => `lms:quiz-draft:${attemptId}`;
const readLocal = (attemptId: string): Draft | null => {
  try { return JSON.parse(localStorage.getItem(localKey(attemptId)) ?? "null") as Draft | null; } catch { return null; }
};
const writeLocal = (attemptId: string, d: Draft | null) => {
  try { if (d) localStorage.setItem(localKey(attemptId), JSON.stringify(d)); else localStorage.removeItem(localKey(attemptId)); } catch { /* storage may be blocked */ }
};

export function QuizPlayer({ kind }: { kind: "lesson" | "exam" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [breakRound, setBreakRound] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Started | null>(null);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [answers, setAnswers] = useState<Record<string, Response>>({});
  const [index, setIndex] = useState(0);
  const [hints, setHints] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [saved, setSaved] = useState<"saved" | "offline" | null>(null);
  const began = useRef(Date.now());
  const restored = useRef(false);

  const start = useCallback(async () => {
    setError(null); setResult(null); setAnswers({}); setHints({}); setIndex(0); setQuiz(null); setSubmitError(false); setSaved(null); setBreakRound(null);
    restored.current = false;
    try {
      const path = kind === "lesson" ? `/api/lessons/${id}/quiz/start` : `/api/exams/${id}/start`;
      const started = await api<Started>(path, { method: "POST", body: {} });
      // Pick up where the child left off: answers saved on this device and on the server.
      const local = readLocal(started.attemptId);
      const server = started.draft ?? null;
      const answers = { ...(server?.answers ?? {}), ...(local?.answers ?? {}) };
      const ids = new Set(started.questions.map((x) => x.id));
      const kept = Object.fromEntries(Object.entries(answers).filter(([k]) => ids.has(k)));
      setAnswers(kept);
      setHints(Object.fromEntries([...(server?.hintsUsed ?? []), ...(local?.hintsUsed ?? [])].map((k) => [k, "💡 Hint used."])));
      const rd = roundsFor(started.ageBand, started.questions.length);
      // With rounds, carry on at the start of the first round that still has an unanswered question.
      setIndex(rd.count > 1
        ? roundStart(resumeRound(started.questions.map((x) => kept[x.id] !== undefined && kept[x.id] !== ""), rd.size), rd.size)
        : Math.min(local?.index ?? server?.index ?? 0, started.questions.length - 1));
      setQuiz(started);
      restored.current = true;
      began.current = Date.now();
    } catch (e) {
      setError(e instanceof ApiError ? { code: e.code, message: e.status === 404 ? "That quiz isn't open yet." : e.message } : { code: "error", message: "We couldn't open the quiz." });
    }
  }, [id, kind]);
  useEffect(() => { void start(); }, [start]);

  // Save every change: instantly on this device, and (a moment later) on the server.
  useEffect(() => {
    if (!quiz || result || !restored.current) return;
    const draft: Draft = { answers, hintsUsed: Object.keys(hints), index };
    writeLocal(quiz.attemptId, draft);
    const rd = roundsFor(quiz.ageBand, quiz.questions.length);
    if (kind === "lesson" && id && rd.count > 1) {
      writeActive(id, { attemptId: quiz.attemptId, round: resumeRound(quiz.questions.map((x) => answers[x.id] !== undefined && answers[x.id] !== ""), rd.size) + 1, rounds: rd.count });
    }
    const t = setTimeout(() => {
      api(`/api/quiz/attempts/${quiz.attemptId}/progress`, { method: "PUT", body: draft }).then(() => setSaved("saved")).catch(() => setSaved("offline"));
    }, 700);
    return () => clearTimeout(t);
  }, [answers, hints, index, quiz, result, kind, id]);

  const submitRef = useRef<() => Promise<void>>(async () => {});
  // When the internet comes back, hand the quiz in again if the last try failed.
  useEffect(() => {
    const retry = () => { if (submitError) void submitRef.current(); };
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [submitError]);

  const back = kind === "lesson" ? `/lesson/${id}` : "/";

  if (error) return <Shell><p role="alert" className="text-xl">{error.message}</p><Link className="btn" to="/">Back home</Link></Shell>;
  if (!quiz) return <Loader label="Getting your questions ready…" fullScreen />;

  if (result) return <Results result={result} quiz={quiz} again={() => void start()} kind={kind} lessonId={id ?? ""} />;

  const total = quiz.questions.length;
  const rd = roundsFor(quiz.ageBand, total);
  const multi = rd.count > 1;
  const round = roundOf(index, rd.size);
  const lowest = multi ? roundStart(round, rd.size) : 0;
  const lastInRound = multi && index === roundEnd(round, rd.size, total);
  const q = quiz.questions[index] as Question;
  const last = index === total - 1;
  const answered = quiz.questions.filter((x) => answers[x.id] !== undefined && answers[x.id] !== "").length;

  const getHint = async () => {
    try {
      const r = await api<{ hint: string }>("/api/ai/hint", { body: { attemptId: quiz.attemptId, questionId: q.id } });
      setHints((h) => ({ ...h, [q.id]: r.hint }));
    } catch {
      setHints((h) => ({ ...h, [q.id]: "Read the question again, slowly. Take your time!" }));
    }
  };

  const submit = async () => {
    setBusy(true); setSubmitError(false);
    try {
      const r = await api<Result>(`/api/quiz/attempts/${quiz.attemptId}/submit`, {
        body: { answers, hintsUsed: Object.keys(hints), durationSec: Math.round((Date.now() - began.current) / 1000) },
      });
      writeLocal(quiz.attemptId, null);
      if (id) writeActive(id, null);
      setResult(r);
    } catch (e) {
      if (e instanceof ApiError && e.code === "already_submitted") {
        // An earlier hand-in got through but its reply was lost: show the recorded result.
        try {
          const r = await api<Result>(`/api/quiz/attempts/${quiz.attemptId}`);
          writeLocal(quiz.attemptId, null);
          if (id) writeActive(id, null);
          setResult(r);
          return;
        } catch { /* fall through to the retry message */ }
      }
      // Keep every answer on screen (and saved); the child can try again, and it retries when the internet returns.
      setSubmitError(true);
    } finally { setBusy(false); }
  };
  submitRef.current = submit;

  const comeBackLater = async () => {
    const next = roundStart((breakRound ?? round) + 1, rd.size);
    const draft: Draft = { answers, hintsUsed: Object.keys(hints), index: Math.min(next, total - 1) };
    writeLocal(quiz.attemptId, draft);
    try { await api(`/api/quiz/attempts/${quiz.attemptId}/progress`, { method: "PUT", body: draft }); } catch { /* kept on this device */ }
    navigate(back);
  };

  if (breakRound !== null) {
    return <RoundBreak done={breakRound + 1} rounds={rd.count} onNext={() => { setIndex(roundStart(breakRound + 1, rd.size)); setBreakRound(null); }} onLater={() => void comeBackLater()} />;
  }

  return (
    <Shell>
      <header className="flex flex-col gap-2">
        <p className="font-bold text-muted">
          {kind === "exam" ? "Exam" : "Quiz"}{multi ? ` · round ${round + 1} of ${rd.count} · question ${index - lowest + 1} of ${roundEnd(round, rd.size, total) - lowest + 1}` : ` · question ${index + 1} of ${total}`}
          {quiz.mode === "practice" && " · ⭐ practice"}
        </p>
        <div className="h-3 overflow-hidden rounded-full bg-black/20" role="progressbar" aria-valuemin={0} aria-valuemax={quiz.questions.length} aria-valuenow={answered} aria-label="Questions answered">
          <div className="h-full bg-accent transition-all" style={{ width: `${(answered / quiz.questions.length) * 100}%` }} />
        </div>
      </header>

      <section className="card flex flex-col gap-4 p-6">
        <ListenButton text={questionToSpeech(q as ViewQuestion)} />
        <QuestionView q={q} value={answers[q.id]} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
        <div className="flex flex-col gap-2">
          {!hints[q.id] && <button type="button" className="btn self-start" onClick={() => void getHint()}>💡 Give me a hint</button>}
          {hints[q.id] && <p role="note" className="text-lg">💡 {hints[q.id]}</p>}
          {kind === "lesson" && id && <StuckButton lessonId={id} questionId={q.id} />}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="btn" disabled={index === lowest} onClick={() => setIndex(index - 1)}>← Back</button>
        {last ? (
          <button type="button" className="btn btn-primary" disabled={busy} onClick={() => void submit()}>{busy ? "Handing in…" : "Hand in 🎉"}</button>
        ) : lastInRound ? (
          <button type="button" className="btn btn-primary" onClick={() => setBreakRound(round)}>Finish round {round + 1} ✓</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setIndex(index + 1)}>Next →</button>
        )}
      </div>
      {submitError && (
        <p role="alert" className="card p-4 text-lg">📶 We couldn't hand in your quiz, but <strong>all your answers are saved</strong>. Check your internet, then press “Hand in” again. It will also try by itself when the internet comes back.</p>
      )}
      {saved === "offline" && !submitError && <p role="status" className="text-muted">No internet right now. Your answers are kept on this device, so keep going.</p>}
      {last && answered < quiz.questions.length && <p role="status" className="text-muted">You have {quiz.questions.length - answered} question(s) with no answer yet. You can go back, or hand in anyway.</p>}
      <p><Link className="text-muted underline" to={back} onClick={(e) => { if (!confirm("Leave the quiz? You can come back and carry on.")) e.preventDefault(); }}>Leave for now</Link></p>
    </Shell>
  );
}

/** A speaker button that reads the question aloud only when pressed (never on its own). Pressing again stops it. */
function ListenButton({ text }: { text: string }) {
  const [on, setOn] = useState(false);
  // A new question, or leaving the quiz, stops the voice.
  useEffect(() => () => { stopSpeech(); setOn(false); }, [text]);
  return (
    <button type="button" className="btn self-start" aria-pressed={on} aria-label={on ? "Stop reading the question" : "Read the question aloud"} onClick={() => { if (on) { stopSpeech(); setOn(false); } else speak(text, setOn, { force: true }); }}>
      {on ? "⏸ Stop" : "🔊 Listen"}
    </button>
  );
}

/** Between rounds: a friendly rest. The stars are for finishing (effort), never for the score. */
function RoundBreak({ done, rounds, onNext, onLater }: { done: number; rounds: number; onNext: () => void; onLater: () => void }) {
  const left = rounds - done;
  return (
    <Shell>
      <section className="card relative flex flex-col items-center gap-4 p-8 text-center" aria-labelledby="round-done">
        <div className="relative flex h-24 items-center justify-center"><RewardBurst count={10} radius={90} /></div>
        <h1 id="round-done" className="font-display text-4xl font-extrabold">Round {done} done! 🎈</h1>
        <p className="flex gap-1.5" role="img" aria-label={`${done} of ${rounds} rounds finished`}>
          {Array.from({ length: rounds }, (_, i) => (
            <svg key={i} width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" fill={i < done ? "#ffd166" : "none"} stroke={i < done ? "#161a40" : "currentColor"} strokeWidth="1.8" strokeLinejoin="round" strokeDasharray={i < done ? undefined : "3 2.4"} style={{ opacity: i < done ? 1 : 0.5 }} /></svg>
          ))}
        </p>
        <p className="text-xl">You kept going. That is what makes brains grow! {left === 1 ? "Just one more round to go." : `${left} more rounds to go.`}</p>
        <div className="h-4 w-full max-w-md overflow-hidden rounded-full bg-black/20" role="progressbar" aria-valuemin={0} aria-valuemax={rounds} aria-valuenow={done} aria-label="Rounds finished">
          <div className="h-full bg-accent transition-all" style={{ width: `${(done / rounds) * 100}%` }} />
        </div>
        <p className="font-bold text-muted">Round {done} of {rounds}</p>
        <div className="flex w-full max-w-md flex-col gap-3">
          <button type="button" className="btn btn-primary !min-h-16 text-2xl" onClick={onNext}>Next round →</button>
          <button type="button" className="btn !min-h-14 text-lg" onClick={onLater}>Come back later</button>
        </div>
      </section>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8">{children}</main>;
}

function Results({ result, quiz, again, kind, lessonId }: { result: Result; quiz: Started; again: () => void; kind: "lesson" | "exam"; lessonId: string }) {
  const [why, setWhy] = useState<Record<string, string>>({});
  const stars = result.percent >= 90 ? 3 : result.percent >= quiz.passPercent ? 2 : result.percent > 0 ? 1 : 0;
  const long = result.review.length >= ROUNDS_FROM;
  const [showRight, setShowRight] = useState(!long);
  // The first time a topic quiz is passed on this device, add a burst of stars.
  const [burst] = useState(() => {
    if (kind !== "lesson" || !result.passed || result.mode !== "graded") return false;
    try { const k = `lms:burst:${lessonId}`; if (localStorage.getItem(k)) return false; localStorage.setItem(k, "1"); return true; } catch { return false; }
  });
  const explain = async (questionId: string) => {
    try {
      const r = await api<{ explanation: string }>("/api/ai/explain", { body: { attemptId: result.attemptId, questionId } });
      setWhy((w) => ({ ...w, [questionId]: r.explanation }));
    } catch {
      setWhy((w) => ({ ...w, [questionId]: "Have a look at the right answer, then try again." }));
    }
  };
  return (
    <Shell>
      <section className="card relative flex flex-col items-center gap-2 p-8 text-center" aria-labelledby="score">
        {burst && <RewardBurst count={16} radius={170} />}
        {result.passed
          ? <QuizCelebration stars={stars} grand={kind === "exam"} />
          : <p className="text-6xl" aria-label={`${stars} out of 3 stars`}>{"⭐".repeat(stars) || "🌱"}</p>}
        <h1 id="score" className="font-display text-4xl font-extrabold">{result.score} out of {result.maxScore} ({Math.round(result.percent)}%)</h1>
        <p className="text-xl">{result.passed ? "Brilliant work! You passed! 🎉" : "Good try! Have a look at what to learn next, then have another go. 💪"}</p>
        {result.mode === "practice" && <p className="text-muted">This was practice, so it is saved separately. Your first try is the one that counts for your score.</p>}
      </section>

      {kind === "lesson" && result.mode === "graded" && <TopicFollowUp lessonId={lessonId} passed={result.passed} percent={result.percent} passPercent={quiz.passPercent} />}

      <h2 className="font-display text-2xl font-bold">Let's look at each question</h2>
      {long && (
        <p className="text-lg">
          {result.review.filter((r) => !r.correct).length === 0 ? "Every answer was right! 🌟" : "The ones to look at again come first."}{" "}
          <button type="button" className="btn !min-h-11" aria-pressed={showRight} onClick={() => setShowRight((v) => !v)}>{showRight ? "Hide the right answers" : `Show the ${result.review.filter((r) => r.correct).length} right answers`}</button>
        </p>
      )}
      <ol className="flex flex-col gap-3">
        {result.review.map((r, i) => ({ r, i })).sort((a, b) => (long ? Number(a.r.correct) - Number(b.r.correct) : 0) || a.i - b.i).filter(({ r }) => showRight || !r.correct).map(({ r, i }) => {
          const q = quiz.questions.find((x) => x.id === r.questionId) as Question;
          return (
            <li key={r.questionId} className="card flex flex-col gap-1 p-4 text-lg">
              <p className="font-bold">{r.correct ? "✅" : "❌"} {i + 1}. {q.prompt}</p>
              <p>Your answer: {words(q, r.response)}</p>
              {!r.correct && <p>Right answer: <strong>{words(q, r.answer)}</strong></p>}
              {r.explanation && <p className="text-muted">{r.explanation}</p>}
              {!r.correct && !why[r.questionId] && <button type="button" className="btn self-start" onClick={() => void explain(r.questionId)}>🤔 Why?</button>}
              {why[r.questionId] && <p role="note">🤔 {why[r.questionId]}</p>}
            </li>
          );
        })}
      </ol>
      <div className="flex flex-wrap gap-3">
        {kind === "lesson" && <button type="button" className="btn btn-primary" onClick={again}>Try again</button>}
        <Link className="btn" to="/">Back home</Link>
      </div>
    </Shell>
  );
}
