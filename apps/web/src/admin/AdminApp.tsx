import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { api, ApiError } from "../api";
import { LessonPlayer } from "../pages/LessonPlayer";
import "./admin.css";
import { Shell } from "./Shell";
import { FeedbackProvider } from "./ui";
import { ClassDetail } from "./pages/ClassDetail";
import { Classes } from "./pages/Classes";
import { Dashboard } from "./pages/Dashboard";
import { Exams } from "./pages/Exams";
import { LessonImport } from "./pages/LessonImport";
import { Lessons } from "./pages/Lessons";
import { Media } from "./pages/Media";
import { PlanDetail, PlanList } from "./pages/Plan";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { StudentDetail } from "./pages/StudentDetail";
import { Students } from "./pages/Students";

type Gate = "checking" | { email: string } | { error: string };

export function AdminApp() {
  const [gate, setGate] = useState<Gate>("checking");

  useEffect(() => {
    api<{ admin: { email: string } }>("/api/admin/me")
      .then((r) => setGate({ email: r.admin.email }))
      .catch((e: unknown) => {
        const status = e instanceof ApiError ? e.status : 0;
        setGate({ error: status === 401 ? "Please sign in with your Cloudflare Access login." : status === 403 ? "This account is not allowed to manage the site." : "Could not reach the server." });
      });
  }, []);

  if (gate === "checking") return <div className="admin-root" style={{ padding: 32 }} role="status">Checking…</div>;
  if ("error" in gate) return <div className="admin-root" style={{ padding: 32 }} role="alert">{gate.error}</div>;

  return (
    <Routes>
      {/* The preview shows a lesson exactly as a child sees it, so it sits outside the admin shell and styling. */}
      <Route path="lessons/:id/preview" element={<LessonPlayer mode="preview" />} />
      <Route path="*" element={
        <div className="admin-root">
          <FeedbackProvider>
            <Shell email={gate.email}>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="students" element={<Students />} />
                <Route path="students/:id" element={<StudentDetail />} />
                <Route path="classes" element={<Classes />} />
                <Route path="classes/:id" element={<ClassDetail />} />
                <Route path="lessons" element={<Lessons />} />
                <Route path="lessons/import" element={<LessonImport />} />
                <Route path="media" element={<Media />} />
                <Route path="plan" element={<PlanList />} />
                <Route path="plan/:courseId" element={<PlanDetail />} />
                <Route path="exams" element={<Exams />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings email={gate.email} />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Shell>
          </FeedbackProvider>
        </div>
      } />
    </Routes>
  );
}
