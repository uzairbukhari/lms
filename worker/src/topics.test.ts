import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile } from "@lms/schema";

// Every topic lesson (format 3.0) under content/topics must pass the importer's validation.
const dir = join(process.cwd(), "../content/topics");
const files = readdirSync(dir).filter((f: string) => f.endsWith(".json"));

describe("content/topics", () => {
  it("has the pilot topic lesson", () => expect(files).toContain("maths-class-1-place-value.json"));
  for (const f of files) {
    it(`${f} is valid and complete`, () => {
      const result = parseLessonFile(JSON.parse(readFileSync(join(dir, f), "utf8")));
      if (!result.ok) throw new Error(JSON.stringify(result.issues, null, 1));
      const file = result.lesson;
      expect(file.schema_version).toBe("3.0");
      expect(file.sub_lessons?.map((s) => s.kind).sort()).toEqual(["learn", "play", "try", "use"]);
      const mains = file.quiz.questions.filter((q) => !q.variant_of);
      expect(mains).toHaveLength(15);
      expect(mains.filter((q) => q.depth === "reason").length).toBeGreaterThanOrEqual(4);
      // every main question has at least two retake variants of the same type
      for (const m of mains) {
        const vs = file.quiz.questions.filter((q) => q.variant_of === m.ref);
        expect(vs.length, m.ref).toBeGreaterThanOrEqual(2);
        for (const v of vs) expect(v.type).toBe(m.type);
      }
      expect(file.lesson.curriculum?.topic).toBeGreaterThan(0);
      expect(file.lesson.standards?.length).toBeGreaterThan(0);
    });
  }
});
