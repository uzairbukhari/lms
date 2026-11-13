-- Admin v3 structure: lessons + tags -> courses -> classes -> students (one class each); teachers per class.
-- Additive only. Semester/week columns, terms and course_assignments stay until the final clean-up step.

-- Lessons: real age range, owner, tags
ALTER TABLE lessons ADD COLUMN age_min INTEGER;
ALTER TABLE lessons ADD COLUMN age_max INTEGER;
ALTER TABLE lessons ADD COLUMN owner_id TEXT REFERENCES users(id);
UPDATE lessons SET
  age_min = CAST(substr(age_band, 1, instr(age_band, '-') - 1) AS INTEGER),
  age_max = CAST(substr(age_band, instr(age_band, '-') + 1) AS INTEGER)
WHERE age_band LIKE '%-%';

CREATE TABLE tags (
  id    TEXT PRIMARY KEY,
  kind  TEXT NOT NULL CHECK (kind IN ('topic','skill','standard','custom')),
  label TEXT NOT NULL,
  code  TEXT,
  UNIQUE (kind, label)
);
CREATE TABLE lesson_tags (
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  tag_id    TEXT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (lesson_id, tag_id)
);
CREATE INDEX idx_lesson_tags_tag ON lesson_tags(tag_id);

-- Courses: age range, owner, cover; sections inside a course
ALTER TABLE courses ADD COLUMN age_min INTEGER;
ALTER TABLE courses ADD COLUMN age_max INTEGER;
ALTER TABLE courses ADD COLUMN owner_id TEXT REFERENCES users(id);
ALTER TABLE courses ADD COLUMN cover TEXT;
ALTER TABLE course_lessons ADD COLUMN section TEXT;

-- Courses in a class, with the unlock rule (replaces course_assignments, classes.unlock_mode and terms)
CREATE TABLE class_courses (
  class_id        TEXT NOT NULL REFERENCES classes(id),
  course_id       TEXT NOT NULL REFERENCES courses(id),
  position        INTEGER NOT NULL DEFAULT 0,
  unlock_rule     TEXT NOT NULL DEFAULT 'mastery' CHECK (unlock_rule IN ('mastery','open','drip')),
  pass_percent    INTEGER NOT NULL DEFAULT 70,
  drip_start      TEXT,
  drip_every_days INTEGER,
  PRIMARY KEY (class_id, course_id)
);

-- Backfill: weekly classes become Drip (7 days), path classes become Mastery.
INSERT OR IGNORE INTO class_courses (class_id, course_id, position, unlock_rule, drip_every_days)
SELECT ca.class_id, ca.course_id, 0,
       CASE WHEN c.unlock_mode = 'weekly' THEN 'drip' ELSE 'mastery' END,
       CASE WHEN c.unlock_mode = 'weekly' THEN 7 END
FROM course_assignments ca JOIN classes c ON c.id = ca.class_id
WHERE ca.class_id IS NOT NULL;

-- One class per student (the earliest class joined wins when a student was in several).
ALTER TABLE users ADD COLUMN class_id TEXT REFERENCES classes(id);
UPDATE users SET class_id = (
  SELECT cm.class_id FROM class_members cm WHERE cm.user_id = users.id ORDER BY cm.joined_at, cm.class_id LIMIT 1
) WHERE role = 'student';
CREATE INDEX idx_users_class ON users(class_id);

-- Staff. All staff keep role 'admin' (changing the role CHECK would mean rebuilding the users table and every table
-- that points at it). admin_level says what kind of staff: existing admins stay super admins.
ALTER TABLE users ADD COLUMN admin_level TEXT NOT NULL DEFAULT 'super' CHECK (admin_level IN ('super','teacher'));
CREATE TABLE class_staff (
  class_id TEXT NOT NULL REFERENCES classes(id),
  user_id  TEXT NOT NULL REFERENCES users(id),
  access   TEXT NOT NULL CHECK (access IN ('view','edit')),
  PRIMARY KEY (class_id, user_id)
);
CREATE INDEX idx_class_staff_user ON class_staff(user_id);

CREATE TABLE audit_log (
  id          TEXT PRIMARY KEY,
  actor_id    TEXT NOT NULL,
  action      TEXT NOT NULL,
  target      TEXT NOT NULL,
  detail_json TEXT,
  at          TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_audit_at ON audit_log(at);

-- Class exams reuse quizzes (kind 'exam')
ALTER TABLE quizzes ADD COLUMN class_id TEXT REFERENCES classes(id);
