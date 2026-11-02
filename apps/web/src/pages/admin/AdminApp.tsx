import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router";
import { api, ApiError } from "../../api";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Classes } from "./Classes";
import { Curriculum } from "./Curriculum";
import { LessonPlayer } from "../LessonPlayer";
import { Exams } from "./Exams";
import { Lessons } from "./Lessons";
import { Reports } from "./Reports";
import { Students } from "./Students";

type Gate = "checking" | "ok" | { error: string };

export function AdminApp() {
  const [gate, setGate] = useState<Gate>("checking");

  useEffect(() => {
    api("/api/admin/me")
      .then(() => setGate("ok"))
      .catch((e: unknown) => {
        const status = e instanceof ApiError ? e.status : 0;
        setGate({
          error:
            status === 401
              ? "Please sign in with your Cloudflare Access login."
              : status === 403
                ? "This account is not allowed to manage the site."
                : "Could not reach the server.",
        });
      });
  }, []);

  if (gate === "checking") return <p className="p-8 text-xl" role="status">Checking…</p>;
  if (gate !== "ok") return <p className="p-8 text-xl" role="alert">{gate.error}</p>;

  const link = ({ isActive }: { isActive: boolean }) => "btn " + (isActive ? "btn-primary" : "");
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-2xl font-extrabold">Parent area</p>
        <nav aria-label="Admin" className="flex flex-wrap gap-2">
          <NavLink to="/admin/students" className={link}>Students</NavLink>
          <NavLink to="/admin/classes" className={link}>Classes</NavLink>
          <NavLink to="/admin/lessons" className={link}>Lessons</NavLink>
          <NavLink to="/admin/plan" className={link}>Year plan</NavLink>
          <NavLink to="/admin/exams" className={link}>Exams</NavLink>
          <NavLink to="/admin/reports" className={link}>Reports</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="students" element={<Students />} />
        <Route path="classes" element={<Classes />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:id/preview" element={<LessonPlayer mode="preview" />} />
        <Route path="plan" element={<Curriculum />} />
        <Route path="exams" element={<Exams />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<Students />} />
      </Routes>
      <footer className="mt-auto pt-6">
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
