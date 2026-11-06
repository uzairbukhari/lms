import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api";
import { Loader } from "../components/Loader";
import { pastel, starsFor, tileGlyph, type GrandQuiz, type PathTopic, type SubjectPath } from "../lib/topic";
import { SUBJECT_LOOK, shortTitle } from "./StudentHome";

const colourOf = pastel;

function Lock({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-label="Locked" role="img"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  );
}

function Stars({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of 3 stars`} role="img">
      {[0, 1, 2].map((i) => <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? "#f5b800" : "none"} stroke={i < n ? "#d99a00" : "currentColor"} strokeWidth="1.8" strokeLinejoin="round" style={{ opacity: i < n ? 1 : 0.3 }}><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" /></svg>)}
    </span>
  );
}

const statusWord = (t: PathTopic) => (t.status === "done" ? "DONE" : t.status === "locked" ? "LOCKED" : t.partsDone > 0 ? "KEEP GOING" : "UP NEXT");

/** Where the topics sit on the trail, as % of the map (x, y): 8 topics then the exam star, laid out as in the design. Other counts are spread along the same line. */
const ANCHORS: [number, number][] = [[9.2, 84], [28, 68], [47.7, 71], [64.6, 52.6], [85.8, 53.5], [76, 33], [56, 27], [34, 25], [12.9, 22]];
function spots(n: number): [number, number][] {
  const total = ANCHORS.length;
  return Array.from({ length: n + 1 }, (_, i) => {
    const f = n === 0 ? 0 : (i * (total - 1)) / n;
    const lo = Math.floor(f);
    const hi = Math.min(total - 1, lo + 1);
    const k = f - lo;
    return [ANCHORS[lo]![0] + (ANCHORS[hi]![0] - ANCHORS[lo]![0]) * k, ANCHORS[lo]![1] + (ANCHORS[hi]![1] - ANCHORS[lo]![1]) * k] as [number, number];
  });
}
/** Dense courses (10+ topics): a serpentine of 3 rows, left to right, right to left, left to right. n topics plus the grand quiz = n + 1 points. */
export const DENSE_FROM = 10;
export function serpentine(points: number): [number, number][] {
  const rows = 3;
  const base = Math.floor(points / rows);
  const extra = points % rows;
  const counts = Array.from({ length: rows }, (_, r) => base + (r < extra ? 1 : 0));
  const ys = [14, 44, 74];
  const out: [number, number][] = [];
  counts.forEach((c, r) => {
    const xs = Array.from({ length: c }, (_, i) => (c === 1 ? 50 : 10 + (i * 80) / (c - 1)));
    if (r % 2 === 1) xs.reverse();
    xs.forEach((x) => out.push([x, ys[r]!]));
  });
  return out;
}
export const layout = (n: number): [number, number][] => (n >= DENSE_FROM ? serpentine(n + 1) : spots(n));

/** A smooth curve through the points (Catmull-Rom as cubic beziers) in a 1180 x 820 box. */
function curve(p: [number, number][], from: number, to: number): string {
  const X = (v: number) => (v * 1180) / 100;
  const Y = (v: number) => (v * 820) / 100;
  let d = `M ${X(p[from]![0])} ${Y(p[from]![1])}`;
  for (let i = from; i < to; i++) {
    const p0 = p[Math.max(0, i - 1)]!, p1 = p[i]!, p2 = p[i + 1]!, p3 = p[Math.min(p.length - 1, i + 2)]!;
    d += ` C ${X(p1[0] + (p2[0] - p0[0]) / 6)} ${Y(p1[1] + (p2[1] - p0[1]) / 6)}, ${X(p2[0] - (p3[0] - p1[0]) / 6)} ${Y(p2[1] - (p3[1] - p1[1]) / 6)}, ${X(p2[0])} ${Y(p2[1])}`;
  }
  return d;
}

/** The end of the trail: the grand quiz. A real link once it is ready or passed; a plain locked star while topics remain. Without a grand quiz it is the old exam star. */
function GrandStop({ grand, allDone, x, y, dense }: { grand: GrandQuiz | null; allDone: boolean; x: number; y: number; dense: boolean }) {
  const state = grand ? grand.status : allDone ? "ready" : "locked";
  const lit = state !== "locked";
  const label = grand ? "Grand quiz" : "Semester exam";
  const size = dense ? 84 : 88;
  const stars = grand?.status === "passed" ? starsFor(grand.bestPercent) : 0;
  const body = (
    <>
      <span className="relative flex items-center justify-center rounded-full" style={{ width: size, height: size, background: lit ? "#ffd166" : "#171c4d", border: lit ? "5px solid #fff3c4" : "3px dashed rgba(140,150,230,0.45)", color: lit ? "#161a40" : "var(--done-text)" }}>
        {state === "locked" && grand ? <Lock size={30} /> : (
          <svg className={state === "ready" ? "m-twinkle" : ""} width="34" height="34" viewBox="0 0 24 24" fill={lit ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" /></svg>
        )}
        {state === "passed" && <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: "#161a40", color: "#ffd166" }}>✓</span>}
      </span>
      <span className="max-w-[120px] text-center font-display text-base font-bold leading-tight">{label}</span>
      {grand && <span className="text-sm font-bold" style={{ color: lit ? "#ffd166" : undefined }}>{state === "locked" ? "Locked" : state === "ready" ? "Ready!" : `Passed · ${stars} ${stars === 1 ? "star" : "stars"}`}</span>}
    </>
  );
  const cls = "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1";
  const style = { left: `${x}%`, top: `${y}%`, opacity: lit ? 1 : 0.7 };
  if (grand && lit) return <Link to={`/exam/${grand.quizId}`} className={cls} style={style} aria-label={`Grand quiz: ${state === "passed" ? "passed" : "ready"}, ${grand.questionCount} questions`}>{body}</Link>;
  return <div className={cls} style={style} aria-label={`${label}${lit ? "" : " (locked)"}`}>{body}</div>;
}

/** Trail map: topics as numbered pastel circles on a winding path (solid where you have been, dotted ahead) ending at the semester exam star. */
function Trail({ path }: { path: SubjectPath }) {
  const upIdx = path.topics.findIndex((t) => t.status === "current" || t.status === "early");
  const up = upIdx >= 0 ? path.topics[upIdx]! : null;
  const n = path.topics.length;
  const dense = n >= DENSE_FROM;
  const pts = layout(n);
  const reached = Math.max(0, path.topics.reduce((a, t, i) => (t.status !== "locked" ? i : a), 0));
  const allDone = path.topics.every((t) => t.status === "done");
  const upCard = up && (
        <section className={"card z-10 flex flex-col gap-3 p-5 " + (dense ? "w-full max-w-[420px] self-end" : "absolute bottom-0 right-0 w-[min(380px,calc(100%-3rem))]")} aria-label="Up next">
          <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: "#ffd166" }}>Topic {upIdx + 1} · Up next</p>
          <p className="font-display text-2xl font-bold leading-tight">{shortTitle(up.title)}</p>
          <div className="flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full" style={{ background: "#0e1235" }}><div className="h-full rounded-full" style={{ width: `${up.partsTotal ? (up.partsDone / up.partsTotal) * 100 : 0}%`, background: "#ffd166" }} /></div>
            <span className="text-sm font-bold">{up.partsDone} of {up.partsTotal} parts</span>
          </div>
          <Link to={`/topic/${up.lessonId}`} className="btn btn-primary !min-h-14 text-xl">▶ {up.partsDone > 0 ? "Keep going" : "Start"}</Link>
        </section>
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
    <div className={"relative flex-1 " + (dense ? "min-h-[680px]" : "min-h-[520px]")}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1180 820" preserveAspectRatio="none">
        <path className="m-march" d={curve(pts, 0, n)} fill="none" stroke="var(--trail)" strokeWidth="5" strokeDasharray="2 14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {reached > 0 && <path d={curve(pts, 0, reached)} fill="none" stroke="#ffd166" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />}
      </svg>
      {path.topics.map((t, i) => {
        const [x, y] = pts[i]!;
        const locked = t.status === "locked";
        const here = t.status === "current" || t.status === "early";
        const size = dense ? (here ? 104 : locked ? 72 : 84) : here ? 130 : locked ? 88 : 100;
        const stars = starsFor(t.bestPercent);
        const body = (
          <>
            <span className={"relative flex items-center justify-center rounded-full font-display font-extrabold " + (here ? "m-pulse" : "m-float")} style={{ "--i": i, width: size, height: size, fontSize: dense ? (here ? 44 : 32) : here ? 54 : 40, background: locked ? "#171c4d" : colourOf(i), color: locked ? "var(--done-text)" : "#161a40", border: locked ? "3px dashed rgba(140,150,230,0.45)" : "5px solid #ffd166", } as CSSProperties}>
              {locked ? <Lock size={30} /> : i + 1}
            </span>
            <span className={"text-center font-display font-bold leading-tight " + (dense ? "max-w-[110px] text-sm" : "max-w-[150px] text-base")} style={{ opacity: locked ? 0.6 : 1 }}>{shortTitle(t.title)}</span>
            {t.status === "done" && <span className="text-sm font-bold" style={{ color: "#ffd166" }}>{stars} {stars === 1 ? "star" : "stars"}</span>}
          </>
        );
        const cls = "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1";
        const style = { left: `${x}%`, top: `${y}%`, zIndex: here ? 2 : 1 };
        return locked
          ? <div key={t.lessonId} className={cls} style={style} aria-label={`Topic ${i + 1}: ${t.title} (locked)`}>{body}</div>
          : <Link key={t.lessonId} to={`/topic/${t.lessonId}`} className={cls} style={style} aria-label={`Topic ${i + 1}: ${t.title}${t.status === "done" ? " (done)" : ""}`}>{body}</Link>;
      })}
      <GrandStop grand={path.grand ?? null} allDone={allDone} x={pts[n]![0]} y={pts[n]![1]} dense={dense} />
      {!dense && upCard}
    </div>
    {dense && upCard}
    </div>
  );
}

/** Card view: one tall swipeable card per topic with a big tile, progress and a Keep going button. */
function Cards({ path, emoji }: { path: SubjectPath; emoji: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const first = Math.max(0, path.topics.findIndex((t) => t.status === "current" || t.status === "early"));
  useEffect(() => {
    const el = ref.current;
    el?.children[first]?.scrollIntoView?.({ inline: "center", block: "nearest" });
  }, [first]);
  const onScroll = () => {
    const el = ref.current;
    if (!el?.children[0]) return;
    const w = (el.children[0] as HTMLElement).offsetWidth + 20;
    setAt(Math.round(el.scrollLeft / w));
  };
  const done = path.topics.filter((t) => t.status === "done").length;
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-3">
        <p className="font-display text-xl font-bold">{path.topics.length} topics</p>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-done-bg" role="progressbar" aria-valuemin={0} aria-valuemax={path.topics.length} aria-valuenow={done}><div className="h-full rounded-full" style={{ width: `${(done / path.topics.length) * 100}%`, background: "var(--accent)" }} /></div>
        <p className="text-lg font-bold text-muted">{done} of {path.topics.length}</p>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-2" tabIndex={0} aria-label="Topics. Swipe sideways to see them all.">
        {path.topics.map((t, i) => {
          const locked = t.status === "locked";
          const stars = starsFor(t.bestPercent);
          const glyph = tileGlyph(t.title, emoji);
          return (
            <article key={t.lessonId} className={"card flex min-w-[240px] flex-1 basis-[240px] snap-start flex-col gap-3 p-4 " + (t.status === "current" || t.status === "early" ? "m-glow" : "")} style={{ maxHeight: 620, ...(t.status === "current" || t.status === "early" ? { borderColor: "#ffd166", borderWidth: 3 } : {}) }} aria-label={`Topic ${i + 1}: ${t.title}`}>
              <div className="flex flex-1 items-center justify-center rounded-2xl font-display font-extrabold text-white" style={{ minHeight: 140, maxHeight: 320, background: locked ? "var(--done-bg)" : colourOf(i), color: locked ? "var(--done-text)" : "#161a40", fontSize: glyph.length > 3 ? 54 : 64 }}>
                <span className="m-bob inline-block" style={{ "--i": i } as CSSProperties}>{locked ? <Lock size={56} /> : glyph}</span>
              </div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Topic {i + 1} · {statusWord(t)}</p>
              <h2 className="font-display text-2xl font-bold leading-tight">{shortTitle(t.title)}</h2>
              <div className="flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-done-bg"><div className="h-full rounded-full" style={{ width: `${t.partsTotal ? (t.partsDone / t.partsTotal) * 100 : t.status === "done" ? 100 : 0}%`, background: colourOf(i) }} /></div>
                <span className="text-sm font-bold text-muted">{t.status === "done" ? t.partsTotal : t.partsDone} of {t.partsTotal || "–"}</span>
              </div>
              <Stars n={stars} size={22} />
              {locked ? <span className="btn !min-h-12 opacity-60" aria-disabled="true">🔒 Locked</span> : <Link to={`/topic/${t.lessonId}`} className={"btn btn-primary !min-h-12 text-lg " + (t.status === "done" ? "" : "m-shine")}>{t.status === "done" ? "Revisit" : t.partsDone > 0 ? "Keep going" : "Start"}</Link>}
            </article>
          );
        })}
        {path.grand && (
          <article className={"card flex min-w-[240px] flex-1 basis-[240px] snap-start flex-col gap-3 p-4 " + (path.grand.status === "ready" ? "m-glow" : "")} style={{ maxHeight: 620, ...(path.grand.status === "ready" ? { borderColor: "#ffd166", borderWidth: 3 } : { borderStyle: "dashed" }) }} aria-label="Grand quiz">
            <div className="flex flex-1 items-center justify-center rounded-2xl font-display font-extrabold" style={{ minHeight: 140, maxHeight: 320, background: path.grand.status === "locked" ? "var(--done-bg)" : "#ffd166", color: path.grand.status === "locked" ? "var(--done-text)" : "#161a40", fontSize: 64 }}>
              <span className="m-bob inline-block" aria-hidden="true">{path.grand.status === "locked" ? <Lock size={56} /> : "🏆"}</span>
            </div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Grand quiz · {path.grand.status === "locked" ? "Locked" : path.grand.status === "ready" ? "Ready" : "Passed"}</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Show what you know</h2>
            <p className="text-sm font-bold text-muted">{path.grand.questionCount} questions in rounds.{path.grand.status === "locked" && " Pass every topic first."}</p>
            <Stars n={path.grand.status === "passed" ? starsFor(path.grand.bestPercent) : 0} size={22} />
            {path.grand.status === "locked" ? <span className="btn !min-h-12 opacity-60" aria-disabled="true">🔒 Locked</span> : <Link to={`/exam/${path.grand.quizId}`} className={"btn btn-primary !min-h-12 text-lg " + (path.grand.status === "ready" ? "m-shine" : "")}>{path.grand.status === "passed" ? "Play again" : "Start the grand quiz"}</Link>}
          </article>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-2" aria-hidden="true">{path.topics.map((t, i) => <span key={t.lessonId} className="h-2.5 rounded-full" style={{ width: i === at ? 26 : 10, background: i === at ? "var(--accent)" : "var(--done-bg)" }} />)}</div>
        <p className="text-sm font-bold text-muted">Swipe to see all topics</p>
      </div>
    </div>
  );
}

/** The subject page: a winding trail map (or a swipeable card view) of topics, each opening only when the one before is passed. */
export function SubjectPathPage() {
  const { courseId, subject } = useParams();
  const [path, setPath] = useState<SubjectPath | null>(null);
  const [failed, setFailed] = useState(false);
  const [view, setView] = useState<"trail" | "cards">(() => { try { return localStorage.getItem("lms-path-view") === "cards" ? "cards" : "trail"; } catch { return "trail"; } });
  useEffect(() => {
    api<{ paths: SubjectPath[] }>("/api/paths").then((r) => setPath(r.paths.find((p) => p.courseId === courseId && p.subject === subject) ?? null)).catch(() => setFailed(true));
  }, [courseId, subject]);
  const look = SUBJECT_LOOK[subject ?? ""] ?? { emoji: "📘", label: subject ?? "" };
  if (failed) return <main className="mx-auto max-w-3xl p-8"><p role="alert" className="text-xl">We couldn't load this subject. Please try again.</p><Link className="btn mt-4" to="/">← Back</Link></main>;
  if (!path) return <Loader label="Opening your map…" fullScreen />;

  const done = path.topics.filter((t) => t.status === "done").length;
  const stars = path.topics.reduce((a, t) => a + starsFor(t.bestPercent), 0);
  const pick = (v: "trail" | "cards") => { setView(v); try { localStorage.setItem("lms-path-view", v); } catch { /* private mode */ } };
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Back to home" className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-line bg-surface"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></Link>
          <div>
            <p className="text-base font-bold text-muted">{path.topics.length} topics</p>
            <h1 className="font-display text-4xl font-extrabold leading-none">{look.label}</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-base font-bold">
          <span className="rounded-full border-2 border-line bg-surface px-4 py-2"><span style={{ color: "#ffd166" }}>★</span> {stars} stars</span>
          <span className="rounded-full border-2 border-line bg-surface px-4 py-2">{done} of {path.topics.length} topics done</span>
          <div role="group" aria-label="Choose a view" className="flex overflow-hidden rounded-full border-2 border-line">
            {(["trail", "cards"] as const).map((v) => <button key={v} type="button" aria-pressed={view === v} className="min-h-11 px-4 text-base font-bold" style={view === v ? { background: "var(--accent)", color: "var(--on-accent, #161a40)" } : undefined} onClick={() => pick(v)}>{v === "trail" ? "Map" : "Cards"}</button>)}
          </div>
        </div>
      </header>
      {view === "trail" ? <Trail path={path} /> : <Cards path={path} emoji={look.emoji} />}
    </main>
  );
}
