# Authoring brief for lesson agents

Read this, `docs/LESSON_GUIDELINES.md`, `docs/CLIPS.md` and the syllabus entry (`docs/syllabus/<subject>.md`) for each lesson you are given. Copy the structure of an existing lesson spec, for example `scripts/topics/maths-class-1-fractions.mjs`, and use the helpers in `scripts/lesson-kit.mjs` and `scripts/topic-kit.mjs`. Do not push. Commit in your worktree with a normal-prose message ending with the line `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Two kinds of job

**New lesson** (syllabus entry marked NEW): write `scripts/topics/<slug>.mjs`.

**Upgrade** (existing lesson): edit its `scripts/topics/<slug>.mjs`. Keep the slug, topic number and every sub-lesson id exactly the same. Keep the 15 existing main questions and their variants. Add 15 new main questions (themes are listed in the syllabus entry) with at least 1 variant each, so the lesson has 30 mains and at most 80 questions in total. Move the intro blocks (the welcome heading, text, picture and glossary at the top of the lesson) into the start of the `learn` sub-lesson, merge their glossary into that sub-lesson's glossary, and leave the top-level `blocks` empty: children never see the top-level blocks. Remove the slug from `scripts/legacy-15.json`.

## The standard (the build fails if you miss it)

- 4 sub-lessons in order: learn, try, play, use. 2 stops each, with the picture, chart, animation or movable thing each stop needs. 3 to 5 mini-quiz questions each.
- 30 main quiz questions, at least 8 of depth `reason` (a named child makes a claim and the learner decides why it is right or wrong), every question type used at least twice (multiple choice, multi select, true false, number or short text, fill blank, match, order, hotspot, slider), every question has hint, explanation and skill tag, no question repeats a check or mini-quiz question word for word.
- A `clip` in the spec: a 45 to 75 second animated story in explainer scenes. See `docs/CLIPS.md`. It is its own short story that adds something, not a replay of a lesson animation.
- Every narration sentence (`say`, scene `say`) is at most 14 words for age 7-8 and 18 words for age 9-10. The audit checks this.
- British spelling. UK and Pakistan examples, and Islamic examples where natural (see the guidelines).

## Voice: simple, playful, makes the idea click

Talk to one child. Use "you" and "let's". Ask questions out loud ("What do you think happens next?"). Give each new word a kid meaning the moment it appears, then use it. One idea per sentence. Use small surprises, sound words and gentle jokes, never sarcasm. Say what a thing looks like before you name it ("Show it before you name it"). Use real objects the child knows: mangoes, chapatis, a corner shop, a bus, the park. When a child makes a mistake in a question, the explanation is kind and shows why.

## Connectors (all three are required, and checked by `worker/src/connectors.test.ts`)

**Oak National Academy** (MCP tools `mcp__claude_ai_Oak_National_Academy__*`). Use the slugs in the syllabus entry. Fetch with `get-lessons-summary` for at least two of the listed Oak lessons and read the key learning points, keywords and misconceptions. Adapt, never copy. Write `content/sources/<slug>.json` as described in `content/sources/README.md` (units, lessons with real urls, keywords used, misconceptions mapped to the `ref` of the questions that test them). For topics with `no_oak_unit` write that field with the reason. Never put Oak's name, logo or links in child-visible text.

**Unsplash** (MCP tools `mcp__claude_ai_Unsplash__*`). Use the queries in the syllabus entry (one concept per search). Meet the minimum for the subject: maths 1, science 3, general knowledge 3, English 2, data and AI 2 photos. Call `search_photos` with `content_filter: "high"` and `plus: "none"`, pick photos that suit a 7 to 10 year old (clear subject, no adults in distress, no brands, nothing frightening). Call `download_asset` with the photo id (this records the download), take the returned url and fetch it with curl adding `&w=1400&q=80`, saving to `C:\GitHub\lms\content\media\files\<slug>-<n>-<first 8 hex of sha256>.jpg` (this folder is shared by all agents and is not in git; use that absolute path even though you work in a worktree). Write your entries to `content/media/manifest.d/<slug>.json` as `{ "files": [ ... ] }`, entry format in `content/media/README.md` (use a small node script to compute the sha256; one file per lesson so parallel work never conflicts). Set `reviewed: true` only after you looked at the photo (use the Read tool on the saved file). In the lesson put an `image` block with `asset`, `alt`, `caption` and `credit: "Photo by <author> on Unsplash"`, and give it `say` narration.

**Coteach** (maths only). The Coteach tool cannot be used unattended. Do not call it. Instead create `content/media/coteach-requests/<slug>.md` with 2 or more one-sentence diagram requests, one per line (bar model, place value chart, fraction diagram, angle and so on). The file marks the lesson as waiting for diagrams, and is deleted when they are added. Use the app's own drawn charts, fraction props and explainer pictures in the lesson meanwhile.

## Checks before you finish

1. `node scripts/build-topics.mjs` (it rewrites every file in `content/topics` and `content/clips`; Windows line-ending noise in files you did not touch is expected, so `git add` only your own lesson json, clip spec, source file, manifest, scripts and the lists above).
2. `npm test --workspace @lms/worker` must pass (topics, connectors and content tests). `npm run typecheck` must pass.
3. Re-read your own narration aloud in your head: is each sentence short, playful and clear for the age? Are all answers correct? Does every `reason` question have exactly one defensible answer? Fix before finishing.
4. Report: lessons done, anything you were unsure about, any Oak or Unsplash gap, and the exact list of media files saved.
