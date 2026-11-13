import { useState } from "react";
import { api } from "../../api";
import { Badge, Button, Card, EmptyState, ErrorNote, Field, Modal, PageHeader, Skeleton, useFeedback, useLoad } from "../ui";

type Teacher = { id: string; displayName: string; email: string; isActive: number; classes: { classId: string; access: "view" | "edit" }[] };
type Cls = { id: string; name: string };

export function Teachers() {
  const staff = useLoad<{ teachers: Teacher[] }>("/api/admin/staff");
  const classes = useLoad<{ classes: Cls[] }>("/api/admin/classes");
  const { toast } = useFeedback();
  const [edit, setEdit] = useState<Teacher | "new" | null>(null);
  const cls = classes.data?.classes ?? [];

  return (
    <>
      <PageHeader title="Teachers" description="A teacher signs in with their email through Cloudflare Access and sees only the classes you give them." actions={<Button variant="primary" icon="plus" onClick={() => setEdit("new")}>Add teacher</Button>} />
      <ErrorNote error={staff.error} />
      {staff.loading && !staff.data ? <Skeleton /> : (staff.data?.teachers.length ?? 0) === 0 ? <EmptyState title="No teachers yet">Add a teacher, then allow their email in your Cloudflare Access policy.</EmptyState> : (
        <Card flush><div className="a-table-wrap"><table className="a-table">
          <thead><tr><th>Teacher</th><th>Classes</th><th>Status</th><th /></tr></thead>
          <tbody>{staff.data!.teachers.map((t) => (
            <tr key={t.id}>
              <td><div className="a-cell-title">{t.displayName}</div><div className="a-cell-sub">{t.email}</div></td>
              <td>{t.classes.length === 0 ? <span className="a-faint">None</span> : t.classes.map((a) => <div key={a.classId}>{cls.find((c) => c.id === a.classId)?.name ?? "Class"} <Badge tone={a.access === "edit" ? "blue" : "slate"} plain>{a.access === "edit" ? "Editor" : "Viewer"}</Badge></div>)}</td>
              <td>{t.isActive ? <Badge tone="green">Active</Badge> : <Badge>Switched off</Badge>}</td>
              <td className="actions"><Button size="sm" onClick={() => setEdit(t)}>Edit</Button></td>
            </tr>
          ))}</tbody>
        </table></div></Card>
      )}
      {edit && <TeacherForm teacher={edit === "new" ? null : edit} classes={cls} onClose={() => setEdit(null)} onSaved={async () => { setEdit(null); toast("Saved."); await staff.reload(); }} />}
    </>
  );
}

function TeacherForm({ teacher, classes, onClose, onSaved }: { teacher: Teacher | null; classes: Cls[]; onClose: () => void; onSaved: () => void | Promise<void> }) {
  const { toast } = useFeedback();
  const [name, setName] = useState(teacher?.displayName ?? "");
  const [email, setEmail] = useState(teacher?.email ?? "");
  const [active, setActive] = useState(teacher ? !!teacher.isActive : true);
  const [access, setAccess] = useState<Record<string, "none" | "view" | "edit">>(Object.fromEntries((teacher?.classes ?? []).map((a) => [a.classId, a.access])));
  async function save() {
    const list = Object.entries(access).filter(([, v]) => v !== "none").map(([classId, v]) => ({ classId, access: v as "view" | "edit" }));
    try {
      if (teacher) await api(`/api/admin/staff/${teacher.id}`, { method: "PATCH", body: { displayName: name, isActive: active, classes: list } });
      else await api("/api/admin/staff", { method: "POST", body: { displayName: name, email, classes: list } });
      await onSaved();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }
  return (
    <Modal title={teacher ? "Edit teacher" : "Add teacher"} onClose={onClose} footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" disabled={!name.trim() || (!teacher && !email.includes("@"))} onClick={() => void save()}>Save</Button></>}>
      <Field label="Name"><input className="a-input" value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Email (the one they sign in with)"><input className="a-input" type="email" value={email} disabled={!!teacher} onChange={(e) => setEmail(e.target.value)} /></Field>
      <fieldset style={{ border: 0, padding: 0, margin: "12px 0" }}>
        <legend className="a-cell-title">Class access</legend>
        {classes.map((c) => (
          <div key={c.id} className="a-row" style={{ justifyContent: "space-between", margin: "6px 0" }}>
            <span>{c.name}</span>
            <select className="a-select" aria-label={`Access to ${c.name}`} value={access[c.id] ?? "none"} onChange={(e) => setAccess({ ...access, [c.id]: e.target.value as "none" | "view" | "edit" })}>
              <option value="none">No access</option><option value="view">Viewer (sees progress)</option><option value="edit">Editor (can change the class)</option>
            </select>
          </div>
        ))}
      </fieldset>
      {teacher && <label className="a-row"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Can sign in</label>}
    </Modal>
  );
}
