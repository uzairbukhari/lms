import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "./auth";
import { AdminApp } from "./admin/AdminApp";
import { Loader } from "./components/Loader";
import { LessonPlayer } from "./pages/LessonPlayer";
import { Login } from "./pages/Login";
import { Cards } from "./pages/Cards";
import { GamePlay } from "./pages/GamePlay";
import { Growth } from "./pages/Growth";
import { Revision } from "./pages/Revision";
import { Rewards } from "./pages/Rewards";
import { Teaser } from "./pages/Teaser";
import { WordBook } from "./pages/WordBook";
import { QuizPlayer } from "./pages/QuizPlayer";
import { SemesterMap } from "./pages/SemesterMap";
import { StudentHome } from "./pages/StudentHome";

function StudentApp() {
  const { user } = useAuth();
  if (user === undefined) return <Loader label="Getting ready…" fullScreen />;
  if (user === null) return <Login />;
  return (
    <Routes>
      <Route path="/lesson/:id" element={<LessonPlayer mode="student" />} />
      <Route path="/lesson/:id/quiz" element={<QuizPlayer kind="lesson" />} />
      <Route path="/exam/:id" element={<QuizPlayer kind="exam" />} />
      <Route path="/map" element={<SemesterMap />} />
      <Route path="/map/play/:semester/:week" element={<GamePlay />} />
      <Route path="/cards/:kind?" element={<Cards />} />
      <Route path="/words" element={<WordBook />} />
      <Route path="/revision" element={<Revision />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/growth" element={<Growth />} />
      <Route path="/teaser" element={<Teaser />} />
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
