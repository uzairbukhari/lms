import { useAuth } from "../auth";
import { Avatar } from "../components/Avatar";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

// Placeholder home: replaced by the weekly dashboard in Phase 6.
export function StudentHome() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={user.displayName} avatar={user.avatar} size={72} />
          <div>
            <h1 className="font-display text-4xl font-extrabold">Hi, {user.displayName}!</h1>
            <p className="text-lg text-muted">Your lessons will appear here.</p>
          </div>
        </div>
        <button type="button" className="btn" onClick={() => void logout()}>
          Log out
        </button>
      </header>
      <section aria-labelledby="look" className="flex flex-col gap-3">
        <h2 id="look" className="font-display text-2xl font-bold">
          Pick a look
        </h2>
        <ThemeSwitcher />
      </section>
    </main>
  );
}
