-- Three more quiz question types: fill_blank (dropdown gaps), hotspot (tap the right picture) and slider.
-- SQLite cannot change a CHECK constraint, so the questions table is rebuilt with the wider list.
PRAGMA defer_foreign_keys = on;

CREATE TABLE questions_new (
  id           TEXT PRIMARY KEY,
  quiz_id      TEXT NOT NULL REFERENCES quizzes(id),
  ref          TEXT NOT NULL,
  position     INTEGER NOT NULL,
  type         TEXT NOT NULL CHECK (type IN
                 ('multiple_choice','multi_select','true_false','number','short_text','order','match','fill_blank','hotspot','slider')),
  prompt       TEXT NOT NULL,
  media_json   TEXT,
  options_json TEXT,
  answer_json  TEXT NOT NULL,
  hint         TEXT,
  explanation  TEXT,
  points       INTEGER NOT NULL DEFAULT 1,
  skill_tag    TEXT,
  source_question_id TEXT REFERENCES questions(id),
  UNIQUE (quiz_id, ref)
);

INSERT INTO questions_new (id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json, hint, explanation, points, skill_tag, source_question_id)
  SELECT id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json, hint, explanation, points, skill_tag, source_question_id FROM questions;

DROP TABLE questions;
ALTER TABLE questions_new RENAME TO questions;
