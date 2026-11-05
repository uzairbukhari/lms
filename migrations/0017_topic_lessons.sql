-- Topic lessons: which sub-lesson a big-quiz question belongs to, its depth, and each child's sub-lesson progress.
ALTER TABLE questions ADD COLUMN sub_lesson TEXT;
ALTER TABLE questions ADD COLUMN depth TEXT;

CREATE TABLE sub_lesson_progress (
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  sub_id TEXT NOT NULL,
  viewed INTEGER NOT NULL DEFAULT 0,
  mini_best INTEGER,            -- best mini quiz percent
  mini_attempts INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id, sub_id)
);

-- The child's own "I can" rating for each success criterion: 1 not yet, 2 nearly, 3 got it.
CREATE TABLE self_ratings (
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  criterion_index INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 3),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id, criterion_index)
);
