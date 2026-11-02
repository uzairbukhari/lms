-- Mini games on the semester map (docs/SEMESTER_MAP.md). One row per finished game; the best bonus per checkpoint counts.
CREATE TABLE game_plays (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id),
  semester   INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 4),
  week       INTEGER NOT NULL CHECK (week BETWEEN 1 AND 12),
  game       TEXT NOT NULL,
  level      INTEGER NOT NULL,
  score      INTEGER NOT NULL,
  bonus      INTEGER NOT NULL,
  played_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_game_plays_user ON game_plays(user_id, semester, week);
