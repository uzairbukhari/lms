import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile } from "@lms/schema";

// Every topic lesson (format 3.0) under content/topics must pass the importer's validation.
const dir = join(process.cwd(), "../content/topics");
const files = readdirSync(dir).filter((f: string) => f.endsWith(".json"));
// Lessons not yet upgraded keep the old 15-question standard (scripts/legacy-15.json only ever shrinks).
// A lesson leaves the list when the file scripts/upgraded/<slug>.txt exists.
const upgradedDir = join(process.cwd(), "../scripts/upgraded");
const upgradedSlugs = readdirSync(upgradedDir).filter((f: string) => f.endsWith(".txt")).map((f: string) => f.replace(".txt", ""));
const legacy = new Set<string>((JSON.parse(readFileSync(join(process.cwd(), "../scripts/legacy-15.json"), "utf8")) as string[]).filter((s) => !upgradedSlugs.includes(s)));

describe("content/topics", () => {
  it("has the pilot topic lesson", () => expect(files).toContain("maths-class-1-place-value.json"));
  it("keeps the legacy list honest: every entry still exists", () => {
    for (const slug of legacy) expect(files, slug).toContain(slug + ".json");
    for (const slug of upgradedSlugs) expect(JSON.parse(readFileSync(join(process.cwd(), "../scripts/legacy-15.json"), "utf8")), slug).toContain(slug);
  });
  for (const f of files) {
    it(`${f} is valid and complete`, () => {
      const result = parseLessonFile(JSON.parse(readFileSync(join(dir, f), "utf8")));
      if (!result.ok) throw new Error(JSON.stringify(result.issues, null, 1));
      const file = result.lesson;
      expect(file.schema_version).toBe("3.0");
      expect(file.sub_lessons?.map((s) => s.kind).sort()).toEqual(["learn", "play", "try", "use"]);
      const mains = file.quiz.questions.filter((q) => !q.variant_of);
      const isLegacy = legacy.has(f.replace(".json", ""));
      expect(mains).toHaveLength(isLegacy ? 15 : 30);
      expect(mains.filter((q) => q.depth === "reason").length).toBeGreaterThanOrEqual(isLegacy ? 4 : 8);
      expect(file.quiz.questions.length).toBeLessThanOrEqual(80);
      // every main question has retake variants of the same type (at least 2 on the old standard, at least 1 on the new)
      for (const m of mains) {
        const vs = file.quiz.questions.filter((q) => q.variant_of === m.ref);
        expect(vs.length, m.ref).toBeGreaterThanOrEqual(isLegacy ? 2 : 1);
        for (const v of vs) expect(v.type).toBe(m.type);
      }
      expect(file.lesson.curriculum?.topic).toBeGreaterThan(0);
      // every part has a written teaching script (say) on most of its teaching blocks, not just the on-screen words
      for (const sub of file.sub_lessons ?? []) {
        const said = sub.blocks.filter((b) => (b as { say?: string }).say).length + sub.blocks.flatMap((b) => (b.type === "explainer" ? b.scenes : [])).filter((sc) => sc.say).length;
        expect(said, sub.id).toBeGreaterThanOrEqual(5);
      }
      expect(file.lesson.standards?.length).toBeGreaterThan(0);
    });
  }
});
