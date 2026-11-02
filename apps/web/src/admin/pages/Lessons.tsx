import { useMemo, useState } from "react";
import { SUBJECTS } from "@lms/schema";
import { api } from "../../api";
import {
  Badge, Button, Card, compare, EmptyState, ErrorNote, LinkButton, PageHeader, RowMenu, SearchBox, Skeleton, SortTh, StatusBadge,
  SUBJECT_NAMES, ago, useFeedback, useLoad, useSort,
} from "../ui";

type LessonRow = {
  id: string; slug: string; title: string; subject: string; status: "draft" | "published" | "archived";
  version: number; unit: string | null; ageBand: string; questionCount: number; updatedAt: string | null;
  slots: { courseTitle: string; semester: number | null; week: number | null }[];
};

export function Lessons() {
  const lessons = useLoad<{ lessons: LessonRow[] }>("/api/admin/lessons");
  const { toast } = useFeedback();
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const sort = useSort<"title" | "subject" | "updated">("subject");

  const rows = useMemo(() => {
    const list = (lessons.data?.lessons ?? []).filter((l) =>
      (!q || `${l.title} ${l.unit ?? ""}`.toLowerCase().includes(q.toLowerCase())) && (!subject || l.subject === subject) && (!status || l.status === status));
    const val = (l: LessonRow) => (sort.key === "title" ? l.title : sort.key === "subject" ? `${SUBJECT_NAMES[l.subject] ?? l.subject}${l.title}` : l.updatedAt);
    return list.sort((a, b) => compare(val(a), val(b)) * sort.dir);
  }, [lessons.data, q, subject, status, sort.key, sort.dir]);

  async function setLessonStatus(l: LessonRow, next: LessonRow["status"]) {
    try { await api(`/api/admin/lessons/${l.id}`, { method: "PATCH", body: { status: next } }); toast(`"${l.title}" is now ${next}.`); await lessons.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not update the lesson.", true); }
  }
  async function copySource(l: LessonRow) {
    try {
      const r = await api<{ lesson: { file: unknown } }>(`/api/admin/lessons/${l.id}`);
      await navigator.clipboard.writeText(JSON.stringify(r.lesson.file, null, 2));
      toast("Lesson JSON copied. Paste it to Claude to change it, then import the new version.");
    } catch { toast("Could not copy the lesson.", true); }
  }

  const all = lessons.data?.lessons ?? [];
  return (
    <>
      <PageHeader title="Lessons" description="Everything you have imported from Claude. Publish a lesson to make it available to its classes." actions={<LinkButton to="/admin/lessons/import" variant="primary" icon="plus">Import lesson</LinkButton>} />
      <ErrorNote error={lessons.error} />
      <Card flush>
        <div className="a-toolbar">
          <SearchBox value={q} onChange={setQ} placeholder="Search lessons" />
          <select className="a-select" aria-label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>{SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}
          </select>
          <select className="a-select" aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Any status</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option>
          </select>
          <span className="a-spacer" /><span className="a-faint">{rows.length} of {all.length}</span>
        </div>
        {lessons.loading && !lessons.data ? <Skeleton /> : rows.length === 0 ? (
          <EmptyState title={all.length === 0 ? "No lessons yet" : "No lessons match"} action={all.length === 0 ? <LinkButton to="/admin/lessons/import" variant="primary" icon="plus">Import your first lesson</LinkButton> : undefined}>
            {all.length === 0 ? "Ask Claude to write a lesson in the LMS format, then paste the JSON here." : "Try different filters."}
          </EmptyState>
        ) : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr><SortTh label="Lesson" k="title" sort={sort} /><SortTh label="Subject" k="subject" sort={sort} /><th>Status</th><th className="num">Qs</th><th>Placement</th><SortTh label="Updated" k="updated" sort={sort} /><th /></tr></thead>
            <tbody>{rows.map((l) => (
              <tr key={l.id}>
                <td><div className="a-cell-title">{l.title}</div><div className="a-cell-sub">v{l.version} · ages {l.ageBand}{l.unit ? ` · ${l.unit}` : ""}</div></td>
                <td>{SUBJECT_NAMES[l.subject] ?? l.subject}</td>
                <td><StatusBadge status={l.status} /></td>
                <td className="num">{l.questionCount}</td>
                <td>{l.slots.length === 0 ? <span className="a-faint">Not in a course</span> : l.slots.map((s, i) => <div key={i}>{s.courseTitle} {s.semester ? <Badge tone="blue" plain>S{s.semester} W{s.week}</Badge> : <Badge tone="amber" plain>Not placed</Badge>}</div>)}</td>
                <td className="a-muted">{ago(l.updatedAt)}</td>
                <td className="actions"><div className="a-row" style={{ flexWrap: "nowrap", justifyContent: "flex-end" }}>
                  <LinkButton to={`/admin/lessons/${l.id}/preview`} size="sm" newWindow>Preview</LinkButton>
                  {l.status !== "published" && <Button size="sm" variant="primary" onClick={() => void setLessonStatus(l, "published")}>Publish</Button>}
                  <RowMenu label={`Actions for ${l.title}`} items={[
                    ...(l.status === "published" ? [{ label: "Unpublish", onClick: () => void setLessonStatus(l, "draft") }] : []),
                    ...(l.status !== "archived" ? [{ label: "Archive", onClick: () => void setLessonStatus(l, "archived") }] : [{ label: "Restore as draft", onClick: () => void setLessonStatus(l, "draft") }]),
                    { label: "Copy JSON", onClick: () => void copySource(l) },
                  ]} />
                </div></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
    </>
  );
}
