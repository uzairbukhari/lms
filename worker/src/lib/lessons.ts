import type { LessonFile } from "@lms/schema";
import { withVideos, type ApprovedVideo } from "./videos";

export type ImportResult = {
  lessonId: string;
  slug: string;
  version: number;
  created: boolean;
  status: "draft" | "published" | "archived";
  courseId: string | null;
};

function humanise(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0]?.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** The ids a question stores in options_json: everything the child needs to see, never the answer. */
function publicOptions(q: LessonFile["quiz"]["questions"][number]): unknown {
  switch (q.type) {
    case "multiple_choice":
    case "multi_select":
      return { options: q.options };
    case "order":
      return { items: q.items };
    case "match":
      return { left: q.left, right: q.right };
    case "fill_blank":
      return { text: q.text, blanks: q.blanks };
    case "hotspot":
      return { scene: q.scene };
    case "slider":
      return { range: q.range };
    default:
      return null;
  }
}

/**
 * Save a validated lesson file. A new slug creates a lesson; an existing slug creates a NEW VERSION
 * (new quiz and questions) so earlier attempts keep pointing at the exact questions the child saw.
 * Everything is written in one batch, so a failure leaves nothing half-saved.
 */
export async function importLesson(db: D1Database, incoming: LessonFile, opts: { publish?: boolean } = {}): Promise<ImportResult> {
  const existing = await db
    .prepare("SELECT id, current_version, status FROM lessons WHERE slug = ?")
    .bind(incoming.lesson.slug)
    .first<{ id: string; current_version: number; status: ImportResult["status"] }>();

  // Videos the parent already approved for this lesson come back automatically when the lesson is re-imported.
  const approved = existing
    ? (await db.prepare("SELECT youtube, title, start_sec, end_sec, caption, after_key FROM approved_videos WHERE lesson_id = ? ORDER BY created_at").bind(existing.id).all<ApprovedVideo>()).results
    : [];
  const file: LessonFile = approved.length ? { ...incoming, blocks: withVideos(incoming.blocks as never, approved) as LessonFile["blocks"] } : incoming;
  const { lesson, blocks, quiz } = file;

  const lessonId = existing?.id ?? crypto.randomUUID();
  const version = existing ? existing.current_version + 1 : 1;
  const status: ImportResult["status"] = opts.publish ? "published" : (existing?.status ?? "draft");
  const quizId = crypto.randomUUID();
  const statements: D1PreparedStatement[] = [];

  if (existing) {
    statements.push(
      db
        .prepare(
          `UPDATE lessons SET subject_id = ?, title = ?, summary = ?, age_band = ?, difficulty = ?, estimated_minutes = ?,
                  unit = ?, status = ?, current_version = ?, content_json = ?, source_json = ?, updated_at = datetime('now')
            WHERE id = ?`,
        )
        .bind(
          lesson.subject, lesson.title, lesson.summary, lesson.age_band, lesson.difficulty, lesson.estimated_minutes,
          lesson.unit ?? null, status, version, JSON.stringify(blocks), JSON.stringify(file), lessonId,
        ),
      db.prepare("UPDATE quizzes SET is_current = 0 WHERE lesson_id = ?").bind(lessonId),
    );
  } else {
    statements.push(
      db
        .prepare(
          `INSERT INTO lessons (id, slug, subject_id, title, summary, age_band, difficulty, estimated_minutes, unit,
                                sort_order, status, current_version, content_json, source_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM lessons), ?, ?, ?, ?)`,
        )
        .bind(
          lessonId, lesson.slug, lesson.subject, lesson.title, lesson.summary, lesson.age_band, lesson.difficulty,
          lesson.estimated_minutes, lesson.unit ?? null, status, version, JSON.stringify(blocks), JSON.stringify(file),
        ),
    );
  }

  statements.push(
    db
      .prepare(
        `INSERT INTO quizzes (id, kind, lesson_id, version, is_current, pass_percent, shuffle_questions, shuffle_options, max_attempts)
         VALUES (?, 'lesson', ?, ?, 1, ?, ?, ?, ?)`,
      )
      .bind(quizId, lessonId, version, quiz.pass_percent, quiz.shuffle_questions ? 1 : 0, quiz.shuffle_options ? 1 : 0, quiz.max_attempts ?? null),
  );

  quiz.questions.forEach((q, i) => {
    // A variant inherits the sub-lesson and depth of the question it stands in for.
    const main = q.variant_of ? quiz.questions.find((x) => x.ref === q.variant_of) : undefined;
    statements.push(
      db
        .prepare(
          `INSERT INTO questions (id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json,
                                  hint, explanation, points, skill_tag, sub_lesson, depth, variant_of)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          crypto.randomUUID(), quizId, q.ref, i + 1, q.type, q.prompt,
          q.emoji ? JSON.stringify({ emoji: q.emoji }) : null,
          JSON.stringify(publicOptions(q)),
          JSON.stringify(q.answer),
          q.hint ?? null, q.explanation ?? null, q.points, q.skill_tag ?? null, (q.sub_lesson ?? main?.sub_lesson) ?? null, (q.depth ?? main?.depth) ?? null, q.variant_of ?? null,
        ),
    );
  });

  let courseId: string | null = null;
  if (lesson.curriculum) {
    const c = lesson.curriculum;
    const course = await db.prepare("SELECT id FROM courses WHERE slug = ?").bind(c.course).first<{ id: string }>();
    courseId = course?.id ?? crypto.randomUUID();
    if (!course) {
      statements.push(
        db
          .prepare("INSERT INTO courses (id, slug, title, subject_id, age_band, status) VALUES (?, ?, ?, ?, ?, 'published')")
          .bind(courseId, c.course, humanise(c.course), lesson.subject, lesson.age_band),
      );
    }
    statements.push(
      db
        .prepare(
          `INSERT INTO course_lessons (course_id, lesson_id, position, semester, week) VALUES (?, ?, ?, ?, ?)
           ON CONFLICT (course_id, lesson_id) DO UPDATE SET semester = excluded.semester, week = excluded.week, position = excluded.position`,
        )
        .bind(courseId, lessonId, c.semester * 100 + (c.week ?? c.topic ?? 0), c.semester, c.week ?? null),
    );
  }

  await db.batch(statements);
  return { lessonId, slug: lesson.slug, version, created: !existing, status, courseId };
}

/** Image assets named in a lesson that have not been uploaded yet (a warning, not an error). */
export async function missingAssets(db: D1Database, file: LessonFile): Promise<string[]> {
  const names = [...new Set(file.blocks.flatMap((b) => (b.type === "image" && b.asset ? [b.asset] : [])))];
  const missing: string[] = [];
  for (const name of names) {
    const row = await db.prepare("SELECT 1 FROM assets WHERE filename = ?").bind(name).first();
    if (!row) missing.push(name);
  }
  return missing;
}
