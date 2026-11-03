/** Small admin-editable settings stored in the app_settings table. */

export const AI_ALERT_KEY = "ai_alert_neurons";
/** Warn at 80% of the free daily allowance unless the admin picks another number. 0 turns the warning off. */
export const DEFAULT_AI_ALERT_NEURONS = 8000;

export async function getSetting(db: D1Database, key: string): Promise<string | null> {
  const row = await db.prepare("SELECT value FROM app_settings WHERE key = ?").bind(key).first<{ value: string }>();
  return row?.value ?? null;
}

export async function setSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db
    .prepare("INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
    .bind(key, value)
    .run();
}

export async function aiAlertThreshold(db: D1Database): Promise<number> {
  const raw = await getSetting(db, AI_ALERT_KEY);
  const n = raw === null ? NaN : Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_AI_ALERT_NEURONS;
}
