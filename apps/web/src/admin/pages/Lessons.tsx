import { useMemo, useState } from "react";
import { SUBJECTS } from "@lms/schema";
import { api } from "../../api";
import { LessonOutline } from "../LessonOutline";
import {
  Badge, Button, Card, compare, Drawer, EmptyState, ErrorNote, LinkButton, PageHeader, RowMenu, SearchBox, Skeleton, SortTh, StatusBadge,
  SUBJECT_NAMES, ago, useFeedback, useLoad, useSort,
} from "../ui";

type LessonRow = {
  id: string; slug: string; title: string; subject: string; status: "draft" | "published" | "archived";
  version: number; unit: string | null; ageBand: string; ageMin: number | null; ageMax: number | null; tags: { id: string; kind: string; label: string }[]; questionCount: number; updatedAt: string | null;
  slots: { courseTitle: string; semester: number | null; week: number | null; classIds: string[] }[];
};

export function Lessons() {
  const lessons = useLoad<{ lessons: LessonRow[]; classes: { id: string; name: string }[] }>("/api/admin/lessons");
  const { toast, confirm } = useFeedback();
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [cls, setCls] = useState("");
  const [semester, setSemester] = useState("");
  const [week, setWeek] = useState("");
  const [tag, setTag] = useState("");
  const [age, setAge] = useState("");
  const [tagFor, setTagFor] = useState<LessonRow | null>(null);
  const tagList = useLoad<{ tags: { id: string; kind: string; label: string }[] }>("/api/admin/tags");
  const [outline, setOutline] = useState<LessonRow | null>(null);
  const sort = useSort<"title" | "subject" | "updated">("subject");

  const rows = useMemo(() => {
    const list = (lessons.data?.lessons ?? []).filter((l) =>
      (!q || `${l.title} ${l.unit ?? ""}`.toLowerCase().includes(q.toLowerCase())) && (!subject || l.subject === subject) && (status ? l.status === status : l.status !== "archived") && (!tag || l.tags.some((t) => t.id === tag)) && (!age || (l.ageMin !== null && l.ageMax !== null && Number(age) >= l.ageMin && Number(age) <= l.ageMax)) &&
      (!cls && !semester && !week ? true : l.slots.some((s) => (!cls || s.classIds.includes(cls)) && (!semester || String(s.semester) === semester) && (!week || String(s.week) === week))));
    const val = (l: LessonRow) => (sort.key === "title" ? l.title : sort.key === "subject" ? `${SUBJECT_NAMES[l.subject] ?? l.subject}${l.title}` : l.updatedAt);
    return list.sort((a, b) => compare(val(a), val(b)) * sort.dir);
  }, [lessons.data, q, subject, status, tag, age, cls, semester, week, sort.key, sort.dir]);

  async function setLessonStatus(l: LessonRow, next: LessonRow["status"]) {
    if (next === "archived" && l.slots.length > 0 && !(await confirm({ title: `Archive “${l.title}”?`, message: `It is in ${l.slots.length} course${l.slots.length === 1 ? "" : "s"}. Children will stop seeing it, but their scores are kept and you can restore it any time.`, confirmLabel: "Archive", danger: true }))) return;
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
            <option value="">Not archived</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived only</option>
          </select>
          <select className="a-select" aria-label="Tag" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">Any tag</option>{(tagList.data?.tags ?? []).map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
          <select className="a-select" aria-label="Age" value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Any age</option>{[5, 6, 7, 8, 9, 10, 11].map((n) => <option key={n} value={n}>Age {n}</option>)}
          </select>
          <select className="a-select" aria-label="Class" value={cls} onChange={(e) => setCls(e.target.value)}>
            <option value="">All classes</option>{(lessons.data?.classes ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="a-select" aria-label="Semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Any semester</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>Semester {n}</option>)}
          </select>
          <select className="a-select" aria-label="Week" value={week} onChange={(e) => setWeek(e.target.value)}>
            <option value="">Any week</option>{Array.from({ length: 13 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n === 13 ? "Week 13 (exam)" : `Week ${n}`}</option>)}
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
                <td><div className="a-cell-title">{l.title}</div><div className="a-cell-sub">v{l.version} · ages {l.ageMin !== null ? `${l.ageMin}-${l.ageMax}` : l.ageBand}{l.unit ? ` · ${l.unit}` : ""}</div><div className="a-row" style={{ gap: 4, marginTop: 4 }}>{l.tags.map((t) => <Badge key={t.id} plain>{t.label}</Badge>)}<button type="button" className="a-btn sm ghost" onClick={() => setTagFor(l)}>{l.tags.length ? "Edit tags" : "+ Tags"}</button></div></td>
                <td>{SUBJECT_NAMES[l.subject] ?? l.subject}</td>
                <td><StatusBadge status={l.status} /></td>
                <td className="num">{l.questionCount}</td>
                <td>{l.slots.length === 0 ? <span className="a-faint">Not in a course</span> : l.slots.map((s, i) => <div key={i}>{s.courseTitle} {s.semester ? <Badge tone="blue" plain>S{s.semester} W{s.week}</Badge> : <Badge tone="amber" plain>Not placed</Badge>}</div>)}</td>
                <td className="a-muted">{ago(l.updatedAt)}</td>
                <td className="actions"><div className="a-row" style={{ flexWrap: "nowrap", justifyContent: "flex-end" }}>
                  <LinkButton to={`/admin/lessons/${l.id}/preview`} size="sm" newWindow>Preview</LinkButton>
                  <LinkButton to={`/admin/lessons/${l.id}/edit`} size="sm">Edit</LinkButton>
                  <Button size="sm" onClick={() => setOutline(l)}>Outline</Button>
                  <LinkButton to={`/admin/lessons/${l.id}/videos`} size="sm">Videos</LinkButton>
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
      {tagFor && <TagEditor lesson={tagFor} all={tagList.data?.tags ?? []} onClose={() => setTagFor(null)} onSaved={async () => { setTagFor(null); await Promise.all([lessons.reload(), tagList.reload()]); }} />}
      {outline && <Drawer title={`What “${outline.title}” teaches`} onClose={() => setOutline(null)} footer={<Button onClick={() => setOutline(null)}>Close</Button>}><LessonOutline lessonId={outline.id} /></Drawer>}
    </>
  );
}

function TagEditor({ lesson, all, onClose, onSaved }: { lesson: LessonRow; all: { id: string; kind: string; label: string }[]; onClose: () => void; onSaved: () => void | Promise<void> }) {
  const { toast } = useFeedback();
  const [picked, setPicked] = useState(new Set(lesson.tags.map((t) => t.id)));
  const [fresh, setFresh] = useState("");
  const flip = (id: string) => setPicked((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  async function save() {
    try {
      const ids = [...picked];
      if (fresh.trim()) ids.push((await api<{ id: string }>("/api/admin/tags", { method: "POST", body: { kind: "custom", label: fresh.trim() } })).id);
      await api(`/api/admin/lessons/${lesson.id}/tags`, { method: "PUT", body: { tagIds: ids } });
      toast("Tags saved."); await onSaved();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save tags.", true); }
  }
  return (
    <Drawer title={`Tags for “${lesson.title}”`} onClose={onClose} footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" onClick={() => void save()}>Save tags</Button></>}>
      <div className="a-row" style={{ gap: 6 }}>
        {all.map((t) => <button type="button" key={t.id} className={"a-btn sm " + (picked.has(t.id) ? "primary" : "")} aria-pressed={picked.has(t.id)} onClick={() => flip(t.id)}>{t.label}</button>)}
        {all.length === 0 && <span className="a-faint">No tags yet. Add the first one below.</span>}
      </div>
      <input className="a-input" style={{ marginTop: 16 }} placeholder="New tag, for example Fractions" value={fresh} onChange={(e) => setFresh(e.target.value)} aria-label="New tag" />
    </Drawer>
  );
}
