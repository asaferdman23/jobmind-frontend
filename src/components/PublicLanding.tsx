import {
  Bell,
  BarChart2,
  Briefcase,
  CreditCard,
  FileText,
  LayoutDashboard,
  TrendingUp,
  Crosshair,
  Search,
  CheckCircle,
} from "lucide-react";
import { cn } from "../lib/cn";

interface PublicLandingProps {
  onNavigate: (to: string, options?: { replace?: boolean }) => void;
}

export function PublicLanding({ onNavigate }: PublicLandingProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-sans)" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-14 h-[58px] border-b"
        style={{
          background: "rgba(7,7,14,0.55)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.05)",
        }}
      >
        <a
          className="flex items-center gap-2 cursor-pointer"
          href="/"
          onClick={(e) => { e.preventDefault(); onNavigate("/"); }}
        >
          <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 3L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 3z" fill="white" />
            </svg>
          </div>
          <span className="text-[15px] font-extrabold tracking-tight">jobMind</span>
        </a>

        <div className="flex gap-1 ml-8">
          {["Features", "How it works", "Pricing"].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] px-3 py-1.5 rounded-md transition-colors"
              style={{ color: "var(--text-soft)" }}>
              {link}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="px-4 py-1.5 rounded-[7px] text-[13px] font-medium border transition-colors"
            style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
            onClick={() => onNavigate("/auth")}
          >
            Sign in
          </button>
          <button
            className="px-4 py-[7px] rounded-[7px] text-[13px] font-bold text-white border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}
            onClick={() => onNavigate("/auth?mode=signup")}
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100vh", padding: "140px 48px 0" }}
      >
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 900, height: 500, background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2) 0%, transparent 65%)" }} />

        {/* eyebrow badge */}
        <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-[5px] text-xs font-semibold mb-8 border"
          style={{ borderColor: "rgba(99,102,241,0.22)", color: "var(--indigo-light)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"
            style={{ boxShadow: "0 0 6px #ef4444" }} />
          Don&apos;t send your CV blind
        </div>

        {/* headline */}
        <h1 className="relative font-black leading-[1.02] tracking-[-3px] mb-5"
          style={{ fontSize: 72, color: "var(--text)" }}>
          Is your CV good enough<br />
          <span style={{ background: "linear-gradient(135deg, #818cf8 10%, #c4b5fd 70%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            to get the interview?
          </span>
        </h1>

        {/* sub */}
        <p className="text-lg leading-relaxed mb-10 max-w-[440px]" style={{ color: "var(--text-mid)" }}>
          Get your match score against any role — and know exactly what to fix — before you apply.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <button
            className="px-8 py-[14px] rounded-[10px] text-[15px] font-extrabold text-white border-none cursor-pointer tracking-tight"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", boxShadow: "0 0 44px rgba(99,102,241,0.45), 0 6px 20px rgba(0,0,0,0.3)" }}
            onClick={() => onNavigate("/auth?intent=analysis")}
          >
            Check my CV free →
          </button>
          <a
            href="#product-screenshot"
            className="px-6 py-[14px] rounded-[10px] text-[15px] font-medium border cursor-pointer"
            style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
          >
            See a sample
          </a>
        </div>
        <p className="text-xs mb-16" style={{ color: "var(--text-soft)" }}>
          No account needed &nbsp;·&nbsp; 60 seconds &nbsp;·&nbsp; Free
        </p>

        {/* product screenshot */}
        <div id="product-screenshot" className="relative w-full max-w-[1040px] mx-auto">
          <ProductScreenshot />
        </div>
      </section>

      {/* ── TRUST ── */}
      <div className="max-w-[960px] mx-auto px-12 pt-16 pb-12 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[1.5px] mb-5"
          style={{ color: "var(--text-soft)" }}>
          Candidates from these companies have used jobMind
        </p>
        <div className="flex justify-center gap-10 flex-wrap">
          {["STRIPE", "GOOGLE", "LINEAR", "FIGMA", "VERCEL"].map((co) => (
            <span key={co} className="text-xs font-bold tracking-[2px] opacity-40"
              style={{ color: "var(--text-soft)" }}>{co}</span>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── FEATURES ── */}
      <section id="how-it-works" className="max-w-[1100px] mx-auto px-12 py-20">
        <p className="text-[11px] font-bold uppercase tracking-[2px] text-center mb-4"
          style={{ color: "var(--indigo-light)" }}>How it works</p>
        <h2 className="text-[40px] font-black tracking-[-1.5px] leading-[1.08] text-center mb-4">
          Three steps.<br />One clear answer.
        </h2>
        <p className="text-base leading-relaxed text-center max-w-[460px] mx-auto mb-14"
          style={{ color: "var(--text-mid)" }}>
          No fluff. A real score against the real job — and exactly what to fix before you apply.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: FileText, title: "Upload your CV", desc: "Drop your PDF or paste your text. Our parser extracts your skills, experience, and achievements instantly." },
            { icon: Search, title: "Set your target role", desc: "Tell us the title you're going after. We match your profile against thousands of live job descriptions." },
            { icon: CheckCircle, title: "Know before you apply", desc: "A precise match score, ranked skill gaps, and specific fixes. Send only when you're ready." },
          ].map(({ icon: Icon, title, desc }) => (
            <FeatureCard key={title} icon={<Icon size={20} strokeWidth={1.8} color="var(--indigo-light)" />} title={title} desc={desc} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-[820px] mx-auto px-12 py-20">
        <p className="text-[11px] font-bold uppercase tracking-[2px] text-center mb-4"
          style={{ color: "var(--indigo-light)" }}>Pricing</p>
        <h2 className="text-[40px] font-black tracking-[-1.5px] leading-[1.08] text-center mb-4">
          Start free. No tricks.
        </h2>
        <p className="text-base leading-relaxed text-center max-w-[460px] mx-auto mb-14"
          style={{ color: "var(--text-mid)" }}>
          Your first analysis is free. Upgrade when your search gets serious.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <PricingCard
            plan="Free" price="$0" period="forever"
            features={["2 analyses per day", "Top 5 job matches", "Basic skill gap breakdown"]}
            missing={["Career alternatives", "Daily digest & alerts", "Unlimited analyses"]}
            cta="Get started free"
            onCta={() => onNavigate("/auth")}
          />
          <PricingCard
            plan="Pro" price="$19" period="per month · cancel anytime"
            features={["Unlimited analyses", "All job matches", "Full AI suggestions", "Career alternatives", "Daily digest & alerts", "Priority support"]}
            missing={[]}
            cta="Start 7-day free trial"
            onCta={() => onNavigate("/auth?mode=signup&intent=pro")}
            featured
          />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="max-w-[820px] mx-auto px-12 mb-20">
        <div className="relative rounded-[18px] px-16 py-16 text-center overflow-hidden border"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.11), rgba(139,92,246,0.07))", borderColor: "rgba(99,102,241,0.25)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.6), transparent)" }} />
          <h2 className="text-[34px] font-black tracking-[-1.2px] leading-[1.1] mb-3">
            Check your CV before<br />your next application.
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "var(--text-mid)" }}>
            Free · No account needed · 60 seconds to your score.
          </p>
          <button
            className="px-8 py-[14px] rounded-[10px] text-[15px] font-extrabold text-white border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", boxShadow: "0 0 44px rgba(99,102,241,0.45)" }}
            onClick={() => onNavigate("/auth?intent=analysis")}
          >
            Check my CV now
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t px-14 py-7 flex items-center justify-between max-w-[1200px] mx-auto"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <span className="text-xs" style={{ color: "var(--text-soft)" }}>© 2026 jobMind</span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="text-xs" style={{ color: "var(--text-soft)" }}>{l}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}

/* ── Sub-components ── */

function Divider() {
  return (
    <div className="max-w-[1100px] mx-auto px-12">
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative rounded-[13px] p-7 overflow-hidden border"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
      <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-[18px] border"
        style={{ background: "var(--indigo-dim)", borderColor: "rgba(99,102,241,0.22)" }}>
        {icon}
      </div>
      <div className="text-base font-bold mb-2 tracking-tight">{title}</div>
      <p className="text-[13px] leading-[1.68]" style={{ color: "var(--text-mid)" }}>{desc}</p>
    </div>
  );
}

function PricingCard({
  plan, price, period, features, missing, cta, onCta, featured = false,
}: {
  plan: string; price: string; period: string;
  features: string[]; missing: string[];
  cta: string; onCta: () => void; featured?: boolean;
}) {
  return (
    <div
      className={cn("relative rounded-2xl p-8 border overflow-hidden", featured && "border-[rgba(99,102,241,0.32)]")}
      style={{
        background: featured
          ? "linear-gradient(135deg, rgba(99,102,241,0.09), rgba(139,92,246,0.05))"
          : "var(--surface)",
        borderColor: featured ? undefined : "var(--border)",
      }}
    >
      {featured && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #818cf8, transparent)" }} />
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.8px] text-white rounded-[5px] px-2 py-[3px] mb-[18px]"
            style={{ background: "var(--indigo)" }}>
            Most popular
          </span>
        </>
      )}
      <div className="text-sm font-semibold mb-1.5" style={{ color: "var(--text-mid)" }}>{plan}</div>
      <div className="font-mono text-[44px] font-extrabold leading-none mb-1"
        style={featured ? { background: "linear-gradient(135deg,#818cf8,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "var(--text)" }}>
        {price}
      </div>
      <div className="text-xs mb-6" style={{ color: "var(--text-soft)" }}>{period}</div>
      <ul className="flex flex-col gap-2 mb-7">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-mid)" }}>
            <span className="text-[11px] font-bold" style={{ color: "var(--success)" }}>✓</span> {f}
          </li>
        ))}
        {missing.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-soft)" }}>
            <span className="text-[11px]" style={{ color: "var(--text-soft)" }}>—</span> {f}
          </li>
        ))}
      </ul>
      <button
        className="w-full py-[13px] rounded-[9px] text-sm font-bold cursor-pointer border-none"
        style={featured
          ? { background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", boxShadow: "0 0 28px rgba(99,102,241,0.35)" }
          : { background: "transparent", color: "var(--text-mid)", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={onCta}
      >
        {cta}
      </button>
    </div>
  );
}

/* ProductScreenshot renders the dark app mockup that mirrors the real AppShell */
function ProductScreenshot() {
  return (
    <div className="relative rounded-[14px] overflow-hidden border"
      style={{
        background: "var(--surface)",
        borderColor: "rgba(99,102,241,0.18)",
        boxShadow: "0 0 80px rgba(99,102,241,0.1), 0 60px 120px rgba(0,0,0,0.6)",
      }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(129,140,248,0.65) 50%, transparent 95%)" }} />

      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-[10px] border-b" style={{ background: "#09091a", borderColor: "var(--border)" }}>
        <div className="w-[11px] h-[11px] rounded-full bg-red-500" />
        <div className="w-[11px] h-[11px] rounded-full bg-yellow-500" />
        <div className="w-[11px] h-[11px] rounded-full bg-green-500" />
        <div className="flex-1 rounded-md px-3 py-1 text-[11px] text-center font-mono"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-soft)" }}>
          app.jobmind.ai — Workspace / Career Intelligence
        </div>
      </div>

      {/* app shell preview — 480px tall */}
      <div className="grid" style={{ gridTemplateColumns: "196px 1fr", height: 480 }}>

        {/* sidebar */}
        <aside className="flex flex-col border-r" style={{ background: "#08081a", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 px-3 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 3L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 3z" fill="white" /></svg>
            </div>
            <span className="text-xs font-extrabold">JobMind</span>
          </div>

          <nav className="flex-1 p-2 flex flex-col gap-px overflow-hidden">
            {[
              { label: "Overview", active: true, Icon: LayoutDashboard },
              { label: "Resume", Icon: FileText },
              { label: "Target Role", Icon: Crosshair },
              { label: "Analysis", Icon: BarChart2 },
              { label: "Matches", Icon: Briefcase, badge: "12" },
              { label: "Alternatives", Icon: TrendingUp },
              { label: "Digest", Icon: Bell },
              { label: "Billing", Icon: CreditCard },
            ].map(({ label, active, Icon, badge }) => (
              <div key={label}
                className={cn("flex items-center gap-2 px-2.5 py-[6px] rounded-[6px] text-[11.5px] font-medium")}
                style={active
                  ? { background: "var(--indigo-dim)", color: "var(--indigo-light)", border: "1px solid rgba(99,102,241,0.18)" }
                  : { color: "var(--text-soft)" }}>
                <Icon size={13} strokeWidth={2} style={{ opacity: active ? 1 : 0.6, flexShrink: 0 }} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="text-[9px] font-bold text-white rounded-full px-1.5 py-px"
                    style={{ background: "var(--indigo)" }}>{badge}</span>
                )}
              </div>
            ))}
          </nav>

          {/* plan card */}
          <div className="m-2 p-3 rounded-lg border"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))", borderColor: "rgba(99,102,241,0.2)" }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.8px] mb-0.5" style={{ color: "var(--text-soft)" }}>Plan</div>
            <div className="text-[13px] font-bold mb-1">Free</div>
            <div className="text-[9.5px] leading-snug mb-2" style={{ color: "var(--text-soft)" }}>Upgrade for unlimited analyses.</div>
            <button className="w-full text-[10px] font-bold text-white rounded-[5px] py-[5px] border-none"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>Upgrade To Pro</button>
          </div>
        </aside>

        {/* main */}
        <div className="flex flex-col overflow-hidden" style={{ background: "var(--bg)" }}>
          {/* topbar */}
          <div className="flex items-center gap-3 px-4 border-b flex-shrink-0"
            style={{ height: 50, borderColor: "var(--border)", background: "rgba(7,7,14,0.7)" }}>
            <span className="text-[10px]" style={{ color: "var(--text-soft)" }}>Workspace</span>
            <span className="text-[10px]" style={{ color: "var(--text-soft)" }}>/</span>
            <span className="text-xs font-bold">Career Intelligence</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border text-[10px]"
                style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text-mid)" }}>
                <span>user@gmail.com</span>
                <span className="font-bold" style={{ color: "var(--indigo-light)" }}>Free</span>
              </div>
              <button className="text-[10px] px-2 py-1 rounded border"
                style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.07)", background: "transparent" }}>
                Sign Out
              </button>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {/* overview hero */}
            <div className="rounded-[10px] border p-4 grid gap-3"
              style={{ background: "var(--surface)", borderColor: "var(--border)", gridTemplateColumns: "1fr 160px" }}>
              <div>
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.8px] rounded-full px-2 py-0.5 mb-2 border"
                  style={{ color: "var(--indigo-light)", background: "var(--indigo-dim)", borderColor: "rgba(99,102,241,0.2)" }}>
                  Overview
                </span>
                <div className="text-[13px] font-bold leading-snug mb-1">Senior Product Designer is your current best-fit lane.</div>
                <p className="text-[10px] leading-relaxed mb-2" style={{ color: "var(--text-soft)" }}>
                  Add AWS Cloud to your resume summary and mention cross-functional collaboration.
                </p>
                <div className="flex gap-2">
                  <button className="text-[10px] font-bold text-white rounded-[5px] px-2.5 py-[5px] border-none"
                    style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>Run Analysis</button>
                  <button className="text-[10px] px-2.5 py-[5px] rounded-[5px] border"
                    style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}>Jump To Matches</button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg p-3 border"
                style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))", borderColor: "rgba(99,102,241,0.22)" }}>
                <span className="text-[8px] font-bold uppercase tracking-[0.8px] mb-1" style={{ color: "var(--text-soft)" }}>Current Match Score</span>
                <strong className="font-mono text-[28px] font-extrabold leading-none"
                  style={{ background: "linear-gradient(135deg,#818cf8,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  87%
                </strong>
                <span className="text-[9px] text-center mt-1" style={{ color: "var(--text-soft)" }}>Senior Product Designer</span>
              </div>
            </div>

            {/* metric strip */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Plan", value: "Free", meta: "Active" },
                { label: "Analyses Today", value: "2", meta: "3 remaining" },
                { label: "Latest Match Score", value: "87%", meta: "Senior Product Designer", gradient: true },
              ].map(({ label, value, meta, gradient }) => (
                <div key={label} className="relative rounded-[9px] border p-3 overflow-hidden"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.25),transparent)" }} />
                  <div className="text-[8px] font-semibold uppercase tracking-[1px] mb-1" style={{ color: "var(--text-soft)" }}>{label}</div>
                  <strong className="font-mono text-xl font-bold leading-none block"
                    style={gradient ? { background: "linear-gradient(135deg,#818cf8,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "var(--text)" }}>
                    {value}
                  </strong>
                  <small className="text-[9px]" style={{ color: "var(--text-soft)" }}>{meta}</small>
                </div>
              ))}
            </div>

            {/* workspace grid */}
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 190px" }}>
              {/* primary */}
              <div className="flex flex-col gap-2">
                {/* target role */}
                <div className="rounded-[9px] border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 px-4 py-2 border-b text-[11px] font-bold" style={{ borderColor: "var(--border)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--indigo)", boxShadow: "0 0 5px var(--indigo)" }} />
                    Target Role
                  </div>
                  <div className="p-3">
                    <div className="grid gap-2" style={{ gridTemplateColumns: "1fr auto" }}>
                      <input readOnly value="Senior Product Designer"
                        className="rounded-md px-3 py-2 text-[11px] border outline-none"
                        style={{ background: "var(--surface-2)", borderColor: "rgba(99,102,241,0.2)", color: "var(--text)", fontFamily: "var(--font-sans)" }} />
                      <div className="flex gap-1">
                        <button className="text-[10px] font-bold text-white rounded-[5px] px-2.5 py-2 border-none"
                          style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>Run Analysis</button>
                        <button className="text-[10px] px-2 py-2 rounded-[5px] border"
                          style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* matches */}
                <div className="rounded-[9px] border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--indigo)", boxShadow: "0 0 5px var(--indigo)" }} />
                      Matches
                    </div>
                    <span className="text-[9px]" style={{ color: "var(--indigo-light)" }}>12 found →</span>
                  </div>
                  <div className="p-3 flex flex-col gap-0">
                    {[
                      { title: "Product Designer", co: "Stripe / Remote", score: "92%", tags: ["Figma ✓", "Design Systems ✓"] },
                      { title: "Senior Designer", co: "Linear / Remote", score: "88%", tags: ["Prototyping ✓", "Research ✓"] },
                    ].map(({ title, co, score, tags }) => (
                      <div key={title} className="py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] font-semibold">{title}</div>
                            <div className="text-[9px]" style={{ color: "var(--text-soft)" }}>{co}</div>
                            <div className="flex gap-1 mt-1">
                              {tags.map((t) => (
                                <span key={t} className="text-[8px] px-1.5 py-px rounded" style={{ background: "rgba(16,185,129,0.12)", color: "#34d399" }}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold shrink-0 px-1.5 py-0.5 rounded border"
                            style={{ color: "var(--indigo-light)", background: "var(--indigo-dim)", borderColor: "rgba(99,102,241,0.2)" }}>
                            {score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* secondary */}
              <div className="flex flex-col gap-2">
                {/* alternatives */}
                <div className="rounded-[9px] border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 px-3 py-2 border-b text-[11px] font-bold" style={{ borderColor: "var(--border)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6", boxShadow: "0 0 5px #8b5cf6" }} />
                    Alternatives
                  </div>
                  <div className="p-3 flex flex-col">
                    {[{ role: "UX Lead", score: "91%" }, { role: "Product Manager", score: "78%" }, { role: "Design Engineer", score: "74%" }].map(({ role, score }) => (
                      <div key={role} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <span className="text-[11px] font-semibold">{role}</span>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border"
                          style={{ color: "var(--text-soft)", background: "var(--surface-2)", borderColor: "var(--border)" }}>
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* analysis */}
                <div className="rounded-[9px] border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 px-3 py-2 border-b text-[11px] font-bold" style={{ borderColor: "var(--border)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981", boxShadow: "0 0 5px #10b981" }} />
                    Analysis
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.8px] mb-1.5" style={{ color: "var(--text-soft)" }}>Strengths</div>
                      <div className="flex flex-wrap gap-1">
                        {["Figma", "TypeScript", "Research"].map((s) => (
                          <span key={s} className="text-[8px] px-1.5 py-px rounded border"
                            style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderColor: "rgba(16,185,129,0.2)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.8px] mb-1.5" style={{ color: "var(--text-soft)" }}>Gaps</div>
                      <div className="flex flex-wrap gap-1">
                        {["AWS", "Leadership"].map((s) => (
                          <span key={s} className="text-[8px] px-1.5 py-px rounded border"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", borderColor: "rgba(239,68,68,0.2)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
