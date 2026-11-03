-- Windows desktop app (docs/DESKTOP_APP.md). One row per PC that checks for updates, so the admin can see who is up to date.
CREATE TABLE desktop_installs (
  device_id   TEXT PRIMARY KEY,
  version     TEXT NOT NULL,
  target      TEXT NOT NULL,
  first_seen  TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen   TEXT NOT NULL DEFAULT (datetime('now'))
);
