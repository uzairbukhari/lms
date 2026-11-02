// Approved videos become `video` blocks in the lesson, placed just before the closing summary (or at the end).

export type ApprovedVideo = { youtube: string; title: string; start_sec: number; end_sec: number; caption: string | null };

type AnyBlock = { type: string; [k: string]: unknown };

export function videoBlock(v: ApprovedVideo): AnyBlock {
  return { type: "video", title: v.title.slice(0, 100), youtube: v.youtube, start: v.start_sec, end: v.end_sec, ...(v.caption ? { caption: v.caption.slice(0, 200) } : {}) };
}

/** Adds a block for each approved video that is not already in the lesson. Returns a new array. */
export function withVideos(blocks: AnyBlock[], videos: ApprovedVideo[]): AnyBlock[] {
  const have = new Set(blocks.filter((b) => b.type === "video").map((b) => b.youtube));
  const add = videos.filter((v) => !have.has(v.youtube)).map(videoBlock);
  if (add.length === 0) return blocks;
  const at = blocks.map((b) => b.type).lastIndexOf("summary");
  return at === -1 ? [...blocks, ...add] : [...blocks.slice(0, at), ...add, ...blocks.slice(at)];
}

export const withoutVideo = (blocks: AnyBlock[], youtube: string): AnyBlock[] => blocks.filter((b) => !(b.type === "video" && b.youtube === youtube));
