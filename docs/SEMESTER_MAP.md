# Semester map and mini games

Status: plan approved to build straight away (Uzair, 2 Nov 2026). Built in the same PR as this document.

## What the child sees

1. **Map button** on the student home screen header, next to the stars. It also shows the child's points.
2. **Map screen** (`/map`): a winding trail drawn for the current semester with **12 checkpoints** (one per teaching week)
   and a **castle/finish flag** for exam week. The art follows the child's theme:
   - Space Explorers: planets on a star trail, rocket buddy.
   - Candy Arcade: sweet shops on a candy-stripe road.
   - Sunny Playground: playground flags on a sunny path.
   - Storybook Forest: mushroom houses on a forest path.
3. **The character** (the child's avatar with a little hat/vehicle per theme) stands on the last checkpoint they reached.
   When every lesson of a week is completed, the checkpoint lights up, and the next time the map opens the character
   **walks along the path** to it (footstep sounds, trail fills in behind them, confetti and a fanfare on arrival).
   The walk plays once per new checkpoint (remembered on the device; if forgotten it simply shows the final position).
4. **Tapping a reached checkpoint** opens its **mini game**. Locked checkpoints wobble and say how many lessons are left
   ("2 of 5 lessons done"). Future weeks show a padlock and no lesson names, so the map never leaks hidden weeks.
5. Checkpoints show **stars (0 to 3)** from that week's quiz results and a **treasure chest** with the week's points.

## Checkpoint rules

- A week's checkpoint is **reached** when the week is released (current or past, or opened early by the parent) and
  every lesson the child has for that week is completed (`lesson_progress.status = 'completed'`).
- A released week with no lessons counts as reached (a rest stop) so the trail is never blocked.
- Past weeks can still be finished later; the checkpoint lights up whenever that happens.
- The character stands on the highest reached week. Skipped weeks keep an "unfinished" flag.
- Semesters: the map opens on the current semester; arrows switch to earlier semesters (never later ones).

## Points (decision: graded tries count, practice counts half)

Points come from quiz performance, and the mini game is how the child **collects** them.

| Source | Points |
| --- | --- |
| Each lesson quiz, best **graded** try (taken during the lesson's week) | `round(percent / 10)`, so 0 to 10 |
| Lesson quiz only ever taken as **practice** (after its week) | half of the above |
| Mini game bonus, best game played at that checkpoint | 0 to 10 |

- A checkpoint's chest holds the week's quiz points. Playing the game once opens the chest and banks them.
  Replays are for fun and can only raise the game bonus (best score counts, never added twice).
- Stars: average best quiz percent for the week. 90%+ = 3 stars, 70%+ = 2, any quiz taken = 1.
- Exams do not feed map points (they have their own record). No leaderboards, points are private to the child and parent.
- All points are computed on the server from `quiz_attempts` and `game_plays`; the browser never sends points, only a
  game score that the server caps per game.

## Mini games (original designs)

Six games, each with two levels. Weeks 1 to 6 play level 1; weeks 7 to 12 play the same games at level 2 (faster,
more items, trickier rules). Every game is about 45 to 60 seconds, touch-first with big targets, synthesised sounds
(no downloads), and works on a tablet in portrait or landscape. None copies an existing game.

| Week | Game | How it plays |
| --- | --- | --- |
| 1, 7 | **Star Scoop** | Drag the scoop along the bottom to catch falling stars; dodge the grumpy space rocks. Golden stars are worth 3. |
| 2, 8 | **Number Bubbles** | Bubbles float up carrying numbers. Pop only the ones that match the sign (even numbers, then "makes 10 with 3", etc.). |
| 3, 9 | **Twin Tiles** | Flip tiles to find matching pairs of subject pictures. Level 2 has more tiles. |
| 4, 10 | **Peek-a-Pop** | Little critters pop out of holes; tap the friendly ones, leave the sleepy ones. |
| 5, 11 | **Gem Maze** | Swipe or use the arrow pad to guide the character through a fresh maze, collecting gems before the timer runs out. |
| 6, 12 | **Sort Dash** | Items slide down the middle; swipe them left or right into the right basket (odd/even, living/not living, …). |

Each game reports a score; the server turns it into a 0 to 10 bonus using a per-game target and cap.

## Data and API

- New table `game_plays (id, user_id, semester, week, game, level, score, bonus, played_at)`.
- `GET /api/map?semester=N` returns the semester list, the 13 checkpoints (week, state, lesson counts, stars,
  quiz points, opened chest, best bonus, game id and level), and the child's point totals.
- `POST /api/map/play { semester, week, score }` checks the checkpoint is reached, caps the score, records the play,
  and returns the bonus, whether the chest was opened for the first time, and the new totals.
- Both reuse `visibleLessonsFor`, so hidden weeks stay hidden.

## Out of scope for now

- Spending points (a shop for avatar hats and trail decorations is the natural next step).
- Parent view of game plays in the admin reports (the data is recorded so it can be added later).
- Lesson content is untouched.
