# Lesson guidelines (the playbook)

The single source of truth for making lessons. Give this file and `docs/LESSON_CAPABILITIES.md` (the block reference) to Claude
whenever it generates or reviews a lesson. Part 9 is the ready-to-paste generation prompt. The file format is in
`docs/PLAN.md` sections 5.1 and 5.2.

**Status: draft v2, being finished with Uzair. No lessons are rebuilt until he says these guidelines are done.**
Decisions were confirmed by Uzair on 2 Nov 2026 (part 11). Items marked **(open)** are still to be decided.

## 1. Who the lessons are for

- Two girls, aged 7 (Class 1) and 9 (Class 4), and possibly friends of similar age. Lessons are tagged `age_band` 7-8, 9-10 or 7-10.
- They use a tablet or laptop, on their own, with narration on. A parent reviews scores afterwards, so quizzes must be fair and clear.
- Subjects: Maths, Science, Computer Science / Data & AI, General Knowledge, English.
- Spelling and examples (decided): British spelling by default; everyday examples (food, money, places, names) that both a UK
  reader and a child in Pakistan would recognise.

## 2. The golden rules

1. **Show it before you name it.** A new word or idea is never introduced in words alone. If a lesson says "pictogram",
   "bar chart", "fraction", "loop" or "evaporates", the same slide (or the one right before it) must **show one**: a drawn
   `chart`, an animated `explainer`, a `manipulative`, a big emoji `image`, or a `video`. Never describe a picture that isn't there.
2. **A picture for every stop, and for every idea.** No stop (the part under one heading) is only words: each has at least
   one picture, chart, animation, video or movable thing, and each separate idea inside it is shown too, not just the first.
   Committed lessons are checked by a test (`sectionsWithoutVisual`), so a text-only stop fails the build.
3. **Every bold word is covered.** Each **bold** key word gets a plain meaning in the lesson's `glossary` block (pressing and
   holding a word in the player shows it), and the terms that matter most also have a picture (rule 1).
4. **One short video for the hardest idea.** At most a few `video` clips per lesson, each **100 seconds or shorter** (the format
   refuses longer: cut a longer video with `start` and `end`). A video explains a concept; it never replaces the pictures.
5. **Do, don't just read.** A new idea is followed within a slide or two by something to *do*: a `check`, a `manipulative`
   (move things around, no real objects needed), a `brain_game`, or an `activity`.
6. **Motion for processes.** Anything that changes over time or in steps (water cycle, plant growth, a loop running, adding,
   a food chain, day and night) gets an `explainer` with a caption per step.
7. **One idea per slide, big and simple.** Short sentences, at most three small blocks between interactive moments.
8. **Be accurate and kind.** Only well-established facts. Warm, encouraging, never scary. Quiz questions can be answered from the
   lesson, and a picture or chart used in a question must be one the lesson showed.

## 3. Which visual for which idea

| The idea is... | Use |
| --- | --- |
| Counting, adding, sharing, grouping, splitting | `manipulative` (movable things), or an `explainer` showing things joining |
| Data: collecting, comparing, "which is most" | `chart`: `tally`, `pictogram`, `table`, `bar_chart` (same numbers in the text and in any check question) |
| Number order, one more or less, taking away, hops | `chart` `number_line` with `marks` |
| Fractions, halves, quarters, equivalent | `chart` `fraction` (show `1/2`, then `2/4`) |
| A process or cycle (water cycle, growth, sandwich steps, a loop) | `explainer` (one scene per step; same `id` for things that move) |
| A single object, animal, person, place or group of things | `image` with big emoji and a caption (several in a row are fine: "🚒🏥🏫🚜") |
| A hard idea a grown-up would explain out loud | `video` (100 seconds or less) after the pictures, as a second way in |
| Remembering and focus | `brain_game`: `memory_match` or `remember_order`, near the end as a brain break |
| Something truly special (a simulation) | `html_embed`, only when nothing above fits |

If a picture the lesson needs cannot be made with these blocks, say so in the lesson notes and add the idea to the backlog in
`docs/LESSON_CAPABILITIES.md` so we build it. Do not leave a gap.

## 4. Shape and size of a lesson

About 45 minutes of lesson plus a quiz of about 15 minutes (decided). Weekly lessons are due on Sunday; week 1 is a
diagnostic "check-in" in each subject.

1. **Welcome / hook**: a question or short story, with a big picture. Say it is a game, not a test.
2. **3 to 5 stops**, each: a `heading` ("Stop 2: ..."), 2 to 4 short sentences with the key word in **bold**, **its visual**,
   then a `check`.
3. **Something hands-on** at least once (`manipulative` or `activity`).
4. **One brain game** (`brain_game`), usually just before the summary.
5. **Summary** ("Remember" points), a note that the quiz comes next, and a `glossary` block covering the bold words.
6. A `reveal` ("Think about it") now and then to make the child predict before seeing the answer.

Slides read out loud, so write what sounds natural. Slides are scaled to fit the screen: never rely on small print.

## 5. Writing for the age

- **Age 7 (band 7-8):** sentences up to about 12 words, everyday words, lots of pictures, counts up to 20 in games, one new
  word at a time.
- **Age 9 (band 9-10):** up to about 18 words, 2 or 3 new vocabulary words per lesson, more steps in explainers, a little
  reasoning ("why", "what if").
- **Both (7-10):** write for the 7-year-old; add a `reveal` or `callout` stretch for the 9-year-old.
- Use the child's world: animals, food, games, school, family. Names of people in examples should be simple and varied.

## 6. Subject notes

- **Maths:** concrete before abstract (things, then pictures, then numbers). Use `manipulative` for number sense, `number_line`
  for order, `fraction` bars for fractions, `explainer` for operations (carrying, regrouping). Show the working, not just the answer.
- **Science:** observe, predict, explain. Processes get an `explainer`; classifications get a picture of each group. Only
  well-established facts. Name the key words (evaporate, condense, producer) and show them.
- **Computer Science / Data & AI:** three strands (set `unit` to which one): Computer Science (instructions, loops, if/then,
  debugging, safe online, mostly unplugged), Data (sorting, tally, pictograms, charts, averages), AI (kid-relatable examples,
  honest about what AI cannot do). No coding environment is required.
- **General Knowledge:** geography, history, people, nature, health and habits. Maps, timelines (`explainer`) and
  pictures for every place or thing. Check facts and dates; avoid anything that changes often unless dated.
- **English:** phonics and spelling, vocabulary, reading short passages, grammar, writing. Pictures carry meaning for each
  new word; listening (the read-aloud button) is part of the lesson.

## 7. Quizzes

- **15 questions** for the ~15 minute quiz (decided), for both age bands. Every question can be answered from the lesson.
- Every 15-question quiz uses **all nine** question types below at least once (decided: "use all of these quiz control types"); the other six questions repeat the types that suit the topic best.  Order roughly easy to harder. Pass mark 70% unless told otherwise.
- Never reuse the exact wording of the lesson's `check` questions.
- Multiple choice: 3 to 4 options, one clearly right, plausible wrong answers based on common misconceptions, no "all of the above".
- Each question has a `ref` (q1, q2...), a short `hint` that does not give the answer away, a 1 to 2 sentence `explanation`,
  `points` (1, or 2 for order and match), and a `skill_tag` ("topic.skill", snake_case) so the parent report shows strengths and gaps.

### Quiz question types (all nine, decided 2 Nov)

| # | Control | Schema type | Status |
|---|---|---|---|
| 1 | Radio buttons (single choice) | `multiple_choice` | built |
| 2 | Checkboxes (more than one right) | `multi_select` | built |
| 3 | True / false | `true_false` | built |
| 4 | Text input (word, number, short phrase) | `short_text`, `number` | built |
| 5 | Inline dropdowns (fill in the blanks) | `fill_blank` | built |
| 6 | Drag and drop matching | `match` | built |
| 7 | Drag and drop ordering | `order` | built |
| 8 | Image hotspots (click the right area) | `hotspot` | built |
| 9 | Slider (estimate or point on a scale) | `slider` | built |

All nine are built. Shapes (full examples in docs/LESSON_CAPABILITIES.md):
- `fill_blank`: `text` with `{b1}` gaps, `blanks: [{id, options:[{id,text}]}]` (2 to 6 choices each), `answer: {b1: "optionId"}`. Part credit per gap (points 2 or more).
- `hotspot`: `scene: {items:[{id, emoji, label, x, y, size}], show_labels}` (emoji picture, 2 to 12 things), `answer: ["id"]`.
- `slider`: `range: {min, max, step, unit}`, `answer: {value, tolerance}`; answer inside the range.
Use each type for what it does best: hotspot for "point to the part" (diagrams, maps), slider for estimates and scales
(number lines, years, temperatures), dropdown blanks for sentences and vocabulary, checkboxes for "select all that apply".

- `short_text` answers list common spellings. Number answers are correct and have a sensible `tolerance`.
- Charts and pictures used in a question must also have appeared in the lesson. When updating a lesson, keep `slug` and quiz
  `ref`s unchanged so earlier attempts keep their meaning.

## 8. Safety, tone and accessibility

- Warm and encouraging; mistakes are part of learning ("Not quite. Have another go!"). Never scary, shaming or competitive.
- No personal information, no links, no external images, no adverts. First names only.
- Be honest about AI: it can be wrong; it learns from examples; it does not "think" like a person.
- Examples and stories should preferably be Islamic and Muslim where they fit naturally (decided): names such as Fatima, Zainab, Ali, Omar, Aisha; foods like dates and samosas; Eid, Ramadan, mosques, Hajj, Islamic history and scientists (for example Al-Khwarizmi, Ibn al-Haytham, Fatima al-Fihri). Keep them accurate and respectful, never forced into a topic where they do not belong, and never quote religious text from memory: check facts with Uzair first. Stay neutral and kind about other beliefs; avoid politics and contested history.
- Do not put essential words inside pictures: the picture needs a caption or label that can be read aloud.
- Do not rely on colour alone; keep text large; every `image` needs a caption, and charts need real labels (the player reads them out).
- Motion is switched off for children who prefer reduced motion, so the caption must carry the meaning, not the movement.

### Choosing a video

- Preferably animated, and under 100 seconds (decided). Educational and made for children: for example Khan Academy Kids, SciShow Kids, National Geographic Kids, BBC Bitesize, Code.org.
  No ads for other things, nothing scary, clear voice, right level.
- Must be allowed to play embedded. **Uzair (or a grown-up he names) opens it first and watches the part that will be used.**
- Use `start` and `end` (seconds) to play just the useful part. The longest allowed clip is 100 seconds.
- Fill in `youtube` (the 11 character id after `v=`), `title` and a one-line `caption`.
- **Videos are found in the admin screen, not written by hand (decided 2 Nov):** Lessons, then Videos on a lesson row. It searches YouTube (embeddable, strict safe search, made-for-kids first, short clips first), Uzair watches the clip and presses Add, and the `video` block is added for you. Approved clips are kept and re-added automatically when a lesson is re-imported, so the lesson JSON does not need a `video` block at all.
- **Never guess an id.** Use only a video a person has opened and approved. If none is approved yet, leave the video out and
  note which concept still needs one.
- The player loads nothing from YouTube until the child presses play, then uses the privacy-friendly player and keeps
  suggested videos to the same channel.

## 9. The generation prompt (copy, fill in the lines, send to Claude)

````text
You are an expert primary-school teacher and instructional designer creating ONE interactive lesson
and quiz for my kids' learning platform. Output must import directly into the platform.
Follow docs/LESSON_GUIDELINES.md (pasted below or attached) exactly.

=== THIS LESSON ===
Subject: {{maths | science | data-ai | general-knowledge | english}}
Topic: {{e.g. "Halves and quarters"}}
Learner: {{age 7 (age_band "7-8") | age 9 (age_band "9-10") | both (age_band "7-10")}}
Curriculum slot: {{semester 1-4, week 1-12, or "none"}}
Videos I have approved for this lesson (youtube id, start, end): {{list, or "none"}}
Extra notes (optional): {{e.g. "she loves animals", "builds on last week's counting by 2s"}}

=== MUST DO ===
- Show every new word or idea with a picture, chart, animation, movable things or video before or as it is named.
- Every stop (heading section) has at least one visual block. Every bold word is in the glossary block.
- Include at least one explainer (for the hardest process), one manipulative or activity where it fits, one brain_game,
  a check after each new idea, and a summary. Use videos only from my approved list (100 seconds or less).
- Animate as in part 12: a backdrop on every heading, image blocks as actors cued to their sentence (`at`), drawn props
  instead of emoji for number lines, fractions, clocks, thermometers, balances, plants and the body, and explainers that
  use enter, exit, path, effect and camera where they make the idea clearer.
- Reading level, structure, subject notes, quiz rules and safety rules as in the guidelines.

=== OUTPUT FORMAT (STRICT) ===
Return ONLY one JSON object in a single ```json code block, nothing before or after it.
Use schema_version "1.0" and the block and question objects listed in docs/PLAN.md section 5.2 (explained in docs/LESSON_CAPABILITIES.md).

Before answering, silently check: valid JSON (double quotes, no trailing commas, no comments); every answer id exists in
its options/items; every explainer item has x and y between 0 and 100; every chart has the fields its kind needs; numbers
are correct and match the text; every quiz question is covered by the lesson. Then output the JSON only.
````

## 10. Review before a lesson goes live

Ask Claude: "Review this lesson as a 7-year-old would experience it, then as a 9-year-old, and fix anything confusing, missing
a picture, or too long", then "output the corrected JSON only". Then:

- [ ] Every stop has a picture, chart, animation, video or movable thing, and every new term is shown (rules 1 and 2).
- [ ] Every bold word is in the `glossary`.
- [ ] Animation (part 12): every heading has a `backdrop`; pictures enter on the sentence that names them; at most two
      things move at once; nothing important is shown only by movement.
- [ ] At least one `explainer` for the hardest process, one `manipulative` or `activity` where it fits, and one `brain_game`.
- [ ] Any `video` is 100 seconds or shorter, approved by a grown-up, with the right `start` and `end`.
- [ ] Numbers in a `chart` match the text and any `check` or quiz question about it.
- [ ] The quiz follows part 7; hints do not give answers away; every question can be answered from the lesson.
- [ ] Validates in the importer (it lists any problems); previewed once in the admin preview (no AI is used there).
- [ ] Slug and quiz refs unchanged when updating an existing lesson.

## 11. Decisions with Uzair (2 Nov 2026)

1. Spelling and examples: British spelling, examples that suit both the UK and Pakistan. **Agreed.**
2. Quiz length: **15 questions** per quiz (about 45 minute lesson plus 15 minute quiz).
3. Videos: preferably **animated** and **under 100 seconds**. Uzair approves each clip before it is used.
4. Examples and stories: preferably **Islamic and Muslim** where natural (see part 8).
5. Minimum per lesson: 1 explainer, 1 brain game, 1 hands-on, a picture on every stop. **Agreed.**
6. Quiz controls: all nine types in part 7. All built.

Three question types (`fill_blank`, `hotspot`, `slider`) were built on 2 Nov, and the quiz screen was reworked: real drag and drop with arrow fallback for ordering, drag or tap-to-pair for matching.

Still open: which channels or creators Uzair trusts for videos (he will send links), and whether the guidelines are now fully done.

## 12. Animation (decided 3 Nov 2026)

Lessons play like a short animated show the child steers. The player does most of this by itself; the fields below let a
lesson choreograph it. Full field list in `docs/LESSON_CAPABILITIES.md`. Plan: the "Animated lessons plan" doc (option B).

**What the player does on every lesson (no fields needed):** a guide character per theme (Bleep the robot, Jelly the gummy
drop, Sunny the sunflower, Hoot the owl) that talks while the voice reads, points at each new stop, cheers right answers
and thinks on wrong ones; narration read sentence by sentence, with the sentence card being read lit up and its **bold**
word underlined; each emoji in an `image` entering on its own with the sentences; scenery picked from the words when a
lesson names none; a short trip along a path between stops; explainers that play by themselves with the voice (pause and
step still work); confetti and a star into the progress trail for a right check; Calm mode (fades only) and reduced motion.

**Rules for writing lessons:**

1. **Every heading names a `backdrop`**: `plain`, `meadow`, `forest`, `pond`, `sea`, `desert`, `mountain`, `sky`, `space`,
   `kitchen`, `classroom`, `home`, `town`, `farm`, `map`, `lab`. It applies to the whole stop; an `image` or `explainer`
   can override it.
2. **One actor per idea, entering with its sentence.** Write `image` blocks with `actors` rather than one emoji string:
   each actor has an `emoji` or a `prop`, an optional `label`, and `at` = the sentence of the slide's text that brings it in
   (0 is the first). Order the text so the thing is named in the sentence it enters on.
3. **Drawn props over emoji** whenever a lesson names a number line, ten frame, tens and ones, fraction, clock,
   thermometer, balance, plant part, body part, globe, day and night, a robot grid, sorting boxes or a Venn diagram.
   In an explainer, give the prop the same `id` in every scene and change its values: the frog hops, the hands turn,
   the mercury rises.
4. **Explainers choreograph one main movement per step**, 3 to 6 steps: `enter` for how a new thing arrives (pop, fade,
   drop, grow, slide_left, slide_right, walk_left, walk_right), `exit` for how it leaves (fade, shrink, fly_up, drop),
   `path` for how it travels (straight, arc, hop), `effect` for what it is doing (rain, steam, sparkle, wind, glow,
   hearts, bubbles, zzz, arrow_right, arrow_down, count), and a scene `camera` (`zoom` 1 to 3 on `x`, `y`) to look closely
   at the part that matters, usually on the last step.
5. **Calm by design.** At most two things moving at once while words are spoken; effects only where they show the idea
   (steam for evaporating, rain for the water cycle, glow for heat or light). Captions and labels carry the meaning, so a
   child with motion switched off loses nothing.
6. **Show cause and effect in order**: if the sun heats the water, the sun glows first, then the water steams, then the
   cloud appears.
