# Kids' LMS: Architecture and Build Plan

A lightweight, private learning platform for two learners (ages 7 and 9) covering **Maths, Science, Computer Science / Data & AI, and General Knowledge**. Lessons and quizzes are generated with Claude in a fixed JSON format, uploaded by the parent (admin), and every quiz attempt is recorded so learning curves can be reviewed over time.

Status: **Option A (Cloudflare-native custom build) chosen on 2026-11-02.** Implementation follows this document phase by phase.

---

## 1. Requirements recap

| # | Requirement | How this plan meets it |
|---|---|---|
| 1 | Kid-friendly login per daughter | Avatar picker + simple password (or picture PIN), long-lived session on the family iPad/laptop |
| 2 | Admin uploads and organises lessons | Admin area (behind Cloudflare Access) with "paste or upload lesson JSON → validate → preview → publish" |
| 3 | Learning flow: subject → lesson → quiz | Kid dashboard → subject tiles → lesson player (interactive blocks) → quiz unlocks at the end of the lesson |
| 4 | Scores stored per user | `quiz_attempts` row per attempt, keyed by `user_id` |
| 5 | Every reattempt logged | Attempts are append-only and numbered; per-question answers stored in `attempt_answers`; nothing is overwritten |

---

## 2. Recommended tech stack

### Option A (recommended): Custom code, Cloudflare-native

Everything runs on your paid Cloudflare account. With two users the cost is effectively the Workers Paid plan you already have; D1, R2 and KV usage will sit far inside the included quotas.

| Layer | Choice | Why |
|---|---|---|
| Hosting | **Cloudflare Workers with Static Assets** (one Worker serves the React app and the API) | Single deploy, one domain, no CORS. Cloudflare now steers new projects to Workers rather than Pages; this keeps us on the main path. |
| Frontend | **React + Vite + TypeScript**, **Tailwind CSS**, React Router | Fast to build, big ecosystem, easy for Claude to generate components |
| API | **Hono** running in the same Worker | Tiny, typed, made for Workers |
| Database | **Cloudflare D1** (SQLite) | Relational data fits users/lessons/attempts perfectly; Time Travel gives 30-day point-in-time restore |
| Lesson media | **Cloudflare R2** | Images, audio, SVGs referenced by lessons; served via the Worker |
| Sessions | **KV** (session id → user id, with TTL) | Simple, fast, auto-expiring. Could also live in D1; KV keeps D1 for learning data only. |
| Kid auth | Own username + password, hashed with **PBKDF2 (WebCrypto)**, HttpOnly session cookie | Kids don't have email, so OAuth/magic links don't fit. Two accounts, so this stays small. |
| Admin auth | **Cloudflare Access** (Zero Trust, free tier) protecting `/admin*` and `/api/admin*`, login with your Google/email OTP | No admin password to build or leak; the Worker also verifies the Access JWT |
| Validation | **Zod** schemas shared by frontend and API | One source of truth for the lesson JSON format |
| Charts | **Recharts** | Learning-curve charts in the parent dashboard |
| Tooling | **Wrangler**, D1 migrations, Vitest, GitHub Actions deploy | Reproducible deploys from the repo |
| Optional later | Workers AI / Claude API for "explain this answer to me" hints; Cloudflare Turnstile on the login page | Nice-to-haves, not in v1 |

**Why structured JSON lessons instead of raw HTML from Claude:** a fixed block format means every lesson looks consistent, works on a tablet, can be validated before publishing, and lets quiz answers be graded on the server (so a curious 9-year-old can't find answers in the page source). For the occasional special interactive (a simulation, a mini-game) there is an `html_embed` block that runs in a sandboxed iframe.

### Option B: No-code / low-code, Softr + Airtable

| Layer | Choice |
|---|---|
| Database | **Airtable** base with tables mirroring the schema in section 3 |
| App + login | **Softr** (user groups "Student" and "Parent", email/password login, conditional pages) |
| Lesson content | Rich text in Airtable, or a Softr "Custom code" block embedding a lesson page hosted on Cloudflare |
| Quiz | Softr form that writes a row to `Attempt Answers`; Airtable automation scores it and writes the `Quiz Attempts` total |
| Reporting | Softr charts, or Airtable interface for the parent |

How to build it, briefly: create the Airtable base, connect Softr, set up two user groups, build Subject → Lesson list → Lesson detail pages filtered to "Published", add a quiz form per lesson, and an Airtable automation that grades on submit.

Honest trade-offs, given your goals:
- Real interactivity (drag-to-order, number lines, instant feedback inside the lesson) is very limited without custom code.
- Logins need an email address per child (you can use `you+name@gmail.com` aliases).
- Grading through automations is clunky, answers are visible to a determined child, and plan limits (users, records, automations) apply.
- Monthly cost (~$20–60) for something Cloudflare runs for nearly nothing.

It's the fastest way to see something working in a weekend. **Decision: Option A** (confirmed 2026-11-02). Claude can generate most of the code, you already pay for Cloudflare, and the lesson format in section 5 only works fully with Option A.

---

## 3. Database schema (Cloudflare D1 / SQLite)

### Design principles
- **Attempts are append-only.** A retake inserts a new `quiz_attempts` row with the next `attempt_number`; no score is ever updated or deleted.
- **Per-question answers are stored**, so you can see *which* questions improved between attempts, not just the total.
- **Content is versioned.** If you re-upload a lesson with changes, the quiz gets a new version and new question rows; old attempts still point at the exact questions the child saw.
- **Answers are graded on the server**; the correct answer never goes to the kid's browser before submission.

### Entity overview

```
users ─┬─< lesson_progress >── lessons ──< quizzes ──< questions
       │                         │              │
       └─< quiz_attempts >───────┼──────────────┘
              │                  │
              └─< attempt_answers >── questions
subjects ──< lessons            assets (R2 files) used by lessons
```

### Tables

```sql
-- People ---------------------------------------------------------------
CREATE TABLE users (
  id            TEXT PRIMARY KEY,              -- uuid
  role          TEXT NOT NULL CHECK (role IN ('student','admin')),
  username      TEXT NOT NULL UNIQUE,          -- e.g. 'aisha'
  display_name  TEXT NOT NULL,                 -- e.g. 'Aisha'
  password_hash TEXT,                          -- PBKDF2; NULL for admin (uses Cloudflare Access)
  admin_email   TEXT UNIQUE,                   -- admin only, matched against Access JWT
  avatar        TEXT,                          -- emoji or R2 key
  birth_year    INTEGER,                       -- drives default age band
  theme         TEXT NOT NULL DEFAULT 'space' CHECK (theme IN ('space','candy')),  -- UI theme, switchable by the child
  theme_color   TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Catalogue ------------------------------------------------------------
CREATE TABLE subjects (
  id          TEXT PRIMARY KEY,                -- 'maths','science','data-ai','general-knowledge'  (data-ai is shown to kids as "Computer Science, Data & AI")
  name        TEXT NOT NULL,
  icon        TEXT,                            -- emoji
  color       TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE lessons (
  id                TEXT PRIMARY KEY,          -- uuid
  slug              TEXT NOT NULL UNIQUE,      -- from lesson JSON, stable across versions
  subject_id        TEXT NOT NULL REFERENCES subjects(id),
  title             TEXT NOT NULL,
  summary           TEXT,
  age_band          TEXT NOT NULL,             -- '7-8' | '9-10' | '7-10'
  difficulty        INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  estimated_minutes INTEGER,
  unit              TEXT,                      -- optional grouping, e.g. 'Fractions'
  sort_order        INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  current_version   INTEGER NOT NULL DEFAULT 1,
  content_json      TEXT NOT NULL,             -- blocks[] of the current version (validated)
  source_json       TEXT NOT NULL,             -- the full uploaded JSON, for re-editing with Claude
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_lessons_subject ON lessons(subject_id, status, sort_order);

-- Optional: which kid can see which lesson (default: all published lessons matching age band)
CREATE TABLE lesson_assignments (
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  user_id   TEXT NOT NULL REFERENCES users(id),
  PRIMARY KEY (lesson_id, user_id)
);

CREATE TABLE quizzes (
  id                TEXT PRIMARY KEY,          -- uuid
  lesson_id         TEXT NOT NULL REFERENCES lessons(id),
  version           INTEGER NOT NULL,          -- matches lessons.current_version at creation
  is_current        INTEGER NOT NULL DEFAULT 1,
  pass_percent      INTEGER NOT NULL DEFAULT 70,
  shuffle_questions INTEGER NOT NULL DEFAULT 1,
  shuffle_options   INTEGER NOT NULL DEFAULT 1,
  max_attempts      INTEGER,                   -- NULL = unlimited
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (lesson_id, version)
);

CREATE TABLE questions (
  id           TEXT PRIMARY KEY,               -- uuid
  quiz_id      TEXT NOT NULL REFERENCES quizzes(id),
  ref          TEXT NOT NULL,                  -- 'q1','q2' from the JSON
  position     INTEGER NOT NULL,
  type         TEXT NOT NULL CHECK (type IN
                 ('multiple_choice','multi_select','true_false','number','short_text','order','match')),
  prompt       TEXT NOT NULL,
  media_json   TEXT,                           -- optional image/emoji
  options_json TEXT,                           -- choices / items / pairs (no answers)
  answer_json  TEXT NOT NULL,                  -- never sent to the student client
  hint         TEXT,
  explanation  TEXT,                           -- shown after submitting
  points       INTEGER NOT NULL DEFAULT 1,
  skill_tag    TEXT,                           -- e.g. 'fractions.compare' for skill-level reports
  UNIQUE (quiz_id, ref)
);

CREATE TABLE assets (
  id          TEXT PRIMARY KEY,
  r2_key      TEXT NOT NULL UNIQUE,            -- 'lessons/<slug>/<file>'
  filename    TEXT NOT NULL,
  mime_type   TEXT NOT NULL,
  size_bytes  INTEGER,
  alt_text    TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Learning records -----------------------------------------------------
CREATE TABLE lesson_progress (
  user_id         TEXT NOT NULL REFERENCES users(id),
  lesson_id       TEXT NOT NULL REFERENCES lessons(id),
  status          TEXT NOT NULL CHECK (status IN ('started','completed')),
  last_block      INTEGER NOT NULL DEFAULT 0,  -- resume point
  first_opened_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at    TEXT,
  time_spent_sec  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE quiz_attempts (
  id               TEXT PRIMARY KEY,           -- uuid
  user_id          TEXT NOT NULL REFERENCES users(id),
  quiz_id          TEXT NOT NULL REFERENCES quizzes(id),   -- pins the exact version
  lesson_id        TEXT NOT NULL REFERENCES lessons(id),   -- denormalised for easy reporting
  attempt_number   INTEGER NOT NULL,           -- 1,2,3... per user per lesson
  status           TEXT NOT NULL DEFAULT 'in_progress'
                     CHECK (status IN ('in_progress','submitted','abandoned')),
  started_at       TEXT NOT NULL DEFAULT (datetime('now')),
  submitted_at     TEXT,
  duration_sec     INTEGER,
  score            INTEGER,                    -- points earned
  max_score        INTEGER,
  percent          REAL,
  passed           INTEGER,
  question_order   TEXT,                       -- JSON array of question ids as shown
  UNIQUE (user_id, lesson_id, attempt_number)
);
CREATE INDEX idx_attempts_user_lesson ON quiz_attempts(user_id, lesson_id, attempt_number);
CREATE INDEX idx_attempts_user_time   ON quiz_attempts(user_id, submitted_at);

CREATE TABLE attempt_answers (
  attempt_id     TEXT NOT NULL REFERENCES quiz_attempts(id),
  question_id    TEXT NOT NULL REFERENCES questions(id),
  response_json  TEXT NOT NULL,                -- what the child answered
  is_correct     INTEGER NOT NULL,
  points_awarded INTEGER NOT NULL,
  used_hint      INTEGER NOT NULL DEFAULT 0,
  time_ms        INTEGER,
  PRIMARY KEY (attempt_id, question_id)
);
```

### How reattempts work
1. Child taps **Start quiz** → API creates `quiz_attempts` with `attempt_number = MAX(attempt_number)+1` for that user and lesson, `status='in_progress'`, against the *current* quiz version.
2. Child answers; on **Submit** the API grades each response against `answer_json`, writes one `attempt_answers` row per question, and fills `score`, `percent`, `passed`, `submitted_at`.
3. A retake repeats step 1. Earlier rows are never touched. Attempts left `in_progress` for over 24 hours are marked `abandoned` (still kept).

### Useful report queries

```sql
-- Learning curve: every attempt for one child on one lesson
SELECT attempt_number, percent, submitted_at, duration_sec
FROM quiz_attempts
WHERE user_id = ? AND lesson_id = ? AND status = 'submitted'
ORDER BY attempt_number;

-- First vs best vs latest per lesson for one child
SELECT l.title,
       COUNT(*) AS attempts,
       MAX(CASE WHEN a.attempt_number = 1 THEN a.percent END) AS first_pct,
       MAX(a.percent) AS best_pct,
       (SELECT percent FROM quiz_attempts x
         WHERE x.user_id = a.user_id AND x.lesson_id = a.lesson_id AND x.status='submitted'
         ORDER BY attempt_number DESC LIMIT 1) AS latest_pct
FROM quiz_attempts a JOIN lessons l ON l.id = a.lesson_id
WHERE a.user_id = ? AND a.status = 'submitted'
GROUP BY a.lesson_id;

-- Weakest skills (most-missed skill tags)
SELECT q.skill_tag, AVG(aa.is_correct) AS accuracy, COUNT(*) AS answered
FROM attempt_answers aa
JOIN questions q ON q.id = aa.question_id
JOIN quiz_attempts a ON a.id = aa.attempt_id
WHERE a.user_id = ?
GROUP BY q.skill_tag ORDER BY accuracy ASC;
```

---

## 4. Step-by-step build plan

Each phase ends with something you can click on. Planning is done with Claude Opus; implementation with Claude Sonnet.

### Phase 0: Project setup (½ day)
- Scaffold the repo: `apps/web` (React + Vite + Tailwind), `worker/` (Hono API), `packages/schema` (Zod lesson schema shared by both), `migrations/`.
- `wrangler.jsonc` with bindings: `DB` (D1), `ASSETS_BUCKET` (R2), `SESSIONS` (KV), static assets from `apps/web/dist`.
- Create resources: D1 `lms-db`, R2 bucket `lms-assets`, KV namespace `lms-sessions`.
- Theming foundation: all colours, fonts, radii and shadows live in CSS variables (design tokens) under `[data-theme="space"]` and `[data-theme="candy"]`; components never hard-code a colour. See section 4a.
- GitHub Action: on push to `main`, run tests, apply D1 migrations, `wrangler deploy`.
- **Done when:** a "Hello" page is live on a `*.workers.dev` URL.

### Phase 1: Database (½ day)
- Write `migrations/0001_init.sql` from section 3.
- Seed script: four subjects, one admin row (your email), two student accounts.
- **Done when:** `wrangler d1 execute` shows the tables and seed data locally and remotely.

### Phase 2: Authentication (1 day)
- Kid login screen: big avatar tiles ("Who's learning today?") → password or picture-PIN pad.
- `POST /api/login` verifies PBKDF2 hash, stores session in KV (30-day TTL), sets HttpOnly, Secure, SameSite=Lax cookie. Rate-limit failed logins per username.
- `POST /api/logout`, `GET /api/me`.
- Cloudflare Access application on `/admin*` and `/api/admin*` (your email only); Worker validates the `Cf-Access-Jwt-Assertion` header.
- Admin page to reset a child's password.
- **Done when:** each daughter can log in and out; `/admin` asks you to sign in with Access.

### Phase 3: Lesson format and admin upload (1–2 days)
- Implement the Zod schema matching section 5 (`schema_version: "1.0"`).
- Admin "Import lesson": paste JSON or upload `.json` → validate with clear error messages → **preview as a child would see it** → Save as draft / Publish.
- Re-importing the same `slug` creates a new version (new quiz + questions rows); old attempts are untouched.
- Asset upload to R2 (drag and drop images/audio), returning the filename to use in the JSON.
- Lesson list with filters by subject/status, reorder, archive.
- **Done when:** you can paste a Claude-generated lesson and see it previewed.

### Phase 4: Lesson player (2 days)
- One React component per block type (section 5). Large text, big tap targets, one block per screen with Next/Back, progress bar.
- Inline "check" blocks give instant feedback but are **not** scored; they're practice.
- Save `lesson_progress` (resume point, time spent); mark complete at the last block.
- Optional read-aloud via the browser's built-in speech (good for the 7-year-old).
- **Done when:** a lesson plays end to end on an iPad.

### Phase 5: Quiz engine and attempt tracking (2 days)
- `POST /api/quizzes/:lessonId/attempts` → creates attempt, returns questions **without answers** (shuffled per settings).
- `POST /api/attempts/:id/submit` → server-side grading per type (exact match, tolerance for numbers, normalised text for short answers, partial credit optional for match/order), writes `attempt_answers`, finalises score.
- Results screen: stars/score, which questions were right, explanations, **Try again** button.
- **Done when:** retaking a quiz three times produces three attempt rows with separate scores.

### Phase 6: Student dashboard (1 day)
- Home: greeting with avatar, four subject tiles with progress rings, "Continue where you left off", "New lessons".
- Subject page: lesson cards showing best score stars and attempt count.
- Theme switcher (big, friendly button in the header: a planet and a candy icon) that sets `users.theme` and applies it instantly. Each child keeps her own choice across devices.
- Light gamification: stars per lesson, streak counter. No leaderboards between sisters.
- **Done when:** the full flow (login → subject → lesson → quiz → dashboard) works for both kids.

### Phase 7: Parent dashboard (1–2 days)
- Per child: lessons completed, average first-attempt score, time spent this week.
- **Learning curve chart** per lesson (score vs attempt number) and over time (all attempts by date).
- Attempt drill-down: every answer the child gave, right/wrong, time taken.
- Weakest skills table (from `skill_tag`), which feeds back into what lessons you ask Claude to make next.
- CSV export of attempts.
- **Done when:** you can see every attempt each daughter has made.

### Phase 8: Polish and launch (1 day)
- Custom domain (e.g. `learn.yourdomain.com`) on the Worker.
- PWA manifest so it installs like an app on the iPad home screen.
- Accessibility pass (font sizes, contrast, dyslexia-friendly font option).
- Backups: D1 Time Travel is on by default; add a weekly scheduled Worker (Cron Trigger) that exports attempts to R2 as JSON.
- Load your first 8 lessons (2 per subject), hand the iPad over.

### Phase 9: Later ideas
- Spaced review: auto-suggest retaking quizzes scored under 70% after 3 and 7 days.
- "Ask for help" button using Claude/Workers AI with a kid-safe system prompt.
- Weekly email summary to you (Cron + Email Workers).
- Lesson "units" and simple unlock paths.

**Rough total:** 10–13 focused days of build time.

---

## 4a. Design and themes

Chosen direction (2026-11-02): **Space Explorers** as the default theme, plus **Candy Arcade** as a second theme, with a switcher. Mockups of all four explored directions are on the [design canvas](https://claude.ai/artifact/Mf2nkFQSzwtYYM8MC59wgF).

How the two themes stay cheap to maintain:
- **One set of components, two sets of tokens.** Colours, fonts, corner radii, borders and shadows are CSS variables defined per theme (`[data-theme="space"]`, `[data-theme="candy"]`). The `<html>` element carries the active `data-theme`.
- **Words change per theme, layout does not.** A small copy map renames things (Space: "planets", "missions", "XP", "Launch!". Candy: "worlds", "levels", "coins", "PLAY"). Lesson and quiz content are identical in both.
- **Persistence.** The choice is stored in `users.theme`, so each daughter keeps her own theme on any device. The admin can change it too. The theme is also cached in `localStorage` so the correct theme paints before the page loads (no flash).
- **Decorations are swappable assets.** Mascot, background stars, planets and level-map art are theme-specific SVG components behind one interface, so adding a third theme later means adding one token set and one art pack.
- **Accessibility holds in both.** Both themes must keep text contrast at 4.5:1 or better and tap targets at 44px or larger; a check runs against the token sets in CI.
- **Estimated extra effort:** about 1 day on top of a single theme if tokens are used from Phase 0. Retrofitting later would cost much more, which is why the foundation goes in first.

## 5. Lesson generation framework

### 5.1 Lesson JSON format (v1.0)

```json
{
  "schema_version": "1.0",
  "lesson": {
    "slug": "maths-fractions-halves-quarters",
    "subject": "maths",
    "title": "Halves and Quarters",
    "summary": "Learn how to split things into 2 and 4 equal parts.",
    "age_band": "7-8",
    "difficulty": 1,
    "estimated_minutes": 12,
    "unit": "Fractions",
    "learning_objectives": [
      "Explain what 'equal parts' means",
      "Recognise one half and one quarter of a shape or group"
    ],
    "tags": ["fractions", "shapes"]
  },
  "blocks": [
    { "type": "heading", "text": "Sharing a pizza 🍕" },
    { "type": "text", "markdown": "If two friends share a pizza **fairly**, each gets the same amount." },
    { "type": "image", "emoji": "🍕", "caption": "One pizza, two equal halves" },
    { "type": "callout", "style": "tip", "markdown": "Equal parts must be the **same size**." },
    { "type": "reveal", "prompt": "How many quarters make a whole?", "answer_markdown": "**4** quarters make a whole." },
    { "type": "check", "question": {
        "type": "multiple_choice",
        "prompt": "A cake is cut into 2 equal parts. What is each part called?",
        "options": [{ "id": "a", "text": "A half" }, { "id": "b", "text": "A quarter" }],
        "answer": ["a"],
        "explanation": "2 equal parts = halves."
    } },
    { "type": "summary", "points": ["Halves = 2 equal parts", "Quarters = 4 equal parts"] }
  ],
  "quiz": {
    "pass_percent": 70,
    "shuffle_questions": true,
    "questions": [
      {
        "ref": "q1",
        "type": "multiple_choice",
        "prompt": "Which picture shows one half?",
        "options": [
          { "id": "a", "text": "🟦⬜ (2 equal parts, 1 shaded)" },
          { "id": "b", "text": "🟦⬜⬜ (3 equal parts, 1 shaded)" }
        ],
        "answer": ["a"],
        "hint": "Count the parts.",
        "explanation": "One of two equal parts is a half.",
        "points": 1,
        "skill_tag": "fractions.identify_half"
      },
      {
        "ref": "q2",
        "type": "number",
        "prompt": "How many quarters are in one whole?",
        "answer": { "value": 4, "tolerance": 0 },
        "explanation": "A whole splits into 4 quarters.",
        "points": 1,
        "skill_tag": "fractions.quarters"
      }
    ]
  }
}
```

**Block types:** `heading`, `text` (markdown), `image` (`emoji` or `asset` filename uploaded to R2, plus `alt`), `callout` (`tip` | `fun_fact` | `warning`), `reveal` (tap to show), `check` (one ungraded practice question, any quiz type), `steps` (numbered list), `vocab` (word + kid-friendly meaning), `activity` (offline hands-on task), `summary`, `html_embed` (sandboxed self-contained HTML for a special simulation; use sparingly).

**Question types and `answer` shape:**

| type | options | answer |
|---|---|---|
| `multiple_choice` | `[{id,text}]` (3–4) | `["b"]` |
| `multi_select` | `[{id,text}]` | `["a","c"]` |
| `true_false` | none | `[true]` or `[false]` |
| `number` | none | `{ "value": 12, "tolerance": 0 }` |
| `short_text` | none | `{ "accepted": ["photosynthesis"] }` (case/space-insensitive) |
| `order` | `items: [{id,text}]` | `["c","a","b"]` (correct sequence) |
| `match` | `left: [{id,text}], right: [{id,text}]` | `{ "l1": "r2", "l2": "r1" }` |

### 5.2 The meta-prompt

Copy everything inside the block, fill in the four `{{...}}` lines, and send it to Claude.

````text
You are an expert primary-school teacher and instructional designer creating ONE interactive lesson
and quiz for my kids' learning platform. Output must import directly into the platform.

=== THIS LESSON ===
Subject: {{maths | science | data-ai | general-knowledge}}
Topic: {{e.g. "Halves and quarters"}}
Learner: {{age 7 (age_band "7-8") | age 9 (age_band "9-10") | both (age_band "7-10")}}
Extra notes (optional): {{e.g. "she loves animals", "build on last week's lesson on counting by 2s"}}

=== TEACHING RULES ===
- Reading level: age 7 → short sentences, max ~12 words, everyday words. Age 9 → up to ~18 words, can
  introduce 2–3 new vocabulary words (use a "vocab" block for each).
- Structure: hook (a question or story) → explain → 2–3 practice "check" blocks spread through the
  lesson → real-world connection → summary.
- 8–15 blocks; 8–15 minutes. One idea per block. Use emojis for visuals; no external image URLs.
- Be accurate. For science and general knowledge, only use well-established facts suitable for kids.
- For data-ai (Computer Science, Data & AI): cover three strands and say which one this lesson is in
  `unit`: (1) Computer Science: step-by-step instructions (algorithms), loops, if/then, patterns,
  debugging, binary, how computers work, staying safe online (mostly unplugged, no coding needed);
  (2) Data: sorting, pictograms, charts, averages; (3) AI: concrete, kid-relatable examples ("how does
  a robot learn the difference between cats and dogs") and honesty about what AI can't do.
- Warm, encouraging tone. No scary content. UK/US neutral spelling where possible.

=== QUIZ RULES ===
- 6–10 questions (age 7: 6–8; age 9: 8–10). Every question must be answerable from the lesson.
- Mix at least 3 question types. Order roughly easy → harder.
- Do not reuse the exact wording of the lesson's "check" questions.
- Multiple-choice: 3–4 options, one clearly correct, plausible distractors based on common
  misconceptions, no "all of the above".
- Each question has: ref (q1, q2, ...), a short hint that doesn't give the answer away, a 1–2
  sentence explanation, points (1, or 2 for order/match), and a skill_tag in "topic.skill" snake_case.

=== OUTPUT FORMAT (STRICT) ===
Return ONLY one JSON object in a single ```json code block, nothing before or after it.
It must follow schema_version "1.0" exactly:

{
  "schema_version": "1.0",
  "lesson": {
    "slug": "<subject>-<topic-in-kebab-case>",
    "subject": "maths" | "science" | "data-ai" | "general-knowledge",
    "title": string (max 50 chars),
    "summary": string (one sentence),
    "age_band": "7-8" | "9-10" | "7-10",
    "difficulty": 1 | 2 | 3,
    "estimated_minutes": integer,
    "unit": string,
    "learning_objectives": [2-4 strings],
    "tags": [strings]
  },
  "blocks": [ ...block objects... ],
  "quiz": {
    "pass_percent": 70,
    "shuffle_questions": true,
    "questions": [ ...question objects... ]
  }
}

Block objects (use only these):
  {"type":"heading","text":string}
  {"type":"text","markdown":string}
  {"type":"image","emoji":string,"caption":string}
  {"type":"callout","style":"tip"|"fun_fact"|"warning","markdown":string}
  {"type":"reveal","prompt":string,"answer_markdown":string}
  {"type":"check","question":<question object without ref/points/skill_tag>}
  {"type":"steps","items":[strings]}
  {"type":"vocab","word":string,"meaning":string,"example":string}
  {"type":"activity","title":string,"materials":[strings],"instructions":[strings]}
  {"type":"summary","points":[strings]}

Question objects:
  multiple_choice: {"ref","type":"multiple_choice","prompt","options":[{"id":"a","text"},...],"answer":["a"],"hint","explanation","points","skill_tag"}
  multi_select:    same as multiple_choice, "answer": ["a","c"]
  true_false:      {"ref","type":"true_false","prompt","answer":[true|false],"hint","explanation","points","skill_tag"}
  number:          {"ref","type":"number","prompt","answer":{"value":number,"tolerance":number},"hint","explanation","points","skill_tag"}
  short_text:      {"ref","type":"short_text","prompt","answer":{"accepted":[strings]},"hint","explanation","points","skill_tag"}
  order:           {"ref","type":"order","prompt","items":[{"id","text"}],"answer":[ids in correct order],"hint","explanation","points","skill_tag"}
  match:           {"ref","type":"match","prompt","left":[{"id":"l1","text"}],"right":[{"id":"r1","text"}],"answer":{"l1":"r2",...},"hint","explanation","points","skill_tag"}

Before answering, silently check: valid JSON (double quotes, no trailing commas, no comments);
every answer id exists in its options/items; short_text answers list common spellings; numbers are
correct; every quiz question is covered by the lesson. Then output the JSON only.
````

### 5.3 Workflow for each new lesson
1. Fill in the meta-prompt and send it to Claude.
2. Optional: ask Claude "Review this lesson as a 7-year-old would experience it and fix anything confusing", then "output the corrected JSON only".
3. In the admin area, paste the JSON → fix any validation errors (or paste the error back to Claude) → preview → publish.
4. After the kids take the quiz, check the weakest-skills report and ask Claude for a follow-up lesson targeting those `skill_tag`s.

### 5.4 Suggested first lessons
| Subject | Age 7 | Age 9 |
|---|---|---|
| Maths | Halves and quarters | Equivalent fractions |
| Science | What do plants need? | The water cycle |
| Computer Science, Data & AI | Giving a robot step-by-step instructions | Loops and if/then, or how computers learn from examples |
| General Knowledge | The 7 continents | Countries, capitals and flags |

---

## 6. Security and privacy notes
- Only first names stored; no email addresses for the kids; no third-party tracking or analytics.
- Admin protected by Cloudflare Access, never by a password stored in the app.
- Kid passwords hashed (PBKDF2, 100k+ iterations, per-user salt); sessions in HttpOnly cookies.
- `html_embed` blocks run in `<iframe sandbox="allow-scripts">` with no same-origin access.
- Quiz answers graded server-side and never sent to the client before submission.
