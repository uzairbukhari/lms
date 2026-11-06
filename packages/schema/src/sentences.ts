/**
 * How narration splits text into sentences (one voice clip each). The app, the Worker (which caches one mp3 per sentence)
 * and the clip pipeline all use this one function, so they always ask for the same cached audio.
 */
export function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
}
