# Letting Claude import lessons (Cloudflare Access service token)

Claude cannot sign in through the Cloudflare Access login screen. A **service token** is a Client ID and Secret that Access accepts instead.
The Worker lets it do only this (see `automationMayCall` in `worker/src/middleware/auth.ts`):

- check (`/lessons/validate`) and import (`/lessons/import`) lesson files, read lessons and courses, and upload images (`/assets`).

It cannot see children, classes, results, settings or backups, and it cannot delete or change anything else.

## One-time setup (about 5 minutes)

1. Cloudflare Zero Trust, **Access > Service auth > Create service token**. Name it `claude-lessons`, duration 1 year. Copy the **Client ID** (ends in `.access`) and **Client Secret** (shown once).
2. **Access > Applications**: open the application that protects `/api/admin` (and `/admin`). Add a policy: action **Service Auth**, include **Service Token** = `claude-lessons`.
3. Worker setting (Workers > lms > Settings > Variables): add `ACCESS_SERVICE_TOKEN_ID` = the Client ID. Deploy is not needed.
4. Project settings > Cloud environment: add `lms.sipwise.trade` to Allowed domains, and store the Client ID and Secret as secrets (`CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`) and `LMS_URL=https://lms.sipwise.trade`. Never paste them into chat.

## Using it

    node scripts/import-lessons.mjs --publish content/topics/maths-class-1-place-value.json

Re-importing the same slug creates a new version (children's earlier answers stay attached to the questions they saw).
To stop access, delete the service token in Zero Trust.
