import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../../api";
import { useCrumb } from "../Shell";
import { ClassCourses } from "./ClassCourses";
import { ClassExams } from "./ClassExams";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, PageHeader, Skeleton, Tabs, ago, useFeedback, useLoad } from "../ui";

type Detail = {
  class: { id: string; name: string; description: string | null; isActive: number; visibilityMode: "released" | "all_published"; unlockMode?: "weekly" | "path"; structureV3?: number };
  members: { id: string; displayName: string; username: string }[];
  terms: { number: number; name: string; startDate: string; endDate: string; teachingWeeks: number; examWeek: number }[];
  assignments: { id: string; courseId: string; courseTitle: string }[];
};
type Student = { id: string; displayName: string; username: string };
type Course = { id: string; title: string };
type Unlock = { id: string; courseId: string; courseTitle: string; semester: number; week: number; classId: string | null; userId: string | null; expiresAt: string | null };
type Tab = "members" | "courses" | "exams" | "calendar" | "access" | "settings";

const today = () => new Date().toISOString().slice(0, 10);
const dayMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export function ClassDetail() {
  const { id = "" } = useParams();
  const detail = useLoad<Detail>(`/api/admin/classes/${id}`);
  const students = useLoad<{ students: Student[] }>("/api/admin/students");
  const courses = useLoad<{ courses: Course[] }>("/api/admin/courses");
  const classCourses = useLoad<{ courses: { courseId: string; title: string }[] }>(`/api/admin/classes/${id}/courses`);
  const unlocks = useLoad<{ unlocks: Unlock[] }>("/api/admin/unlocks");
  const { toast, confirm } = useFeedback();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("members");
  const d = detail.data;
  useCrumb(d?.class.name);

  async function act(fn: () => Promise<unknown>, done?: string) {
    try { await fn(); await Promise.all([detail.reload(), unlocks.reload()]); if (done) toast(done); } catch (e) { toast(e instanceof Error ? e.message : "Something went wrong", true); }
  }

  if (detail.error && !d) return <><PageHeader title="Class" /><ErrorNote error={detail.error} /><Link to="/admin/classes">Back to classes</Link></>;
  if (!d) return <div className="a-card"><Skeleton rows={6} /></div>;

  const memberIds = new Set(d.members.map((m) => m.id));
  const setMembers = (ids: string[]) => act(() => api(`/api/admin/classes/${id}/members`, { method: "PUT", body: { userIds: ids } }));
  const available = (students.data?.students ?? []).filter((s) => !memberIds.has(s.id));
  const unassigned = (courses.data?.courses ?? []).filter((c) => !d.assignments.some((a) => a.courseId === c.id));
  const classUnlocks = (unlocks.data?.unlocks ?? []).filter((u) => u.classId === id);

  return (
    <>
      <PageHeader
        title={<span className="a-row">{d.class.name}{!d.class.isActive && <Badge>Archived</Badge>}</span>}
        description={d.class.description ?? `${d.members.length} student${d.members.length === 1 ? "" : "s"} · ${d.assignments.length} course${d.assignments.length === 1 ? "" : "s"}`}
      />
      <Tabs<Tab> value={tab} onChange={setTab} tabs={[
        { id: "members", label: `Members (${d.members.length})` }, { id: "courses", label: `Courses (${d.assignments.length})` },
        { id: "exams", label: "Exams" }, { id: "calendar", label: "Calendar" }, { id: "access", label: "Access" }, { id: "settings", label: "Settings" },
      ]} />

      {tab === "members" && (
        <Card flush title="Members" actions={available.length > 0 && (
          <select className="a-select" aria-label="Add a student" value="" onChange={(e) => e.target.value && void setMembers([...memberIds, e.target.value])}>
            <option value="">Add a student…</option>
            {available.map((s) => <option key={s.id} value={s.id}>{s.displayName}</option>)}
          </select>
        )}>
          {d.members.length === 0 ? <EmptyState title="No students in this class">Add students above, or create new ones on the <Link to="/admin/students">Students</Link> page.</EmptyState> : (
            <div className="a-table-wrap"><table className="a-table">
              <thead><tr><th>Student</th><th>Username</th><th /></tr></thead>
              <tbody>{d.members.map((m) => (
                <tr key={m.id}>
                  <td><Link to={`/admin/students/${m.id}`} className="a-cell-title">{m.displayName}</Link></td>
                  <td><code>{m.username}</code></td>
                  <td className="actions"><Button size="sm" onClick={() => void setMembers([...memberIds].filter((x) => x !== m.id))}>Remove</Button></td>
                </tr>
              ))}</tbody>
            </table></div>
          )}
        </Card>
      )}

      {tab === "courses" && <ClassCourses classId={id} all={courses.data?.courses ?? []} useRules={!!d.class.structureV3} onChanged={() => void detail.reload()} />}

      {tab === "exams" && <ClassExams classId={id} courses={classCourses.data?.courses ?? []} />}

      {tab === "calendar" && <Calendar detail={d} v3={!!d.class.structureV3} onSave={(path, body, method) => act(() => api(path, { method, body }), "Calendar saved.")} />}

      {tab === "access" && (
        <>
          <Card title="What children can see">
            <Field label="Lesson release" help={d.class.structureV3 ? "Locked lessons stay hidden unless you choose the open library." : "Future weeks stay hidden unless you choose the open library."}>
              <select className="a-select" style={{ maxWidth: 380 }} value={d.class.visibilityMode} onChange={(e) => void act(() => api(`/api/admin/classes/${id}`, { method: "PATCH", body: { visibilityMode: e.target.value } }), "Saved.")}>
                <option value="released">{d.class.structureV3 ? "Only lessons the course rules have opened" : "Week by week (this week and earlier weeks)"}</option>
                <option value="all_published">Everything published (open library)</option>
              </select>
            </Field>
          </Card>
          {d.class.structureV3 ? (
            <>
              <Card title="How lessons open">
                <p className="a-muted" style={{ margin: 0 }}>Each course in this class has its own rule: <strong>mastery path</strong> (the next topic opens when the big quiz is passed), <strong>open</strong> (everything open) or <strong>drip</strong> (one more lesson every few days). Change it on the <button type="button" className="a-link" onClick={() => setTab("courses")}>Courses tab</button>.</p>
              </Card>
              <OpenTopic classId={id} />
            </>
          ) : (
            <>
              <Card title="How lessons open">
                <Field label="Unlock mode" help="Mastery path: each topic opens only when the child passes the big quiz of the one before (70%). Weeks are ignored for this class's courses.">
                  <select className="a-select" style={{ maxWidth: 380 }} value={d.class.unlockMode ?? "weekly"} onChange={(e) => void act(() => api(`/api/admin/classes/${id}`, { method: "PATCH", body: { unlockMode: e.target.value } }), "Saved.")}>
                    <option value="weekly">By week (the school calendar)</option>
                    <option value="path">Mastery path (open when the last topic is passed)</option>
                  </select>
                </Field>
              </Card>
              {d.class.unlockMode === "path" ? <OpenTopic classId={id} /> : <OpenEarly classId={id} courses={d.assignments} unlocks={classUnlocks} onChange={act} />}
            </>
          )}
        </>
      )}

      {tab === "settings" && (
        <Settings detail={d} onDelete={async () => { try { await api(`/api/admin/classes/${id}`, { method: "DELETE" }); toast("Class deleted."); nav("/admin/classes"); } catch (e) { toast(e instanceof Error ? e.message : "Could not delete the class.", true); } }} onSave={(body, msg) => act(() => api(`/api/admin/classes/${id}`, { method: "PATCH", body }), msg)} confirm={confirm} />
      )}
    </>
  );
}

function Calendar({ detail, v3, onSave }: { detail: Detail; v3: boolean; onSave: (path: string, body: unknown, method: string) => Promise<void> }) {
  const base = `/api/admin/classes/${detail.class.id}/terms`;
  const last = [...detail.terms].sort((x, y) => y.number - x.number)[0];
  const nextStart = last ? nextMonday(last.endDate) : "";
  const [start, setStart] = useState("");
  const [weeks, setWeeks] = useState(12);
  const [editing, setEditing] = useState<number | null>(null);
  const [eStart, setEStart] = useState("");
  const [eWeeks, setEWeeks] = useState(12);
  const [all, setAll] = useState({ start: "", gap: 0 });
  const now = today();
  const full = detail.terms.length >= 4;
  const add = (e: FormEvent) => { e.preventDefault(); void onSave(base, { startDate: start || nextStart, teachingWeeks: weeks }, "POST").then(() => setStart("")); };
  const save = (e: FormEvent, n: number) => { e.preventDefault(); void onSave(`${base}/${n}`, { startDate: eStart, teachingWeeks: eWeeks }, "PATCH").then(() => setEditing(null)); };
  return (
    <>
      <Card title="School year">
        {detail.terms.length === 0 ? (
          <div className="a-alert blue">{v3 ? "No semesters yet. Add one below when you want exam weeks or weekly release. Courses on a mastery path or open rule do not need dates." : "No dates yet. Without them, no weekly lessons are released to this class."}</div>
        ) : (
          <div className="a-timeline">
            {detail.terms.map((t) => {
              const weeksTotal = t.teachingWeeks + 1;
              const here = now >= t.startDate && now <= t.endDate ? Math.floor((dayMs(now) - dayMs(t.startDate)) / (7 * 86400000)) + 1 : 0;
              return (
                <div key={t.number} className={`a-sem ${here ? "now" : ""}`}>
                  <div className="a-row" style={{ justifyContent: "space-between" }}><strong>{t.name}</strong>{here > 0 && <Badge tone="blue">{here >= t.examWeek ? "Exam week" : `Week ${here}`}</Badge>}</div>
                  {editing === t.number ? (
                    <form className="a-stack" onSubmit={(e) => save(e, t.number)}>
                      <Field label="Starts (a Monday)"><input className="a-input" type="date" value={eStart} onChange={(e) => setEStart(e.target.value)} required /></Field>
                      <Field label="Teaching weeks"><input className="a-input" type="number" min={1} max={12} value={eWeeks} onChange={(e) => setEWeeks(Number(e.target.value))} /></Field>
                      <div className="a-row"><Button variant="primary" size="sm" type="submit">Save</Button><Button size="sm" type="button" onClick={() => setEditing(null)}>Cancel</Button></div>
                    </form>
                  ) : (
                    <>
                      <div className="a-faint">{t.startDate} → {t.endDate}</div>
                      <div className="a-weekbar" aria-label={`${t.teachingWeeks} teaching weeks and an exam week`}>
                        {Array.from({ length: weeksTotal }, (_, i) => <i key={i} className={`${i + 1 === weeksTotal ? "exam" : ""} ${i + 1 === here ? "here" : ""}`} />)}
                      </div>
                      <div className="a-faint">{t.teachingWeeks} teaching weeks + exam week</div>
                      <div className="a-row">
                        <Button size="sm" onClick={() => { setEditing(t.number); setEStart(t.startDate); setEWeeks(t.teachingWeeks); }}>Edit</Button>
                        <Button size="sm" onClick={() => void onSave(`${base}/${t.number}`, undefined, "DELETE")}>Delete</Button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
      {!full && (
        <Card title="Add a semester">
          <form className="a-row" style={{ alignItems: "flex-end" }} onSubmit={add}>
            <Field label="Starts (a Monday)" help={nextStart ? "Leave as suggested to follow on from the last semester." : undefined}><input className="a-input" type="date" value={start || nextStart} onChange={(e) => setStart(e.target.value)} required /></Field>
            <Field label="Teaching weeks"><input className="a-input" style={{ width: 90 }} type="number" min={1} max={12} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} /></Field>
            <Button variant="primary" type="submit">Add Semester {[1, 2, 3, 4].find((n) => !detail.terms.some((t) => t.number === n))}</Button>
          </form>
        </Card>
      )}
      {detail.terms.length === 0 && (
        <details className="a-card" style={{ padding: 12 }}>
          <summary>Set up all four semesters at once</summary>
          <form className="a-row" style={{ alignItems: "flex-end", marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); void onSave(`${base}/generate`, { startDate: all.start, gapWeeks: all.gap }, "POST"); }}>
            <Field label="Semester 1 starts (a Monday)"><input className="a-input" type="date" value={all.start} onChange={(e) => setAll({ ...all, start: e.target.value })} required /></Field>
            <Field label="Holiday weeks between semesters"><input className="a-input" style={{ width: 90 }} type="number" min={0} max={12} value={all.gap} onChange={(e) => setAll({ ...all, gap: Number(e.target.value) })} /></Field>
            <Button type="submit">Set up 4 semesters</Button>
          </form>
        </details>
      )}
    </>
  );
}

function nextMonday(endIso: string): string {
  const d = new Date(`${endIso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

type PathUnlock = { id: string; lessonId: string; lessonTitle: string; classId: string | null };

/** Parent override on a topic path: open one topic for the whole class now, even if the one before is not passed. */
function OpenTopic({ classId }: { classId: string }) {
  const lessons = useLoad<{ lessons: { id: string; title: string; status: string }[] }>("/api/admin/lessons?status=published");
  const unlocks = useLoad<{ unlocks: PathUnlock[] }>("/api/admin/path-unlocks");
  const { toast } = useFeedback();
  const [lessonId, setLessonId] = useState("");
  const mine = (unlocks.data?.unlocks ?? []).filter((u) => u.classId === classId);
  async function run(fn: () => Promise<unknown>, msg: string) {
    try { await fn(); await unlocks.reload(); toast(msg); } catch (e) { toast(e instanceof Error ? e.message : "Something went wrong", true); }
  }
  return (
    <Card title="Open a topic early" flush>
      <div className="a-card-body">
        <p className="a-muted">Let this class open a topic now without passing the one before. The topics after it stay locked.</p>
        <form className="a-row" style={{ alignItems: "flex-end" }} onSubmit={(e) => { e.preventDefault(); void run(() => api("/api/admin/path-unlocks", { body: { lessonId, classId } }), "Topic opened."); }}>
          <Field label="Topic"><select className="a-select" value={lessonId} onChange={(e) => setLessonId(e.target.value)} required><option value="">Choose…</option>{(lessons.data?.lessons ?? []).map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}</select></Field>
          <Button variant="primary" type="submit" disabled={!lessonId}>Open topic</Button>
        </form>
      </div>
      {mine.length > 0 && (
        <ul className="a-list" style={{ borderTop: "1px solid var(--a-border)" }}>{mine.map((u) => (
          <li key={u.id}><span>{u.lessonTitle}</span><Button size="sm" onClick={() => void run(() => api(`/api/admin/path-unlocks/${u.id}`, { method: "DELETE" }), "Closed again.")}>Close</Button></li>
        ))}</ul>
      )}
    </Card>
  );
}

function OpenEarly({ classId, courses, unlocks, onChange }: { classId: string; courses: Detail["assignments"]; unlocks: Unlock[]; onChange: (fn: () => Promise<unknown>, msg?: string) => Promise<void> }) {
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState(1);
  const [week, setWeek] = useState(1);
  const [expires, setExpires] = useState("");
  return (
    <Card title="Open a week early" flush>
      <div className="a-card-body">
        <p className="a-muted">Let this class see a future week of a course now (week 13 is the exam week). Optionally close it again on a date.</p>
        <form className="a-row" style={{ alignItems: "flex-end" }} onSubmit={(e) => { e.preventDefault(); void onChange(() => api("/api/admin/unlocks", { body: { courseId, semester, week, classId, ...(expires ? { expiresAt: expires } : {}) } }), "Week opened."); }}>
          <Field label="Course"><select className="a-select" value={courseId} onChange={(e) => setCourseId(e.target.value)} required><option value="">Choose…</option>{courses.map((c) => <option key={c.courseId} value={c.courseId}>{c.courseTitle}</option>)}</select></Field>
          <Field label="Semester"><select className="a-select" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select></Field>
          <Field label="Week"><select className="a-select" value={week} onChange={(e) => setWeek(Number(e.target.value))}>{Array.from({ length: 13 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n === 13 ? "13 (exam)" : n}</option>)}</select></Field>
          <Field label="Closes on (optional)"><input className="a-input" type="date" value={expires} onChange={(e) => setExpires(e.target.value)} /></Field>
          <Button variant="primary" type="submit" disabled={!courseId}>Open week</Button>
        </form>
      </div>
      {unlocks.length > 0 && (
        <ul className="a-list" style={{ borderTop: "1px solid var(--a-border)" }}>{unlocks.map((u) => (
          <li key={u.id}><span>{u.courseTitle} · Semester {u.semester}, {u.week === 13 ? "exam week" : `week ${u.week}`}{u.expiresAt && <span className="a-faint"> · closes {ago(u.expiresAt) === "Today" ? "today" : u.expiresAt}</span>}</span>
            <Button size="sm" onClick={() => void onChange(() => api(`/api/admin/unlocks/${u.id}`, { method: "DELETE" }), "Closed again.")}>Close</Button></li>
        ))}</ul>
      )}
    </Card>
  );
}

function Settings({ detail, onSave, onDelete, confirm }: { detail: Detail; onDelete: () => Promise<void>; onSave: (body: unknown, msg: string) => Promise<void>; confirm: (o: { title: string; message: string; confirmLabel?: string; danger?: boolean }) => Promise<boolean> }) {
  const [name, setName] = useState(detail.class.name);
  const [desc, setDesc] = useState(detail.class.description ?? "");
  const active = !!detail.class.isActive;
  return (
    <>
      <Card title="Details">
        <form style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }} onSubmit={(e) => { e.preventDefault(); void onSave({ name, description: desc || null }, "Saved."); }}>
          <Field label="Class name"><input className="a-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required /></Field>
          <Field label="Description"><input className="a-input" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={200} /></Field>
          <div><Button variant="primary" type="submit" disabled={!name.trim()}>Save changes</Button></div>
        </form>
      </Card>
      <Card title={active ? "Archive this class" : "Restore this class"}>
        <p className="a-muted">{active ? "Archived classes stop releasing lessons to their students. Scores are kept." : "Restoring starts releasing lessons to this class again."}</p>
        <div><Button variant={active ? "danger" : undefined} onClick={() => void (async () => {
          if (!active || await confirm({ title: "Archive this class?", message: "Its students will stop seeing lessons from it until you restore it. Nothing is deleted.", confirmLabel: "Archive", danger: true })) await onSave({ isActive: !active }, active ? "Class archived." : "Class restored.");
        })()}>{active ? "Archive class" : "Restore class"}</Button></div>
      </Card>
      <Card title="Delete this class">
        <p className="a-muted">Deletes the class, its course list, unlocks and any exams nobody has sat. Students and their scores are kept; they just have no class until you add them to one. This cannot be undone. If you only want it out of the way, archive it instead.</p>
        <div><Button variant="solid-danger" onClick={() => void (async () => {
          if (await confirm({ title: `Delete “${detail.class.name}”?`, message: `${detail.members.length} student${detail.members.length === 1 ? "" : "s"} will be left without a class. This cannot be undone.`, confirmLabel: "Delete class", danger: true })) await onDelete();
        })()}>Delete class</Button></div>
      </Card>
    </>
  );
}
