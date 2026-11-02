# Lesson creation guidelines

How we make every lesson. Give this file, plus `docs/LESSON_CAPABILITIES.md` (the block reference with examples), to Claude
whenever it generates a lesson. The full generation prompt and the file format are in `docs/PLAN.md` section 5.

## The golden rules

1. **Show it before you name it.** A new word or idea is never introduced in words alone. If a lesson says "pictogram",
   "bar chart", "fraction", "loop" or "evaporates", the same slide (or the one right before it) must **show one**: a
   drawn `chart`, an animated `explainer`, a `manipulative`, or a big emoji `image`. Never describe a picture that isn't there.
2. **Every bold word is covered.** Each **bold** key word gets a plain meaning in the lesson's `glossary` block, and the
   terms that matter most also have a picture (rule 1).
3. **Do, don't just read.** A new idea is followed within a slide or two by something to *do*: a `check`, a `manipulative`
   (move things around, no real objects needed), a `brain_game`, or an `activity`.
4. **Motion for processes.** Anything that changes over time or in steps (water cycle, plant growth, a loop running,
   adding, a food chain, day and night) gets an `explainer` with a caption per step.
5. **One idea per slide, big and simple.** Short sentences, at most three small blocks between interactive moments.
6. **Be accurate and kind.** Only well-established facts. Warm, encouraging, never scary. Quiz questions can be answered
   from the lesson, and a chart or picture used in a question must be one the lesson showed.

## Which visual for which idea

| The idea is... | Use |
| --- | --- |
| Counting, adding, sharing, grouping, splitting | `manipulative` (movable things), or an `explainer` showing things joining |
| Data: collecting, comparing, "which is most" | `chart`: `tally`, `pictogram`, `table`, `bar_chart` (use the same numbers in the lesson text and the check question) |
| Number order, one more or less, taking away, hops | `chart` `number_line` with `marks` |
| Fractions, halves, quarters, equivalent | `chart` `fraction` (show `1/2`, then `2/4`) |
| A process or cycle (water cycle, growth, sandwich steps, a loop) | `explainer` (one scene per step; same `id` for things that move) |
| A single object or animal | `image` with a big emoji and a caption |
| Remembering and focus | `brain_game`: `memory_match` or `remember_order`, near the end as a brain break |
| Something truly special (a simulation) | `html_embed`, only when nothing above fits |

If a picture the lesson needs cannot be made with these blocks, say so in the lesson notes and add the idea to the backlog
in `docs/LESSON_CAPABILITIES.md` so we build it. Do not leave a gap.

## Shape of a lesson (about an hour, with the quiz)

1. **Hook**: a question or short story, with a big picture.
2. **3 to 5 stops**, each: `heading`, 2 to 4 short sentences with the key word in **bold**, **its visual**, a `check`.
3. **Something hands-on** at least once (`manipulative` or `activity`).
4. **One brain game** (`brain_game`), usually just before the summary.
5. **Summary**, then the quiz (6 to 12 questions, mixed types, easy to harder, each with a hint and an explanation).
6. A `glossary` block covering every bold word.

## Writing for the age

- Age 7 (band 7-8): sentences up to about 12 words, everyday words, lots of pictures, counts up to 20 in games.
- Age 9 (band 9-10): up to about 18 words, 2 or 3 new vocabulary words per lesson, more steps in explainers.
- Read every sentence aloud in your head: the app reads slides out loud, so write what sounds natural.

## Checklist before you hand a lesson over

- [ ] Every new term has a picture, chart, animation or movable thing on screen (rule 1).
- [ ] Every bold word is in the `glossary`.
- [ ] At least one `explainer` for the hardest process, and one `manipulative` or `activity` where it fits.
- [ ] At least one `brain_game`.
- [ ] Numbers in a `chart` match the numbers used in the text and in any `check` or quiz question about it.
- [ ] Validates against the lesson format (the importer shows any problems).
- [ ] Slugs and quiz question `ref`s stay the same when you update an existing lesson, so earlier attempts keep their meaning.
