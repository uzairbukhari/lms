import { useState } from "react";
import { Badge, Button, ErrorNote, Skeleton, useFeedback, useLoad } from "./ui";

type Outline = {
  title: string; objectives: string[]; summary: string[]; transcript: string;
  sections: { heading: string; points: string[]; terms: string[]; activities: string[] }[];
  glossary: { term: string; meaning: string }[];
};

/** What a lesson teaches, stop by stop, with the full transcript behind a toggle. Used beside the video search and in a drawer. */
export function LessonOutline({ lessonId }: { lessonId: string }) {
  const o = useLoad<Outline>(`/api/admin/lessons/${lessonId}/outline`);
  const { toast } = useFeedback();
  const [full, setFull] = useState(false);
  if (o.loading && !o.data) return <Skeleton rows={4} />;
  if (!o.data) return <ErrorNote error={o.error} />;
  const d = o.data;
  const copy = async () => { try { await navigator.clipboard.writeText(d.transcript); toast("Transcript copied."); } catch { toast("Could not copy.", true); } };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {d.objectives.length > 0 && (
        <div><b>Children will learn to</b><ul style={{ margin: "6px 0 0 18px" }}>{d.objectives.map((x) => <li key={x}>{x}</li>)}</ul></div>
      )}
      {d.sections.map((s, i) => (
        <div key={i}>
          <b>{s.heading}</b>
          {s.points.length > 0 && <ul style={{ margin: "4px 0 0 18px" }}>{s.points.map((p, j) => <li key={j}>{p}</li>)}</ul>}
          {s.terms.length > 0 && <div className="a-row" style={{ marginTop: 6 }}>{s.terms.map((t) => <Badge key={t} tone="blue" plain>{t}</Badge>)}</div>}
          {s.activities.length > 0 && <div className="a-faint" style={{ marginTop: 4 }}>{s.activities.join(" · ")}</div>}
        </div>
      ))}
      {d.summary.length > 0 && <div><b>Summary</b><ul style={{ margin: "6px 0 0 18px" }}>{d.summary.map((x) => <li key={x}>{x}</li>)}</ul></div>}
      <div className="a-row">
        <Button size="sm" onClick={() => setFull(!full)}>{full ? "Hide transcript" : "Show full transcript"}</Button>
        <Button size="sm" onClick={() => void copy()}>Copy transcript</Button>
      </div>
      {full && <pre style={{ whiteSpace: "pre-wrap", font: "inherit", margin: 0, maxHeight: 420, overflow: "auto" }} className="a-muted">{d.transcript}</pre>}
    </div>
  );
}
