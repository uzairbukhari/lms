// Builds topic lessons in format 3.0 (sub-lessons, mini quizzes, standards) and checks docs/LESSON_GUIDELINES.md parts 4 and 13.
import { audit as _unused } from "./lesson-kit.mjs";

const VISUAL = new Set(["image", "chart", "explainer", "manipulative", "video", "brain_game", "html_embed"]);
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

export function topicLesson(spec) {
  const { slug, subject, cls, topic, title, summary, unit, difficulty, objectives, success_criteria, real_life, standards, warm_up, intro, subs, quiz } = spec;
  const file = {
    schema_version: "3.0",
    lesson: {
      slug, subject, title, summary,
      age_band: cls === 1 ? "7-8" : "9-10",
      difficulty, estimated_minutes: 60, unit,
      learning_objectives: objectives,
      tags: ["topic", `topic-${topic}`],
      curriculum: { course: `${subject}-class-${cls}-topics`, semester: 1, topic },
      standards, success_criteria, real_life, warm_up,
    },
    blocks: intro,
    sub_lessons: subs.map((s) => ({ id: s.id, kind: s.kind, title: s.title, blocks: s.blocks, mini_quiz: s.mini })),
    quiz: {
      pass_percent: 70, shuffle_questions: true, shuffle_options: true, max_attempts: null,
      questions: quiz.map((x, i) => ({ ref: `q${i + 1}`, ...x.q, sub_lesson: x.sub, depth: x.depth })),
    },
  };
  audit(file);
  return file;
}

export function audit(file) {
  const errs = [];
  const fail = (m) => errs.push(m);
  const { slug } = file.lesson;
  const kinds = file.sub_lessons.map((s) => s.kind);
  if (file.sub_lessons.length < 3 || file.sub_lessons.length > 6) fail(`${file.sub_lessons.length} sub-lessons (needs 3 to 6)`);
  for (const k of ["learn", "try", "play", "use"]) if (!kinds.includes(k)) fail(`no ${k} sub-lesson`);
  for (const sub of file.sub_lessons) {
    const where = `sub-lesson ${sub.id}`;
    const types = sub.blocks.map((b) => b.type);
    if (!types.includes("glossary")) fail(`${where}: no glossary`);
    if (!types.includes("summary")) fail(`${where}: no summary`);
    if (types.filter((t) => t === "check").length < 2) fail(`${where}: fewer than 2 checks`);
    if (sub.kind === "learn" && !types.includes("explainer")) fail(`${where}: a learn part needs an explainer`);
    if (sub.kind === "try" && !types.includes("manipulative") && !types.includes("activity")) fail(`${where}: a try part needs something hands-on`);
    if (sub.kind === "play" && !types.includes("brain_game")) fail(`${where}: a play part needs a brain game`);
    let heading = null, seen = false;
    const close = () => heading !== null && !seen && fail(`${where}: stop "${heading}" has no picture, chart, animation or movable thing`);
    for (const b of sub.blocks) {
      if (b.type === "heading") { close(); heading = b.text; seen = false; } else if (b.type === "summary") { close(); heading = null; } else if (VISUAL.has(b.type)) seen = true;
    }
    close();
    const gloss = (sub.blocks.find((b) => b.type === "glossary")?.terms ?? []).map((t) => norm(t.term));
    for (const b of sub.blocks) for (const m of (b.markdown ?? "").matchAll(/\*\*(.+?)\*\*/g)) { const w = norm(m[1]); if (!gloss.some((g) => g === w || g.includes(w) || w.includes(g))) fail(`${where}: bold word "${w}" is not in its glossary`); }
    if (sub.mini_quiz.length < 3 || sub.mini_quiz.length > 5) fail(`${where}: mini quiz has ${sub.mini_quiz.length} questions (needs 3 to 5)`);
    for (const q of sub.mini_quiz) if (!q.hint || !q.explanation) fail(`${where}: a mini quiz question lacks a hint or explanation`);
  }
  const introGloss = (file.blocks.find((b) => b.type === "glossary")?.terms ?? []).map((t) => norm(t.term));
  for (const b of file.blocks) for (const m of (b.markdown ?? "").matchAll(/\*\*(.+?)\*\*/g)) { const w = norm(m[1]); if (!introGloss.some((g) => g === w || g.includes(w) || w.includes(g))) fail(`intro: bold word "${w}" is not in its glossary`); }
  if (!file.lesson.standards?.length) fail("no standards");
  if (!file.lesson.success_criteria?.length) fail("no success criteria");
  if (!file.lesson.real_life) fail("no real-life link");
  if (!file.lesson.warm_up || file.lesson.warm_up.length !== 3) fail("warm-up needs 3 questions");
  const qs = file.quiz.questions;
  if (qs.length !== 15) fail(`quiz has ${qs.length} questions (needs 15)`);
  const qt = new Set(qs.map((q) => (q.type === "number" ? "short_text" : q.type)));
  for (const t of ["multiple_choice", "multi_select", "true_false", "short_text", "fill_blank", "match", "order", "hotspot", "slider"]) if (!qt.has(t)) fail(`quiz has no ${t} question`);
  if (qs.filter((q) => q.depth === "reason").length < 4) fail("quiz needs at least 4 reason questions");
  for (const sub of file.sub_lessons) if (!qs.some((q) => q.sub_lesson === sub.id)) fail(`no quiz question for sub-lesson ${sub.id}`);
  for (const q of qs) {
    if (!q.hint) fail(`${q.ref} has no hint`);
    if (!q.explanation) fail(`${q.ref} has no explanation`);
    if (!q.skill_tag) fail(`${q.ref} has no skill_tag`);
  }
  const seenPrompts = new Set(file.sub_lessons.flatMap((s) => [...s.blocks.filter((b) => b.type === "check").map((b) => b.question.prompt), ...s.mini_quiz.map((q) => q.prompt)]).map((p) => p.toLowerCase()));
  for (const q of qs) if (seenPrompts.has(q.prompt.toLowerCase())) fail(`${q.ref} repeats a check or mini quiz question word for word`);
  if (errs.length) throw new Error(`Topic ${slug} breaks the guidelines:\n - ${errs.join("\n - ")}`);
}
