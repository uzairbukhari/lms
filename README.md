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

## What it does

- Children sign in with a simple username and password, see this week's lessons (one per subject), work through the lesson,
  then take a quiz as many times as they like. Older weeks stay readable as "Look back"; future weeks stay hidden.
- Semester exams (4 semesters a year) are built from the quizzes taught in that semester.
- Optional Workers AI hints and "why was I wrong" explanations, with guardrails: the answer is never given away, there is
  no free chat, there is a daily limit, and a stored hint is used whenever AI is unavailable.
- The parent area (behind Cloudflare Access) manages students and classes, imports lessons written with Claude, plans the
  year, builds exams and shows reports: learning curves, report cards, weak skills, every answer, CSV export.

## Deploy

See [`docs/DEPLOY.md`](docs/DEPLOY.md) for the full checklist (secrets, Cloudflare Access, first run, backups).

```bash
npm run deploy
```
