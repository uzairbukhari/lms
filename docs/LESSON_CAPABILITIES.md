# Lesson capabilities

The living list of what a lesson can do. When generating a lesson with Claude, paste the **Available now** section so it
only uses things the player really supports. When a new idea comes up, add it to **Wanted next**; when it is built, move it
up and update the lesson format (`packages/schema/src/lesson.ts`), the player and `docs/PLAN.md` section 5.

## Available now

| Block | Use it for | Notes |
| --- | --- | --- |
| `heading` | Start a new idea (a new slide group) | Short, in kid words. Add `backdrop` (scenery for the whole stop, see below) |
| `text` | Short sentences, one idea each | Each sentence becomes a tappable card. **Bold** key words |
| `image` | A picture on a stage of scenery: emoji or drawn props that enter with the narration | Add `alt` and `caption`. Prefer `actors` (up to 8): each `{emoji | prop, label?, at?, enter?, effect?, x?, y?, size?}`; `at` = which sentence of the slide's text brings it in (0 first). A plain `emoji` string still works: each emoji becomes one actor. Optional `backdrop`. An uploaded `asset` shows as a plain picture |
| `callout` | `tip`, `fun_fact`, `warning` | One or two sentences |
| `vocab` | A new word with a meaning and an example | Read aloud when tapped |
| `glossary` | Meanings for the **bold** key words | Not a slide. Children press and hold any word to see it; words missing here get a cached AI explanation, so cover the bold words to keep AI use at zero |
| `steps` | Numbered steps a child ticks off | |
| `reveal` | "Think about it" then tap to see the answer | |
| `check` | One ungraded practice question (any quiz question type) | Instant feedback, never saved |
| `activity` | An offline hands-on task with a materials list | |
| `manipulative` | **Move-the-items play area**: a pile of emoji things (1 to 20) and 1 to 4 labelled places to drag them into, with a live sum | For counting, adding, splitting, sharing, grouping. Replaces needing real coins, buttons or pasta. Fields: `title`, `goal`, `emoji`, `count`, `zones` (labels). Never graded or saved |
| `chart` | **Drawn picture from a few numbers**: `pictogram`, `bar_chart`, `tally`, `table`, `number_line`, `fraction`. Use it whenever a lesson names one of these | Needs `title`. Pictogram, bar chart, tally, table: `rows` of `label`, `value` (0 to 100), optional `emoji`; pictogram also `each` (how many one picture stands for). Number line: `from`, `to`, optional `step`, `marks` (values to highlight). Fraction: `parts` (2 to 12), `shaded`. Optional `caption`. Sits with the text before it; one chart per slide |
| `video` | **A short clip (100 seconds or shorter)** from YouTube, cut with `start` and `end`, for the hardest idea | `title`, `youtube` (11 character id), `start`, `end`, optional `caption`. Shows a play button; nothing loads until pressed; privacy-friendly player, related videos kept to the same channel. A grown-up must approve each clip. See `docs/LESSON_GUIDELINES.md` |
| `explainer` | **Animated, step-by-step picture** (water cycle, a plant growing, a loop drawing a square). Plays by itself with the voice on drawn scenery; things that share an `id` glide (or hop) to their new spot between steps; each step's caption is read aloud | 2 to 8 scenes, up to 14 things each. Each thing has an `emoji` or a `prop`; `x`, `y` are 0 to 100 (percent of the stage); `size` 1 to 3; `anim`: `none`, `bounce`, `float`, `spin`, `pulse`, `grow`; `enter`, `exit`, `path`, `effect` (below). Same `id` = same thing across scenes; things missing from a scene leave by their `exit` (default fade). A scene can set `camera: {zoom, x, y}`. Block options: `backdrop`, `autoplay` (default true). Add a short `label` when naming a part helps |
| `brain_game` | **Mind-sharpening exercise**: `memory_match` (find the pairs) or `remember_order` (watch the order, then copy it; gets longer each win) | `title`, optional `goal`, 3 to 8 `emojis`. Never graded or saved. Use one near the end of a lesson as a brain break |
| `summary` | "Remember" points | Last block before the quiz |
| `html_embed` | A special sandboxed simulation | Use only when nothing above fits |

### Animation values (see part 12 of the guidelines)

- `backdrop`: `plain`, `meadow`, `forest`, `pond`, `sea`, `desert`, `mountain`, `sky`, `space`, `kitchen`, `classroom`, `home`, `town`, `farm`, `map`, `lab`. Without one the player picks scenery from the words, then from the subject.
- `enter`: `pop`, `fade`, `drop`, `grow`, `slide_left`, `slide_right`, `walk_left`, `walk_right`. `exit`: `fade`, `shrink`, `fly_up`, `drop`. `path`: `straight`, `arc`, `hop`.
- `effect`: `none`, `rain`, `steam`, `sparkle`, `wind`, `glow`, `hearts`, `bubbles`, `zzz`, `arrow_right`, `arrow_down`, `count` (a number `label` counts up from 0).
- `prop` (drawn pictures with moving parts; change the values between explainer scenes and they animate):

| `kind` | Fields |
| --- | --- |
| `number_line` | `from`, `to` (default 0 to 10), `value` (where the frog sits) |
| `ten_frame` | `value` (0 to 10 counters) |
| `base_ten` | `tens`, `ones` (0 to 9 each) |
| `fraction_pizza`, `fraction_bar` | `parts`, `shaded` |
| `clock` | `hour`, `minute` |
| `thermometer` | `value`, optional `from`, `to` (default -10 to 50) |
| `balance` | `left`, `right` (weights; the beam tips to the heavier side) |
| `plant` | `highlight`: `roots`, `stem`, `leaf`, `flower` |
| `body` | `highlight`: `brain`, `heart`, `lungs`, `stomach`, `bones`, `muscles` |
| `globe` | none (spins) |
| `sun_earth` | `value` = hour of the day (0 to 24): the Earth turns, the night side moves |
| `robot_grid` | `col`, `row` (0 to 4), `facing`: `up`, `down`, `left`, `right` (5 x 5 grid, star in the corner) |
| `sorting_boxes` | `labels` (2 or 3 box names) |
| `venn` | `labels` (two circle names) |

```json
{ "type": "image", "caption": "The frog hops from 2 to 5.", "actors": [
  { "prop": { "kind": "number_line", "from": 0, "to": 10, "value": 5 }, "at": 0, "size": 3 },
  { "emoji": "🐸", "label": "2 + 3 = 5", "at": 2, "enter": "drop", "effect": "sparkle", "x": 82, "y": 22, "size": 1 } ] }
```

Question types for `check` and the quiz (all nine): multiple choice (radio), multi select (checkboxes), true/false, number and short text (typed), order (drag to reorder), match (drag or tap to pair), `fill_blank` (dropdown gaps in a sentence), `hotspot` (tap the right picture), `slider` (estimate on a scale).

```json
{"ref":"q4","type":"fill_blank","prompt":"Fill the gaps","text":"Plants need {b1} and {b2} to grow.","points":2,
 "blanks":[{"id":"b1","options":[{"id":"x","text":"light"},{"id":"y","text":"sand"}]},{"id":"b2","options":[{"id":"x","text":"water"},{"id":"y","text":"milk"}]}],
 "answer":{"b1":"x","b2":"x"}}
{"ref":"q5","type":"hotspot","prompt":"Tap the heart","scene":{"items":[{"id":"h","emoji":"❤️","label":"heart","x":30,"y":45,"size":3},{"id":"l","emoji":"🫁","label":"lungs","x":70,"y":45,"size":3}],"show_labels":false},"answer":["h"]}
{"ref":"q6","type":"slider","prompt":"About how many days are in a week?","range":{"min":0,"max":14,"step":1,"unit":"days"},"answer":{"value":7,"tolerance":0}}
```

Every lesson should have: a `glossary` for its bold words, at least one `explainer` for the hardest idea, at least one
hands-on or brain moment (`manipulative`, `brain_game` or `activity`), and a `check` after each new idea.

Authoring tips: one idea per slide, at most three short blocks between interactive moments, put a `manipulative` or `check`
right after each new idea, keep words simple (ages 7 to 10).

Example:

```json
{ "type": "manipulative", "title": "Counting treasure", "goal": "Split the 10 coins into two groups. How many in each?",
  "emoji": "🪙", "count": 10, "zones": ["Left hand", "Right hand"] }
```

Example explainer (two scenes, one thing moves):

```json
{ "type": "explainer", "title": "Apples and more apples", "scenes": [
  { "caption": "You have 3 apples.", "items": [ { "id": "a1", "emoji": "🍎", "x": 30, "y": 50, "size": 3 } ] },
  { "caption": "A friend gives you one more.", "items": [ { "id": "a1", "emoji": "🍎", "x": 40, "y": 50, "size": 3 }, { "id": "a2", "emoji": "🍎", "x": 65, "y": 50, "size": 3, "anim": "grow" } ] } ] }
```

For how and when to use each block, see `docs/LESSON_GUIDELINES.md` (rule 1: show it before you name it).

The eight Week 1 lessons in `content/lessons` were enriched with these blocks by `node scripts/enrich-lessons.mjs` (safe to re-run).
Importing a lesson file in the parent area saves it as a new version.

## Wanted next (backlog)

- Number line the child can hop along by tapping (the animated `number_line` prop is built; tapping to hop is not).
- Ten frame and base-ten blocks (place value).
- Pizza slicing and tapping to shade fractions (drawn fraction bars are built).
- Balance scale (equals, comparing weights).
- Clock with draggable hands.
- Sorting into groups with labelled boxes, including Venn diagrams (science, data).
- Order-the-steps and build-a-sentence drag tasks.
- More brain games: spot the difference, odd one out, number puzzles, speed counting.
- More drawn props: maps of the UK and Pakistan, a magnet, the water cycle as one prop, coins.
- Label the diagram (drag labels onto a picture).
- Bar chart builder from tapped data (data and AI); drawn bar charts are built.
- Simple "program the robot" grid the child drives with arrow cards (the animated `robot_grid` prop is built; driving it is not).
- A check on a `manipulative` ("make 7 on the left"), once we want it scored.

### Needed for curriculum v3 (5 Nov 2026, see `docs/CURRICULUM_V2.md` and guidelines parts 4, 13 to 15)

- **Topic lesson format**: `objectives`, `success_criteria`, `standards` (`{framework, code, text}`), `warm_up`,
  `enquiry`, `real_life`, and `sub_lessons` (`id`, `kind` learn/try/play/use, `challenge`, blocks, mini quiz); main quiz
  questions gain `depth` and `sub_lesson`. Needs a new `schema_version` and an importer that still reads 1.0 lessons.
- **"I can" self-check** after the main quiz (one face per success criterion), stored per attempt.
- **Remember warm-up** player step (3 questions, from the lesson or picked from the child's weak skills).
- **`project` block** for `use` sub-lessons: driving question, milestone task, photo or voice upload to R2.
- **Photo assets** from Unsplash stored in R2 with a credit caption (the `image` block's uploaded `asset` already works;
  add a required `credit` field).
- **Block-coding puzzle** for Data & AI Class 4 (drive the `robot_grid` with arrow and repeat cards), since NC KS2 expects
  real programs.
- **Line graph** chart kind and **chance** (coin and spinner) manipulative, used by Data detectives in both classes.
