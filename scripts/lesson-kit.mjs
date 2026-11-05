// A small authoring kit for lessons: short helper functions that build the lesson JSON (schema 1.0), plus an audit that
// enforces docs/LESSON_GUIDELINES.md while a lesson is being built. Lessons are written in scripts/lessons/*.mjs and turned
// into content/lessons/*.json by `node scripts/build-lessons.mjs`.

// --- blocks ---------------------------------------------------------------------------------------
export const H = (text) => ({ type: "heading", text });
export const T = (...paras) => ({ type: "text", markdown: paras.join("\n\n") });
export const IMG = (emoji, caption, alt) => ({ type: "image", emoji, alt: alt ?? caption, caption });
export const TIP = (markdown) => ({ type: "callout", style: "tip", markdown });
export const FACT = (markdown) => ({ type: "callout", style: "fun_fact", markdown });
export const WARN = (markdown) => ({ type: "callout", style: "warning", markdown });
export const VOCAB = (word, meaning, example) => ({ type: "vocab", word, meaning, ...(example ? { example } : {}) });
export const REVEAL = (prompt, answer_markdown) => ({ type: "reveal", prompt, answer_markdown });
export const STEPS = (...items) => ({ type: "steps", items });
export const ACT = (title, materials, instructions) => ({ type: "activity", title, ...(materials?.length ? { materials } : {}), instructions });
export const MAN = (title, goal, emoji, count, zones) => ({ type: "manipulative", title, goal, emoji, count, zones });
export const BRAIN = (game, title, goal, emojis) => ({ type: "brain_game", game, title, goal, emojis });
export const SUM = (...points) => ({ type: "summary", points });
export const VIDEO = (title, youtube, start, end, caption) => ({ type: "video", title, youtube, start, end, ...(caption ? { caption } : {}) });
/** A teaching script: what the voice says INSTEAD of reading the words on screen. */
export const SAY = (say, block) => ({ ...block, say });
/** The same for one explainer scene. */
export const SS = (say, scene) => ({ ...scene, say });
export const CHK = (question) => ({ type: "check", question });

// Charts. rows are [label, value, emoji?]
const rows = (r) => r.map(([label, value, emoji]) => ({ label, value, ...(emoji ? { emoji } : {}) }));
export const PICTO = (title, r, each, caption) => ({ type: "chart", kind: "pictogram", title, rows: rows(r), ...(each ? { each } : {}), ...(caption ? { caption } : {}) });
export const BAR = (title, r, caption) => ({ type: "chart", kind: "bar_chart", title, rows: rows(r), ...(caption ? { caption } : {}) });
export const TALLY = (title, r, caption) => ({ type: "chart", kind: "tally", title, rows: rows(r), ...(caption ? { caption } : {}) });
export const TABLE = (title, r, caption) => ({ type: "chart", kind: "table", title, rows: rows(r), ...(caption ? { caption } : {}) });
export const NLINE = (title, from, to, marks, caption, step) => ({ type: "chart", kind: "number_line", title, from, to, ...(step ? { step } : {}), ...(marks?.length ? { marks } : {}), ...(caption ? { caption } : {}) });
export const FRAC = (title, parts, shaded, caption) => ({ type: "chart", kind: "fraction", title, parts, shaded, ...(caption ? { caption } : {}) });

// Explainer: scenes are S(caption, item, item...) and an item is [id, emoji, x, y, size?, anim?, label?]. Use id null for a thing that never moves.
export const S = (caption, ...items) => ({
  caption,
  // `emoji` may be a prop object ({ kind: "base_ten", tens, ones }) to draw a diagram instead of an emoji.
  items: items.map(([id, emoji, x, y, size = 2, anim = "none", label]) => ({ ...(id ? { id } : {}), ...(typeof emoji === "object" ? { prop: emoji } : { emoji }), x, y, size, anim, ...(label ? { label } : {}) })),
});
/** A place-value board (tens rods and ones squares) as a scene item. Same id in later scenes = it updates in place. */
export const PV = (id, tens, ones, x = 50, y = 48, size = 3, anim = "none") => [id, { kind: "base_ten", tens, ones }, x, y, size, anim];
export const EXP = (title, ...scenes) => ({ type: "explainer", title, scenes });
/** n copies of an emoji in a row: ids prefix1..prefixN, evenly spaced from x0 to x1. */
export const ROW = (prefix, emoji, n, x0, x1, y, size = 2, anim = "none") =>
  Array.from({ length: n }, (_, i) => [`${prefix}${i + 1}`, emoji, n === 1 ? x0 : x0 + ((x1 - x0) * i) / (n - 1), y, size, anim]);

/** Glossary from an object: { "word": "meaning", ... } */
export const GLOSS = (o) => ({ type: "glossary", terms: Object.entries(o).map(([term, meaning]) => ({ term, meaning })) });

// --- questions ------------------------------------------------------------------------------------
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
function shuffle(list, seed) {
  const a = [...list];
  let h = hash(seed);
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const L = "abcdefgh";
const common = (prompt, o = {}) => ({ prompt, ...(o.hint ? { hint: o.hint } : {}), ...(o.why ? { explanation: o.why } : {}), ...(o.emoji ? { emoji: o.emoji } : {}), ...(o.tag ? { skill_tag: o.tag } : {}), ...(o.pts ? { points: o.pts } : {}) });

/** Single choice. `correct` is the right text, `wrongs` the others. Options are placed in a repeatable mixed order. */
export function mc(prompt, correct, wrongs, o) {
  const all = shuffle([correct, ...wrongs], prompt);
  const options = all.map((text, i) => ({ id: L[i], text }));
  return { type: "multiple_choice", ...common(prompt, o), options, answer: [L[all.indexOf(correct)]] };
}
export function ms(prompt, rights, wrongs, o) {
  const all = shuffle([...rights, ...wrongs], prompt);
  return { type: "multi_select", ...common(prompt, o), options: all.map((text, i) => ({ id: L[i], text })), answer: rights.map((r) => L[all.indexOf(r)]) };
}
export const tf = (prompt, value, o) => ({ type: "true_false", ...common(prompt, o), answer: [value] });
export const num = (prompt, value, o = {}) => ({ type: "number", ...common(prompt, o), answer: { value, tolerance: o.tol ?? 0 } });
export const st = (prompt, accepted, o) => ({ type: "short_text", ...common(prompt, o), answer: { accepted } });
/** Drag to order. Give the items in the CORRECT order; they are stored mixed up. */
export function ord(prompt, items, o = {}) {
  const ids = items.map((_, i) => `i${i + 1}`);
  let order = shuffle(ids, prompt);
  if (order.join() === ids.join()) order = [...order.slice(1), order[0]];
  return { type: "order", ...common(prompt, { pts: 2, ...o }), items: order.map((id) => ({ id, text: items[ids.indexOf(id)] })), answer: ids };
}
/** Drag to match. pairs = [[left, right], ...]; the right-hand side is stored mixed up. */
export function mat(prompt, pairs, o = {}) {
  const left = pairs.map(([l], i) => ({ id: `l${i + 1}`, text: l }));
  const rightAll = pairs.map(([, r], i) => ({ id: `r${i + 1}`, text: r }));
  let right = shuffle(rightAll, prompt);
  if (right.every((r, i) => r.id === `r${i + 1}`)) right = [...right.slice(1), right[0]];
  return { type: "match", ...common(prompt, { pts: 2, ...o }), left, right, answer: Object.fromEntries(pairs.map((_, i) => [`l${i + 1}`, `r${i + 1}`])) };
}
/** Dropdown gaps. text uses {b1}, {b2}; blanks = [[correct, wrong, wrong], ...] */
export function fill(prompt, text, blanks, o = {}) {
  const bl = blanks.map((opts, i) => {
    const all = shuffle(opts, prompt + i);
    return { id: `b${i + 1}`, options: all.map((t, k) => ({ id: L[k], text: t })), right: L[all.indexOf(opts[0])] };
  });
  return {
    type: "fill_blank",
    ...common(prompt, { pts: Math.min(blanks.length, 3), ...o }),
    text,
    blanks: bl.map(({ id, options }) => ({ id, options })),
    answer: Object.fromEntries(bl.map((b) => [b.id, b.right])),
  };
}
/** Tap the right picture. items = [[emoji, label, x, y, size?]]; answers = labels. */
export function hot(prompt, items, answers, o = {}) {
  const it = items.map(([emoji, label, x, y, size = 3], i) => ({ id: `h${i + 1}`, emoji, label, x, y, size }));
  return { type: "hotspot", ...common(prompt, o), scene: { items: it, show_labels: o.labels ?? false }, answer: answers.map((a) => it.find((x) => x.label === a).id) };
}
export const sld = (prompt, range, value, tol, o) => ({ type: "slider", ...common(prompt, o), range: { step: 1, ...range }, answer: { value, tolerance: tol ?? 0 } });

// --- lessons --------------------------------------------------------------------------------------
const SUBJECT_COURSE = { maths: "maths", science: "science", "data-ai": "data-ai", "general-knowledge": "general-knowledge", english: "english" };
const VISUAL = new Set(["image", "chart", "explainer", "manipulative", "video", "brain_game", "html_embed"]);

export function lesson(spec) {
  const { slug, subject, cls, week, title, summary, difficulty, unit, objectives, tags = [], blocks, quiz, pass = 70, shuffleQuestions = true } = spec;
  const glossary = spec.glossary;
  const questions = quiz.map((q, i) => ({ ref: `q${i + 1}`, ...q }));
  const file = {
    schema_version: "1.0",
    lesson: {
      slug,
      subject,
      title,
      summary,
      age_band: cls === 1 ? "7-8" : "9-10",
      difficulty,
      estimated_minutes: 60,
      unit,
      learning_objectives: objectives,
      tags: [`week-${week}`, ...tags],
      curriculum: { course: `${SUBJECT_COURSE[subject]}-class-${cls}`, semester: 1, week },
    },
    blocks: [...blocks, glossary],
    quiz: { pass_percent: pass, shuffle_questions: shuffleQuestions, shuffle_options: true, max_attempts: null, questions },
  };
  audit(file);
  return file;
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

/** Throws when a lesson breaks the guidelines (so a rule cannot be forgotten by accident). */
export function audit(file) {
  const errs = [];
  const { slug } = file.lesson;
  const fail = (m) => errs.push(m);
  const types = file.blocks.map((b) => b.type);
  for (const t of ["glossary", "explainer", "brain_game", "summary"]) if (!types.includes(t)) fail(`no ${t} block`);
  if (!types.includes("manipulative") && !types.includes("activity")) fail("no hands-on task (manipulative or activity)");
  if (file.blocks.length > 60) fail(`${file.blocks.length} blocks (max 60)`);
  // a picture for every stop
  let heading = null;
  let seen = false;
  const close = () => heading !== null && !seen && fail(`stop "${heading}" has no picture, chart, animation or movable thing`);
  for (const b of file.blocks) {
    if (b.type === "heading") { close(); heading = b.text; seen = false; } else if (b.type === "summary") { close(); heading = null; } else if (VISUAL.has(b.type)) seen = true;
  }
  close();
  // every bold word is in the glossary
  const gloss = file.blocks.find((b) => b.type === "glossary").terms.map((t) => norm(t.term));
  const bold = new Set();
  for (const b of file.blocks) for (const m of (b.markdown ?? "").matchAll(/\*\*(.+?)\*\*/g)) bold.add(norm(m[1]));
  for (const w of bold) if (!gloss.some((g) => g === w || g.includes(w) || w.includes(g))) fail(`bold word "${w}" is not in the glossary`);
  // every stop has a check somewhere; every new idea followed by do-something: at least 4 checks
  if (types.filter((t) => t === "check").length < 4) fail("fewer than 4 checks");
  // quiz
  const qs = file.quiz.questions;
  if (qs.length !== 15) fail(`quiz has ${qs.length} questions (needs 15)`);
  const qt = new Set(qs.map((q) => (q.type === "number" ? "short_text" : q.type)));
  for (const t of ["multiple_choice", "multi_select", "true_false", "short_text", "fill_blank", "match", "order", "hotspot", "slider"]) if (!qt.has(t)) fail(`quiz has no ${t} question`);
  for (const q of qs) {
    if (!q.hint) fail(`${q.ref} has no hint`);
    if (!q.explanation) fail(`${q.ref} has no explanation`);
    if (!q.skill_tag) fail(`${q.ref} has no skill_tag`);
    if (q.type === "multiple_choice" && /all of the above/i.test(JSON.stringify(q.options))) fail(`${q.ref} uses "all of the above"`);
  }
  const checkPrompts = new Set(file.blocks.filter((b) => b.type === "check").map((b) => b.question.prompt.toLowerCase()));
  for (const q of qs) if (checkPrompts.has(q.prompt.toLowerCase())) fail(`${q.ref} repeats a check question word for word`);
  if (errs.length) throw new Error(`Lesson ${slug} breaks the guidelines:\n - ${errs.join("\n - ")}`);
}
