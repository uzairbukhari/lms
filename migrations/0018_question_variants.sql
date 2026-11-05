-- A question can be a retake variant of another question (its ref). Retakes swap variants in so answers cannot be memorised.
ALTER TABLE questions ADD COLUMN variant_of TEXT;
