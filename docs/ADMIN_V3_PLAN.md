# Admin v3: lessons, courses, classes and teachers

**Status: proposed 12 Nov 2026, waiting for Uzair's review. No code changes until approved.**
Design images of the new admin: `/mnt/project-files/screens/admin-v3/` (made from the mock in `docs/prototypes/admin-v3/`,
sample data only).

This plan replaces the semester and week structure (`docs/PLAN.md` 4d, `docs/SEMESTER_MAP.md`) and finishes the move
that `docs/CURRICULUM_V2.md` started (topic lessons, mastery paths). It keeps every lesson, quiz attempt and point the
girls have earned.

---

## 1. The new structure in one picture

```
Lesson library ──(many to many, ordered)──> Course ──(many to many, ordered)──> Class ──(one to many)──> Students
  age range + tags                           e.g. "Class 1 Maths"                e.g. "Class 1"            each student in ONE class
                                                                                     │
                                                                Teachers ─(many to many, view or edit)─┘
                                                                Super admin: everything
```

| Thing | What it is | Rules |
|---|---|---|
| **Lesson** | One topic lesson (parts + mini quizzes + big quiz). Independent of any course. | Has subject, age range (e.g. 6 to 7), difficulty, tags, status (draft, ready, published, archived), owner. Can sit in many courses. |
| **Tag** | A free label or a curriculum code. | Kinds: *topic* ("fractions"), *skill* ("compare"), *standard* (NC Y2 Ma 2.1, Cambridge 2Np.01, Pakistan SLO), *custom*. Colour per kind. |
| **Course** | An ordered list of lessons, optionally split into sections. | Has subject (or mixed), age range, cover colour, status. Can be in many classes. |
| **Class** | A group of students plus the courses they take. | Each course in a class has an *unlock rule* (section 3). |
| **Student** | A child login. | Belongs to exactly one class (enforced in the database). Moving class keeps all history. |
| **Teacher** | A staff login, assigned to one or more classes. | Per class: **Viewer** (see lessons, courses, progress) or **Editor** (also change lessons and courses, run exams, unlock topics). |
| **Super admin** | You. | Everything, plus people, teachers, settings, AI budget, deleting. |

## 2. Database changes (D1)

New migration `0019_structure_v3.sql`. All additive first; old columns are dropped only in step 6 of the rollout.

```sql
-- Lessons: real age range, owner, tags
ALTER TABLE lessons ADD COLUMN age_min INTEGER;            -- filled from age_band ('7-8' -> 7, 8)
ALTER TABLE lessons ADD COLUMN age_max INTEGER;
ALTER TABLE lessons ADD COLUMN owner_id TEXT REFERENCES users(id);
CREATE TABLE tags (id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK (kind IN ('topic','skill','standard','custom')),
  label TEXT NOT NULL, code TEXT, UNIQUE (kind, label));
CREATE TABLE lesson_tags (lesson_id TEXT NOT NULL REFERENCES lessons(id), tag_id TEXT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (lesson_id, tag_id));

-- Courses: sections and owner; course_lessons loses semester/week (kept until step 6, then dropped)
ALTER TABLE courses ADD COLUMN age_min INTEGER;  ALTER TABLE courses ADD COLUMN age_max INTEGER;
ALTER TABLE courses ADD COLUMN owner_id TEXT REFERENCES users(id);
ALTER TABLE courses ADD COLUMN cover TEXT;
ALTER TABLE course_lessons ADD COLUMN section TEXT;           -- optional heading, e.g. "Numbers to 100"

-- Courses in a class, with the unlock rule (replaces course_assignments + classes.unlock_mode + terms)
CREATE TABLE class_courses (
  class_id TEXT NOT NULL REFERENCES classes(id), course_id TEXT NOT NULL REFERENCES courses(id),
  position INTEGER NOT NULL DEFAULT 0,
  unlock_rule TEXT NOT NULL DEFAULT 'mastery' CHECK (unlock_rule IN ('mastery','open','drip')),
  pass_percent INTEGER NOT NULL DEFAULT 70,
  drip_start TEXT, drip_every_days INTEGER,                   -- only for 'drip'
  PRIMARY KEY (class_id, course_id));

-- One class per student
ALTER TABLE users ADD COLUMN class_id TEXT REFERENCES classes(id);   -- students only
-- (class_members becomes a view over users.class_id after step 4)

-- Staff
-- users.role gains 'teacher' and 'super_admin' (SQLite: rebuild the CHECK via a table copy in the same migration).
CREATE TABLE class_staff (class_id TEXT NOT NULL REFERENCES classes(id), user_id TEXT NOT NULL REFERENCES users(id),
  access TEXT NOT NULL CHECK (access IN ('view','edit')), PRIMARY KEY (class_id, user_id));
CREATE TABLE audit_log (id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, target TEXT NOT NULL,
  detail_json TEXT, at TEXT NOT NULL DEFAULT (datetime('now')));
```

Exams reuse `quizzes` (kind `'exam'`) with `blueprint_json.scope = 'class'` and a new nullable `quizzes.class_id`.
Questions are frozen copies (`source_question_id`), exactly as the grand quiz in `worker/src/lib/grand.ts` does today.

## 3. Unlocking without semesters

Each course in a class picks one rule. This replaces both the weekly calendar and `classes.unlock_mode`.

| Rule | What the child sees | Good for |
|---|---|---|
| **Mastery path** (default) | Lesson 1 open; each next lesson opens at 70% on the big quiz. Same as the current topic path. | Fatima, Zainab |
| **All open** | Every lesson in the course is open. | Revision courses, holiday packs |
| **Drip** | One more lesson opens every N days from a start date (still also needs the previous one passed if you tick "and mastery"). | A pace without semesters |

"Open early" stays: a teacher or you can open any lesson for the whole class or one student (`path_unlocks`, already built).

## 4. Roles and permissions

Staff sign in through Cloudflare Access (one Access policy for super admins, one for teachers; email decides who is who).
Students keep username and password.

| Action | Super admin | Teacher (Editor on class) | Teacher (Viewer on class) |
|---|---|---|---|
| See lesson library | All | All (read) | All (read) |
| Edit a lesson | Any | Lessons they own, or used **only** in their classes. Otherwise "Duplicate to edit". | No |
| Create / edit courses | Any | Courses used only in their classes, or their own | No |
| Add / remove courses in class, set unlock rule | Yes | Their classes | No |
| Open a topic early | Yes | Their classes | No |
| Generate / publish grand exam | Yes | Their classes | No (can preview) |
| See students and progress | All | Their classes | Their classes |
| Add / move students, reset passwords | Yes | No | No |
| Teachers, roles, settings, AI budget, delete | Yes | No | No |

Every write goes through one `can(actor, action, target)` check in the Worker (`worker/src/lib/permissions.ts`),
never only in the UI. Every write is logged to `audit_log` and shown on Settings > Activity.

## 5. Admin portal redesign

The current admin (PR #2 design system: Inter, slate + indigo, light/dark) stays as the visual base. What changes is
the structure: fewer pages, each one built around a single job.

### 5.1 Navigation

```
Home                 what needs you today
Library
  Lessons            the lesson library
  Courses            course list + course builder
  Question bank      every question, reusable in exams
  Media              (existing)
  Tags               manage tags and curriculum codes
Classes              list; each class has tabs: Overview · Students · Courses · Exams · Progress · Teachers
People
  Students           all students (super admin)
  Teachers           teachers and their classes (super admin)
Reports              (existing reports + insights merged)
Settings             (super admin) incl. AI budget, Activity log
```

Removed: Year plan, Next lesson prompt (moves into the lesson editor as "Ask Claude"), separate Exams page
(moves into each class), weekly unlock screens.

A teacher sees the same shell with only the classes they are assigned to; edit buttons are hidden where they only
have view access, and a small "View only" badge explains why.

### 5.2 Lesson library

- **Filters on the left, always visible:** subject, age (range slider 5 to 11), tags (type to search, any or all),
  status, "used in" (course or class), "not in any course", has clip, quiz variants complete.
- Active filters show as removable chips above the results with a result count. Saved views ("Class 1 drafts").
- **Grid or table.** Grid cards show a real thumbnail of slide 1, subject colour, age pill, tags, part count, and
  where it is used. Table is sortable and dense for bulk work.
- **Bulk actions:** tag, untag, publish, archive, add to course.
- **Quick look:** space bar or click opens a side panel with the outline, quiz summary and a live mini preview
  without leaving the list.

### 5.3 Course builder (drag and drop)

Two panes. Left: the library with the same filters, narrowed to the course's subject and age by default.
Right: the course outline.

- Drag a lesson from left to right, or press **Add** (keyboard and touch users). Drag to reorder, or use Move up/down.
- Sections: add a heading and drag lessons under it.
- Live checks along the top: total time, age fit (warns when a lesson's age range is outside the course's),
  duplicate lessons, draft lessons that students would not see, tag coverage (e.g. 6 of 9 NC Year 2 number codes).
- "Used in 2 classes" warning before a change that affects children already on the course.

### 5.4 Lesson editor

Three columns: **outline** (parts and slides, drag to reorder) · **editor** (the selected slide's blocks with a
block palette: text, image, manipulative, number line, ten frame, clip, mini quiz) · **live preview** (device frame).

Tabs across the top: Content · Quiz · Details (title, subject, age, tags, success criteria) · History.

- **Checks panel** runs the lesson guidelines automatically: British spelling, reading age for the age range,
  every image has alt text, every big-quiz question has at least 2 variants, every part has a mini quiz,
  narration script present. Each failure links to the slide.
- **Ask Claude:** describe a change ("make part 2 easier", "add a ten frame example") and it builds the prompt
  from the lesson JSON, like the current "Copy JSON" flow but in one step. Uses Workers AI only for small edits
  (respecting the daily cap); big rewrites still go through Claude and import.
- **History:** every save is a version; see a side-by-side diff and roll back.

### 5.5 Previews

- Device frames: iPad landscape (1180 x 820), iPad portrait, Surface (1440 x 960), phone.
- Theme switch (Space, Candy, Sunny, Forest) and Calm mode.
- **Preview as a student:** pick a student to see exactly what they see (locks, progress, stars). Read only, never
  records attempts.
- Jump to any part or slide; play narration on demand only (preview still uses zero AI by default).
- Share a preview link with a teacher (signed, expires in 7 days).

### 5.6 Quiz builder

- Question list with type icons; add from 12 types (current ones plus ordering, matching, number line, label
  diagram).
- Each question has: prompt, answer, hint, "why wrong" text per wrong option, difficulty (1 to 3), tags, and its
  **variants** side by side. A red dot shows questions with fewer than 2 variants.
- "Make variants" drafts 2 more with Workers AI for you to approve (never auto-published).
- **Item stats** from real attempts (from Question insights): percent correct, most picked wrong answer, average
  time. Flags questions that are too easy (over 95%) or confusing (a wrong option picked more than the right one).
- Student-view preview of each question, tapping through as the child would.

### 5.7 Grand exam generator (inside a class)

Class > Exams > **New grand exam**, a four-step panel with a live paper preview:

1. **Cover:** pick courses (and optionally single lessons) from this class. Default: all lessons the class has
   finished or is due to finish.
2. **Blueprint:** number of questions (10 to 40), weighting (even per lesson, or by lesson length), difficulty mix
   (e.g. 30% easy, 50% core, 20% stretch), question types allowed, time limit (optional), max attempts.
3. **Generate:** picks questions from the lessons' big quizzes and the question bank, never two variants of the same
   question, spreads tags evenly. Shows the paper grouped by course. **Swap** any question for another from the
   same lesson, **lock** questions you like, then **Regenerate** the rest.
4. **Publish:** open now or on a date; per-student retakes use different variants (anti-cheat, as today).

Results: per-student score, per-course and per-tag breakdown, and the "needs work" lessons, each with an
"Open for revision" button.

### 5.8 More ideas (pick any)

1. **Coverage map per class:** grid of curriculum codes against lessons, coloured by how well the class did.
2. **Home "needs you" list:** students stuck on a quiz 3+ times, lessons with failed checks, drafts in published
   courses, exams waiting to be published.
3. **Teacher notes** on a student or a lesson, visible to staff only.
4. **Course templates:** "Class 1 Maths, England NC" made from tags automatically, then edited.
5. **Parent report** per student (one page, by tag and course), downloadable as PDF from the Worker.
6. **Command palette** (Ctrl K): jump to any lesson, student or class.

## 6. Migration from semesters and weeks (keeps all content and progress)

Nothing a child has done is deleted. Attempts, stars, points, cards and growth stay exactly as they are because
they are keyed by lesson and quiz, not by week.

| Today | After |
|---|---|
| `course_lessons.semester/week` | Order kept as `position` (semester, week, position). Columns dropped in step 6. |
| `terms` table | Kept read only for history, hidden in the UI. |
| `classes.unlock_mode = 'path'` | Each of the class's courses gets `unlock_rule = 'mastery'`. |
| `classes.unlock_mode = 'weekly'` | `'drip'` every 7 days from the term start, so nothing a child had open closes. |
| `lesson_unlocks` (week) | Turned into `path_unlocks` rows for each lesson in that week. |
| `course_assignments` (class) | `class_courses` rows. Per-student assignments become per-student unlocks, or the student's own class. |
| `class_members` (many) | `users.class_id`. Students in more than one class: migration stops and lists them; you pick (today only the test student may be). |
| Semester exams (kind exam, semester set) | Kept with their attempts, shown as "Past exams" in the class. |
| Course grand quiz | Kept; becomes "Course final" in the course. Class grand exams are new. |
| Semester map + 6 mini games (12 weekly checkpoints) | Becomes a **Journey map**: a checkpoint every 3 topics passed, across subjects. Games and coins unchanged. |
| Admin unlock by week, "My weeks" picker | Removed; "Open early" per lesson stays. |
| `admin` role | Your account becomes `super_admin`. |

Rollout, each step its own PR and reversible until step 6:

1. Migration 0019 (additive) + backfill script, run on a copy of prod D1 first (`wrangler d1 export`), with a report.
2. Permissions layer + teacher sign-in (Access policy) behind a setting; your account only.
3. New admin shell and Library (lessons, tags, course builder). Old pages still reachable.
4. Classes with courses, unlock rules, teachers; student app reads `class_courses` (feature flag per class:
   switch Zainab first, then Fatima).
5. Lesson editor, previews, quiz builder, grand exam generator.
6. Drop old columns and pages after 2 weeks with no issues.

## 7. Student app review at tablet size

Checked in a headless browser with the test student's data on iPad landscape (1180 x 820), iPad portrait
(820 x 1180) and Surface (1440 x 960). Screenshots: `/mnt/project-files/screens/student-review/`. Measured page
height against the screen:

| Screen | iPad landscape | iPad portrait | Surface |
|---|---|---|---|
| Dashboard | fits (820 / 820) | **scrolls** (1824 / 1180) | fits |
| Subject map | **scrolls** (1018 / 820) | fits | **scrolls** (1018 / 960) |

Fixes, most important first:

1. **Subject map: "Up next" card is pushed off the screen.** On iPad landscape only its top edge shows, so the
   Start button cannot be seen at all. Cause: the map area has a fixed `min-height` (520px, 680px when dense) and the
   card is absolutely placed at its bottom right (`SubjectPath.tsx` lines 103 and 115). Fix: make the page a
   one-screen grid (header / map / footer). The map row takes the space left (`min-height: 0`, no fixed floor) and
   the SVG path scales with it. "Up next" moves into the footer row, full width on portrait, right-aligned next to a
   small legend on landscape. Never over the map.
2. **Subject map: wasted space.** A ~150px empty band sits under the last row on landscape and ~180px on portrait,
   while the card is cut off. Fixing 1 fills it. Also the current topic's glow makes the first row look misaligned;
   align all node centres on the row line and let the glow overflow.
3. **Subject map: locked labels are faint** (about 60% opacity on navy, under 4.5:1 for WCAG AA). Keep the padlock
   dim but the label at full contrast, and show the topic number under the padlock so children can count along.
4. **Dashboard (landscape): "Open map" buttons spill out of the bottom of four of the five cards.** The card height
   is set by the grid, but the content (icon, title, bar, two lines of progress, grand quiz line, two buttons) is
   taller. Fix: shrink the icon circle with screen height (`clamp(64px, 12vh, 120px)`), drop the "Grand quiz: finish
   all topics" line until it is close (last 2 topics), and turn "Open map" into a small text link under Start.
5. **Dashboard: cards are uneven.** The Maths card's title is one line, the others two, so bars and buttons sit at
   different heights. Use a subgrid (or fixed rows: icon / label / title clamped to 2 lines / bar / button) so every
   bar and every Start button lines up.
6. **Dashboard (portrait): page scrolls to 1824px** with five cards in two columns (the fifth sits alone).
   Use a single column of short horizontal cards (icon left, title and bar middle, Start right), about 120px each,
   so all five fit with the header.
7. **Dashboard: the top buttons wrap to a second row on portrait** and "My quest" with its subline uses ~90px on
   landscape. Group "My growth" and "Stickers and shop" into one "Me" button, move "0 of 60 topics done" into the
   header next to stars, and drop the "My quest" heading on tablets.
8. **Dashboard: progress text is small and doubled** ("0 of 4 parts · 0 of 12 topics done", 14px). Show one line,
   "Topic 1 of 12", at 16px; the bar already shows the parts.
9. **Touch targets:** the Map/Cards toggle is about 44px tall; raise to 48px to match the other buttons.

### 7.1 New student home (full redesign, two directions)

Uzair asked (12 Nov) to redo the student first page completely. Both directions fit one screen on iPad landscape,
iPad portrait and Surface with no scrolling (measured), use the existing theme tokens, and show the child's own
character. Images: `/mnt/project-files/screens/student-home-v3/`; mock in `docs/prototypes/student-home/`.

- **A. Up next first.** One big "Up next" card (subject, topic, part 2 of 4, one Keep going button, about 8 minutes)
  with the child's character; three daily tiles (Today's cards, Brain teaser, Journey map); "My subjects" list with a
  progress ring per subject, current topic name and "Topic 3 of 12". Stars, coins, streak and a "Me" menu (growth,
  stickers, log out) in the header. Clearest for a 6 year old: one obvious thing to press.
- **B. Subject worlds.** Each subject is a planet on a dotted path with a progress ring; "You are here" on the
  current one; a dock at the bottom with Up next + Go, Today's cards and Brain teaser. More playful, less text.

Recommendation: A. It answers "what do I do now?" in one tap and reads well in every theme.

The fixes above still apply to the subject map. All of this is layout and CSS in `apps/web/src/pages/StudentHome.tsx`, `SubjectPath.tsx` and `index.css`, and can
ship as one small PR before the admin work.

## 8. Open questions for Uzair

1. Teachers: will real teachers (outside the family) use this soon, or is this mainly for you plus a helper? It
   decides whether teacher sign-in uses Cloudflare Access (email, simplest) or its own passwords.
2. Drip rule: do you want it at all, or only Mastery path and All open?
3. Grand exams: open to the child on a date you choose, or only when you press Publish?
4. Journey map: OK to turn the 12 weekly checkpoints into "every 3 topics passed"?
