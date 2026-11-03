// Approved videos become `video` blocks in the lesson. Each one sits after the block the parent chose
// (`after_key`), or just before the closing summary (or at the end) when no place was chosen.

export type ApprovedVideo = { youtube: string; title: string; start_sec: number; end_sec: number; caption: string | null; after_key?: string | null };

type AnyBlock = { type: string; [k: string]: unknown };

export function videoBlock(v: ApprovedVideo): AnyBlock {
  return { type: "video", title: v.title.slice(0, 100), youtube: v.youtube, start: v.start_sec, end: v.end_sec, ...(v.caption ? { caption: v.caption.slice(0, 200) } : {}) };
}

/** A short stable id for a block: its type plus a hash of its content. Survives re-ordering, changes if the block is rewritten. */
export function blockKey(b: AnyBlock): string {
  const s = JSON.stringify(b);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return `${b.type}:${h.toString(36)}`;
}

const snippet = (s: unknown, n = 48) => { const t = String(s ?? "").replace(/[*_#`]/g, "").replace(/\s+/g, " ").trim(); return t.length > n ? `${t.slice(0, n - 1)}…` : t; };
const KIND: Record<string, string> = { heading: "Heading", text: "Text", image: "Picture", chart: "Chart", check: "Check question", activity: "Activity", reveal: "Think about it", explainer: "Animation", brain_game: "Brain game", manipulative: "Drag game", steps: "Steps", vocab: "Word", callout: "Note" };

/** The places a video can go: every block except videos, the summary and the glossary, with the lesson stop it belongs to. */
export function videoSlots(blocks: AnyBlock[]): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  let stop = "";
  for (const b of blocks) {
    if (b.type === "heading") stop = snippet(b.text, 40);
    if (!KIND[b.type]) continue;
    const q = b.question as { prompt?: string } | undefined;
    const what = snippet(b.type === "check" ? q?.prompt : b.type === "text" || b.type === "callout" ? b.markdown : b.type === "reveal" ? b.prompt : b.type === "image" ? (b.caption ?? b.alt) : b.type === "vocab" ? b.word : b.type === "steps" ? (b.items as string[] | undefined)?.[0] : (b.title ?? b.text));
    out.push({ key: blockKey(b), label: `${stop ? `${stop} · ` : ""}${KIND[b.type]}${what ? `: ${what}` : ""}` });
  }
  return out;
}

/** Adds a block for each approved video that is not already in the lesson. Returns a new array. */
export function withVideos(blocks: AnyBlock[], videos: ApprovedVideo[]): AnyBlock[] {
  const have = new Set(blocks.filter((b) => b.type === "video").map((b) => b.youtube));
  let out = blocks;
  for (const v of videos.filter((x) => !have.has(x.youtube))) {
    const block = videoBlock(v);
    let at = v.after_key ? out.findIndex((b) => b.type !== "video" && blockKey(b) === v.after_key) : -1;
    if (at !== -1) {
      at += 1;
      while (out[at]?.type === "video") at += 1; // keep several videos for one place in the order they were added
    } else {
      at = out.map((b) => b.type).lastIndexOf("summary");
      if (at === -1) at = out.length;
    }
    out = [...out.slice(0, at), block, ...out.slice(at)];
  }
  return out;
}

export const withoutVideo = (blocks: AnyBlock[], youtube: string): AnyBlock[] => blocks.filter((b) => !(b.type === "video" && b.youtube === youtube));
