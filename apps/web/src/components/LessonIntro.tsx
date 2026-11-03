import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth";
import { sfx } from "../lib/sound";
import { SubjectIcon, SUBJECT_LOOK, TINT } from "../pages/StudentHome";

type Lesson = { title: string; subject: string; summary: string; minutes: number; objectives: string[]; semester: number | null; week: number | null };

const CHEERS = ["Woo-hoo!", "Let's do this!", "You've got this!", "Awesome!", "Ready!", "Yay!"];
/** Sparkle positions around the badge: [left %, top %, size px, delay s]. */
const SPARKLES: [number, number, number, number][] = [[4, 14, 22, 0], [92, 8, 28, 0.6], [102, 52, 18, 1.2], [-4, 62, 20, 1.8], [14, 96, 16, 0.9], [84, 94, 24, 0.3]];

function Star({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l2.6 7.3 7.9.3-6.2 4.9 2.2 7.5L12 17l-6.5 4.5 2.2-7.5L1.5 9.1l7.9-.3z" /></svg>;
}
function Clock() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}
function Quiz() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01" /></svg>;
}
function Arrow() {
  return <svg className="intro-nudge" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

/**
 * The first screen of every lesson. Same visual language as the quest trail: a subject-coloured badge, a short
 * "what you will do" list and one big start button. It greets the child by name, the badge bobs, glows and can be
 * tapped, the goals wobble when tapped, and "Let's go" launches the badge off the top before the lesson starts.
 * Colours, borders and fonts come from the active theme; all motion stops when "reduce motion" is on.
 */
export function LessonIntro({ lesson, questionCount, resumeAt, onGo }: { lesson: Lesson; questionCount: number; resumeAt: number; onGo: (n: number) => void }) {
  const { user } = useAuth();
  const look = SUBJECT_LOOK[lesson.subject] ?? { emoji: "📘", label: lesson.subject };
  const tint = TINT[lesson.subject] ?? "var(--tint-english)";
  const when = lesson.week ? `Week ${lesson.week}` : null;
  const first = user?.role === "student" ? user.displayName.split(" ")[0] : null;

  const [jump, setJump] = useState(0);
  const [cheer, setCheer] = useState<string | null>(null);
  const [wobble, setWobble] = useState<number | null>(null);
  const [launching, setLaunching] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  function tapBadge() {
    sfx("start");
    setJump((n) => n + 1);
    setCheer(CHEERS[Math.floor(Math.random() * CHEERS.length)] ?? "Yay!");
    later(() => setCheer(null), 1400);
  }
  function start(to: number) {
    if (launching) return;
    sfx("start");
    const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (calm) { onGo(to); return; }
    setLaunching(true);
    later(() => onGo(to), 800);
  }

  return (
    <div className={`mx-auto grid w-full max-w-7xl items-center gap-x-12 gap-y-6 pb-2 pt-4 text-center md:grid-cols-2 ${launching ? "pointer-events-none" : ""}`}>
      <div className="flex min-w-0 flex-col items-center gap-6">
      {first && (
        <p className="pop-in font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold" style={{ color: "var(--accent)" }}>
          Hi {first}! <span className="intro-wave" aria-hidden="true">👋</span> Ready for an adventure?
        </p>
      )}

      <div className="relative">
        {SPARKLES.map(([l, t, s, d], i) => (
          <span key={i} className="intro-twinkle pointer-events-none absolute" style={{ left: `${l}%`, top: `${t}%`, color: "var(--accent)", animationDelay: `${d}s` }} aria-hidden="true"><Star size={s} /></span>
        ))}
        <button type="button" aria-label={`${look.label} badge. Tap me!`} onClick={tapBadge}
          className={`${launching ? "intro-launch" : "intro-bob"} relative block rounded-full`} style={{ cursor: "pointer" }}>
          <span key={jump} className={`intro-glow flex h-[clamp(140px,20vw,220px)] w-[clamp(140px,20vw,220px)] items-center justify-center rounded-full ${jump ? "intro-jump" : ""}`}
            style={{ background: tint, color: "var(--on-tint)", border: "6px solid var(--accent)", boxShadow: "var(--shadow)" }}>
            <SubjectIcon subject={lesson.subject} size={112} />
          </span>
        </button>
        {cheer && <span className="intro-cheer card pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1 font-display text-xl font-extrabold" role="status">{cheer}</span>}
      </div>

      <p className="pop-in rounded-full px-6 py-2 text-[clamp(1.2rem,2vw,1.6rem)] font-bold" style={{ background: tint, color: "var(--on-tint)", animationDelay: "0.1s" }}>
        {look.label}{when ? ` · ${when}` : ""}
      </p>

      <div className="flex flex-col gap-3">
        <h1 className="pop-in font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-tight [text-wrap:balance]" style={{ animationDelay: "0.2s" }}>{lesson.title.split(" ").map((w, i) => <span key={i}>{i > 0 && " "}<span className="whitespace-nowrap">{w}</span></span>)}</h1>
        <p className="pop-in mx-auto max-w-2xl text-[clamp(1.35rem,2.6vw,2.1rem)] leading-snug text-muted" style={{ animationDelay: "0.3s" }}>{lesson.summary}</p>
      </div>

      </div>
      <div className="flex min-w-0 flex-col items-center gap-6">
      {lesson.objectives.length > 0 && (
        <section className="card w-full p-6 text-left" aria-labelledby="intro-goals">
          <h2 id="intro-goals" className="mb-3 flex items-center gap-2 font-display text-[clamp(1.2rem,2vw,1.6rem)] font-extrabold uppercase tracking-wide text-muted">
            <span style={{ color: "var(--accent)" }} aria-hidden="true"><Star size={20} /></span> In this lesson you will
          </h2>
          <ol className="flex flex-col gap-3">
            {lesson.objectives.map((o, i) => (
              <li key={o} className="pop-in" style={{ animationDelay: `${0.45 + i * 0.15}s` }}>
                <button type="button" onClick={() => { sfx("start"); setWobble(i); later(() => setWobble(null), 520); }}
                  className={`flex w-full items-center gap-4 rounded-2xl text-left ${wobble === i ? "intro-wobble" : ""}`} style={{ background: "transparent", color: "inherit", cursor: "pointer" }}>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-2xl font-extrabold" style={{ background: tint, color: "var(--on-tint)" }} aria-hidden="true">{i + 1}</span>
                  <span className="text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug">{o.replace(/^Show\s+/i, "")}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      <ul className="pop-in flex flex-wrap justify-center gap-3 text-[clamp(1.1rem,1.9vw,1.5rem)] font-bold" style={{ animationDelay: "0.9s" }} aria-label="About this lesson">
        <li className="card flex items-center gap-2 px-4 py-2"><Clock /> About {lesson.minutes} minutes</li>
        {questionCount > 0 && <li className="card flex items-center gap-2 px-4 py-2"><Quiz /> {questionCount} quiz question{questionCount === 1 ? "" : "s"} at the end</li>}
      </ul>

      <div className="pop-in flex flex-wrap justify-center gap-3" style={{ animationDelay: "1s" }}>
        <button type="button" className="btn btn-primary intro-glow !min-h-[84px] !px-12 text-3xl" onClick={() => start(1)}>
          <span className="inline-flex items-center gap-3">Let's go! <Arrow /></span>
        </button>
        {resumeAt > 0 && <button type="button" className="btn !min-h-[84px] !px-8 text-2xl" onClick={() => start(resumeAt)}>Carry on where I was</button>}
      </div>

      <p className="text-[clamp(1.05rem,1.8vw,1.35rem)] text-muted">Tip: press and hold any word to find out what it means.</p>
      </div>
    </div>
  );
}
