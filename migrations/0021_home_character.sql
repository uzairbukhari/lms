-- Which character shows on a child's home page (chosen in the admin panel). NULL = Zainab's clips.
ALTER TABLE users ADD COLUMN home_character TEXT;
UPDATE users SET home_character = 'fatima' WHERE role = 'student' AND username = 'fatimabukhari';
