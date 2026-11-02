-- Videos the parent has approved for a lesson. They are added to the lesson as `video` blocks, and re-added whenever the lesson is re-imported.
CREATE TABLE approved_videos (
  id          TEXT PRIMARY KEY,
  lesson_id   TEXT NOT NULL REFERENCES lessons(id),
  youtube     TEXT NOT NULL,
  title       TEXT NOT NULL,
  channel     TEXT,
  start_sec   INTEGER NOT NULL DEFAULT 0,
  end_sec     INTEGER NOT NULL,
  caption     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (lesson_id, youtube)
);
