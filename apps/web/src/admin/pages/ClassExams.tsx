import { useState } from "react";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, Field, Skeleton, useFeedback, useLoad } from "../ui";

type Q = { questionId: string; lessonId: string; lessonTitle: string; type: string; prompt: string; skill: string | null; depth: string | null };
type Exam = { id: string; title: string; questionCount: number; maxAttempts: number | null; passPercent: number; opensOn: string | null };
type Step = "list" | "blueprint" | "review";

/** Grand exam for one class: cover -> blueprint -> generate (lock or swap questions) -> publish. */
export function ClassExams({ classId, courses }: { classId: string; courses: { courseId: string; title: string }[] }) {
  const exams = useLoad<{ exams: Exam[] }>(`/api/admin/classes/${classId}/exams`);
  const { toast } = useFeedback();
  const [step, setStep] = useState<Step>("list");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [perLesson, setPerLesson] = useState(2);
  const [qs, setQs] = useState<Q[]>([]);
  const [locked, setLocked] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState("");
  const [pass, setPass] = useState(70);
  const [tries, setTries] = useState<number | "">(2);
  const [opens, setOpens] = useState("");

  const flip = (s: Set<string>, id: string) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; };
  const fail = (e: unknown) => toast(e instanceof Error ? e.message : "Something went wrong.", true);

  async function generate() {
    try {
      const keep = qs.filter((q) => locked.has(q.questionId));
      // Ask for questions other than the ones now showing, so "Regenerate" gives something new.
      const r = await api<{ questions: Q[] }>(`/api/admin/classes/${classId}/exams/generate`, { method: "POST", body: { courseIds: [...picked], perLesson, avoid: qs.map((q) => q.questionId) } });
      const have = new Map<string, number>();
      for (const q of keep) have.set(q.lessonId, (have.get(q.lessonId) ?? 0) + 1);
      const fresh = r.questions.filter((q) => { const n = have.get(q.lessonId) ?? 0; if (n >= perLesson) return false; have.set(q.lessonId, n + 1); return true; });
      setQs([...keep, ...fresh]);
      setStep("review");
    } catch (e) { fail(e); }
  }
  async function swap(i: number) {
    try {
      const r = await api<{ question: Q }>(`/api/admin/classes/${classId}/exams/swap`, { method: "POST", body: { lessonId: qs[i]!.lessonId, avoid: qs.map((q) => q.questionId) } });
      setQs(qs.map((q, k) => (k === i ? r.question : q)));
    } catch (e) { fail(e); }
  }
  async function save(publish: boolean) {
    try {
      await api(`/api/admin/classes/${classId}/exams`, { method: "POST", body: { title, questionIds: qs.map((q) => q.questionId), passPercent: pass, maxAttempts: tries === "" ? null : tries, opensOn: publish ? opens : null } });
      toast(publish ? "Exam published." : "Exam saved as a draft."); setStep("list"); setQs([]); setLocked(new Set()); await exams.reload();
    } catch (e) { fail(e); }
  }
  async function setOpen(e: Exam, date: string | null) {
    try { await api(`/api/admin/classes/${classId}/exams/${e.id}`, { method: "PATCH", body: { opensOn: date } }); toast(date ? "Exam published." : "Exam is now a draft."); await exams.reload(); } catch (x) { fail(x); }
  }

  if (step === "blueprint") return (
    <Card title="New exam: what should it cover?" actions={<Button onClick={() => setStep("list")}>Cancel</Button>}>
      {courses.length === 0 ? <EmptyState title="No courses in this class">Add a course on the Courses tab first.</EmptyState> : <>
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend className="a-cell-title">Courses to cover</legend>
          {courses.map((c) => <label key={c.courseId} className="a-row" style={{ margin: "6px 0" }}><input type="checkbox" checked={picked.has(c.courseId)} onChange={() => setPicked(flip(picked, c.courseId))} /> {c.title}</label>)}
        </fieldset>
        <Field label="Questions from each lesson" help="Mixes recall, apply and reason questions."><input className="a-input" type="number" min={1} max={6} style={{ width: 90 }} value={perLesson} onChange={(e) => setPerLesson(Number(e.target.value))} /></Field>
        <Button variant="primary" disabled={picked.size === 0} onClick={() => void generate()}>Generate questions</Button>
      </>}
    </Card>
  );

  if (step === "review") return (
    <Card title={`Review ${qs.length} questions`} actions={<><Button onClick={() => setStep("blueprint")}>Back</Button><Button onClick={() => void generate()}>Regenerate unlocked</Button></>}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {qs.map((q, i) => (
          <li key={q.questionId} style={{ border: "1px solid var(--a-border, #e2e8f0)", borderRadius: 10, padding: 10 }} className="a-row">
            <b style={{ width: 28 }}>{i + 1}</b>
            <div style={{ flex: 1, minWidth: 200 }}><div className="a-cell-title">{q.prompt}</div><div className="a-cell-sub">{q.lessonTitle}{q.depth ? ` · ${q.depth}` : ""}{q.skill ? ` · ${q.skill}` : ""}</div></div>
            <Button size="sm" aria-pressed={locked.has(q.questionId)} variant={locked.has(q.questionId) ? "primary" : undefined} onClick={() => setLocked(flip(locked, q.questionId))}>{locked.has(q.questionId) ? "Locked" : "Lock"}</Button>
            <Button size="sm" disabled={locked.has(q.questionId)} onClick={() => void swap(i)}>Swap</Button>
            <Button size="sm" variant="danger" onClick={() => setQs(qs.filter((_, k) => k !== i))}>Remove</Button>
          </li>
        ))}
      </ol>
      <div className="a-row" style={{ marginTop: 16, alignItems: "flex-end" }}>
        <Field label="Exam name"><input className="a-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="End of term exam" /></Field>
        <Field label="Pass mark %"><input className="a-input" type="number" min={1} max={100} style={{ width: 90 }} value={pass} onChange={(e) => setPass(Number(e.target.value))} /></Field>
        <Field label="Tries (blank = unlimited)"><input className="a-input" type="number" min={1} style={{ width: 110 }} value={tries} onChange={(e) => setTries(e.target.value ? Number(e.target.value) : "")} /></Field>
        <Field label="Opens on"><input className="a-input" type="date" value={opens} onChange={(e) => setOpens(e.target.value)} /></Field>
      </div>
      <div className="a-row" style={{ marginTop: 8 }}>
        <Button disabled={!title.trim() || qs.length === 0} onClick={() => void save(false)}>Save as draft</Button>
        <Button variant="primary" disabled={!title.trim() || qs.length === 0 || !opens} onClick={() => void save(true)}>Publish</Button>
      </div>
    </Card>
  );

  return (
    <Card title="Exams for this class" actions={<Button variant="primary" icon="plus" onClick={() => { setPicked(new Set(courses.map((c) => c.courseId))); setStep("blueprint"); }}>New exam</Button>}>
      {exams.loading && !exams.data ? <Skeleton /> : (exams.data?.exams.length ?? 0) === 0 ? <EmptyState title="No exams yet">Build one from the lessons this class covers. Children cannot see it until you publish it.</EmptyState> : (
        <ul className="a-list">{exams.data!.exams.map((e) => (
          <li key={e.id}>
            <div><div className="a-cell-title">{e.title}</div><div className="a-cell-sub">{e.questionCount} questions · pass {e.passPercent}% · {e.maxAttempts ?? "unlimited"} tries</div></div>
            <div className="a-row">
              {e.opensOn ? <Badge tone="green">Opens {e.opensOn}</Badge> : <Badge>Draft</Badge>}
              {e.opensOn ? <Button size="sm" onClick={() => void setOpen(e, null)}>Unpublish</Button> : <Button size="sm" variant="primary" onClick={() => void setOpen(e, new Date().toISOString().slice(0, 10))}>Publish today</Button>}
            </div>
          </li>
        ))}</ul>
      )}
    </Card>
  );
}
