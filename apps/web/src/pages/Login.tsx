import { useState, type FormEvent } from "react";
import { ApiError } from "../api";
import { useAuth, getRecentUsers } from "../auth";
import { Avatar } from "../components/Avatar";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Turnstile } from "../components/Turnstile";

export function Login() {
  const { login } = useAuth();
  const recent = getRecentUsers();
  const [username, setUsername] = useState(recent.length === 1 ? (recent[0]?.username ?? "") : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  /** Set when the server asks for a Turnstile check (after a few wrong passwords). */
  const [siteKey, setSiteKey] = useState("");
  const [token, setToken] = useState("");
  const [resets, setResets] = useState(0);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(username, password, token || undefined);
    } catch (err) {
      if (err instanceof ApiError && err.code === "challenge_required" && typeof err.body.siteKey === "string") setSiteKey(err.body.siteKey);
      setError(err instanceof Error ? err.message : "Please try again.");
      setPassword("");
      if (siteKey) setResets((n) => n + 1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-4 py-8">
      <h1 className="text-center font-display text-4xl font-extrabold sm:text-5xl">Learning Adventures</h1>

      {recent.length > 0 && (
        <section aria-label="Who is learning today?" className="flex flex-col gap-3">
          <h2 className="text-center font-display text-2xl font-bold">Who is learning today?</h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {recent.map((r) => (
              <li key={r.username}>
                <button
                  type="button"
                  className="btn flex items-center gap-3 py-2"
                  aria-pressed={username === r.username}
                  onClick={() => setUsername(r.username)}
                >
                  <Avatar name={r.displayName} avatar={r.avatar} size={44} />
                  {r.displayName}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="pick-look" className="flex flex-col items-center gap-3">
        <h2 id="pick-look" className="font-display text-2xl font-bold">🎨 Pick your look</h2>
        <ThemeSwitcher />
      </section>

      <form onSubmit={submit} className="card flex flex-col gap-4 p-6">
        <label className="flex flex-col gap-1 text-lg font-bold">
          My username
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-lg font-bold">
          My password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {siteKey && <Turnstile siteKey={siteKey} onToken={setToken} resetKey={resets} />}
        {error && (
          <p role="alert" className="text-lg font-bold">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy || (Boolean(siteKey) && !token)}>
          {busy ? "Checking…" : "Let's go!"}
        </button>
      </form>
    </main>
  );
}
