import { useState } from "react";
import { api } from "../../api";
import { Button, Card, EmptyState, ErrorNote, PageHeader, Skeleton, ago, useFeedback, useLoad } from "../ui";

type Backup = { key: string; sizeBytes?: number; uploaded?: string };
type Unlock = { id: string; courseTitle: string; semester: number; week: number; classId: string | null; userId: string | null; expiresAt: string | null };

export function Settings({ email }: { email: string }) {
  const backups = useLoad<{ backups: Backup[] }>("/api/admin/backups");
  const unlocks = useLoad<{ unlocks: Unlock[] }>("/api/admin/unlocks");
  const classes = useLoad<{ classes: { id: string; name: string }[] }>("/api/admin/classes");
  const { toast } = useFeedback();
  const [busy, setBusy] = useState(false);
  const className = (id: string | null) => classes.data?.classes.find((c) => c.id === id)?.name ?? (id ? "A class" : "One student");

  async function backup() {
    setBusy(true);
    try { const r = await api<{ rows: number }>("/api/admin/backups", { method: "POST" }); toast(`Backup saved (${r.rows} rows).`); await backups.reload(); }
    catch (e) { toast(e instanceof Error ? e.message : "Backup failed.", true); }
    setBusy(false);
  }
  const list = backups.data?.backups ?? [];
  return (
    <>
      <PageHeader title="Settings" description="Backups, early-opened weeks and your account." />
      <Card title="Account"><p>Signed in as <strong>{email}</strong> through Cloudflare Access.</p></Card>
      <Card flush title="Backups" actions={<Button variant="primary" disabled={busy} onClick={() => void backup()}>Back up now</Button>}>
        <ErrorNote error={backups.error} />
        {backups.loading && !backups.data ? <Skeleton rows={2} /> : list.length === 0 ? <EmptyState title="No backups yet">The database is also backed up automatically on a schedule. Back up now to make one immediately.</EmptyState> : (
          <ul className="a-list">{list.map((b) => <li key={b.key}><code>{b.key}</code><span className="a-faint">{b.sizeBytes ? `${Math.max(1, Math.round(b.sizeBytes / 1024))} KB` : ""} {ago(b.uploaded)}</span></li>)}</ul>
        )}
      </Card>
      <Card flush title="Weeks opened early">
        {(unlocks.data?.unlocks ?? []).length === 0 ? <EmptyState title="Nothing opened early">Open a week from a class's Access tab.</EmptyState> : (
          <ul className="a-list">{unlocks.data?.unlocks.map((u) => (
            <li key={u.id}><span>{u.courseTitle} · S{u.semester} {u.week === 13 ? "exam week" : `week ${u.week}`} <span className="a-faint">for {className(u.classId)}{u.expiresAt ? ` until ${u.expiresAt}` : ""}</span></span>
              <Button size="sm" onClick={() => void api(`/api/admin/unlocks/${u.id}`, { method: "DELETE" }).then(() => { toast("Closed again."); return unlocks.reload(); }).catch((e: Error) => toast(e.message, true))}>Close</Button></li>
          ))}</ul>
        )}
      </Card>
    </>
  );
}
