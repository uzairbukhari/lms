# Windows desktop app

A small Tauri 2 shell (`apps/desktop`) that opens the live site (https://lms.sipwise.trade) in its own locked-down window. Design and options considered: `plan/WINDOWS_APP_PLAN.md` in the project files.

## What updates how

| What changed | How it reaches the app |
|---|---|
| Lessons, quizzes, React UI, Worker fixes | Normal deploy on merge to `main`. The app loads the live site, so nothing to install. |
| The shell itself (window rules, PIN, icon) | Tauri updater: the app checks `GET /api/desktop/update/{target}-{arch}/{version}` at start-up and every 6 hours, downloads the signed installer from R2 and installs it quietly. |

## One-time setup

1. Generate the update signing key (keep the private key safe, it cannot be recovered):
   `npx @tauri-apps/cli@2 signer generate -w tauri.key`
2. (Done: the public key is in the config.) Paste the **public** key into `plugins.updater.pubkey` in `apps/desktop/src-tauri/tauri.conf.json`.
3. In the GitHub `prod` environment add secrets `TAURI_SIGNING_PRIVATE_KEY` (contents of `tauri.key`) and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`. `CLOUDFLARE_API_TOKEN` must be allowed to edit R2 (it already deploys the Worker).
4. Set the parent PIN used to leave focus mode: `cd worker && npx wrangler secret put DESKTOP_EXIT_PIN`. Change it any time the same way, no new installer needed.

## Releasing

1. Raise `version` in `apps/desktop/src-tauri/tauri.conf.json` and `Cargo.toml` (same number).
2. Push a tag: `git tag desktop-v1.0.2 && git push origin desktop-v1.0.1`.
3. The "Desktop release" workflow builds on `windows-latest`, uploads the installer to R2 (`desktop/releases/<version>/`), updates `desktop/latest.json`, and **deletes all but the newest 3 releases** (`scripts/publish-desktop-release.mjs`).

Only shell releases use R2 (about 5 to 10 MB each). Website deploys never upload anything there.

Rollback: edit `desktop/latest.json` in R2 to point at an older kept version. Force everyone onto a new shell: add `"min_version": "1.0.1"` to `latest.json`; `GET /api/desktop/status/{version}` then reports `mustUpdate`.

## Installing

Run `Learning Adventures_<version>_x64-setup.exe` (per-user, no admin needed). Without a paid Authenticode certificate Windows shows a one-time "Windows protected your PC" box: More info, then Run anyway. Later updates install silently.

## Safety features

* Only the site's own pages open (plus Turnstile on the login page); everything else is blocked, new windows are denied. No address bar, tabs or devtools. `/admin` is blocked inside the app: parents use the browser.
* Focus mode (full screen, no title bar, closing asks for the parent PIN): create an empty `focus.flag` file in `%APPDATA%\trade.sipwise.lms.desktop\` or set `LMS_FOCUS=1`.
* No internet at start-up shows a friendly offline page that retries on its own.
* The page is told its version through the user agent (`LearningAdventuresDesktop/<version>`).
* For screen-time limits use Microsoft Family Safety on the child's Windows account.

## Local testing

`LMS_SITE=http://localhost:8787 cargo run --manifest-path apps/desktop/src-tauri/Cargo.toml` (Linux needs `libwebkit2gtk-4.1-dev`; the real build is Windows only). `cargo check` runs the compile check.

## Worker endpoints (`worker/src/routes/desktop.ts`)

`GET /api/desktop/update/:target/:current?device=` (204 or update JSON, records the device in `desktop_installs`), `GET /api/desktop/status/:current`, `GET /api/desktop/releases/*` (installer from R2), `POST /api/desktop/exit` (parent PIN check).
