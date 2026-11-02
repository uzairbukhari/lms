import { readdirSync, readFileSync } from "node:fs";
import { Miniflare } from "miniflare";
import type { Bindings } from "../src/env";

// Plain string paths: Workers and Node both define a global URL type, so avoid passing URL objects to node:fs.
const MIGRATIONS_DIR = new URL("../../migrations/", import.meta.url).pathname;

/** A real (local, in-memory) Cloudflare D1 database with all migrations applied, for tests. */
export async function createTestDb(): Promise<{ db: D1Database; kv: KVNamespace; bucket: R2Bucket; dispose: () => Promise<void> }> {
  const mf = new Miniflare({
    modules: true,
    script: "export default { fetch() { return new Response('ok') } }",
    d1Databases: { DB: crypto.randomUUID() },
    kvNamespaces: ["SESSIONS"],
    r2Buckets: ["ASSETS_BUCKET"],
  });
  const db = (await mf.getD1Database("DB")) as unknown as D1Database;
  const kv = (await mf.getKVNamespace("SESSIONS")) as unknown as KVNamespace;
  const bucket = (await mf.getR2Bucket("ASSETS_BUCKET")) as unknown as R2Bucket;
  const files = readdirSync(MIGRATIONS_DIR).filter((f: string) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = readFileSync(`${MIGRATIONS_DIR}${file}`, "utf8");
    // D1's exec() runs one statement per line, so run each statement separately.
    for (const stmt of splitStatements(sql)) await db.prepare(stmt).run();
  }
  return { db, kv, bucket, dispose: () => mf.dispose() };
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

/** A Worker `env` for calling `app.request(path, init, env)` in tests. */
export async function createTestEnv(vars: Partial<Bindings> = {}) {
  const { db, kv, bucket, dispose } = await createTestDb();
  const env = {
    DB: db,
    SESSIONS: kv,
    ASSETS_BUCKET: bucket,
    ENVIRONMENT: "development",
    DEV_ADMIN_EMAIL: "parent@example.com",
    ADMIN_EMAIL: "parent@example.com",
    ...vars,
  } as unknown as Bindings;
  return { env, dispose };
}
