import { describe, expect, it } from "vitest";
import { currentSlot, generateTerms, isMonday, isReleased } from "./terms";

const terms = generateTerms("2026-09-07"); // a Monday

describe("terms", () => {
  it("builds four back-to-back 13-week semesters", () => {
    expect(isMonday("2026-09-07")).toBe(true);
    expect(terms.map((t) => t.start_date)).toEqual(["2026-09-07", "2026-12-07", "2027-03-08", "2027-06-07"]);
    expect(terms[0]).toMatchObject({ end_date: "2026-12-06", teaching_weeks: 12, exam_week: 13 });
  });

  it("finds the current week, running Monday to Sunday", () => {
    expect(currentSlot(terms, "2026-09-07")).toEqual({ semester: 1, week: 1, exam: false });
    expect(currentSlot(terms, "2026-09-13")).toEqual({ semester: 1, week: 1, exam: false });
    expect(currentSlot(terms, "2026-09-14")).toEqual({ semester: 1, week: 2, exam: false });
    expect(currentSlot(terms, "2026-11-23")).toEqual({ semester: 1, week: 12, exam: false });
    expect(currentSlot(terms, "2026-11-30")).toEqual({ semester: 1, week: 13, exam: true });
    expect(currentSlot(terms, "2026-12-07")).toEqual({ semester: 2, week: 1, exam: false });
  });

  it("is null before the first semester and after the last", () => {
    expect(currentSlot(terms, "2026-08-01")).toBeNull();
    expect(currentSlot(terms, "2027-12-31")).toBeNull();
  });

  it("releases this week and earlier, never later weeks", () => {
    const today = "2026-09-21"; // week 3
    const now = currentSlot(terms, today);
    expect(isReleased({ semester: 1, week: 3 }, now, terms, today)).toBe(true);
    expect(isReleased({ semester: 1, week: 1 }, now, terms, today)).toBe(true);
    expect(isReleased({ semester: 1, week: 4 }, now, terms, today)).toBe(false);
    expect(isReleased({ semester: 2, week: 1 }, now, terms, today)).toBe(false);
  });

  it("with a holiday gap, ended semesters stay released and the next stays hidden", () => {
    const gapped = generateTerms("2026-09-07", { gapWeeks: 2 });
    const today = "2026-12-10"; // after semester 1 ended, before semester 2 starts
    expect(currentSlot(gapped, today)).toBeNull();
    expect(isReleased({ semester: 1, week: 12 }, null, gapped, today)).toBe(true);
    expect(isReleased({ semester: 2, week: 1 }, null, gapped, today)).toBe(false);
  });
});
