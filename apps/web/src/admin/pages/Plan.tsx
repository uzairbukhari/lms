import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { SUBJECTS } from "@lms/schema";
import { api } from "../../api";
import { useCrumb } from "../Shell";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, Modal, PageHeader, Skeleton, StatusBadge, SUBJECT_NAMES, Tabs, useFeedback, useLoad } from "../ui";

type Course = { id: string; slug: string; title: string; subject: string | null; ageBand: string | null; status: string; lessonCount: number };
type Slot = { lessonId: string; title: string; subject: string; status: string; semester: number | null; week: number | null };
type LessonOption = { id: string; title: string; subject: string };
const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const SEMESTERS = [1, 2, 3, 4];

/** Course list: one row per course, click through to its year plan. */
export function PlanList() {
  const courses = useLoad<{ courses: Course[] }>("/api/admin/courses");
  const [creating, setCreating] = useState(false);
  const rows = courses.data?.courses ?? [];
  return (
    <>
      <PageHeader title="Year plan" description="A course is an ordered set of lessons. Place its lessons into semesters and weeks, then assign the course to a class." actions={<Button variant="primary" icon="plus" onClick={() => setCreating(true)}>New course</Button>} />
      <ErrorNote error={courses.error} />
      <Card flush>
        {courses.loading && !courses.data ? <Skeleton /> : rows.length === 0 ? (
          <EmptyState title="No courses yet" action={<Button variant="primary" icon="plus" onClick={() => setCreating(true)}>Create a course</Button>}>Importing a lesson that names a course creates it automatically.</EmptyState>
        ) : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr><th>Course</th><th>Subject</th><th className="num">Lessons</th><th>Status</th></tr></thead>
            <tbody>{rows.map((c) => (
              <tr key={c.id}>
                <td><Link to={`/admin/plan/${c.id}`} className="a-cell-title">{c.title}</Link></td>
                <td>{c.subject ? SUBJECT_NAMES[c.subject] ?? c.subject : <span className="a-faint">Any</span>}</td>
                <td className="num">{c.lessonCount}</td><td><StatusBadge status={c.status} /></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
      {creating && <NewCourse onClose={() => setCreating(false)} />}
    </>
  );
}

function NewCourse({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const { toast } = useFeedback();
  const nav = useNavigate();
  async function create(e: FormEvent) {
    e.preventDefault();
    try {
      const r = await api<{ course: { id: string } }>("/api/admin/courses", { body: { title, ...(subject ? { subject } : {}) } });
      nav(`/admin/plan/${r.course.id}`);
    } catch (err) { toast(err instanceof Error ? err.message : "Could not create the course.", true); }
  }
  return (
    <Modal title="New course" onClose={onClose} footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" type="submit" form="new-course" disabled={!title.trim()}>Create course</Button></>}>
      <form id="new-course" onSubmit={(e) => void create(e)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Course name"><input className="a-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Maths Year 1" maxLength={80} autoFocus /></Field>
        <Field label="Subject" help="Limits the lessons offered in the planner to that subject."><select className="a-select" value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">Any subject</option>{SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}</select></Field>
      </form>
    </Modal>
  );
}

/** The planner for one course: 4 semesters by 12 weeks. Lessons placed here are released week by week. */
export function PlanDetail() {
  const { courseId = "" } = useParams();
  const courses = useLoad<{ courses: Course[] }>("/api/admin/courses");
  const lessonsQ = useLoad<{ lessons: LessonOption[] }>("/api/admin/lessons");
  const slotsQ = useLoad<{ slots: Slot[] }>(`/api/admin/courses/${courseId}`);
  const { toast } = useFeedback();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [dirty, setDirty] = useState(false);
  const [semester, setSemester] = useState(1);
  const [saving, setSaving] = useState(false);
  const course = courses.data?.courses.find((c) => c.id === courseId);
  useCrumb(course?.title);

  useEffect(() => { if (slotsQ.data) { setSlots(slotsQ.data.slots); setDirty(false); } }, [slotsQ.data]);
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const lessons = lessonsQ.data?.lessons ?? [];
  const byCell = useMemo(() => {
    const m = new Map<string, Slot[]>();
    for (const s of slots) if (s.semester && s.week) m.set(`${s.semester}-${s.week}`, [...(m.get(`${s.semester}-${s.week}`) ?? []), s]);
    return m;
  }, [slots]);
  const planned = (sem: number) => WEEKS.filter((w) => byCell.has(`${sem}-${w}`)).length;
  const totalPlanned = SEMESTERS.reduce((n, s) => n + planned(s), 0);
  const unscheduled = slots.filter((s) => !s.semester);
  const offered = [
    ...lessons.filter((l) => !slots.some((s) => s.lessonId === l.id) && (!course?.subject || l.subject === course.subject)),
    ...unscheduled.map((u) => ({ id: u.lessonId, title: u.title, subject: u.subject })),
  ];

  function place(lessonId: string, sem: number | null, week: number | null) {
    const lesson = lessons.find((l) => l.id === lessonId);
    setSlots((cur) => cur.some((s) => s.lessonId === lessonId)
      ? cur.map((s) => (s.lessonId === lessonId ? { ...s, semester: sem, week } : s))
      : [...cur, { lessonId, title: lesson?.title ?? "", subject: lesson?.subject ?? "", status: "draft", semester: sem, week }]);
    setDirty(true);
  }
  async function save() {
    setSaving(true);
    try {
      await api(`/api/admin/courses/${courseId}/lessons`, { method: "PUT", body: { slots: slots.map((s) => ({ lessonId: s.lessonId, semester: s.semester, week: s.week })) } });
      setDirty(false);
      toast("Year plan saved.");
      await Promise.all([courses.reload(), slotsQ.reload()]);
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save the plan.", true); }
    setSaving(false);
  }

  if (slotsQ.error && !slotsQ.data) return <><PageHeader title="Course" /><ErrorNote error={slotsQ.error} /><Link to="/admin/plan">Back to year plans</Link></>;
  if (!course || !slotsQ.data) return <div className="a-card"><Skeleton rows={6} /></div>;

  return (
    <>
      <PageHeader title={course.title} description={`${totalPlanned} of 48 weeks planned${unscheduled.length ? ` · ${unscheduled.length} lesson${unscheduled.length === 1 ? "" : "s"} not yet placed` : ""}. Children see a lesson once its week arrives and the course is assigned to their class.`} />
      <Tabs<string> value={String(semester)} onChange={(v) => setSemester(Number(v))} tabs={SEMESTERS.map((s) => ({ id: String(s), label: `Semester ${s} · ${planned(s)}/12` }))} />
      <Card flush>
        <div className="a-table-wrap"><table className="a-table">
          <thead><tr><th style={{ width: 90 }}>Week</th><th>Lessons</th><th style={{ width: 240 }}>Add</th></tr></thead>
          <tbody>{WEEKS.map((w) => {
            const cell = byCell.get(`${semester}-${w}`) ?? [];
            return (
              <tr key={w}>
                <td className="a-cell-title">Week {w}</td>
                <td><div className="a-row" style={{ padding: "6px 0" }}>
                  {cell.length === 0 && <span className="a-faint">Nothing planned</span>}
                  {cell.map((s) => (
                    <span key={s.lessonId} className="a-row" style={{ gap: 6, border: "1px solid var(--a-border-strong)", borderRadius: 6, padding: "2px 4px 2px 8px", flexWrap: "nowrap" }}>
                      <span>{s.title}</span>{s.status !== "published" && <Badge tone="amber">{s.status}</Badge>}
                      <Button variant="ghost" size="sm" icon="close" aria-label={`Remove ${s.title} from week ${w}`} onClick={() => place(s.lessonId, null, null)} />
                    </span>
                  ))}
                </div></td>
                <td><select className="a-select" aria-label={`Add a lesson to week ${w}`} value="" onChange={(e) => e.target.value && place(e.target.value, semester, w)}>
                  <option value="">Add a lesson…</option>{offered.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
                </select></td>
              </tr>
            );
          })}</tbody>
        </table></div>
      </Card>
      {unscheduled.length > 0 && (
        <Card title="In this course but not placed in a week">
          <div className="a-row">{unscheduled.map((s) => (
            <span key={s.lessonId} className="a-row" style={{ gap: 6 }}>{s.title}<Button size="sm" onClick={() => { setSlots((cur) => cur.filter((x) => x.lessonId !== s.lessonId)); setDirty(true); }}>Take out</Button></span>
          ))}</div>
        </Card>
      )}
      {dirty && (
        <div className="a-sticky-save" role="status"><strong>Unsaved changes</strong><span className="a-spacer" />
          <Button onClick={() => { setSlots(slotsQ.data?.slots ?? []); setDirty(false); }}>Discard</Button>
          <Button variant="primary" disabled={saving} onClick={() => void save()}>Save year plan</Button>
        </div>
      )}
    </>
  );
}
