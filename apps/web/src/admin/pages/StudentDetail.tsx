import { useState } from "react";
import { Link, useParams } from "react-router";
import type { StudentCredentials, StudentSummary } from "@lms/schema";
import { api } from "../../api";
import { CredentialsModal } from "../Credentials";
import { AttemptDrawer, Curve, day, subjectName, type Report } from "../reportParts";
import { useCrumb } from "../Shell";
import { Avatar, Badge, Button, Card, EmptyState, ErrorNote, PageHeader, pct, Skeleton, StatTile, Tabs, ago, useFeedback, useLoad } from "../ui";

type Tab = "overview" | "lessons" | "card" | "skills" | "signins";
type Logins = { logins: { id: string; ok: boolean; country: string | null; device: string | null; createdAt: string }[]; failed24h: number };

export function StudentDetail() {
  const { id = "" } = useParams();
  const [practice, setPractice] = useState(false);
  const report = useLoad<Report>(`/api/admin/reports/students/${id}${practice ? "?includePractice=1" : ""}`);
  const students = useLoad<{ students: StudentSummary[] }>("/api/admin/students");
  const logins = useLoad<Logins>(`/api/admin/students/${id}/logins`);
  const { toast } = useFeedback();
  const [tab, setTab] = useState<Tab>("overview");
  const [attempt, setAttempt] = useState("");
  const [creds, setCreds] = useState<StudentCredentials[]>([]);
  const summary = students.data?.students.find((s) => s.id === id);
  const r = report.data;
  useCrumb(r?.student.displayName);

  async function newPassword() {
    try {
      const res = await api<{ credentials: StudentCredentials }>(`/api/admin/students/${id}/reset-password`, { method: "POST" });
      setCreds([res.credentials]);
    } catch (e) { toast(e instanceof Error ? e.message : "Could not reset the password.", true); }
  }

  if (report.error && !r) return <><PageHeader title="Student" /><ErrorNote error={report.error} /><Link to="/admin/students">Back to students</Link></>;
  if (!r) return <div className="a-card"><Skeleton rows={6} /></div>;
  const t = r.totals;
  return (
    <>
      <div className="a-page-head">
        <div className="a-person" style={{ gap: 14 }}>
          <Avatar name={r.student.displayName} large />
          <div>
            <h1>{r.student.displayName}</h1>
            <p className="a-muted" style={{ marginTop: 2 }}>
              {summary && <><code>{summary.username}</code> · <Badge tone={summary.isActive ? "green" : "slate"}>{summary.isActive ? "Active" : "Off"}</Badge> · </>}
              {summary?.classes.length ? summary.classes.map((c, i) => <span key={c.id}>{i > 0 && ", "}<Link to={`/admin/classes/${c.id}`}>{c.name}</Link></span>) : "No class"}
            </p>
          </div>
        </div>
        <div className="a-actions">
          <label className="a-check"><input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} /> Include practice in numbers</label>
          <Link className="a-btn" to={`/admin/students/${id}/report-card`}>Report card</Link>
          <Link className="a-btn" to={`/admin/prompt?student=${id}`}>Next lesson prompt</Link>
          <Button onClick={() => void newPassword()}>New password</Button>
          <a className="a-btn" href={`/api/admin/reports/students/${id}/export.csv`}><span style={{ display: "inline-flex" }}>Export CSV</span></a>
        </div>
      </div>

      <div className="a-grid cols-4">
        <StatTile label="Lessons completed" value={t.lessonsCompleted} hint={`${t.lessonsStarted} started`} />
        <StatTile label="Average quiz score" value={pct(t.averagePercent)} hint={`${t.gradedAttempts} graded · ${t.practiceAttempts} practice`} />
        <StatTile label="Time learning" value={`${t.minutesSpent} min`} hint={`${t.hintsUsed} hints used`} />
        <StatTile label="Last active" value={ago(t.lastActive)} />
      </div>

      <Tabs<Tab> value={tab} onChange={setTab} tabs={[{ id: "overview", label: "Overview" }, { id: "lessons", label: "Lessons and attempts" }, { id: "card", label: "Report card" }, { id: "skills", label: "Skills to practise" }, { id: "signins", label: "Sign-ins" }]} />

      {tab === "overview" && (
        <Card title="Learning curve" actions={<span className="a-faint">Solid = graded{practice ? ", hollow = practice" : ""}</span>}><Curve points={r.curve} /></Card>
      )}

      {tab === "lessons" && (
        <Card flush>
          {r.lessons.length === 0 ? <EmptyState title="No quizzes yet" /> : (
            <div className="a-table-wrap"><table className="a-table">
              <thead><tr><th>Lesson</th><th>Subject</th><th>Sem.</th><th className="num">First try (graded)</th><th className="num">Best retake (practice)</th><th>Attempts</th></tr></thead>
              <tbody>{r.lessons.map((l) => (
                <tr key={l.lessonId}>
                  <td className="a-cell-title">{l.title}</td><td>{subjectName(l.subject)}</td><td>{l.semester ?? "–"}</td>
                  <td className="num">{pct(l.bestGraded)}</td><td className="num">{pct(l.bestPractice)}</td>
                  <td><div className="a-row" style={{ gap: 4 }}>{l.attempts.map((a) => (
                    <Button key={a.id} size="sm" onClick={() => setAttempt(a.id)} title={day(a.submittedAt)}>#{a.attemptNumber}{a.mode === "practice" ? " practice" : ""} · {pct(a.percent)}</Button>
                  ))}</div></td>
                </tr>
              ))}</tbody>
            </table></div>
          )}
        </Card>
      )}

      {tab === "card" && (
        <Card flush>
          {r.reportCard.length === 0 ? <EmptyState title="Nothing to report yet" /> : (
            <div className="a-table-wrap"><table className="a-table">
              <thead><tr><th>Semester</th><th>Subject</th><th className="num">Lessons quizzed</th><th className="num">Average of best scores</th><th className="num">Exam (best)</th></tr></thead>
              <tbody>{r.reportCard.map((c) => (
                <tr key={`${c.subject}${c.semester}`}><td>Semester {c.semester}</td><td>{subjectName(c.subject)}</td><td className="num">{c.lessons}</td><td className="num">{pct(c.lessonAverage)}</td><td className="num">{pct(c.examBest)}</td></tr>
              ))}</tbody>
            </table></div>
          )}
        </Card>
      )}

      {tab === "skills" && (
        <Card flush>
          {r.weakestSkills.length === 0 ? <EmptyState title="No skill data yet" /> : (
            <ul className="a-list">{r.weakestSkills.map((s) => (
              <li key={s.skill}><span><code>{s.skill}</code></span><span className="a-row"><span className="a-muted">{s.correct}/{s.total} right</span><Badge tone={s.percent >= 70 ? "green" : s.percent >= 40 ? "amber" : "red"}>{pct(s.percent)}</Badge></span></li>
            ))}</ul>
          )}
        </Card>
      )}

      {tab === "signins" && (
        <Card flush title="Recent sign-ins" actions={logins.data && logins.data.failed24h > 0 ? <Badge tone="amber">{logins.data.failed24h} wrong in the last day</Badge> : undefined}>
          {!logins.data ? <Skeleton rows={3} /> : logins.data.logins.length === 0 ? <EmptyState title="No sign-ins recorded yet">Each time a password is typed on the sign-in page it is listed here, without the password.</EmptyState> : (
            <div className="a-table-wrap"><table className="a-table">
              <thead><tr><th>When</th><th>Result</th><th>Device</th><th>Country</th></tr></thead>
              <tbody>{logins.data.logins.map((l) => (
                <tr key={l.id}><td>{day(l.createdAt)} <span className="a-faint">{l.createdAt.slice(11, 16)} UTC</span></td><td><Badge tone={l.ok ? "green" : "red"}>{l.ok ? "Signed in" : "Wrong password"}</Badge></td><td>{l.device ?? "–"}</td><td>{l.country ?? "–"}</td></tr>
              ))}</tbody>
            </table></div>
          )}
        </Card>
      )}

      {attempt && <AttemptDrawer attemptId={attempt} onClose={() => setAttempt("")} />}
      {creds.length > 0 && <CredentialsModal creds={creds} onClose={() => setCreds([])} />}
    </>
  );
}
