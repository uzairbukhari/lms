import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, ErrorNote, PageHeader, Skeleton, ago, useFeedback } from "../ui";

type Ev = {
  id: string; kind: "hint" | "explain" | "define"; response: string; fromCache: boolean; flagged: boolean; createdAt: string; detail: string | null;
  childId: string | null; childName: string | null; prompt: string | null; lesson: string | null;
};
type Page = { events: Ev[]; next: string | null; children: { id: string; name: string }[]; flaggedCount: number };

const KIND: Record<Ev["kind"], string> = { hint: "Quiz hint", explain: "Why was I wrong?", define: "Word help" };

/** Every reply the AI helper showed a child. Mark a bad one and that question or word uses the stored text from then on. */
export function AiLog() {
  const [child, setChild] = useState("");
  const [kind, setKind] = useState("");
  const [flagged, setFlagged] = useState(false);
  const [events, setEvents] = useState<Ev[]>([]);
  const [meta, setMeta] = useState<Pick<Page, "children" | "flaggedCount">>({ children: [], flaggedCount: 0 });
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useFeedback();

  const query = (before?: string) => {
    const p = new URLSearchParams();
    if (child) p.set("child", child);
    if (kind) p.set("kind", kind);
    if (flagged) p.set("flagged", "1");
    if (before) p.set("before", before);
    return `/api/admin/ai-log?${p}`;
  };

  useEffect(() => {
    setLoading(true);
    api<Page>(query())
      .then((r) => { setEvents(r.events); setNext(r.next); setMeta({ children: r.children, flaggedCount: r.flaggedCount }); setError(""); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [child, kind, flagged]);

  async function more() {
    if (!next) return;
    try {
      const r = await api<Page>(query(next));
      setEvents((e) => [...e, ...r.events]);
      setNext(r.next);
    } catch (e) { toast(e instanceof Error ? e.message : "Could not load more.", true); }
  }

  async function flag(ev: Ev, value: boolean) {
    try {
      await api(`/api/admin/ai-log/${ev.id}/flag`, { body: { flagged: value } });
      setEvents((all) => all.map((x) => (x.id === ev.id ? { ...x, flagged: value } : x)));
      setMeta((m) => ({ ...m, flaggedCount: m.flaggedCount + (value ? 1 : -1) }));
      toast(value ? "Marked as bad. It will not be shown again; the stored text is used instead." : "Mark removed.");
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }

  return (
    <>
      <PageHeader title="AI replies" description="Everything the helper told the girls: quiz hints, 'why was I wrong?' and word help. Replies are checked by code first, and you can mark any you do not like." />
      <ErrorNote error={error} />
      <Card flush>
        <div className="a-toolbar">
          <select className="a-select" aria-label="Child" value={child} onChange={(e) => setChild(e.target.value)}>
            <option value="">All children</option>
            {meta.children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="a-select" aria-label="Kind of reply" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">All kinds</option>
            {Object.entries(KIND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <label className="a-check"><input type="checkbox" checked={flagged} onChange={(e) => setFlagged(e.target.checked)} /> Marked bad only ({meta.flaggedCount})</label>
        </div>
        {loading ? <Skeleton rows={5} /> : events.length === 0 ? (
          <EmptyState title="No AI replies yet">When a child asks for a hint or presses and holds a word, the reply is recorded here.</EmptyState>
        ) : (
          <ul className="a-list">
            {events.map((ev) => (
              <li key={ev.id} style={{ alignItems: "flex-start" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="a-row" style={{ gap: 6, marginBottom: 4 }}>
                    {ev.childId ? <Link to={`/admin/students/${ev.childId}`} className="a-cell-title">{ev.childName}</Link> : <span className="a-cell-title">{ev.childName ?? "Deleted child"}</span>}
                    <Badge tone="blue">{KIND[ev.kind]}</Badge>
                    {ev.fromCache && <Badge plain>Reused</Badge>}
                    {ev.flagged && <Badge tone="red">Marked bad</Badge>}
                    <span className="a-faint">{ago(ev.createdAt)}</span>
                  </div>
                  {(ev.prompt || ev.detail) && <div className="a-cell-sub">{ev.prompt ?? `Word ${ev.detail}`}{ev.lesson ? ` · ${ev.lesson}` : ""}</div>}
                  <p style={{ marginTop: 4 }}>{ev.response}</p>
                </div>
                <Button size="sm" variant={ev.flagged ? undefined : "danger"} onClick={() => void flag(ev, !ev.flagged)}>{ev.flagged ? "Undo" : "Bad reply"}</Button>
              </li>
            ))}
          </ul>
        )}
        {next && <div className="a-toolbar"><Button onClick={() => void more()}>Show older</Button></div>}
      </Card>
    </>
  );
}
