import type { SessionUser } from "@lms/schema";
import { isThemeId, DEFAULT_THEME, HOME_CHARACTERS, type HomeCharacter } from "@lms/schema";
import type { AvatarId } from "@lms/schema";
import { usernameBase } from "./words";

export type UserRow = {
  id: string;
  role: "student" | "admin";
  username: string;
  display_name: string;
  password_hash: string | null;
  admin_email: string | null;
  avatar: string | null;
  theme: string;
  home_character: string | null;
  is_active: number;
  must_change_password: number;
  is_test: number;
  preview_date: string | null;
  created_at: string;
};

const RESERVED = new Set(["admin", "administrator", "parent", "teacher", "root", "support"]);

export const toHomeCharacter = (v: string | null): HomeCharacter => ((HOME_CHARACTERS as readonly string[]).includes(v ?? "") ? (v as HomeCharacter) : HOME_CHARACTERS[0]);

export function toSessionUser(row: UserRow): SessionUser {
  return {
    id: row.id,
    role: row.role,
    username: row.username,
    displayName: row.display_name,
    avatar: (row.avatar as AvatarId | null) ?? null,
    theme: isThemeId(row.theme) ? row.theme : DEFAULT_THEME,
    homeCharacter: toHomeCharacter(row.home_character),
    mustChangePassword: row.must_change_password === 1,
    ...(row.is_test === 1 ? { isTest: true } : {}),
  };
}

export function getUserById(db: D1Database, id: string): Promise<UserRow | null> {
  return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<UserRow>();
}

export function getUserByUsername(db: D1Database, username: string): Promise<UserRow | null> {
  return db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first<UserRow>();
}

export function isReservedUsername(username: string): boolean {
  return RESERVED.has(username);
}

/** The first free username built from a display name: maya, maya2, maya3, ... */
export async function uniqueUsername(db: D1Database, displayName: string): Promise<string> {
  let base = usernameBase(displayName);
  if (base.length < 2) base = "student";
  if (RESERVED.has(base)) base = `${base}1`;
  for (let n = 1; n <= 200; n++) {
    const candidate = n === 1 ? base : `${base}${n}`;
    if (candidate.length > 20) break;
    const taken = await db.prepare("SELECT 1 FROM users WHERE username = ?").bind(candidate).first();
    if (!taken) return candidate;
  }
  return `${base.slice(0, 12)}${crypto.randomUUID().replace(/-/g, "").slice(0, 6)}`;
}
