-- Rewards for the children: sticker book, points shop and daily brain teaser (docs/PLAN.md, feature list S5 to S14).
-- Stickers and shop items are defined in code (packages/schema/src/rewards.ts); these tables only record what a child has.

CREATE TABLE sticker_awards (
  user_id    TEXT NOT NULL REFERENCES users(id),
  sticker_id TEXT NOT NULL,
  earned_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, sticker_id)
);

CREATE TABLE shop_purchases (
  user_id   TEXT NOT NULL REFERENCES users(id),
  item_id   TEXT NOT NULL,
  cost      INTEGER NOT NULL,
  bought_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, item_id)
);

CREATE TABLE shop_equipped (
  user_id TEXT NOT NULL REFERENCES users(id),
  slot    TEXT NOT NULL CHECK (slot IN ('hat','pet','trail')),
  item_id TEXT NOT NULL,
  PRIMARY KEY (user_id, slot)
);

CREATE TABLE teaser_plays (
  user_id   TEXT NOT NULL REFERENCES users(id),
  day       TEXT NOT NULL,
  correct   INTEGER NOT NULL,
  played_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, day)
);
