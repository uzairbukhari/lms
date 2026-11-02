// Finds and checks YouTube clips with the official YouTube Data API v3 (key kept as the Worker secret YOUTUBE_API_KEY).
// Only used from the admin screens: a child's player never talks to this.

export type Candidate = {
  youtube: string;
  title: string;
  channel: string;
  seconds: number;
  madeForKids: boolean;
  /** Longer than the 100 second limit: it can still be used if the parent picks a part of it. */
  needsTrim: boolean;
};

const API = "https://www.googleapis.com/youtube/v3";

/** "PT1M30S" -> 90. */
export function parseDuration(iso: string): number {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return 0;
  return Number(m[1] ?? 0) * 86400 + Number(m[2] ?? 0) * 3600 + Number(m[3] ?? 0) * 60 + Number(m[4] ?? 0);
}

type VideoItem = {
  id: string;
  snippet?: { title?: string; channelTitle?: string };
  contentDetails?: { duration?: string; regionRestriction?: { blocked?: string[] } };
  status?: { embeddable?: boolean; privacyStatus?: string; madeForKids?: boolean };
};

async function get<T>(path: string, params: Record<string, string>, key: string, f: typeof fetch): Promise<T> {
  const url = `${API}/${path}?${new URLSearchParams({ ...params, key })}`;
  const res = await f(url);
  if (!res.ok) throw new Error(`youtube_${res.status}`);
  return (await res.json()) as T;
}

/** Details of specific videos (also used to re-check a video when it is approved). */
export async function videoDetails(ids: string[], key: string, f: typeof fetch = fetch): Promise<Candidate[]> {
  if (ids.length === 0) return [];
  const data = await get<{ items?: VideoItem[] }>("videos", { part: "snippet,contentDetails,status", id: ids.join(",") }, key, f);
  return (data.items ?? [])
    .filter((v) => v.status?.embeddable === true && v.status.privacyStatus === "public")
    .map((v) => {
      const seconds = parseDuration(v.contentDetails?.duration ?? "");
      return { youtube: v.id, title: v.snippet?.title ?? "", channel: v.snippet?.channelTitle ?? "", seconds, madeForKids: v.status?.madeForKids === true, needsTrim: seconds > 100 };
    })
    .filter((c) => c.seconds > 0);
}

/** Search for child-friendly clips that can be embedded: short ones and made-for-kids ones first. */
export async function searchClips(query: string, key: string, f: typeof fetch = fetch): Promise<Candidate[]> {
  const found = await get<{ items?: { id?: { videoId?: string } }[] }>(
    "search",
    { part: "snippet", type: "video", q: `${query} for kids animated`, maxResults: "20", safeSearch: "strict", videoEmbeddable: "true", videoDuration: "short", relevanceLanguage: "en" },
    key,
    f,
  );
  const ids = (found.items ?? []).map((i) => i.id?.videoId).filter((x): x is string => !!x);
  const details = await videoDetails(ids, key, f);
  const usable = details.filter((c) => c.seconds <= 240);
  return usable.sort((a, b) => Number(a.needsTrim) - Number(b.needsTrim) || Number(b.madeForKids) - Number(a.madeForKids));
}
