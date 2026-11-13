import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { resetAccessKeyCache } from "../lib/access";
import { createTestEnv } from "../../test/db";

const TEAM = "family.cloudflareaccess.com";
const AUD = "aud-1";
const TOKEN_ID = "abc123.access";

let env: Bindings;
let dispose: () => Promise<void>;
let pair: CryptoKeyPair;
let jwk: JsonWebKey;

const b64url = (input: ArrayBuffer | string) => {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
async function token(payload: object) {
  const input = `${b64url(JSON.stringify({ alg: "RS256", kid: "k1" }))}.${b64url(JSON.stringify(payload))}`;
  return `${input}.${b64url(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(input)))}`;
}
const claims = (extra: object) => ({ aud: [AUD], iss: `https://${TEAM}`, exp: Math.floor(Date.now() / 1000) + 600, ...extra });

beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
  env = { ...env, ENVIRONMENT: "production", DEV_ADMIN_EMAIL: undefined, ADMIN_EMAIL: "parent@example.com", ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: AUD, ACCESS_SERVICE_TOKEN_ID: TOKEN_ID } as Bindings;
  pair = (await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"])) as CryptoKeyPair;
  jwk = { ...((await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey), kid: "k1" } as JsonWebKey;
  resetAccessKeyCache();
  vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ keys: [jwk] })));
});
afterAll(async () => { vi.unstubAllGlobals(); await dispose(); });

const call = async (path: string, jwt: string, method = "GET") => app.request(path, { method, headers: { "Cf-Access-Jwt-Assertion": jwt } }, env);

describe("teacher sign-in", () => {
  it("rejects an email nobody added", async () => {
    const jwt = await token(claims({ email: "stranger@example.com" }));
    expect((await call("/api/admin/me", jwt)).status).toBe(403);
  });
  it("lets an added teacher read the library but nothing else", async () => {
    await env.DB.prepare("INSERT INTO users (id, role, username, display_name, admin_email, admin_level) VALUES ('t1','admin','@teacher1','Miss Aisha','teacher@example.com','teacher')").run();
    const jwt = await token(claims({ email: "teacher@example.com" }));
    expect((await call("/api/admin/me", jwt)).status).toBe(200);
    expect((await call("/api/admin/lessons", jwt)).status).toBe(200);
    expect((await call("/api/admin/students", jwt)).status).toBe(403);
    expect((await call("/api/admin/classes", jwt, "POST")).status).toBe(403);
    expect((await call("/api/admin/backups", jwt)).status).toBe(403);
  });
  it("ignores a deactivated teacher", async () => {
    await env.DB.prepare("UPDATE users SET is_active = 0 WHERE id = 't1'").run();
    const jwt = await token(claims({ email: "teacher@example.com" }));
    expect((await call("/api/admin/me", jwt)).status).toBe(403);
  });
});
