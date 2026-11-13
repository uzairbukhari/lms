-- Per-class switch to the new unlock rules (class_courses). Off by default: nothing changes for a class until it is switched on.
ALTER TABLE classes ADD COLUMN structure_v3 INTEGER NOT NULL DEFAULT 0;
