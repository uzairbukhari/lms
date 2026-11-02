export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    /** The full JSON body of the error response (for example the list of lesson problems). */
    public body: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

/** Calls the Worker API with JSON. Throws ApiError with a child-friendly message when it fails. */
export async function api<T>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(path, {
    method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"),
    headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    credentials: "same-origin",
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
  if (!res.ok) throw new ApiError(res.status, data.error ?? "error", data.message ?? "Something went wrong. Please try again.", data);
  return data as T;
}
