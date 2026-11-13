import { useState } from "react";
import { useNavigate } from "react-router";
import { SUBJECTS } from "@lms/schema";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, LinkButton, Modal, PageHeader, RowMenu, Skeleton, SUBJECT_NAMES, useFeedback, useLoad } from "../ui";

type CourseRow = { id: string; title: string; subject: string | null; ageBand: string | null; status: string; lessonCount: number };

export function Courses() {
  const courses = useLoad<{ courses: CourseRow[] }>("/api/admin/courses?archived=1");
  const { toast, confirm } = useFeedback();
  const [showArchived, setShowArchived] = useState(false);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  async function create() {
    try {
      const r = await api<{ course: { id: string } }>("/api/admin/courses", { method: "POST", body: { title, ...(subject ? { subject } : {}) } });
      nav(`/admin/courses/${r.course.id}`);
    } catch (e) { toast(e instanceof Error ? e.message : "Could not create the course.", true); }
  }
  async function setStatus(c: CourseRow, status: "published" | "archived") {
    if (status === "archived" && !(await confirm({ title: `Archive “${c.title}”?`, message: "Children stop seeing it and it can't be added to classes. Scores are kept and you can restore it any time.", confirmLabel: "Archive", danger: true }))) return;
    try { await api(`/api/admin/courses/${c.id}`, { method: "PATCH", body: { status } }); toast(status === "archived" ? "Course archived." : "Course restored."); await courses.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not change the course.", true); }
  }
  async function remove(c: CourseRow) {
    if (!(await confirm({ title: `Delete “${c.title}”?`, message: "This removes the course for good. The lessons in it are kept. This cannot be undone.", confirmLabel: "Delete course", danger: true }))) return;
    try { await api(`/api/admin/courses/${c.id}`, { method: "DELETE" }); toast("Course deleted."); await courses.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not delete the course.", true); }
  }
  const all = courses.data?.courses ?? [];
  const rows = all.filter((c) => (c.status === "archived") === showArchived);
  return (
    <>
      <PageHeader title="Courses" description="A course is an ordered set of lessons. Add courses to classes from the class page." actions={<div className="a-row"><select className="a-select" aria-label="Show" value={showArchived ? "archived" : "active"} onChange={(e) => setShowArchived(e.target.value === "archived")}><option value="active">Not archived</option><option value="archived">Archived only</option></select><Button variant="primary" icon="plus" onClick={() => setOpen(true)}>New course</Button></div>} />
      <ErrorNote error={courses.error} />
      {courses.loading && !courses.data ? <Skeleton /> : rows.length === 0 ? <EmptyState title={showArchived ? "No archived courses" : "No courses yet"}>{showArchived ? "Archived courses appear here." : "Create one, then drag lessons into it."}</EmptyState> : (
        <div className="a-grid cols-3">
          {rows.map((c) => (
            <Card key={c.id} title={c.title} actions={<div className="a-row"><Badge tone={c.status === "published" ? "green" : "slate"}>{c.status}</Badge><RowMenu label={`Actions for ${c.title}`} items={[c.status === "archived" ? { label: "Restore", onClick: () => void setStatus(c, "published") } : { label: "Archive", onClick: () => void setStatus(c, "archived") }, { label: "Delete…", onClick: () => void remove(c), danger: true }]} /></div>}>
              <p className="a-muted">{c.subject ? SUBJECT_NAMES[c.subject] ?? c.subject : "Mixed subjects"}{c.ageBand ? ` · ages ${c.ageBand}` : ""}</p>
              <p className="a-faint">{c.lessonCount} {c.lessonCount === 1 ? "lesson" : "lessons"}</p>
              <div className="a-row" style={{ marginTop: 12 }}><LinkButton to={`/admin/courses/${c.id}`} size="sm" variant="primary">Open builder</LinkButton></div>
            </Card>
          ))}
        </div>
      )}
      {open && (
        <Modal title="New course" onClose={() => setOpen(false)} footer={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary" disabled={!title.trim()} onClick={() => void create()}>Create</Button></>}>
          <Field label="Name"><input className="a-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Class 1 Maths" autoFocus /></Field>
          <Field label="Subject (optional)">
            <select className="a-select" value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">Mixed subjects</option>{SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}</select>
          </Field>
        </Modal>
      )}
    </>
  );
}
