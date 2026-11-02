import { useState } from "react";
import { useNavigate } from "react-router";
import type { LessonIssue } from "@lms/schema";
import { api, ApiError } from "../../api";
import { Button, Card, Icon, PageHeader, useFeedback } from "../ui";

type Summary = { title: string; blocks: number; questions: number };

export function LessonImport() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<LessonIssue[]>([]);
  const [summary, setSummary] = useState<{ s: Summary; missing: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useFeedback();
  const nav = useNavigate();

  function parse(): unknown | undefined {
    try {
      // Claude sometimes wraps JSON in a ```json fence: accept that too.
      return JSON.parse(text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
    } catch {
      setSummary(null);
      setIssues([{ path: "(file)", message: "This is not valid JSON. Paste only the JSON from Claude (the part inside the code block)." }]);
      return undefined;
    }
  }

  async function submit(mode: "validate" | "draft" | "publish") {
    const file = parse();
    if (file === undefined) return;
    setBusy(true);
    setIssues([]);
    setSummary(null);
    try {
      if (mode === "validate") {
        const r = await api<{ ok: boolean; issues?: LessonIssue[]; summary?: Summary; missingAssets?: string[] }>("/api/admin/lessons/validate", { body: { file } });
        if (!r.ok) setIssues(r.issues ?? []);
        else if (r.summary) setSummary({ s: r.summary, missing: r.missingAssets ?? [] });
      } else {
        const r = await api<{ lesson: { version: number; created: boolean; status: string }; missingAssets: string[] }>("/api/admin/lessons/import", { body: { file, publish: mode === "publish" } });
        toast(`${r.lesson.created ? "Saved" : `Updated to version ${r.lesson.version}`} as ${r.lesson.status}.${r.missingAssets.length ? ` Upload these images: ${r.missingAssets.join(", ")}.` : ""}`);
        nav("/admin/lessons");
      }
    } catch (e) {
      if (e instanceof ApiError && e.code === "invalid_lesson") setIssues((e.body.issues as LessonIssue[] | undefined) ?? []);
      else toast(e instanceof Error ? e.message : "Something went wrong", true);
    } finally {
      setBusy(false);
    }
  }

  const fixRequest = () =>
    `Please fix these problems in the lesson JSON and give me the corrected JSON only (same format, schema_version "1.0"):\n` + issues.map((i) => `- ${i.path}: ${i.message}`).join("\n");

  return (
    <>
      <PageHeader title="Import a lesson" description="Paste the lesson JSON Claude wrote. Check it first, then save it as a draft or publish it straight away. Importing the same lesson again makes a new version." />
      <div className="a-grid split">
        <Card title="Lesson JSON">
          <textarea className="a-textarea mono" rows={22} value={text} onChange={(e) => { setText(e.target.value); setIssues([]); setSummary(null); }} spellCheck={false} aria-label="Lesson JSON" placeholder='{ "schema_version": "1.0", … }' />
          <div className="a-row">
            <Button disabled={busy || !text.trim()} onClick={() => void submit("validate")}>Check it</Button>
            <span className="a-spacer" />
            <Button disabled={busy || !text.trim()} onClick={() => void submit("draft")}>Save as draft</Button>
            <Button variant="primary" disabled={busy || !text.trim()} onClick={() => void submit("publish")}>Save and publish</Button>
          </div>
        </Card>
        <Card title="Check result">
          {!issues.length && !summary && <p className="a-muted">Run “Check it” to see whether the lesson is valid. Nothing is saved by checking.</p>}
          {summary && (
            <>
              <div className="a-alert" style={{ background: "var(--a-green-bg)", color: "var(--a-green)" }} role="status"><Icon name="check" /> Looks good: “{summary.s.title}” has {summary.s.blocks} blocks and {summary.s.questions} quiz questions.</div>
              {summary.missing.length > 0 && <div className="a-alert">Upload these files in the <a href="/admin/media">Media library</a> before publishing: {summary.missing.join(", ")}.</div>}
            </>
          )}
          {issues.length > 0 && (
            <div role="alert" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <strong>Fix these first ({issues.length})</strong>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>{issues.map((i, n) => <li key={n}><code>{i.path}</code> {i.message}</li>)}</ul>
              <div><Button icon="copy" onClick={() => void navigator.clipboard.writeText(fixRequest()).then(() => toast("Fix request copied. Paste it to Claude."))}>Copy a fix request for Claude</Button></div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
