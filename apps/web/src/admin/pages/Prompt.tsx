import { useState } from "react";
import { useSearchParams } from "react-router";
import { api } from "../../api";
import { Button, Card, ErrorNote, Field, PageHeader, useFeedback, useLoad } from "../ui";

type Course = { id: string; title: string };

/** Builds the message to paste into Claude to write the next lesson: what was taught, what to practise and the house rules. */
export function PromptBuilder() {
  const [params] = useSearchParams();
  const courses = useLoad<{ courses: Course[] }>("/api/admin/courses");
  const kids = useLoad<{ students: { id: string; displayName: string }[] }>("/api/admin/students");
  const classes = useLoad<{ classes: { id: string; name: string }[] }>("/api/admin/classes");
  const [courseId, setCourseId] = useState(params.get("course") ?? "");
  const [semester, setSemester] = useState(params.get("semester") ?? "1");
  const [week, setWeek] = useState(params.get("week") ?? "3");
  const [studentId, setStudentId] = useState(params.get("student") ?? "");
  const [classId, setClassId] = useState(params.get("class") ?? "");
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const { toast } = useFeedback();
  const list = courses.data?.courses ?? [];
  const course = courseId || list[0]?.id || "";

  async function build() {
    setError("");
    try {
      const q = new URLSearchParams({ courseId: course, semester, week, topic });
      if (studentId) q.set("studentId", studentId);
      else if (classId) q.set("classId", classId);
      setPrompt((await api<{ prompt: string }>(`/api/admin/prompt?${q}`)).prompt);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not build the message."); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(prompt); toast("Copied. Paste it into Claude."); } catch { toast("Could not copy; select the text and copy it.", true); }
  }

  return (
    <>
      <PageHeader title="Next lesson prompt" description="Pick where the lesson goes and I will write the message for Claude: what the course has covered, what to practise and your lesson rules. Nothing is sent anywhere." />
      <ErrorNote error={courses.error || kids.error || classes.error || error} />
      <Card>
        <div className="a-grid cols-4" style={{ alignItems: "end" }}>
          <Field label="Course">
            <select className="a-select" value={course} onChange={(e) => setCourseId(e.target.value)}>{list.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
          </Field>
          <Field label="Semester"><select className="a-select" value={semester} onChange={(e) => setSemester(e.target.value)}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>Semester {n}</option>)}</select></Field>
          <Field label="Week"><select className="a-select" value={week} onChange={(e) => setWeek(e.target.value)}>{Array.from({ length: 13 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n === 13 ? "Week 13 (exam)" : `Week ${n}`}</option>)}</select></Field>
          <Field label="Focus on a child's weak skills (optional)">
            <select className="a-select" value={studentId} onChange={(e) => { setStudentId(e.target.value); setClassId(""); }}>
              <option value="">No one in particular</option>{(kids.data?.students ?? []).map((s) => <option key={s.id} value={s.id}>{s.displayName}</option>)}
            </select>
          </Field>
        </div>
        {!studentId && (
          <div style={{ marginTop: 12, maxWidth: 360 }}>
            <Field label="Or a class's weak skills (optional)">
              <select className="a-select" value={classId} onChange={(e) => setClassId(e.target.value)}>
                <option value="">No class</option>{(classes.data?.classes ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <Field label="Topic" help="Leave empty to let Claude suggest the next topic from what was taught.">
            <input className="a-input" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="For example: perimeter of shapes" />
          </Field>
        </div>
        <div className="a-row" style={{ marginTop: 14 }}><Button variant="primary" disabled={!course} onClick={() => void build()}>Build the message</Button></div>
      </Card>
      {prompt && (
        <Card title="Message for Claude" actions={<Button icon="copy" onClick={() => void copy()}>Copy</Button>}>
          <textarea className="a-textarea mono" readOnly rows={22} value={prompt} aria-label="Message for Claude" />
        </Card>
      )}
    </>
  );
}
