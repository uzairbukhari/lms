# Plan: 12-lesson courses, 30-question quizzes, grand quizzes, real media

## Context

The owner built lessons for two daughters (age 7, Class 1; age 9, Class 4). A review found:

- 50 topic lessons across 10 courses (5 subjects x 2 classes), with 4 to 8 lessons per course. None reach 12.
- Each lesson has a 15-question quiz, not 30. No per-course grand quiz exists.
- Unsplash, Oak and Coteach appear in docs only. AnimatedWebs appears nowhere. No lesson has a real photo or video.
- Children never see topic intro blocks, and path children get no points or lesson-done credit.

Goal: 120 lessons (70 new, 50 upgraded). Each has short sub-lessons, a made-for-lesson narrated clip, real photos and diagrams, simple playful narration and a 30-question quiz. Each course ends in a grand quiz.

## Owner decisions

| Topic | Decision |
|---|---|
| Course domain | Read as subject x class: 10 courses, 120 lessons (assumption, not yet confirmed) |
| Videos | Made for lessons, no YouTube |
| AnimatedWebs | Free plan: a few reusable pieces, ported into the app |
| Voice budget | Raise daily limit to 25,000 characters, then drip (about 22 days for 546k characters) |
| Grand quiz | 36 questions for both children, 3 per lesson, in rounds |
| New lesson order | Append to the end of each course |
| Retakes | 1 variant per question |

Builder calls, open to change: 1 clip per lesson, 45 to 75 seconds. Class 1 quiz rounds 5 x 6, Class 4 rounds 3 x 10. Grand quiz pass mark 70%, unlimited attempts. Reward 50 points plus stickers.

## Phase 0: Fixes (ship first)

- Path rewards: count passed topic quizzes as lessons done and add points (`worker/src/lib/map.ts`, `worker/src/routes/student.ts`).
- Enforce the big quiz lock on the server (`worker/src/routes/quiz.ts`), not only in `TopicPage.tsx`.
- One `quizStars()` rule at 90/80/70 in `@lms/schema`, used by `QuizPlayer.tsx` and `apps/web/src/lib/topic.ts`.
- Add `variant_of IS NULL` to exam SQL (`worker/src/routes/admin-exams.ts:46-55`).
- Extend `missingAssets` to `sub_lessons` (`worker/src/lib/lessons.ts:150`).

## Phase 1: Spikes (no user-facing change)

- Remotion determinism: Stage motion uses CSS transitions and `CountUp` uses `setInterval`. Pass condition: the same frame rendered twice, out of order, matches byte for byte. Fallback: compute motion in JS.
- Coteach: check if diagrams download without manual clicks. If not, about 48 diagrams in 12 calls is a manual step for the owner.
- Voice: confirm Cloudflare plan. 25,000 characters is about 34,100 neurons a day, above the 10,000 free allowance, so Workers Paid is likely required. Estimated total about $8.20.
- Confirm Unsplash terms for storing copies in R2 (repo bans hotlinks, Unsplash API guidance favours them). Confirm Remotion licence for this use.

## Phase 2: Platform (safe to deploy with no new content)

**Clips**
- New `tools/clips/` Remotion project, own lockfile, outside the `apps/*` workspace. Pin Remotion 4.0.541. Do not build on `my-video/`.
- Split `apps/web/src/components/Explainer.tsx` into pure `ExplainerView({scenes, step, clock})` plus controls, shared by web and Remotion.
- Clips are 1280x768, 24 fps, H.264 and AAC, captions burned in, 8 MB or less, 90 seconds hard maximum.
- New `clip` block: `{type, title, asset, poster, seconds, transcript, caption?}` in `packages/schema/src/lesson.ts`. Update `slides.ts`, `topic-kit.mjs` and `worker/src/lib/videos.ts`.
- `ClipPlayer.tsx`: tap to play, calls `stopSpeech()`. Calm mode shows poster and transcript with "Watch anyway".
- `worker/src/lib/assets.ts`: add Range support (206). `worker/src/routes/admin-content.ts`: allow `video/mp4`.
- `scripts/upload-media.mjs` uploads with the service token.

**Voice**
- Raise the AI ceiling to cover 25,000 characters a day, keeping room for hints.
- `POST /api/admin/voice/prewarm`, refactored from `narrate` in `worker/src/lib/tts.ts`. Move `sentences()` and `plain()` into `@lms/schema` so clips and lessons share R2 cache keys.
- Run prewarm just after 00:00 UTC, and always before publishing a lesson.

**Quiz at 30**
- `topic-kit.mjs` and `worker/src/topics.test.ts`: 30 mains, at least 8 `reason`, each type at least twice, at least 1 variant. `LEGACY_15` allowlist shrinks to empty, then is deleted.
- New lessons store 60 questions. Upgraded lessons store 75 (keep 45, add 15 mains and 15 variants). Both fit the cap of 80.
- Rounds in `QuizPlayer.tsx`, built on existing draft and resume code. `roundSizeFor(ageBand, total)`, mixed order in `startAttempt`, break screen with "Come back later", "Carry on: round 3 of 5" on `TopicPage.tsx`.

**Grand quiz (no D1 migration)**
- `kind='exam'`, `semester NULL`, `blueprint_json.scope='course'`. Reuse `worker/src/routes/admin-exams.ts` through `POST /api/admin/exams/grand`, which refuses under 12 published topics.
- 36 mains: 1 recall, 1 apply, 1 reason per topic. Copy each chosen variant with `variant_of` remapped.
- Server unlock in `POST /exams/:id/start`: all published topics passed.
- `/api/paths` adds `grand` status. Trail star in `SubjectPath.tsx` becomes a real link.

**Trail**
- 13-point serpentine layout for 10 or more topics, smaller nodes, grand card in Cards view. Remove "Semester 1" text from path UI. Keep `curriculum.semester: 1` in data.

**Connectors and credits**
- `credit` field on image block. Zod strips unknown keys, so this must land before content.
- `content/media/manifest.json`, `content/sources/<slug>.json` (Oak provenance), `content/media/animatedwebs.json`. Binaries stay in R2, not git.
- Parent-side credits page carries links and the line: "Contains public sector information licensed under the Open Government Licence v3.0." No Oak branding, no implied endorsement.
- `worker/src/connectors.test.ts` enforces the minimums below, runs in CI without binaries. Spot-check 10% of source ids by re-querying.

| Subject | Oak | Unsplash | Coteach |
|---|---|---|---|
| Maths | Required | 1+ | 2+ diagrams |
| Science | Required | 3+ | None |
| General knowledge | Required | 3+ | None |
| English | Required | 2+ | None |
| Data-AI | Where a unit exists, else `no_oak_unit` with reason | 2+ | None |

Unsplash calls use `content_filter: high`, `plus: none`, and `download_asset` for each photo used.

**AnimatedWebs and design plugins**
- About 3 generated components (reward burst, quiz celebration), ported to React and CSS in `apps/web/src/anim/rewards/`, restyled for kids, reduced-motion safe.
- `frontend-design` for rounds, breaks, trail and grand screens. `animate` and `animation-studio` for motion polish. `image-generation` for clip posters and gaps. `motion-reel` as a style reference only. Read each skill before use.

## Phase 3: Syllabus and pilot (owner gate)

- `docs/SYLLABUS_12.md` from Oak units: Class 1 at Year 2, Class 4 at Year 4 with some Year 5. Owner signs off before authoring. Oak has no AI units, so those topics are original.
- Pilot: one new Maths Class 1 lesson (topic 9) using Oak, Coteach, Unsplash, a clip, 30-question rounds and the celebration.
- Owner and the 7 year old try it. Nothing scales until the owner approves. Measure real render time and clip size here.

## Phase 4: Upgrade 50 lessons

- Add 15 mains and 15 variants, a clip, real media and Oak provenance.
- Move intro blocks into the `learn` part, then leave `blocks: []`.
- Keep slugs and sub-lesson ids unchanged, guarded by a snapshot test. A rename could lock a child out.

## Phase 5: Author 70 new lessons

New per course (Class 1 / Class 4): Maths 4/7, Science 6/6, Data-AI 8/8, General Knowledge 8/8, English 7/8. Appended to each course, imported as drafts.

Wave pattern for Phases 4 and 5, 12 waves in total:
1. Main session gathers Oak briefs and media for one course, because MCP connectors are not available to scripts.
2. 5 author subagents write 2 lessons each, in `scripts/topics/*.mjs`.
3. 1 independent reviewer checks facts, answer keys, age fit and playfulness.
4. `node scripts/build-topics.mjs`, then tests.

Audit adds a sentence-length check: about 12 words maximum for Class 1, 16 for Class 4. Follow `docs/LESSON_GUIDELINES.md`: British spelling, UK and Pakistan examples, Islamic examples where natural.

## Phase 6: Clips and grand quizzes

- Runs alongside Phases 4 and 5: render overnight in batches of 20 to 30, skip unchanged source hashes, prewarm, upload.
- Publish per course once narration is cached. Build each grand quiz when its course has 12 published topics.

## Phase 7: Close

Delete `LEGACY_15`. Update `docs/LESSON_GUIDELINES.md` and `docs/CURRICULUM_V2.md`, which are stale.

## Effort estimate (rough, unmeasured; pilot replaces it)

Claude working time: about 50 to 80 hours. Phases 0 to 2: 12 to 18 h. Pilot: 2 to 3 h. Upgrade 50 lessons: 12 to 18 h. Author 70 lessons: 14 to 20 h. Connector gathering (10 courses): about 10 h. Grand quizzes and cleanup: 2 to 4 h.
Machine time: clip rendering about 6 to 12 h, unattended, mostly overnight.
Calendar time: about 3 to 4 weeks. Floor is voice caching, about 22 days at 25,000 characters a day, which runs alongside authoring. Fixes and platform land in days 1 to 2, then each finished course is usable as it completes.
Owner time: syllabus sign-off, pilot review with the 7 year old, a quick check per course, possible manual Coteach downloads.
Scope decision: full plan, phased, as listed above.

## Risks

- Import outside study time: a re-import drops in-progress quiz drafts. Passes and stars stay. Each re-import adds question rows, so space out full passes.
- Prewarm shares budget with hints.
- Deploy code before content. Push to `main` deploys through CI, so work lands by branch and PR, one per phase.
- The uncommitted `.gitignore` change stays out of these commits unless the owner says otherwise.

## Verification

- Every phase: `npm run typecheck`, `npm test`, `npm run build`.
- New worker tests: Range 206 and 416, mp4 upload, quiz lock, grand unlock and variants, path points, prewarm scope, connector minimums.
- Browser: resume mid-round, Chrome, WebView2 desktop, iPad Safari video seek, reduced motion, 13-point trail.
- Before each publish: re-import on a local D1 copy holding child progress. Confirm passes, stars and points are unchanged.
