import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { ClassReport } from "../reportParts";
import { day } from "../reportParts";
import { Card, compare, EmptyState, ErrorNote, PageHeader, pct, Skeleton, SortTh, useLoad, useSort } from "../ui";

type ClassRow = { id: string; name: string };
type Row = ClassReport["students"][number];

export function Reports() {
  const classes = useLoad<{ classes: ClassRow[] }>("/api/admin/classes");
  const [params, setParams] = useSearchParams();
  const [practice, setPractice] = useState(false);
  const list = classes.data?.classes ?? [];
  const classId = params.get("class") ?? list[0]?.id ?? "";
  const report = useLoad<ClassReport>(classId ? `/api/admin/reports/classes/${classId}${practice ? "?includePractice=1" : ""}` : null);
  const sort = useSort<"name" | "lessons" | "graded" | "avg" | "last">("name");

  const rows = useMemo(() => {
    const val = (s: Row) => (sort.key === "name" ? s.displayName : sort.key === "lessons" ? s.lessonsCompleted : sort.key === "graded" ? s.gradedAttempts : sort.key === "avg" ? s.averagePercent : s.lastActive);
    return [...(report.data?.students ?? [])].sort((a, b) => compare(val(a), val(b)) * sort.dir);
  }, [report.data, sort.key, sort.dir]);

  return (
    <>
      <PageHeader title="Reports" description="How each class is doing. Open a student for their full report card, learning curve and every answer." />
      <ErrorNote error={classes.error || report.error} />
      <Card flush>
        <div className="a-toolbar">
          <select className="a-select" aria-label="Class" value={classId} onChange={(e) => setParams({ class: e.target.value })}>
            {list.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="a-check"><input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} /> Include practice attempts in the numbers</label>
        </div>
        {!classId ? <EmptyState title="No classes yet">Create a class and add students to see reports.</EmptyState> : report.loading && !report.data ? <Skeleton /> : rows.length === 0 ? <EmptyState title="No students in this class" /> : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr><SortTh label="Student" k="name" sort={sort} /><SortTh label="Lessons done" k="lessons" sort={sort} num /><SortTh label="Graded quizzes" k="graded" sort={sort} num /><th className="num">Practice</th><SortTh label="Average" k="avg" sort={sort} num /><SortTh label="Last active" k="last" sort={sort} /><th>Weakest skill</th></tr></thead>
            <tbody>{rows.map((s) => (
              <tr key={s.id}>
                <td><Link to={`/admin/students/${s.id}`} className="a-cell-title">{s.displayName}</Link></td>
                <td className="num">{s.lessonsCompleted}</td><td className="num">{s.gradedAttempts}</td><td className="num">{s.practiceAttempts}</td>
                <td className="num">{pct(s.averagePercent)}</td><td className="a-muted">{s.lastActive ? day(s.lastActive) : "–"}</td>
                <td>{s.weakest ? <code>{s.weakest}</code> : "–"}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
      {report.data && (
        <Card title="Questions the class finds hardest" flush>
          {report.data.hardestQuestions.length === 0 ? <EmptyState title="Not enough attempts yet" /> : (
            <ul className="a-list">{report.data.hardestQuestions.map((q) => (
              <li key={q.id}><span>{q.prompt}<div className="a-cell-sub">{q.lesson}</div></span><span className="a-muted">{q.correct}/{q.total} right</span></li>
            ))}</ul>
          )}
        </Card>
      )}
    </>
  );
}
