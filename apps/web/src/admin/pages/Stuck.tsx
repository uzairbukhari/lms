import { Link } from "react-router";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, ErrorNote, PageHeader, Skeleton, SUBJECT_NAMES, ago, useFeedback, useLoad } from "../ui";

type Flag = { id: string; status: "open" | "done"; slide: number | null; createdAt: string; childId: string; childName: string; lessonId: string; lesson: string; subject: string; question: string | null };

/** Spots the children marked "I'm stuck". Each one is a hint about a confusing slide or question. */
export function Stuck() {
  const flags = useLoad<{ flags: Flag[] }>("/api/admin/stuck");
  const { toast } = useFeedback();
  const set = async (f: Flag, done: boolean) => {
    try { await api(`/api/admin/stuck/${f.id}/done`, { method: "POST", body: { done } }); await flags.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  };
  const list = flags.data?.flags ?? [];
  return (
    <>
      <PageHeader title="Stuck spots" description="Places the children pressed “I'm stuck”. Use them to fix a confusing slide or question, then mark them done." />
      <ErrorNote error={flags.error} />
      <Card flush>
        {flags.loading ? <Skeleton rows={4} /> : list.length === 0 ? (
          <EmptyState title="Nothing flagged">When a child presses “I'm stuck” on a slide or quiz question, it shows here.</EmptyState>
        ) : (
          <ul className="a-list">
            {list.map((f) => (
              <li key={f.id} style={{ alignItems: "flex-start" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="a-row" style={{ gap: 6, marginBottom: 4 }}>
                    <Link to={`/admin/students/${f.childId}`} className="a-cell-title">{f.childName}</Link>
                    <Badge tone={f.status === "open" ? "amber" : "green"}>{f.status === "open" ? "Open" : "Done"}</Badge>
                    <span className="a-faint">{SUBJECT_NAMES[f.subject] ?? f.subject} · {ago(f.createdAt)}</span>
                  </div>
                  <div><Link to={`/admin/lessons/${f.lessonId}/edit`}>{f.lesson}</Link>{f.question ? <> · question: “{f.question}”</> : f.slide !== null ? <> · slide {f.slide + 1}</> : null}</div>
                </div>
                <Button size="sm" onClick={() => void set(f, f.status === "open")}>{f.status === "open" ? "Mark done" : "Reopen"}</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
