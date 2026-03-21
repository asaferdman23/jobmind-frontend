import type { ChangeEvent } from "react";
import * as LucideIcons from "lucide-react";
import { metricCardConfigs, workspaceNavItems } from "../config/ui";
import { formatCount, formatDateTime, formatPercent } from "../lib/format";
import type {
  AuthSession,
  CareerAlternative,
  JobMatch,
  NotificationPreview,
  ProfileSummary,
  ResumeUploadResponse,
  RoleFitResponse,
  WorkspaceNavItem,
} from "../types";

interface AppShellProps {
  analysis: RoleFitResponse | null;
  alternatives: CareerAlternative[];
  billingEnabled: boolean;
  busy: boolean;
  error: string | null;
  matches: JobMatch[];
  notice: string | null;
  notifications: NotificationPreview[];
  onAnalyze: () => Promise<void>;
  onLogout: () => Promise<void>;
  onNavigate: (to: string, options?: { replace?: boolean }) => void;
  onResumeUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onTargetRoleChange: (value: string) => void;
  onTargetRoleSave: () => Promise<void>;
  onUpgrade: () => Promise<void>;
  profile: ProfileSummary | null;
  resume: ResumeUploadResponse | null;
  session: AuthSession;
  targetRole: string;
}

function formatPlan(plan: string | undefined) {
  return plan === "pro" ? "Pro" : "Free";
}

function metricContent(id: string, profile: ProfileSummary | null, analysis: RoleFitResponse | null) {
  if (id === "plan") {
    return {
      value: formatPlan(profile?.subscription.plan),
      meta: profile?.subscription.status === "active" ? "Active" : profile?.subscription.status || "Active",
    };
  }
  if (id === "analyses") {
    return {
      value: formatCount(profile?.usage.analysis_count ?? 0),
      meta: profile?.usage.unlimited ? "Unlimited" : `${profile?.usage.remaining ?? 0} remaining`,
    };
  }
  return {
    value: analysis ? formatPercent(analysis.match_score) : "--",
    meta: analysis?.target_role || "Run your first analysis",
  };
}

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

function NavItem({ item, active }: { item: WorkspaceNavItem; active: boolean }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>>)[item.icon];
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
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
            <div role="alert" className="px-4 py-3 rounded-lg text-sm border" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)", color: "#f87171" }}>{error}</div>
          )}
          {notice && (
            <div role="status" className="px-4 py-3 rounded-lg text-sm border" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>{notice}</div>
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
