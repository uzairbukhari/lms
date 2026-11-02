import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { StudentCredentials } from "@lms/schema";
import { Button, Modal, useFeedback } from "./ui";

function Card({ creds, qr, url }: { creds: StudentCredentials; qr: string; url: string }) {
  return (
    <div className="a-card" style={{ display: "flex", gap: 16, padding: 16, alignItems: "center", breakInside: "avoid", color: "inherit" }}>
      {qr && <img src={qr} alt={`QR code for ${url}`} width={96} height={96} style={{ background: "#fff", padding: 4, borderRadius: 6 }} />}
      <dl style={{ margin: 0, display: "grid", gap: 2 }}>
        <dt style={{ fontWeight: 600, fontSize: 16 }}>{creds.displayName}</dt>
        <dd style={{ margin: 0 }}>Website: <strong>{url}</strong></dd>
        <dd style={{ margin: 0 }}>Username: <strong data-testid="cred-username">{creds.username}</strong></dd>
        <dd style={{ margin: 0 }}>Password: <strong data-testid="cred-password">{creds.password}</strong></dd>
      </dl>
    </div>
  );
}

/** Shows new logins once, with print and copy. Passwords are never shown again, so the dialog says so plainly. */
export function CredentialsModal({ creds, onClose }: { creds: StudentCredentials[]; onClose: () => void }) {
  const url = window.location.origin;
  const [qr, setQr] = useState("");
  const { toast } = useFeedback();
  useEffect(() => { QRCode.toDataURL(url, { margin: 1, width: 192 }).then(setQr).catch(() => setQr("")); }, [url]);
  const copy = async () => {
    const text = creds.map((c) => `${c.displayName}\nWebsite: ${url}\nUsername: ${c.username}\nPassword: ${c.password}`).join("\n\n");
    try { await navigator.clipboard.writeText(text); toast("Logins copied."); } catch { toast("Could not copy. Print them instead.", true); }
  };
  return (
    <Modal wide title={creds.length === 1 ? "New login" : `${creds.length} new logins`} onClose={onClose} footer={<>
      <Button icon="copy" onClick={() => void copy()}>Copy</Button>
      <Button icon="print" onClick={() => window.print()}>Print cards</Button>
      <Button variant="primary" onClick={onClose}>I have saved them</Button>
    </>}>
      <div className="a-alert" role="status">Passwords are shown only once. Print or copy them before closing this window.</div>
      <div className="print-area" style={{ display: "grid", gap: 10 }}>
        {creds.map((c) => <Card key={c.id} creds={c} qr={qr} url={url} />)}
      </div>
    </Modal>
  );
}
