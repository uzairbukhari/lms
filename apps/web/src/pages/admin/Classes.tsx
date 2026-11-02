import { useCallback, useEffect, useState, type FormEvent } from "react";
import { api } from "../../api";

type ClassRow = { id: string; name: string; studentCount: number };
type Detail = {
  class: { id: string; name: string; visibilityMode: "released" | "all_published" };
  members: { id: string; displayName: string }[];
  terms: { number: number; name: string; startDate: string; endDate: string }[];
  assignments: { id: string; courseId: string; courseTitle: string }[];
};
type Student = { id: string; displayName: string };
type Course = { id: string; title: string };

export function Classes() {
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState("");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [newName, setNewName] = useState("");
  const [start, setStart] = useState("");
  const [gap, setGap] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [notice, setNotice] = useState("");

  const loadAll = useCallback(async () => {
    const [c, s, co] = await Promise.all([
      api<{ classes: ClassRow[] }>("/api/admin/classes"),
      api<{ students: Student[] }>("/api/admin/students"),
      api<{ courses: Course[] }>("/api/admin/courses"),
    ]);
    setClasses(c.classes);
    setStudents(s.students);
    setCourses(co.courses);
    setSelected((cur) => cur || c.classes[0]?.id || "");
  }, []);
  const loadDetail = useCallback(async (id: string) => setDetail(await api<Detail>(`/api/admin/classes/${id}`)), []);

  useEffect(() => { loadAll().catch((e: Error) => setNotice(e.message)); }, [loadAll]);
  useEffect(() => { if (selected) loadDetail(selected).catch((e: Error) => setNotice(e.message)); }, [selected, loadDetail]);

  async function run(fn: () => Promise<unknown>) {
    setNotice("");
    try {
      await fn();
      await Promise.all([loadAll(), selected ? loadDetail(selected) : Promise.resolve()]);
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  const memberIds = new Set(detail?.members.map((m) => m.id));
  const toggleMember = (id: string) =>
    run(() => api(`/api/admin/classes/${selected}/members`, { method: "PUT", body: { userIds: memberIds.has(id) ? [...memberIds].filter((m) => m !== id) : [...memberIds, id] } }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-extrabold">Classes</h1>
      {notice && <p role="alert" className="text-lg font-bold">{notice}</p>}

      <section className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 font-bold">
          Class
          <select className="input w-auto min-w-52" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.studentCount})</option>)}
          </select>
        </label>
        <form className="flex items-end gap-2" onSubmit={(e: FormEvent) => { e.preventDefault(); void run(async () => { const r = await api<{ class: { id: string } }>("/api/admin/classes", { body: { name: newName } }); setNewName(""); setSelected(r.class.id); }); }}>
          <label className="flex flex-col gap-1 font-bold">
            New class
            <input className="input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Saturday Club" required />
          </label>
          <button className="btn" type="submit">Add</button>
        </form>
      </section>

      {detail && (
        <div className="grid gap-6 md:grid-cols-2">
          <section className="card flex flex-col gap-3 p-5" aria-labelledby="mem">
            <h2 id="mem" className="font-display text-xl font-bold">Students in {detail.class.name}</h2>
            {students.length === 0 && <p>Add students first on the Students page.</p>}
            {students.map((s) => (
              <label key={s.id} className="flex min-h-11 items-center gap-2 text-lg">
                <input type="checkbox" className="h-6 w-6" checked={memberIds.has(s.id)} onChange={() => void toggleMember(s.id)} />
                {s.displayName}
              </label>
            ))}
          </section>

          <section className="card flex flex-col gap-3 p-5" aria-labelledby="cal">
            <h2 id="cal" className="font-display text-xl font-bold">School year calendar</h2>
            {detail.terms.length === 0 ? <p>No dates yet. Without them, no weekly lessons are released to this class.</p> : (
              <ul>{detail.terms.map((t) => <li key={t.number}><strong>{t.name}</strong>: {t.startDate} to {t.endDate}</li>)}</ul>
            )}
            <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => { e.preventDefault(); void run(() => api(`/api/admin/classes/${selected}/terms/generate`, { body: { startDate: start, gapWeeks: gap } })); }}>
              <label className="flex flex-col gap-1 font-bold">
                Semester 1 starts (a Monday)
                <input className="input" type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
              </label>
              <label className="flex flex-col gap-1 font-bold">
                Holiday weeks between semesters
                <input className="input w-24" type="number" min={0} max={12} value={gap} onChange={(e) => setGap(Number(e.target.value))} />
              </label>
              <button className="btn btn-primary" type="submit">Set up 4 semesters</button>
            </form>
          </section>

          <section className="card flex flex-col gap-3 p-5" aria-labelledby="asg">
            <h2 id="asg" className="font-display text-xl font-bold">Courses for this class</h2>
            {detail.assignments.length === 0 && <p>Nothing assigned yet, so children in this class see no lessons.</p>}
            <ul className="flex flex-col gap-2">
              {detail.assignments.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2 text-lg">
                  {a.courseTitle}
                  <button className="btn" onClick={() => void run(() => api(`/api/admin/assignments/${a.id}`, { method: "DELETE" }))}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="flex items-end gap-2">
              <label className="flex flex-1 flex-col gap-1 font-bold">
                Add a course
                <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  <option value="">Choose…</option>
                  {courses.filter((c) => !detail.assignments.some((a) => a.courseId === c.id)).map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </label>
              <button className="btn btn-primary" disabled={!courseId} onClick={() => void run(async () => { await api("/api/admin/assignments", { body: { courseId, classId: selected } }); setCourseId(""); })}>Assign</button>
            </div>
          </section>

          <section className="card flex flex-col gap-3 p-5" aria-labelledby="vis">
            <h2 id="vis" className="font-display text-xl font-bold">What children can see</h2>
            <label className="flex flex-col gap-1 font-bold">
              Lesson release
              <select className="input" value={detail.class.visibilityMode} onChange={(e) => void run(() => api(`/api/admin/classes/${selected}`, { method: "PATCH", body: { visibilityMode: e.target.value } }))}>
                <option value="released">Week by week (this week and earlier weeks)</option>
                <option value="all_published">Everything published (open library)</option>
              </select>
            </label>
            <p className="text-muted">Future weeks stay hidden unless you choose the open library.</p>
          </section>
        </div>
      )}
    </div>
  );
}
