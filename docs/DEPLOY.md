# Deploying and running Learning Adventures

Everything runs on your Cloudflare account. These steps are done once. Resources already created for this project:
D1 `lms-db`, R2 `lms-assets`, KV `lms-sessions` (ids are in `worker/wrangler.jsonc`).

## 1. First deploy

1. Add two GitHub repository secrets (Settings, Secrets and variables, Actions):
   `CLOUDFLARE_API_TOKEN` (permissions: Workers Scripts, D1, Workers KV Storage, Workers R2 Storage, all Edit; Workers AI Read)
   and `CLOUDFLARE_ACCOUNT_ID`.
   Merging to `main` then runs the tests, applies database migrations and deploys.
2. Or deploy by hand from your computer: `npx wrangler login`, then
   `npm run deploy` (builds, then deploys) and `cd worker && npx wrangler d1 migrations apply lms-db --remote`.

The first deploy gives you a `lms.<your-account>.workers.dev` address. A custom domain can be added later in
Workers, Settings, Domains.

## 2. Protect the parent area with Cloudflare Access (required)

The parent area is `/admin` and its API `/api/admin`. The Worker refuses admin requests unless they carry a valid
Cloudflare Access login, so this step is what keeps children and strangers out.

1. Cloudflare dashboard, Zero Trust, Access, Applications, Add an application, Self-hosted.
2. Add two destinations on your Worker hostname: path `admin*` and path `api/admin*`.
3. Add a policy: Action Allow, Include, Emails, your own email address.
4. Save, then open the application and copy its **Application Audience (AUD) tag**.
5. In Workers, `lms`, Settings, Variables and Secrets, add these variables:

| Variable | Value |
|---|---|
| `ADMIN_EMAIL` | your email address (the same one allowed in the policy) |
| `ACCESS_TEAM_DOMAIN` | your team domain, such as `yourteam.cloudflareaccess.com` |
| `ACCESS_AUD` | the AUD tag from step 4 |
| `TIMEZONE` | your timezone, such as `Asia/Karachi` (decides when a school week starts) |

Never set `ENVIRONMENT` or `DEV_ADMIN_EMAIL` in production: they switch the Access check off for local development.

## 3. First run

1. Open `/admin`. Sign in through Access. You get a "Family" class automatically.
2. Students: add your daughters (or paste several names at once for friends). Print the login cards.
3. Classes, then the class: choose the first Monday of the school year, then "Generate year". Four semesters appear.
4. Lessons: generate lessons with Claude using the prompts in `docs/PLAN.md` section 5 (outline prompt first, then the
   lesson prompt), paste the JSON, validate and import. Each lesson carries its course, semester and week.
5. Assign the course to the class. Children now see this week's lessons; the Year plan page lets you move things around.
6. Before each exam week: Exams, build the exam for the course and semester.

## 4. Backups

A cron job copies the whole database to the private `lms-assets` bucket under `backups/` every Sunday at 03:00 UTC and
keeps the newest 8. You can also run one from the parent area's API (`POST /api/admin/backups`). Backups contain
children's names and password hashes: keep that bucket private.

Backups include the AI reply log (`ai_events`) but not the sign-in history, which is kept only for the parent to review.

### Optional: Turnstile on the sign-in page

After three wrong passwords the sign-in page can ask for a Cloudflare Turnstile check. Create a widget in the Cloudflare
dashboard (Turnstile, hostname = your site), then set the variable `TURNSTILE_SITE_KEY` and the Worker secret
`TURNSTILE_SECRET` (`wrangler secret put TURNSTILE_SECRET`). Without both, the check never appears; wrong passwords are
still limited (10 per 15 minutes) and every sign-in is listed on the child's Sign-ins tab. Settings shows whether it is on.

## 5. Looking after other families' children

If friends use the site, you are holding their children's learning records.
Keep to first names only, tell the parents what is stored (name, quiz answers and scores), and delete a child's data
when asked: Students, Delete removes the account and every attempt permanently.
Check the rules that apply where you live before inviting other families.

## 6. Local development

```bash
cp worker/.dev.vars.example worker/.dev.vars          # local admin bypass, local only
npm install
cd worker && npx wrangler d1 migrations apply DB --local -c wrangler.local.jsonc && cd ..
npm run build && npm run dev:worker                    # http://localhost:8787
```

Workers AI has no local simulator, so hints use the stored fallback text locally.
