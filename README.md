# Learning Adventures (LMS)

A private learning platform for two kids and their friends, built entirely on Cloudflare
(Workers, D1, R2, KV, Workers AI). The full plan is in [`docs/PLAN.md`](docs/PLAN.md).

## Layout

| Path | What it is |
|---|---|
| `apps/web` | React + Vite + Tailwind front end (four themes, Space Explorers is the default) |
| `worker` | Hono API running on a Cloudflare Worker; also serves the built front end |
| `packages/schema` | Shared types and validation used by both |
| `migrations` | D1 database migrations |

## Develop

```bash
npm install
npm run dev:worker   # API on http://localhost:8787
npm run dev:web      # front end on http://localhost:5173 (proxies /api to the Worker)
npm run typecheck && npm test
```

## Deploy

Cloudflare resources used by `worker/wrangler.jsonc`: D1 `lms-db`, R2 bucket `lms-assets`,
KV namespace `lms-sessions`, Workers AI binding `AI`.

```bash
npm run deploy
```

To deploy automatically from GitHub, add repository secrets `CLOUDFLARE_API_TOKEN`
(permissions: Workers Scripts, D1, Workers KV, Workers R2 Storage: Edit) and `CLOUDFLARE_ACCOUNT_ID`.
