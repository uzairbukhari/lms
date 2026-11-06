import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { useAuth } from "../auth";
import { Avatar } from "../components/Avatar";
import type { CardSummary } from "../lib/cards";
import type { Rewards, TeaserState } from "../lib/rewards";
import { Loader } from "../components/Loader";
import type { SubjectPath } from "../lib/topic";

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
  "data-ai": { emoji: "🤖", label: "CS, Data & AI" },
  gk: { emoji: "🌍", label: "General Knowledge" },
  "general-knowledge": { emoji: "🌍", label: "General Knowledge" },
  english: { emoji: "📖", label: "English" },
};
const look = (id: string) => SUBJECT_LOOK[id] ?? { emoji: "📘", label: id };

export const TINT: Record<string, string> = {
  maths: "var(--tint-maths)", science: "var(--tint-science)", "data-ai": "var(--tint-data-ai)",
  gk: "var(--tint-gk)", "general-knowledge": "var(--tint-gk)", english: "var(--tint-english)",
};

/** Simple line icon per subject (decorative). Unknown subjects get a book. */
export function SubjectIcon({ subject, size }: { subject: string; size: number }) {
  const paths: Record<string, ReactNode> = {
    maths: <path d="M7 3.5v6M4 6.5h6M14 6.5h6M4.5 14.5l5 5M9.5 14.5l-5 5M14 15.5h6M14 19h6" />,
    science: <path d="M9 3h6M10 3v6l-5.6 9.6A1.6 1.6 0 0 0 5.8 21h12.4a1.6 1.6 0 0 0 1.4-2.4L14 9V3M7.2 15h9.6" />,
    "data-ai": <><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 4v4M9.5 13h.01M14.5 13h.01M9.5 16.5h5M2.5 12.5v3M21.5 12.5v3" /></>,
    gk: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></>,
    english: <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19zM14 7l3 3M4 20.5h16" />,
    book: <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 0 4 21.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5z" />,
  };
  const key = subject === "general-knowledge" ? "gk" : subject in paths ? subject : "book";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[key]}</svg>
  );
}

function Tick({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  );
}

/** The subject is already shown above the title, so drop it from the front of the title ("Maths Check-In: Where Am I?" becomes "Check-In: Where Am I?"). */
export function shortTitle(title: string): string {
  const t = title.replace(/^(maths|mathematics|science|english|general knowledge|computers?|computing|computer science)(,?\s*(and|&)?\s*data(\s*(and|&)\s*ai)?)?[,:]?\s+/i, "").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : title;
}

/** Long titles get smaller type so a card never grows past the screen. */
function titleTier(t: string): "m" | "l" | "xl" {
  return t.length > 42 ? "xl" : t.length > 28 ? "l" : "m";
}

const weekKey = (semester: number, week: number) => `${semester}-${week}`;
const weekNum = (k: string) => { const [s = 0, w = 0] = k.split("-").map(Number); return s * 100 + w; };

/** One stop on the week's quest trail. Finished lessons go grey and dashed with a DONE! stamp. */
function QuestStop({ c, here, idx }: { c: Card; here: boolean; idx: number }) {
  const s = look(c.subject);
  const done = c.progress?.status === "completed";
  const best = c.quiz?.bestPercent;
  const percent = done ? 100 : c.progress ? Math.min(99, Math.round(((c.progress.lastBlock + 1) / Math.max(1, c.slideCount)) * 100)) : 0;
  const ink = done ? "var(--done-text)" : "var(--text)";
  const soft = done ? "var(--done-text)" : "var(--text-muted)";
  return (
    <article aria-label={`${s.label}: ${c.title}${done ? " (done)" : ""}`} className="flex w-full flex-col gap-6">
      <div className="flex h-[132px] flex-col items-center gap-2">
        <div
          className={"relative flex h-[104px] w-[104px] items-center justify-center rounded-full " + (here ? "m-pulse" : done ? "" : "m-float")}
          style={{
            "--i": idx,
            background: done ? "var(--done-tint)" : (TINT[c.subject] ?? "var(--tint-english)"),
            color: done ? "var(--done-text)" : "var(--on-tint)",
            border: here ? "5px solid var(--accent)" : "var(--border-width) solid var(--surface-border)",
            boxShadow: "var(--shadow)",
          } as CSSProperties}
        >
          <SubjectIcon subject={c.subject} size={52} />
          {done && (
            <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-[3px]" style={{ background: "var(--stamp)", color: "var(--on-stamp)", borderColor: "var(--surface)" }}>
              <Tick size={24} />
            </span>
          )}
        </div>
        {here && <span className="rounded-full bg-accent px-3 text-base font-extrabold text-on-accent">You are here</span>}
      </div>

      <div
        className="relative flex min-h-0 flex-1 flex-col gap-2.5 p-5"
        style={{
          paddingTop: done ? 32 : undefined,
          background: done ? "var(--done-bg)" : "var(--surface)",
          color: ink,
          border: `var(--border-width) ${done ? "dashed" : "solid"} var(--surface-border)`,
          borderRadius: "var(--radius)",
          boxShadow: done ? "none" : "var(--shadow)",
        }}
      >
        <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: soft }}>{s.label}</p>
        <h3 data-len={titleTier(shortTitle(c.title))} className="font-display text-[26px] font-bold leading-tight data-[len=l]:text-[22px] data-[len=xl]:text-[19px]">{shortTitle(c.title)}</h3>
        {c.progress && !done && (
          <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Lesson progress" className="h-3.5 overflow-hidden rounded-full border-2 border-line" style={{ background: "var(--track)" }}>
            <div className="h-full bg-accent transition-all duration-700" style={{ width: `${Math.max(percent, 4)}%` }} />
          </div>
        )}
        <p className="font-extrabold" style={{ color: soft }} aria-live="polite">
          {done
            ? `Lesson done${c.quiz && c.quiz.attempts > 0 && typeof best === "number" ? ` · best quiz ${Math.round(best)}%` : ""}`
            : c.progress ? `Slide ${Math.min(c.progress.lastBlock + 1, c.slideCount)} of ${c.slideCount}` : `About ${c.minutes} minutes`}
        </p>
        <div className="mt-auto flex flex-col gap-2.5 pt-1">
          {done ? (
            <div className="grid grid-cols-2 gap-2">
              <Link className="btn !min-h-12 !text-base !shadow-none" style={{ color: ink, borderColor: soft, background: "transparent" }} to={`/lesson/${c.id}`}>Read again</Link>
              <Link className="btn !min-h-12 !text-base !shadow-none" style={{ color: ink, borderColor: soft, background: "transparent" }} to={`/lesson/${c.id}/quiz`}>{c.quiz?.attempts ? "Quiz again" : "Quiz"}</Link>
            </div>
          ) : (
            <>
              <Link className="btn btn-primary m-shine !min-h-[60px] !text-2xl" to={`/lesson/${c.id}`}>{c.progress ? "Keep going" : "Start"}</Link>
              <Link className="btn !min-h-12" to={`/lesson/${c.id}/quiz`}>{c.quiz?.attempts ? "Quiz again" : "Quiz"}</Link>
            </>
          )}
        </div>
        {done && (
          <span aria-hidden="true" className="m-wobble pointer-events-none absolute -top-5 right-3 rounded-xl border-4 px-3 py-0.5 font-display text-2xl font-extrabold tracking-wider" style={{ color: "var(--stamp)", borderColor: "var(--stamp)", background: "var(--done-bg)" }}>DONE!</span>
        )}
      </div>
    </article>
  );
}

/** One subject on the quest trail: its icon, the topic to do next, parts progress and a Keep going button. Finished subjects go grey with a DONE! stamp. */
function SubjectStop({ p, here, idx }: { p: SubjectPath; here: boolean; idx: number }) {
  const s = look(p.subject);
  const doneN = p.topics.filter((t) => t.status === "done").length;
  const done = doneN === p.topics.length;
  const cur = p.topics.find((t) => t.status === "current" || t.status === "early");
  const ink = done ? "var(--done-text)" : "var(--text)";
  const soft = done ? "var(--done-text)" : "var(--text-muted)";
  const percent = cur && cur.partsTotal ? Math.round((cur.partsDone / cur.partsTotal) * 100) : 0;
  const mapTo = `/path/${p.courseId}/${p.subject}`;
  return (
    <article aria-label={`${s.label}: ${doneN} of ${p.topics.length} topics done`} className={"relative flex w-full flex-col items-stretch gap-2.5 p-5 " + (here ? "m-glow" : "")} style={{ background: done ? "var(--done-bg)" : "var(--surface)", color: ink, border: here ? "3px solid var(--accent)" : `var(--border-width) ${done ? "dashed" : "solid"} var(--surface-border)`, borderRadius: "var(--radius)", boxShadow: done ? "none" : "var(--shadow)", paddingTop: done ? 32 : undefined }}>
      <div className={"relative mx-auto flex h-[96px] w-[96px] flex-none items-center justify-center rounded-full " + (here ? "m-pulse" : "m-float")} style={{ "--i": idx, background: done ? "var(--done-tint)" : (TINT[p.subject] ?? "var(--tint-english)"), color: done ? "var(--done-text)" : "var(--on-tint)", border: "var(--border-width) solid var(--surface-border)" } as CSSProperties}>
        <SubjectIcon subject={p.subject} size={48} />
        {done && <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-[3px]" style={{ background: "var(--stamp)", color: "var(--on-stamp)", borderColor: "var(--surface)" }}><Tick size={22} /></span>}
      </div>
      <p className="text-center text-sm font-extrabold uppercase tracking-wide" style={{ color: soft }}>{s.label}</p>
      <h3 data-len={titleTier(cur ? shortTitle(cur.title) : "All topics done")} className="text-center font-display text-[26px] font-bold leading-tight data-[len=l]:text-[22px] data-[len=xl]:text-[19px]">{cur ? shortTitle(cur.title) : "All topics done"}</h3>
      {cur && (
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Topic progress" className="h-3.5 overflow-hidden rounded-full border-2 border-line" style={{ background: "var(--track)" }}>
          <div className="m-shine h-full bg-accent transition-all duration-700" style={{ width: `${Math.max(percent, 4)}%` }} />
        </div>
      )}
      <p className="text-center font-extrabold" style={{ color: soft }}>{cur ? `${cur.partsDone} of ${cur.partsTotal} parts · ` : ""}{doneN} of {p.topics.length} topics done</p>
      <div className="mt-auto flex flex-col gap-2.5 pt-1">
        {done ? (
          <Link className="btn !min-h-12 !text-base !shadow-none" style={{ color: ink, borderColor: soft, background: "transparent" }} to={mapTo}>Open map</Link>
        ) : (
          <>
            <Link className="btn btn-primary m-shine !min-h-[60px] !whitespace-nowrap !text-xl" to={cur ? `/topic/${cur.lessonId}` : mapTo}>{cur && cur.partsDone > 0 ? "Keep going" : "Start"}</Link>
            <Link className="btn !min-h-12" to={mapTo}>Open map</Link>
          </>
        )}
      </div>
      {done && <span aria-hidden="true" className="pointer-events-none absolute -top-5 right-3 -rotate-6 rounded-xl border-4 px-3 py-0.5 font-display text-2xl font-extrabold tracking-wider" style={{ color: "var(--stamp)", borderColor: "var(--stamp)", background: "var(--done-bg)" }}>DONE!</span>}
    </article>
  );
}

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
  const [points, setPoints] = useState<{ total: number; waiting: number } | null>(null);
  const [rewards, setRewards] = useState<Rewards | null>(null);
  const [teaser, setTeaser] = useState<TeaserState | null>(null);
  const [cards, setCards] = useState<CardSummary | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [calOpen, setCalOpen] = useState(false);
  const [paths, setPaths] = useState<SubjectPath[]>([]);

  useEffect(() => {
    api<Home>("/api/home").then(setHome).catch(() => setFailed(true));
    api<{ points: { total: number; waiting: number } }>("/api/map").then((m) => setPoints(m.points)).catch(() => undefined);
    api<{ exams: Exam[] }>("/api/exams").then((r) => setExams(r.exams)).catch(() => undefined);
    api<Rewards>("/api/rewards").then(setRewards).catch(() => undefined);
    api<TeaserState>("/api/teaser").then(setTeaser).catch(() => undefined);
    api<CardSummary>("/api/cards/summary").then(setCards).catch(() => undefined);
    api<{ paths: SubjectPath[] }>("/api/paths").then((r) => setPaths(r.paths)).catch(() => undefined);
  }, []);

  if (!user) return null;
  const allMine = home ? [...home.thisWeek, ...home.early, ...home.lookBack, ...home.open] : [];
  const lessonsDone = allMine.filter((c) => c.progress?.status === "completed").length;
  const quizzesPassed = allMine.filter((c) => (c.quiz?.bestPercent ?? 0) >= 70).length;

  // Every week the child may open (this week, weeks opened early, and past weeks), one trail per week.
  const SUBJECT_ORDER = ["maths", "english", "science", "general-knowledge", "gk", "data-ai"];
  const byWeek = new Map<string, Card[]>();
  for (const c of [...(home?.thisWeek ?? []), ...(home?.early ?? []), ...(home?.lookBack ?? [])]) {
    if (c.semester === null || c.week === null) continue;
    const k = weekKey(c.semester, c.week);
    byWeek.set(k, [...(byWeek.get(k) ?? []), c]);
  }
  const weekList = [...byWeek.keys()].sort((a, b) => weekNum(a) - weekNum(b));
  const currentKey = home?.now && !home.now.exam ? weekKey(home.now.semester, home.now.week) : null;
  const defaultKey = currentKey && byWeek.has(currentKey) ? currentKey : (weekList[weekList.length - 1] ?? null);
  const shownKey = picked && byWeek.has(picked) ? picked : defaultKey;
  const shownIdx = shownKey ? weekList.indexOf(shownKey) : -1;
  const weekCards = (shownKey ? byWeek.get(shownKey) ?? [] : []).sort((a, b) => SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject));
  const weekDone = weekCards.filter((c) => c.progress?.status === "completed").length;
  const hereId = weekCards.find((c) => c.progress?.status !== "completed")?.id;
  const shownWeek = shownKey ? Number(shownKey.split("-")[1]) : null;
  const weekTag = (k: string) => (k === currentKey ? "This week" : weekNum(k) > (currentKey ? weekNum(currentKey) : Infinity) ? "Early" : "Done");

  // While the lessons load, show only a centred loader (no half-empty header or buttons).
  if (!home && !failed) return <Loader label="Loading your lessons…" fullScreen />;

  return (
    <main className="kh-main mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="kh-header flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="m-float inline-block" style={{ "--i": 0 } as CSSProperties}><Avatar name={user.displayName} avatar={user.avatar} size={72} /></span>
          <div>
            <h1 className="font-display text-4xl font-extrabold">Hi, {user.displayName}!</h1>
            <p className="text-lg text-muted">
              {home?.now ? (home.now.exam ? `Semester ${home.now.semester} · exam week` : `Semester ${home.now.semester} · week ${home.now.week}`) : "Welcome back"}
              {home && ` · ${quizzesPassed} quizzes passed`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {home && (
            <span className="inline-flex items-center gap-2 rounded-full border-[length:var(--border-width)] border-line bg-surface px-4 py-2 text-xl font-extrabold">
              <svg className="m-twinkle" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="var(--star)" stroke="var(--text)" strokeWidth="1.2" strokeLinejoin="round" /></svg>
              {lessonsDone} {lessonsDone === 1 ? "star" : "stars"}
            </span>
          )}
          {weekList.length > 1 && (
            <button type="button" className="btn !min-h-14 !px-4" aria-label="Open the week calendar" aria-haspopup="dialog" onClick={() => setCalOpen(true)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.2h.01M12 17.2h.01" /></svg>
            </button>
          )}
          {rewards && rewards.streak.current > 0 && (
            <Link to="/rewards" className="inline-flex items-center gap-2 rounded-full border-[length:var(--border-width)] border-line bg-surface px-4 py-2 text-xl font-extrabold" aria-label={`${rewards.streak.current} week streak`}>
              <span aria-hidden="true">🔥</span> {rewards.streak.current}
            </Link>
          )}
          <Link to="/map" className="btn btn-primary map-button m-shine relative !min-h-14 !text-xl" aria-label={`Open my map${points ? `, ${points.total} points` : ""}`}>
            <span aria-hidden="true" className="text-2xl">🗺️</span> Map
            {points && <span className="rounded-full bg-surface px-2.5 py-0.5 text-base font-extrabold text-text">🪙 {points.total}</span>}
            {points && points.waiting > 0 && <span aria-hidden="true" className="chest-wiggle absolute -right-3 -top-4 text-3xl">🎁</span>}
          </Link>
          <button type="button" className="btn" onClick={() => void logout()}>Log out</button>
        </div>
      </header>

      {failed && <p role="alert" className="text-xl">We couldn't load your lessons. Please refresh the page.</p>}

      {rewards && rewards.stickers.some((x) => x.isNew) && (
        <Link to="/rewards" className="pop-in card flex items-center justify-center gap-4 p-4 text-center text-lg font-bold" role="status">
          <span aria-hidden="true" className="text-4xl">{rewards.stickers.find((x) => x.isNew)?.emoji}</span>
          You earned a new sticker! Tap to see it.
        </Link>
      )}

      <nav aria-label="More to do" className="kh-nav flex flex-wrap gap-3">
        {cards && cards.daily > 0 && <Link to="/cards/daily" className={"btn !min-h-14 " + (cards.dailyDone ? "" : "btn-primary m-shine")}><span aria-hidden="true">🃏</span> Today's cards ({cards.daily}){cards.dailyDone ? " ✓" : ""}</Link>}
        {cards && cards.boost > 0 && <Link to="/cards/boost" className={"btn !min-h-14 " + (cards.boostDone ? "" : "btn-primary m-shine")}><span aria-hidden="true">🚀</span> Boost round{cards.boostDone ? " ✓" : ""}</Link>}
        {cards && cards.words > 0 && <Link to="/words" className="btn !min-h-14"><span aria-hidden="true">📖</span> My word book ({cards.words})</Link>}
        {home?.now && (home.now.exam || home.now.week >= 12) && <Link to="/revision" className="btn !min-h-14"><span aria-hidden="true">🎓</span> Exam revision</Link>}
        <Link to="/teaser" className={"btn !min-h-14 " + (teaser && !teaser.done ? "btn-primary" : "")}><span aria-hidden="true">🧩</span> Brain teaser{teaser?.done ? " ✓" : ""}</Link>
        <Link to="/growth" className="btn !min-h-14"><span aria-hidden="true">🌱</span> My growth</Link>
        <Link to="/rewards" className="btn !min-h-14"><span aria-hidden="true">🎒</span> Stickers and shop{rewards ? ` · ⭐ ${rewards.points.balance}` : ""}</Link>
      </nav>

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

      {paths.length > 0 && (() => {
        const topicsDone = paths.reduce((n, p) => n + p.topics.filter((t) => t.status === "done").length, 0);
        const topicsAll = paths.reduce((n, p) => n + p.topics.length, 0);
        return (
          <section aria-labelledby="subjects" className="kh-week flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="subjects" className="font-display text-3xl font-extrabold">My quest</h2>
                <p className="text-lg text-muted">Pick up where you left off in every subject. {topicsDone} of {topicsAll} topics done{topicsDone === topicsAll ? ", brilliant!" : "!"}</p>
              </div>
              <div role="img" aria-label={`${topicsDone} of ${topicsAll} topics done`} className="flex gap-2">
                {paths.map((p) => {
                  const d = p.topics.filter((t) => t.status === "done").length;
                  return <span key={`${p.courseId}:${p.subject}`} className="h-3.5 w-12 overflow-hidden rounded-full border-[length:var(--border-width)] border-line" style={{ background: "var(--track)" }}><span className="block h-full bg-accent" style={{ width: `${(d / Math.max(1, p.topics.length)) * 100}%` }} /></span>;
                })}
              </div>
            </div>
            <div className="relative mt-2 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ "--n": paths.length } as CSSProperties}>
              {paths.map((p, i) => <div key={`${p.courseId}:${p.subject}`} className="relative flex"><SubjectStop idx={i} p={p} here={i === paths.findIndex((x) => x.topics.some((t) => t.status === "current" || t.status === "early"))} /></div>)}
            </div>
          </section>
        );
      })()}

      {home && !(paths.length > 0 && weekCards.length === 0) && (
        <section aria-labelledby="week" className="kh-week flex flex-col gap-4">
          {weekCards.length === 0 ? (
            <>
              <h2 id="week" className="font-display text-3xl font-extrabold">This week</h2>
              <p className="card p-5 text-lg">Nothing new this week. Have a rest! 😴</p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 id="week" className="font-display text-3xl font-extrabold">Week {shownWeek} quest</h2>
                  <p className="text-lg text-muted">
                    {shownKey === currentKey ? "Visit every stop on the trail." : weekTag(shownKey!) === "Early" ? "Opened early for you." : "An earlier week: read the lessons again or practise the quizzes."} {weekDone} of {weekCards.length} done{weekDone === weekCards.length ? ", brilliant!" : "!"}
                  </p>
                </div>
                <div role="img" aria-label={`${weekDone} of ${weekCards.length} lessons done`} className="flex gap-2">
                  {weekCards.map((c, i) => (
                    <span key={c.id} className={"h-3.5 w-12 rounded-full border-[length:var(--border-width)] border-line " + (i < weekDone ? "m-shine" : "")} style={{ background: i < weekDone ? "var(--accent)" : "var(--track)" }} />
                  ))}
                </div>
              </div>
              <div className="kh-grid relative mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ "--n": weekCards.length } as CSSProperties}>
                <div aria-hidden="true" className="absolute top-[52px] hidden border-t-[6px] border-dashed lg:block" style={{ borderColor: "var(--trail)", left: `${50 / weekCards.length}%`, right: `${50 / weekCards.length}%` }} />
                {weekCards.map((c, i) => <div key={c.id} className="relative flex"><QuestStop c={c} idx={i} here={c.id === hereId} /></div>)}
              </div>
            </>
          )}
        </section>
      )}

      {home && home.open.length > 0 && (
        <section aria-labelledby="library" className="flex flex-col gap-3">
          <h2 id="library" className="font-display text-2xl font-bold">📚 Lesson library</h2>
          <div className="grid gap-4 sm:grid-cols-2">{home.open.map((c) => <LessonCard key={c.id} c={c} past />)}</div>
        </section>
      )}
      {calOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.55)" }} onClick={() => setCalOpen(false)} onKeyDown={(e) => e.key === "Escape" && setCalOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Choose a week" className="card flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-3xl font-extrabold">My weeks</h2>
              <button type="button" autoFocus className="btn !min-h-12" onClick={() => setCalOpen(false)}>Close</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {weekList.map((k) => {
                const [s, w] = k.split("-");
                const cs = byWeek.get(k) ?? [];
                const d = cs.filter((c) => c.progress?.status === "completed").length;
                const on = k === shownKey;
                return (
                  <button key={k} type="button" aria-current={on ? "true" : undefined} onClick={() => { setPicked(k); setCalOpen(false); }} className={"btn flex-col !items-start !gap-1 !py-3 text-left " + (on ? "btn-primary" : "")}>
                    <span className="font-display text-2xl font-extrabold">{new Set(weekList.map((x) => x.split("-")[0])).size > 1 ? `S${s} · ` : ""}Week {w}</span>
                    <span className="text-sm font-bold opacity-80">{weekTag(k)} · {d} of {cs.length} done</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
