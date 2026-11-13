import type { Actor } from "./lib/permissions";
import type { SessionUser } from "@lms/schema";

/** Cloudflare bindings and variables declared in wrangler.jsonc (plus secrets set with `wrangler secret put`). */
export type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
  ASSETS_BUCKET: R2Bucket;
  SESSIONS: KVNamespace;
  /** Workers AI. Missing in local development, so always check before use. */
  AI?: Ai;
  /** "development" turns on the local admin bypass below. Never set it in production. */
  ENVIRONMENT?: string;
  /** Local development only: act as this admin without Cloudflare Access. Ignored unless ENVIRONMENT is "development". */
  DEV_ADMIN_EMAIL?: string;
  /** Your Cloudflare Zero Trust team domain, e.g. "yourteam.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN?: string;
  /** The Audience (AUD) tag of the Cloudflare Access application protecting /admin and /api/admin. */
  ACCESS_AUD?: string;
  /** Client ID of a Cloudflare Access service token that Claude uses to import lessons. Optional. It can only reach the content routes in requireAdmin. */
  ACCESS_SERVICE_TOKEN_ID?: string;
  /** The one email address allowed to be the admin (the parent). */
  ADMIN_EMAIL?: string;
  /** YouTube Data API v3 key (Worker secret), used only by the admin "Suggested videos" screen. */
  YOUTUBE_API_KEY?: string;
  /** Cloudflare Turnstile keys. When both are set, the login page shows a check after a few wrong passwords. */
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET?: string;
  /** IANA timezone that decides when a school week starts, e.g. "Asia/Karachi". Defaults to UTC. */
  TIMEZONE?: string;
  /** Parent PIN that closes the Windows app's focus mode (Worker secret). */
  DESKTOP_EXIT_PIN?: string;
};

export type AdminContext = { userId: string; email: string; actor: Actor };

export type Variables = {
  /** Set by requireStudent: the signed-in child. */
  user: SessionUser;
  /** Set by requireAdmin: the verified admin. */
  admin: AdminContext;
};

export type AppEnv = { Bindings: Bindings; Variables: Variables };
