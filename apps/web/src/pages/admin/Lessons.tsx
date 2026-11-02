import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { SUBJECTS, type LessonIssue } from "@lms/schema";
import { api, ApiError } from "../../api";

type LessonRow = {
  id: string; slug: string; title: string; subject: string; status: "draft" | "published" | "archived";
  version: number; unit: string | null; ageBand: string; questionCount: number;
  slots: { courseTitle: string; semester: number | null; week: number | null }[];
};
type Asset = { id: string; filename: string; mimeType: string; sizeBytes: number };

export const SUBJECT_NAMES: Record<string, string> = {
  maths: "Maths", science: "Science", "data-ai": "Computer Science, Data & AI", "general-knowledge": "General Knowledge",
};

export function Lessons() {
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState("");
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<LessonIssue[]>([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [l, a] = await Promise.all([
      api<{ lessons: LessonRow[] }>("/api/admin/lessons"),
      api<{ assets: Asset[] }>("/api/admin/assets"),
    ]);
    setLessons(l.lessons);
    setAssets(a.assets);
  }, []);
  useEffect(() => { load().catch((e: Error) => setNotice(e.message)); }, [load]);

  function parse(): unknown | undefined {
    try {
      // Claude sometimes wraps JSON in a ```json fence: accept that too.
      return JSON.parse(text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
    } catch {
      setIssues([{ path: "(file)", message: "This is not valid JSON. Paste only the JSON from Claude (the part inside the code block)." }]);
      setNotice("");
      return undefined;
    }
  }

  async function submit(mode: "validate" | "draft" | "publish") {
    const file = parse();
    if (file === undefined) return;
    setBusy(true);
    setIssues([]);
    setNotice("");
    try {
      if (mode === "validate") {
        const r = await api<{ ok: boolean; issues?: LessonIssue[]; summary?: { title: string; blocks: number; questions: number }; missingAssets?: string[] }>(
          "/api/admin/lessons/validate", { body: { file } });
        if (!r.ok) setIssues(r.issues ?? []);
        else setNotice(`Looks good: "${r.summary?.title}" has ${r.summary?.blocks} blocks and ${r.summary?.questions} quiz questions.${warnAssets(r.missingAssets)}`);
      } else {
        const r = await api<{ lesson: { version: number; created: boolean; status: string }; missingAssets: string[] }>(
          "/api/admin/lessons/import", { body: { file, publish: mode === "publish" } });
        setNotice(`${r.lesson.created ? "Saved" : `Updated to version ${r.lesson.version}`} as ${r.lesson.status}.${warnAssets(r.missingAssets)}`);
        setText("");
        await load();
      }
    } catch (e) {
      if (e instanceof ApiError && e.code === "invalid_lesson") {
        setIssues((e.body.issues as LessonIssue[] | undefined) ?? []);
      } else setNotice(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const warnAssets = (m?: string[]) => (m?.length ? ` Upload these images before publishing: ${m.join(", ")}.` : "");

  const fixRequest = () =>
    `Please fix these problems in the lesson JSON and give me the corrected JSON only (same format, schema_version "1.0"):\n` +
    issues.map((i) => `- ${i.path}: ${i.message}`).join("\n");

  async function setStatus(id: string, status: LessonRow["status"]) {
    await api(`/api/admin/lessons/${id}`, { method: "PATCH", body: { status } });
    await load();
  }

  async function copySource(id: string) {
    const r = await api<{ lesson: { file: unknown } }>(`/api/admin/lessons/${id}`);
    await navigator.clipboard.writeText(JSON.stringify(r.lesson.file, null, 2));
    setNotice("Copied the lesson JSON. Paste it to Claude to change it, then import the new version.");
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/admin/assets", { method: "POST", body: form });
    const data = (await res.json()) as { message?: string; asset?: { filename: string } };
    setNotice(res.ok ? `Uploaded as "${data.asset?.filename}". Use that name in an image block's "asset" field.` : (data.message ?? "Upload failed"));
    await load();
  }

  const shown = lessons.filter((l) => !filter || l.subject === filter);
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-3xl font-extrabold">Lessons</h1>
      {notice && <p role="status" className="text-lg font-bold">{notice}</p>}

      <section className="card flex flex-col gap-3 p-5" aria-labelledby="imp">
        <h2 id="imp" className="font-display text-xl font-bold">Import a lesson from Claude</h2>
        <label className="flex flex-col gap-1 font-bold">
          Paste the lesson JSON
          <textarea className="input py-2 font-mono text-sm" rows={10} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
        </label>
        <div className="flex flex-wrap gap-2">
          <button className="btn" disabled={busy || !text.trim()} onClick={() => void submit("validate")}>Check it</button>
          <button className="btn" disabled={busy || !text.trim()} onClick={() => void submit("draft")}>Save as draft</button>
          <button className="btn btn-primary" disabled={busy || !text.trim()} onClick={() => void submit("publish")}>Save and publish</button>
        </div>
        {issues.length > 0 && (
          <div role="alert" className="flex flex-col gap-2">
            <p className="font-bold">Fix these first:</p>
            <ul className="list-disc pl-6">{issues.map((i, n) => <li key={n}><code>{i.path}</code>: {i.message}</li>)}</ul>
            <button className="btn self-start" onClick={() => void navigator.clipboard.writeText(fixRequest())}>Copy a fix request for Claude</button>
          </div>
        )}
      </section>

      <section className="card flex flex-col gap-3 p-5" aria-labelledby="up">
        <h2 id="up" className="font-display text-xl font-bold">Pictures and sounds</h2>
        <label className="flex flex-col gap-1 font-bold">
          Upload a png, jpg, webp, gif, svg or mp3 (up to 8 MB)
          <input type="file" accept=".png,.jpg,.jpeg,.webp,.gif,.svg,.mp3" className="input py-2" onChange={(e) => void upload(e.target.files?.[0])} />
        </label>
        {assets.length > 0 && <p className="text-muted">Uploaded: {assets.map((a) => a.filename).join(", ")}</p>}
      </section>

      <section aria-label="All lessons" className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-bold">
          Show
          <select className="input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All subjects</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}
          </select>
        </label>
        {shown.length === 0 && <p className="text-lg">No lessons yet. Import your first one above.</p>}
        {shown.map((l) => (
          <article key={l.id} className="card flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-48 flex-1">
              <h3 className="font-display text-xl font-bold">{l.title}</h3>
              <p className="text-muted">
                {SUBJECT_NAMES[l.subject]} · {l.status} · v{l.version} · {l.questionCount} questions · ages {l.ageBand}
                {l.slots.map((s, i) => <span key={i}> · {s.courseTitle}{s.semester ? ` S${s.semester} W${s.week}` : " (unscheduled)"}</span>)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className="btn inline-flex items-center" to={`/admin/lessons/${l.id}/preview`}>Preview</Link>
              {l.status !== "published" && <button className="btn" onClick={() => void setStatus(l.id, "published")}>Publish</button>}
              {l.status === "published" && <button className="btn" onClick={() => void setStatus(l.id, "draft")}>Unpublish</button>}
              {l.status !== "archived" && <button className="btn" onClick={() => void setStatus(l.id, "archived")}>Archive</button>}
              <button className="btn" onClick={() => void copySource(l.id)}>Copy JSON</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
