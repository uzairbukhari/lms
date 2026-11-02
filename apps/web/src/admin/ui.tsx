import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ButtonHTMLAttributes, type ReactNode,
} from "react";
import { Link } from "react-router";
import { api } from "../api";

/* ---------- Icons (inline SVG, no dependency) ---------- */

const PATHS: Record<string, string> = {
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  students: "M16 11a4 4 0 1 0-8 0M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1M12 7a2 2 0 1 0 0 .01",
  classes: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
  lessons: "M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4zM8 8h8M8 12h8",
  media: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M9 9.5a1 1 0 1 0 0 .01",
  plan: "M4 5h16v15H4zM4 10h16M9 5v15M15 10v10",
  exams: "M9 4h6l1 2h3v15H5V6h3zM9 13l2 2 4-4",
  reports: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 3.1a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 3.1h5l.4-3.1a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 6h16M4 12h16M4 18h16",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  alert: "M12 3l10 18H2zM12 10v5M12 18h.01",
  check: "M5 13l4 4L19 7",
  copy: "M9 9h11v11H9zM5 15V4h11",
  print: "M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z",
  download: "M12 4v12M7 11l5 5 5-5M4 20h16",
  arrow: "M5 12h14M13 6l6 6-6 6",
  sort: "M8 9l4-4 4 4M8 15l4 4 4-4",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  mark: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
};

export function Icon({ name, size = 16 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name] ?? ""} />
    </svg>
  );
}

/* ---------- Buttons, badges, cards ---------- */

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger" | "ghost" | "solid-danger"; size?: "sm"; icon?: string };
export function Button({ variant, size, icon, className = "", children, type = "button", ...rest }: BtnProps) {
  const cls = ["a-btn", variant === "solid-danger" ? "danger solid" : variant ?? "", size ?? "", !children ? "icon" : "", className].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}

export function LinkButton({ to, variant, size, icon, newWindow, children }: { to: string; variant?: "primary"; size?: "sm"; icon?: string; newWindow?: boolean; children: ReactNode }) {
  return (
    <Link to={to} className={["a-btn", variant ?? "", size ?? ""].filter(Boolean).join(" ")} {...(newWindow ? { target: "_blank", rel: "noopener" } : {})}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </Link>
  );
}

export type Tone = "green" | "amber" | "red" | "blue" | "slate";
export function Badge({ tone = "slate", children, plain }: { tone?: Tone; children: ReactNode; plain?: boolean }) {
  return <span className={`a-badge ${tone === "slate" ? "" : tone} ${plain ? "plain" : ""}`}>{children}</span>;
}

const STATUS_TONE: Record<string, Tone> = { published: "green", draft: "amber", archived: "slate", active: "green", off: "slate" };
export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={STATUS_TONE[status] ?? "slate"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
}

export function Card({ title, actions, children, flush, className = "" }: { title?: ReactNode; actions?: ReactNode; children?: ReactNode; flush?: boolean; className?: string }) {
  return (
    <section className={`a-card ${className}`}>
      {(title || actions) && (
        <div className="a-card-head">
          {title && <h2>{title}</h2>}
          {actions && <div className="a-actions">{actions}</div>}
        </div>
      )}
      {flush ? children : <div className="a-card-body">{children}</div>}
    </section>
  );
}

export function StatTile({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="a-card a-stat">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="a-page-head">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="a-actions">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="a-empty">
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="a-card-body" role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => <div key={i} className="a-skeleton" style={{ width: `${95 - i * 12}%` }} />)}
    </div>
  );
}

export function Avatar({ name, large }: { name: string; large?: boolean }) {
  return <span className={`a-avatar ${large ? "lg" : ""}`} aria-hidden="true">{name.trim().charAt(0).toUpperCase() || "?"}</span>;
}

/* ---------- Form fields ---------- */

export function Field({ label, help, children }: { label: string; help?: ReactNode; children: ReactNode }) {
  return (
    <label className="a-field">
      <span className="lab">{label}</span>
      {children}
      {help && <span className="help">{help}</span>}
    </label>
  );
}

export function SearchBox({ value, onChange, placeholder = "Search" }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="a-search grow">
      <Icon name="search" />
      <input className="a-input" type="search" aria-label={placeholder} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: string }[]; value: T; onChange: (id: T) => void }) {
  return (
    <div className="a-tabs" role="tablist">
      {tabs.map((t) => (
        <button key={t.id} role="tab" type="button" className="a-tab" aria-selected={value === t.id} onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

/* ---------- Overlays ---------- */

function useEscape(onClose: () => void) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
}

function Overlay({ kind, title, onClose, children, footer, wide }: { kind: "modal" | "drawer"; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  useEscape(onClose);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className={`a-overlay ${kind}`} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`a-dialog ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <div className="a-dialog-head">
          <h2>{title}</h2>
          <Button variant="ghost" size="sm" icon="close" aria-label="Close" onClick={onClose} />
        </div>
        <div className="a-dialog-body">{children}</div>
        {footer && <div className="a-dialog-foot">{footer}</div>}
      </div>
    </div>
  );
}
export const Modal = (p: Omit<Parameters<typeof Overlay>[0], "kind">) => <Overlay kind="modal" {...p} />;
export const Drawer = (p: Omit<Parameters<typeof Overlay>[0], "kind">) => <Overlay kind="drawer" {...p} />;

type ConfirmOpts = { title: string; message: ReactNode; confirmLabel?: string; danger?: boolean };

/* ---------- Toasts and confirm, via one context ---------- */

type Toast = { id: number; text: string; error?: boolean };
type Ctx = { toast: (text: string, error?: boolean) => void; confirm: (o: ConfirmOpts) => Promise<boolean> };
const FeedbackCtx = createContext<Ctx | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [ask, setAsk] = useState<(ConfirmOpts & { resolve: (v: boolean) => void }) | null>(null);
  const toast = useCallback((text: string, error?: boolean) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, error }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), error ? 8000 : 4500);
  }, []);
  const confirm = useCallback((o: ConfirmOpts) => new Promise<boolean>((resolve) => setAsk({ ...o, resolve })), []);
  const close = (v: boolean) => { ask?.resolve(v); setAsk(null); };
  return (
    <FeedbackCtx.Provider value={{ toast, confirm }}>
      {children}
      <div className="a-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`a-toast ${t.error ? "error" : ""}`} role={t.error ? "alert" : "status"}>
            <span>{t.text}</span>
            <button aria-label="Dismiss" onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
      {ask && (
        <Modal title={ask.title} onClose={() => close(false)} footer={<>
          <Button onClick={() => close(false)}>Cancel</Button>
          <Button variant={ask.danger ? "solid-danger" : "primary"} onClick={() => close(true)}>{ask.confirmLabel ?? "Confirm"}</Button>
        </>}>
          <p>{ask.message}</p>
        </Modal>
      )}
    </FeedbackCtx.Provider>
  );
}

export function useFeedback(): Ctx {
  const c = useContext(FeedbackCtx);
  if (!c) throw new Error("FeedbackProvider missing");
  return c;
}

/* ---------- Row menu ---------- */

export type MenuItem = { label: string; onClick?: () => void; to?: string; danger?: boolean };
export function RowMenu({ items, label = "More actions" }: { items: MenuItem[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <div className="a-menu" ref={ref}>
      <Button variant="ghost" size="sm" icon="more" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} />
      {open && (
        <div className="a-menu-pop" role="menu">
          {items.map((it) =>
            it.to ? <Link key={it.label} to={it.to} role="menuitem" onClick={() => setOpen(false)}>{it.label}</Link> : (
              <button key={it.label} role="menuitem" className={it.danger ? "danger" : ""} onClick={() => { setOpen(false); it.onClick?.(); }}>{it.label}</button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Data loading ---------- */

/** Loads JSON once and on demand. `reload` refetches; errors are returned, never thrown into render. */
export function useLoad<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(path !== null);
  const reload = useCallback(async () => {
    if (path === null) return;
    try {
      setData(await api<T>(path));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load this page.");
    } finally {
      setLoading(false);
    }
  }, [path]);
  useEffect(() => { setLoading(path !== null); void reload(); }, [reload, path]);
  return { data, error, loading, reload };
}

export function ErrorNote({ error }: { error: string }) {
  return error ? <div className="a-alert red" role="alert"><Icon name="alert" /> {error}</div> : null;
}

/* ---------- Formatting ---------- */

export const pct = (n: number | null | undefined) => (n === null || n === undefined ? "–" : `${Math.round(n)}%`);
export function ago(iso: string | null | undefined): string {
  if (!iso) return "Never";
  const t = Date.parse(iso.includes("T") ? iso : iso.replace(" ", "T") + "Z");
  if (Number.isNaN(t)) return iso.slice(0, 10);
  const days = Math.floor((Date.now() - t) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days} days ago`;
  return iso.slice(0, 10);
}
export const SUBJECT_NAMES: Record<string, string> = {
  maths: "Maths", science: "Science", "data-ai": "Computer Science, Data & AI", "general-knowledge": "General Knowledge", english: "English",
};
/** Sort helper for table headers. */
export function useSort<K extends string>(initial: K, dir: 1 | -1 = 1) {
  const [key, setKey] = useState<K>(initial);
  const [d, setD] = useState<1 | -1>(dir);
  const toggle = (k: K) => { if (k === key) setD((x) => (x === 1 ? -1 : 1)); else { setKey(k); setD(1); } };
  return { key, dir: d, toggle };
}
export function SortTh({ label, k, sort, num }: { label: string; k: string; sort: { key: string; dir: 1 | -1; toggle: (k: never) => void }; num?: boolean }) {
  const active = sort.key === k;
  return (
    <th className={num ? "num" : ""} aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      <button type="button" onClick={() => sort.toggle(k as never)}>{label}<span style={{ opacity: active ? 1 : 0.35 }}><Icon name="sort" size={12} /></span></button>
    </th>
  );
}
export function compare(a: unknown, b: unknown): number {
  if (a === null || a === undefined) return b === null || b === undefined ? 0 : 1;
  if (b === null || b === undefined) return -1;
  return typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}
