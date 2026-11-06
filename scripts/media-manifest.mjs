// The media manifest is content/media/manifest.json plus one file per lesson in content/media/manifest.d/<slug>.json.
// Each file looks like { "files": [ ...entries ] }. Splitting it keeps parallel authoring from conflicting.
import { existsSync, readdirSync, readFileSync } from "node:fs";

const dir = new URL("../content/media/", import.meta.url);
const read = (url) => JSON.parse(readFileSync(url, "utf8")).files ?? [];

export function loadManifest() {
  const extra = new URL("manifest.d/", dir);
  const parts = existsSync(extra) ? readdirSync(extra).filter((f) => f.endsWith(".json")).flatMap((f) => read(new URL(f, extra))) : [];
  return [...read(new URL("manifest.json", dir)), ...parts];
}
