import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { Button, ErrorNote, Skeleton, SUBJECT_NAMES, pct, useLoad } from "../ui";
import { useCrumb } from "../Shell";
import { day, type Report } from "../reportParts";

const trend = (now: number | null, before: number | null) => {
  if (now === null || before === null) return "";
  const d = Math.round(now - before);
  return d === 0 ? "same as last semester" : d > 0 ? `up ${d} points on last semester` : `down ${-d} points on last semester`;
};

/** A one-page semester report for one child, made for printing or saving as PDF. Comments are typed on the page. */
export function ReportCard() {
  const { id = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const report = useLoad<Report>(`/api/admin/reports/students/${id}`);
  const r = report.data;
  useCrumb(r ? `${r.student.displayName} report card` : undefined);
  const semesters = [...new Set((r?.reportCard ?? []).map((c) => c.semester))].sort();
  const semester = Number(params.get("semester")) || semesters.at(-1) || 1;
  const [comments, setComments] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");

  if (report.error && !r) return <ErrorNote error={report.error} />;
  if (!r) return <div className="a-card"><Skeleton rows={6} /></div>;
  const rows = r.reportCard.filter((c) => c.semester === semester);
  const prev = r.reportCard.filter((c) => c.semester === semester - 1);
  const avg = (list: typeof rows) => {
    const v = list.map((c) => c.lessonAverage).filter((x): x is number => x !== null);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
  };
  return (
    <div className="a-report-card">
      <div className="a-actions no-print" style={{ marginBottom: 12 }}>
        <Link className="a-btn" to={`/admin/students/${id}`}>Back</Link>
        <select className="a-select" style={{ width: "auto" }} aria-label="Semester" value={semester} onChange={(e) => setParams({ semester: e.target.value })}>
          {(semesters.length ? semesters : [1]).map((s) => <option key={s} value={s}>Semester {s}</option>)}
        </select>
        <Button variant="primary" icon="print" onClick={() => window.print()}>Print or save as PDF</Button>
      </div>
      <article className="a-card" style={{ padding: 28 }}>
        <h1 style={{ marginBottom: 2 }}>{r.student.displayName}: Semester {semester} report</h1>
        <p className="a-muted">Learning Adventures · printed {day(new Date().toISOString())}</p>
        <div className="a-grid cols-4" style={{ margin: "16px 0" }}>
          <div><div className="a-faint">Lessons finished</div><strong style={{ fontSize: 22 }}>{r.totals.lessonsCompleted}</strong></div>
          <div><div className="a-faint">Average quiz score</div><strong style={{ fontSize: 22 }}>{pct(avg(rows))}</strong><div className="a-faint">{trend(avg(rows), avg(prev))}</div></div>
          <div><div className="a-faint">Time learning</div><strong style={{ fontSize: 22 }}>{r.totals.minutesSpent} min</strong></div>
          <div><div className="a-faint">Hints used</div><strong style={{ fontSize: 22 }}>{r.totals.hintsUsed}</strong></div>
        </div>
        {rows.length === 0 ? <p className="a-muted">Nothing recorded for this semester yet.</p> : (
          <table className="a-table">
            <thead><tr><th>Subject</th><th className="num">Lessons quizzed</th><th className="num">Quiz average</th><th className="num">Exam</th><th>Compared with last semester</th></tr></thead>
            <tbody>{rows.map((c) => {
              const before = prev.find((p) => p.subject === c.subject);
              return (
                <tr key={c.subject}>
                  <td className="a-cell-title">{SUBJECT_NAMES[c.subject] ?? c.subject}</td><td className="num">{c.lessons}</td><td className="num">{pct(c.lessonAverage)}</td><td className="num">{pct(c.examBest)}</td>
                  <td>{trend(c.lessonAverage, before?.lessonAverage ?? null) || "–"}</td>
                </tr>
              );
            })}</tbody>
          </table>
        )}
        <h2 style={{ marginTop: 20 }}>Teacher's comments</h2>
        {rows.map((c) => (
          <label className="a-field" key={c.subject} style={{ marginTop: 10 }}>
            <span className="lab">{SUBJECT_NAMES[c.subject] ?? c.subject}</span>
            <textarea className="a-textarea" rows={2} value={comments[c.subject] ?? ""} onChange={(e) => setComments((x) => ({ ...x, [c.subject]: e.target.value }))} placeholder="Type a comment (printed with the report)" />
          </label>
        ))}
        <label className="a-field" style={{ marginTop: 10 }}>
          <span className="lab">Overall</span>
          <textarea className="a-textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="A word of encouragement" />
        </label>
      </article>
    </div>
  );
}
