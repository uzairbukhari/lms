-- Admin insight batch: a reviewable AI log (with a "bad reply" flag), small admin settings, and a sign-in history.

-- ai_events gains: kind 'define' (long-press word help), flagged, the KV cache key of the reply, and a short detail line.
CREATE TABLE ai_events_new (
  id          TEXT PRIMARY KEY,
  user_id     TEXT REFERENCES users(id),
  question_id TEXT REFERENCES questions(id),
  kind        TEXT NOT NULL CHECK (kind IN ('hint','explain','define','admin_draft','insight')),
  model       TEXT NOT NULL,
  response    TEXT NOT NULL,
  from_cache  INTEGER NOT NULL DEFAULT 0,
  flagged     INTEGER NOT NULL DEFAULT 0,
  cache_key   TEXT,
  detail      TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT INTO ai_events_new (id, user_id, question_id, kind, model, response, from_cache, created_at)
  SELECT id, user_id, question_id, kind, model, response, from_cache, created_at FROM ai_events;
DROP TABLE ai_events;
ALTER TABLE ai_events_new RENAME TO ai_events;
CREATE INDEX idx_ai_events_time ON ai_events(created_at);
CREATE INDEX idx_ai_events_user ON ai_events(user_id, created_at);

-- Small key/value settings the admin can change in the console.
CREATE TABLE app_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Every sign-in try, successful or not. user_id is NULL when the username does not exist.
CREATE TABLE login_events (
  id         TEXT PRIMARY KEY,
  user_id    TEXT REFERENCES users(id),
  username   TEXT NOT NULL,
  ok         INTEGER NOT NULL,
  country    TEXT,
  device     TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_login_events_user ON login_events(user_id, created_at);
CREATE INDEX idx_login_events_time ON login_events(created_at);
