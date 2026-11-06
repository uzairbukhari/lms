import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile, type Block } from "@lms/schema";

// Every new or upgraded topic lesson must really use the content connectors: Oak National Academy (provenance), Unsplash (photos),
// Coteach (maths diagrams). Lessons still on the old standard (scripts/legacy-15.json) are exempt until they are upgraded.
// This runs without the binaries: it checks the records in content/media/manifest.json and content/sources/<slug>.json.

const root = join(process.cwd(), "..");
const topicsDir = join(root, "content/topics");
const read = (p: string) => JSON.parse(readFileSync(join(root, p), "utf8"));
const legacy = new Set<string>(read("scripts/legacy-15.json"));
// Maths lessons whose Coteach diagrams are waiting for the owner to download them from the Coteach preview (the tool cannot be
// run unattended) have a file content/media/coteach-requests/<slug>.md describing the diagrams. A lesson with such a file is exempt
// from the diagram minimum only. Delete the file when the diagrams are added; the folder must be empty to finish.
const coteachPending = new Set<string>(readdirSync(join(root, "content/media/coteach-requests")).filter((f: string) => f.endsWith(".md")).map((f: string) => f.replace(".md", "")));
// The media manifest is content/media/manifest.json plus one file per lesson in content/media/manifest.d/ (so parallel work never conflicts).
const manifestFiles: ManifestFile[] = [
  ...(read("content/media/manifest.json") as { files: ManifestFile[] }).files,
  ...readdirSync(join(root, "content/media/manifest.d")).filter((f: string) => f.endsWith(".json")).flatMap((f: string) => (read(`content/media/manifest.d/${f}`) as { files: ManifestFile[] }).files),
];
const manifest = { files: manifestFiles };
type ManifestFile = {
  file: string; lessons: string[]; source: "unsplash" | "coteach" | "generated"; source_id?: string; author?: string; author_url?: string;
  source_url?: string; license?: string; download_tracked_at?: string; sha256?: string; alt?: string; reviewed?: boolean;
};
const byFile = new Map(manifest.files.map((f) => [f.file, f]));

/** Minimum real media per subject for a lesson on the new standard. */
const MINIMUMS: Record<string, { unsplash: number; coteach: number }> = {
  maths: { unsplash: 1, coteach: 2 },
  science: { unsplash: 3, coteach: 0 },
  "general-knowledge": { unsplash: 3, coteach: 0 },
  english: { unsplash: 2, coteach: 0 },
  "data-ai": { unsplash: 2, coteach: 0 },
};

function allBlocks(file: { blocks: Block[]; sub_lessons?: { blocks: Block[] }[] }): Block[] {
  return [...file.blocks, ...(file.sub_lessons ?? []).flatMap((s) => s.blocks)];
}

const slugs = readdirSync(topicsDir).filter((f: string) => f.endsWith(".json")).map((f: string) => f.replace(".json", ""));
const upgraded = slugs.filter((s) => !legacy.has(s));

describe("media manifest", () => {
  it("has a complete record for every file", () => {
    for (const f of manifest.files) {
      expect(f.lessons.length, f.file).toBeGreaterThan(0);
      expect(f.sha256, f.file).toMatch(/^[0-9a-f]{64}$/);
      if (f.source === "unsplash") {
        for (const k of ["source_id", "author", "author_url", "source_url", "license", "download_tracked_at", "alt"] as const) expect(f[k], `${f.file} ${k}`).toBeTruthy();
        expect(f.reviewed, `${f.file} reviewed`).toBe(true);
      }
      if (f.source === "coteach") expect(f.alt, `${f.file} alt`).toBeTruthy();
    }
  });
  it("never lists a lesson that does not exist", () => {
    for (const f of manifest.files) for (const s of f.lessons) expect(slugs, `${f.file} -> ${s}`).toContain(s);
  });
});

describe("every topic lesson", () => {
  for (const slug of slugs) {
    it(`${slug}: no hotlinked pictures and no Oak branding in child text`, () => {
      const text = readFileSync(join(topicsDir, `${slug}.json`), "utf8");
      expect(text).not.toMatch(/images\.unsplash\.com|source\.unsplash\.com/);
      expect(text).not.toMatch(/Oak National Academy|Oak Academy|thenational\.academy/i);
    });
    it(`${slug}: every asset it uses is in the manifest, with a credit where needed`, () => {
      const parsed = parseLessonFile(read(`content/topics/${slug}.json`));
      if (!parsed.ok) throw new Error("invalid lesson");
      for (const b of allBlocks(parsed.lesson as never)) {
        const names = b.type === "image" && b.asset ? [b.asset] : b.type === "clip" ? [b.asset, b.poster] : [];
        for (const name of names) {
          const m = byFile.get(name);
          expect(m, `${slug}: ${name} is not in content/media/manifest.json`).toBeTruthy();
          expect(m!.lessons, `${slug}: ${name} does not list this lesson`).toContain(slug);
          if (m!.source === "unsplash") expect(b.type === "image" && b.credit, `${slug}: ${name} needs a credit`).toMatch(/Unsplash/);
          if (m!.source === "unsplash" && b.type === "image") expect(b.credit, `${slug}: credit must name the photographer`).toContain(m!.author!);
        }
      }
    });
  }
});

describe("upgraded and new topic lessons use the connectors", () => {
  it("only lists maths lessons that exist as pending Coteach diagrams", () => {
    for (const slug of coteachPending) { expect(upgraded, slug).toContain(slug); expect(slug.startsWith("maths-"), slug).toBe(true); }
  });
  it("is empty only while every lesson is still on the old standard", () => {
    expect(upgraded.length + legacy.size).toBe(slugs.length);
  });
  for (const slug of upgraded) {
    const parsed = parseLessonFile(read(`content/topics/${slug}.json`));
    it(`${slug}: Oak provenance, photos, diagrams and a clip`, () => {
      if (!parsed.ok) throw new Error("invalid lesson");
      const file = parsed.lesson;
      const blocks = allBlocks(file as never);
      // Oak National Academy: provenance recorded and mapped to real questions.
      const srcPath = join(root, `content/sources/${slug}.json`);
      expect(existsSync(srcPath), `${slug}: missing content/sources/${slug}.json`).toBe(true);
      const src = read(`content/sources/${slug}.json`) as { units?: unknown[]; lessons?: unknown[]; no_oak_unit?: string; misconceptions?: { text: string; question_refs: string[] }[]; retrieved_at?: string };
      expect(src.retrieved_at).toBeTruthy();
      if (file.lesson.subject === "data-ai" && src.no_oak_unit) expect(src.no_oak_unit.length).toBeGreaterThan(10);
      else { expect(src.units?.length, `${slug}: no Oak units recorded`).toBeGreaterThan(0); expect(src.lessons?.length, `${slug}: no Oak lessons recorded`).toBeGreaterThan(0); }
      const refs = new Set(file.quiz.questions.map((q) => q.ref));
      for (const mis of src.misconceptions ?? []) for (const r of mis.question_refs) expect(refs.has(r), `${slug}: misconception points at missing question ${r}`).toBe(true);
      // Unsplash and Coteach: enough real pictures for the subject.
      const need = MINIMUMS[file.lesson.subject] ?? { unsplash: 1, coteach: 0 };
      const used = blocks.flatMap((b) => (b.type === "image" && b.asset ? [byFile.get(b.asset)] : []));
      expect(used.filter((m) => m?.source === "unsplash").length, `${slug}: needs ${need.unsplash}+ Unsplash photos`).toBeGreaterThanOrEqual(need.unsplash);
      if (!coteachPending.has(slug)) expect(used.filter((m) => m?.source === "coteach").length, `${slug}: needs ${need.coteach}+ Coteach diagrams`).toBeGreaterThanOrEqual(need.coteach);
      // A narrated clip with a transcript.
      const clip = blocks.find((b) => b.type === "clip");
      expect(clip, `${slug}: no clip`).toBeTruthy();
    });
  }
});
