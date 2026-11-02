import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { StudentCredentials } from "@lms/schema";

/** A login card to print or share: site address, username, password and a QR code to the site. */
export function LoginCard({ creds }: { creds: StudentCredentials }) {
  const url = window.location.origin;
  const [qr, setQr] = useState("");
  useEffect(() => {
    QRCode.toDataURL(url, { margin: 1, width: 160 }).then(setQr).catch(() => setQr(""));
  }, [url]);

  return (
    <div className="card flex items-center gap-5 p-5">
      {qr && <img src={qr} alt={`QR code for ${url}`} width={120} height={120} className="rounded bg-white p-1" />}
      <dl className="grid gap-1 text-lg">
        <dt className="font-bold">{creds.displayName}</dt>
        <dd>
          Website: <strong>{url}</strong>
        </dd>
        <dd>
          Username: <strong data-testid="cred-username">{creds.username}</strong>
        </dd>
        <dd>
          Password: <strong data-testid="cred-password">{creds.password}</strong>
        </dd>
      </dl>
    </div>
  );
}

export function PrintableLogins({ creds, onClose }: { creds: StudentCredentials[]; onClose: () => void }) {
  return (
    <section aria-label="New logins" className="flex flex-col gap-3">
      <p role="status" className="text-lg font-bold">
        Save these now. Passwords are shown only once, so print or copy them before closing.
      </p>
      <div className="print-area flex flex-col gap-3">
        {creds.map((c) => (
          <LoginCard key={c.id} creds={c} />
        ))}
      </div>
      <div className="flex gap-3">
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
          Print login cards
        </button>
        <button type="button" className="btn" onClick={onClose}>
          I have saved them
        </button>
      </div>
    </section>
  );
}
