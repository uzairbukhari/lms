import { describe, expect, it } from "vitest";
import { growthStage, SHOP_ITEMS, STICKERS, teaserFor, weekStreak } from "./rewards";

const w = (done: boolean, current = false) => ({ done, current });

describe("weekStreak", () => {
  it("counts the run of finished weeks ending now", () => {
    expect(weekStreak([w(true), w(true), w(true)])).toEqual({ current: 3, best: 3 });
    expect(weekStreak([w(true), w(true), w(false), w(true)])).toEqual({ current: 1, best: 2 });
  });
  it("does not break the streak for a current week still in progress", () => {
    expect(weekStreak([w(true), w(true), w(false, true)])).toEqual({ current: 2, best: 2 });
    expect(weekStreak([w(true), w(true), w(true, true)])).toEqual({ current: 3, best: 3 });
  });
  it("is zero after a missed week", () => {
    expect(weekStreak([w(true), w(false), w(false, true)])).toEqual({ current: 0, best: 1 });
    expect(weekStreak([])).toEqual({ current: 0, best: 0 });
  });
});

describe("catalogues", () => {
  it("has unique ids and affordable prices", () => {
    expect(new Set(SHOP_ITEMS.map((i) => i.id)).size).toBe(SHOP_ITEMS.length);
    expect(new Set(STICKERS.map((s) => s.id)).size).toBe(STICKERS.length);
    expect(Math.min(...SHOP_ITEMS.map((i) => i.cost))).toBeLessThanOrEqual(15);
  });
  it("grows a plant with lessons finished", () => {
    expect(growthStage(0).emoji).toBe("🌰");
    expect(growthStage(4).emoji).toBe("🌿");
    expect(growthStage(40).emoji).toBe("🍎");
  });
});

describe("teaserFor", () => {
  it("is the same all day and always has the answer among the options", () => {
    for (let d = 0; d < 40; d++) {
      const day = new Date(Date.UTC(2026, 10, 2 + d)).toISOString().slice(0, 10);
      for (const level of [1, 2] as const) {
        const t = teaserFor(day, level);
        expect(t).toEqual(teaserFor(day, level));
        expect(t.options).toContain(t.answer);
        expect(new Set(t.options).size).toBe(t.options.length);
        expect(t.options.length).toBeGreaterThanOrEqual(4);
      }
    }
  });
  it("rotates through four kinds", () => {
    const kinds = new Set([2, 3, 4, 5].map((d) => teaserFor(`2026-11-0${d}`, 1).kind));
    expect(kinds.size).toBe(4);
  });
});
