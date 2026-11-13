import { api } from "../api";
import { useEffect, useState } from "react";
import { Badge, Drawer, pct, SUBJECT_NAMES } from "./ui";

export type Totals = { lessonsStarted: number; lessonsCompleted: number; minutesSpent: number; gradedAttempts: number; practiceAttempts: number; averagePercent: number | null; hintsUsed: number; lastActive: string | null };
export type Report = {
  student: { id: string; displayName: string };
  totals: Totals;
  curve: { at: string; percent: number; mode: string; kind: string; title: string }[];
  lessons: { lessonId: string; title: string; subject: string | null; semester: number | null; courses: string[]; bestGraded: number | null; bestPractice: number | null; attemptCount: number; attempts: { id: string; attemptNumber: number; mode: string; percent: number; submittedAt: string }[] }[];
  weakestSkills: { skill: string; percent: number; correct: number; total: number }[];
  reportCard: { subject: string; semester: number; lessons: number; lessonAverage: number | null; examBest: number | null }[];
  byCourse: { courseId: string; title: string; subject: string | null; lessonsTotal: number; lessonsQuizzed: number; lessonAverage: number | null; examBest: number | null }[];
  classExams: { title: string; best: number; attempts: number }[];
};
type Opt = { id: string; text: string };
type Drill = { attempt: { mode: string; attemptNumber: number }; percent: number; questions: { questionId: string; prompt: string; type: string; options: { options?: Opt[]; items?: Opt[]; left?: Opt[]; right?: Opt[] } | null; correct: boolean; response: unknown; answer: unknown; usedHint: boolean; skill: string | null }[] };
export type ClassReport = { students: (Totals & { id: string; displayName: string; weakest: string | null })[]; hardestQuestions: { id: string; prompt: string; lesson: string | null; correct: number; total: number }[] };

export const day = (s: string) => s.slice(0, 10);
export const subjectName = (s: string | null) => (s ? SUBJECT_NAMES[s] ?? s : "–");

/** A plain SVG line chart: graded attempts are solid dots, practice attempts are hollow. */
export function Curve({ points }: { points: Report["curve"] }) {
  if (points.length === 0) return <p className="a-muted">No quiz attempts yet.</p>;
  const w = 640, h = 180, padL = 30, padR = 12, padT = 12, padB = 12;
  const x = (i: number) => padL + (points.length === 1 ? (w - padL - padR) / 2 : (i * (w - padL - padR)) / (points.length - 1));
  const y = (p: number) => h - padB - (p / 100) * (h - padT - padB);
  const label = `Quiz scores over time, ${points.length} attempts, latest ${Math.round(points.at(-1)?.percent ?? 0)} percent`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="a-chart" style={{ width: "100%", height: "auto" }}>
      {[0, 50, 100].map((g) => (
        <g key={g}><line x1={padL} x2={w - padR} y1={y(g)} y2={y(g)} stroke="var(--a-border)" /><text x={0} y={y(g) + 4}>{g}%</text></g>
      ))}
      <polyline fill="none" stroke="var(--a-accent)" strokeWidth="2" points={points.map((p, i) => `${x(i)},${y(p.percent)}`).join(" ")} />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.percent)} r="4.5" stroke="var(--a-accent)" strokeWidth="2" fill={p.mode === "graded" ? "var(--a-accent)" : "var(--a-surface)"}>
          <title>{`${p.title}: ${Math.round(p.percent)}% (${p.mode}, ${day(p.at)})`}</title>
        </circle>
      ))}
    </svg>
  );
}

/** Shows a stored answer in words (option text instead of ids) wherever the question has choices. */
function show(q: Drill["questions"][number], v: unknown): string {
  if (v === null || v === undefined || v === "") return "(no answer)";
  const all = [...(q.options?.options ?? []), ...(q.options?.items ?? []), ...(q.options?.left ?? []), ...(q.options?.right ?? [])];
  const t = (id: unknown) => all.find((o) => o.id === id)?.text ?? String(id);
  if (Array.isArray(v)) return v.map((x) => (typeof x === "boolean" ? (x ? "True" : "False") : t(x))).join(q.type === "order" ? " → " : ", ");
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if ("value" in o) return String(o.value);
    if ("accepted" in o) return (o.accepted as string[]).join(" / ");
    return Object.entries(o).map(([l, r]) => `${t(l)} = ${t(r)}`).join("; ");
  }
  return String(v);
}

/** Side drawer with every question of one attempt: what was answered, what was right, hints and skills. */
export function AttemptDrawer({ attemptId, onClose }: { attemptId: string; onClose: () => void }) {
  const [drill, setDrill] = useState<Drill | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { api<Drill>(`/api/admin/reports/attempts/${attemptId}`).then(setDrill).catch((e: Error) => setError(e.message)); }, [attemptId]);
  return (
    <Drawer title={drill ? `Attempt #${drill.attempt.attemptNumber} · ${pct(drill.percent)}` : "Attempt"} onClose={onClose}>
      {error && <div className="a-alert red" role="alert">{error}</div>}
      {!drill && !error && <p className="a-muted">Loading…</p>}
      {drill && (
        <>
          <div><Badge tone={drill.attempt.mode === "graded" ? "blue" : "slate"}>{drill.attempt.mode === "graded" ? "Graded" : "Practice"}</Badge></div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {drill.questions.map((q, i) => (
              <li key={q.questionId} className="a-card" style={{ padding: 12 }}>
                <div className="a-row" style={{ justifyContent: "space-between", flexWrap: "nowrap", alignItems: "flex-start" }}>
                  <strong>{i + 1}. {q.prompt}</strong>
                  <Badge tone={q.correct ? "green" : "red"}>{q.correct ? "Right" : "Wrong"}</Badge>
                </div>
                <p className="a-muted" style={{ marginTop: 6 }}>Answered: <strong style={{ color: "var(--a-text)" }}>{show(q, q.response)}</strong></p>
                {!q.correct && <p className="a-muted">Correct answer: <strong style={{ color: "var(--a-text)" }}>{show(q, q.answer)}</strong></p>}
                {(q.usedHint || q.skill) && <p className="a-faint" style={{ marginTop: 4 }}>{q.usedHint && "Used a hint"}{q.usedHint && q.skill && " · "}{q.skill && <code>{q.skill}</code>}</p>}
              </li>
            ))}
          </ol>
        </>
      )}
    </Drawer>
  );
}
