import { describe, expect, it } from "vitest";
import { burstPieces } from "./RewardBurst";
import { layout, serpentine } from "../../pages/SubjectPath";

describe("burstPieces", () => {
  it("spreads the requested number of pieces", () => {
    const p = burstPieces(14, 100);
    expect(p).toHaveLength(14);
    expect(p.every((x) => Math.hypot(x.dx, x.dy) <= 101)).toBe(true);
  });
});

describe("trail layout", () => {
  it("gives 13 points for 12 topics and the grand quiz, all inside the map", () => {
    const pts = layout(12);
    expect(pts).toHaveLength(13);
    expect(pts.every(([x, y]) => x >= 5 && x <= 95 && y >= 5 && y <= 90)).toBe(true);
    expect(new Set(pts.map((p) => p.join(","))).size).toBe(13);
  });
  it("snakes: the second row runs right to left", () => {
    const pts = serpentine(13);
    expect(pts[5]![0]).toBeGreaterThan(pts[8]![0]);
  });
  it("keeps the hand-tuned curve for fewer topics", () => {
    expect(layout(8)).toHaveLength(9);
  });
});
