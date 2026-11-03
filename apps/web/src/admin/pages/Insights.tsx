import { useMemo, useState } from "react";
import { Badge, Card, EmptyState, ErrorNote, PageHeader, Skeleton, SUBJECT_NAMES, SortTh, compare, pct, useLoad, useSort } from "../ui";

type LessonRow = { id: string; title: string; subject: string; children: number };
type Q = {
  id: string; prompt: string; type: string; position: number; skill: string | null; children: number;
  firstTryPercent: number | null; allTryPercent: number | null; avgSeconds: number | null; hintPercent: number | null;
  commonWrong: { answer: string; count: number } | null; flag: "hard" | "unclear" | null;
};
type Insights = { lesson: { title: string }; questions: Q[] };

/** How each quiz question performs, using every child's first try, so confusing or mis-keyed questions stand out. */
export function Insights() {
  const lessons = useLoad<{ lessons: LessonRow[] }>("/api/admin/insights");
  const [picked, setPicked] = useState("");
  const [practice, setPractice] = useState(false);
  const list = lessons.data?.lessons ?? [];
  const lessonId = picked || list.find((l) => l.children > 0)?.id || list[0]?.id || "";
  const detail = useLoad<Insights>(lessonId ? `/api/admin/insights/lessons/${lessonId}${practice ? "?includePractice=1" : ""}` : null);
  const sort = useSort<"pos" | "first" | "time" | "hint">("pos");

  const rows = useMemo(() => {
    const val = (q: Q) => (sort.key === "pos" ? q.position : sort.key === "first" ? q.firstTryPercent : sort.key === "time" ? q.avgSeconds : q.hintPercent);
    return [...(detail.data?.questions ?? [])].sort((a, b) => compare(val(a), val(b)) * sort.dir);
  }, [detail.data, sort.key, sort.dir]);

  return (
    <>
      <PageHeader title="Question insights" description="Which questions the girls find hard, what they pick when they are wrong, and which ones may be badly worded." />
      <ErrorNote error={lessons.error || detail.error} />
      <Card flush>
        <div className="a-toolbar">
          <select className="a-select" aria-label="Lesson" value={lessonId} onChange={(e) => setPicked(e.target.value)}>
            {list.map((l) => <option key={l.id} value={l.id}>{SUBJECT_NAMES[l.subject] ?? l.subject}: {l.title} ({l.children} {l.children === 1 ? "child" : "children"})</option>)}
          </select>
          <label className="a-check"><input type="checkbox" checked={practice} onChange={(e) => setPractice(e.target.checked)} /> Include practice tries</label>
        </div>
        {lessons.loading || detail.loading ? <Skeleton rows={6} /> : !lessonId ? <EmptyState title="No lessons yet" /> : rows.length === 0 ? <EmptyState title="No questions found" /> : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr>
              <SortTh label="#" k="pos" sort={sort} /><th>Question</th><SortTh label="Right first time" k="first" sort={sort} num />
              <th>Most common wrong answer</th><SortTh label="Avg time" k="time" sort={sort} num /><SortTh label="Used hint" k="hint" sort={sort} num /><th>Check</th>
            </tr></thead>
            <tbody>{rows.map((q) => (
              <tr key={q.id}>
                <td>{q.position}</td>
                <td><span className="a-cell-title">{q.prompt}</span><div className="a-cell-sub">{q.type.replace("_", " ")}{q.skill ? ` · ${q.skill}` : ""}</div></td>
                <td className="num">{q.children === 0 ? "–" : <Badge tone={(q.firstTryPercent ?? 0) >= 70 ? "green" : (q.firstTryPercent ?? 0) >= 40 ? "amber" : "red"}>{pct(q.firstTryPercent)}</Badge>}<div className="a-cell-sub">{q.children} {q.children === 1 ? "child" : "children"}</div></td>
                <td>{q.commonWrong ? <>{q.commonWrong.answer} <span className="a-faint">×{q.commonWrong.count}</span></> : "–"}</td>
                <td className="num">{q.avgSeconds === null ? "–" : `${q.avgSeconds}s`}</td>
                <td className="num">{pct(q.hintPercent)}</td>
                <td>{q.flag === "unclear" ? <Badge tone="amber">Same wrong answer: check wording or key</Badge> : q.flag === "hard" ? <Badge tone="red">Hard</Badge> : ""}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
    </>
  );
}
