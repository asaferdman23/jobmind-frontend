# Premium SaaS Redesign — jobMind Frontend

**Date:** 2026-03-21
**Status:** Approved

---

## Context

The current frontend uses a light-mode custom CSS system that reads as amateur. The goal is a full premium dark SaaS redesign — migrating to Tailwind CSS + shadcn/ui — matching the visual quality of Linear, Vercel, and Stripe. The user approved the design direction via visual mockups.

**Design decisions locked:**
- Direction: Dark Pro (Linear/Vercel aesthetic)
- Accent: Indigo/Violet (`#6366f1` / `#818cf8`)
- Background: `#07070e` deep dark
- Font: Inter + JetBrains Mono (data/scores)
- No emojis in content — SVG icons throughout
- Hero copy: "Is your CV good enough to get the interview?" — fear-of-missing-out hook

---

## Scope

Three files to redesign + full migration to Tailwind + shadcn/ui:

| File | Change |
|------|--------|
| `src/styles.css` | Replace with `src/globals.css` — Tailwind directives + CSS variable overrides |
| `src/main.tsx` | Update CSS import from `./styles.css` → `./globals.css` |
| `src/components/PublicLanding.tsx` | Full rewrite — new dark hero, features, pricing, CTA |
| `src/components/AuthScreen.tsx` | Full rewrite — dark card, indigo accents |
| `src/components/AppShell.tsx` | Full rewrite — dark sidebar with SVG icons, workspace sections |
| `src/types.ts` | Update `ThemeMode = "dark"` |
| `src/config/ui.ts` | Update `appThemeMode = "dark"`, add `icon` field to `WorkspaceNavItem` |
| `index.html` | Add Google Fonts (Inter + JetBrains Mono) |
| `package.json` | Add `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `clsx`, `tailwind-merge` |
| `vite.config.ts` | Add `@tailwindcss/vite` plugin |

---

## Design Tokens

```css
--bg: #07070e
--surface: #0c0c18
--surface-2: #10101f
--border: rgba(99,102,241,0.13)
--indigo: #6366f1
--indigo-light: #818cf8
--indigo-dim: rgba(99,102,241,0.14)
--text: #f1f5f9
--text-mid: #94a3b8
--text-soft: #64748b
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
```

---

## PublicLanding — Hero

**Clean hero, 5 elements only:**
1. Red-dot badge: "Don't send your CV blind"
2. Headline: "Is your CV good enough / to get the interview?" (gradient on second line)
3. Sub: "Get your match score against any role — and know exactly what to fix — before you apply."
4. Two CTAs: "Check my CV free →" (primary) + "See a sample" (ghost)
5. Note: "No account needed · 60 seconds · Free"

Below fold: embedded product screenshot → trust logos → features (3 cards, SVG icons) → pricing (Free + Pro) → CTA banner → footer.

**Product screenshot** = full faithful replica of the real AppShell (see AppShell spec below). Will be replaced with live iframe/demo later.

---

## AppShell — Workspace

**Sidebar** (196px, dark `#08081a`):
- Brand mark (shield SVG icon + "JobMind")
- Nav items with SVG icons, exact from `config/ui.ts`:
  - Overview (grid icon) · Resume (document) · Target Role (crosshair) · Analysis (bar chart) · Matches (briefcase) · Alternatives (trending-up) · Digest (bell) · Billing (credit card)
- Active state: indigo-dim background + indigo-light text + indigo border
- Bottom: plan card (Free/Pro) with Upgrade button

**Topbar**: breadcrumb "Workspace / Career Intelligence" + user chip (email + plan badge) + Sign Out

**Overview hero**: two-column — left copy (section kicker, h2 from analysis, suggestion, action buttons) + right score badge panel (gradient score number, glowing indigo border)

**Metric strip**: 3 cards — Plan · Analyses Today · Latest Match Score (all with top-border gradient line)

**Workspace grid** (1.55fr / right panel):
- Left: Resume (dashed upload zone) · Target Role (field-row input + Run/Save) · Analysis (strengths chips green + missing chips amber) · Matches (job cards with score-chip)
- Right: Alternatives · Digest · Billing

---

## AuthScreen

- Dark split: left panel (copy + proof cards) + right card (auth form)
- Right card: dark surface, indigo mode toggle, indigo primary button
- Proof cards: dark surface, score displayed in gradient mono font

---

## Tech Stack Changes

**Add:**
- `tailwindcss` v4 + `@tailwindcss/vite` (v4 uses the Vite plugin directly — no postcss.config needed)
- `lucide-react` for SVG icons
- `clsx` + `tailwind-merge` for `cx()` utility

**shadcn/ui setup (CLI-based — not an npm package):**
```bash
npx shadcn@latest init
# answers: Dark theme, CSS variables yes, src/components/ui output
npx shadcn@latest add button input badge card
```
Generated files land in `src/components/ui/`. Only add what's needed: Button, Input, Badge, Card.

**Remove:**
- `src/styles.css` (1431 lines) — replaced by `src/globals.css` (Tailwind directives + CSS variable overrides)

**Keep unchanged:**
- All business logic (`src/lib/`, `src/hooks/`)
- All API calls
- Routing (`src/lib/router.ts`)
- `App.tsx` state management (no changes)

**"See a sample" CTA behavior:**
Scrolls to `#product-screenshot` anchor (the product frame section on the landing page). Smooth scroll via `href="#product-screenshot"`. No modal, no new route.

---

## Verification

1. `npm run dev` — app loads, all 3 routes work
2. Landing page: hero visible, product screenshot renders, pricing section shows
3. Auth: sign in and sign up both render correctly
4. Workspace: all 8 nav sections visible, metric strip shows, resume upload zone renders
5. No TypeScript errors (`npm run build`)
6. No regressions in auth flow or API calls
