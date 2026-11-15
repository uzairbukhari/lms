/**
 * Printable worksheets (docs/WORKSHEETS_PLAN.md).
 *
 * `worksheetHtml()` turns a lesson file into one self-contained A4 page set: as many of the lesson's own quiz questions as fit on two
 * pages, a "We are learning" box, an "I can" row and a "Try it at home" task, plus a separate one-page answer key for exactly the
 * questions that made it. The page lays itself out in the browser (so fonts and real measurements decide what fits), which means
 * the admin preview, "Print to PDF" and scripts/render-worksheets.mjs all produce the same sheet.
 */

/** Bump when the layout changes so older PDFs show as "out of date". */
export const TEMPLATE_VERSION = 1;

type Q = Record<string, any>;
type LessonFile = {
  lesson: { title: string; subject: string; age_band: string; learning_objectives?: string[]; success_criteria?: string[]; real_life?: string };
  blocks?: Q[];
  sub_lessons?: { id: string; title: string; blocks?: Q[] }[];
  quiz: { questions: Q[] };
};

const SUBJECT_LABEL: Record<string, string> = {
  maths: "Maths", science: "Science", "data-ai": "Computer Science, Data & AI", "general-knowledge": "General Knowledge", english: "English",
};
const LET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const optText = (opts: Q[]) => Object.fromEntries(opts.map((o) => [o.id, o.text ?? ""]));

/** The printed question and its answer, or null for a type that has no paper form. */
function renderQuestion(q: Q): { html: string; answer: string } | null {
  const prompt = esc(String(q.prompt ?? "").replace(/\bTap /g, "Circle ").replace(/\btap /g, "circle ").replace("Slide to show", "Write the number").replace(/\bDrag /g, "Draw a line for ").replace(/\bdrag /g, "draw a line for "));
  switch (q.type) {
    case "multiple_choice":
    case "multi_select": {
      const opts: Q[] = q.options ?? [];
      const letter = Object.fromEntries(opts.map((o, i) => [o.id, LET[i]]));
      const box = q.type === "multiple_choice" ? "○" : "☐";
      const lines = opts.map((o) => `<span class="opt">${box} ${letter[o.id]}. ${esc(o.text)}</span>`).join("");
      const text = optText(opts);
      return { html: `${prompt}<div class="opts">${lines}</div>`, answer: (q.answer as string[]).map((a) => `${letter[a]}. ${text[a]}`).join(", ") };
    }
    case "true_false":
      return { html: `${prompt}<div class="opts"><span class="opt">☐ True</span><span class="opt">☐ False</span></div>`, answer: q.answer?.[0] ? "True" : "False" };
    case "order": {
      const items: Q[] = q.items ?? [];
      const letter = Object.fromEntries(items.map((it, i) => [it.id, LET[i]]));
      const text = optText(items);
      const list = items.map((it) => `<span class="opt">${letter[it.id]}. ${esc(it.text)}</span>`).join("");
      const boxes = items.map(() => '<span class="ob"></span>').join("");
      return { html: `${prompt}<div class="opts">${list}</div><div class="order">Write the letters in order: ${boxes}</div>`, answer: (q.answer as string[]).map((a) => `${letter[a]}. ${text[a]}`).join(" → ") };
    }
    case "fill_blank": {
      const blanks: Q[] = q.blanks ?? [];
      let n = 0;
      const banks: { n: number; b: Q }[] = [];
      const text = String(q.text ?? "").split(/\{(b\d+)\}/).map((piece, i) => {
        if (i % 2 === 0) return esc(piece);
        const b = blanks.find((x) => x.id === piece);
        if (!b) return "";
        n += 1;
        banks.push({ n, b });
        return `<b>(${n})</b> <span class="fb"></span>`;
      }).join("");
      const bank = banks.map(({ n: k, b }) => `<span class="bank">(${k}) ${(b.options as Q[]).map((o, i) => `${LET[i]}. ${esc(o.text)}`).join(" / ")}</span>`).join("");
      const answer = banks.map(({ n: k, b }) => `(${k}) ${((b.options as Q[]).find((o) => o.id === q.answer?.[b.id]) ?? {}).text ?? ""}`).join("  ");
      return { html: `<div class="fillline">${text}</div><div class="opts">${bank}</div>`, answer };
    }
    case "match": {
      const left: Q[] = q.left ?? [], right: Q[] = q.right ?? [];
      const rnum = Object.fromEntries(right.map((r, i) => [r.id, i + 1]));
      const lrows = left.map((l, i) => `<div class="mrow"><span class="ob sm"></span> <b>${LET[i]}.</b> ${esc(l.text)}</div>`).join("");
      const rrows = right.map((r, i) => `<div class="mrow"><b>${i + 1}.</b> ${esc(r.text)}</div>`).join("");
      const lt = Object.fromEntries(left.map((l, i) => [l.id, LET[i]]));
      const answer = Object.entries(q.answer as Record<string, string>).map(([l, r]) => `${lt[l]} – ${rnum[r]} (${right.find((x) => x.id === r)?.text ?? ""})`).join(", ");
      return { html: `${prompt}<div class="match"><div>${lrows}</div><div>${rrows}</div></div>`, answer };
    }
    case "number":
    case "slider": {
      const range = q.type === "slider" && q.range ? ` (between ${q.range.min} and ${q.range.max})` : "";
      return { html: `${prompt}<div class="ans">Answer: <span class="blank"></span>${range}</div>`, answer: String(q.answer?.value ?? "") };
    }
    case "hotspot": {
      const items: Q[] = q.scene?.items ?? [];
      const letter = Object.fromEntries(items.map((it, i) => [it.id, LET[i]]));
      const list = items.map((it) => `<span class="opt">○ ${letter[it.id]}. ${esc(it.label ?? "")}</span>`).join("");
      return { html: `${prompt}<div class="opts">${list}</div>`, answer: (q.answer as string[]).map((a) => `${letter[a]}. ${items.find((i) => i.id === a)?.label ?? ""}`).join(", ") };
    }
    case "short_text":
      return { html: `${prompt}<div class="lines"><div></div></div>`, answer: String(q.answer?.accepted?.[0] ?? "") };
    default:
      return null;
  }
}

/** Words the lesson puts in bold: the key words for the top of the sheet. */
function keyWords(file: LessonFile): string[] {
  const blocks = [...(file.blocks ?? []), ...(file.sub_lessons ?? []).flatMap((s) => s.blocks ?? [])];
  const words: string[] = [];
  for (const b of blocks) {
    if (b.type !== "text") continue;
    for (const m of String(b.markdown ?? "").matchAll(/\*\*([^*]+)\*\*/g)) {
      const w = (m[1] ?? "").trim();
      if (w && w.length < 24 && !words.some((x) => x.toLowerCase() === w.toLowerCase())) words.push(w);
    }
  }
  return words.slice(0, 10);
}

export type WorksheetModel = {
  title: string; subject: string; age: string; objectives: string[]; words: string[];
  /** Question items (and part headings) in printed order. */
  items: string[];
  /** Closing boxes, placed only if there is room. */
  tail: string[];
  /** Answer text by original question number. */
  answers: Record<number, string>;
};

export function worksheetModel(file: LessonFile): WorksheetModel {
  const { lesson } = file;
  const parts = file.sub_lessons ?? [];
  const order = parts.map((p) => p.id);
  const title = new Map(parts.map((p) => [p.id, p.title]));
  const questions = (file.quiz?.questions ?? [])
    .map((q, i) => ({ q, i }))
    .sort((a, b) => {
      const pa = order.indexOf(a.q.sub_lesson), pb = order.indexOf(b.q.sub_lesson);
      return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb) || a.i - b.i;
    })
    .map((x) => x.q);

  const items: string[] = [];
  const answers: Record<number, string> = {};
  let n = 0;
  let current: string | undefined;
  for (const q of questions) {
    const r = renderQuestion(q);
    if (!r) continue;
    if (parts.length && q.sub_lesson !== current) {
      current = q.sub_lesson;
      items.push(`<div class="part">Part: ${esc(title.get(q.sub_lesson) ?? "")}</div>`);
    }
    n += 1;
    answers[n] = esc(r.answer);
    items.push(`<div class="item q" data-n="${n}"><span class="qn">${n}</span><div>${r.html}</div></div>`);
  }
  const ican = (lesson.success_criteria ?? []).map((c) => `<div class="row"><span>${esc(c)}</span><span class="faces">☺ ☹</span></div>`).join("");
  const tail = [
    ...(ican ? [`<div class="box"><h3>How did I do?</h3>${ican}</div>`] : []),
    ...(lesson.real_life ? [`<div class="box home"><h3>Try it at home (with a grown-up)</h3><p>${esc(lesson.real_life)}</p><div class="lines"><div></div></div></div>`] : []),
  ];
  return { title: lesson.title, subject: SUBJECT_LABEL[lesson.subject] ?? lesson.subject, age: lesson.age_band, objectives: lesson.learning_objectives ?? [], words: keyWords(file), items, tail, answers };
}

const CSS = `
@page { size: A4; margin: 0; }
:root { --ink:#1d2433; --soft:#5b6475; --line:#c9cfdb; --accent:#3b5bdb; --tint:#eef2ff; --tint2:#f6f7fb; }
* { box-sizing: border-box; }
html, body { margin:0; padding:0; background:#fff; }
body { font-family:'Andika', 'Atkinson Hyperlegible', sans-serif; color:var(--ink); font-size:var(--fs,11pt); line-height:1.3; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.page { width:210mm; height:297mm; padding:10mm 12mm 8mm; display:flex; flex-direction:column; gap:3mm; page-break-after:always; overflow:hidden; }
.page:last-child { page-break-after:auto; }
@media screen { html { background:#e9ebf0; } .page { margin:6mm auto; background:#fff; box-shadow:0 2px 10px rgba(0,0,0,.1); } }
body[data-mode="sheet"] #k { display:none; }
body[data-mode="answers"] .page:not(#k) { display:none; }
@media print { body:not([data-mode="answers"]) #k { display:none; } }
h1,h2,h3 { font-family:'Fredoka', sans-serif; font-weight:600; margin:0; }
.head { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2.2px solid var(--accent); padding-bottom:2.5mm; }
.head.small { border-bottom-width:1.2px; padding-bottom:1.5mm; align-items:center; }
.kicker { font-family:'Fredoka'; font-weight:500; color:var(--accent); font-size:9.5pt; letter-spacing:.04em; text-transform:uppercase; }
.head h1 { font-size:19pt; line-height:1.1; margin-top:.8mm; }
.head h1.s { font-size:12pt; }
.badge { display:inline-block; border:1.4px solid var(--accent); color:var(--accent); border-radius:99px; padding:0 2.5mm; font-size:9pt; font-family:'Fredoka'; font-weight:500; margin-right:1.2mm; margin-top:1mm; }
.who { display:grid; grid-template-columns:auto 44mm; gap:2mm 2mm; font-size:10.5pt; align-items:end; }
.who span.l { border-bottom:1.1px solid var(--ink); height:5.5mm; }
.remember { background:var(--tint); border-radius:3.5mm; padding:2.5mm 3.5mm; display:grid; grid-template-columns:1fr 50mm; gap:3mm; flex:none; }
.remember ul { margin:.8mm 0 0; padding-left:4.5mm; font-size:10.5pt; }
.remember li { margin:.4mm 0; }
.words { display:flex; flex-wrap:wrap; gap:1.2mm; margin-top:1mm; }
.words b { background:#fff; border-radius:2mm; padding:.4mm 2mm; font-size:9.5pt; font-weight:700; }
.body { flex:1; min-height:0; overflow:hidden; display:flex; flex-direction:column; gap:2.4mm; }
.part { font-family:'Fredoka'; font-weight:500; color:var(--accent); font-size:10pt; text-transform:uppercase; letter-spacing:.04em; border-top:1px solid #e3e6ee; padding-top:1.6mm; margin-top:.4mm; }
.item { break-inside:avoid; }
.q { display:grid; grid-template-columns:6.5mm 1fr; gap:1.2mm; }
.qn { font-family:'Fredoka'; font-weight:600; color:var(--accent); }
.opts { display:flex; flex-wrap:wrap; gap:1mm 5mm; margin-top:.8mm; }
.opt { white-space:nowrap; }
.order { margin-top:1mm; }
.ob { display:inline-block; width:9mm; height:5.5mm; border:1.1px solid var(--ink); border-radius:1.5mm; margin-left:1.5mm; vertical-align:middle; }
.ob.sm { width:6mm; height:4.6mm; margin:0; flex:none; }
.fb { display:inline-block; min-width:14mm; border-bottom:1.2px solid var(--ink); }
.bank { margin-right:4mm; font-size:9.5pt; color:#374151; }
.fillline { margin-top:.4mm; }
.match { display:grid; grid-template-columns:1fr 1fr; gap:3mm; margin-top:1mm; }
.mrow { display:flex; align-items:center; gap:1.5mm; margin:.6mm 0; }
.ans { margin-top:1mm; }
.blank { display:inline-block; min-width:20mm; border-bottom:1.2px solid var(--ink); height:5mm; vertical-align:bottom; margin-left:1mm; }
.lines { margin-top:1.4mm; }
.lines div { border-bottom:1px solid var(--line); height:6.5mm; }
.box { border:1.4px solid var(--line); border-radius:3.5mm; padding:2.2mm 3.5mm; flex:none; }
.box h3 { font-size:11.5pt; margin-bottom:1mm; }
.box p { margin:0; font-size:10.5pt; }
.box.home { background:var(--tint2); border-color:transparent; }
.row { display:flex; justify-content:space-between; gap:4mm; font-size:10.5pt; padding:.6mm 0; border-bottom:1px dotted #d6dae3; }
.faces { white-space:nowrap; color:var(--soft); font-size:12pt; }
.foot { display:flex; justify-content:space-between; font-size:8pt; color:#8a93a5; border-top:1px solid #e3e6ee; padding-top:1.5mm; flex:none; }
.akey { columns:2; column-gap:6mm; font-size:9.5pt; line-height:1.3; flex:1; min-height:0; overflow:hidden; }
.akey div { break-inside:avoid; margin-bottom:1.1mm; }
.akey b { font-family:'Fredoka'; color:var(--accent); font-weight:600; }
.hint { position:fixed; top:8px; right:12px; background:#111827; color:#fff; font:13px system-ui; padding:8px 12px; border-radius:8px; z-index:9; }
@media print { .hint { display:none; } }
`;

/** Runs in the browser. Fills the two pages greedily, numbers what made it, builds the answer key, and reports back on window.__worksheet. */
const PACK_JS = `
(function () {
  var data = JSON.parse(document.getElementById('ws-data').textContent);
  var mode = new URLSearchParams(location.search).get('mode');
  if (mode === 'sheet' || mode === 'answers') document.body.setAttribute('data-mode', mode);
  function pack() {
    var bodies = [document.getElementById('b1'), document.getElementById('b2')];
    var over = function (el) { return el.scrollHeight > el.clientHeight + 1; };
    var pi = 0;
    data.items.concat(data.tail).forEach(function (html) {
      var tmp = document.createElement('div'); tmp.innerHTML = html; var node = tmp.firstElementChild;
      for (var k = pi; k < bodies.length; k++) {
        bodies[k].appendChild(node);
        if (over(bodies[k])) { node.remove(); } else { pi = k; return; }
      }
    });
    bodies.forEach(function (body) {
      Array.prototype.slice.call(body.querySelectorAll('.part')).forEach(function (el) {
        var nx = el.nextElementSibling;
        if (!nx || nx.classList.contains('part')) el.remove();
      });
    });
    var rows = [], n = 0;
    bodies.forEach(function (body) {
      Array.prototype.forEach.call(body.querySelectorAll('.item.q'), function (q) {
        n++; q.querySelector('.qn').textContent = String(n);
        rows.push('<div><b>' + n + '.</b> ' + data.answers[q.getAttribute('data-n')] + '</div>');
      });
    });
    var ak = document.getElementById('ak'); ak.innerHTML = rows.join('');
    var size = 9.5;
    var fit = function () { return ak.scrollHeight <= ak.clientHeight + 1; };
    while (!fit() && size > 6.5) { size -= 0.25; ak.style.fontSize = size + 'pt'; }
    var used = bodies[1].children.length ? 2 : 1;
    if (used === 1) { var p2 = document.getElementById('p2'); p2.style.display = 'none'; }
    window.__worksheet = { questions: n, pages: used, keyFits: fit(), overflow: bodies.some(over) };
    document.body.setAttribute('data-ready', '1');
  }
  var go = function () { try { pack(); } catch (e) { window.__worksheet = { error: String(e) }; document.body.setAttribute('data-ready', 'error'); } };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else window.addEventListener('load', go);
})();
`;

export function worksheetHtml(file: LessonFile, opts: { hint?: boolean } = {}): string {
  const m = worksheetModel(file);
  const fs = m.age.startsWith("7") ? "11.5pt" : "10.5pt";
  const head = (small: boolean) => small
    ? `<div class="head small"><h1 class="s">${esc(m.title)}</h1><div class="kicker">${esc(m.subject)} · Practice sheet</div></div>`
    : `<div class="head"><div><div class="kicker">${esc(m.subject)} worksheet</div><h1>${esc(m.title)}</h1><div><span class="badge">Ages ${esc(m.age.replace("-", "–"))}</span></div></div>
        <div class="who"><span>Name</span><span class="l"></span><span>Date</span><span class="l"></span></div></div>`;
  const remember = m.objectives.length
    ? `<div class="remember"><div><h3 style="font-size:12pt">We are learning</h3><ul>${m.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></div>
       <div><h3 style="font-size:10.5pt">Key words</h3><div class="words">${m.words.map((w) => `<b>${esc(w)}</b>`).join("")}</div></div></div>`
    : "";
  const data = JSON.stringify({ items: m.items, tail: m.tail, answers: m.answers }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)} worksheet</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Fredoka:wght@500;600&display=swap" rel="stylesheet">
<style>${CSS}</style></head>
<body style="--fs:${fs}">
${opts.hint ? '<div class="hint">Print this page (Ctrl+P, Save as PDF, A4, no margins) to get the worksheet.</div>' : ""}
<section class="page" id="p1">${head(false)}${remember}<div class="body" id="b1"></div><div class="foot"><span>${esc(m.title)} · ${esc(m.subject)}</span><span>Page 1 of 2</span></div></section>
<section class="page" id="p2">${head(true)}<div class="body" id="b2"></div><div class="foot"><span>${esc(m.title)} · ${esc(m.subject)}</span><span>Page 2 of 2</span></div></section>
<section class="page" id="k"><div class="head"><div><div class="kicker">Answer key · for grown-ups</div><h1>${esc(m.title)}</h1></div><div class="kicker" style="text-align:right">${esc(m.subject)}<br>Only the questions on the sheet</div></div>
<div class="akey" id="ak"></div><div class="foot"><span>${esc(m.title)} · ${esc(m.subject)} · answer key</span><span>Keep for grown-ups</span></div></section>
<script type="application/json" id="ws-data">${data}</script>
<script>${PACK_JS}</script>
</body></html>`;
}
