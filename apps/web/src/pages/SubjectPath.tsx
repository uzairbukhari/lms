import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api";
import { Loader } from "../components/Loader";
import { starsFor, tileGlyph, type PathTopic, type SubjectPath } from "../lib/topic";
import { SUBJECT_LOOK, shortTitle } from "./StudentHome";

const COLOURS = ["#ff7a59", "#f5b800", "#2fb6f0", "#4cc35a", "#a779ff", "#ff5c9a", "#18b7a8", "#ff9a3d"];
const colourOf = (i: number) => COLOURS[i % COLOURS.length]!;

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

/** Trail map: topics as numbered, coloured circles along a winding dotted path, ending in a semester exam star. */
function Trail({ path, emoji }: { path: SubjectPath; emoji: string }) {
  const n = path.topics.length;
  const pts = Array.from({ length: n + 1 }, (_, i) => ({ x: 9 + (82 * i) / Math.max(1, n), y: i % 2 === 0 ? 70 : 28 }));
  const d = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `S ${(pts[i - 1]!.x + p.x) / 2} ${p.y > pts[i - 1]!.y ? p.y + 14 : p.y - 14}, ${p.x} ${p.y}`)).join(" ");
  const allDone = path.topics.every((t) => t.status === "done");
  void emoji;
  return (
    <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-3xl border-2 border-line" style={{ background: "color-mix(in srgb, var(--surface) 70%, var(--accent) 8%)" }}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d={d} fill="none" stroke="var(--trail)" strokeWidth="5" strokeDasharray="1 11" strokeLinecap="round" vectorEffect="non-scaling-stroke" /></svg>
      {path.topics.map((t, i) => {
        const p = pts[i]!;
        const locked = t.status === "locked";
        const big = t.status === "current" || t.status === "early";
        const size = big ? 104 : 76;
        const body = (
          <>
            <span className="relative flex items-center justify-center rounded-full font-display text-3xl font-extrabold text-white" style={{ width: size, height: size, background: locked ? "var(--done-bg)" : colourOf(i), color: locked ? "var(--done-text)" : "#fff", border: "4px solid var(--surface)", boxShadow: big ? `0 0 0 8px color-mix(in srgb, ${colourOf(i)} 30%, transparent), var(--shadow)` : "var(--shadow)", fontSize: big ? 40 : 30 }}>
              {locked ? <Lock /> : i + 1}
            </span>
            <span className="mt-1 max-w-[130px] text-center font-display text-base font-bold leading-tight">{`${i + 1} ${shortTitle(t.title)}`}</span>
            {t.status === "done" && <Stars n={starsFor(t.bestPercent)} />}
          </>
        );
        const cls = "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center";
        const style = { left: `${p.x}%`, top: `${p.y}%` };
        return locked
          ? <div key={t.lessonId} className={cls} style={{ ...style, opacity: 0.8 }} aria-label={`Topic ${i + 1}: ${t.title} (locked)`}>{body}</div>
          : <Link key={t.lessonId} to={`/topic/${t.lessonId}`} className={cls} style={style} aria-label={`Topic ${i + 1}: ${t.title}${t.status === "done" ? " (done)" : ""}`}>{body}</Link>;
      })}
      {(() => {
        const p = pts[n]!;
        return (
          <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: allDone ? 1 : 0.85 }} aria-label={`Semester exam${allDone ? "" : " (locked)"}`}>
            <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-4 text-4xl" style={{ background: allDone ? "#f5b800" : "var(--done-bg)", borderColor: "var(--surface)", boxShadow: "var(--shadow)" }}>{allDone ? "⭐" : <Lock />}</span>
            <span className="mt-1 text-center font-display text-base font-bold leading-tight">Semester exam</span>
          </div>
        );
      })()}
    </div>
  );
}

/** Card view: one tall swipeable card per topic with a big tile, progress and a Keep going button. */
function Cards({ path, emoji, semester }: { path: SubjectPath; emoji: string; semester: number }) {
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
        <p className="font-display text-xl font-bold">Semester {semester} · {path.topics.length} topics</p>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-done-bg" role="progressbar" aria-valuemin={0} aria-valuemax={path.topics.length} aria-valuenow={done}><div className="h-full rounded-full" style={{ width: `${(done / path.topics.length) * 100}%`, background: "var(--accent)" }} /></div>
        <p className="text-lg font-bold text-muted">{done} of {path.topics.length}</p>
      </div>
      <div ref={ref} onScroll={onScroll} className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-150px)] pb-2" tabIndex={0} aria-label="Topics. Swipe sideways to see them all.">
        {path.topics.map((t, i) => {
          const locked = t.status === "locked";
          const stars = starsFor(t.bestPercent);
          const glyph = tileGlyph(t.title, emoji);
          return (
            <article key={t.lessonId} className="card flex w-[300px] shrink-0 snap-center flex-col gap-3 p-4" style={{ maxHeight: 620 }} aria-label={`Topic ${i + 1}: ${t.title}`}>
              <div className="flex flex-1 items-center justify-center rounded-2xl font-display font-extrabold text-white" style={{ minHeight: 140, maxHeight: 320, background: locked ? "var(--done-bg)" : colourOf(i), color: locked ? "var(--done-text)" : "#fff", fontSize: glyph.length > 3 ? 54 : 64 }}>
                {locked ? <Lock size={56} /> : glyph}
              </div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Topic {i + 1} · {statusWord(t)}</p>
              <h2 className="font-display text-2xl font-bold leading-tight">{shortTitle(t.title)}</h2>
              <div className="flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-done-bg"><div className="h-full rounded-full" style={{ width: `${t.partsTotal ? (t.partsDone / t.partsTotal) * 100 : t.status === "done" ? 100 : 0}%`, background: colourOf(i) }} /></div>
                <span className="text-sm font-bold text-muted">{t.status === "done" ? t.partsTotal : t.partsDone} of {t.partsTotal || "–"}</span>
              </div>
              <Stars n={stars} size={22} />
              {locked ? <span className="btn !min-h-12 opacity-60" aria-disabled="true">🔒 Locked</span> : <Link to={`/topic/${t.lessonId}`} className="btn btn-primary !min-h-12 text-lg">{t.status === "done" ? "Revisit" : t.partsDone > 0 ? "Keep going" : "Start"}</Link>}
            </article>
          );
        })}
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
  const upIdx = path.topics.findIndex((t) => t.status === "current" || t.status === "early");
  const up = upIdx >= 0 ? path.topics[upIdx]! : null;
  const pick = (v: "trail" | "cards") => { setView(v); try { localStorage.setItem("lms-path-view", v); } catch { /* private mode */ } };
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Semester 1 {look.label}</h1>
          <div className="mt-1 flex flex-wrap gap-2 text-base font-bold">
            <span className="rounded-full border-2 border-line bg-surface px-3 py-1">⭐ {stars} stars</span>
            <span className="rounded-full border-2 border-line bg-surface px-3 py-1">{done} of {path.topics.length} topics done</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div role="group" aria-label="Choose a view" className="flex overflow-hidden rounded-full border-2 border-line">
            {(["trail", "cards"] as const).map((v) => <button key={v} type="button" aria-pressed={view === v} className="min-h-12 px-4 text-base font-bold" style={view === v ? { background: "var(--accent)", color: "var(--on-accent, #fff)" } : undefined} onClick={() => pick(v)}>{v === "trail" ? "Map" : "Cards"}</button>)}
          </div>
          <Link className="btn !min-h-12" to="/">← Home</Link>
        </div>
      </header>
      {view === "trail" ? <Trail path={path} emoji={look.emoji} /> : <Cards path={path} emoji={look.emoji} semester={1} />}
      {view === "trail" && up && (
        <Link to={`/topic/${up.lessonId}`} className="card flex items-center gap-4 self-end p-4" aria-label={`Up next: ${up.title}`}>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-muted">Topic {upIdx + 1} · Up next</p>
            <p className="font-display text-xl font-bold">{shortTitle(up.title)}</p>
            <p className="text-sm font-bold text-muted">{up.partsDone} of {up.partsTotal} parts</p>
          </div>
          <span className="btn btn-primary !min-h-12">{up.partsDone > 0 ? "Keep going" : "Start"}</span>
        </Link>
      )}
    </main>
  );
}
