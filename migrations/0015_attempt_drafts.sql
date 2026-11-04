-- Quiz progress is saved while a child answers, so a lost connection or a failed hand-in never wipes it.
ALTER TABLE quiz_attempts ADD COLUMN draft_json TEXT;   -- {"answers":{...},"hintsUsed":[...],"index":n}
ALTER TABLE quiz_attempts ADD COLUMN draft_at TEXT;

-- Only a child's first try at a lesson quiz is graded; every retake is practice. Earlier retakes that were
-- recorded as graded (same-week retakes) become practice, so they no longer replace the first score.
UPDATE quiz_attempts SET mode = 'practice'
 WHERE mode = 'graded' AND scope_key LIKE 'lesson:%'
   AND EXISTS (SELECT 1 FROM quiz_attempts p WHERE p.user_id = quiz_attempts.user_id AND p.scope_key = quiz_attempts.scope_key
                AND p.status = 'submitted' AND p.attempt_number < quiz_attempts.attempt_number);
