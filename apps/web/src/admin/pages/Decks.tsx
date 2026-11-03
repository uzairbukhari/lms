import { useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../api";
import { Button, Card, EmptyState, ErrorNote, Field, PageHeader, Skeleton, SUBJECT_NAMES, useFeedback, useLoad } from "../ui";

type Deck = { id: string; title: string; subject: string | null; cardCount: number; assignedTo: string[] };
type Cls = { id: string; name: string };
type Kid = { id: string; displayName: string };
const SUBJECT_IDS = Object.keys(SUBJECT_NAMES);

/** Your own flashcard decks (times tables, spelling lists, capitals…). One card per line: front | back. */
export function Decks() {
  const decks = useLoad<{ decks: Deck[] }>("/api/admin/decks");
  const classes = useLoad<{ classes: Cls[] }>("/api/admin/classes");
  const students = useLoad<{ students: Kid[] }>("/api/admin/students");
  const { toast, confirm } = useFeedback();
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [pairs, setPairs] = useState("");
  const [classIds, setClassIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const flip = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const create = async () => {
    setBusy(true);
    try {
      const r = await api<{ cards: number }>("/api/admin/decks", { body: { title, subjectId: subjectId || null, pairs, classIds, userIds } });
      toast(`Deck made with ${r.cards} cards.`);
      setTitle(""); setPairs(""); setClassIds([]); setUserIds([]);
      await decks.reload();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not make the deck.", true); }
    finally { setBusy(false); }
  };
  const remove = async (d: Deck) => {
    if (!(await confirm({ title: `Delete “${d.title}”?`, message: "The deck and the children's progress on its cards are deleted for good.", confirmLabel: "Delete deck", danger: true }))) return;
    try { await api(`/api/admin/decks/${d.id}`, { method: "DELETE" }); toast("Deck deleted."); await decks.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Could not delete.", true); }
  };
  const list = decks.data?.decks ?? [];

  return (
    <>
      <PageHeader title="Flashcard decks" description="Make your own decks. They join each child's daily cards, spaced out so tricky ones come back more often." />
      <ErrorNote error={decks.error} />
      <Card title="Make a deck">
        <div className="a-stack" style={{ gap: 12 }}>
          <Field label="Name"><input className="a-input" value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} placeholder="Times tables: 7s" /></Field>
          <Field label="Subject (optional)">
            <select className="a-select" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">No subject</option>
              {SUBJECT_IDS.map((s) => <option key={s} value={s}>{SUBJECT_NAMES[s]}</option>)}
            </select>
          </Field>
          <Field label="Cards" help="One card per line: front | back. Add a third part for a picture emoji, like: cat | a small pet | 🐱">
            <textarea className="a-input" rows={8} value={pairs} onChange={(e) => setPairs(e.target.value)} placeholder={"7 x 8 | 56\n7 x 9 | 63"} />
          </Field>
          <Field label="Give it to">
            <div className="a-row" style={{ gap: 12, flexWrap: "wrap" }}>
              {(classes.data?.classes ?? []).map((c) => <label key={c.id} className="a-check"><input type="checkbox" checked={classIds.includes(c.id)} onChange={() => setClassIds(flip(classIds, c.id))} /> Class: {c.name}</label>)}
              {(students.data?.students ?? []).map((s) => <label key={s.id} className="a-check"><input type="checkbox" checked={userIds.includes(s.id)} onChange={() => setUserIds(flip(userIds, s.id))} /> {s.displayName}</label>)}
            </div>
          </Field>
          <div><Button variant="primary" icon="plus" disabled={busy || !title.trim() || !pairs.trim()} onClick={() => void create()}>{busy ? "Making…" : "Make deck"}</Button></div>
        </div>
      </Card>
      <Card flush title="Your decks">
        {decks.loading ? <Skeleton rows={3} /> : list.length === 0 ? <EmptyState title="No decks yet">Make your first one above.</EmptyState> : (
          <ul className="a-list">
            {list.map((d) => (
              <li key={d.id}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="a-cell-title">{d.title}</div>
                  <div className="a-faint">{d.cardCount} cards{d.subject ? ` · ${SUBJECT_NAMES[d.subject] ?? d.subject}` : ""} · {d.assignedTo.length ? `for ${d.assignedTo.join(", ")}` : "not given to anyone yet"}</div>
                </div>
                <Link className="a-btn sm" to={`/admin/decks/${d.id}/print`}>Print</Link>
                <Button size="sm" variant="danger" onClick={() => void remove(d)}>Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

/** Cut-out cards: fronts and backs side by side, to print and fold or cut. */
export function DeckPrint() {
  const { id } = useParams();
  const data = useLoad<{ deck: { title: string }; cards: { front: string; back: string; emoji: string | null }[] }>(`/api/admin/decks/${id}`);
  return (
    <>
      <PageHeader title={data.data?.deck.title ?? "Deck"} description="Print this page, then cut along the lines. Left is the front, right is the back." actions={<span className="no-print"><Button variant="primary" onClick={() => window.print()}>Print</Button> <Link className="a-btn" to="/admin/decks">Back</Link></span>} />
      <ErrorNote error={data.error} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px dashed #888" }}>
        {(data.data?.cards ?? []).map((c, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{ border: "1px dashed #888", padding: 16, fontSize: 20, fontWeight: 700, minHeight: 70 }}>{c.emoji ? `${c.emoji} ` : ""}{c.front}</div>
            <div style={{ border: "1px dashed #888", padding: 16, fontSize: 20, minHeight: 70 }}>{c.back}</div>
          </div>
        ))}
      </div>
    </>
  );
}
