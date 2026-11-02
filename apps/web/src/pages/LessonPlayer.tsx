import { gradeQuestion, type CheckQuestion, type Response } from "@lms/schema";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api";
import { Markdown } from "../components/Markdown";
import { QuestionView } from "../components/QuestionView";

type Block =
  | { type: "heading"; text: string }
  | { type: "text"; markdown: string }
  | { type: "image"; emoji?: string; asset?: string; alt?: string; caption?: string }
  | { type: "callout"; style: "tip" | "fun_fact" | "warning"; markdown: string }
  | { type: "reveal"; prompt: string; answer_markdown: string }
  | { type: "check"; question: CheckQuestion }
  | { type: "steps"; items: string[] }
  | { type: "vocab"; word: string; meaning: string; example?: string }
  | { type: "activity"; title: string; materials?: string[]; instructions: string[] }
  | { type: "summary"; points: string[] }
  | { type: "html_embed"; title: string; html: string };

export type LessonPayload = {
  lesson: { id: string; title: string; subject: string; summary: string; minutes: number; objectives: string[]; semester: number | null; week: number | null; phase: string };
  blocks: Block[];
  quiz: { questionCount: number; passPercent: number };
  progress: { status: string; lastBlock: number } | null;
  readOnly: boolean;
  preview?: boolean;
};

const CALLOUT = {
  tip: { icon: "💡", label: "Tip" },
  fun_fact: { icon: "🤩", label: "Fun fact" },
  warning: { icon: "⚠️", label: "Careful" },
} as const;

export function LessonPlayer({ mode }: { mode: "student" | "preview" }) {
  const { id } = useParams();
  const [data, setData] = useState<LessonPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(Date.now());

  const back = mode === "preview" ? "/admin/lessons" : "/";
  const assetUrl = (name: string) => (mode === "preview" ? `/api/admin/assets/file/${encodeURIComponent(name)}` : `/api/assets/${encodeURIComponent(name)}`);

  useEffect(() => {
    const path = mode === "preview" ? `/api/admin/lessons/${id}/preview` : `/api/lessons/${id}`;
    api<LessonPayload>(path)
      .then(setData)
      .catch((e: unknown) => setError(e instanceof ApiError && e.status === 404 ? "That lesson isn't available yet." : "We couldn't load this lesson. Please try again."));
  }, [id, mode]);

  /** Progress is only saved for real lessons that are open for doing; previews and look-back never change anything. */
  const canSave = mode === "student" && data !== null && !data.readOnly;
  const save = (lastBlock: number, completed = false) => {
    if (!canSave) return;
    const addSeconds = Math.min(1800, Math.round((Date.now() - started.current) / 1000));
    started.current = Date.now();
    void api(`/api/lessons/${id}/progress`, { method: "PUT", body: { lastBlock, completed, addSeconds } }).catch(() => undefined);
  };

  if (error) return <Shell back={back}><p role="alert" className="text-xl">{error}</p></Shell>;
  if (!data) return <Shell back={back}><p role="status" className="text-xl">Loading…</p></Shell>;

  const { lesson } = data;
  return (
    <Shell back={back}>
      {data.preview && <p className="card px-4 py-2 font-bold" role="note">👀 Preview. Nothing here is saved.</p>}
      {data.readOnly && !data.preview && <p className="card px-4 py-2 font-bold" role="note">📖 Looking back: you can read this lesson again. Your progress stays as it was.</p>}
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl font-extrabold">{lesson.title}</h1>
        <p className="text-lg text-muted">{lesson.summary} · about {lesson.minutes} minutes</p>
        <ul className="list-disc pl-6 text-lg">{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      </header>

      {data.blocks.map((b, i) => (
        <BlockView key={i} block={b} assetUrl={assetUrl} onAnswered={() => save(i)} />
      ))}

      <section className="card flex flex-col items-start gap-3 p-6" aria-labelledby="done">
        <h2 id="done" className="font-display text-2xl font-bold">All done reading! 🎉</h2>
        {mode === "preview" ? (
          <p>The quiz has {data.quiz.questionCount} questions. Pass mark is {data.quiz.passPercent}%.</p>
        ) : (
          <>
            <p>Next up: a quiz with {data.quiz.questionCount} questions.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" to={`/lesson/${id}/quiz`} onClick={() => save(data.blocks.length, true)}>Start the quiz</Link>
              <Link className="btn" to="/" onClick={() => save(data.blocks.length, true)}>Back home</Link>
            </div>
          </>
        )}
      </section>
    </Shell>
  );
}

function Shell({ back, children }: { back: string; children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-6 sm:px-8">
      <nav><Link className="btn" to={back}>← Back</Link></nav>
      {children}
    </main>
  );
}

function BlockView({ block: b, assetUrl, onAnswered }: { block: Block; assetUrl: (n: string) => string; onAnswered: () => void }) {
  switch (b.type) {
    case "heading":
      return <h2 className="mt-4 font-display text-3xl font-bold">{b.text}</h2>;
    case "text":
      return <Markdown text={b.markdown} className="text-xl leading-relaxed" />;
    case "image":
      return (
        <figure className="card flex flex-col items-center gap-2 p-4">
          {b.asset ? <img src={assetUrl(b.asset)} alt={b.alt ?? ""} className="max-h-96 rounded-xl" /> : <span className="text-8xl" role="img" aria-label={b.alt ?? b.caption ?? "picture"}>{b.emoji}</span>}
          {b.caption && <figcaption className="text-muted">{b.caption}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className="card flex gap-3 p-4 text-lg" role="note">
          <span aria-hidden="true" className="text-3xl">{CALLOUT[b.style].icon}</span>
          <div><p className="font-bold">{CALLOUT[b.style].label}</p><Markdown text={b.markdown} /></div>
        </aside>
      );
    case "reveal":
      return (
        <details className="card p-4 text-lg">
          <summary className="cursor-pointer font-bold">🤔 {b.prompt}</summary>
          <Markdown text={b.answer_markdown} className="mt-3" />
        </details>
      );
    case "check":
      return <CheckBlock q={b.question} onAnswered={onAnswered} />;
    case "steps":
      return <ol className="card list-decimal space-y-2 p-4 pl-10 text-xl">{b.items.map((s) => <li key={s}>{s}</li>)}</ol>;
    case "vocab":
      return (
        <div className="card p-4 text-lg">
          <p><span className="font-display text-2xl font-bold">📚 {b.word}</span> — {b.meaning}</p>
          {b.example && <p className="text-muted">Example: {b.example}</p>}
        </div>
      );
    case "activity":
      return (
        <section className="card flex flex-col gap-2 p-4 text-lg">
          <h3 className="font-display text-2xl font-bold">🛠️ Try it: {b.title}</h3>
          {b.materials && <p><strong>You need:</strong> {b.materials.join(", ")}</p>}
          <ol className="list-decimal space-y-1 pl-6">{b.instructions.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>
      );
    case "summary":
      return (
        <section className="card p-4 text-xl">
          <h3 className="font-display text-2xl font-bold">⭐ Remember</h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">{b.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </section>
      );
    case "html_embed":
      // Scripts may run, but with no same-origin access: the page cannot read the session or call the API.
      return <iframe title={b.title} sandbox="allow-scripts" srcDoc={b.html} className="h-96 w-full rounded-2xl border-2 border-line bg-white" />;
  }
}

/** "Check your understanding": instant feedback, never scored or recorded. Retry as often as you like. */
function CheckBlock({ q, onAnswered }: { q: CheckQuestion; onAnswered: () => void }) {
  const [value, setValue] = useState<Response>(undefined);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = useState(false);
  return (
    <section className="card flex flex-col gap-4 p-5" aria-label="Check your understanding">
      <p className="font-bold text-muted">✋ Check yourself</p>
      <QuestionView q={q} value={value} onChange={(v) => { setValue(v); setState("idle"); }} />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-primary" onClick={() => { setState(gradeQuestion(q, value).correct ? "correct" : "wrong"); onAnswered(); }}>Check</button>
        {q.hint && state !== "correct" && <button type="button" className="btn" onClick={() => setShowHint(true)}>💡 Hint</button>}
      </div>
      {showHint && q.hint && <p role="note" className="text-lg">💡 {q.hint}</p>}
      <p role="status" aria-live="polite" className="text-xl font-bold">
        {state === "correct" && <>✅ Yes! {q.explanation}</>}
        {state === "wrong" && <>🤔 Not quite. Have another go!</>}
      </p>
    </section>
  );
}
