import type { Actor, Access } from "./permissions";

/** A teacher is an admin row with admin_level 'teacher', matched by the email on their Cloudflare Access login. */
export async function loadTeacher(db: D1Database, email: string): Promise<Actor | null> {
  const row = await db
    .prepare("SELECT id FROM users WHERE role = 'admin' AND admin_level = 'teacher' AND is_active = 1 AND lower(admin_email) = ?")
    .bind(email.toLowerCase())
    .first<{ id: string }>();
  if (!row) return null;
  const { results } = await db.prepare("SELECT class_id, access FROM class_staff WHERE user_id = ?").bind(row.id).all<{ class_id: string; access: Access }>();
  return { id: row.id, level: "teacher", classes: Object.fromEntries(results.map((r) => [r.class_id, r.access])) };
}
