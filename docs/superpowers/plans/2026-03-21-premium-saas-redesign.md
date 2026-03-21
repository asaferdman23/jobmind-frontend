# Premium SaaS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate jobMind frontend from light-mode custom CSS to a dark premium SaaS design using Tailwind CSS v4 + shadcn/ui, matching the approved mockups.

**Architecture:** Install Tailwind v4 (Vite plugin, no PostCSS needed), initialise shadcn/ui via CLI, replace `styles.css` with `globals.css` containing Tailwind directives + CSS variables, then rewrite the three UI components (`PublicLanding`, `AuthScreen`, `AppShell`) in Tailwind utility classes. No business logic changes.

**Tech Stack:** React 18, TypeScript 5, Vite 6, Tailwind CSS v4, shadcn/ui (Button/Input/Badge/Card), lucide-react icons, clsx + tailwind-merge.

**Approved design:** Dark background `#07070e`, indigo accent `#6366f1`/`#818cf8`, Inter + JetBrains Mono fonts. See mockups at `.superpowers/brainstorm/*/mockup-landing-v5.html` and `mockup-appshell.html`.

**Spec:** `docs/superpowers/specs/2026-03-21-premium-saas-redesign.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/globals.css` | Tailwind v4 import + CSS variable overrides for dark theme |
| Delete | `src/styles.css` | Old 1431-line custom CSS — removed entirely |
| Modify | `src/main.tsx` | Update CSS import path |
| Modify | `vite.config.ts` | Add `@tailwindcss/vite` plugin |
| Modify | `src/types.ts` | `ThemeMode = "dark"`, add `icon` to `WorkspaceNavItem` |
| Modify | `src/config/ui.ts` | `appThemeMode = "dark"`, add icon names to nav items |
| Create | `src/lib/cn.ts` | `cx()` utility (clsx + tailwind-merge) |
| Create | `src/components/ui/` | shadcn/ui generated components (Button, Input, Badge, Card) |
| Rewrite | `src/components/PublicLanding.tsx` | Dark landing page |
| Rewrite | `src/components/AuthScreen.tsx` | Dark auth screen |
| Rewrite | `src/components/AppShell.tsx` | Dark workspace shell |
| Modify | `index.html` | Google Fonts (Inter + JetBrains Mono) |

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install Tailwind v4 + Vite plugin**

```bash
cd /Users/user/Desktop/jobMind/frontend
npm install tailwindcss @tailwindcss/vite
```

Expected: `tailwindcss` and `@tailwindcss/vite` appear in `package.json` dependencies.

- [ ] **Step 2: Install icon library + utility helpers**

```bash
npm install lucide-react clsx tailwind-merge
```

- [ ] **Step 3: Verify install**

```bash
npm ls tailwindcss lucide-react clsx tailwind-merge
```

Expected: all four packages listed with versions, no peer dep errors.

---

## Task 2: Wire Tailwind into Vite

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Update vite.config.ts**

Replace the full file content:

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
```

- [ ] **Step 2: Verify Vite starts without error**

```bash
npm run dev
```

Expected: server starts at `http://127.0.0.1:5173`. App may look unstyled — that's expected until globals.css is created.

- [ ] **Step 3: Stop dev server (Ctrl+C)**

---

## Task 3: Create globals.css + update main.tsx

**Files:**
- Create: `src/globals.css`
- Delete: `src/styles.css` (after globals.css is confirmed working)
- Modify: `src/main.tsx`

- [ ] **Step 1: Create src/globals.css**

```css
@import "tailwindcss";

/* ── Dark theme CSS variables ── */
:root {
  --bg: #07070e;
  --surface: #0c0c18;
  --surface-2: #10101f;
  --border: rgba(99, 102, 241, 0.13);
  --border-soft: rgba(255, 255, 255, 0.07);
  --indigo: #6366f1;
  --indigo-light: #818cf8;
  --indigo-dim: rgba(99, 102, 241, 0.14);
  --text: #f1f5f9;
  --text-mid: #94a3b8;
  --text-soft: #64748b;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --radius: 10px;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  color-scheme: dark;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface-2); border-radius: 2px; }

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--indigo);
  outline-offset: 2px;
}

/* Skip link for accessibility */
.skip-link {
  position: fixed;
  top: -100%;
  left: 16px;
  z-index: 9999;
  background: var(--indigo);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}
.skip-link:focus {
  top: 16px;
}
```

- [ ] **Step 2: Update src/main.tsx — swap CSS import**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 3: Delete old styles.css**

```bash
rm /Users/user/Desktop/jobMind/frontend/src/styles.css
```

- [ ] **Step 4: Verify build still compiles**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/globals.css src/main.tsx vite.config.ts package.json package-lock.json
git commit -m "feat: add Tailwind v4, wire globals.css, remove legacy styles"
```

---

## Task 4: Add Google Fonts + update types

**Files:**
- Modify: `index.html`
- Modify: `src/types.ts`
- Modify: `src/config/ui.ts`
- Create: `src/lib/cn.ts`

- [ ] **Step 1: Add fonts to index.html**

In `index.html`, add inside `<head>` before the closing tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update ThemeMode in src/types.ts**

Find the line:
```ts
export type ThemeMode = "light";
```
Replace with:
```ts
export type ThemeMode = "dark";
```

Also find `WorkspaceNavItem` type and add an `icon` field:
```ts
export interface WorkspaceNavItem {
  id: WorkspaceNavId;
  label: string;
  href: string;
  icon: string; // lucide-react icon name
}
```

- [ ] **Step 3: Update src/config/ui.ts**

Replace `appThemeMode` and add icon names to nav items:

```ts
export const appThemeMode: ThemeMode = "dark";

export const workspaceNavItems: WorkspaceNavItem[] = [
  { id: "overview",      label: "Overview",     href: "#overview",      icon: "LayoutDashboard" },
  { id: "resume",        label: "Resume",        href: "#resume",        icon: "FileText" },
  { id: "role",          label: "Target Role",   href: "#role",          icon: "Crosshair" },
  { id: "analysis",      label: "Analysis",      href: "#analysis",      icon: "BarChart2" },
  { id: "matches",       label: "Matches",       href: "#matches",       icon: "Briefcase" },
  { id: "alternatives",  label: "Alternatives",  href: "#alternatives",  icon: "TrendingUp" },
  { id: "digest",        label: "Digest",        href: "#digest",        icon: "Bell" },
  { id: "billing",       label: "Billing",       href: "#billing",       icon: "CreditCard" },
];
```

- [ ] **Step 4: Create src/lib/cn.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npm run build
```

Expected: no TS errors.

- [ ] **Step 6: Commit**

```bash
git add index.html src/types.ts src/config/ui.ts src/lib/cn.ts
git commit -m "feat: update types for dark theme, add icon field to nav, add cn utility"
```

---

## Task 5: shadcn/ui init + generate components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init
```

When prompted, answer:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**
- tailwind.config location: press Enter (Tailwind v4 auto-detected)
- components alias: `@/components`
- utils alias: `@/lib/utils`

> Note: shadcn will create a `components.json` config file and may update `globals.css`. If it overwrites CSS variables, re-add the dark theme variables from Task 3 Step 1 after this step.

- [ ] **Step 2: Add components**

```bash
npx shadcn@latest add button input badge card
```

Expected: files created at `src/components/ui/{button,input,badge,card}.tsx`.

- [ ] **Step 3: Verify globals.css still has dark variables**

Check `src/globals.css` still contains `--bg: #07070e`. If shadcn overwrote it, re-add the variables block from Task 3 Step 1.

- [ ] **Step 4: Smoke test**

```bash
npm run dev
```

Expected: app loads, no console errors about missing modules.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ components.json src/globals.css
git commit -m "feat: add shadcn/ui components (button, input, badge, card)"
```

---

## Task 6: Rewrite PublicLanding.tsx

**Files:**
- Rewrite: `src/components/PublicLanding.tsx`

This is the marketing page. Structure mirrors `mockup-landing-v5.html` exactly.

### Sections (top → bottom):
1. `<Nav>` — fixed top bar, brand + links + sign in / get started
2. `<Hero>` — eyebrow badge, h1, sub, 2 CTAs, hero note, product screenshot
3. `<Trust>` — company logos strip
4. `<Features>` — 3-column how-it-works cards
5. `<CTA>` — conversion banner
6. `<Footer>` — links

- [ ] **Step 1: Write the component**

```tsx
import {
  Bell,
  BarChart2,
  Briefcase,
  CreditCard,
  FileText,
  LayoutDashboard,
  TrendingUp,
  Crosshair,
  FileCheck,
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
          Don't send your CV blind
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
        <span className="text-xs" style={{ color: "var(--text-soft)" }}>© 2025 jobMind</span>
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
```

- [ ] **Step 2: Verify it renders**

```bash
npm run dev
```

Navigate to `http://127.0.0.1:5173/` — landing page should show dark hero with product screenshot.

- [ ] **Step 3: Fix any TypeScript errors**

```bash
npm run build 2>&1 | head -50
```

Fix all reported errors before continuing.

- [ ] **Step 4: Commit**

```bash
git add src/components/PublicLanding.tsx
git commit -m "feat: rewrite PublicLanding with dark premium SaaS design"
```

---

## Task 7: Rewrite AuthScreen.tsx

**Files:**
- Rewrite: `src/components/AuthScreen.tsx`

Mirrors current props signature exactly — only visual changes.

- [ ] **Step 1: Write the component**

```tsx
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
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
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
              className={cn(
                "flex-1 py-2 rounded-md text-[13px] font-semibold transition-all border-none cursor-pointer",
                mode === m ? "text-white" : "bg-transparent"
              )}
              style={mode === m
                ? { background: "linear-gradient(135deg,#6366f1,#818cf8)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }
                : { color: "var(--text-soft)", background: "transparent" }}
              onClick={() => onModeChange(m)}
              type="button"
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* alerts */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm border"
            style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)", color: "#f87171" }}>
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm border"
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
              required minLength={8}
              placeholder={mode === "signin" ? "Your password" : "Min 8 characters"}
              className="rounded-[7px] px-3 py-2.5 text-sm border outline-none transition-all"
              style={{ background: "var(--surface-2)", borderColor: "rgba(99,102,241,0.2)", color: "var(--text)", fontFamily: "var(--font-sans)" }}
            />
          </div>

          <button
            type="submit" disabled={busy}
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
```

- [ ] **Step 2: Check existing AuthScreen props signature in App.tsx**

The current component receives: `busy`, `error`, `mode`, `notice`, `onModeChange`, `onSubmit`. Confirm the new component matches exactly.

- [ ] **Step 3: Verify in browser**

Navigate to `http://127.0.0.1:5173/auth` — dark card with mode toggle should render.

- [ ] **Step 4: Commit**

```bash
git add src/components/AuthScreen.tsx
git commit -m "feat: rewrite AuthScreen with dark premium design"
```

---

## Task 8: Rewrite AppShell.tsx

**Files:**
- Rewrite: `src/components/AppShell.tsx`

This is the main workspace. All props from the existing interface are preserved exactly — only visual changes.

- [ ] **Step 1: Verify current props interface**

Read the top of `src/components/AppShell.tsx` and confirm the `AppShellProps` interface. The rewrite must accept identical props.

- [ ] **Step 2: Write the new AppShell**

The component structure:
```
AppShell
├── <aside> workspace-sidebar
│   ├── brand mark (shield icon + "JobMind")
│   ├── <nav> workspaceNavItems.map() — icon + label + optional badge
│   └── plan upgrade card
├── <div> workspace-stage
│   ├── <header> topbar (breadcrumb + user chip + sign out)
│   ├── alert stack (error / notice)
│   └── <main>
│       ├── section#overview — overview-hero (copy + score badge)
│       ├── section metric-strip — 3 metric cards
│       ├── workspace-grid
│       │   ├── primary column
│       │   │   ├── section#resume — upload zone + resume summary
│       │   │   ├── section#role — target role field-row
│       │   │   ├── section#analysis — strengths + gaps chips + suggestions
│       │   │   └── section#matches — job match cards
│       │   └── secondary column
│       │       ├── section#alternatives
│       │       ├── section#digest
│       │       └── section#billing
```

Key design patterns to apply throughout:
- All section panels: `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`
- Section headers: `border-bottom: 1px solid var(--border)`, `padding: 14px 18px`, colored dot + title
- Colored glowing dots per section: indigo for overview/role, green for resume/analysis/matches, purple for alternatives, amber for digest, muted for billing
- Score chips: `font-mono`, indigo background + text
- Strength chips: green (`rgba(16,185,129,…)`)
- Warning/gap chips: amber (`rgba(245,158,11,…)`)
- Upload zone: dashed indigo border, `rgba(99,102,241,0.03)` background
- Metric cards: top gradient line, monospace value
- Job match cards: logo initial circle + title/company + score chip + strength chips

Full component code follows the same Tailwind + CSS variable patterns established in PublicLanding. Use inline `style` for CSS variable references since Tailwind v4 doesn't know about custom properties by default.

> **Note for implementer:** The AppShell component is large (~400 lines). Break it into local sub-components defined in the same file: `SectionPanel`, `MetricCard`, `JobMatchCard`, `AlternativeCard`, `NavItem`. This keeps each piece readable.

- [ ] **Step 3: Implement SectionPanel sub-component first**

```tsx
function SectionPanel({
  id, title, dotColor = "var(--indigo)", children, action,
}: {
  id: string;
  title: string;
  dotColor?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-[var(--radius)] border overflow-hidden"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between px-[18px] py-[14px] border-b"
        style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="w-[7px] h-[7px] rounded-full flex-shrink-0"
            style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
          {title}
        </div>
        {action}
      </div>
      <div className="px-[18px] py-4">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Implement MetricCard sub-component**

```tsx
function MetricCard({ label, value, meta, gradient = false }: {
  label: string; value: string; meta: string; gradient?: boolean;
}) {
  return (
    <article className="relative rounded-[9px] border p-[14px] flex flex-col gap-1 overflow-hidden"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.25),transparent)" }} />
      <span className="text-[10px] font-semibold uppercase tracking-[1px]" style={{ color: "var(--text-soft)" }}>{label}</span>
      <strong className="font-mono text-2xl font-bold leading-none"
        style={gradient
          ? { background: "linear-gradient(135deg,#818cf8,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
          : { color: "var(--text)" }}>
        {value}
      </strong>
      <small className="text-[10px]" style={{ color: "var(--text-soft)" }}>{meta}</small>
    </article>
  );
}
```

- [ ] **Step 5: Implement NavItem sub-component**

```tsx
import * as LucideIcons from "lucide-react";

function NavItem({ item, active }: { item: WorkspaceNavItem; active: boolean }) {
  // Dynamically resolve the icon by name
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[item.icon];
  return (
    <a
      href={item.href}
      className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] text-[13px] font-medium transition-colors no-underline"
      style={active
        ? { background: "var(--indigo-dim)", color: "var(--indigo-light)", border: "1px solid rgba(99,102,241,0.18)" }
        : { color: "var(--text-soft)" }}
    >
      {Icon && <Icon size={15} strokeWidth={2} style={{ opacity: active ? 1 : 0.6, flexShrink: 0 }} />}
      <span className="flex-1">{item.label}</span>
    </a>
  );
}
```

- [ ] **Step 6: Assemble the full AppShell**

```tsx
export function AppShell({
  analysis, alternatives, billingEnabled, busy, error, matches, notice,
  notifications, onAnalyze, onLogout, onNavigate, onResumeUpload,
  onTargetRoleChange, onTargetRoleSave, onUpgrade, profile, resume, session, targetRole,
}: AppShellProps) {
  const plan = profile?.subscription.plan === "pro" ? "Pro" : "Free";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)", fontFamily: "var(--font-sans)", color: "var(--text)" }}>

      {/* ── SIDEBAR ── */}
      <aside
        className="w-[220px] flex-shrink-0 flex flex-col border-r h-full overflow-hidden"
        style={{ background: "#08081a", borderColor: "var(--border)" }}
      >
        {/* brand */}
        <div className="flex items-center gap-2 px-4 py-[18px] border-b" style={{ borderColor: "var(--border)" }}>
          <a
            className="flex items-center gap-2 cursor-pointer no-underline"
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate("/"); }}
          >
            <div className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path d="M12 3L4 7v5c0 4.5 3.3 8.7 8 9.9 4.7-1.2 8-5.4 8-9.9V7L12 3z" fill="white" />
              </svg>
            </div>
            <span className="text-[15px] font-extrabold tracking-tight" style={{ color: "var(--text)" }}>JobMind</span>
          </a>
        </div>

        {/* nav */}
        <nav className="flex-1 p-2 flex flex-col gap-px overflow-y-auto" aria-label="Workspace sections">
          {workspaceNavItems.map((item) => (
            <NavItem key={item.id} item={item} active={false} />
          ))}
        </nav>

        {/* plan card */}
        <div className="m-2 p-3 rounded-[10px] border" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))", borderColor: "rgba(99,102,241,0.2)" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.8px] mb-0.5" style={{ color: "var(--text-soft)" }}>Plan</div>
          <div className="text-[13px] font-bold mb-1">{plan}</div>
          <p className="text-[9.5px] leading-snug mb-2" style={{ color: "var(--text-soft)" }}>
            {billingEnabled
              ? "Upgrade for unlimited analyses and a premium daily digest."
              : "Billing is disabled during private beta."}
          </p>
          {billingEnabled && (
            <button
              className="w-full text-[10px] font-bold text-white rounded-[5px] py-[5px] border-none cursor-pointer"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
              type="button"
              onClick={() => void onUpgrade()}
              disabled={busy}
            >
              Upgrade To Pro
            </button>
          )}
        </div>
      </aside>

      {/* ── STAGE ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* topbar */}
        <header className="flex items-center gap-3 px-6 border-b flex-shrink-0"
          style={{ height: 52, borderColor: "var(--border)", background: "rgba(7,7,14,0.8)", backdropFilter: "blur(12px)" }}>
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--text-soft)" }}>Workspace / Career Intelligence</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 rounded-full px-3 py-1 border text-[11px]"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-mid)" }}>
              <span className="font-medium truncate max-w-[160px]">{session.email}</span>
              <span className="font-bold" style={{ color: "var(--indigo-light)" }}>{plan}</span>
            </div>
            <button
              className="text-[11px] px-3 py-1.5 rounded-md border cursor-pointer"
              style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
              type="button"
              onClick={() => void onLogout()}
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* alerts */}
        <div aria-live="polite" className="px-6 pt-3 flex flex-col gap-2 flex-shrink-0">
          {error && (
            <div className="px-4 py-3 rounded-lg text-sm border" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)", color: "#f87171" }}>{error}</div>
          )}
          {notice && (
            <div className="px-4 py-3 rounded-lg text-sm border" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>{notice}</div>
          )}
        </div>

        {/* scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-5" id="main-content">

          {/* Overview hero */}
          <section id="overview"
            className="rounded-[var(--radius)] border p-5 grid gap-4 items-center"
            style={{ background: "var(--surface)", borderColor: "var(--border)", gridTemplateColumns: "1fr 220px" }}>
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.8px] rounded-full px-2.5 py-0.5 mb-3 border"
                style={{ color: "var(--indigo-light)", background: "var(--indigo-dim)", borderColor: "rgba(99,102,241,0.2)" }}>
                Overview
              </span>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                {analysis ? `${analysis.target_role} is your current best-fit lane.` : "Upload your resume and start with one target role."}
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-mid)" }}>
                {analysis ? analysis.suggestions[0] : "jobMind keeps resume parsing, role fit, matched openings, alternatives, and daily digests in one premium workspace."}
              </p>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-[7px] text-sm font-bold text-white border-none cursor-pointer"
                  style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
                  type="button"
                  onClick={() => void onAnalyze()}
                  disabled={busy}
                >
                  {busy ? "Analyzing…" : "Run Analysis"}
                </button>
                <a className="px-4 py-2 rounded-[7px] text-sm font-medium border cursor-pointer no-underline"
                  style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
                  href="#matches">
                  Jump To Matches
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl p-4 border gap-2"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.06))", borderColor: "rgba(99,102,241,0.22)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.8px]" style={{ color: "var(--text-soft)" }}>Current Match Score</span>
              <strong className="font-mono text-4xl font-extrabold leading-none"
                style={{ background: "linear-gradient(135deg,#818cf8,#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {analysis ? formatPercent(analysis.match_score) : "—"}
              </strong>
              <span className="text-xs text-center" style={{ color: "var(--text-soft)" }}>{analysis?.target_role || "Waiting for first analysis"}</span>
            </div>
          </section>

          {/* Metric strip */}
          <section className="grid grid-cols-3 gap-3" aria-label="Key metrics">
            {metricCardConfigs.map((metric) => {
              const { value, meta } = metricContent(metric.id, profile, analysis);
              return (
                <MetricCard
                  key={metric.id}
                  label={metric.label}
                  value={value}
                  meta={meta}
                  gradient={metric.id === "score"}
                />
              );
            })}
          </section>

          {/* Workspace grid */}
          <div className="grid gap-5" style={{ gridTemplateColumns: "1.55fr 0.95fr" }}>

            {/* Primary column */}
            <div className="flex flex-col gap-5">

              {/* Resume */}
              <SectionPanel id="resume" title="Resume" dotColor="#10b981">
                <label htmlFor="resume-file" className="block">
                  <div className="rounded-[10px] p-7 text-center cursor-pointer transition-colors"
                    style={{ border: "1.5px dashed rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.03)" }}>
                    <div className="text-sm font-semibold mb-1">Drop a PDF or choose a file</div>
                    <div className="text-xs" style={{ color: "var(--text-soft)" }}>jobMind parses skills, experience, and projects into a structured profile.</div>
                  </div>
                  <input id="resume-file" name="resume" type="file" accept=".pdf,.txt" className="sr-only"
                    onChange={(e) => void onResumeUpload(e)} disabled={busy} />
                </label>
                {resume ? (
                  <div className="mt-3 rounded-lg border p-3" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-sm">{resume.file_name}</strong>
                      <span className="text-[10px]" style={{ color: "var(--text-soft)" }}>{formatDateTime(resume.extracted_at)}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: "var(--text-mid)" }}>{resume.extraction.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.extraction.skills.slice(0, 8).map((skill) => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 rounded border"
                          style={{ background: "var(--indigo-dim)", color: "var(--indigo-light)", borderColor: "rgba(99,102,241,0.2)" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs mt-2" style={{ color: "var(--text-soft)" }}>No active resume uploaded yet.</p>
                )}
              </SectionPanel>

              {/* Target Role */}
              <SectionPanel id="role" title="Target Role">
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="target-role" className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-soft)" }}>Target role</label>
                  <div className="grid gap-2" style={{ gridTemplateColumns: "1fr auto" }}>
                    <input
                      id="target-role" name="target_role" type="text" autoComplete="off"
                      placeholder="Fullstack Developer…"
                      value={targetRole}
                      onChange={(e) => onTargetRoleChange(e.target.value)}
                      className="rounded-[7px] px-3 py-2 text-sm border outline-none"
                      style={{ background: "var(--surface-2)", borderColor: "rgba(99,102,241,0.2)", color: "var(--text)", fontFamily: "var(--font-sans)" }}
                    />
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-2 rounded-[7px] text-sm font-bold text-white border-none cursor-pointer"
                        style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
                        type="button" onClick={() => void onAnalyze()} disabled={busy}
                      >
                        {busy ? "Analyzing…" : "Run Analysis"}
                      </button>
                      <button
                        className="px-3 py-2 rounded-[7px] text-sm font-medium border cursor-pointer"
                        style={{ color: "var(--text-soft)", borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
                        type="button" onClick={() => void onTargetRoleSave()} disabled={busy}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </SectionPanel>

              {/* Analysis */}
              <SectionPanel id="analysis" title="Analysis" dotColor="#10b981">
                {analysis ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: "var(--text-soft)" }}>Strengths</div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.strengths.map((item) => (
                          <span key={item} className="text-[11px] px-2 py-0.5 rounded border"
                            style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderColor: "rgba(16,185,129,0.2)" }}>{item}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: "var(--text-soft)" }}>Missing Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missing_skills.map((item) => (
                          <span key={item} className="text-[11px] px-2 py-0.5 rounded border"
                            style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", borderColor: "rgba(245,158,11,0.2)" }}>{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: "var(--text-soft)" }}>What To Change Next</div>
                      <ul className="flex flex-col gap-1.5">
                        {analysis.suggestions.map((item) => (
                          <li key={item} className="text-sm flex gap-2 items-start" style={{ color: "var(--text-mid)" }}>
                            <span className="text-[10px] mt-0.5 font-bold flex-shrink-0" style={{ color: "var(--indigo-light)" }}>→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-soft)" }}>Run the first analysis to see positioning, missing skills, and rewrite guidance.</p>
                )}
              </SectionPanel>

              {/* Matches */}
              <SectionPanel id="matches" title="Matches" dotColor="var(--indigo)">
                {matches.length ? (
                  <div className="flex flex-col">
                    {matches.map((match) => (
                      <div key={match.id} className="py-3 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <strong className="text-sm font-semibold">{match.title}</strong>
                            <p className="text-xs" style={{ color: "var(--text-soft)" }}>{match.company_name} / {match.location}</p>
                          </div>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border flex-shrink-0"
                            style={{ color: "var(--indigo-light)", background: "var(--indigo-dim)", borderColor: "rgba(99,102,241,0.2)" }}>
                            {formatPercent(match.score)}
                          </span>
                        </div>
                        <p className="text-xs mb-2" style={{ color: "var(--text-mid)" }}>{match.rationale}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {match.strengths.slice(0, 4).map((item) => (
                            <span key={`${match.id}-${item}`} className="text-[10px] px-1.5 py-0.5 rounded border"
                              style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderColor: "rgba(16,185,129,0.2)" }}>{item}</span>
                          ))}
                        </div>
                        <a href={match.apply_url} target="_blank" rel="noreferrer"
                          className="text-xs font-medium no-underline" style={{ color: "var(--indigo-light)" }}>
                          View Opening →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-soft)" }}>Matched jobs appear here after the first role analysis.</p>
                )}
              </SectionPanel>
            </div>

            {/* Secondary column */}
            <div className="flex flex-col gap-5">

              {/* Alternatives */}
              <SectionPanel id="alternatives" title="Alternatives" dotColor="#8b5cf6">
                {alternatives.length ? (
                  <div className="flex flex-col">
                    {alternatives.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-2 py-3 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <div>
                          <strong className="text-sm font-semibold">{item.role_name}</strong>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-soft)" }}>{item.rationale}</p>
                        </div>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0"
                          style={{ color: "var(--text-soft)", background: "var(--surface-2)", borderColor: "var(--border)" }}>
                          {formatPercent(item.score)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-soft)" }}>Alternative role suggestions appear after analysis runs.</p>
                )}
              </SectionPanel>

              {/* Digest */}
              <SectionPanel id="digest" title="Digest" dotColor="var(--warning)">
                {notifications.length ? (
                  <div className="flex flex-col gap-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="rounded-lg border p-3" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-xs font-semibold">{n.status === "sent" ? "Sent Digest" : "Preview Digest"}</strong>
                          <span className="text-[10px]" style={{ color: "var(--text-soft)" }}>{formatDateTime(n.created_at)}</span>
                        </div>
                        <pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-mid)", fontFamily: "var(--font-mono)" }}>{n.content}</pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-soft)" }}>A daily digest preview appears here after your first analysis.</p>
                )}
              </SectionPanel>

              {/* Billing */}
              <SectionPanel id="billing" title="Billing" dotColor="var(--text-soft)">
                <div className="rounded-lg border p-4" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-sm font-semibold">{plan}</strong>
                    <span className="text-[10px]" style={{ color: "var(--text-soft)" }}>{profile?.subscription.status || "active"}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-mid)" }}>
                    {billingEnabled
                      ? `Free includes ${profile?.usage.daily_limit ?? 5} analyses per day. Pro removes that limit.`
                      : "Billing stays disabled during the closed beta. Use this panel to communicate plan status."}
                  </p>
                  {billingEnabled && (
                    <button
                      className="w-full py-2.5 rounded-[9px] text-sm font-bold text-white border-none cursor-pointer"
                      style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
                      type="button" onClick={() => void onUpgrade()} disabled={busy}
                    >
                      Upgrade To Pro
                    </button>
                  )}
                </div>
              </SectionPanel>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify in browser**

Log in (or use demo mode) and navigate to `http://127.0.0.1:5173/app`. All 8 sidebar items should show with icons. Upload zone, target role input, analysis chips, job cards should all render.

- [ ] **Step 8: Fix TypeScript errors**

```bash
npm run build 2>&1 | head -60
```

- [ ] **Step 9: Commit**

```bash
git add src/components/AppShell.tsx
git commit -m "feat: rewrite AppShell with dark premium workspace design"
```

---

## Task 9: Final verification

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: exits 0, no TypeScript errors, no missing module errors.

- [ ] **Step 2: Run tests**

```bash
npm test
```

Expected: all existing tests pass (they test business logic, not visuals).

- [ ] **Step 3: Manual walkthrough**

```bash
npm run dev
```

Check each route:
1. `/` — dark landing, hero readable, product screenshot renders, pricing visible
2. `/auth` — dark card, mode toggle works, form submits
3. `/app` — sidebar with all 8 items + icons, metric strip, all sections visible

- [ ] **Step 4: Check responsiveness**

Resize browser to 768px wide — sidebar should stack or hide, content readable.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete premium SaaS redesign — dark theme, Tailwind v4, indigo accent"
```

---

## Verification Checklist (from spec)

- [ ] `npm run dev` starts without errors
- [ ] `/` — hero + product screenshot + features + pricing render
- [ ] "See a sample" button scrolls to `#product-screenshot`
- [ ] `/auth` — sign in and sign up both render correctly in dark theme
- [ ] `/app` — all 8 nav sections present with icons, metric strip shows, upload zone renders
- [ ] `npm run build` exits 0 with no TypeScript errors
- [ ] No regressions: auth flow, resume upload, analysis, job matches all functional
