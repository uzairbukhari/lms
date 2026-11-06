import { describe, expect, it } from "vitest";
import { resumeRound, roundEnd, roundOf, roundSizeFor, roundsFor, roundStart } from "./rounds";

describe("roundSizeFor", () => {
  it("keeps short quizzes as one round", () => {
    expect(roundSizeFor("7-8", 15)).toBe(15);
    expect(roundSizeFor("9-10", 15)).toBe(15);
    expect(roundSizeFor(null, 23)).toBe(23);
    expect(roundSizeFor(null, 0)).toBe(1);
  });
  it("uses 6 for the younger band", () => {
    expect(roundSizeFor("7-8", 30)).toBe(6);
    expect(roundSizeFor("7-8", 36)).toBe(6);
  });
  it("uses 10 (or 9 for 36) for the older band", () => {
    expect(roundSizeFor("9-10", 30)).toBe(10);
    expect(roundSizeFor("9-10", 36)).toBe(9);
  });
  it("falls back to 6 when the band is unknown", () => {
    expect(roundsFor(null, 30)).toEqual({ size: 6, count: 5 });
    expect(roundsFor(undefined, 36)).toEqual({ size: 6, count: 6 });
    expect(roundsFor("9-10", 36)).toEqual({ size: 9, count: 4 });
    expect(roundsFor("9-10", 30)).toEqual({ size: 10, count: 3 });
    expect(roundsFor(null, 15)).toEqual({ size: 15, count: 1 });
  });
});

describe("round ranges", () => {
  it("maps indexes to rounds", () => {
    expect(roundOf(0, 6)).toBe(0);
    expect(roundOf(5, 6)).toBe(0);
    expect(roundOf(6, 6)).toBe(1);
    expect(roundStart(2, 6)).toBe(12);
    expect(roundEnd(4, 6, 30)).toBe(29);
    expect(roundEnd(0, 6, 30)).toBe(5);
  });
  it("resumes in the first round with an unanswered question", () => {
    const a = Array.from({ length: 30 }, (_, i) => i < 13);
    expect(resumeRound(a, 6)).toBe(2);
    expect(resumeRound(Array(30).fill(false), 6)).toBe(0);
    expect(resumeRound(Array(30).fill(true), 6)).toBe(4);
  });
});
