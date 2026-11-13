import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../../api";
import { lessonChecks } from "../../lib/lessonChecks";
import { editableFields, getAt, setAt, type Path } from "../../lib/lessonEdit";
import { Badge, Button, Card, ErrorNote, PageHeader, Skeleton, Tabs, useFeedback, useLoad } from "../ui";
import { useCrumb } from "../Shell";

type Detail = { lesson: { id: string; slug: string; status: string; version: number; file: Record<string, any> } };
type Group = "lesson" | "slides" | "quiz";
const DEVICES = [{ id: "phone", label: "Phone", w: 390, h: 760 }, { id: "tablet", label: "Tablet", w: 820, h: 1000 }, { id: "desktop", label: "Desktop", w: 1280, h: 800 }] as const;

/** Fix wording in a lesson without going back to Claude. Saving imports the file as a new version, so past attempts stay as they were. */
export function LessonEdit() {
  const { id = "" } = useParams();
  const { data, error, reload } = useLoad<Detail>(`/api/admin/lessons/${id}`);
  const { toast } = useFeedback();
  const [file, setFile] = useState<Record<string, any> | null>(null);
  const [tab, setTab] = useState<Group>("quiz");
  const [saving, setSaving] = useState(false);
  const [issues, setIssues] = useState<string[]>([]);
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("tablet");
  const [version, setVersion] = useState(0);
  const [ages, setAges] = useState<{ min: number; max: number } | null>(null);
  useCrumb(data ? String(data.lesson.file.lesson?.title ?? "Edit") : undefined);

  const meta = useLoad<{ lessons: { id: string; ageMin: number | null; ageMax: number | null }[] }>("/api/admin/lessons");
  useEffect(() => { if (data) setFile(structuredClone(data.lesson.file)); }, [data]);
  useEffect(() => { const m = meta.data?.lessons.find((l) => l.id === id); if (m) setAges({ min: m.ageMin ?? 7, max: m.ageMax ?? 8 }); }, [meta.data, id]);
  const original = data?.lesson.file;
  const fields = useMemo(() => (file ? editableFields(file) : []), [file]);
  const changed = (path: Path) => original !== undefined && JSON.stringify(getAt(file, path)) !== JSON.stringify(getAt(original, path));
  const dirty = useMemo(() => (original && file ? JSON.stringify(original) !== JSON.stringify(file) : false), [original, file]);

  if (error && !data) return <><PageHeader title="Edit lesson" /><ErrorNote error={error} /></>;
  if (!file || !data) return <div className="a-card"><Skeleton rows={6} /></div>;

  const set = (path: Path, value: unknown) => setFile((f) => (f ? setAt(f, path, value) : f));
  const shown = fields.filter((f) => f.group === tab);
  const questions: { type: string; options?: { id: string; text: string }[]; answer: unknown }[] = file.quiz?.questions ?? [];

  async function saveAges() {
    if (!ages) return;
    try { await api(`/api/admin/lessons/${id}/meta`, { method: "PUT", body: { ageMin: ages.min, ageMax: ages.max } }); toast("Age range saved."); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not save the age range.", true); }
  }

  async function save() {
    setSaving(true);
    setIssues([]);
    try {
      const r = await api<{ lesson: { version: number } }>("/api/admin/lessons/import", { body: { file, publish: false } });
      toast(`Saved as version ${r.lesson.version}. Earlier attempts keep the questions they were given.`);
      await reload();
      setVersion((v) => v + 1);
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
      <div className="a-grid cols-2" style={{ marginBottom: 16 }}>
        <Card title="Who it is for">
          <div className="a-row" style={{ alignItems: "flex-end" }}>
            <label className="a-field"><span className="lab">Youngest age</span><input className="a-input" type="number" min={3} max={18} style={{ width: 90 }} value={ages?.min ?? ""} onChange={(e) => setAges({ min: Number(e.target.value), max: ages?.max ?? 8 })} /></label>
            <label className="a-field"><span className="lab">Oldest age</span><input className="a-input" type="number" min={3} max={18} style={{ width: 90 }} value={ages?.max ?? ""} onChange={(e) => setAges({ min: ages?.min ?? 7, max: Number(e.target.value) })} /></label>
            <Button onClick={() => void saveAges()} disabled={!ages}>Save ages</Button>
          </div>
          <p className="a-faint" style={{ marginTop: 8 }}>Used to filter lessons and courses. Change tags from the Lessons list.</p>
        </Card>
        <Card title="Checks">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
            {lessonChecks(file).map((c, i) => <li key={i} className="a-row"><Badge tone={c.level === "ok" ? "green" : "amber"}>{c.level === "ok" ? "OK" : "Check"}</Badge> {c.text}</li>)}
          </ul>
        </Card>
        <Card title="Live preview" actions={<div className="a-row">{DEVICES.map((d) => <Button key={d.id} size="sm" variant={device === d.id ? "primary" : undefined} aria-pressed={device === d.id} onClick={() => setDevice(d.id)}>{d.label}</Button>)}</div>}>
          {(() => { const d = DEVICES.find((x) => x.id === device)!; const scale = Math.min(1, 560 / d.w); return (
            <div style={{ width: d.w * scale, height: d.h * scale, overflow: "hidden", border: "1px solid var(--a-border, #e2e8f0)", borderRadius: 12, margin: "0 auto" }}>
              <iframe key={`${device}-${version}`} title="Lesson preview" src={`/admin/lessons/${id}/preview`} style={{ width: d.w, height: d.h, border: 0, transform: `scale(${scale})`, transformOrigin: "top left" }} />
            </div>); })()}
          <p className="a-faint" style={{ marginTop: 8 }}>Shows the last saved version. It refreshes after you save.</p>
        </Card>
      </div>
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
