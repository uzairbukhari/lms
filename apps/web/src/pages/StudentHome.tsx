import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { useAuth } from "../auth";
import { Avatar } from "../components/Avatar";
import { Loader } from "../components/Loader";

type Card = {
  id: string; title: string; subject: string; summary: string; minutes: number; semester: number | null; week: number | null; phase: string;
  slideCount: number;
  progress: { status: "started" | "completed"; lastBlock: number } | null;
  quiz: { attempts: number; bestPercent: number | null; latestPercent: number | null } | null;
};
type Home = { thisWeek: Card[]; early: Card[]; open: Card[]; lookBack: Card[]; now: { semester: number; week: number; exam: boolean } | null };
type Exam = { id: string; title: string; questionCount: number; maxAttempts: number | null; attemptsUsed: number; bestPercent: number | null; passed: boolean };

export const SUBJECT_LOOK: Record<string, { emoji: string; label: string }> = {
  maths: { emoji: "🔢", label: "Maths" },
  science: { emoji: "🔬", label: "Science" },
  "data-ai": { emoji: "🤖", label: "Computer Science, Data & AI" },
  gk: { emoji: "🌍", label: "General Knowledge" },
  "general-knowledge": { emoji: "🌍", label: "General Knowledge" },
};
const look = (id: string) => SUBJECT_LOOK[id] ?? { emoji: "📘", label: id };

function LessonCard({ c, past }: { c: Card; past?: boolean }) {
  const s = look(c.subject);
  const done = c.progress?.status === "completed";
  const best = c.quiz?.bestPercent;
  // Same measure as the bar inside the lesson: being on a slide counts as having seen it.
  const percent = done ? 100 : c.progress ? Math.min(99, Math.round(((c.progress.lastBlock + 1) / Math.max(1, c.slideCount)) * 100)) : 0;
  return (
    <article className="card flex flex-col gap-3 p-5" aria-label={`${s.label}: ${c.title}`}>
      <p className="font-bold text-muted"><span aria-hidden="true">{s.emoji} </span>{s.label}{past && c.week ? ` · Semester ${c.semester}, week ${c.week}` : ""}</p>
      <h3 className="font-display text-2xl font-bold">{c.title}</h3>
      {!past && <p className="text-lg">{c.summary}</p>}
      <p className="text-muted" aria-live="polite">
        {done ? "✅ Lesson done" : c.progress ? `📖 ${percent}% done · slide ${Math.min(c.progress.lastBlock + 1, c.slideCount)} of ${c.slideCount}` : `⏱️ About ${c.minutes} minutes`}
        {c.quiz && c.quiz.attempts > 0 && typeof best === "number" ? ` · best quiz ${Math.round(best)}%` : ""}
      </p>
      {c.progress && (
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Lesson progress" className="h-3 overflow-hidden rounded-full border-2 border-line bg-surface">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${Math.max(percent, 4)}%` }} />
        </div>
      )}
      <div className="mt-auto grid grid-cols-2 gap-3 pt-1">
        <Link className={"btn !min-h-14 " + (past || done ? "" : "btn-primary")} to={`/lesson/${c.id}`}>{past ? "Read again" : done ? "Read again" : c.progress ? "Keep going" : "Start"}</Link>
        <Link className={"btn !min-h-14 " + (!past && done && !c.quiz?.attempts ? "btn-primary" : "")} to={`/lesson/${c.id}/quiz`}>{past ? "Practise quiz" : c.quiz?.attempts ? "Quiz again" : "Quiz"}</Link>
      </div>
    </article>
  );
}

export function StudentHome() {
  const { user, logout } = useAuth();
  const [home, setHome] = useState<Home | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    api<Home>("/api/home").then(setHome).catch(() => setFailed(true));
    api<{ exams: Exam[] }>("/api/exams").then((r) => setExams(r.exams)).catch(() => undefined);
  }, []);

  if (!user) return null;
  const allMine = home ? [...home.thisWeek, ...home.early, ...home.lookBack, ...home.open] : [];
  const lessonsDone = allMine.filter((c) => c.progress?.status === "completed").length;
  const quizzesPassed = allMine.filter((c) => (c.quiz?.bestPercent ?? 0) >= 70).length;

  const groups = new Map<string, Card[]>();
  for (const c of home?.lookBack ?? []) {
    const key = `Semester ${c.semester}, week ${c.week}`;
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={user.displayName} avatar={user.avatar} size={72} />
          <div>
            <h1 className="font-display text-4xl font-extrabold">Hi, {user.displayName}!</h1>
            <p className="text-lg text-muted">
              {home?.now ? (home.now.exam ? `Semester ${home.now.semester} · exam week` : `Semester ${home.now.semester} · week ${home.now.week}`) : "Welcome back"}
              {home && ` · ⭐ ${lessonsDone} lessons done · ${quizzesPassed} quizzes passed`}
            </p>
          </div>
        </div>
        <button type="button" className="btn" onClick={() => void logout()}>Log out</button>
      </header>

      {failed && <p role="alert" className="text-xl">We couldn't load your lessons. Please refresh the page.</p>}
      {!home && !failed && <Loader label="Loading your lessons…" />}

      {exams.length > 0 && (
        <section aria-labelledby="exams" className="flex flex-col gap-3">
          <h2 id="exams" className="font-display text-2xl font-bold">📝 Exams</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {exams.map((e) => {
              const left = e.maxAttempts === null ? null : e.maxAttempts - e.attemptsUsed;
              return (
                <article key={e.id} className="card flex flex-col gap-2 p-5">
                  <h3 className="font-display text-2xl font-bold">{e.title}</h3>
                  <p className="text-muted">{e.questionCount} questions{left !== null ? ` · ${left} ${left === 1 ? "try" : "tries"} left` : ""}{e.bestPercent !== null ? ` · best ${Math.round(e.bestPercent)}%` : ""}{e.passed ? " · ✅ passed" : ""}</p>
                  {left === 0 ? <p>You have used all your tries.</p> : <Link className="btn btn-primary self-start" to={`/exam/${e.id}`}>{e.attemptsUsed ? "Try again" : "Start the exam"}</Link>}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {home && (
        <section aria-labelledby="week" className="flex flex-col gap-3">
          <h2 id="week" className="font-display text-2xl font-bold">🚀 This week</h2>
          {home.thisWeek.length + home.early.length === 0 ? (
            <p className="card p-5 text-lg">Nothing new this week. You can look back at old lessons below, or have a rest! 😴</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">{[...home.thisWeek, ...home.early].map((c) => <LessonCard key={c.id} c={c} />)}</div>
          )}
        </section>
      )}

      {home && home.open.length > 0 && (
        <section aria-labelledby="library" className="flex flex-col gap-3">
          <h2 id="library" className="font-display text-2xl font-bold">📚 Lesson library</h2>
          <div className="grid gap-4 sm:grid-cols-2">{home.open.map((c) => <LessonCard key={c.id} c={c} past />)}</div>
        </section>
      )}

      {home && home.lookBack.length > 0 && (
        <section aria-labelledby="look-back" className="flex flex-col gap-3">
          <h2 id="look-back" className="font-display text-2xl font-bold">🔭 Look back</h2>
          <p className="text-muted">Read old lessons again or practise their quizzes any time.</p>
          {[...groups].map(([name, cards]) => (
            <details key={name} className="card p-4">
              <summary className="cursor-pointer text-xl font-bold">{name} · {cards.length} {cards.length === 1 ? "lesson" : "lessons"}</summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">{cards.map((c) => <LessonCard key={c.id} c={c} past />)}</div>
            </details>
          ))}
        </section>
      )}
    </main>
  );
}
