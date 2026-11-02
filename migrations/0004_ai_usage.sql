-- One row per real Workers AI call (cache hits cost nothing and are not recorded), so the admin
-- Dashboard can show tokens used, neurons and an estimated cost.
CREATE TABLE ai_usage (
  id            TEXT PRIMARY KEY,
  kind          TEXT NOT NULL,                 -- hint | explain | narration
  model         TEXT NOT NULL,
  user_id       TEXT REFERENCES users(id),
  input_tokens  INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  characters    INTEGER NOT NULL DEFAULT 0,    -- text-to-speech is billed per character, not per token
  neurons       REAL NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_ai_usage_created ON ai_usage(created_at);
