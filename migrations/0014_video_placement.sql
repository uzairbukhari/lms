-- Where in the lesson an approved video sits: the key of the block it follows (see blockKey in worker/src/lib/videos.ts).
-- NULL means the default place, just before the closing summary.
ALTER TABLE approved_videos ADD COLUMN after_key TEXT;
