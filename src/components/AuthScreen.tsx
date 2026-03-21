import type { FormEvent } from "react";

import { isDemoModeAvailable, isSupabaseEnabled } from "../lib/auth";
import type { AuthMode } from "../types";

interface AuthScreenProps {
  authEmail: string;
  authMode: AuthMode;
  authPassword: string;
  busy: boolean;
  error: string | null;
  notice: string | null;
  onAuthModeChange: (mode: AuthMode) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNavigate: (to: string, options?: { replace?: boolean }) => void;
  onSubmit: (mode: AuthMode, event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function AuthScreen({
  authEmail,
  authMode,
  authPassword,
  busy,
  error,
  notice,
  onAuthModeChange,
  onEmailChange,
  onPasswordChange,
  onNavigate,
  onSubmit,
}: AuthScreenProps) {
  const supabaseEnabled = isSupabaseEnabled();
  const demoModeAvailable = isDemoModeAvailable();

  return (
    <main className="auth-page-shell flex min-h-[calc(100vh-4rem)]" id="main-content">
      <section className="auth-page-panel flex-1 flex flex-col">
        <div className="flex-shrink-0">
          <a
            className="back-link inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/");
            }}
          >
            Back to home
          </a>
        </div>
        
        <div className="flex-1 flex flex-col justify-center p-6">
          <span className="eyebrow inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            JobMind Workspace
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Make your job search feel like a product, not a spreadsheet.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Upload once. Score roles faster. See where your resume is weak before you spend another afternoon applying.
          </p>

          <div className="auth-proof-stack mt-8 flex flex-col sm:flex-row gap-4" aria-hidden="true">
            <article className="auth-proof-card flex-1 flex flex-col items-center p-4 border rounded-lg">
              <small className="text-xs font-medium text-muted-foreground">Role Fit</small>
              <strong className="mt-2 text-2xl font-mono text-primary">81%</strong>
              <p className="mt-2 text-sm text-muted-foreground text-center">match for Fullstack Developer</p>
            </article>
            <article className="auth-proof-card flex-1 flex flex-col items-center p-4 border rounded-lg">
              <small className="text-xs font-medium text-muted-foreground">Next Best Moves</small>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Highlight testing impact, add AWS examples, and consider AI Product Engineer as a parallel path.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="auth-card-premium w-[400px] min-w-[300px]">
        <div className="auth-card-header p-6">
          <span className="section-kicker inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground">
            {supabaseEnabled ? "Supabase Auth" : demoModeAvailable ? "Demo Auth" : "Supabase Required"}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            {authMode === "sign-in" ? "Sign In" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {supabaseEnabled
              ? "Use your existing account to open the workspace."
              : demoModeAvailable
                ? "No Supabase keys detected. Local demo auth is active."
                : "This deployment requires Supabase auth. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."}
          </p>
        </div>

        <div className="auth-mode-toggle flex p-1 bg-muted/50 rounded-lg" aria-label="Authentication mode">
          <button
            className={`mode-toggle-button flex-1 items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted/75 ${authMode === "sign-in" ? "bg-white text-primary" : "text-muted-foreground hover:text-primary"}`}
            type="button"
            aria-pressed={authMode === "sign-in"}
            onClick={() => onAuthModeChange("sign-in")}
          >
            Sign In
          </button>
          <button
            className={`mode-toggle-button flex-1 items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted/75 ${authMode === "sign-up" ? "bg-white text-primary" : "text-muted-foreground hover:text-primary"}`}
            type="button"
            aria-pressed={authMode === "sign-up"}
            onClick={() => onAuthModeChange("sign-up")}
          >
            Create Account
          </button>
        </div>

        <form className="auth-form-premium p-6 space-y-4" onSubmit={(event) => void onSubmit(authMode, event)} noValidate>
          <div className="form-field space-y-2">
            <label htmlFor="auth-email" className="text-sm font-medium text-primary">
              Email
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@company.com…"
              className="input input-primary w-full px-3 py-2 text-sm rounded-md border border-muted/50 bg-background focus:border-primary focus:ring-primary/20"
              value={authEmail}
              onChange={(event) => onEmailChange(event.target.value)}
              required
            />
          </div>

          <div className="form-field space-y-2">
            <label htmlFor="auth-password" className="text-sm font-medium text-primary">
              Password
            </label>
            <input
              id="auth-password"
              name="password"
              type="password"
              autoComplete={authMode === "sign-in" ? "current-password" : "new-password"}
              placeholder="Minimum 8 characters…"
              className="input input-primary w-full px-3 py-2 text-sm rounded-md border border-muted/50 bg-background focus:border-primary focus:ring-primary/20"
              value={authPassword}
              onChange={(event) => onPasswordChange(event.target.value)}
              required
            />
          </div>

          <button className="button button-primary w-full py-2 text-sm font-medium" type="submit" disabled={busy}>
            {busy ? "Loading…" : authMode === "sign-in" ? "Open Workspace" : "Create Account"}
          </button>
        </form>

        <div className="auth-card-footer p-6 text-center text-xs text-muted-foreground">
          <p>
            {authMode === "sign-in" ? "Need an account?" : "Already have an account?"}{" "}
            <button className="inline-link-button text-primary hover:text-primary/80" type="button" onClick={() => onAuthModeChange(authMode === "sign-in" ? "sign-up" : "sign-in")}>
              {authMode === "sign-in" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>

        {error ? <div className="alert alert-destructive p-4">{error}</div> : null}
        {notice ? (
          <div className="alert alert-success p-4" role="status" aria-live="polite">
            {notice}
          </div>
        ) : null}
      </section>
    </main>
  );
}
