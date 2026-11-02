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
| `summary` | "Remember" points | Last block before the quiz |
| `html_embed` | A special sandboxed simulation | Use only when nothing above fits |

Question types for `check` and the quiz: multiple choice, multi select, true/false, number, short text, order, match.

Authoring tips: one idea per slide, at most three short blocks between interactive moments, put a `manipulative` or `check`
right after each new idea, keep words simple (ages 7 to 10).

Example:

```json
{ "type": "manipulative", "title": "Counting treasure", "goal": "Split the 10 coins into two groups. How many in each?",
  "emoji": "🪙", "count": 10, "zones": ["Left hand", "Right hand"] }
```

## Wanted next (backlog)

- Number line the child can hop along (addition, subtraction, fractions).
- Ten frame and base-ten blocks (place value).
- Fraction bars and pizza slicing (halves, quarters, equivalence).
- Balance scale (equals, comparing weights).
- Clock with draggable hands.
- Sorting into groups with labelled boxes, including Venn diagrams (science, data).
- Order-the-steps and build-a-sentence drag tasks.
- Label the diagram (drag labels onto a picture).
- Bar chart builder from tapped data (data and AI).
- Simple "program the robot" grid for loops and sequences (computer science).
- A check on a `manipulative` ("make 7 on the left"), once we want it scored.
