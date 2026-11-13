import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button, ErrorNote, Skeleton, SUBJECT_NAMES, pct, useLoad } from "../ui";
import { useCrumb } from "../Shell";
import { day, type Report } from "../reportParts";

/** A one-page report for one child, by course, made for printing or saving as PDF. Comments are typed on the page. */
export function ReportCard() {
  const { id = "" } = useParams();
  const report = useLoad<Report>(`/api/admin/reports/students/${id}`);
  const r = report.data;
  useCrumb(r ? `${r.student.displayName} report card` : undefined);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");

  if (report.error && !r) return <ErrorNote error={report.error} />;
  if (!r) return <div className="a-card"><Skeleton rows={6} /></div>;
  const scored = r.byCourse.map((c) => c.lessonAverage).filter((x): x is number => x !== null);
  const average = scored.length ? scored.reduce((a, b) => a + b, 0) / scored.length : null;
  return (
    <div className="a-report-card">
      <div className="a-actions no-print" style={{ marginBottom: 12 }}>
        <Link className="a-btn" to={`/admin/students/${id}`}>Back</Link>
        <Button variant="primary" icon="print" onClick={() => window.print()}>Print or save as PDF</Button>
      </div>
      <article className="a-card" style={{ padding: 28 }}>
        <h1 style={{ marginBottom: 2 }}>{r.student.displayName}: progress report</h1>
        <p className="a-muted">Learning Adventures · printed {day(new Date().toISOString())}</p>
        <div className="a-grid cols-4" style={{ margin: "16px 0" }}>
          <div><div className="a-faint">Lessons finished</div><strong style={{ fontSize: 22 }}>{r.totals.lessonsCompleted}</strong></div>
          <div><div className="a-faint">Average quiz score</div><strong style={{ fontSize: 22 }}>{pct(average)}</strong></div>
          <div><div className="a-faint">Time learning</div><strong style={{ fontSize: 22 }}>{r.totals.minutesSpent} min</strong></div>
          <div><div className="a-faint">Hints used</div><strong style={{ fontSize: 22 }}>{r.totals.hintsUsed}</strong></div>
        </div>
        {r.byCourse.length === 0 && r.classExams.length === 0 ? <p className="a-muted">Nothing recorded yet.</p> : (
          <table className="a-table">
            <thead><tr><th>Course</th><th>Subject</th><th className="num">Lessons quizzed</th><th className="num">Quiz average</th><th className="num">Exam</th></tr></thead>
            <tbody>
              {r.byCourse.map((c) => (
                <tr key={c.courseId}><td className="a-cell-title">{c.title}</td><td>{SUBJECT_NAMES[c.subject ?? ""] ?? c.subject ?? "–"}</td><td className="num">{c.lessonsQuizzed} of {c.lessonsTotal}</td><td className="num">{pct(c.lessonAverage)}</td><td className="num">{pct(c.examBest)}</td></tr>
              ))}
              {r.classExams.map((x) => (
                <tr key={x.title}><td className="a-cell-title">{x.title}</td><td>Class exam</td><td className="num">–</td><td className="num">–</td><td className="num">{pct(x.best)}</td></tr>
              ))}
            </tbody>
          </table>
        )}
        <h2 style={{ marginTop: 20 }}>Teacher's comments</h2>
        {r.byCourse.map((c) => (
          <label className="a-field" key={c.courseId} style={{ marginTop: 10 }}>
            <span className="lab">{c.title}</span>
            <textarea className="a-textarea" rows={2} value={comments[c.courseId] ?? ""} onChange={(e) => setComments((x) => ({ ...x, [c.courseId]: e.target.value }))} placeholder="Type a comment (printed with the report)" />
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
