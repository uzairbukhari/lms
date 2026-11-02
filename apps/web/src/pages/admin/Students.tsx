import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { StudentCredentials, StudentSummary } from "@lms/schema";
import { api } from "../../api";
import { Avatar } from "../../components/Avatar";
import { PrintableLogins } from "../../components/LoginCard";

type ClassRow = { id: string; name: string };

export function Students() {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [creds, setCreds] = useState<StudentCredentials[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [bulk, setBulk] = useState("");
  const [classIds, setClassIds] = useState<string[]>([]);

  const load = useCallback(async () => {
    const [s, c] = await Promise.all([
      api<{ students: StudentSummary[] }>("/api/admin/students"),
      api<{ classes: ClassRow[] }>("/api/admin/classes"),
    ]);
    setStudents(s.students);
    setClasses(c.classes);
  }, []);

  useEffect(() => {
    load().catch((e: Error) => setError(e.message));
  }, [load]);

  async function run(action: () => Promise<void>) {
    setError("");
    try {
      await action();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  const addOne = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      const r = await api<{ credentials: StudentCredentials }>("/api/admin/students", { body: { displayName: name, classIds } });
      setCreds([r.credentials]);
      setName("");
    });
  };

  const addMany = (e: FormEvent) => {
    e.preventDefault();
    const names = bulk.split("\n").map((n) => n.trim()).filter(Boolean);
    if (!names.length) return;
    void run(async () => {
      const r = await api<{ credentials: StudentCredentials[] }>("/api/admin/students/bulk", { body: { names, classIds } });
      setCreds(r.credentials);
      setBulk("");
    });
  };

  const toggleClass = (id: string) => setClassIds((cur) => (cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-3xl font-extrabold">Students</h1>
      {error && <p role="alert" className="text-lg font-bold">{error}</p>}

      {creds.length > 0 && <PrintableLogins creds={creds} onClose={() => setCreds([])} />}

      <section className="grid gap-6 md:grid-cols-2">
        <form onSubmit={addOne} className="card flex flex-col gap-3 p-5">
          <h2 className="font-display text-xl font-bold">Add a student</h2>
          <label className="flex flex-col gap-1 font-bold">
            First name
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required maxLength={40} />
          </label>
          <ClassPicker classes={classes} selected={classIds} onToggle={toggleClass} />
          <button className="btn btn-primary" type="submit">Create login</button>
        </form>

        <form onSubmit={addMany} className="card flex flex-col gap-3 p-5">
          <h2 className="font-display text-xl font-bold">Add several at once</h2>
          <label className="flex flex-col gap-1 font-bold">
            One first name per line
            <textarea className="input py-2" rows={4} value={bulk} onChange={(e) => setBulk(e.target.value)} />
          </label>
          <ClassPicker classes={classes} selected={classIds} onToggle={toggleClass} />
          <button className="btn btn-primary" type="submit">Create logins</button>
        </form>
      </section>

      <section aria-label="All students" className="flex flex-col gap-3">
        {students.length === 0 && <p className="text-lg">No students yet. Add your first one above.</p>}
        {students.map((s) => (
          <article key={s.id} className="card flex flex-wrap items-center gap-4 p-4">
            <Avatar name={s.displayName} avatar={s.avatar} />
            <div className="min-w-40 flex-1">
              <h3 className="font-display text-xl font-bold">
                {s.displayName} {!s.isActive && <span className="text-base font-normal">(switched off)</span>}
              </h3>
              <p className="text-muted">
                Username: <strong>{s.username}</strong>
                {s.classes.length > 0 && <> · {s.classes.map((c) => c.name).join(", ")}</>}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn" type="button" onClick={() => void run(async () => {
                const r = await api<{ credentials: StudentCredentials }>(`/api/admin/students/${s.id}/reset-password`, { method: "POST" });
                setCreds([r.credentials]);
              })}>
                New password
              </button>
              <button className="btn" type="button" onClick={() => void run(async () => {
                await api(`/api/admin/students/${s.id}`, { method: "PATCH", body: { isActive: !s.isActive } });
              })}>
                {s.isActive ? "Switch off" : "Switch on"}
              </button>
              <button className="btn" type="button" onClick={() => {
                if (window.confirm(`Delete ${s.displayName} and all their scores for good? This cannot be undone.`)) {
                  void run(async () => { await api(`/api/admin/students/${s.id}`, { method: "DELETE" }); });
                }
              }}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ClassPicker({ classes, selected, onToggle }: { classes: ClassRow[]; selected: string[]; onToggle: (id: string) => void }) {
  if (classes.length === 0) return null;
  return (
    <fieldset className="flex flex-wrap gap-3">
      <legend className="mb-1 font-bold">Class</legend>
      {classes.map((c) => (
        <label key={c.id} className="flex min-h-11 items-center gap-2 text-lg">
          <input type="checkbox" className="h-6 w-6" checked={selected.includes(c.id)} onChange={() => onToggle(c.id)} />
          {c.name}
        </label>
      ))}
    </fieldset>
  );
}
