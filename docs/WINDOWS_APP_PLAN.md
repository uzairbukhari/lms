# Windows app plan: Learning Adventures on the desktop

Status: draft for Uzair's review (3 Nov 2026). Planning only, nothing built yet.

## 1. Short answer

Yes. We can ship a Windows app that reuses the same React app, and it can update itself over the air.

**Recommendation: a small Tauri 2 "shell" app that opens the live site (lms.sipwise.trade) inside its own locked-down window**, plus Tauri's built-in updater for the shell itself, with update files hosted on Cloudflare R2 and served by our existing Worker.

Why this works so well for us:

- **Two layers of updates, and the big one is free.** Lessons, quizzes, the React UI and every fix already go live the moment a PR merges to `main` (auto-deploy, PR #4). Because the Windows app loads the live site, it gets all of that instantly with no installer at all. The shell itself (window, icon, safety rules) rarely changes, and when it does, the Tauri updater downloads a signed update from R2 and installs it on next launch.
- **Almost zero changes to the web app.** The app calls `/api/...` with same-origin cookies (`apps/web/src/api.ts`), uses Turnstile on login, and the admin uses Cloudflare Access. All of that keeps working as-is when the window loads the real domain. Bundling the files inside the app instead would break all three (see section 4).
- **Small and light.** Tauri uses Windows' built-in WebView2 (Edge engine, already on every Windows 10/11 PC). The installer is about 5 to 10 MB, versus 100 MB+ for Electron.
- **Child safety is easier than in a browser.** The window can only show our domain, no address bar, no tabs, no devtools, external links blocked, optional full screen with a parent PIN to exit.

Effort: about **3 to 5 days** of build work for a polished version (details in section 8).

## 2. Options compared

| Option | Reuses React app | OTA updates | Installer size | Child lock-down | Cost | Effort | Verdict |
|---|---|---|---|---|---|---|---|
| **A. Tauri 2 shell, loads live site** | 100%, unchanged | Content: instant via deploy. Shell: Tauri updater from R2 | ~5-10 MB | Strong (domain lock, no devtools, kiosk-style full screen, PIN exit) | Free (signing optional, see 6) | 3-5 days | **Recommended** |
| B. Install as PWA from Edge | 100% | Instant (it is the website) | none | Weak: it is still Edge; kids can reach the browser | Free | 0.5 day (add service worker + better icons) | Good stop-gap; do it anyway |
| C. Edge kiosk / Windows Assigned Access | 100% | Instant | none | Very strong on a dedicated child account | Free | 0.5 day of PC setup, no code | Great if a PC is *only* for learning |
| D. Electron shell | 100% | electron-updater, can use R2 | ~100-150 MB | Strong | Free | 4-6 days | Works, but heavier for no gain |
| E. Tauri with files bundled inside (offline-capable) | ~90%, needs API/auth changes | Shell updater for every UI change | ~10 MB | Strong | Free | 2-3 weeks | Not now; only if offline use matters |
| F. MSIX package / Microsoft Store | 100% (via PWABuilder or wrapping A) | Store or `.appinstaller` handles it | small | Medium | Store dev account; Store signs for you | 1-3 days + review wait | Optional later route for signing headaches |

Notes:
- **MSIX is a packaging format, not a framework.** It could wrap option A. Self-hosted MSIX updates (an `.appinstaller` file on R2) need a properly trusted signing certificate, which is the main obstacle for a family app. The Store route avoids that because Microsoft signs the package, but it adds certification review for every shell update. Not worth it as a first step.
- **Option B is worth doing regardless** (a few hours): add a proper service worker and PNG icons so "Install app" in Edge/Chrome gives a clean desktop icon, and phones/tablets get the same benefit.

## 3. How the recommended app works

```
 Windows PC
 ┌──────────────────────────────────────────┐
 │ Learning Adventures.exe (Tauri shell)    │
 │  ├─ WebView2 window → https://lms.sipwise.trade  (same site, same login) │
 │  ├─ Rust side: updater, nav lock, PIN exit, offline screen │
 └──────────────────────────────────────────┘
          │ checks on launch / every few hours
          ▼
 Cloudflare Worker  GET /desktop/update/windows-x86_64/{current_version}
          │ returns 204 (no update) or JSON {version, notes, url, signature}
          ▼
 R2 bucket  lms-assets/desktop/releases/1.2.0/LearningAdventures_1.2.0_x64-setup.exe (+ .sig)
```

New repo pieces (all in the same monorepo):
- `apps/desktop/` — the Tauri project: `src-tauri/tauri.conf.json`, `Cargo.toml`, a tiny `main.rs`, icons. `frontendDist`/window URL points at `https://lms.sipwise.trade` (a dev build can point at `http://localhost:5173`).
- `apps/desktop/offline.html` — a bundled friendly "No internet yet, ask a grown-up" page in the space theme, with a Retry button. Shown when the site cannot be reached.
- `worker/src/routes/desktop.ts` — the update endpoint (Hono route, reads the latest release manifest from R2 or KV).
- `.github/workflows/desktop-release.yml` — builds on a `windows-latest` runner when a tag like `desktop-v1.2.0` is pushed.

Small web-app touches (optional, all detected safely so the browser version is unaffected):
- Detect the desktop shell (custom user-agent suffix `LearningAdventuresDesktop/1.2.0`) to hide things that make no sense in it, such as the "Install app" hint.
- Admin "Student site" and "Preview" links use `target="_blank"`. In the shell we either open them in a second app window (still domain-locked) or keep admin out of the kids' app entirely (recommended: Uzair keeps using the browser for admin; the shell is for students).

## 4. Why not bundle the React files inside the app

It sounds more "app-like", but it costs a lot and gives little:
- The page would run from `tauri://localhost`, so every `/api` call becomes cross-origin. We would need CORS, `SameSite=None` cookies or token auth, and changes to every `fetch`.
- Turnstile is tied to our hostname and would fail on the login page.
- Every UI fix would need a new signed installer instead of a normal deploy.
- Lessons, grading and progress live on the server anyway (server-side grading is a deliberate design choice), so true offline use would need a sync layer. That is a 2-3 week project on its own.

If offline learning ever becomes important (travel, poor internet in Pakistan visits), we can revisit option E then.

## 5. Over-the-air updates in detail

**Layer 1: content and web UI (most updates).** Nothing new. Merge to `main` → GitHub Actions deploys the Worker and assets → the next time a child opens a screen, they see the new version. We should add one small thing: the shell reloads the page when it regains focus after more than an hour idle, so a laptop left open picks up new lessons.

**Layer 2: the shell itself (rare).** Using `tauri-plugin-updater`:
1. Bump the version in `apps/desktop/src-tauri/tauri.conf.json`, push tag `desktop-v1.2.0`.
2. GitHub Action on `windows-latest` builds the NSIS installer with `tauri-action`, signs the update with the Tauri updater private key (stored as a GitHub secret), and optionally Authenticode-signs the `.exe` (section 6).
3. The Action uploads the installer and `.sig` to R2 at `desktop/releases/1.2.0/` using `wrangler r2 object put`, then writes `desktop/latest.json` (version, notes, date, URL, signature).
4. The app checks `GET https://lms.sipwise.trade/desktop/update/windows-x86_64/{current}` on launch and every 6 hours. The Worker compares versions and returns 204 or the JSON.
5. The app downloads in the background, verifies the signature against the public key baked into the app (a tampered file is refused), and installs quietly on next launch (NSIS "passive" mode, no admin prompt with a per-user install).

Extras the Worker endpoint makes easy:
- **Rollback:** point `latest.json` back at the previous release.
- **Staged rollout:** serve the new version to one device first (e.g. Fatima's laptop) using a device id the shell sends.
- **Forced update:** a `min_version` field; older shells show "Please wait, updating..." before loading the site.
- All update checks logged in D1 (`desktop_installs` table: device, version, last seen) so the admin dashboard can show which PCs are up to date.

Cost: R2 storage for a few 10 MB installers is pennies, and R2 has no egress fees.

## 6. Code signing

There are two different kinds of signing; only the first is required.

1. **Tauri updater signature (required, free).** A key pair generated with `tauri signer generate`. The private key lives in GitHub secrets; the public key is in the app. This is what makes OTA updates safe.
2. **Windows Authenticode signature (optional).** Without it, the *first* install shows a blue SmartScreen "Windows protected your PC" box (click More info → Run anyway). Updates afterwards install silently. For two family PCs this is perfectly acceptable.

If we want to remove the warning (for example if friends' families install it):
- **Microsoft Azure Artifact Signing** (formerly Trusted Signing), about US$10/month, integrates with GitHub Actions and is the cheapest proper option. Caveat: identity validation for individuals has been restricted by country; Uzair would need to check eligibility for his location before we count on it.
- An OV/EV certificate from a CA (roughly US$200-500/year, hardware token or cloud HSM). Overkill here.
- The Microsoft Store route (option F) where Microsoft signs it.

Recommendation: ship unsigned to start (updater-signed only), decide on Authenticode only if friends' families start installing it.

## 7. Child safety and kiosk options

Inside the app (built into the shell):
- **Domain lock:** navigation allowed only to `lms.sipwise.trade` (plus Turnstile's `challenges.cloudflare.com` frame). Any other link is silently blocked; no external browser is opened.
- No address bar, no tabs, no right-click menu, no devtools in release builds, no file downloads, no zoom shortcuts that break layout.
- **Optional "focus mode":** full screen with no window frame; Alt+F4/close asks for a 4-digit parent PIN (set by the admin, stored server-side, checked through a tiny Worker endpoint so it can be changed remotely).
- Students only. The admin panel route is blocked in the shell so kids cannot even see the Access login page.
- Single instance: double-clicking the icon focuses the existing window.
- Audio: allow narration autoplay (WebView2 flag) so sounds start without an extra tap.

On the PC (no code, Uzair's choice per device):
- **Microsoft Family Safety** with a child Microsoft account: app/game allow-list, screen-time limits, and web filtering. Allow "Learning Adventures" and set a daily schedule.
- **Windows Assigned Access (kiosk):** on Windows 11 Pro, a dedicated "Learning" local account can be locked to a single app. Assigned Access officially supports single-app kiosk for packaged apps and Microsoft Edge; for a classic Win32 app like a Tauri `.exe`, full Shell Launcher needs Windows Enterprise/Education. So the realistic kiosk choices on a home PC are (a) Edge kiosk mode pointing at the site (option C), or (b) our shell packaged as MSIX. We can decide this later; the in-app lock plus Family Safety covers most needs.
- Note that Windows itself cannot be made fully child-proof by an app alone; the account-level controls above are what actually stop a determined 9-year-old.

## 8. Build plan and effort (after approval)

| Step | What | Estimate |
|---|---|---|
| 1 | PWA polish: service worker for the app shell, PNG icons, install prompt (benefits browsers and tablets too) | 0.5 day |
| 2 | `apps/desktop` Tauri 2 project: window, icons, domain lock, single instance, offline page, desktop user-agent | 1 day |
| 3 | Updater: key pair, `tauri-plugin-updater`, Worker `/desktop/update` route + tests, R2 layout, D1 `desktop_installs` table | 1 day |
| 4 | GitHub Actions release workflow on `windows-latest`, upload to R2, write `latest.json`; manual test of a 1.0.0 → 1.0.1 update on a real PC | 1 day |
| 5 | Child-safety extras: focus mode + parent PIN, admin route block, admin dashboard "Devices" card | 1 day |
| 6 | (Optional) Authenticode via Azure Artifact Signing | 0.5 day once the account is approved |

Total: about 4 to 5 days including testing; a minimum version (steps 2-4) is about 3 days.

Testing: we cannot run Windows in our cloud environment, so the build runs on GitHub's Windows runners and Uzair (or I via Remote Control on a Windows PC) does the final install-and-update test on a real machine.

## 9. Decisions for Uzair

1. Go with **option A (Tauri shell loading the live site)**? Recommended.
2. Students only in the desktop app, admin stays in the browser? Recommended.
3. Ship **without** Authenticode signing at first (one-time SmartScreen click)? Recommended.
4. Include focus mode with parent PIN in v1, or later?
5. Anything that needs offline use? If yes, we plan option E separately.
