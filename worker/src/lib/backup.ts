import type { Bindings } from "../env";

// Weekly backup of the whole database to the private R2 bucket (docs/PLAN.md section 6).
// The file contains password hashes and children's names: it lives only in the private bucket and is never served by the API.

const TABLES = [
  "users", "subjects", "classes", "class_members", "courses", "course_lessons", "terms", "course_assignments", "lesson_unlocks",
  "lessons", "quizzes", "questions", "assets", "lesson_progress", "quiz_attempts", "attempt_answers", "ai_events",
] as const;

export const KEEP_BACKUPS = 8;

export async function exportDatabase(db: D1Database): Promise<Record<string, unknown[]>> {
  const out: Record<string, unknown[]> = {};
  for (const t of TABLES) out[t] = (await db.prepare(`SELECT * FROM ${t}`).all()).results;
  return out;
}

export async function runBackup(env: Pick<Bindings, "DB" | "ASSETS_BUCKET">, now = new Date()): Promise<{ key: string; rows: number }> {
  const tables = await exportDatabase(env.DB);
  const key = `backups/${now.toISOString().slice(0, 10)}.json`;
  await env.ASSETS_BUCKET.put(key, JSON.stringify({ exportedAt: now.toISOString(), tables }), { httpMetadata: { contentType: "application/json" } });
  // Keep the newest few backups only.
  const listed = await env.ASSETS_BUCKET.list({ prefix: "backups/" });
  const old = listed.objects.map((o) => o.key).sort().reverse().slice(KEEP_BACKUPS);
  if (old.length) await env.ASSETS_BUCKET.delete(old);
  return { key, rows: Object.values(tables).reduce((n, r) => n + r.length, 0) };
}

export async function listBackups(env: Pick<Bindings, "ASSETS_BUCKET">) {
  const listed = await env.ASSETS_BUCKET.list({ prefix: "backups/" });
  return listed.objects.map((o) => ({ key: o.key, sizeBytes: o.size, uploaded: o.uploaded.toISOString() })).sort((a, b) => b.key.localeCompare(a.key));
}
