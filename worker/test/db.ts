import { readdirSync, readFileSync } from "node:fs";
import { Miniflare } from "miniflare";

const MIGRATIONS_DIR = new URL("../../migrations/", import.meta.url);

/** A real (local, in-memory) Cloudflare D1 database with all migrations applied, for tests. */
export async function createTestDb(): Promise<{ db: D1Database; dispose: () => Promise<void> }> {
  const mf = new Miniflare({
    modules: true,
    script: "export default { fetch() { return new Response('ok') } }",
    d1Databases: { DB: crypto.randomUUID() },
  });
  const db = (await mf.getD1Database("DB")) as unknown as D1Database;
  const files = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = readFileSync(new URL(file, MIGRATIONS_DIR), "utf8");
    // D1's exec() runs one statement per line, so run each statement separately.
    for (const stmt of splitStatements(sql)) await db.prepare(stmt).run();
  }
  return { db, dispose: () => mf.dispose() };
}

/** Split a migration file into statements (our migrations have no semicolons inside strings, and no triggers). */
export function splitStatements(sql: string): string[] {
  return sql
    .split("\n")
    .map((line) => line.replace(/--.*$/, "")) // comments (no string in our migrations contains "--")
    .join("\n")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}
