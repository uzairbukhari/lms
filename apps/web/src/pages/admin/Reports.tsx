import { useCallback, useEffect, useState } from "react";
import { api } from "../../api";

type Student = { id: string; displayName: string };
type ClassRow = { id: string; name: string };
type Totals = { lessonsStarted: number; lessonsCompleted: number; minutesSpent: number; gradedAttempts: number; practiceAttempts: number; averagePercent: number | null; hintsUsed: number; lastActive: string | null };
type Report = {
  student: { id: string; displayName: string };
  totals: Totals;
  curve: { at: string; percent: number; mode: string; kind: string; title: string }[];
  lessons: { lessonId: string; title: string; subject: string | null; semester: number | null; bestGraded: number | null; bestPractice: number | null; attemptCount: number; attempts: { id: string; attemptNumber: number; mode: string; percent: number; submittedAt: string }[] }[];
  weakestSkills: { skill: string; percent: number; correct: number; total: number }[];
  reportCard: { subject: string; semester: number; lessons: number; lessonAverage: number | null; examBest: number | null }[];
};
type Drill = { attempt: { mode: string; attemptNumber: number }; percent: number; questions: { questionId: string; prompt: string; type: string; options: { options?: Opt[]; items?: Opt[]; left?: Opt[]; right?: Opt[] } | null; correct: boolean; response: unknown; answer: unknown; usedHint: boolean; skill: string | null }[] };
type Opt = { id: string; text: string };
type ClassReport = { students: (Totals & { id: string; displayName: string; weakest: string | null })[]; hardestQuestions: { id: string; prompt: string; lesson: string | null; correct: number; total: number }[] };

const pct = (n: number | null) => (n === null ? "–" : `${Math.round(n)}%`);
const day = (s: string) => s.slice(0, 10);

/** A plain SVG line chart: no chart library needed. Graded attempts are solid dots, practice attempts are hollow. */
function Curve({ points }: { points: Report["curve"] }) {
  if (points.length === 0) return <p className="text-muted">No quiz attempts yet.</p>;
  const w = 600, h = 160, pad = 24;
  const x = (i: number) => pad + (points.length === 1 ? (w - 2 * pad) / 2 : (i * (w - 2 * pad)) / (points.length - 1));
  const y = (p: number) => h - pad - (p / 100) * (h - 2 * pad);
  const label = `Quiz scores over time, ${points.length} attempts, latest ${Math.round(points.at(-1)?.percent ?? 0)} percent`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="w-full">
      {[0, 50, 100].map((g) => (
        <g key={g}><line x1={pad} x2={w - pad} y1={y(g)} y2={y(g)} stroke="currentColor" opacity={0.2} /><text x={2} y={y(g) + 4} fontSize="10" fill="currentColor">{g}</text></g>
      ))}
      <polyline fill="none" stroke="var(--accent)" strokeWidth="3" points={points.map((p, i) => `${x(i)},${y(p.percent)}`).join(" ")} />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.percent)} r="5" stroke="var(--accent)" strokeWidth="3" fill={p.mode === "graded" ? "var(--accent)" : "transparent"}><title>{`${p.title}: ${Math.round(p.percent)}% (${p.mode}, ${day(p.at)})`}</title></circle>
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

export function Reports() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [pick, setPick] = useState("");
  const [practice, setPractice] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [classReport, setClassReport] = useState<ClassReport | null>(null);
  const [drill, setDrill] = useState<Drill | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api<{ students: Student[] }>("/api/admin/students"), api<{ classes: ClassRow[] }>("/api/admin/classes")])
      .then(([s, c]) => { setStudents(s.students); setClasses(c.classes); setPick((cur) => cur || (s.students[0] ? `s:${s.students[0].id}` : "")); })
      .catch((e: Error) => setError(e.message));
  }, []);

  const load = useCallback(async () => {
    if (!pick) return;
    setDrill(null); setError("");
    const flag = practice ? "?includePractice=1" : "";
    try {
      if (pick.startsWith("s:")) { setClassReport(null); setReport(await api<Report>(`/api/admin/reports/students/${pick.slice(2)}${flag}`)); }
      else { setReport(null); setClassReport(await api<ClassReport>(`/api/admin/reports/classes/${pick.slice(2)}${flag}`)); }
    } catch (e) { setError((e as Error).message); }
  }, [pick, practice]);
  useEffect(() => { void load(); }, [load]);

  const open = async (id: string) => setDrill(await api<Drill>(`/api/admin/reports/attempts/${id}`));

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-wrap items-end gap-4 p-4">
        <label className="flex flex-col gap-1">Show
          <select className="input" value={pick} onChange={(e) => setPick(e.target.value)}>
            <optgroup label="Students">{students.map((s) => <option key={s.id} value={`s:${s.id}`}>{s.displayName}</option>)}</optgroup>
            <optgroup label="Classes">{classes.map((c) => <option key={c.id} value={`c:${c.id}`}>{c.name} (whole class)</option>)}</optgroup>
          </select>
        </label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} className="size-5" /> Include practice attempts in the numbers</label>
        {report && <a className="btn" href={`/api/admin/reports/students/${report.student.id}/export.csv`}>Download CSV</a>}
      </div>
      {error && <p role="alert">{error}</p>}

      {classReport && (
        <>
          <section className="card overflow-x-auto p-4">
            <table className="w-full text-left"><caption className="sr-only">Students in this class</caption>
              <thead><tr><th>Student</th><th>Lessons done</th><th>Graded quizzes</th><th>Practice</th><th>Average</th><th>Last active</th><th>Weakest skill</th></tr></thead>
              <tbody>{classReport.students.map((s) => (
                <tr key={s.id} className="border-t border-line"><td className="py-2"><button className="underline" onClick={() => setPick(`s:${s.id}`)}>{s.displayName}</button></td><td>{s.lessonsCompleted}</td><td>{s.gradedAttempts}</td><td>{s.practiceAttempts}</td><td>{pct(s.averagePercent)}</td><td>{s.lastActive ? day(s.lastActive) : "–"}</td><td>{s.weakest ?? "–"}</td></tr>
              ))}</tbody>
            </table>
          </section>
          <section className="card p-4"><h2 className="font-display text-xl font-bold">Questions the class finds hardest</h2>
            {classReport.hardestQuestions.length === 0 ? <p className="text-muted">Not enough attempts yet.</p> : <ul className="mt-2 list-disc pl-6">{classReport.hardestQuestions.map((q) => <li key={q.id}>{q.prompt} <span className="text-muted">({q.lesson}, {q.correct}/{q.total} right)</span></li>)}</ul>}
          </section>
        </>
      )}

      {report && (
        <>
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Summary">
            {[["Lessons done", report.totals.lessonsCompleted], ["Average quiz score", pct(report.totals.averagePercent)], ["Graded / practice", `${report.totals.gradedAttempts} / ${report.totals.practiceAttempts}`], ["Hints used", report.totals.hintsUsed], ["Time learning", `${report.totals.minutesSpent} min`], ["Last active", report.totals.lastActive ? day(report.totals.lastActive) : "–"]].map(([k, v]) => (
              <div key={String(k)} className="card p-3"><p className="text-sm text-muted">{k}</p><p className="font-display text-2xl font-bold">{v}</p></div>
            ))}
          </section>
          <section className="card p-4"><h2 className="font-display text-xl font-bold">Learning curve</h2><p className="text-sm text-muted">Solid dots are graded quizzes{practice ? ", hollow dots are practice" : ""}.</p><Curve points={report.curve} /></section>

          <section className="card overflow-x-auto p-4"><h2 className="font-display text-xl font-bold">Semester report card</h2>
            {report.reportCard.length === 0 ? <p className="text-muted">Nothing to report yet.</p> : (
              <table className="w-full text-left"><thead><tr><th>Semester</th><th>Subject</th><th>Lessons quizzed</th><th>Average of best scores</th><th>Exam (best)</th></tr></thead>
                <tbody>{report.reportCard.map((r) => <tr key={`${r.subject}${r.semester}`} className="border-t border-line"><td className="py-2">{r.semester}</td><td>{r.subject}</td><td>{r.lessons}</td><td>{pct(r.lessonAverage)}</td><td>{pct(r.examBest)}</td></tr>)}</tbody></table>
            )}
          </section>

          <section className="card p-4"><h2 className="font-display text-xl font-bold">Skills to practise</h2>
            {report.weakestSkills.length === 0 ? <p className="text-muted">No skill data yet.</p> : <ul className="mt-2 flex flex-col gap-1">{report.weakestSkills.map((s) => <li key={s.skill}><span className="font-mono">{s.skill}</span> — {pct(s.percent)} <span className="text-muted">({s.correct}/{s.total})</span></li>)}</ul>}
          </section>

          <section className="card overflow-x-auto p-4"><h2 className="font-display text-xl font-bold">Lessons and attempts</h2>
            <table className="w-full text-left"><thead><tr><th>Lesson</th><th>Sem.</th><th>Best graded</th><th>Best practice</th><th>Attempts (click to see answers)</th></tr></thead>
              <tbody>{report.lessons.map((l) => (
                <tr key={l.lessonId} className="border-t border-line align-top"><td className="py-2">{l.title}</td><td>{l.semester ?? "–"}</td><td>{pct(l.bestGraded)}</td><td>{pct(l.bestPractice)}</td>
                  <td className="flex flex-wrap gap-1 py-1">{l.attempts.map((a) => <button key={a.id} className="btn !min-h-8 !px-2 text-sm" onClick={() => void open(a.id)}>#{a.attemptNumber} {a.mode === "practice" ? "(practice) " : ""}{pct(a.percent)}</button>)}</td></tr>
              ))}</tbody></table>
          </section>

          {drill && (
            <section className="card flex flex-col gap-2 p-4" aria-label="Attempt details">
              <h2 className="font-display text-xl font-bold">Attempt #{drill.attempt.attemptNumber} ({drill.attempt.mode}) · {pct(drill.percent)}</h2>
              <ol className="flex flex-col gap-2">{drill.questions.map((q) => (
                <li key={q.questionId}><p className="font-bold">{q.correct ? "✅" : "❌"} {q.prompt}{q.usedHint ? " 💡" : ""}</p>
                  <p className="text-sm">Answered: <strong>{show(q, q.response)}</strong>{!q.correct && <> · Right answer: <strong>{show(q, q.answer)}</strong></>}{q.skill && <span className="text-muted"> · {q.skill}</span>}</p></li>
              ))}</ol>
            </section>
          )}
        </>
      )}
    </div>
  );
}
