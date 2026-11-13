import { useEffect, useMemo, useState, type DragEvent } from "react";
import { useParams } from "react-router";
import { SUBJECTS } from "@lms/schema";
import { api } from "../../api";
import { useCrumb } from "../Shell";
import { Badge, Button, Card, ErrorNote, PageHeader, SearchBox, Skeleton, StatusBadge, SUBJECT_NAMES, useFeedback, useLoad } from "../ui";

type Lesson = { id: string; title: string; subject: string; status: string; ageMin: number | null; ageMax: number | null; tags: { id: string; label: string }[] };
type Item = { lessonId: string; title: string; subject: string; status: string; section: string | null };
type Builder = { course: { id: string; title: string; ageMin: number | null; ageMax: number | null }; items: Item[]; classes: { classId: string; name: string }[] };

/** Two panes: the lesson library (search, subject, tag, age) and the course. Drag lessons across, drag to reorder, or use the buttons. */
export function CourseBuilder() {
  const { id = "" } = useParams();
  const built = useLoad<Builder>(`/api/admin/courses/${id}/builder`);
  const lib = useLoad<{ lessons: Lesson[] }>("/api/admin/lessons");
  const tagsQ = useLoad<{ tags: { id: string; label: string; kind: string }[] }>("/api/admin/tags");
  const { toast } = useFeedback();
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [dirty, setDirty] = useState(false);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [tag, setTag] = useState("");
  const [age, setAge] = useState("");
  const [over, setOver] = useState<number | null>(null);
  useCrumb(built.data?.course.title);

  useEffect(() => { if (built.data) { setItems(built.data.items); setTitle(built.data.course.title); setDirty(false); } }, [built.data]);

  const inCourse = useMemo(() => new Set(items.map((i) => i.lessonId)), [items]);
  const results = useMemo(() => (lib.data?.lessons ?? []).filter((l) =>
    !inCourse.has(l.id) && l.status !== "archived" && (!q || l.title.toLowerCase().includes(q.toLowerCase())) && (!subject || l.subject === subject) &&
    (!tag || l.tags.some((t) => t.id === tag)) && (!age || (l.ageMin !== null && l.ageMax !== null && Number(age) >= l.ageMin && Number(age) <= l.ageMax))), [lib.data, inCourse, q, subject, tag, age]);

  const change = (next: Item[]) => { setItems(next); setDirty(true); };
  const add = (l: Lesson, at = items.length) => { const n = [...items]; n.splice(at, 0, { lessonId: l.id, title: l.title, subject: l.subject, status: l.status, section: null }); change(n); };
  const move = (from: number, to: number) => { const n = [...items]; const [m] = n.splice(from, 1); n.splice(to > from ? to - 1 : to, 0, m!); change(n); };
  const drop = (e: DragEvent, at: number) => {
    e.preventDefault(); setOver(null);
    const lessonId = e.dataTransfer.getData("lesson");
    const from = e.dataTransfer.getData("item");
    if (lessonId) { const l = lib.data?.lessons.find((x) => x.id === lessonId); if (l) add(l, at); }
    else if (from !== "") move(Number(from), at);
  };

  async function save() {
    try {
      await api(`/api/admin/courses/${id}/builder`, { method: "PUT", body: { title, items: items.map((i) => ({ lessonId: i.lessonId, section: i.section })) } });
      toast("Course saved."); setDirty(false); await built.reload();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }

  if (built.loading && !built.data) return <Skeleton />;
  return (
    <>
      <PageHeader title={<input className="a-input" aria-label="Course name" style={{ fontSize: 20, fontWeight: 700, maxWidth: 420 }} value={title} onChange={(e) => { setTitle(e.target.value); setDirty(true); }} />}
        description={built.data?.classes.length ? `Used by ${built.data.classes.map((c) => c.name).join(", ")}. Changes affect those classes.` : "Not in any class yet."}
        actions={<Button variant="primary" disabled={!dirty} onClick={() => void save()}>{dirty ? "Save changes" : "Saved"}</Button>} />
      <ErrorNote error={built.error || lib.error} />
      <div className="a-grid cols-2">
        <Card title="Lesson library" flush>
          <div className="a-toolbar">
            <SearchBox value={q} onChange={setQ} placeholder="Search lessons" />
            <select className="a-select" aria-label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">All subjects</option>{SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}</select>
            <select className="a-select" aria-label="Tag" value={tag} onChange={(e) => setTag(e.target.value)}><option value="">Any tag</option>{(tagsQ.data?.tags ?? []).map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
            <select className="a-select" aria-label="Age" value={age} onChange={(e) => setAge(e.target.value)}><option value="">Any age</option>{[5, 6, 7, 8, 9, 10, 11].map((n) => <option key={n} value={n}>Age {n}</option>)}</select>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 8, maxHeight: "60vh", overflow: "auto" }}>
            {results.length === 0 && <li className="a-faint" style={{ padding: 16 }}>No lessons match.</li>}
            {results.map((l) => (
              <li key={l.id} draggable onDragStart={(e) => e.dataTransfer.setData("lesson", l.id)} className="a-row" style={{ padding: "8px 10px", border: "1px solid var(--a-border, #e2e8f0)", borderRadius: 8, margin: "6px 0", cursor: "grab", flexWrap: "nowrap", justifyContent: "space-between" }}>
                <div style={{ minWidth: 0 }}>
                  <div className="a-cell-title">{l.title}</div>
                  <div className="a-cell-sub">{SUBJECT_NAMES[l.subject] ?? l.subject}{l.ageMin ? ` · ages ${l.ageMin}-${l.ageMax}` : ""} {l.status !== "published" && <StatusBadge status={l.status} />} {l.tags.slice(0, 3).map((t) => <Badge key={t.id} plain>{t.label}</Badge>)}</div>
                </div>
                <Button size="sm" icon="plus" aria-label={`Add ${l.title}`} onClick={() => add(l)}>Add</Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card title={`In this course (${items.length})`} flush>
          <ol style={{ listStyle: "none", margin: 0, padding: 8, minHeight: 160 }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => drop(e, items.length)}>
            {items.length === 0 && <li className="a-faint" style={{ padding: 24, textAlign: "center" }}>Drag lessons here, or press Add.</li>}
            {items.map((it, i) => (
              <li key={it.lessonId} draggable onDragStart={(e) => e.dataTransfer.setData("item", String(i))} onDragOver={(e) => { e.preventDefault(); setOver(i); }} onDragLeave={() => setOver(null)} onDrop={(e) => { e.stopPropagation(); drop(e, i); }}
                style={{ padding: "8px 10px", border: "1px solid var(--a-border, #e2e8f0)", borderTop: over === i ? "3px solid var(--a-accent, #4f46e5)" : undefined, borderRadius: 8, margin: "6px 0", cursor: "grab" }}>
                <div className="a-row" style={{ flexWrap: "nowrap", justifyContent: "space-between" }}>
                  <div className="a-row" style={{ flexWrap: "nowrap", minWidth: 0 }}>
                    <b style={{ width: 24 }}>{i + 1}</b>
                    <div style={{ minWidth: 0 }}><div className="a-cell-title">{it.title}</div><div className="a-cell-sub">{SUBJECT_NAMES[it.subject] ?? it.subject} {it.status !== "published" && <StatusBadge status={it.status} />}</div></div>
                  </div>
                  <div className="a-row" style={{ flexWrap: "nowrap" }}>
                    <Button size="sm" aria-label={`Move ${it.title} up`} disabled={i === 0} onClick={() => move(i, i - 1)}>↑</Button>
                    <Button size="sm" aria-label={`Move ${it.title} down`} disabled={i === items.length - 1} onClick={() => move(i, i + 2)}>↓</Button>
                    <Button size="sm" variant="danger" aria-label={`Remove ${it.title}`} onClick={() => change(items.filter((_, k) => k !== i))}>Remove</Button>
                  </div>
                </div>
                <input className="a-input" style={{ marginTop: 6 }} aria-label={`Section heading before ${it.title}`} placeholder="Section heading (optional)" value={it.section ?? ""} onChange={(e) => change(items.map((x, k) => (k === i ? { ...x, section: e.target.value || null } : x)))} />
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
