import { pointTotals } from "./map";

/** Tables that hold a child's learning record. Rewards (points, stickers, shop items) and sign-in history stay with the child. */
const RECORD_TABLES = ["lesson_progress", "quiz_attempts", "game_plays", "sub_lesson_progress", "self_ratings"] as const;

/**
 * Gives every student of a class a fresh start: each child's record moves onto a hidden "record" row tied to the class,
 * the child leaves the class, and the points they had earned are carried over so their rewards balance is unchanged.
 */
export async function archiveClassStudents(db: D1Database, classId: string, today: string): Promise<number> {
  const members = (
    await db
      .prepare("SELECT u.id, u.display_name, u.avatar, u.theme FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? AND u.role = 'student' AND u.is_test = 0")
      .bind(classId)
      .all<{ id: string; display_name: string; avatar: string | null; theme: string }>()
  ).results;
  for (const m of members) {
    const recordId = crypto.randomUUID();
    const earned = (await pointTotals(db, m.id, today)).total;
    const cards = (await db.prepare("SELECT COALESCE(SUM(points), 0) AS n FROM card_days WHERE user_id = ?").bind(m.id).first<{ n: number }>())?.n ?? 0;
    await db.batch([
      db.prepare("INSERT INTO users (id, role, username, display_name, avatar, theme, is_active, archive_of, archive_class_id, archived_at) VALUES (?, 'student', ?, ?, ?, ?, 0, ?, ?, datetime('now'))")
        .bind(recordId, `rec-${recordId.slice(0, 8)}`, m.display_name, m.avatar, m.theme, m.id, classId),
      ...RECORD_TABLES.map((t) => db.prepare(`UPDATE ${t} SET user_id = ? WHERE user_id = ?`).bind(recordId, m.id)),
      db.prepare("UPDATE users SET carried_points = ? WHERE id = ?").bind(Math.max(0, earned - cards), m.id),
      db.prepare("INSERT INTO class_archive_members (class_id, user_id, record_user_id, display_name) VALUES (?, ?, ?, ?)").bind(classId, m.id, recordId, m.display_name),
      db.prepare("DELETE FROM class_members WHERE class_id = ? AND user_id = ?").bind(classId, m.id),
      db.prepare("UPDATE users SET class_id = NULL WHERE id = ? AND class_id = ?").bind(m.id, classId),
    ]);
  }
  // Test students just leave the class.
  await db.prepare("DELETE FROM class_members WHERE class_id = ?").bind(classId).run();
  return members.length;
}

/** Every row of a student (or of a hidden record) removed for good. A real student's records go with them. */
export async function deleteStudentEverything(db: D1Database, id: string): Promise<void> {
  const records = (await db.prepare("SELECT id FROM users WHERE archive_of = ?").bind(id).all<{ id: string }>()).results.map((r) => r.id);
  for (const uid of [id, ...records]) {
    await db.batch([
      db.prepare("DELETE FROM attempt_answers WHERE attempt_id IN (SELECT id FROM quiz_attempts WHERE user_id = ?)").bind(uid),
      ...["quiz_attempts", "lesson_progress", "ai_events", "login_events", "game_plays", "sub_lesson_progress", "self_ratings", "card_reviews", "word_book", "card_days", "stuck_flags", "deck_assignments", "sticker_awards", "shop_purchases", "shop_equipped", "teaser_plays", "lesson_unlocks", "course_assignments", "class_members"].map((t) => db.prepare(`DELETE FROM ${t} WHERE user_id = ?`).bind(uid)),
      db.prepare("DELETE FROM class_archive_members WHERE user_id = ? OR record_user_id = ?").bind(uid, uid),
      db.prepare("DELETE FROM users WHERE id = ? AND role = 'student'").bind(uid),
    ]);
  }
}
