import type { AvatarId } from "@lms/schema";

// Avatar colours are fixed per child and the same in every theme. White initials need 4.5:1, so all are dark enough.
const COLOURS: Record<AvatarId, string> = {
  coral: "#C62F3C",
  orange: "#B85C00",
  gold: "#8A6A00",
  green: "#1B7A3E",
  teal: "#0B6F6F",
  blue: "#2257C9",
  purple: "#6B35C2",
  pink: "#B8156C",
};

export function Avatar({ name, avatar, size = 56 }: { name: string; avatar: AvatarId | null; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white"
      style={{ width: size, height: size, background: COLOURS[avatar ?? "blue"], fontSize: size * 0.45 }}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
