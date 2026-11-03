-- Flashcards, Boost round, Word Book, "I'm stuck" flags and parent-made decks (docs/FLASHCARDS.md).
-- Cards are shared content; what a child knows about each card lives in card_reviews.

CREATE TABLE decks (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  subject_id TEXT REFERENCES subjects(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE deck_assignments (
  deck_id  TEXT NOT NULL REFERENCES decks(id),
  class_id TEXT REFERENCES classes(id),
  user_id  TEXT REFERENCES users(id),
  CHECK ((class_id IS NULL) <> (user_id IS NULL))
);
CREATE INDEX idx_deck_assignments ON deck_assignments(deck_id);

CREATE TABLE cards (
  id          TEXT PRIMARY KEY,                -- 'g:<lesson>:<term>', 'q:<question>' or 'd:<deck>:<n>'
  source      TEXT NOT NULL CHECK (source IN ('glossary','question','deck')),
  front       TEXT NOT NULL,
  back        TEXT NOT NULL DEFAULT '',
  emoji       TEXT,
  subject_id  TEXT,
  lesson_id   TEXT,
  question_id TEXT,
  deck_id     TEXT REFERENCES decks(id),
  semester    INTEGER,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_cards_deck ON cards(deck_id);

CREATE TABLE card_reviews (
  user_id     TEXT NOT NULL REFERENCES users(id),
  card_id     TEXT NOT NULL REFERENCES cards(id),
  box         INTEGER NOT NULL DEFAULT 0 CHECK (box BETWEEN 0 AND 5),
  due         TEXT NOT NULL,                   -- YYYY-MM-DD
  seen        INTEGER NOT NULL DEFAULT 0,
  checked_ok  INTEGER NOT NULL DEFAULT 0,      -- answered right in a form the app checks (not only "got it")
  mastered    INTEGER NOT NULL DEFAULT 0,
  misses      INTEGER NOT NULL DEFAULT 0,
  last_at     TEXT,                            -- YYYY-MM-DD of the last answer
  last_result INTEGER,
  PRIMARY KEY (user_id, card_id)
);
CREATE INDEX idx_card_reviews_due ON card_reviews(user_id, due);

-- Words a child pressed and held in a lesson (the Word Book).
CREATE TABLE word_book (
  user_id    TEXT NOT NULL REFERENCES users(id),
  lesson_id  TEXT NOT NULL REFERENCES lessons(id),
  word       TEXT NOT NULL,
  meaning    TEXT NOT NULL,
  source     TEXT NOT NULL CHECK (source IN ('lesson','ai')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id, word)
);

-- A finished daily deck or Boost round earns a few map points, once a day each.
CREATE TABLE card_days (
  user_id TEXT NOT NULL REFERENCES users(id),
  day     TEXT NOT NULL,
  kind    TEXT NOT NULL CHECK (kind IN ('daily','boost')),
  points  INTEGER NOT NULL,
  PRIMARY KEY (user_id, day, kind)
);

-- "I'm stuck": a child flags a confusing slide or question for the parent.
CREATE TABLE stuck_flags (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id),
  lesson_id   TEXT NOT NULL REFERENCES lessons(id),
  slide       INTEGER,
  question_id TEXT REFERENCES questions(id),
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','done')),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_stuck_status ON stuck_flags(status, created_at);
