-- Courses get a stable slug so lesson files can name the course they belong to
-- (the "curriculum" field in the lesson JSON, e.g. "maths-year-1").
ALTER TABLE courses ADD COLUMN slug TEXT;
CREATE UNIQUE INDEX idx_courses_slug ON courses(slug);
