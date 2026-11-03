import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SessionUser, ThemeId } from "@lms/schema";
import { api } from "./api";
import { setVoiceBlocked } from "./lib/sound";
import { applyTheme, getStoredTheme } from "./theme";

type RecentUser = { username: string; displayName: string; avatar: SessionUser["avatar"] };
const RECENT_KEY = "lms-recent-users";

/** Children who signed in on this device, so the login page can show tiles instead of a list of everyone. */
export function getRecentUsers(): RecentUser[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as RecentUser[];
  } catch {
    return [];
  }
}

function rememberUser(u: SessionUser) {
  try {
    const others = getRecentUsers().filter((r) => r.username !== u.username);
    localStorage.setItem(RECENT_KEY, JSON.stringify([{ username: u.username, displayName: u.displayName, avatar: u.avatar }, ...others].slice(0, 6)));
  } catch {
    // storage blocked: no tiles, the username box still works
  }
}

type AuthState = {
  /** undefined while loading, null when signed out. */
  user: SessionUser | null | undefined;
  login: (username: string, password: string, turnstileToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Switch theme now; also saved to the child's profile when signed in. */
  chooseTheme: (theme: ThemeId) => void;
  theme: ThemeId;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme);
  /** A look picked on the login screen, before signing in. It wins over the one saved on the profile and is then saved there. */
  const pickedBeforeLogin = useRef<ThemeId | null>(null);

  useEffect(() => { setVoiceBlocked(user?.isTest === true); }, [user]);

  useEffect(() => {
    api<{ user: SessionUser | null }>("/api/me")
      .then(({ user: u }) => {
        setUser(u);
        if (u) {
          applyTheme(u.theme);
          setThemeState(u.theme);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const login = useCallback(async (username: string, password: string, turnstileToken?: string) => {
    const { user: u } = await api<{ user: SessionUser }>("/api/login", { body: { username, password, ...(turnstileToken ? { turnstileToken } : {}) } });
    rememberUser(u);
    const picked = pickedBeforeLogin.current;
    pickedBeforeLogin.current = null;
    const chosen = picked ?? u.theme;
    applyTheme(chosen);
    setThemeState(chosen);
    setUser({ ...u, theme: chosen });
    if (picked && picked !== u.theme) api("/api/me/theme", { method: "PATCH", body: { theme: picked } }).catch(() => undefined);
  }, []);

  const logout = useCallback(async () => {
    await api("/api/logout", { method: "POST" }).catch(() => undefined);
    setUser(null);
  }, []);

  const chooseTheme = useCallback(
    (next: ThemeId) => {
      applyTheme(next);
      setThemeState(next);
      if (!user) pickedBeforeLogin.current = next;
      if (user) {
        setUser({ ...user, theme: next });
        api("/api/me/theme", { method: "PATCH", body: { theme: next } }).catch(() => undefined);
      }
    },
    [user],
  );

  const value = useMemo(() => ({ user, login, logout, chooseTheme, theme }), [user, login, logout, chooseTheme, theme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
