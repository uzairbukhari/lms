-- Archiving a class gives its students a fresh start. Each child's learning record (progress, attempts, games) is
-- moved onto a hidden "record" student row that stays tied to the archived class, so admins can still review it.
ALTER TABLE users ADD COLUMN archive_of TEXT;          -- on a record row: the real student it was taken from
ALTER TABLE users ADD COLUMN archive_class_id TEXT;    -- on a record row: the class that was archived
ALTER TABLE users ADD COLUMN archived_at TEXT;
-- Points the child had earned when their classes were archived (they keep their points, stickers and shop items).
ALTER TABLE users ADD COLUMN carried_points INTEGER NOT NULL DEFAULT 0;

CREATE TABLE class_archive_members (
  class_id       TEXT NOT NULL REFERENCES classes(id),
  user_id        TEXT NOT NULL REFERENCES users(id),   -- the real student
  record_user_id TEXT NOT NULL REFERENCES users(id),   -- the hidden record row holding their data for this class
  display_name   TEXT NOT NULL,
  archived_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (class_id, user_id)
);
CREATE INDEX idx_archive_members_user ON class_archive_members(user_id);
