import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../../api";
import { editableFields, getAt, setAt, type Path } from "../../lib/lessonEdit";
import { Badge, Button, Card, ErrorNote, PageHeader, Skeleton, Tabs, useFeedback, useLoad } from "../ui";
import { useCrumb } from "../Shell";

type Detail = { lesson: { id: string; slug: string; status: string; version: number; file: Record<string, any> } };
type Group = "lesson" | "slides" | "quiz";

/** Fix wording in a lesson without going back to Claude. Saving imports the file as a new version, so past attempts stay as they were. */
export function LessonEdit() {
  const { id = "" } = useParams();
  const { data, error, reload } = useLoad<Detail>(`/api/admin/lessons/${id}`);
  const { toast } = useFeedback();
  const [file, setFile] = useState<Record<string, any> | null>(null);
  const [tab, setTab] = useState<Group>("quiz");
  const [saving, setSaving] = useState(false);
  const [issues, setIssues] = useState<string[]>([]);
  useCrumb(data ? String(data.lesson.file.lesson?.title ?? "Edit") : undefined);

  useEffect(() => { if (data) setFile(structuredClone(data.lesson.file)); }, [data]);
  const original = data?.lesson.file;
  const fields = useMemo(() => (file ? editableFields(file) : []), [file]);
  const changed = (path: Path) => original !== undefined && JSON.stringify(getAt(file, path)) !== JSON.stringify(getAt(original, path));
  const dirty = useMemo(() => (original && file ? JSON.stringify(original) !== JSON.stringify(file) : false), [original, file]);

  if (error && !data) return <><PageHeader title="Edit lesson" /><ErrorNote error={error} /></>;
  if (!file || !data) return <div className="a-card"><Skeleton rows={6} /></div>;

  const set = (path: Path, value: unknown) => setFile((f) => (f ? setAt(f, path, value) : f));
  const shown = fields.filter((f) => f.group === tab);
  const questions: { type: string; options?: { id: string; text: string }[]; answer: unknown }[] = file.quiz?.questions ?? [];

  async function save() {
    setSaving(true);
    setIssues([]);
    try {
      const r = await api<{ lesson: { version: number } }>("/api/admin/lessons/import", { body: { file, publish: false } });
      toast(`Saved as version ${r.lesson.version}. Earlier attempts keep the questions they were given.`);
      await reload();
    } catch (e) {
      if (e instanceof ApiError && Array.isArray(e.body.issues)) setIssues((e.body.issues as { path?: string; message?: string }[]).map((i) => `${i.path ?? ""} ${i.message ?? ""}`.trim()));
      toast(e instanceof Error ? e.message : "Could not save.", true);
    }
    setSaving(false);
  }

  return (
    <>
      <PageHeader
        title={`Quick edit: ${file.lesson?.title ?? ""}`}
        description={`Fix wording, hints and answers. Version ${data.lesson.version} now; saving makes version ${data.lesson.version + 1} and keeps the lesson ${data.lesson.status}.`}
        actions={<>
          <Link className="a-btn" to={`/admin/lessons/${id}/preview`} target="_blank" rel="noreferrer">Preview saved version</Link>
          <Button onClick={() => setFile(structuredClone(data.lesson.file))} disabled={!dirty}>Undo all</Button>
          <Button variant="primary" onClick={() => void save()} disabled={!dirty || saving}>{saving ? "Saving…" : "Save as new version"}</Button>
        </>}
      />
      {issues.length > 0 && <div className="a-alert red" role="alert"><div>The lesson did not pass its checks:<ul>{issues.map((m, i) => <li key={i}>{m}</li>)}</ul></div></div>}
      <Tabs<Group> value={tab} onChange={setTab} tabs={[{ id: "quiz", label: "Quiz" }, { id: "slides", label: "Slides" }, { id: "lesson", label: "Title and summary" }]} />
      <Card flush>
        <ul className="a-list">
          {shown.map((f) => (
            <li key={f.path.join(".")} style={{ display: "block" }}>
              <label className="a-field">
                <span className="lab">{f.label} {changed(f.path) && <Badge tone="amber">Changed</Badge>}</span>
                {f.multiline
                  ? <textarea className="a-textarea" rows={Math.min(8, Math.ceil(f.value.length / 90) + 1)} value={String(getAt(file, f.path) ?? "")} onChange={(e) => set(f.path, e.target.value)} />
                  : <input className="a-input" value={String(getAt(file, f.path) ?? "")} onChange={(e) => set(f.path, e.target.value)} />}
              </label>
            </li>
          ))}
          {tab === "quiz" && questions.map((q, i) =>
            q.type === "multiple_choice" && Array.isArray(q.answer) && q.options ? (
              <li key={`ans${i}`} style={{ display: "block" }}>
                <label className="a-field">
                  <span className="lab">Question {i + 1} · Correct answer {changed(["quiz", "questions", i, "answer"]) && <Badge tone="amber">Changed</Badge>}</span>
                  <select className="a-select" value={String(q.answer[0] ?? "")} onChange={(e) => set(["quiz", "questions", i, "answer"], [e.target.value])}>
                    {q.options.map((o) => <option key={o.id} value={o.id}>{o.text}</option>)}
                  </select>
                </label>
              </li>
            ) : q.type === "true_false" && Array.isArray(q.answer) ? (
              <li key={`ans${i}`} style={{ display: "block" }}>
                <label className="a-field">
                  <span className="lab">Question {i + 1} · Correct answer {changed(["quiz", "questions", i, "answer"]) && <Badge tone="amber">Changed</Badge>}</span>
                  <select className="a-select" value={String(q.answer[0])} onChange={(e) => set(["quiz", "questions", i, "answer"], [e.target.value === "true"])}>
                    <option value="true">True</option><option value="false">False</option>
                  </select>
                </label>
              </li>
            ) : null,
          )}
          {shown.length === 0 && <li><span className="a-muted">Nothing to edit here.</span></li>}
        </ul>
      </Card>
      <p className="a-faint">Only wording and single-answer questions can be changed here. To add questions, slides or pictures, ask Claude and import the new file.</p>
    </>
  );
}
