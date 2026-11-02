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
| AI helper | **Cloudflare Workers AI** (binding `AI`) for hints, answer explanations and draft text generation; optionally behind **AI Gateway** for logging, caching and rate limits | Same account and bill, no external keys, nothing leaves Cloudflare. See section 4b. |
| Optional later | Cloudflare Turnstile on the login page | Nice-to-have, not in v1 |

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
classes ──< class_members >── users
courses ──< course_lessons >── lessons
courses ──< course_assignments >── classes | users
classes ──< terms (4 semesters)      quizzes(kind='exam') ── semester-end exams per course
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
  theme         TEXT NOT NULL DEFAULT 'space' CHECK (theme IN ('space','candy','sunny','forest')),  -- UI theme, switchable by the child
  theme_color   TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  must_change_password INTEGER NOT NULL DEFAULT 0,  -- 1 for freshly generated passwords
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

-- Classes, courses and who sees what -------------------------------------
-- A class is a group of students (e.g. "Family", "Saturday Club").
CREATE TABLE classes (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  visibility_mode TEXT NOT NULL DEFAULT 'released'
                    CHECK (visibility_mode IN ('released','all_published')),  -- 'released' = weeks up to the current one; 'all_published' = open library
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE class_members (
  class_id  TEXT NOT NULL REFERENCES classes(id),
  user_id   TEXT NOT NULL REFERENCES users(id),
  joined_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (class_id, user_id)          -- a student can be in several classes
);

-- A course is an ordered collection of lessons (e.g. "Year 3 Fractions", "Robot Basics").
CREATE TABLE courses (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  subject_id  TEXT REFERENCES subjects(id),   -- NULL = mixed-subject course
  age_band    TEXT,
  status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE course_lessons (
  course_id TEXT NOT NULL REFERENCES courses(id),
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  position  INTEGER NOT NULL,
  semester  INTEGER CHECK (semester BETWEEN 1 AND 4),   -- curriculum slot (NULL = unscheduled)
  week      INTEGER CHECK (week BETWEEN 1 AND 13),
  PRIMARY KEY (course_id, lesson_id)
);

-- Term calendar: 4 semesters of about 3 months per class (see section 4d).
CREATE TABLE terms (
  id              TEXT PRIMARY KEY,
  class_id        TEXT NOT NULL REFERENCES classes(id),
  number          INTEGER NOT NULL CHECK (number BETWEEN 1 AND 4),
  name            TEXT NOT NULL,                 -- 'Semester 1'
  start_date      TEXT NOT NULL,                 -- Monday of week 1
  end_date        TEXT NOT NULL,
  teaching_weeks  INTEGER NOT NULL DEFAULT 12,
  exam_week       INTEGER NOT NULL DEFAULT 13,   -- semester-end exam week
  UNIQUE (class_id, number)
);

-- Assign a course to a whole class, or to one student.
CREATE TABLE course_assignments (
  id          TEXT PRIMARY KEY,
  course_id   TEXT NOT NULL REFERENCES courses(id),
  class_id    TEXT REFERENCES classes(id),
  user_id     TEXT REFERENCES users(id),
  due_date    TEXT,                          -- optional
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((class_id IS NOT NULL) <> (user_id IS NOT NULL))   -- exactly one target
);
CREATE INDEX idx_assign_class ON course_assignments(class_id);
CREATE INDEX idx_assign_user  ON course_assignments(user_id);

-- Admin exception: open a FUTURE week early for a class or one student (past weeks are always open).
CREATE TABLE lesson_unlocks (
  id          TEXT PRIMARY KEY,
  course_id   TEXT NOT NULL REFERENCES courses(id),
  semester    INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 4),
  week        INTEGER NOT NULL CHECK (week BETWEEN 1 AND 13),
  class_id    TEXT REFERENCES classes(id),
  user_id     TEXT REFERENCES users(id),
  expires_at  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((class_id IS NOT NULL) <> (user_id IS NOT NULL))
);

CREATE TABLE quizzes (
  id                TEXT PRIMARY KEY,          -- uuid
  kind              TEXT NOT NULL DEFAULT 'lesson' CHECK (kind IN ('lesson','exam')),
  lesson_id         TEXT REFERENCES lessons(id),            -- NULL for exams
  course_id         TEXT REFERENCES courses(id),            -- exams: the course (subject-year) examined
  subject_id        TEXT REFERENCES subjects(id),           -- exams: the subject examined
  semester          INTEGER CHECK (semester BETWEEN 1 AND 4), -- exams: which semester
  blueprint_json    TEXT,                                   -- exams: how questions were chosen (section 4d)
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
  source_question_id TEXT REFERENCES questions(id),  -- exam questions are snapshots copied from lesson quizzes
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
  lesson_id        TEXT REFERENCES lessons(id),            -- denormalised for reporting; NULL for exams
  scope_key        TEXT NOT NULL,                          -- 'lesson:<id>' or 'exam:<course>:<semester>'; attempts are numbered within it
  attempt_number   INTEGER NOT NULL,           -- 1,2,3... per user per lesson
  mode             TEXT NOT NULL DEFAULT 'graded' CHECK (mode IN ('graded','practice')),  -- 'practice' = taken after the lesson's week ended
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
  UNIQUE (user_id, scope_key, attempt_number)
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
- Theming foundation: all colours, fonts, radii and shadows live in CSS variables (design tokens) under `[data-theme="space"]`, `[data-theme="candy"]`, `[data-theme="sunny"]` and `[data-theme="forest"]`; components never hard-code a colour. See section 4a.
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
- Admin page to reset a child's password (see "Quick student setup" in section 4c).
- **Done when:** each daughter can log in and out; `/admin` asks you to sign in with Access.

### Phase 3: Lesson format and admin upload (1–2 days)
- Implement the Zod schema matching section 5 (`schema_version: "1.0"`).
- Admin "Import lesson": paste JSON or upload `.json` → validate with clear error messages → **preview as a child would see it** → Save as draft / Publish.
- Re-importing the same `slug` creates a new version (new quiz + questions rows); old attempts are untouched.
- Asset upload to R2 (drag and drop images/audio), returning the filename to use in the JSON.
- Lesson list with filters by subject/status, reorder, archive.
- **Curriculum planner:** a grid of semester × week for one course (subject-year) where you drag lessons into slots, with gap and draft warnings, a "preview as week N" mode, unlock tools for opening a future week early, plus the **term calendar** for each class (start date of each semester). See section 4d.
- Admin **Classes and Courses** screens: create a class, add or remove students, build a course by picking and ordering lessons, assign it to a class or to one student (section 4c).
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
- AI hints and explanations (section 4b): `POST /api/ai/hint` and `/api/ai/explain` with caching, output check, daily cap and static fallback. Admin "Suggest" drafts in the importer.
- **Semester exams:** exam builder (auto-pick questions from that semester's lesson quizzes, preview, publish) and the exam attempt flow, which reuses the quiz engine (section 4d).
- Results screen: stars/score, which questions were right, explanations, **Try again** button.
- **Done when:** retaking a quiz three times produces three attempt rows with separate scores.

### Phase 6: Student dashboard (1 day)
- Home: greeting with avatar, four subject tiles with progress rings, "Continue where you left off", "New lessons".
- Subject page: lesson cards showing best score stars and attempt count.
- **"This week" home:** this week's four lessons (one per subject) up front with a progress strip, a read-only **"Look back"** area for earlier weeks and semesters (reopen any old lesson, retake its quiz for practice), and a "My progress" page with scores and attempt history. Future weeks never appear. Exam tiles appear in exam week (section 4d).
- Theme switcher (big, friendly button in the header: one small icon per theme) that sets `users.theme` and applies it instantly. Each child keeps her own choice across devices.
- Light gamification: stars per lesson, streak counter. No leaderboards between sisters.
- **Done when:** the full flow (login → subject → lesson → quiz → dashboard) works for both kids.

### Phase 7: Parent dashboard (1–2 days)
- Per child: lessons completed, average first-attempt score, time spent this week.
- **Learning curve chart** per lesson (score vs attempt number) and over time (all attempts by date).
- Attempt drill-down: every answer the child gave, right/wrong, time taken.
- Weakest skills table (from `skill_tag`), which feeds back into what lessons you ask Claude to make next.
- Graded versus practice attempts are shown separately (graded drives the averages and learning curve; practice is shown as extra effort and improvement).
- **Semester report card** per student: for each subject, lessons done, average quiz score, exam score and attempts, compared with the previous semester.
- **Class view:** a table of every student in a class against every lesson (first, best and latest score, attempts), plus class averages and who hasn't started.
- CSV export of attempts.
- **Done when:** you can see every attempt each student has made, per student and per class.

### Phase 8: Polish and launch (1 day)
- Custom domain (e.g. `learn.yourdomain.com`) on the Worker.
- PWA manifest so it installs like an app on the iPad home screen.
- Accessibility pass (font sizes, contrast, dyslexia-friendly font option).
- Backups: D1 Time Travel is on by default; add a weekly scheduled Worker (Cron Trigger) that exports attempts to R2 as JSON.
- Load your first 8 lessons (2 per subject), hand the iPad over.

### Phase 9: Later ideas
- Spaced review: auto-suggest retaking quizzes scored under 70% after 3 and 7 days.
- Free-form "Ask the helper" chat (only after the guardrails in section 4b have proven themselves with hints).
- Weekly email summary to you (Cron + Email Workers).
- Lesson "units" and simple unlock paths.

**Rough total:** 10–13 focused days of build time.

---

## 4a. Design and themes

Chosen direction (2026-11-02): all four explored directions ship as themes, with **Space Explorers as the default** and a theme switcher. Mockups are on the [design canvas](https://claude.ai/artifact/Mf2nkFQSzwtYYM8MC59wgF).

| Theme id | Name | Feel |
|---|---|---|
| `space` (default) | Space Explorers | Dark navy, planets, ranks and XP |
| `candy` | Candy Arcade | Pink and purple, level map, coins |
| `sunny` | Sunny Playground | Bright yellow, chunky sticker cards |
| `forest` | Storybook Forest | Soft greens, paper cards, fox guide |

How the themes stay cheap to maintain:
- **One set of components, two sets of tokens.** Colours, fonts, corner radii, borders and shadows are CSS variables defined per theme (`[data-theme="space"]`, `[data-theme="candy"]`). The `<html>` element carries the active `data-theme`.
- **Words change per theme, layout does not.** A small copy map renames things (Space: "planets", "missions", "XP", "Launch!". Candy: "worlds", "levels", "coins", "PLAY". Sunny: "subjects", "lessons", "stars". Forest: "trails", "stepping stones", "acorns"). Lesson and quiz content are identical in both.
- **Persistence.** The choice is stored in `users.theme`, so each daughter keeps her own theme on any device. The admin can change it too. The theme is also cached in `localStorage` so the correct theme paints before the page loads (no flash).
- **Decorations are swappable assets.** Mascot, background stars, planets and level-map art are theme-specific SVG components behind one interface, so every additional theme is one token set plus one art pack.
- **Accessibility holds in both.** Both themes must keep text contrast at 4.5:1 or better and tap targets at 44px or larger; a check runs against the token sets in CI.
- **Estimated extra effort:** about 1 day for the token system and switcher, then roughly half a day per extra theme (tokens, art pack, copy map, contrast check): about 2.5 days in total for four themes. If time is tight, ship Space and Candy first and add Sunny and Forest in Phase 9; nothing else changes. Retrofitting theming later would cost much more, which is why the foundation goes in first.

## 4b. AI helper (Cloudflare Workers AI)

Use Workers AI where short, low-risk text is needed; keep Claude for authoring the lessons themselves.

| Use | Who triggers it | How it works |
|---|---|---|
| **Smarter hints** during a quiz | Child taps "Need a hint?" | The Worker sends the question, the child's wrong answer and the lesson text to the model, asking for a nudge that never states the answer. Cached per question and wrong answer. |
| **"Why was I wrong?" explanations** | After submitting | Short, friendly explanation at the child's age level, based on the stored `explanation` plus the child's actual answer. |
| **Draft text for you** (admin) | Parent taps "Suggest" in the lesson importer | Proposes a summary, extra practice questions or a simpler rewrite as a draft. Nothing is published without your review. |
| **Parent insights** (later) | Weekly job | Plain-English summary of each child's attempts and weakest skills. |

Guardrails (these matter more than the model choice):
- **The model never sees or returns the answer key to the child.** Hints are generated from the question and the child's response, and the output is checked server-side: if it contains a correct option's exact text or value, it is discarded and the stored static hint is shown instead.
- **No open chat in v1.** Children only trigger fixed prompts (hint, explain). Free-form chat is Phase 9, behind the same guardrails.
- **Kid-safe system prompt**, fixed server-side: age-appropriate vocabulary, 1 to 3 short sentences, encouraging, no off-topic answers, no personal questions. Children cannot edit or see it.
- **Graceful fallback.** If the AI call fails, is slow or is rate-limited, the stored static `hint` and `explanation` from the lesson JSON are used. The lesson format therefore still requires them, so the platform works with AI switched off.
- **Rate limits and cost control.** Per-child daily cap (for example 30 AI hints a day), responses cached in KV by question and answer, and optional AI Gateway for spend visibility. At two users this stays inside free allowances or costs cents.
- **Parent visibility.** Every AI response shown to a child is logged (`ai_events`: user, question, prompt type, response, timestamp) so you can review what was said and tell if any model output was poor.
- **Model choice is a config value**, not hard-coded, because Workers AI models change. Start with a small instruction-tuned model and compare a few on real questions before launch.
- **Quality caveat.** Smaller models can make mistakes, especially in Maths. Hints for number and calculation questions use the stored explanation as the source of truth rather than letting the model recompute.

Schema addition:

```sql
CREATE TABLE ai_events (
  id          TEXT PRIMARY KEY,
  user_id     TEXT REFERENCES users(id),
  question_id TEXT REFERENCES questions(id),
  kind        TEXT NOT NULL CHECK (kind IN ('hint','explain','admin_draft','insight')),
  model       TEXT NOT NULL,
  response    TEXT NOT NULL,
  from_cache  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## 4c. Classes, courses and student accounts

You (the admin) act as the teacher. Daughters' friends are simply more students, grouped into classes.

**Concepts**
- **Student:** a login with a username and password. Can belong to several classes.
- **Class:** a named group of students ("Family", "Saturday Club"). Your daughters live in a default "Family" class.
- **Course:** an ordered list of lessons ("Fractions basics", "Robot basics"). Reusable across classes.
- **Assignment:** a course given to a whole class or to one student, with an optional due date.
- **What a student sees:** only lessons in courses assigned to their classes or to them, in the order you set. If a student has no assignments, they see nothing, so friends never stumble into lessons meant for your daughters. With `visibility_mode = 'released'` (the default) a student sees the lessons of their assigned courses up to and including the current week (section 4d); a class can be switched to `all_published` for an open library.

**Quick student setup (the "easy to create a login" requirement)**
- **Add student** form: first name, pick an avatar, pick a class. That is all.
- Username is auto-suggested from the first name (`maya`, then `maya2` if taken) and the password is auto-generated as three simple words plus a number (`blue-tiger-42`), easy for a child to read and type. You can overwrite either.
- **Bulk add:** paste a list of names, get all accounts at once.
- **Login card:** a printable or shareable card per student with the site address, username, password and a QR code, ready to hand to a parent.
- **Reset password** in one tap (new generated password, shown once). `must_change_password` can prompt the child to choose their own on first login.
- **Deactivate** a student without deleting their history; **delete** removes the student and all their records for good (needed for privacy requests).

**Privacy and safety for friends' children** (important because other families are involved)
- Get the friend's parent to agree before creating the account, and tell them what is stored (first name, scores, time spent, AI hint logs).
- Students never see other students: no leaderboards, no shared names or avatars, no messaging. Each student's data is visible only to you.
- Store the minimum: first name only, no email, no surname, no photo, no tracking or ads.
- Keep the Workers AI helper limited to fixed hints and explanations for everyone (section 4b).
- You are responsible for the data, so keep delete-on-request and export-on-request available. Depending on where you live (for example the UK or EU, or the US for under-13s), child-data laws may apply to a service used by other families; for a small friends-and-family group this is usually manageable but worth checking before opening it up beyond close friends.
- **Parent access for friends' families (later):** a read-only "guardian" login scoped to one child's progress, so other parents can see their own child's scores without seeing anyone else's. Not in v1; until then you can share a CSV export.

**Effort:** about 2 to 3 extra days (schema, admin screens for classes, courses and assignments, student creation and login cards, class report). The data model is in place from Phase 1, so nothing needs reworking later.

## 4d. School year: semesters, weeks and exams

**Calendar.** A school year has **4 semesters of about 3 months**. Each semester is **12 teaching weeks plus an exam week** (13 weeks). Each class has its own dates in `terms`, so you can start a friend's class later than the Family class, shift dates for holidays or pause a term.

**Where lessons sit.** A lesson belongs to a **course** (for example "Maths Year 1"), and `course_lessons` gives it a **semester (1 to 4) and a week (1 to 12)**. Courses are per subject, so each subject has its own 48-ish-lesson year plan. You can place a lesson by dragging it in the curriculum planner, or let the lesson JSON suggest a slot (section 5). One lesson per subject per week is the default pace (about 48 lessons per subject, about 190 across four subjects); a lighter pace of 2 to 3 lessons a week across all subjects works too.

**What students see: this week, plus everything already taught.**
- The current week is worked out from the class's term dates (weeks run Monday to Sunday). The home screen leads with **this week's four lessons, one for each subject**.
- **Past weeks stay available to read.** A "Look back" area lists earlier weeks and semesters, so a child can reopen any old lesson and quiz. Old lessons are **read-only**: nothing in the lesson, its quiz questions or any recorded score can be edited or deleted, and revisiting does not change completion status or progress.
- **Future weeks stay hidden.** A student cannot see or open a lesson from a week that has not started. This is **enforced on the server**: the API refuses a lesson or quiz outside the released weeks, so it cannot be reached by guessing a link.
- **Quiz retakes, graded and practice.** A quiz can always be retaken. Attempts made **during the lesson's own week** are recorded as `graded`; attempts made **after that week** are recorded as `practice` ("just for fun, to get better"). Both are saved in full with every answer, nothing is overwritten, and you see both. By default your reports and the "first, best and latest" figures use graded attempts, with practice attempts shown as a separate line, so extra practice shows effort without rewriting the history of how the child did in the week. A child sees their own scores and attempt history for every lesson.
- **Exams:** a semester exam appears in exam week and follows its own attempt limit (section below). Practice retakes apply to lesson quizzes, not to the exam itself. Because all of the semester's lessons are open to read, children can revise before the exam, so no separate revision setting is needed.
- **Exceptions are yours to grant:** open a future week early for a keen child or class, or shift or pause the class calendar (holidays, illness). Early unlocks are logged in `lesson_unlocks` and can expire.

**What the admin sees: everything, any time.** You are never limited by the calendar:
- Open **any semester and week**, including future ones, to create, import, edit and **preview exactly as a child would see it** (the importer's preview can also simulate "as of week N").
- Prepare an entire semester or year ahead with Claude (outline prompt in section 5.5, lessons with the prompt in 5.2) and park the lessons in their slots. Lessons marked `published` stay invisible to students until their week arrives, so there is no need to schedule anything by hand. Mark a lesson `draft` while you are still reviewing it; a week with no published lesson for a subject simply shows nothing for that subject.
- The curriculum planner flags **gaps** (a week with no lesson in some subject) and **unreviewed drafts** so nothing is missing when the week starts.

**Semester-end exams (one per subject per semester, so 16 a year).**
- **Scope:** everything taught in that subject during that semester. By default Semester 4 is cumulative (the whole year) and earlier semesters can mix in a small share (default 20%) of earlier material as revision. You set this per exam in `blueprint_json`.
- **How the exam is built:** the platform samples questions from the quizzes of that semester's lessons (even coverage: 2 or 3 per lesson, harder ones favoured, around 20 to 30 questions in total), copies them as a **frozen snapshot** with `source_question_id`, and lets you preview, swap or remove questions before publishing. Because the snapshot is frozen, later edits to a lesson never change an exam that children have already taken.
- **Optional top-up with Claude:** a prompt in section 5.6 writes extra "apply what you know" questions that combine several lessons, which you import into the exam.
- **Opens** in the exam week of the class's semester, or whenever you open it manually.
- **Attempts:** the same engine as quizzes, so every attempt is recorded and graded server-side. The number of attempts is a setting (`max_attempts`); I suggest **2** for exams (a first go and one retake after revising), keeping both scores for your review. Set it to unlimited if you prefer.
- **Pass mark** default 70%, with a friendly results screen ("Semester 1 Maths: 82%! Strongest topics: ..., revise: ...") built from the `skill_tag`s.

**Parent reporting.** Semester report card per child and subject (lessons completed on time, average quiz score, exam score and attempts, change from last semester), plus a year-at-a-glance across the four semesters.

**Effort:** about 3 to 4 extra days (term calendar, curriculum planner, week locking, exam builder, report cards). The tables are created in Phase 1, so nothing needs reworking later.

**Content workload.** The bigger task is authoring about 190 lessons a year with Claude. Section 5.5 gives a prompt that first drafts a 12-week outline per subject per semester, so every lesson is generated against an agreed plan and the exam coverage is even.

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
    "tags": ["fractions", "shapes"],
    "curriculum": { "course": "maths-year-1", "semester": 1, "week": 3 }
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

**Block types** (the maintained list, including ideas still to build, is in `docs/LESSON_CAPABILITIES.md`): `heading`, `text` (markdown), `image` (`emoji` or `asset` filename uploaded to R2, plus `alt`), `callout` (`tip` | `fun_fact` | `warning`), `reveal` (tap to show), `check` (one ungraded practice question, any quiz type), `steps` (numbered list), `vocab` (word + kid-friendly meaning), `glossary` (meanings for the bold key words, shown when a child presses and holds a word; never a slide), `activity` (offline hands-on task), `manipulative` (move-the-items play area), `explainer` (animated steps), `video` (clip of 100 seconds or less), `chart`, `brain_game` (memory and sequence exercises), `summary`, `html_embed` (sandboxed self-contained HTML for a special simulation; use sparingly).

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
Curriculum slot: {{semester 1-4, week 1-12, e.g. "semester 1, week 3", or "none"}}
Extra notes (optional): {{e.g. "she loves animals", "build on last week's lesson on counting by 2s"}}

=== TEACHING RULES ===
- Reading level: age 7 → short sentences, max ~12 words, everyday words. Age 9 → up to ~18 words, can
  introduce 2–3 new vocabulary words (use a "vocab" block for each).
- Pictures: every new word or idea is shown, never only described (see `docs/LESSON_GUIDELINES.md`): use `chart`, `explainer`, `manipulative`, `brain_game` and big emoji `image` blocks.
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
    "tags": [strings],
    "curriculum": {"course": "<subject>-year-1", "semester": 1-4, "week": 1-12}   (omit if "none")
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
  {"type":"manipulative","title":string,"goal":string,"emoji":string,"count":1-20,"zones":[string, 1-4 labels]}   // drag things between a pile and labelled places; never graded
  {"type":"chart","kind":"pictogram|bar_chart|tally|table|number_line|fraction","title":string,"caption"?,"rows":[{"label","value","emoji"?}],"each"?,"from"?,"to"?,"step"?,"marks"?,"parts"?,"shaded"?}
  {"type":"video","title":string,"youtube":"11-char id","start":seconds,"end":seconds,"caption"?}   // end - start must be 100 or less
  {"type":"explainer","title":string,"scenes":[{"caption":string,"items":[{"id"?,"emoji","label"?,"x":0-100,"y":0-100,"size":1-3,"anim":"none|bounce|float|spin|pulse|grow"}]}]}   // animated steps, 2-8 scenes
  {"type":"brain_game","game":"memory_match|remember_order","title":string,"goal"?:string,"emojis":[3-8]}
  {"type":"glossary","terms":[{"term":string,"meaning":string}]}   // one per lesson, covering the **bold** words; kid-friendly, 1-2 short sentences
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

### 5.5 Curriculum outline prompt (run once per subject per semester)

````text
You are an expert primary-school curriculum designer. Plan ONE semester of ONE subject for my kids'
learning platform. A semester is 12 teaching weeks, then an exam week. We build one lesson per week.

Subject: {{maths | science | data-ai | general-knowledge}}
Semester: {{1-4 of 4}}
Learners: {{age 7 | age 9 | both}}
Already covered in earlier semesters (if any): {{list, or "nothing yet"}}

Rules:
- 12 weeks, each with: week number, lesson title, slug, one-sentence summary, 2 learning objectives,
  difficulty (1-3) and 2-3 skill_tags in "topic.skill" snake_case.
- Build gradually: concepts in later weeks may rely on earlier ones; weeks 11-12 revise and connect
  the semester's ideas, ready for the exam.
- Variety: mix reading, hands-on activities and puzzles; keep each lesson to 8-15 minutes.
- data-ai: spread Computer Science, Data and AI strands across the 12 weeks.
- No invented facts; keep everything suitable for the age.

Output ONLY a JSON array of 12 objects:
[{"week":1,"title":"","slug":"","summary":"","objectives":["",""],"difficulty":1,"skill_tags":["",""]}, ...]
````

Then generate each week's lesson with the main meta-prompt (5.2), pasting that week's outline entry into "Extra notes" and setting the curriculum slot.

### 5.6 Exam top-up prompt (optional)

````text
You are writing extra questions for a semester-end exam on my kids' learning platform.
Subject: {{subject}}   Semester: {{1-4}}   Learners: {{age 7 | age 9 | both}}
The lessons covered this semester (title, summary, skill_tags):
{{paste the 12 outline entries or lesson summaries}}

Write 6 questions that each combine ideas from TWO OR MORE different lessons ("apply what you know").
Use mixed types (multiple_choice, number, true_false, order, match), age-appropriate wording, and the
same question object format and fields as in the lesson quiz format (ref, type, prompt, options/items,
answer, hint, explanation, points, skill_tag). Output ONLY a JSON array of question objects in one
```json code block. Every question must be answerable from the lessons listed.
````

## 6. Security and privacy notes
- Only first names stored; no email addresses for the kids; no third-party tracking or analytics. Students cannot see each other (section 4c).
- Admin protected by Cloudflare Access, never by a password stored in the app.
- Kid passwords hashed (PBKDF2, 100k+ iterations, per-user salt); sessions in HttpOnly cookies.
- `html_embed` blocks run in `<iframe sandbox="allow-scripts">` with no same-origin access.
- Quiz answers graded server-side and never sent to the client before submission.
