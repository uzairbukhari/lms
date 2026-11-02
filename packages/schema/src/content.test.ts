import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile } from "./lesson";

// Every lesson file committed under content/lessons must pass the same validation the admin importer uses.
const dir = join(__dirname, "../../../content/lessons");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

describe("content/lessons", () => {
  it("has the 8 week-1 diagnostic lessons", () => {
    expect(files.filter((f) => f.startsWith("diag-"))).toHaveLength(8);
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
