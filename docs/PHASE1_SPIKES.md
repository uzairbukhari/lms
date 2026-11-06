# Phase 1 spike results

Part of docs/superpowers/specs/2026-11-06-course-expansion-design.md. Run on 2026-11-06.

## 1. Remotion renders CSS animations frame-exactly (PASS)

`tools/clips/` is a separate Remotion 4.0.541 project with its own lockfile (outside the npm workspaces, so CI is unaffected).

- Naive approach fails: pausing animations once and setting `currentTime` is undone. Chromium replaces the animations a frame later and they restart at 0.
- Working approach (`tools/clips/src/Spike.tsx`, `seekAll`): pause every animation from `document.getAnimations()`, set `currentTime = frame / fps * 1000`, wait two animation frames, and repeat until every animation is paused at that time.
- Result: frames rendered in the order 30, 75, 30, 60 gave byte-identical files for the two frame-30 renders, and distinct images for 60 and 75.
- Speed: 120 frames (5 s at 24 fps, simple scene) rendered to H.264 in 9.3 s. File size 89 KB. Remotion bundles its own ffmpeg.
- Not yet proven: CSS transitions that depend on the previous step, and `CountUp` (`setInterval`). Phase 2 handles these when `Explainer.tsx` is split into a pure `ExplainerView`.
- Licence: Remotion is free for individuals and very small teams. Confirm it fits before any wider use.

## 2. Coteach diagrams need a manual download (PARTIAL)

`CreateDiagrams` returns an interactive preview and says "Download the selected PNGs, then upload them into this Claude conversation". It cannot run unattended.

Decision: Coteach diagrams are produced in batches of up to 4 while the owner is present, saved to `content/media/inbox/`, and picked up by the media script. Maths needs about 48 diagrams (2 per maths lesson) = 12 batches. The app's own drawn props (`apps/web/src/anim/props`) cover the rest.

## 3. Unsplash download works unattended (PASS)

`download_asset` returns a plain `images.unsplash.com` URL. A script can fetch it, store the file in R2 and record author, source URL and download time in `content/media/manifest.json`. Hotlinking stays banned.

## 4. Voice budget (OWNER ACTION)

- The daily AI ceiling is an admin Settings value stored in D1 (`aiDailyCap` in `worker/src/lib/settings.ts`), not a Cloudflare file. No deploy is needed to change it.
- Cloudflare gives 10,000 neurons a day free. The owner chose 25,000 characters a day, about 34,100 neurons (Aura-1 at 1,364 neurons per 1,000 characters). That is above the free allowance, so the Cloudflare account needs the Workers Paid plan first.
- Nothing has been changed. The owner sets the ceiling in the admin Settings page when ready.
- Until then the pipeline stays within the default ceiling and pre-warming runs slowly overnight.
