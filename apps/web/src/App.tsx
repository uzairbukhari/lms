import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "./auth";
import { AdminApp } from "./pages/admin/AdminApp";
import { LessonPlayer } from "./pages/LessonPlayer";
import { Login } from "./pages/Login";
import { StudentHome } from "./pages/StudentHome";

function StudentApp() {
  const { user } = useAuth();
  if (user === undefined) return <p className="p-8 text-xl" role="status">Loading…</p>;
  if (user === null) return <Login />;
  return (
    <Routes>
      <Route path="/lesson/:id" element={<LessonPlayer mode="student" />} />
      <Route path="*" element={<StudentHome />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<StudentApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
