import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api";
import { LessonOutline } from "../LessonOutline";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, LinkButton, PageHeader, Skeleton, useFeedback, useLoad } from "../ui";

type Clip = { youtube: string; title: string; channel: string; seconds: number; madeForKids: boolean; needsTrim: boolean };
type Approved = { id: string; youtube: string; title: string; channel: string | null; start_sec: number; end_sec: number; caption: string | null; after_key: string | null };
type Slot = { key: string; label: string };

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Find a clip for a lesson, watch it here, then approve it with one click. Approved clips are added to the lesson at once. */
export function LessonVideos() {
  const { id } = useParams();
  const status = useLoad<{ configured: boolean }>("/api/admin/videos/status");
  const approved = useLoad<{ title: string; videos: Approved[]; slots: Slot[] }>(`/api/admin/lessons/${id}/videos`);
  const { toast } = useFeedback();
  const [query, setQuery] = useState("");
  const [clips, setClips] = useState<Clip[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [watching, setWatching] = useState<string | null>(null);
  const [range, setRange] = useState<Record<string, { start: number; end: number }>>({});

  useEffect(() => { if (approved.data && !query) setQuery(approved.data.title); }, [approved.data, query]);

  async function search() {
    setBusy(true); setError(""); setClips(null);
    try { setClips((await api<{ clips: Clip[] }>("/api/admin/videos/search", { body: { query } })).clips); }
    catch (e) { setError(e instanceof Error ? e.message : "Search failed."); }
    setBusy(false);
  }
  async function approve(c: Clip) {
    const r = range[c.youtube] ?? { start: 0, end: Math.min(c.seconds, 100) };
    try {
      await api(`/api/admin/lessons/${id}/videos`, { body: { youtube: c.youtube, start: r.start, end: r.end } });
      toast(`Added “${c.title}” to the lesson.`);
      await approved.reload();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not add it.", true); }
  }
  async function place(v: Approved, after: string) {
    try { await api(`/api/admin/lessons/${id}/videos/${v.youtube}/place`, { method: "PUT", body: { after: after || null } }); toast("Moved. Open the lesson preview to see it."); await approved.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not move it.", true); }
  }
  async function remove(v: Approved) {
    try { await api(`/api/admin/lessons/${id}/videos/${v.youtube}`, { method: "DELETE" }); toast("Removed from the lesson."); await approved.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not remove it.", true); }
  }

  if (status.loading) return <Skeleton rows={4} />;
  return (
    <>
      <PageHeader title={`Videos: ${approved.data?.title ?? "lesson"}`} description="Find a short, child-friendly clip (100 seconds at most), watch it, and approve it. Nothing reaches the children until you press Add." actions={<LinkButton to="/admin/lessons">Back to lessons</LinkButton>} />
      <ErrorNote error={status.error || approved.error} />

      {status.data && !status.data.configured && (
        <div className="a-alert amber">
          Video search is not switched on yet. In Cloudflare open Workers, lms, Settings, Variables and Secrets, add a secret named <b>YOUTUBE_API_KEY</b> with your YouTube Data API key, then refresh this page.
        </div>
      )}

      {id && <Card title="What this lesson teaches"><LessonOutline lessonId={id} /></Card>}

      <Card title="In this lesson">
        {(approved.data?.videos ?? []).length === 0 ? <EmptyState title="No video yet">Search below and add one.</EmptyState> : (
          <ul className="a-list">{approved.data?.videos.map((v) => (
            <li key={v.id} style={{ padding: "10px 0", borderTop: "1px solid var(--line, #e5e7eb)" }}>
              <div className="a-row" style={{ justifyContent: "space-between" }}>
                <span><b>{v.title}</b> <span className="a-faint">· {v.channel ?? "YouTube"} · {mmss(v.start_sec)} to {mmss(v.end_sec)} ({v.end_sec - v.start_sec}s)</span></span>
                <span className="a-row">
                  {id && <LinkButton size="sm" to={`/admin/lessons/${id}/preview`} newWindow>Preview lesson</LinkButton>}
                  <Button size="sm" onClick={() => void remove(v)}>Remove</Button>
                </span>
              </div>
              <Field label="Show this video after" help="Pick the part of the lesson where this topic is taught. The video gets its own slide right after it.">
                <select className="a-input" value={v.after_key ?? ""} onChange={(e) => void place(v, e.target.value)}>
                  <option value="">Near the end (before the summary)</option>
                  {(approved.data?.slots ?? []).map((sl) => <option key={sl.key} value={sl.key}>{sl.label}</option>)}
                </select>
              </Field>
            </li>
          ))}</ul>
        )}
      </Card>

      <Card title="Find a video">
        <form className="a-row" onSubmit={(e) => { e.preventDefault(); if (query.trim().length > 1) void search(); }}>
          <Field label="What should the video explain?"><input className="a-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="for example: food chains" /></Field>
          <Button variant="primary" type="submit" disabled={busy || !status.data?.configured}>{busy ? "Searching…" : "Search"}</Button>
        </form>
        <p className="a-faint">Searches are limited to videos YouTube says can be embedded, with strict safe search. “Animated” and “for kids” are added for you.</p>
        <ErrorNote error={error} />
        {clips && clips.length === 0 && <EmptyState title="No clips found">Try different words.</EmptyState>}
        <ul className="a-list">{(clips ?? []).map((c) => {
          const r = range[c.youtube] ?? { start: 0, end: Math.min(c.seconds, 100) };
          const added = approved.data?.videos.some((v) => v.youtube === c.youtube);
          return (
            <li key={c.youtube} style={{ padding: "12px 0", borderTop: "1px solid var(--line, #e5e7eb)" }}>
              <div className="a-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <span><b>{c.title}</b><br /><span className="a-faint">{c.channel} · {mmss(c.seconds)}</span>{" "}
                  {c.madeForKids && <Badge tone="green">Made for kids</Badge>} {c.needsTrim ? <Badge tone="amber">Over 100s: pick a part</Badge> : <Badge tone="blue">Under 100s</Badge>}</span>
                <span className="a-row">
                  <Button size="sm" onClick={() => setWatching(watching === c.youtube ? null : c.youtube)}>{watching === c.youtube ? "Close" : "Watch"}</Button>
                  <Button size="sm" variant="primary" disabled={added || r.end - r.start > 100 || r.end <= r.start} onClick={() => void approve(c)}>{added ? "Added" : "Add to lesson"}</Button>
                </span>
              </div>
              {c.needsTrim && (
                <div className="a-row" style={{ marginTop: 8 }}>
                  <Field label="Start (seconds)"><input className="a-input" type="number" min={0} max={c.seconds} value={r.start} onChange={(e) => setRange({ ...range, [c.youtube]: { ...r, start: Number(e.target.value) } })} /></Field>
                  <Field label="End (seconds)" help={r.end - r.start > 100 ? "That is more than 100 seconds." : undefined}><input className="a-input" type="number" min={1} max={c.seconds} value={r.end} onChange={(e) => setRange({ ...range, [c.youtube]: { ...r, end: Number(e.target.value) } })} /></Field>
                </div>
              )}
              {watching === c.youtube && (
                <div style={{ marginTop: 12, maxWidth: 640, aspectRatio: "16 / 9" }}>
                  <iframe title={c.title} style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen allow="encrypted-media; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation" referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://www.youtube-nocookie.com/embed/${c.youtube}?start=${r.start}&end=${r.end}&rel=0&modestbranding=1`} />
                </div>
              )}
            </li>
          );
        })}</ul>
      </Card>
    </>
  );
}
