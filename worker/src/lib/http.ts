import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ZodType } from "zod";

/** Reads and validates a JSON body. Responds 400 with the first problem if it is not valid. */
export async function parseBody<T>(c: Context, schema: ZodType<T>): Promise<T> {
  const raw = await c.req.json().catch(() => null);
  const result = schema.safeParse(raw);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new HTTPException(400, {
      res: c.json({ error: "invalid_input", message: issue?.message ?? "Invalid input", field: issue?.path.join(".") }, 400),
    });
  }
  return result.data;
}

export function fail(c: Context, status: 400 | 401 | 403 | 404 | 409 | 429, error: string, message?: string) {
  return c.json({ error, ...(message ? { message } : {}) }, status);
}
