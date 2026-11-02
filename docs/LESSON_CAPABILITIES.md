# Lesson capabilities

The living list of what a lesson can do. When generating a lesson with Claude, paste the **Available now** section so it
only uses things the player really supports. When a new idea comes up, add it to **Wanted next**; when it is built, move it
up and update the lesson format (`packages/schema/src/lesson.ts`), the player and `docs/PLAN.md` section 5.

## Available now

| Block | Use it for | Notes |
| --- | --- | --- |
| `heading` | Start a new idea (a new slide group) | Short, in kid words |
| `text` | Short sentences, one idea each | Each sentence becomes a tappable card. **Bold** key words |
| `image` | A big emoji or an uploaded picture | Add `alt` and `caption` |
| `callout` | `tip`, `fun_fact`, `warning` | One or two sentences |
| `vocab` | A new word with a meaning and an example | Read aloud when tapped |
| `glossary` | Meanings for the **bold** key words | Not a slide. Children press and hold any word to see it; words missing here get a cached AI explanation, so cover the bold words to keep AI use at zero |
| `steps` | Numbered steps a child ticks off | |
| `reveal` | "Think about it" then tap to see the answer | |
| `check` | One ungraded practice question (any quiz question type) | Instant feedback, never saved |
| `activity` | An offline hands-on task with a materials list | |
| `manipulative` | **Move-the-items play area**: a pile of emoji things (1 to 20) and 1 to 4 labelled places to drag them into, with a live sum | For counting, adding, splitting, sharing, grouping. Replaces needing real coins, buttons or pasta. Fields: `title`, `goal`, `emoji`, `count`, `zones` (labels). Never graded or saved |
| `chart` | **Drawn picture from a few numbers**: `pictogram`, `bar_chart`, `tally`, `table`, `number_line`, `fraction`. Use it whenever a lesson names one of these | Needs `title`. Pictogram, bar chart, tally, table: `rows` of `label`, `value` (0 to 100), optional `emoji`; pictogram also `each` (how many one picture stands for). Number line: `from`, `to`, optional `step`, `marks` (values to highlight). Fraction: `parts` (2 to 12), `shaded`. Optional `caption`. Sits with the text before it; one chart per slide |
| `explainer` | **Animated, step-by-step picture** (water cycle, a plant growing, a loop drawing a square). Each scene puts emoji on a stage; things that share an `id` glide to their new spot between steps; each step has a caption that is read aloud | 2 to 8 scenes, up to 14 things each. `x`, `y` are 0 to 100 (percent of the stage). `size` 1 to 3. `anim`: `none`, `bounce`, `float`, `spin`, `pulse`, `grow`. Give the same `id` to a thing that moves or stays across scenes; things missing from a scene fade out. Add a short `label` when naming a part helps |
| `brain_game` | **Mind-sharpening exercise**: `memory_match` (find the pairs) or `remember_order` (watch the order, then copy it; gets longer each win) | `title`, optional `goal`, 3 to 8 `emojis`. Never graded or saved. Use one near the end of a lesson as a brain break |
| `summary` | "Remember" points | Last block before the quiz |
| `html_embed` | A special sandboxed simulation | Use only when nothing above fits |

Question types for `check` and the quiz: multiple choice, multi select, true/false, number, short text, order, match.

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

- Number line the child can hop along (the drawn `chart` number line is built; hopping is not).
- Ten frame and base-ten blocks (place value).
- Pizza slicing and tapping to shade fractions (drawn fraction bars are built).
- Balance scale (equals, comparing weights).
- Clock with draggable hands.
- Sorting into groups with labelled boxes, including Venn diagrams (science, data).
- Order-the-steps and build-a-sentence drag tasks.
- More brain games: spot the difference, odd one out, number puzzles, speed counting.
- Drawn (SVG) diagrams and animated number lines for maths and science, beyond emoji.
- Label the diagram (drag labels onto a picture).
- Bar chart builder from tapped data (data and AI); drawn bar charts are built.
- Simple "program the robot" grid for loops and sequences (computer science).
- A check on a `manipulative` ("make 7 on the left"), once we want it scored.
