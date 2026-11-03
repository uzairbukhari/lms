import { SHOP_ITEMS, STICKERS, shopItem, weekStreak, type ShopSlot, type StickerId } from "@lms/schema";
import { pointTotals, weekTimeline } from "./map";

/** The classes' level for the brain teaser: 1 (younger) or 2. Uses birth year when known, otherwise the number in the class name. */
export async function teaserLevel(db: D1Database, userId: string): Promise<1 | 2> {
  const u = await db.prepare("SELECT birth_year AS year FROM users WHERE id = ?").bind(userId).first<{ year: number | null }>();
  if (u?.year) return new Date().getUTCFullYear() - u.year <= 8 ? 1 : 2;
  const { results } = await db.prepare("SELECT c.name FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ?").bind(userId).all<{ name: string }>();
  const digits = results.map((r) => Number(/\d+/.exec(r.name)?.[0])).filter((n) => Number.isFinite(n));
  return digits.length && Math.min(...digits) <= 3 ? 1 : 2;
}

async function count(db: D1Database, sql: string, ...binds: unknown[]): Promise<number> {
  return (await db.prepare(sql).bind(...binds).first<{ n: number }>())?.n ?? 0;
}

export async function spentPoints(db: D1Database, userId: string): Promise<number> {
  return count(db, "SELECT COALESCE(SUM(cost), 0) AS n FROM shop_purchases WHERE user_id = ?", userId);
}

/** Works out the streak and points, awards any new stickers, and returns everything the rewards screens need. */
export async function rewardsFor(db: D1Database, userId: string, today: string) {
  const [timeline, points, spent] = await Promise.all([weekTimeline(db, userId, today), pointTotals(db, userId, today), spentPoints(db, userId)]);
  const streak = weekStreak(timeline.weeks);

  const [lessonsDone, hundreds, passed, teasers, purchases] = await Promise.all([
    count(db, "SELECT COUNT(*) AS n FROM lesson_progress WHERE user_id = ? AND status = 'completed'", userId),
    count(db, "SELECT COUNT(*) AS n FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND percent >= 100", userId),
    count(db, "SELECT COUNT(DISTINCT lesson_id) AS n FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND passed = 1 AND lesson_id IS NOT NULL", userId),
    count(db, "SELECT COUNT(*) AS n FROM teaser_plays WHERE user_id = ? AND correct = 1", userId),
    count(db, "SELECT COUNT(*) AS n FROM shop_purchases WHERE user_id = ?", userId),
  ]);
  const eligible: Record<StickerId, boolean> = {
    "first-lesson": lessonsDone >= 1,
    "first-100": hundreds >= 1,
    "quizzes-10": passed >= 10,
    "full-week": timeline.weeks.some((w) => w.done && w.lessons >= 5),
    "streak-3": streak.best >= 3,
    "streak-6": streak.best >= 6,
    "map-semester": [...timeline.reachedBySemester.values()].some((n) => n >= 12),
    "points-100": points.total >= 100,
    "teaser-5": teasers >= 5,
    shopper: purchases >= 1,
  };

  const have = new Map((await db.prepare("SELECT sticker_id AS id, earned_at AS at FROM sticker_awards WHERE user_id = ?").bind(userId).all<{ id: string; at: string }>()).results.map((r) => [r.id, r.at]));
  const fresh = STICKERS.filter((s) => eligible[s.id] && !have.has(s.id)).map((s) => s.id);
  if (fresh.length) await db.batch(fresh.map((id) => db.prepare("INSERT OR IGNORE INTO sticker_awards (user_id, sticker_id) VALUES (?, ?)").bind(userId, id)));

  const owned = new Set((await db.prepare("SELECT item_id AS id FROM shop_purchases WHERE user_id = ?").bind(userId).all<{ id: string }>()).results.map((r) => r.id));
  const equipped: Partial<Record<ShopSlot, string>> = Object.fromEntries((await db.prepare("SELECT slot, item_id AS id FROM shop_equipped WHERE user_id = ?").bind(userId).all<{ slot: ShopSlot; id: string }>()).results.map((r) => [r.slot, r.id]));
  const balance = Math.max(0, points.total - spent);
  return {
    streak,
    points: { earned: points.total, spent, balance },
    stickers: STICKERS.map((s) => ({ ...s, earned: have.has(s.id) || fresh.includes(s.id), isNew: fresh.includes(s.id) })),
    shop: SHOP_ITEMS.map((i) => ({ ...i, owned: owned.has(i.id), equipped: equipped[i.slot] === i.id, affordable: balance >= i.cost })),
    equipped,
  };
}

export type BuyResult = { ok: true } | { ok: false; code: "unknown_item" | "already_owned" | "not_enough_points"; message: string };

export async function buyItem(db: D1Database, userId: string, itemId: string, today: string): Promise<BuyResult> {
  const item = shopItem(itemId);
  if (!item) return { ok: false, code: "unknown_item", message: "That item is not in the shop." };
  const owned = await count(db, "SELECT COUNT(*) AS n FROM shop_purchases WHERE user_id = ? AND item_id = ?", userId, itemId);
  if (owned) return { ok: false, code: "already_owned", message: "You already have this one." };
  const balance = (await pointTotals(db, userId, today)).total - (await spentPoints(db, userId));
  if (balance < item.cost) return { ok: false, code: "not_enough_points", message: `You need ${item.cost - balance} more points for this one.` };
  await db.prepare("INSERT INTO shop_purchases (user_id, item_id, cost) VALUES (?, ?, ?)").bind(userId, itemId, item.cost).run();
  return { ok: true };
}
