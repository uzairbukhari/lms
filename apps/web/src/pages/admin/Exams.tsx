import { useCallback, useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "../../api";

type Course = { id: string; title: string };
type Exam = { id: string; courseId: string; title: string; semester: number; questionCount: number; maxAttempts: number | null; passPercent: number };

export function Exams() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState(1);
  const [count, setCount] = useState(20);
  const [revision, setRevision] = useState(20);
  const [tries, setTries] = useState<string>("2");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    const [c, e] = await Promise.all([api<{ courses: Course[] }>("/api/admin/courses"), api<{ exams: Exam[] }>("/api/admin/exams")]);
    setCourses(c.courses);
    setExams(e.exams);
    setCourseId((cur) => cur || c.courses[0]?.id || "");
  }, []);
  useEffect(() => { load().catch((e: Error) => setNotice(e.message)); }, [load]);

  const build = async (ev: FormEvent) => {
    ev.preventDefault();
    setNotice("");
    try {
      const r = await api<{ exam: { questionCount: number; blueprint: Record<string, { wanted: number; got: number }> } }>("/api/admin/exams", {
        body: { courseId, semester, questionCount: count, revisionPercent: semester === 1 ? 0 : revision, maxAttempts: tries === "" ? null : Number(tries) },
      });
      const short = Object.entries(r.exam.blueprint).filter(([, v]) => v.got < v.wanted).map(([k, v]) => `${k.replace("_", " ")} has only ${v.got} of ${v.wanted}`);
      setNotice(`Built an exam with ${r.exam.questionCount} questions.${short.length ? ` Not enough quiz questions yet: ${short.join("; ")}.` : ""}`);
      await load();
    } catch (e) {
      setNotice(e instanceof ApiError ? e.message : "Could not build the exam.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="card flex flex-col gap-3 p-5">
        <h2 className="font-display text-2xl font-bold">Build a semester exam</h2>
        <p className="text-muted">Questions are copied from that semester's published lesson quizzes (spread across lessons). Building again makes a new version; old attempts keep the version they sat. Children see an exam in its exam week, or when you open week 13 early on the Classes page.</p>
        <form onSubmit={build} className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">Course
            <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>{courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
          </label>
          <label className="flex flex-col gap-1">Semester
            <select className="input" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 4 ? "4 (whole year)" : n}</option>)}</select>
          </label>
          <label className="flex flex-col gap-1">Questions
            <input className="input" type="number" min={1} max={60} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </label>
          <label className="flex flex-col gap-1">Revision from earlier semesters (%)
            <input className="input" type="number" min={0} max={60} value={revision} disabled={semester === 1 || semester === 4} onChange={(e) => setRevision(Number(e.target.value))} />
          </label>
          <label className="flex flex-col gap-1">Tries allowed (empty = unlimited)
            <input className="input" type="number" min={1} max={20} value={tries} onChange={(e) => setTries(e.target.value)} />
          </label>
          <div className="flex items-end"><button className="btn btn-primary" type="submit" disabled={!courseId}>Build exam</button></div>
        </form>
        {notice && <p role="status">{notice}</p>}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold">Current exams</h2>
        {exams.length === 0 ? <p className="text-muted">No exams yet.</p> : (
          <ul className="flex flex-col gap-2">
            {exams.map((e) => (
              <li key={e.id} className="card flex flex-wrap items-center justify-between gap-2 p-4">
                <span className="font-bold">{e.title}</span>
                <span className="text-muted">{e.questionCount} questions · pass {e.passPercent}% · {e.maxAttempts === null ? "unlimited tries" : `${e.maxAttempts} tries`}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
