import { Link } from "react-router";
import { AiUsage } from "../AiUsage";
import { Badge, Card, EmptyState, ErrorNote, Icon, LinkButton, PageHeader, Skeleton, StatTile, ago, pct, useLoad } from "../ui";

export type Overview = {
  totals: { activeStudents: number; publishedLessons: number; draftLessons: number; averagePercent30d: number | null; attemptsThisWeek: number };
  classes: { id: string; name: string; studentCount: number; courses: string[]; hasCalendar: boolean; now: { semester: number; week: number; exam: boolean } | null }[];
  recent: { id: string; studentId: string; studentName: string; title: string; percent: number; mode: string; submittedAt: string }[];
  attention: { kind: string; message: string; href: string }[];
  students: { id: string; lastActive: string | null; gradedAttempts: number; averagePercent: number | null }[];
};

export function Dashboard() {
  const { data, error, loading } = useLoad<Overview>("/api/admin/overview");
  return (
    <>
      <PageHeader title="Dashboard" description="What is happening across your classes this week." actions={<LinkButton to="/admin/lessons/import" variant="primary" icon="plus">Import lesson</LinkButton>} />
      <ErrorNote error={error} />
      {loading && !data && <div className="a-card"><Skeleton rows={5} /></div>}
      {data && (
        <>
          <div className="a-grid cols-4">
            <StatTile label="Active students" value={data.totals.activeStudents} />
            <StatTile label="Lessons" value={data.totals.publishedLessons} hint={`${data.totals.draftLessons} draft`} />
            <StatTile label="Average score, 30 days" value={pct(data.totals.averagePercent30d)} hint="Graded quizzes only" />
            <StatTile label="Quizzes this week" value={data.totals.attemptsThisWeek} hint="Graded and practice" />
          </div>

          {data.attention.length > 0 && (
            <Card title={`Needs attention (${data.attention.length})`} flush>
              <ul className="a-list">
                {data.attention.map((a, i) => (
                  <li key={i}>
                    <span className="a-row" style={{ flexWrap: "nowrap" }}><span style={{ color: "var(--a-amber)" }}><Icon name="alert" /></span>{a.message}</span>
                    <Link to={a.href} className="a-btn sm">Fix</Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <div className="a-grid split">
            <Card title="Recent quizzes" flush actions={<Link to="/admin/reports">All reports</Link>}>
              {data.recent.length === 0 ? <EmptyState title="No quizzes taken yet">Scores appear here as soon as a child submits a quiz.</EmptyState> : (
                <div className="a-table-wrap">
                  <table className="a-table">
                    <thead><tr><th>Student</th><th>Quiz</th><th className="num">Score</th><th>When</th></tr></thead>
                    <tbody>
                      {data.recent.map((r) => (
                        <tr key={r.id}>
                          <td><Link to={`/admin/students/${r.studentId}`}>{r.studentName}</Link></td>
                          <td>{r.title} {r.mode === "practice" && <Badge plain>Practice</Badge>}</td>
                          <td className="num"><Badge tone={r.percent >= 70 ? "green" : r.percent >= 40 ? "amber" : "red"}>{pct(r.percent)}</Badge></td>
                          <td className="a-muted">{ago(r.submittedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            <Card title="Classes this week" flush actions={<Link to="/admin/classes">Manage</Link>}>
              {data.classes.length === 0 ? <EmptyState title="No classes yet" action={<LinkButton to="/admin/classes" variant="primary">Create a class</LinkButton>} /> : (
                <ul className="a-list">
                  {data.classes.map((c) => (
                    <li key={c.id}>
                      <div>
                        <Link to={`/admin/classes/${c.id}`} className="a-cell-title">{c.name}</Link>
                        <div className="a-cell-sub">{c.studentCount} student{c.studentCount === 1 ? "" : "s"} · {c.courses.length ? c.courses.join(", ") : "no courses"}</div>
                      </div>
                      {c.now ? <Badge tone={c.now.exam ? "amber" : "blue"}>S{c.now.semester} · {c.now.exam ? "Exam week" : `Week ${c.now.week}`}</Badge> : <Badge>{c.hasCalendar ? "Between terms" : "No calendar"}</Badge>}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <AiUsage />
        </>
      )}
    </>
  );
}
