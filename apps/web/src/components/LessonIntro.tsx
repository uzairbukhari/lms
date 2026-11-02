import { SubjectIcon, SUBJECT_LOOK, TINT } from "../pages/StudentHome";
import { sfx } from "../lib/sound";

type Lesson = { title: string; subject: string; summary: string; minutes: number; objectives: string[]; semester: number | null; week: number | null };

function Clock() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}
function Quiz() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01" /></svg>;
}
function Arrow() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

/**
 * The first screen of every lesson. Same visual language as the quest trail on the home screen:
 * a subject-coloured badge, a short "what you will do" list, and one big start button.
 * All colours, borders and fonts come from the active theme.
 */
export function LessonIntro({ lesson, questionCount, resumeAt, onGo }: { lesson: Lesson; questionCount: number; resumeAt: number; onGo: (n: number) => void }) {
  const look = SUBJECT_LOOK[lesson.subject] ?? { emoji: "📘", label: lesson.subject };
  const tint = TINT[lesson.subject] ?? "var(--tint-english)";
  const when = lesson.week ? `Week ${lesson.week}` : null;
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 pb-2 pt-6 text-center">
      <div className="float relative flex h-[clamp(120px,22vw,168px)] w-[clamp(120px,22vw,168px)] items-center justify-center rounded-full"
        style={{ background: tint, color: "var(--on-tint)", border: "6px solid var(--accent)", boxShadow: "var(--shadow)" }} aria-hidden="true">
        <SubjectIcon subject={lesson.subject} size={84} />
      </div>

      <p className="rounded-full px-5 py-1.5 text-lg font-bold" style={{ background: tint, color: "var(--on-tint)" }}>
        {look.label}{when ? ` · ${when}` : ""}
      </p>

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-tight [text-wrap:balance]">{lesson.title}</h1>
        <p className="mx-auto max-w-2xl text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug text-muted">{lesson.summary}</p>
      </div>

      {lesson.objectives.length > 0 && (
        <section className="card w-full p-5 text-left" aria-labelledby="intro-goals">
          <h2 id="intro-goals" className="mb-3 font-display text-xl font-extrabold uppercase tracking-wide text-muted">In this lesson you will</h2>
          <ol className="flex flex-col gap-3">
            {lesson.objectives.map((o, i) => (
              <li key={o} className="pop-in flex items-center gap-4" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-xl font-extrabold" style={{ background: tint, color: "var(--on-tint)" }} aria-hidden="true">{i + 1}</span>
                <span className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug">{o.replace(/^Show\s+/i, "")}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <ul className="flex flex-wrap justify-center gap-3 text-lg font-bold" aria-label="About this lesson">
        <li className="card flex items-center gap-2 px-4 py-2"><Clock /> About {lesson.minutes} minutes</li>
        {questionCount > 0 && <li className="card flex items-center gap-2 px-4 py-2"><Quiz /> {questionCount} quiz question{questionCount === 1 ? "" : "s"} at the end</li>}
      </ul>

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-primary !min-h-[68px] !px-10 text-2xl" onClick={() => { sfx("start"); onGo(1); }}>
          <span className="inline-flex items-center gap-3">Let's go! <Arrow /></span>
        </button>
        {resumeAt > 0 && <button type="button" className="btn !min-h-[68px] !px-6 text-xl" onClick={() => onGo(resumeAt)}>Carry on where I was</button>}
      </div>

      <p className="text-lg text-muted">Tip: press and hold any word to find out what it means.</p>
    </div>
  );
}
