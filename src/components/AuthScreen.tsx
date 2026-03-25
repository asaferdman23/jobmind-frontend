import type { FormEvent } from "react";
import { cn } from "../lib/cn";

interface AuthScreenProps {
  busy: boolean;
  error: string | null;
  mode: "signin" | "signup";
  notice: string | null;
  onModeChange: (mode: "signin" | "signup") => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function AuthScreen({ busy, error, mode, notice, onModeChange, onSubmit }: AuthScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }}>

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{ width: 700, height: 400, background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 65%)" }} />
      </div>

      {/* brand top-left */}
      <a href="/" className="absolute top-6 left-8 flex items-center gap-2 z-10">
        <div className="w-7 h-7 rounded-[7px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 3z" fill="white" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold">jobMind</span>
      </a>

      {/* auth card */}
      <div className="relative z-10 w-full max-w-[400px] rounded-2xl border p-8"
        style={{ background: "var(--surface)", borderColor: "rgba(99,102,241,0.2)" }}>
        {/* top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.6), transparent)" }} />

        {/* headline */}
        <div className="text-center mb-7">
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">
            {mode === "signin" ? "Welcome back" : "Get started free"}
          </h1>
          <p className="text-sm" style={{ color: "var(--text-mid)" }}>
            {mode === "signin"
              ? "Sign in to your jobMind workspace."
              : "Create your account. No credit card required."}
          </p>
        </div>

        {/* mode toggle */}
        <div className="flex gap-1 p-1 rounded-lg mb-6 border"
          style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
          {(["signin", "signup"] as const).map((m) => (
            <button key={m}
              type="button"
              aria-pressed={mode === m}
              className={cn(
                "flex-1 py-2 rounded-md text-[13px] font-semibold transition-all border-none cursor-pointer",
                mode === m ? "text-white" : "bg-transparent"
              )}
              style={mode === m
                ? { background: "linear-gradient(135deg,#6366f1,#818cf8)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }
                : { color: "var(--text-soft)", background: "transparent" }}
              onClick={() => onModeChange(m)}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* alerts */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm border" role="alert"
            style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)", color: "#f87171" }}>
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm border" role="status"
            style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>
            {notice}
          </div>
        )}

        {/* form */}
        <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--text-soft)" }}>Email</label>
            <input
              id="email" name="email" type="email" autoComplete="email" required
              placeholder="you@company.com"
              className="rounded-[7px] px-3 py-2.5 text-sm border outline-none transition-all"
              style={{ background: "var(--surface-2)", borderColor: "rgba(99,102,241,0.2)", color: "var(--text)", fontFamily: "var(--font-sans)" }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--text-soft)" }}>Password</label>
            <input
              id="password" name="password" type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required minLength={mode === "signup" ? 8 : undefined}
              placeholder={mode === "signin" ? "Your password" : "Min 8 characters"}
              className="rounded-[7px] px-3 py-2.5 text-sm border outline-none transition-all"
              style={{ background: "var(--surface-2)", borderColor: "rgba(99,102,241,0.2)", color: "var(--text)", fontFamily: "var(--font-sans)" }}
            />
          </div>

          <button
            type="submit" disabled={busy} aria-busy={busy}
            className="w-full py-3 rounded-[9px] text-sm font-bold text-white border-none cursor-pointer mt-1 transition-opacity"
            style={{
              background: "linear-gradient(135deg,#6366f1,#818cf8)",
              boxShadow: "0 0 28px rgba(99,102,241,0.35)",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        {/* proof cards */}
        <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-[11px] text-center mb-3" style={{ color: "var(--text-soft)" }}>
            See what jobMind surfaces for your CV
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 border"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
              <span className="text-[11px]" style={{ color: "var(--text-mid)" }}>Match score — Senior Product Designer</span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                style={{ background: "var(--indigo-dim)", color: "var(--indigo-light)", borderColor: "rgba(99,102,241,0.2)" }}>87%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 border"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
              <span className="text-[11px]" style={{ color: "var(--text-mid)" }}>Top gap identified</span>
              <span className="text-[11px] font-semibold" style={{ color: "#fbbf24" }}>AWS Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
