-- A test student the parent uses to preview lessons. is_test excludes the account from every analytic, report and
-- AI-usage figure; preview_date lets the parent pretend "today" is any school week (NULL = real today).
ALTER TABLE users ADD COLUMN is_test INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN preview_date TEXT;
