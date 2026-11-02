import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "../../api";
import { SUBJECT_NAMES } from "./Lessons";

type Course = { id: string; slug: string; title: string; subject: string | null; lessonCount: number };
type Slot = { lessonId: string; title: string; subject: string; status: string; semester: number | null; week: number | null };
type LessonOption = { id: string; title: string; subject: string };

const SEMESTERS = [1, 2, 3, 4];
const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);

/** The year plan for one course: 4 semesters by 12 weeks. Lessons placed here are released week by week. */
export function Curriculum() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [semester, setSemester] = useState(1);

  const loadCourses = useCallback(async () => {
    const [c, l] = await Promise.all([
      api<{ courses: Course[] }>("/api/admin/courses"),
      api<{ lessons: LessonOption[] }>("/api/admin/lessons"),
    ]);
    setCourses(c.courses);
    setLessons(l.lessons);
    setCourseId((cur) => cur || c.courses[0]?.id || "");
  }, []);
  useEffect(() => { loadCourses().catch((e: Error) => setNotice(e.message)); }, [loadCourses]);

  useEffect(() => {
    if (!courseId) return;
    api<{ slots: Slot[] }>(`/api/admin/courses/${courseId}`).then((r) => { setSlots(r.slots); setDirty(false); }).catch((e: Error) => setNotice(e.message));
  }, [courseId]);

  const course = courses.find((c) => c.id === courseId);
  const byCell = useMemo(() => {
    const m = new Map<string, Slot[]>();
    for (const s of slots) if (s.semester && s.week) m.set(`${s.semester}-${s.week}`, [...(m.get(`${s.semester}-${s.week}`) ?? []), s]);
    return m;
  }, [slots]);
  const planned = WEEKS.flatMap((w) => SEMESTERS.map((s) => byCell.has(`${s}-${w}`))).filter(Boolean).length;
  const unscheduled = slots.filter((s) => !s.semester);
  const available = lessons.filter((l) => !slots.some((s) => s.lessonId === l.id) && (!course?.subject || l.subject === course.subject));

  function place(lessonId: string, sem: number | null, week: number | null) {
    const lesson = lessons.find((l) => l.id === lessonId);
    setSlots((cur) => {
      const found = cur.find((s) => s.lessonId === lessonId);
      if (found) return cur.map((s) => (s.lessonId === lessonId ? { ...s, semester: sem, week } : s));
      return [...cur, { lessonId, title: lesson?.title ?? "", subject: lesson?.subject ?? "", status: "draft", semester: sem, week }];
    });
    setDirty(true);
  }
  const remove = (lessonId: string) => { setSlots((cur) => cur.filter((s) => s.lessonId !== lessonId)); setDirty(true); };

  async function save() {
    await api(`/api/admin/courses/${courseId}/lessons`, { method: "PUT", body: { slots: slots.map((s) => ({ lessonId: s.lessonId, semester: s.semester, week: s.week })) } });
    setDirty(false);
    setNotice("Saved.");
    await loadCourses();
  }

  async function createCourse(e: FormEvent) {
    e.preventDefault();
    const r = await api<{ course: { id: string } }>("/api/admin/courses", { body: { title: newTitle } });
    setNewTitle("");
    setCourseId(r.course.id);
    await loadCourses();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-extrabold">Year plan</h1>
      {notice && <p role="status" className="text-lg font-bold">{notice}</p>}

      <section className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 font-bold">
          Course
          <select className="input w-auto min-w-60" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </label>
        <form onSubmit={(e) => void createCourse(e)} className="flex items-end gap-2">
          <label className="flex flex-col gap-1 font-bold">
            New course
            <input className="input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Maths Year 1" required />
          </label>
          <button className="btn" type="submit">Add</button>
        </form>
      </section>

      {course && (
        <>
          <p className="text-lg">
            {course.title}: <strong>{planned} of 48</strong> weeks planned{unscheduled.length > 0 && ` · ${unscheduled.length} lesson(s) not yet placed`}.
            Children only see a lesson once its week arrives and the course is assigned to their class.
          </p>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Semester">
            {SEMESTERS.map((s) => (
              <button key={s} role="tab" aria-selected={semester === s} className={"btn " + (semester === s ? "btn-primary" : "")} onClick={() => setSemester(s)}>
                Semester {s}
              </button>
            ))}
          </div>

          <ol className="flex flex-col gap-2">
            {WEEKS.map((w) => {
              const cell = byCell.get(`${semester}-${w}`) ?? [];
              return (
                <li key={w} className="card flex flex-wrap items-center gap-3 p-3">
                  <span className="w-20 font-display text-lg font-bold">Week {w}</span>
                  <div className="flex min-w-40 flex-1 flex-wrap gap-2">
                    {cell.length === 0 && <span className="text-muted">Nothing planned yet</span>}
                    {cell.map((s) => (
                      <span key={s.lessonId} className="inline-flex items-center gap-2 rounded-full border-2 border-line px-3 py-1">
                        <span><strong>{s.title}</strong> <small>({SUBJECT_NAMES[s.subject] ?? s.subject}{s.status !== "published" ? `, ${s.status}` : ""})</small></span>
                        <button className="font-bold underline" aria-label={`Remove ${s.title} from week ${w}`} onClick={() => place(s.lessonId, null, null)}>Remove</button>
                      </span>
                    ))}
                  </div>
                  <select className="input w-auto max-w-64" aria-label={`Add a lesson to week ${w}`} value="" onChange={(e) => e.target.value && place(e.target.value, semester, w)}>
                    <option value="">Add a lesson…</option>
                    {[...available, ...unscheduled.map((u) => ({ id: u.lessonId, title: u.title, subject: u.subject }))].map((l) => (
                      <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ol>

          {unscheduled.length > 0 && (
            <section aria-label="Not yet placed" className="card p-4">
              <h2 className="font-display text-xl font-bold">In this course but not placed in a week</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {unscheduled.map((s) => <li key={s.lessonId} className="rounded-full border-2 border-line px-3 py-1">{s.title} <button className="font-bold underline" onClick={() => remove(s.lessonId)}>Take out</button></li>)}
              </ul>
            </section>
          )}

          <div className="flex gap-3">
            <button className="btn btn-primary" disabled={!dirty} onClick={() => void save()}>Save year plan</button>
            {dirty && <span className="self-center font-bold">You have unsaved changes.</span>}
          </div>
        </>
      )}
      {!course && <p className="text-lg">No courses yet. Import a lesson that has a curriculum slot, or add a course above.</p>}
    </div>
  );
}
