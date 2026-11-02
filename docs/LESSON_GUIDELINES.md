# Lesson creation guidelines

How we make every lesson. Give this file, plus `docs/LESSON_CAPABILITIES.md` (the block reference with examples), to Claude
whenever it generates a lesson. The full generation prompt and the file format are in `docs/PLAN.md` section 5.

## The golden rules

1. **Show it before you name it.** A new word or idea is never introduced in words alone. If a lesson says "pictogram",
   "bar chart", "fraction", "loop" or "evaporates", the same slide (or the one right before it) must **show one**: a
   drawn `chart`, an animated `explainer`, a `manipulative`, or a big emoji `image`. Never describe a picture that isn't there.
2. **A picture for every stop, and for every idea.** No stop (the part under one heading) is only words: each has at least
   one picture, chart, animation, video or movable thing, and each separate idea inside it is shown too, not just the first.
   The Week 1 files are checked by a test (`sectionsWithoutVisual`), so a text-only stop fails the build.
3. **Every bold word is covered.** Each **bold** key word gets a plain meaning in the lesson's `glossary` block (long-press a
   word in the player shows it), and the terms that matter most also have a picture (rule 1).
4. **One short video for the hardest idea.** Each lesson has at most a few `video` clips, **100 seconds or shorter** (the
   format refuses anything longer, so cut a longer video with `start` and `end`). The video explains the concept, it does
   not replace the pictures. See "Choosing a video" below.
5. **Do, don't just read.** A new idea is followed within a slide or two by something to *do*: a `check`, a `manipulative`
   (move things around, no real objects needed), a `brain_game`, or an `activity`.
6. **Motion for processes.** Anything that changes over time or in steps (water cycle, plant growth, a loop running,
   adding, a food chain, day and night) gets an `explainer` with a caption per step.
7. **One idea per slide, big and simple.** Short sentences, at most three small blocks between interactive moments.
8. **Be accurate and kind.** Only well-established facts. Warm, encouraging, never scary. Quiz questions can be answered
   from the lesson, and a chart or picture used in a question must be one the lesson showed.

## Which visual for which idea

| The idea is... | Use |
| --- | --- |
| Counting, adding, sharing, grouping, splitting | `manipulative` (movable things), or an `explainer` showing things joining |
| Data: collecting, comparing, "which is most" | `chart`: `tally`, `pictogram`, `table`, `bar_chart` (use the same numbers in the lesson text and the check question) |
| Number order, one more or less, taking away, hops | `chart` `number_line` with `marks` |
| Fractions, halves, quarters, equivalent | `chart` `fraction` (show `1/2`, then `2/4`) |
| A process or cycle (water cycle, growth, sandwich steps, a loop) | `explainer` (one scene per step; same `id` for things that move) |
| A single object, animal, person, place or group of things | `image` with big emoji and a caption (several emoji in a row are fine: "🚒🏥🏫🚜") |
| A hard idea a grown-up would explain out loud | `video` (100 seconds or less) after the pictures, as a second way in |
| Remembering and focus | `brain_game`: `memory_match` or `remember_order`, near the end as a brain break |
| Something truly special (a simulation) | `html_embed`, only when nothing above fits |

If a picture the lesson needs cannot be made with these blocks, say so in the lesson notes and add the idea to the backlog
in `docs/LESSON_CAPABILITIES.md` so we build it. Do not leave a gap.

## Choosing a video

- Educational and made for children: for example Khan Academy Kids, SciShow Kids, National Geographic Kids, BBC Bitesize, Code.org.
  No ads for other things, nothing scary, clear voice, matches the age.
- Must be allowed to play embedded. A grown-up opens it first and watches the part that will be used.
- Use `start` and `end` (seconds) to play just the useful part. The longest allowed clip is 100 seconds.
- Fill in `youtube` with the 11 character id from the link (the part after `v=`), `title` and a one-line `caption`.
- **Never guess an id.** Use only a video a person has opened and approved. If none is approved yet, leave the video out and
  note which concept still needs one.
- The player loads nothing from YouTube until the child presses play, then uses the privacy-friendly player and keeps
  suggested videos to the same channel.

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

- [ ] Every stop has a picture, chart, animation, video or movable thing, and every new term is shown (rules 1 and 2).
- [ ] Every new term has a picture, chart, animation or movable thing on screen (rule 1).
- [ ] Every bold word is in the `glossary`.
- [ ] Any `video` is 100 seconds or shorter, approved by a grown-up, with the right `start` and `end`.
- [ ] At least one `explainer` for the hardest process, and one `manipulative` or `activity` where it fits.
- [ ] At least one `brain_game`.
- [ ] Numbers in a `chart` match the numbers used in the text and in any `check` or quiz question about it.
- [ ] Validates against the lesson format (the importer shows any problems).
- [ ] Slugs and quiz question `ref`s stay the same when you update an existing lesson, so earlier attempts keep their meaning.
