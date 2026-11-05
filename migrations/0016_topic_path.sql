-- Curriculum v3 step 1 (docs/CURRICULUM_V2.md): classes can unlock lessons by mastery instead of by school week.
-- 'weekly' = today's behaviour (weeks of the term calendar). 'path' = each subject is an ordered path of topic lessons;
-- the next one opens when the child passes the current one's quiz (70% by default), or when the parent opens it.
ALTER TABLE classes ADD COLUMN unlock_mode TEXT NOT NULL DEFAULT 'weekly' CHECK (unlock_mode IN ('weekly','path'));

-- Parent override for path classes: open one lesson ahead of the path for a class or one student.
CREATE TABLE path_unlocks (
  id         TEXT PRIMARY KEY,
  lesson_id  TEXT NOT NULL REFERENCES lessons(id),
  class_id   TEXT REFERENCES classes(id),
  user_id    TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  CHECK ((class_id IS NOT NULL) <> (user_id IS NOT NULL))
);
CREATE INDEX idx_path_unlocks_lesson ON path_unlocks(lesson_id);
