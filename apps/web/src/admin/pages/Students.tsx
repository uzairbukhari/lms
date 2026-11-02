import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { StudentCredentials, StudentSummary } from "@lms/schema";
import { api } from "../../api";
import { CredentialsModal } from "../Credentials";
import {
  Avatar, Badge, Button, Card, compare, Drawer, EmptyState, ErrorNote, Field, PageHeader, pct, RowMenu, SearchBox, Skeleton, SortTh, Tabs,
  ago, useFeedback, useLoad, useSort,
} from "../ui";
import type { Overview } from "./Dashboard";

type ClassRow = { id: string; name: string };

export function Students() {
  const students = useLoad<{ students: StudentSummary[] }>("/api/admin/students");
  const classes = useLoad<{ classes: ClassRow[] }>("/api/admin/classes");
  const overview = useLoad<Overview>("/api/admin/overview");
  const { toast, confirm } = useFeedback();
  const [q, setQ] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [creds, setCreds] = useState<StudentCredentials[]>([]);
  const [adding, setAdding] = useState(false);
  const sort = useSort<"name" | "last" | "avg">("name");

  const stats = useMemo(() => new Map((overview.data?.students ?? []).map((s) => [s.id, s])), [overview.data]);
  const rows = useMemo(() => {
    const list = (students.data?.students ?? []).filter((s) =>
      (!q || `${s.displayName} ${s.username}`.toLowerCase().includes(q.toLowerCase())) &&
      (!classFilter || s.classes.some((c) => c.id === classFilter)));
    const val = (s: StudentSummary) => (sort.key === "name" ? s.displayName : sort.key === "last" ? stats.get(s.id)?.lastActive : stats.get(s.id)?.averagePercent);
    return list.sort((a, b) => compare(val(a), val(b)) * sort.dir);
  }, [students.data, q, classFilter, sort.key, sort.dir, stats]);

  async function act(fn: () => Promise<void>) {
    try { await fn(); await students.reload(); } catch (e) { toast(e instanceof Error ? e.message : "Something went wrong", true); }
  }
  const resetPassword = (s: StudentSummary) => act(async () => {
    const r = await api<{ credentials: StudentCredentials }>(`/api/admin/students/${s.id}/reset-password`, { method: "POST" });
    setCreds([r.credentials]);
  });
  const toggle = (s: StudentSummary) => act(async () => {
    await api(`/api/admin/students/${s.id}`, { method: "PATCH", body: { isActive: !s.isActive } });
    toast(`${s.displayName} switched ${s.isActive ? "off" : "on"}.`);
  });
  const remove = async (s: StudentSummary) => {
    if (await confirm({ title: `Delete ${s.displayName}?`, message: "This deletes their login and every score for good. It cannot be undone.", confirmLabel: "Delete student", danger: true })) {
      await act(async () => { await api(`/api/admin/students/${s.id}`, { method: "DELETE" }); toast(`${s.displayName} deleted.`); });
    }
  };

  const all = students.data?.students ?? [];
  return (
    <>
      <PageHeader title="Students" description="Logins, classes and progress for every child." actions={<Button variant="primary" icon="plus" onClick={() => setAdding(true)}>Add students</Button>} />
      <ErrorNote error={students.error} />
      <Card flush>
        <div className="a-toolbar">
          <SearchBox value={q} onChange={setQ} placeholder="Search by name or username" />
          <select className="a-select" aria-label="Filter by class" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option value="">All classes</option>
            {(classes.data?.classes ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <span className="a-spacer" />
          <span className="a-faint">{rows.length} of {all.length}</span>
        </div>
        {students.loading && !students.data ? <Skeleton /> : rows.length === 0 ? (
          <EmptyState title={all.length === 0 ? "No students yet" : "No students match"} action={all.length === 0 ? <Button variant="primary" icon="plus" onClick={() => setAdding(true)}>Add your first student</Button> : undefined}>
            {all.length === 0 ? "Create a login for each child. You can print the login cards straight away." : "Try a different search or class."}
          </EmptyState>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead><tr>
                <SortTh label="Student" k="name" sort={sort} /><th>Username</th><th>Classes</th><th>Status</th>
                <SortTh label="Avg score" k="avg" sort={sort} num /><SortTh label="Last active" k="last" sort={sort} /><th />
              </tr></thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id}>
                    <td><Link to={`/admin/students/${s.id}`} className="a-person" style={{ color: "inherit" }}><Avatar name={s.displayName} /><span className="a-cell-title">{s.displayName}</span></Link></td>
                    <td><code>{s.username}</code></td>
                    <td>{s.classes.length ? s.classes.map((c) => <Link key={c.id} to={`/admin/classes/${c.id}`} style={{ marginRight: 8 }}>{c.name}</Link>) : <span className="a-faint">None</span>}</td>
                    <td><Badge tone={s.isActive ? "green" : "slate"}>{s.isActive ? "Active" : "Off"}</Badge></td>
                    <td className="num">{pct(stats.get(s.id)?.averagePercent)}</td>
                    <td className="a-muted">{ago(stats.get(s.id)?.lastActive)}</td>
                    <td className="actions"><RowMenu label={`Actions for ${s.displayName}`} items={[
                      { label: "View progress", to: `/admin/students/${s.id}` },
                      { label: "New password", onClick: () => void resetPassword(s) },
                      { label: s.isActive ? "Switch off" : "Switch on", onClick: () => void toggle(s) },
                      { label: "Delete…", danger: true, onClick: () => void remove(s) },
                    ]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {adding && <AddStudents classes={classes.data?.classes ?? []} onClose={() => setAdding(false)} onDone={(c) => { setAdding(false); setCreds(c); void students.reload(); }} />}
      {creds.length > 0 && <CredentialsModal creds={creds} onClose={() => setCreds([])} />}
    </>
  );
}

function AddStudents({ classes, onClose, onDone }: { classes: ClassRow[]; onClose: () => void; onDone: (c: StudentCredentials[]) => void }) {
  const [mode, setMode] = useState<"one" | "many">("one");
  const [name, setName] = useState("");
  const [bulk, setBulk] = useState("");
  const [classIds, setClassIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const { toast } = useFeedback();
  const names = bulk.split("\n").map((n) => n.trim()).filter(Boolean);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "one") {
        const r = await api<{ credentials: StudentCredentials }>("/api/admin/students", { body: { displayName: name, classIds } });
        onDone([r.credentials]);
      } else {
        const r = await api<{ credentials: StudentCredentials[] }>("/api/admin/students/bulk", { body: { names, classIds } });
        onDone(r.credentials);
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not create the logins.", true);
      setBusy(false);
    }
  }
  const ready = mode === "one" ? name.trim() !== "" : names.length > 0;
  return (
    <Drawer title="Add students" onClose={onClose} footer={<>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" type="submit" form="add-students" disabled={!ready || busy}>{mode === "one" ? "Create login" : `Create ${names.length || ""} logins`}</Button>
    </>}>
      <Tabs tabs={[{ id: "one", label: "One student" }, { id: "many", label: "Several at once" }]} value={mode} onChange={setMode} />
      <form id="add-students" onSubmit={(e) => void submit(e)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {mode === "one" ? (
          <Field label="First name" help="A username and password are made for you.">
            <input className="a-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoFocus />
          </Field>
        ) : (
          <Field label="First names, one per line" help={names.length ? `${names.length} logins will be created.` : undefined}>
            <textarea className="a-textarea" rows={6} value={bulk} onChange={(e) => setBulk(e.target.value)} />
          </Field>
        )}
        {classes.length > 0 && (
          <fieldset style={{ border: 0, padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <legend style={{ fontWeight: 500, marginBottom: 6 }}>Add to classes</legend>
            {classes.map((c) => (
              <label key={c.id} className="a-check">
                <input type="checkbox" checked={classIds.includes(c.id)} onChange={() => setClassIds((cur) => (cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id]))} />
                {c.name}
              </label>
            ))}
          </fieldset>
        )}
      </form>
    </Drawer>
  );
}
