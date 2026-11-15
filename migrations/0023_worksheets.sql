-- Printable worksheets (docs/WORKSHEETS_PLAN.md). One current worksheet per lesson: an A4 PDF (max 2 pages) and a
-- one-page answer key, kept in R2. The sheet is laid out from the lesson's own quiz by worker/src/lib/worksheet.ts.
-- "Out of date" means lesson_version is behind lessons.current_version or template_version is behind TEMPLATE_VERSION.
CREATE TABLE worksheets (
  lesson_id        TEXT PRIMARY KEY REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_version   INTEGER NOT NULL,
  template_version INTEGER NOT NULL,
  pdf_key          TEXT NOT NULL,   -- R2 key of the worksheet PDF
  answers_key      TEXT NOT NULL,   -- R2 key of the answer key PDF
  pages            INTEGER NOT NULL CHECK (pages BETWEEN 1 AND 2),
  questions        INTEGER NOT NULL,
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
