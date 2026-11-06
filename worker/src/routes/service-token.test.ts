import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { resetAccessKeyCache } from "../lib/access";
import { automationMayCall } from "../middleware/auth";
import { createTestEnv } from "../../test/db";
import { lessonFixture } from "../../test/fixtures";

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

const call = async (path: string, jwt: string, body?: unknown) =>
  app.request(path, { method: body === undefined ? "GET" : "POST", headers: { "Cf-Access-Jwt-Assertion": jwt, ...(body === undefined ? {} : { "Content-Type": "application/json" }) }, body: body === undefined ? undefined : JSON.stringify(body) }, env);

describe("service token (Claude importing lessons)", () => {
  it("may only reach the content routes", () => {
    expect(automationMayCall("POST", "/api/admin/lessons/import")).toBe(true);
    expect(automationMayCall("GET", "/api/admin/lessons")).toBe(true);
    expect(automationMayCall("POST", "/api/admin/assets")).toBe(true);
    expect(automationMayCall("POST", "/api/admin/voice/prewarm")).toBe(true);
    expect(automationMayCall("GET", "/api/admin/voice/prewarm")).toBe(false);
    expect(automationMayCall("GET", "/api/admin/voice/audio")).toBe(true);
    expect(automationMayCall("POST", "/api/admin/voice/audio")).toBe(false);
    expect(automationMayCall("GET", "/api/admin/students")).toBe(false);
    expect(automationMayCall("POST", "/api/admin/classes")).toBe(false);
    expect(automationMayCall("PATCH", "/api/admin/lessons/x")).toBe(false);
    expect(automationMayCall("DELETE", "/api/admin/lessons/x")).toBe(false);
  });

  it("imports a lesson with the right token", async () => {
    const jwt = await token(claims({ common_name: TOKEN_ID }));
    const res = await call("/api/admin/lessons/import", jwt, { publish: true, file: lessonFixture({ slug: "maths-by-token" }) });
    expect(res.status).toBe(201);
    expect((await call("/api/admin/lessons", jwt)).status).toBe(200);
  });

  it("is refused on anything else, and a different token gets nothing", async () => {
    const jwt = await token(claims({ common_name: TOKEN_ID }));
    expect((await call("/api/admin/students", jwt)).status).toBe(403);
    expect((await call("/api/admin/classes", jwt, { name: "Nope" })).status).toBe(403);
    const other = await token(claims({ common_name: "someone-else.access" }));
    expect((await call("/api/admin/lessons", other)).status).toBe(401);
  });

  it("still lets the parent in by email", async () => {
    const jwt = await token(claims({ email: "Parent@Example.com" }));
    expect((await call("/api/admin/students", jwt)).status).toBe(200);
  });
});
