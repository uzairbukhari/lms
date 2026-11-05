import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../api";
import { Loader } from "../components/Loader";
import type { PathTopic, SubjectPath } from "../lib/topic";
import { SUBJECT_LOOK, SubjectIcon, TINT, shortTitle } from "./StudentHome";

const PER_ROW = 4;

function Lock() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-label="Locked" role="img"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  );
}

function Planet({ t, n, subject, prevTitle }: { t: PathTopic; n: number; subject: string; prevTitle: string | null }) {
  const open = t.status !== "locked";
  const done = t.status === "done";
  const here = t.status === "current" || t.status === "early";
  const body = (
    <>
      <span
        className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full"
        style={{
          background: done ? "var(--done-tint)" : open ? (TINT[subject] ?? "var(--tint-english)") : "var(--done-bg)",
          color: done ? "var(--done-text)" : open ? "var(--on-tint)" : "var(--done-text)",
          border: here ? "5px solid var(--accent)" : "var(--border-width) " + (open ? "solid" : "dashed") + " var(--surface-border)",
          boxShadow: here ? "0 0 0 10px color-mix(in srgb, var(--accent) 22%, transparent)" : "var(--shadow)",
          
        }}
      >
        {open ? <SubjectIcon subject={subject} size={48} /> : <Lock />}
        <span className="absolute -left-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-line bg-surface text-lg font-extrabold text-text">{n}</span>
        {done && (
          <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-[3px]" style={{ background: "var(--stamp)", color: "var(--on-stamp)", borderColor: "var(--surface)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
        )}
      </span>
      <span className="font-display text-lg font-bold leading-tight">{shortTitle(t.title)}</span>
      <span className="text-sm font-bold text-muted">
        {done ? `Done${t.bestPercent !== null ? ` · ${Math.round(t.bestPercent)}%` : ""}` : here ? "You are here" : prevTitle ? `Finish "${shortTitle(prevTitle)}" first` : "Locked"}
      </span>
    </>
  );
  const cls = "flex w-full flex-col items-center gap-2 text-center";
  return open ? <Link to={`/topic/${t.lessonId}`} className={cls} aria-label={`Topic ${n}: ${t.title}${done ? " (done)" : ""}`}>{body}</Link> : <div className={cls} aria-label={`Topic ${n}: ${t.title} (locked)`}>{body}</div>;
}

/** The star map for one subject: planets in order, each opening only when the one before is passed. */
export function SubjectPathPage() {
  const { courseId, subject } = useParams();
  const [path, setPath] = useState<SubjectPath | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    api<{ paths: SubjectPath[] }>("/api/paths").then((r) => setPath(r.paths.find((p) => p.courseId === courseId && p.subject === subject) ?? null)).catch(() => setFailed(true));
  }, [courseId, subject]);
  const look = SUBJECT_LOOK[subject ?? ""] ?? { emoji: "📘", label: subject ?? "" };
  if (failed) return <main className="mx-auto max-w-3xl p-8"><p role="alert" className="text-xl">We couldn't load this subject. Please try again.</p><Link className="btn mt-4" to="/">← Back</Link></main>;
  if (!path) return <Loader label="Opening your map…" fullScreen />;

  const rows: PathTopic[][] = [];
  for (let i = 0; i < path.topics.length; i += PER_ROW) rows.push(path.topics.slice(i, i + PER_ROW));
  const done = path.topics.filter((t) => t.status === "done").length;
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-extrabold uppercase tracking-wide text-muted"><span aria-hidden="true">{look.emoji} </span>{look.label}</p>
          <h1 className="font-display text-4xl font-extrabold">My {look.label} map</h1>
          <p className="text-lg text-muted">{done} of {path.topics.length} topics done. Pass each big quiz to open the next planet.</p>
        </div>
        <Link className="btn !min-h-14" to="/">← Home</Link>
      </header>
      <div className="flex flex-col gap-10 pt-4">
        {rows.map((row, r) => {
          const ordered = r % 2 === 1 ? [...row].reverse() : row;
          return (
            <div key={r} className="relative grid items-start gap-4" style={{ gridTemplateColumns: `repeat(${PER_ROW}, minmax(0, 1fr))` }}>
              <div aria-hidden="true" className="absolute top-[55px] border-t-[6px] border-dashed" style={{ borderColor: "var(--trail)", left: `${(r % 2 === 1 ? PER_ROW - row.length + 0.5 : 0.5) * (100 / PER_ROW)}%`, right: `${(r % 2 === 1 ? 0.5 : PER_ROW - row.length + 0.5) * (100 / PER_ROW)}%` }} />
              {ordered.map((t) => {
                const idx = path.topics.indexOf(t);
                return <div key={t.lessonId} className="relative" style={r % 2 === 1 && ordered.indexOf(t) === 0 && row.length < PER_ROW ? { gridColumnStart: PER_ROW - row.length + 1 } : undefined}><Planet t={t} n={idx + 1} subject={path.subject} prevTitle={idx > 0 ? path.topics[idx - 1]!.title : null} /></div>;
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
