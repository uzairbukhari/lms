// Verifies the Cloudflare Access JWT that protects /admin and /api/admin.
// Access signs a short-lived RS256 token for every request that passed your login policy.

export type AccessConfig = { teamDomain: string; aud: string };
/** A person has an email; a service token (automation) has a common_name, which is its Client ID. */
export type AccessIdentity = { email?: string; commonName?: string };

type Jwk = JsonWebKey & { kid?: string };
type KeyFetcher = (teamDomain: string) => Promise<Jwk[]>;

let cache: { teamDomain: string; keys: Jwk[]; fetchedAt: number } | undefined;
const CACHE_MS = 60 * 60 * 1000;

const defaultFetchKeys: KeyFetcher = async (teamDomain) => {
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Access certs request failed: ${res.status}`);
  const body = (await res.json()) as { keys?: Jwk[] };
  return body.keys ?? [];
};

function b64urlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const s = atob(padded);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

function parseJson<T>(bytes: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

/**
 * Returns the verified identity, or null if the token is missing, forged, expired,
 * for a different application (aud), or from a different team (iss).
 */
export async function verifyAccessJwt(
  token: string | undefined,
  config: AccessConfig,
  fetchKeys: KeyFetcher = defaultFetchKeys,
  now: number = Date.now(),
): Promise<AccessIdentity | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts as [string, string, string];

  try {
    const header = parseJson<{ alg?: string; kid?: string }>(b64urlToBytes(h));
    if (header.alg !== "RS256") return null;

    if (!cache || cache.teamDomain !== config.teamDomain || now - cache.fetchedAt > CACHE_MS) {
      cache = { teamDomain: config.teamDomain, keys: await fetchKeys(config.teamDomain), fetchedAt: now };
    }
    let jwk = cache.keys.find((k) => k.kid === header.kid);
    if (!jwk) {
      // The signing keys rotate; refresh once before giving up.
      cache = { teamDomain: config.teamDomain, keys: await fetchKeys(config.teamDomain), fetchedAt: now };
      jwk = cache.keys.find((k) => k.kid === header.kid);
    }
    if (!jwk) return null;

    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      b64urlToBytes(s),
      new TextEncoder().encode(`${h}.${p}`),
    );
    if (!valid) return null;

    const payload = parseJson<{ aud?: string | string[]; iss?: string; exp?: number; nbf?: number; email?: string; common_name?: string }>(
      b64urlToBytes(p),
    );
    const seconds = Math.floor(now / 1000);
    if (typeof payload.exp !== "number" || payload.exp <= seconds) return null;
    if (typeof payload.nbf === "number" && payload.nbf > seconds + 60) return null;
    if (payload.iss !== `https://${config.teamDomain}`) return null;
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!audiences.includes(config.aud)) return null;
    if (payload.email) return { email: payload.email.toLowerCase() };
    if (payload.common_name) return { commonName: payload.common_name };
    return null;
  } catch {
    return null;
  }
}

/** Test helper: forget cached signing keys. */
export function resetAccessKeyCache(): void {
  cache = undefined;
}
