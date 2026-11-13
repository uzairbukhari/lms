import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Button, Icon } from "./ui";

const NAV: { label: string; items: { to: string; label: string; icon: string; end?: boolean }[] }[] = [
  { label: "Overview", items: [{ to: "/admin", label: "Dashboard", icon: "dashboard", end: true }] },
  { label: "People", items: [{ to: "/admin/students", label: "Students", icon: "students" }, { to: "/admin/classes", label: "Classes", icon: "classes" }, { to: "/admin/teachers", label: "Teachers", icon: "students" }] },
  { label: "Content", items: [{ to: "/admin/lessons", label: "Lessons", icon: "lessons" }, { to: "/admin/courses", label: "Courses", icon: "plan" }, { to: "/admin/prompt", label: "Next lesson prompt", icon: "upload" }, { to: "/admin/decks", label: "Flashcard decks", icon: "lessons" }, { to: "/admin/stuck", label: "Stuck spots", icon: "reports" }, { to: "/admin/media", label: "Media library", icon: "media" }, { to: "/admin/plan", label: "Year plan", icon: "plan" }] },
  { label: "Assessment", items: [{ to: "/admin/exams", label: "Exams", icon: "exams" }, { to: "/admin/reports", label: "Reports", icon: "reports" }, { to: "/admin/insights", label: "Question insights", icon: "exams" }] },
  { label: "System", items: [{ to: "/admin/ai-log", label: "AI replies", icon: "lessons" }, { to: "/admin/settings", label: "Settings", icon: "settings" }] },
];

const SECTION_LABELS: Record<string, string> = { students: "Students", classes: "Classes", lessons: "Lessons", courses: "Courses", teachers: "Teachers", media: "Media library", prompt: "Next lesson prompt", decks: "Flashcard decks", stuck: "Stuck spots", plan: "Year plan", exams: "Exams", reports: "Reports", insights: "Question insights", "ai-log": "AI replies", settings: "Settings" };

const CrumbCtx = createContext<(label: string | null) => void>(() => {});
/** A detail page calls this with its own name (for example a student's name) so the breadcrumb reads well. */
export function useCrumb(label: string | undefined) {
  const set = useContext(CrumbCtx);
  useEffect(() => { set(label ?? null); return () => set(null); }, [label, set]);
}

export function Shell({ email, children }: { email: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [leaf, setLeaf] = useState<string | null>(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const parts = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const section = parts[0];
  const sectionLabel = section ? SECTION_LABELS[section] ?? "Dashboard" : "Dashboard";

  return (
    <div className="a-shell">
      <div className={`a-scrim ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`a-sidebar ${open ? "open" : ""}`} aria-label="Main">
        <Link to="/admin" className="a-brand" style={{ textDecoration: "none" }}>
          <span className="a-brand-mark"><Icon name="mark" size={16} /></span>
          Learning Adventures
        </Link>
        <nav className="a-nav-group" style={{ gap: 14 }}>
          {NAV.map((g) => (
            <div className="a-nav-group" key={g.label}>
              <div className="a-nav-label">{g.label}</div>
              {g.items.map((i) => (
                <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => "a-nav-link" + (isActive ? " active" : "")}>
                  <Icon name={i.icon} /> {i.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <div className="a-main">
        <header className="a-topbar">
          <div className="a-row" style={{ minWidth: 0, flexWrap: "nowrap" }}>
            <Button className="a-menu-btn" variant="ghost" icon="menu" aria-label="Open menu" onClick={() => setOpen(true)} />
            <nav className="a-crumbs" aria-label="Breadcrumb">
              {section && <><Link to={`/admin/${section}`}>{sectionLabel}</Link></>}
              {!section && <span className="current">Dashboard</span>}
              {section && parts.length > 1 && <><span aria-hidden="true">/</span><span className="current">{leaf ?? "…"}</span></>}
            </nav>
          </div>
          <div className="a-row" style={{ flexWrap: "nowrap" }}>
            <a className="a-btn sm" href="/" target="_blank" rel="noreferrer"><Icon name="external" size={14} /> Student site</a>
            <span className="a-faint" style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={email}>{email}</span>
          </div>
        </header>
        <main className="a-content">
          <CrumbCtx.Provider value={setLeaf}>{children}</CrumbCtx.Provider>
        </main>
      </div>
    </div>
  );
}
