import type { Response } from "@lms/schema";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api";
import { QuestionView, type ViewQuestion } from "../components/QuestionView";

type Question = ViewQuestion & { id: string; hasHint: boolean };
type Started = { attemptId: string; attemptNumber: number; mode: "graded" | "practice"; resumed: boolean; passPercent: number; questions: Question[] };
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
  }
}

export function QuizPlayer({ kind }: { kind: "lesson" | "exam" }) {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Started | null>(null);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [answers, setAnswers] = useState<Record<string, Response>>({});
  const [index, setIndex] = useState(0);
  const [hints, setHints] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const began = useRef(Date.now());

  const start = useCallback(async () => {
    setError(null); setResult(null); setAnswers({}); setHints({}); setIndex(0); setQuiz(null);
    try {
      const path = kind === "lesson" ? `/api/lessons/${id}/quiz/start` : `/api/exams/${id}/start`;
      setQuiz(await api<Started>(path, { method: "POST", body: {} }));
      began.current = Date.now();
    } catch (e) {
      setError(e instanceof ApiError ? { code: e.code, message: e.status === 404 ? "That quiz isn't open yet." : e.message } : { code: "error", message: "We couldn't open the quiz." });
    }
  }, [id, kind]);
  useEffect(() => { void start(); }, [start]);

  const back = kind === "lesson" ? `/lesson/${id}` : "/";

  if (error) return <Shell><p role="alert" className="text-xl">{error.message}</p><Link className="btn" to="/">Back home</Link></Shell>;
  if (!quiz) return <Shell><p role="status" className="text-xl">Getting your questions ready…</p></Shell>;

  if (result) return <Results result={result} quiz={quiz} again={() => void start()} kind={kind} />;

  const q = quiz.questions[index] as Question;
  const last = index === quiz.questions.length - 1;
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
    setBusy(true);
    try {
      setResult(await api<Result>(`/api/quiz/attempts/${quiz.attemptId}/submit`, {
        body: { answers, hintsUsed: Object.keys(hints), durationSec: Math.round((Date.now() - began.current) / 1000) },
      }));
    } catch {
      setError({ code: "submit", message: "We couldn't hand in your quiz. Check your internet and try again." });
    } finally { setBusy(false); }
  };

  return (
    <Shell>
      <header className="flex flex-col gap-2">
        <p className="font-bold text-muted">
          {kind === "exam" ? "Exam" : "Quiz"} · question {index + 1} of {quiz.questions.length}
          {quiz.mode === "practice" && " · ⭐ practice"}
        </p>
        <div className="h-3 overflow-hidden rounded-full bg-black/20" role="progressbar" aria-valuemin={0} aria-valuemax={quiz.questions.length} aria-valuenow={answered} aria-label="Questions answered">
          <div className="h-full bg-accent transition-all" style={{ width: `${(answered / quiz.questions.length) * 100}%` }} />
        </div>
      </header>

      <section className="card flex flex-col gap-4 p-6">
        <QuestionView q={q} value={answers[q.id]} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
        <div className="flex flex-col gap-2">
          {!hints[q.id] && <button type="button" className="btn self-start" onClick={() => void getHint()}>💡 Give me a hint</button>}
          {hints[q.id] && <p role="note" className="text-lg">💡 {hints[q.id]}</p>}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="btn" disabled={index === 0} onClick={() => setIndex(index - 1)}>← Back</button>
        {last ? (
          <button type="button" className="btn btn-primary" disabled={busy} onClick={() => void submit()}>{busy ? "Handing in…" : "Hand in 🎉"}</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setIndex(index + 1)}>Next →</button>
        )}
      </div>
      {last && answered < quiz.questions.length && <p role="status" className="text-muted">You have {quiz.questions.length - answered} question(s) with no answer yet. You can go back, or hand in anyway.</p>}
      <p><Link className="text-muted underline" to={back} onClick={(e) => { if (!confirm("Leave the quiz? You can come back and carry on.")) e.preventDefault(); }}>Leave for now</Link></p>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8">{children}</main>;
}

function Results({ result, quiz, again, kind }: { result: Result; quiz: Started; again: () => void; kind: "lesson" | "exam" }) {
  const [why, setWhy] = useState<Record<string, string>>({});
  const stars = result.percent >= 90 ? 3 : result.percent >= quiz.passPercent ? 2 : result.percent > 0 ? 1 : 0;
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
      <section className="card flex flex-col items-center gap-2 p-8 text-center" aria-labelledby="score">
        <p className="text-6xl" aria-label={`${stars} out of 3 stars`}>{"⭐".repeat(stars) || "🌱"}</p>
        <h1 id="score" className="font-display text-4xl font-extrabold">{result.score} out of {result.maxScore} ({Math.round(result.percent)}%)</h1>
        <p className="text-xl">{result.passed ? "Brilliant work! You passed! 🎉" : "Good try! Have a look at what to learn next, then have another go. 💪"}</p>
        {result.mode === "practice" && <p className="text-muted">This was practice, so it is saved separately from this week's quiz.</p>}
      </section>

      <h2 className="font-display text-2xl font-bold">Let's look at each question</h2>
      <ol className="flex flex-col gap-3">
        {result.review.map((r, i) => {
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
