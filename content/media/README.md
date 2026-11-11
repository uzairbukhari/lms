# Lesson media

Binaries are not kept in git. They live in R2 (uploaded with `node scripts/upload-media.mjs`), and `manifest.json` is the record of where each one came from.

One entry per file in `manifest.json`:

```json
{
  "file": "science-c1-butterfly-a1b2c3d4.jpg",
  "lessons": ["science-class-1-living-things"],
  "source": "unsplash",
  "source_id": "4ByFHyNdoD4",
  "author": "Yuichi Kageyama",
  "author_url": "https://unsplash.com/@kageyama",
  "source_url": "https://unsplash.com/photos/4ByFHyNdoD4",
  "license": "Unsplash License",
  "download_tracked_at": "2026-11-06T10:00:00Z",
  "sha256": "...",
  "alt": "A butterfly resting on an orange flower",
  "query": "butterfly on flower",
  "reviewed": true
}
```

- `source` is `unsplash`, `coteach` (a maths diagram from the Coteach connector), or `generated` (clips, posters and pictures we made).
- Unsplash files must record `download_tracked_at`: call the Unsplash `download_asset` tool for each photo you really use.
- The lesson's `image` block carries the same credit text in its `credit` field, for example "Photo by Yuichi Kageyama on Unsplash".
- `inbox/` is where Coteach PNGs are dropped after the owner downloads them from the Coteach preview.

Oak National Academy provenance is kept per lesson in `content/sources/<slug>.json`. See `docs/SYLLABUS_12.md`.
