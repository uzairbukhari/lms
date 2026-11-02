-- Phase 1: initial schema (see docs/PLAN.md section 3 and sections 4b to 4d).
-- Attempts are append-only; never UPDATE scores or DELETE attempts from application code.

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
