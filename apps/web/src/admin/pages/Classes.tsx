import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, Modal, PageHeader, Skeleton, useFeedback, useLoad } from "../ui";
import type { Overview } from "./Dashboard";

type ClassRow = { id: string; name: string; description: string | null; isActive: number; studentCount: number };

export function Classes() {
  const classes = useLoad<{ classes: ClassRow[] }>("/api/admin/classes?archived=1");
  const overview = useLoad<Overview>("/api/admin/overview");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState<"active" | "archived">("active");
  const { toast } = useFeedback();
  const nav = useNavigate();
  const info = new Map((overview.data?.classes ?? []).map((c) => [c.id, c]));

  async function create(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await api<{ class: { id: string } }>("/api/admin/classes", { body: { name } });
      toast("Class created.");
      nav(`/admin/classes/${r.class.id}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not create the class.", true);
      setBusy(false);
    }
  }

  const everyClass = classes.data?.classes ?? [];
  const rows = everyClass.filter((c) => (show === "archived" ? !c.isActive : !!c.isActive));
  return (
    <>
      <PageHeader title="Classes" description="Groups of students that share a school-year calendar and a set of courses." actions={<Button variant="primary" icon="plus" onClick={() => setCreating(true)}>New class</Button>} />
      <ErrorNote error={classes.error} />
      <Card flush>
        <div className="a-toolbar">
          <select className="a-select" aria-label="Show classes" value={show} onChange={(e) => setShow(e.target.value as "active" | "archived")}>
            <option value="active">Active classes</option><option value="archived">Archived classes</option>
          </select>
          <span className="a-spacer" /><span className="a-faint">{rows.length} {show === "archived" ? "archived" : "active"}</span>
        </div>
        {classes.loading && !classes.data ? <Skeleton /> : rows.length === 0 && show === "archived" ? <EmptyState title="No archived classes">Classes you archive show up here.</EmptyState> : rows.length === 0 ? (
          <EmptyState title="No classes yet" action={<Button variant="primary" icon="plus" onClick={() => setCreating(true)}>Create a class</Button>}>A class holds students and the courses they follow.</EmptyState>
        ) : (
          <div className="a-table-wrap"><table className="a-table">
            <thead><tr><th>Class</th><th className="num">Students</th><th>Courses</th><th>School year</th><th>Status</th></tr></thead>
            <tbody>{rows.map((c) => {
              const i = info.get(c.id);
              return (
                <tr key={c.id}>
                  <td><Link to={`/admin/classes/${c.id}`} className="a-cell-title">{c.name}</Link>{c.description && <div className="a-cell-sub">{c.description}</div>}</td>
                  <td className="num">{c.studentCount}</td>
                  <td>{i ? (i.courses.length ? i.courses.join(", ") : <Badge tone="amber">None assigned</Badge>) : "–"}</td>
                  <td>{i ? (i.now ? <Badge tone={i.now.exam ? "amber" : "blue"}>S{i.now.semester} · {i.now.exam ? "Exam week" : `Week ${i.now.week}`}</Badge> : <Badge tone={i.hasCalendar ? "slate" : "amber"}>{i.hasCalendar ? "Between terms" : "No dates set"}</Badge>) : "–"}</td>
                  <td><Badge tone={c.isActive ? "green" : "slate"}>{c.isActive ? "Active" : "Archived"}</Badge></td>
                </tr>
              );
            })}</tbody>
          </table></div>
        )}
      </Card>
      {creating && (
        <Modal title="New class" onClose={() => setCreating(false)} footer={<><Button onClick={() => setCreating(false)}>Cancel</Button><Button variant="primary" type="submit" form="new-class" disabled={!name.trim() || busy}>Create class</Button></>}>
          <form id="new-class" onSubmit={(e) => void create(e)}>
            <Field label="Class name"><input className="a-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Saturday Club" maxLength={60} autoFocus /></Field>
          </form>
        </Modal>
      )}
    </>
  );
}
