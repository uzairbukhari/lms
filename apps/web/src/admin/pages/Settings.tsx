import { useState } from "react";
import { api } from "../../api";
import { Button, Card, EmptyState, ErrorNote, Field, PageHeader, Skeleton, ago, useFeedback, useLoad } from "../ui";

type Backup = { key: string; sizeBytes?: number; uploaded?: string };
type Unlock = { id: string; courseTitle: string; semester: number; week: number; classId: string | null; userId: string | null; expiresAt: string | null };

function AiAlert() {
  const cur = useLoad<{ neurons: number; freeNeuronsPerDay: number; todayNeurons: number }>("/api/admin/settings/ai-alert");
  const { toast } = useFeedback();
  const [value, setValue] = useState<string | null>(null);
  const shown = value ?? String(cur.data?.neurons ?? "");
  async function save() {
    try {
      await api("/api/admin/settings/ai-alert", { method: "PUT", body: { neurons: Math.max(0, Math.round(Number(shown) || 0)) } });
      toast("Saved.");
      setValue(null);
      await cur.reload();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }
  return (
    <Card title="AI spend alert" actions={<Button variant="primary" onClick={() => void save()} disabled={value === null}>Save</Button>}>
      <ErrorNote error={cur.error} />
      <Field label="Warn me when AI use in one day passes (neurons)" help={cur.data ? `Cloudflare gives ${cur.data.freeNeuronsPerDay.toLocaleString("en")} free every day. Used so far today: ${cur.data.todayNeurons.toLocaleString("en")}. Set 0 to turn the warning off. The warning shows under "Needs attention" on the Dashboard.` : undefined}>
        <input className="a-input" type="number" min={0} step={500} inputMode="numeric" value={shown} onChange={(e) => setValue(e.target.value)} />
      </Field>
    </Card>
  );
}

function AiCap() {
  const cur = useLoad<{ neurons: number; defaultNeurons: number; freeNeuronsPerDay: number; todayNeurons: number; paused: boolean }>("/api/admin/settings/ai-cap");
  const { toast } = useFeedback();
  const [value, setValue] = useState<string | null>(null);
  const shown = value ?? String(cur.data?.neurons ?? "");
  async function save() {
    try {
      await api("/api/admin/settings/ai-cap", { method: "PUT", body: { neurons: Math.max(0, Math.round(Number(shown) || 0)) } });
      toast("Saved.");
      setValue(null);
      await cur.reload();
    } catch (e) { toast(e instanceof Error ? e.message : "Could not save.", true); }
  }
  const d = cur.data;
  return (
    <Card title="Daily AI limit" actions={<Button variant="primary" onClick={() => void save()} disabled={value === null}>Save</Button>}>
      <ErrorNote error={cur.error} />
      <Field label="Stop all AI for the day once it reaches (neurons)" help={d ? `Cloudflare gives ${d.freeNeuronsPerDay.toLocaleString("en")} neurons free every day and resets at 00:00 UTC. The default, ${d.defaultNeurons.toLocaleString("en")}, leaves a small safety margin so you are never billed. Used so far today: ${d.todayNeurons.toLocaleString("en")}${d.paused ? " (AI is paused until the reset)" : ""}. Lesson narration then uses the device voice and hints use the stored text; saved answers keep working. Set 0 to switch AI off.` : undefined}>
        <input className="a-input" type="number" min={0} step={500} inputMode="numeric" value={shown} onChange={(e) => setValue(e.target.value)} />
      </Field>
    </Card>
  );
}

function Security() {
  const s = useLoad<{ turnstile: boolean }>("/api/admin/settings/security");
  return (
    <Card title="Login protection">
      <p>A Cloudflare Turnstile check appears on the sign-in page after three wrong passwords. It is currently <strong>{s.data?.turnstile ? "on" : "off"}</strong>.</p>
      {s.data && !s.data.turnstile && <p className="a-muted" style={{ marginTop: 6 }}>To turn it on, create a Turnstile widget in the Cloudflare dashboard and add its site key as the variable <code>TURNSTILE_SITE_KEY</code> and its secret as the Worker secret <code>TURNSTILE_SECRET</code>. Wrong passwords are already limited and recorded without it; see each child's Sign-ins tab.</p>}
    </Card>
  );
}

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
      <AiCap />
      <AiAlert />
      <Security />
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
