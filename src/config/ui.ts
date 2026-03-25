import type { AppDirection, AppLocale, CtaIntent, MetricCardConfig, ThemeMode, WorkspaceNavItem } from "../types";

export const appLocale: AppLocale = "en";
export const appDirection: AppDirection = "ltr";
export const appThemeMode: ThemeMode = "dark";

export const primaryCta: CtaIntent = {
  key: "analysis",
  href: "/auth?intent=analysis",
  label: "Start Free Analysis",
};

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

export const metricCardConfigs: MetricCardConfig[] = [
  { id: "plan", label: "Plan", tone: "default" },
  { id: "analyses", label: "Analyses Today", tone: "accent" },
  { id: "score", label: "Latest Match Score", tone: "positive" },
];
