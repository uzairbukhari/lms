import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../api";
import { Button, Card, EmptyState, ErrorNote, Field, Skeleton, useFeedback, useLoad } from "../ui";

type Row = { courseId: string; title: string; unlockRule: "mastery" | "open" | "drip"; passPercent: number; dripStart: string | null; dripEveryDays: number | null; lessons?: number };

const RULES = [
  { id: "mastery", label: "Mastery path", help: "The next lesson opens when the big quiz is passed." },
  { id: "open", label: "All open", help: "Every lesson is open from the start." },
  { id: "drip", label: "Drip", help: "One more lesson opens every few days." },
] as const;

/** The courses in a class and how each one unlocks. Saves the whole list in order. */
export function ClassCourses({ classId, all, onChanged }: { classId: string; all: { id: string; title: string }[]; onChanged: () => void }) {
  const got = useLoad<{ courses: Row[] }>(`/api/admin/classes/${classId}/courses`);
  const { toast } = useFeedback();
  const [rows, setRows] = useState<Row[]>([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { if (got.data) { setRows(got.data.courses); setDirty(false); } }, [got.data]);
  const change = (n: Row[]) => { setRows(n); setDirty(true); };
  const patch = (i: number, p: Partial<Row>) => change(rows.map((r, k) => (k === i ? { ...r, ...p } : r)));
  const swap = (i: number, j: number) => { const n = [...rows]; [n[i], n[j]] = [n[j]!, n[i]!]; change(n); };
  const free = all.filter((c) => !rows.some((r) => r.courseId === c.id));

  async function save() {
    try {
      await api(`/api/admin/classes/${classId}/courses`, { method: "PUT", body: { courses: rows.map((r) => ({ courseId: r.courseId, unlockRule: r.unlockRule, passPercent: r.passPercent, dripStart: r.unlockRule === "drip" ? r.dripStart : null, dripEveryDays: r.unlockRule === "drip" ? r.dripEveryDays : null })) } });
      toast("Courses saved."); await got.reload(); onChanged();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }

  if (got.loading && !got.data) return <Skeleton />;
  return (
    <Card title="Courses in this class" actions={<div className="a-row">
      {free.length > 0 && <select className="a-select" aria-label="Add a course" value="" onChange={(e) => { const c = all.find((x) => x.id === e.target.value); if (c) change([...rows, { courseId: c.id, title: c.title, unlockRule: "mastery", passPercent: 70, dripStart: null, dripEveryDays: null }]); }}><option value="">Add a course…</option>{free.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>}
      <Button variant="primary" disabled={!dirty} onClick={() => void save()}>{dirty ? "Save changes" : "Saved"}</Button>
    </div>}>
      <ErrorNote error={got.error} />
      {rows.length === 0 ? <EmptyState title="No courses in this class">Children see no lessons until you add a course.</EmptyState> : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
          {rows.map((r, i) => (
            <li key={r.courseId} style={{ border: "1px solid var(--a-border, #e2e8f0)", borderRadius: 10, padding: 12 }}>
              <div className="a-row" style={{ justifyContent: "space-between" }}>
                <Link to={`/admin/courses/${r.courseId}`} className="a-cell-title">{r.title}</Link>
                <div className="a-row">
                  <Button size="sm" aria-label={`Move ${r.title} up`} disabled={i === 0} onClick={() => swap(i, i - 1)}>↑</Button>
                  <Button size="sm" aria-label={`Move ${r.title} down`} disabled={i === rows.length - 1} onClick={() => swap(i, i + 1)}>↓</Button>
                  <Button size="sm" variant="danger" onClick={() => change(rows.filter((_, k) => k !== i))}>Remove</Button>
                </div>
              </div>
              <div className="a-row" style={{ marginTop: 10, alignItems: "flex-end" }}>
                <Field label="How lessons unlock" help={RULES.find((x) => x.id === r.unlockRule)?.help}>
                  <select className="a-select" value={r.unlockRule} onChange={(e) => patch(i, { unlockRule: e.target.value as Row["unlockRule"], ...(e.target.value === "drip" && !r.dripEveryDays ? { dripEveryDays: 7 } : {}) })}>{RULES.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
                </Field>
                {r.unlockRule !== "open" && <Field label="Pass mark %"><input className="a-input" type="number" min={50} max={100} style={{ width: 90 }} value={r.passPercent} onChange={(e) => patch(i, { passPercent: Number(e.target.value) })} /></Field>}
                {r.unlockRule === "drip" && <>
                  <Field label="Starts on"><input className="a-input" type="date" value={r.dripStart ?? ""} onChange={(e) => patch(i, { dripStart: e.target.value || null })} /></Field>
                  <Field label="New lesson every (days)"><input className="a-input" type="number" min={1} max={60} style={{ width: 90 }} value={r.dripEveryDays ?? ""} onChange={(e) => patch(i, { dripEveryDays: e.target.value ? Number(e.target.value) : null })} /></Field>
                </>}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="a-faint" style={{ marginTop: 12 }}>Unlock rules are saved now. The student app switches over to them class by class in the next step, so nothing changes for children yet.</p>
    </Card>
  );
}
