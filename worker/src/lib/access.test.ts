import { beforeEach, describe, expect, it } from "vitest";
import { resetAccessKeyCache, verifyAccessJwt } from "./access";

const TEAM = "family.cloudflareaccess.com";
const AUD = "aud-123";

function b64url(input: ArrayBuffer | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function makeKey() {
  const pair = (await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  const jwk = { ...((await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey), kid: "k1" };
  return { pair, jwk };
}

async function sign(pair: CryptoKeyPair, payload: object, header: object = { alg: "RS256", kid: "k1" }) {
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(signingInput));
  return `${signingInput}.${b64url(sig)}`;
}

const now = 1_800_000_000_000;
const good = { aud: [AUD], iss: `https://${TEAM}`, exp: now / 1000 + 600, email: "Parent@Example.com" };

describe("verifyAccessJwt", () => {
  beforeEach(() => resetAccessKeyCache());

  it("accepts a valid token and lowercases the email", async () => {
    const { pair, jwk } = await makeKey();
    const token = await sign(pair, good);
    expect(await verifyAccessJwt(token, { teamDomain: TEAM, aud: AUD }, async () => [jwk], now)).toEqual({
      email: "parent@example.com",
    });
  });

  it("rejects missing, malformed and unsigned tokens", async () => {
    const { jwk } = await makeKey();
    const cfg = { teamDomain: TEAM, aud: AUD };
    expect(await verifyAccessJwt(undefined, cfg, async () => [jwk], now)).toBeNull();
    expect(await verifyAccessJwt("abc", cfg, async () => [jwk], now)).toBeNull();
    expect(await verifyAccessJwt("a.b.c", cfg, async () => [jwk], now)).toBeNull();
  });

  it("rejects a token signed by a different key", async () => {
    const a = await makeKey();
    const b = await makeKey();
    const token = await sign(b.pair, good);
    expect(await verifyAccessJwt(token, { teamDomain: TEAM, aud: AUD }, async () => [a.jwk], now)).toBeNull();
  });

  it("rejects expired tokens, wrong audience and wrong issuer", async () => {
    const { pair, jwk } = await makeKey();
    const cfg = { teamDomain: TEAM, aud: AUD };
    const keys = async () => [jwk];
    expect(await verifyAccessJwt(await sign(pair, { ...good, exp: now / 1000 - 1 }), cfg, keys, now)).toBeNull();
    expect(await verifyAccessJwt(await sign(pair, { ...good, aud: ["other"] }), cfg, keys, now)).toBeNull();
    expect(await verifyAccessJwt(await sign(pair, { ...good, iss: "https://evil.example" }), cfg, keys, now)).toBeNull();
  });

  it("rejects non-RS256 algorithms", async () => {
    const { pair, jwk } = await makeKey();
    const token = await sign(pair, good, { alg: "none", kid: "k1" });
    expect(await verifyAccessJwt(token, { teamDomain: TEAM, aud: AUD }, async () => [jwk], now)).toBeNull();
  });
});
