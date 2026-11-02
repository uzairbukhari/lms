import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile } from "@lms/schema";

// Every lesson file committed under content/lessons must pass the same validation the admin importer uses.
const dir = join(process.cwd(), "../content/lessons");
const files = readdirSync(dir).filter((f: string) => f.endsWith(".json"));

describe("content/lessons", () => {
  it("has the 8 week-1 diagnostic lessons", () => {
    expect(files.filter((f: string) => f.startsWith("diag-"))).toHaveLength(8);
  });
  for (const f of files) {
    it(`${f} is valid`, () => {
      const result = parseLessonFile(JSON.parse(readFileSync(join(dir, f), "utf8")));
      if (!result.ok) throw new Error(JSON.stringify(result.issues, null, 1));
      expect(result.lesson.lesson.curriculum).toMatchObject({ semester: 1, week: 1 });
      expect(result.lesson.quiz.questions.length).toBe(12);
    });
    it(`${f} has a glossary, an animated explainer and a brain game`, () => {
      const types = (JSON.parse(readFileSync(join(dir, f), "utf8")) as { blocks: { type: string }[] }).blocks.map((b) => b.type);
      for (const t of ["glossary", "explainer", "brain_game"]) expect(types).toContain(t);
    });
  }
});

describe("manipulative block", () => {
  it("is accepted by the lesson format, with limits", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const ok = lessonFixture();
    ok.blocks.push({ type: "manipulative", title: "Split it", emoji: "🪙", count: 10, zones: ["A", "B"] } as never);
    expect(parseLessonFile(ok).ok).toBe(true);
    const bad = lessonFixture();
    bad.blocks.push({ type: "manipulative", title: "Too many", emoji: "🪙", count: 99, zones: ["A"] } as never);
    expect(parseLessonFile(bad).ok).toBe(false);
  });
});

describe("explainer and brain game blocks", () => {
  it("accept good input and reject out-of-range input", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const ok = lessonFixture();
    ok.blocks.push(
      { type: "explainer", title: "Apples", scenes: [{ caption: "One", items: [{ emoji: "🍎", x: 20, y: 50 }] }, { caption: "Two", items: [{ id: "a", emoji: "🍎", x: 80, y: 50, anim: "bounce" }] }] } as never,
      { type: "brain_game", game: "memory_match", title: "Pairs", emojis: ["🐶", "🐱", "🐟"] } as never,
    );
    expect(parseLessonFile(ok).ok).toBe(true);
    const oneScene = lessonFixture();
    oneScene.blocks.push({ type: "explainer", title: "x", scenes: [{ caption: "One", items: [{ emoji: "🍎", x: 20, y: 50 }] }] } as never);
    expect(parseLessonFile(oneScene).ok).toBe(false);
    const offStage = lessonFixture();
    offStage.blocks.push({ type: "explainer", title: "x", scenes: [{ caption: "a", items: [{ emoji: "🍎", x: 120, y: 50 }] }, { caption: "b", items: [{ emoji: "🍎", x: 1, y: 50 }] }] } as never);
    expect(parseLessonFile(offStage).ok).toBe(false);
    const fewCards = lessonFixture();
    fewCards.blocks.push({ type: "brain_game", game: "memory_match", title: "x", emojis: ["🐶"] } as never);
    expect(parseLessonFile(fewCards).ok).toBe(false);
  });
});
