import { pathStatuses, type PathStatus } from "./visibility";

export type CourseRule = { rule: "mastery" | "open" | "drip"; dripStart: string | null; dripEveryDays: number | null };
export const MASTERY: CourseRule = { rule: "mastery", dripStart: null, dripEveryDays: null };

const dayNumber = (iso: string) => Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);

/** How many lessons a drip course has opened by `today`: one on the start date, then one more every N days. */
export function dripCount(rule: CourseRule, today: string): number {
  if (rule.rule !== "drip" || !rule.dripStart || !rule.dripEveryDays) return Infinity;
  const days = dayNumber(today) - dayNumber(rule.dripStart);
  return days < 0 ? 0 : Math.floor(days / rule.dripEveryDays) + 1;
}

/** Status of each lesson in a course under its unlock rule. Mastery is the original path; Open opens everything; Drip opens them on a timetable. */
export function ruleStatuses(ids: string[], passed: Set<string>, opened: Set<string>, rule: CourseRule, today: string): PathStatus[] {
  if (rule.rule === "mastery") return pathStatuses(ids, passed, opened);
  const allowed = rule.rule === "open" ? Infinity : dripCount(rule, today);
  let currentSeen = false;
  return ids.map((id, i): PathStatus => {
    if (passed.has(id)) return "done";
    if (i >= allowed && !opened.has(id)) return "locked";
    if (!currentSeen) { currentSeen = true; return "current"; }
    return "early";
  });
}

/** The rule for each course in the given classes (courses with no row stay on the mastery path). */
export async function loadRules(db: D1Database, classIds: string[]): Promise<Map<string, CourseRule>> {
  const out = new Map<string, CourseRule>();
  if (!classIds.length) return out;
  const { results } = await db
    .prepare(`SELECT course_id AS c, unlock_rule AS rule, drip_start AS dripStart, drip_every_days AS dripEveryDays FROM class_courses WHERE class_id IN (${classIds.map(() => "?").join(",")})`)
    .bind(...classIds)
    .all<{ c: string; rule: CourseRule["rule"]; dripStart: string | null; dripEveryDays: number | null }>();
  for (const r of results) out.set(r.c, { rule: r.rule, dripStart: r.dripStart, dripEveryDays: r.dripEveryDays });
  return out;
}
