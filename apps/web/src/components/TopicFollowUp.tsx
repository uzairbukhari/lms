import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { KIND, type TopicLesson } from "../lib/topic";

const FACES = [{ v: 1, label: "Not yet" }, { v: 2, label: "Nearly" }, { v: 3, label: "Got it!" }];

/** After the big quiz on a topic: unlock message and "I can" check when passed, or Practise again on the weak sub-lessons. */
export function TopicFollowUp({ lessonId, passed, percent, passPercent }: { lessonId: string; passed: boolean; percent: number; passPercent: number }) {
  const [data, setData] = useState<TopicLesson | null>(null);
  const [picked, setPicked] = useState<Record<number, number>>({});
  useEffect(() => { api<TopicLesson>(`/api/lessons/${lessonId}`).then(setData).catch(() => undefined); }, [lessonId]);
  const topic = data?.topic;
  if (!topic) return null;
  const rate = (index: number, rating: number) => {
    setPicked((p) => ({ ...p, [index]: rating }));
    void api(`/api/lessons/${lessonId}/ratings`, { method: "PUT", body: { ratings: [{ index, rating }] } }).catch(() => undefined);
  };
  if (passed) {
    return (
      <section className="card flex flex-col gap-4 p-6" aria-labelledby="ican">
        <h2 id="ican" className="font-display text-2xl font-bold">Topic complete! The next topic is open 🔓</h2>
        <p className="text-lg font-bold">How do you feel?</p>
        <p className="text-muted">Tap a face for each one.</p>
        {topic.successCriteria.map((c, i) => (
          <fieldset key={c} className="flex flex-col gap-2">
            <legend className="mb-2 text-lg font-bold">{c}</legend>
            <div className="grid grid-cols-3 gap-2">
              {FACES.map((f) => (
                <button key={f.v} type="button" aria-pressed={picked[i] === f.v} onClick={() => rate(i, f.v)} className={"btn !min-h-12 " + (picked[i] === f.v ? "btn-primary" : "")}>{f.label}</button>
              ))}
            </div>
          </fieldset>
        ))}
        <Link className="btn btn-primary !min-h-14 self-start" to="/">Back to my path</Link>
      </section>
    );
  }
  return (
    <section className="card flex flex-col gap-3 p-6" aria-labelledby="practise">
      <h2 id="practise" className="font-display text-2xl font-bold">Practise again</h2>
      <p className="text-lg">You need {passPercent}% to open the next topic. You got {Math.round(percent)}%. Let's practise the tricky bits, then try the big quiz again.</p>
      {topic.practise.map((p) => {
        const sub = topic.subLessons.find((s) => s.id === p.subId);
        return (
          <Link key={p.subId} to={`/topic/${lessonId}/part/${p.subId}`} className="btn !min-h-16 !justify-between text-left">
            <span><span className="block text-sm font-extrabold uppercase text-muted">{sub ? `${KIND[sub.kind].label} · new practice` : "Practise"}</span>{p.title}</span>
            <span className="text-sm font-bold">{p.wrong} of {p.total} wrong</span>
          </Link>
        );
      })}
      <Link className="btn !min-h-14 self-start" to={`/topic/${lessonId}`}>Back to the topic</Link>
    </section>
  );
}
