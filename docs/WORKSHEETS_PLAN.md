# Printable lesson worksheets: plan

Status: **plan only, waiting for approval.** Nothing is built yet.

## 1. What Uzair asked for

A printable worksheet for every lesson that sits in a **published course**, to hand to Fatima and Zainab after they finish the lesson.

- At most **2 A4 pages**.
- **Activities and practice questions** on the lesson's topic.
- A **PDF** you can print.
- Downloadable from the admin **Lessons** list.

## 2. Recommendation in one paragraph

Claude writes each worksheet as a small JSON file next to the lesson (`content/worksheets/<slug>.json`), from the lesson's own objectives, key words, examples and quiz questions, aged to the lesson's age band and checked by the same guideline checks as lessons (British spelling, sentence length by age). The file is imported through the existing service token. The Worker turns it into HTML with one print template, and **Cloudflare Browser Run** (formerly Browser Rendering; included in Workers Paid) prints that HTML to an A4 PDF the first time someone clicks Download. The PDF is kept in **R2** and served from there after that. When a lesson changes, its worksheet is marked **out of date** (it still downloads) until Claude writes a new one. A one-page **answer key** PDF for the grown-up comes with each worksheet and does not count towards the 2 pages.

## 3. Design images

All in `docs/worksheets/` (and `/mnt/project-files/screens/worksheets/`).

| Image | What it shows |
| --- | --- |
| `worksheet-page1.png` | Page 1: header with name and date, "Remember" box with key words, then 3 activities (draw it, number line, partition). |
| `worksheet-page2.png` | Page 2: 7 practice questions, a Challenge, "Try it at home", "How did I do?" faces for each "I can" statement, grown-up score and signature. |
| `answer-key.png` | The separate one-page answer key, with "watch for" notes and what to revisit. |
| `lessons-list-button.png` | The Lessons list with the new **Worksheet** button in each row, its four states, a "Worksheet" filter, counts, and "Worksheets for a course". |
| `lessons-list-menu.png` | The `···` menu: Download worksheet, Download answer key, Preview worksheet, Make a fresh copy. |
| `sample-place-value-worksheet.pdf` | A real 2-page A4 PDF of the Place Value to 100 sample, printed by Chromium from the template. |

The sample is the real Class 1 Maths topic "Place Value to 100" with content taken from its objectives, success criteria and quiz.

## 4. What a worksheet contains

Same shape for every subject, so the girls know what to expect:

**Page 1**
1. Header: subject and topic number, lesson title, age band, about how long, Name and Date lines.
2. **Remember** box: 2 to 4 key points from the lesson and its key words (from the lesson's bold words and glossary).
3. **2 or 3 activities**: things to do with a pencil, not just questions. Draw it, label it, sort it, match it, colour it, put in order, fill a table, follow steps.

**Page 2**
4. **Practice questions**: 6 to 10, mixed types, easier first, worth about 10 to 14 marks.
5. **Challenge** (one stretch question).
6. **Try it at home** (one real-life task with a grown-up, matching the lesson's `real_life` line).
7. **How did I do?**: one row of faces per "I can" success criterion, plus grown-up score and signature.

**Answer key (separate PDF, 1 page)**: answers, marks, "watch for" common mistakes, and which lesson part or clip to go back to.

### Item kinds the template can draw

Each is a fixed, print-safe drawing, so Claude only supplies data (no free-form HTML):

| Kind | Used for |
| --- | --- |
| `tick_one`, `true_false` | Tick boxes |
| `fill_blank` | Sentences or sums with gaps |
| `compare` | Circles to write `<`, `>` or `=` |
| `order` | Boxes to put items in order |
| `match_lines` | Two columns of dots to join |
| `short_answer` | Question with 1 to 4 writing lines |
| `draw_box` | Labelled boxes to draw in, with an optional worked example |
| `number_line` | 0 to 10/20/100/1000 with arrows and answer boxes |
| `base_ten`, `ten_frame`, `bar_model`, `fraction_bar`, `clock` | Maths pictures |
| `table` | Tally chart, sorting table, results table with blanks |
| `label_diagram` | A simple line drawing with numbered label lines (from a small built-in set: plant, body, Earth, circuit, computer...) |
| `steps` / `robot_grid` | Algorithms, sequences and grid paths for Computer Science, Data & AI |
| `word_bank` | Words to choose from (English, Science) |
| `venn` | Two-circle sort |

New kinds can be added later in the same way as lesson blocks, and listed in `docs/LESSON_CAPABILITIES.md`.

### Print rules

- A4 portrait, 11 to 12 mm margins, nothing in the outer 5 mm (home printers cut it off).
- Mostly black line art and one light subject colour, so it still reads when printed in black and white. No photos.
- Child-friendly font with single-storey "a" (Andika) for body text, Fredoka for headings, both bundled (no network fetch when printing).
- Body text at least 12 pt for ages 7 to 8, 11 pt for 9 to 10; writing lines 7.5 mm apart for 7 to 8, 6.5 mm for 9 to 10.
- Hard rule: the worksheet renders to **1 or 2 pages**. If it overflows, the import is refused with a message saying which section is too long (checked by rendering, see section 7).

## 5. Who writes the worksheet content

| | **A. Claude writes it (recommended)** | B. Workers AI writes it on demand |
| --- | --- | --- |
| Quality | Same quality as the lessons; checks answers against the lesson | Small models make maths and fact errors, weaker British spelling, unpredictable length |
| Matches the lesson | Uses the lesson's own examples, words and misconceptions | Only sees what we put in the prompt |
| Cost | No running cost; written in batches in Claude sessions | Uses the daily Workers AI neuron cap (about 9,500), which hints and narration already use |
| Review | Saved in the repo, diffable, can be edited | Would need a review screen anyway |
| Speed to have all ~120 | About 6 to 8 sessions of 15 to 20 worksheets each | Instant, but needs checking |

Recommendation: **A**. Workers AI stays out of worksheets.

How Claude writes one (added to `docs/LESSON_GUIDELINES.md` as a "Worksheets" section):

1. Read the lesson file: `learning_objectives`, `success_criteria`, `real_life`, glossary and bold words, each part's examples, and the quiz bank.
2. Pick 2 or 3 activities that make the child *do* the lesson's main idea on paper.
3. Pick practice questions that cover every objective, reusing quiz questions in new numbers or words (not the same items, so the paper is not a copy of the quiz).
4. Pitch to the age band: 7 to 8 shorter sentences, bigger spaces, worked example first; 9 to 10 more reasoning ("explain why") and a harder challenge.
5. British spelling and UK or Pakistan examples (pence and rupees, local names, cricket), Islamic perspective for sensitive topics, first names only.
6. Write the answer key with marks and "watch for" notes.

## 6. Which lessons get one

A lesson gets a worksheet when it is **published** and appears in at least one **published, not archived course**. That is the 120 topic lessons now (24 per subject, Class 1 and Class 4), not the 20 old week 1 and 2 lessons unless they are still in a published course. The list shows the count.

Lessons that are not in a published course show a greyed "No worksheet" button with a tooltip saying why. A worksheet already made is kept if a lesson later leaves a course.

## 7. How it works (technical)

### Data

New migration `0023_worksheets.sql`:

```sql
CREATE TABLE worksheets (
  lesson_id        TEXT PRIMARY KEY REFERENCES lessons(id),
  spec_json        TEXT NOT NULL,          -- validated worksheet JSON
  spec_hash        TEXT NOT NULL,          -- first 12 hex of sha256 of canonical spec
  lesson_version   INTEGER NOT NULL,       -- lessons.current_version it was written for
  pdf_key          TEXT,                   -- R2 key of the worksheet PDF, NULL until first render
  answers_key      TEXT,                   -- R2 key of the answer key PDF
  pages            INTEGER,                -- 1 or 2, measured at render
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
```

"Out of date" is simply `worksheets.lesson_version < lessons.current_version`.

### Schema and authoring

- `packages/schema/src/worksheet.ts`: Zod `worksheetSchema` (sections, item kinds above, answers per item, marks). Shared by the Worker, the build script and tests.
- `content/worksheets/<slug>.json`: one per lesson, written by Claude. `scripts/build-worksheets.mjs` validates them and runs the guideline checks from `scripts/lesson-kit.mjs` (spelling list, sentence length by age).
- `scripts/import-worksheets.mjs <files...>` uploads them with the existing service token (`PUT /api/admin/lessons/:id/worksheet`). Add that route to `automationMayCall` in `worker/src/middleware/auth.ts`. Same pattern as `scripts/import-lessons.mjs`.

### Rendering to PDF

- `worker/src/lib/worksheet-html.ts` turns a spec into one self-contained HTML page (inline CSS and SVG, fonts from the Worker's static assets). The admin **Preview worksheet** opens this HTML in a new tab, which is also the easiest way to check layout.
- `GET /api/admin/lessons/:id/worksheet.pdf` (and `/answers.pdf`):
  1. If `pdf_key` is set and was made from the current `spec_hash`, stream it from R2 (`worksheets/<slug>-<hash>.pdf`).
  2. Otherwise launch **Browser Run** through a Worker binding (`"browser": { "binding": "BROWSER" }` in `wrangler.jsonc`, `@cloudflare/playwright`), load the HTML, `page.pdf({ format: "A4", printBackground: true })`, count the pages, save to R2, update the row, stream it back.
  3. The file downloads as `Place Value to 100 - worksheet.pdf`.
- Cost: one render is about 3 to 5 seconds of browser time. 120 worksheets plus answer keys is about 15 to 20 minutes, inside the **10 free browser hours a month** on Workers Paid. Re-downloads cost nothing because they come from R2.
- Local development has no Browser Run, so the route returns the HTML with a "print to PDF" hint when `env.BROWSER` is missing (like `env.AI` today).

### Page-count check

On import the Worker renders once and refuses a worksheet that comes out at 3 or more pages (or an answer key over 1 page), with the section that overflowed. `build-worksheets.mjs` does the same check locally with the preinstalled Playwright, so Claude catches it before importing.

### Bulk

- **Making them**: Claude writes them in batches by subject and class (for example "Maths Class 1, 12 worksheets"), runs `build-worksheets.mjs`, imports, and posts screenshots of a few. About 6 to 8 sessions for all 120.
- **Printing them** ahead of time: `POST /api/admin/worksheets/render-all` renders every worksheet that has no current PDF, a few at a time, using `ctx.waitUntil`. Optional; the first click does it anyway.
- **Downloading many**: "Worksheets for a course" (top of the Lessons page) picks a course and downloads **one combined PDF** in course order (worksheets only, or worksheets plus answer keys). Merged in the Worker with `pdf-lib` from the stored PDFs, no browser needed.

### When a lesson changes

- Re-importing a lesson bumps `current_version`. The worksheet row is left alone, so the button turns amber "out of date" and still downloads the old sheet.
- The list filter "Worksheet: out of date" shows the ones to redo. Claude updates them in the next batch; a new `spec_hash` means a new R2 key, so an old PDF is never served for a new spec.
- **Make a fresh copy** re-prints the PDF from the saved spec (useful after a template change). A template change bumps a `TEMPLATE_VERSION` constant that is part of the R2 key, so all PDFs re-print on next click.

### Admin UI changes (Lessons page)

- New **Worksheet** button after Videos, with 4 states: ready (blue, downloads), out of date (amber, downloads, tooltip explains), not made yet (dashed, disabled, tooltip "Ask Claude to write it"), not in a published course (grey, disabled).
- `···` menu gains a Worksheet group: Download worksheet, Download answer key, Preview worksheet, Make a fresh copy.
- New filter **Worksheet: any / ready / out of date / not made yet** and a count line under the filters.
- `GET /api/admin/lessons` returns `worksheet: { state, pages, updated_at } | null` per row so the list needs no extra calls.
- Teachers with view access can download; only super admin can "Make a fresh copy".

### Tests

- Schema tests for every item kind and the age rules.
- `worksheet-html` snapshot tests (structure, not pixels).
- Route tests: download from R2, render on miss (mock `BROWSER`), out-of-date state, permissions, service token can PUT but not delete.
- Browser check (per the project rule): Preview worksheet and the Lessons list screenshotted at 1440x960 and iPad sizes; sample PDFs opened and checked for 2 pages.

## 8. Build order (Sonnet, after approval)

1. Schema, template, migration, routes, Lessons page button and menu, with the Place Value sample end to end. **One PR**, with screenshots and the real PDF.
2. Guideline section and `build-worksheets.mjs` page check.
3. Worksheets in batches: Maths and English first (most natural on paper), then Science, General Knowledge, Computer Science, Data & AI. One PR per batch with a montage of page 1s.
4. "Worksheets for a course" combined PDF.

## 9. Decisions for Uzair

1. **Who writes the content**: Claude (recommended) or Workers AI.
2. **Answer key**: separate 1-page PDF for grown-ups (recommended), printed on page 2 upside down, or none.
3. **Name on the sheet**: blank Name line, one PDF per lesson (recommended), or pre-filled with Fatima's or Zainab's name (one PDF per child per lesson).
4. **Colour**: one light subject colour (recommended, as in the images) or pure black and white.
5. **Later, not now**: should the girls also see a "Print my worksheet" button at the end of a lesson in their app? Not in this plan unless you want it.
