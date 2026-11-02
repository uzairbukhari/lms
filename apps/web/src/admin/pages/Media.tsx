import { useRef, useState } from "react";
import { Button, Card, EmptyState, ErrorNote, Icon, PageHeader, Skeleton, useFeedback, useLoad } from "../ui";

type Asset = { id: string; filename: string; mimeType: string; sizeBytes: number };
const size = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export function Media() {
  const assets = useLoad<{ assets: Asset[] }>("/api/admin/assets");
  const { toast } = useFeedback();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  async function upload(files: FileList | File[]) {
    setBusy(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.set("file", file);
      try {
        const res = await fetch("/api/admin/assets", { method: "POST", body: form });
        const data = (await res.json().catch(() => ({}))) as { message?: string; asset?: { filename: string } };
        if (res.ok) toast(`Uploaded “${data.asset?.filename ?? file.name}”.`); else toast(data.message ?? `Could not upload ${file.name}.`, true);
      } catch { toast(`Could not upload ${file.name}.`, true); }
    }
    setBusy(false);
    await assets.reload();
  }
  const copy = (name: string) => navigator.clipboard.writeText(name).then(() => toast(`Copied “${name}”. Use it in an image block's "asset" field.`)).catch(() => toast("Could not copy.", true));
  const list = assets.data?.assets ?? [];

  return (
    <>
      <PageHeader title="Media library" description="Pictures and sounds used by your lessons. Refer to a file by its name in the lesson JSON." actions={<Button variant="primary" icon="upload" disabled={busy} onClick={() => input.current?.click()}>Upload files</Button>} />
      <input ref={input} type="file" multiple hidden accept=".png,.jpg,.jpeg,.webp,.gif,.svg,.mp3" onChange={(e) => { if (e.target.files?.length) void upload(e.target.files); e.target.value = ""; }} />
      <div className={`a-dropzone ${over ? "over" : ""}`} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); if (e.dataTransfer.files.length) void upload(e.dataTransfer.files); }}>
        <Icon name="upload" size={22} />
        <span>{busy ? "Uploading…" : "Drop files here, or use Upload files"}</span>
        <span className="a-faint">png, jpg, webp, gif, svg or mp3 · up to 8 MB each</span>
      </div>
      <ErrorNote error={assets.error} />
      <Card flush title={`Files (${list.length})`}>
        {assets.loading && !assets.data ? <Skeleton /> : list.length === 0 ? <EmptyState title="No files yet">Uploaded pictures and sounds appear here.</EmptyState> : (
          <div className="a-media-grid">{list.map((a) => (
            <div className="a-media-item" key={a.id}>
              <div className="a-media-thumb">{a.mimeType.startsWith("image/") ? <img src={`/api/admin/assets/file/${encodeURIComponent(a.filename)}`} alt={a.filename} loading="lazy" /> : <span>♪ {a.mimeType.split("/")[1]}</span>}</div>
              <div className="a-media-meta"><span className="name" title={a.filename}>{a.filename}</span><span className="a-faint">{size(a.sizeBytes)}</span><Button size="sm" icon="copy" onClick={() => void copy(a.filename)}>Copy name</Button></div>
            </div>
          ))}</div>
        )}
      </Card>
    </>
  );
}
