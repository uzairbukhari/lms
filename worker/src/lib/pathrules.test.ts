import { describe, expect, it } from "vitest";
import { dripCount, MASTERY, ruleStatuses } from "./pathrules";

const ids = ["a", "b", "c", "d"];
const drip = { rule: "drip" as const, dripStart: "2026-11-16", dripEveryDays: 7 };

describe("unlock rules", () => {
  it("mastery behaves like the original path", () => {
    expect(ruleStatuses(ids, new Set(["a"]), new Set(), MASTERY, "2026-11-20")).toEqual(["done", "current", "locked", "locked"]);
  });
  it("open leaves every lesson open", () => {
    expect(ruleStatuses(ids, new Set(["a"]), new Set(), { ...MASTERY, rule: "open" }, "2026-11-20")).toEqual(["done", "current", "early", "early"]);
  });
  it("drip opens one lesson on the start date and one more every N days", () => {
    expect(dripCount(drip, "2026-11-15")).toBe(0);
    expect(dripCount(drip, "2026-11-16")).toBe(1);
    expect(dripCount(drip, "2026-11-23")).toBe(2);
    expect(ruleStatuses(ids, new Set(), new Set(), drip, "2026-11-23")).toEqual(["current", "early", "locked", "locked"]);
    expect(ruleStatuses(ids, new Set(), new Set(), drip, "2026-11-10")).toEqual(["locked", "locked", "locked", "locked"]);
  });
  it("an early-open lesson stays open under drip, and a passed one is done", () => {
    expect(ruleStatuses(ids, new Set(["a"]), new Set(["d"]), drip, "2026-11-16")).toEqual(["done", "locked", "locked", "current"]);
  });
});
