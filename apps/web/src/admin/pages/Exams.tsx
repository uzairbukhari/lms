import { useState, type FormEvent } from "react";
import { api, ApiError } from "../../api";
import { Button, Card, Drawer, EmptyState, ErrorNote, Field, PageHeader, Skeleton, useFeedback, useLoad } from "../ui";

type Course = { id: string; title: string };
type Exam = { id: string; courseId: string; title: string; semester: number; questionCount: number; maxAttempts: number | null; passPercent: number };

export function Exams() {
  const courses = useLoad<{ courses: Course[] }>("/api/admin/courses");
  const exams = useLoad<{ exams: Exam[] }>("/api/admin/exams");
  const [building, setBuilding] = useState(false);
  const { toast } = useFeedback();
  const list = exams.data?.exams ?? [];

  async function patch(e: Exam, body: { maxAttempts?: number | null; passPercent?: number }) {
    try { await api(`/api/admin/exams/${e.id}`, { method: "PATCH", body }); toast("Saved."); await exams.reload(); }
    catch (err) { toast(err instanceof Error ? err.message : "Could not save.", true); }
  }

  return (
    <>
      <PageHeader title="Exams" description="Semester-end exams are built from that semester's lesson quiz questions. Children sit an exam in its exam week, or earlier if you open it on the class's Access tab." actions={<Button variant="primary" icon="plus" onClick={() => setBuilding(true)}>Build exam</Button>} />
      <ErrorNote error={exams.error} />
      <Card flush>
        {exams.loading && !exams.data ? <Skeleton /> : list.length === 0 ? <EmptyState title="No exams yet" action={<Button variant="primary" onClick={() => setBuilding(true)}>Build your first exam</Button>}>Build an exam once a semester has published lessons with quizzes.</EmptyState> : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr><th>Exam</th><th className="num">Questions</th><th className="num">Pass mark</th><th className="num">Tries allowed</th></tr></thead>
            <tbody>{list.map((e) => (
              <tr key={e.id}>
                <td className="a-cell-title">{e.title}</td>
                <td className="num">{e.questionCount}</td>
                <td className="num"><input className="a-input inline" type="number" min={1} max={100} defaultValue={e.passPercent} aria-label={`Pass mark for ${e.title}`} onBlur={(ev) => { const v = Number(ev.target.value); if (v >= 1 && v <= 100 && v !== e.passPercent) void patch(e, { passPercent: v }); }} /> %</td>
                <td className="num"><input className="a-input inline" type="number" min={1} max={20} defaultValue={e.maxAttempts ?? ""} placeholder="∞" aria-label={`Tries allowed for ${e.title}`} onBlur={(ev) => { const v = ev.target.value === "" ? null : Number(ev.target.value); if (v !== e.maxAttempts && (v === null || (v >= 1 && v <= 20))) void patch(e, { maxAttempts: v }); }} /></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
        <div className="a-card-body a-faint" style={{ borderTop: "1px solid var(--a-border)" }}>Edit a pass mark or number of tries in the table and click away to save. Leave tries empty for unlimited.</div>
      </Card>
      {building && <BuildExam courses={courses.data?.courses ?? []} onClose={() => setBuilding(false)} onBuilt={() => { setBuilding(false); void exams.reload(); }} />}
    </>
  );
}

function BuildExam({ courses, onClose, onBuilt }: { courses: Course[]; onClose: () => void; onBuilt: () => void }) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [semester, setSemester] = useState(1);
  const [count, setCount] = useState(20);
  const [revision, setRevision] = useState(20);
  const [tries, setTries] = useState("2");
  const [busy, setBusy] = useState(false);
  const { toast } = useFeedback();

  async function build(ev: FormEvent) {
    ev.preventDefault();
    setBusy(true);
    try {
      const r = await api<{ exam: { questionCount: number; blueprint: Record<string, { wanted: number; got: number }> } }>("/api/admin/exams", {
        body: { courseId, semester, questionCount: count, revisionPercent: semester === 1 ? 0 : revision, maxAttempts: tries === "" ? null : Number(tries) },
      });
      const short = Object.entries(r.exam.blueprint).filter(([, v]) => v.got < v.wanted).map(([k, v]) => `${k.replace("_", " ")} has only ${v.got} of ${v.wanted}`);
      toast(`Built an exam with ${r.exam.questionCount} questions.${short.length ? ` Not enough quiz questions yet: ${short.join("; ")}.` : ""}`);
      onBuilt();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "Could not build the exam.", true);
      setBusy(false);
    }
  }
  return (
    <Drawer title="Build a semester exam" onClose={onClose} footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" type="submit" form="build-exam" disabled={!courseId || busy}>Build exam</Button></>}>
      <p className="a-muted">Questions are copied from that semester's published lesson quizzes, spread across lessons. Building again makes a new version; earlier attempts keep the version they sat.</p>
      <form id="build-exam" onSubmit={(e) => void build(e)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Course"><select className="a-select" value={courseId} onChange={(e) => setCourseId(e.target.value)}>{courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select></Field>
        <Field label="Semester"><select className="a-select" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 4 ? "4 (whole year)" : n}</option>)}</select></Field>
        <Field label="Number of questions"><input className="a-input" type="number" min={1} max={60} value={count} onChange={(e) => setCount(Number(e.target.value))} /></Field>
        <Field label="Revision from earlier semesters (%)" help={semester === 1 || semester === 4 ? "Not used for this semester." : undefined}><input className="a-input" type="number" min={0} max={60} value={revision} disabled={semester === 1 || semester === 4} onChange={(e) => setRevision(Number(e.target.value))} /></Field>
        <Field label="Tries allowed" help="Leave empty for unlimited."><input className="a-input" type="number" min={1} max={20} value={tries} onChange={(e) => setTries(e.target.value)} /></Field>
      </form>
    </Drawer>
  );
}
