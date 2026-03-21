import type { AppDirection, AppLocale, CtaIntent, MetricCardConfig, ThemeMode, WorkspaceNavItem } from "../types";

export const appLocale: AppLocale = "en";
export const appDirection: AppDirection = "ltr";
export const appThemeMode: ThemeMode = "light";

export const primaryCta: CtaIntent = {
  key: "analysis",
  href: "/auth?intent=analysis",
  label: "Start Free Analysis",
};

export const workspaceNavItems: WorkspaceNavItem[] = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "resume", label: "Resume", href: "#resume" },
  { id: "role", label: "Target Role", href: "#role" },
  { id: "analysis", label: "Analysis", href: "#analysis" },
  { id: "matches", label: "Matches", href: "#matches" },
  { id: "alternatives", label: "Alternatives", href: "#alternatives" },
  { id: "digest", label: "Digest", href: "#digest" },
  { id: "billing", label: "Billing", href: "#billing" },
];

export const metricCardConfigs: MetricCardConfig[] = [
  { id: "plan", label: "Plan", tone: "default" },
  { id: "analyses", label: "Analyses Today", tone: "accent" },
  { id: "score", label: "Latest Match Score", tone: "positive" },
];
