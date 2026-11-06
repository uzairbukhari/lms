import type { Context } from "hono";
import type { AppEnv } from "../env";

/** A file name carrying a content hash (8 or more hex characters between separators) can never change, so it may be cached for good. */
export function hasContentHash(filename: string): boolean {
  const stem = filename.includes(".") ? filename.slice(0, filename.lastIndexOf(".")) : filename;
  return /(^|[._-])[0-9a-f]{8,}($|[._-])/.test(stem);
}

/** Read a single "bytes=a-b" range against a file of `size` bytes. null = no usable range header; "bad" = cannot be satisfied. */
export function parseRange(header: string | undefined, size: number): { start: number; end: number } | "bad" | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null; // multi-range or malformed: serve the whole file
  let start: number;
  let end: number;
  if (m[1] === "") {
    const suffix = Number(m[2]);
    if (suffix === 0) return "bad";
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) return "bad";
  return { start, end };
}

/** Stream an uploaded file from R2. SVGs are locked down so a script inside one cannot run if opened directly. Supports HTTP Range so video can seek. */
export async function serveAsset(c: Context<AppEnv>, filename: string): Promise<Response> {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(filename)) return c.json({ error: "not_found" }, 404);
  const key = `lessons/${filename}`;
  const rangeHeader = c.req.header("Range");

  const headers = new Headers();
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", hasContentHash(filename) ? "private, max-age=31536000, immutable" : "private, max-age=3600");
  headers.set("X-Content-Type-Options", "nosniff");

  let range: { start: number; end: number } | null = null;
  let size = 0;
  if (rangeHeader) {
    const head = await c.env.ASSETS_BUCKET.head(key);
    if (!head) return c.json({ error: "not_found" }, 404);
    size = head.size;
    const parsed = parseRange(rangeHeader, size);
    if (parsed === "bad") {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    range = parsed;
  }

  const object = range
    ? await c.env.ASSETS_BUCKET.get(key, { range: { offset: range.start, length: range.end - range.start + 1 } })
    : await c.env.ASSETS_BUCKET.get(key);
  if (!object) return c.json({ error: "not_found" }, 404);

  const type = object.httpMetadata?.contentType ?? "application/octet-stream";
  headers.set("Content-Type", type);
  if (!type.startsWith("video/")) headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  if (!range) {
    headers.set("Content-Length", String(object.size));
    return new Response(object.body, { headers });
  }
  headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);
  headers.set("Content-Length", String(range.end - range.start + 1));
  return new Response(object.body, { status: 206, headers });
}
