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
