import type { ChangeEvent } from "react";

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

export function AppShell({
  analysis,
  alternatives,
  billingEnabled,
  busy,
  error,
  matches,
  notice,
  notifications,
  onAnalyze,
  onLogout,
  onNavigate,
  onResumeUpload,
  onTargetRoleChange,
  onTargetRoleSave,
  onUpgrade,
  profile,
  resume,
  session,
  targetRole,
}: AppShellProps) {
  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <div className="workspace-sidebar-header">
          <a
            className="brand-mark"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/");
            }}
          >
            JobMind
          </a>
          <div className="workspace-nav" aria-label="Workspace sections">
            {workspaceNavItems.map((item) => (
              <a 
                key={item.id} 
                className={`workspace-nav-link${item.id === 'overview' ? ' [aria-current="page"]' : ''}`} 
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="workspace-sidebar-card">
          <div className="workspace-sidebar-card-header">
            <small>Plan</small>
          </div>
          <div className="workspace-sidebar-card-content">
            <p className="text-sm font-medium">{formatPlan(profile?.subscription.plan)}</p>
            <p className="text-xs text-muted-foreground">
              {billingEnabled
                ? "Upgrade for unlimited analyses and a premium daily digest workflow."
                : "Billing is disabled during the private beta. Focus on adoption and analysis quality first."}
            </p>
            {billingEnabled ? (
              <button className="button button-outline button-full" type="button" onClick={() => void onUpgrade()} disabled={busy}>
                Upgrade To Pro
              </button>
            ) : null}
          </div>
        </div>
      </aside>

      <div className="workspace-stage">
        <header className="workspace-topbar flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="workspace-breadcrumb text-xs font-medium text-muted-foreground">
              Workspace / Career Intelligence
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Run a sharper search with live role fit and clearer next steps.
            </h1>
          </div>
          <div className="workspace-topbar-actions flex items-center gap-3">
            <div className="user-chip user-chip-premium flex items-center gap-2">
              <strong className="font-semibold">{session.email}</strong>
              <span className="text-xs font-medium">{formatPlan(profile?.subscription.plan)}</span>
            </div>
            <button className="button button-ghost" type="button" onClick={() => void onLogout()}>
              Sign Out
            </button>
          </div>
        </header>

<div className="alert-stack space-y-3" aria-live="polite">
           {error ? <div className="alert alert-destructive">{error}</div> : null}
           {notice ? <div className="alert alert-success">{notice}</div> : null}
         </div>

<main className="workspace-main" id="main-content">
           <section className="overview-hero panel-surface space-y-6" id="overview">
             <div className="overview-hero-copy space-y-4">
               <span className="section-kicker inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                 Overview
               </span>
               <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                 {analysis ? `${analysis.target_role} is your current best-fit lane.` : "Upload your resume and start with one target role."}
               </h2>
               <p className="text-sm text-muted-foreground">
                 {analysis
                   ? analysis.suggestions[0]
                   : "JobMind keeps resume parsing, role fit, matched openings, alternatives, and daily digests in one premium workspace."}
               </p>
               <div className="hero-action-row flex flex-wrap items-center gap-3">
                 <button className="button button-primary" type="button" onClick={() => void onAnalyze()} disabled={busy}>
                   {busy ? "Analyzing…" : "Run Analysis"}
                 </button>
                 <a className="button button-outline" href="#matches">
                   Jump To Matches
                 </a>
               </div>
             </div>
             <div className="score-badge-panel flex flex-col items-center gap-2 p-4">
               <span className="text-xs font-medium text-muted-foreground">Current Match Score</span>
               <strong className="text-3xl font-mono text-primary">{analysis ? formatPercent(analysis.match_score) : "--"}</strong>
               <span className="text-sm text-muted-foreground">{analysis?.target_role || "Waiting for first analysis"}</span>
             </div>
           </section>

<section className="metric-strip grid gap-4" aria-label="Key metrics">
             {metricCardConfigs.map((metric) => {
               const content = metricContent(metric.id, profile, analysis);
               return (
                 <article key={metric.id} className="metric-surface rounded-lg border bg-muted/50 p-4">
                   <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                   <strong className="text-2xl font-mono">{content.value}</strong>
                   <small className="text-xs text-muted-foreground">{content.meta}</small>
                 </article>
               );
             })}
           </section>

          <div className="workspace-grid">
            <div className="workspace-primary-column">
              <section className="panel-surface" id="resume">
                <div className="panel-heading">
                  <span className="section-kicker">Resume</span>
                  <h2>Upload once, keep the active version clean.</h2>
                </div>
                <label className="upload-surface" htmlFor="resume-file">
                  <input id="resume-file" name="resume" type="file" accept=".pdf,.txt" onChange={(event) => void onResumeUpload(event)} disabled={busy} />
                  <strong>Drop a PDF or choose a file</strong>
                  <span>JobMind parses skills, experience, projects, and summary into a structured profile.</span>
                </label>

                {resume ? (
                  <div className="summary-card">
                    <div className="summary-card-top">
                      <div>
                        <strong>{resume.file_name}</strong>
                        <p>{resume.extraction.summary}</p>
                      </div>
                      <span className="muted-meta">{formatDateTime(resume.extracted_at)}</span>
                    </div>
                    <div className="chip-row">
                      {resume.extraction.skills.slice(0, 8).map((skill) => (
                        <span className="chip" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="empty-copy">No active resume uploaded yet.</p>
                )}
              </section>

              <section className="panel-surface" id="role">
                <div className="panel-heading">
                  <span className="section-kicker">Target Role</span>
                  <h2>Point the analysis at one role at a time.</h2>
                </div>
                <div className="field-row">
                  <div className="form-field">
                    <label htmlFor="target-role">Target role</label>
                    <input
                      id="target-role"
                      name="target_role"
                      type="text"
                      autoComplete="off"
                      placeholder="Fullstack Developer…"
                      value={targetRole}
                      onChange={(event) => onTargetRoleChange(event.target.value)}
                    />
                  </div>
                  <div className="button-row">
                    <button className="button button-primary" type="button" onClick={() => void onAnalyze()} disabled={busy}>
                      {busy ? "Analyzing…" : "Run Analysis"}
                    </button>
                    <button className="button button-secondary" type="button" onClick={() => void onTargetRoleSave()} disabled={busy}>
                      Save Role
                    </button>
                  </div>
                </div>
              </section>

              <section className="panel-surface" id="analysis">
                <div className="panel-heading">
                  <span className="section-kicker">Analysis</span>
                  <h2>Clear strengths, gaps, and better resume angles.</h2>
                </div>
                {analysis ? (
                  <div className="analysis-grid">
                    <article className="analysis-card">
                      <h3>Strengths</h3>
                      <div className="chip-row">
                        {analysis.strengths.map((item) => (
                          <span className="chip chip-positive" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                    <article className="analysis-card">
                      <h3>Missing Skills</h3>
                      <div className="chip-row">
                        {analysis.missing_skills.map((item) => (
                          <span className="chip chip-warning" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                    <article className="analysis-card analysis-card-wide">
                      <h3>What To Change Next</h3>
                      <ul className="clean-list">
                        {analysis.suggestions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ) : (
                  <p className="empty-copy">Run the first analysis to see positioning, missing skills, and rewrite guidance.</p>
                )}
              </section>

              <section className="panel-surface" id="matches">
                <div className="panel-heading">
                  <span className="section-kicker">Matches</span>
                  <h2>Live openings that fit this profile best.</h2>
                </div>
                <div className="stack-list">
                  {matches.length ? (
                    matches.map((match) => (
                      <article className="job-match-card" key={match.id}>
                        <div className="job-match-header">
                          <div className="job-match-title">
                            <strong>{match.title}</strong>
                            <p>
                              {match.company_name} / {match.location}
                            </p>
                          </div>
                          <span className="score-chip">{formatPercent(match.score)}</span>
                        </div>
                        <p className="job-match-rationale">{match.rationale}</p>
                        <div className="chip-row">
                          {match.strengths.slice(0, 4).map((item) => (
                            <span className="chip chip-positive" key={`${match.id}-${item}`}>
                              {item}
                            </span>
                          ))}
                        </div>
                        <a className="inline-link" href={match.apply_url} target="_blank" rel="noreferrer">
                          View Opening
                        </a>
                      </article>
                    ))
                  ) : (
                    <p className="empty-copy">Matched jobs appear here after the first role analysis.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="workspace-secondary-column">
              <section className="panel-surface" id="alternatives">
                <div className="panel-heading">
                  <span className="section-kicker">Alternatives</span>
                  <h2>Adjacent roles worth testing.</h2>
                </div>
                <div className="stack-list">
                  {alternatives.length ? (
                    alternatives.map((item) => (
                      <article className="summary-card" key={item.id}>
                        <div className="summary-card-top">
                          <strong>{item.role_name}</strong>
                          <span className="score-chip score-chip-subtle">{formatPercent(item.score)}</span>
                        </div>
                        <p>{item.rationale}</p>
                      </article>
                    ))
                  ) : (
                    <p className="empty-copy">Alternative role suggestions appear after analysis runs.</p>
                  )}
                </div>
              </section>

              <section className="panel-surface" id="digest">
                <div className="panel-heading">
                  <span className="section-kicker">Digest</span>
                  <h2>WhatsApp-ready daily job updates.</h2>
                </div>
                <div className="stack-list">
                  {notifications.length ? (
                    notifications.map((notification) => (
                      <article className="digest-card" key={notification.id}>
                        <div className="summary-card-top">
                          <strong>{notification.status === "sent" ? "Sent Digest" : "Preview Digest"}</strong>
                          <span className="muted-meta">{formatDateTime(notification.created_at)}</span>
                        </div>
                        <pre>{notification.content}</pre>
                      </article>
                    ))
                  ) : (
                    <p className="empty-copy">A daily digest preview appears here after your first analysis.</p>
                  )}
                </div>
              </section>

              <section className="panel-surface" id="billing">
                <div className="panel-heading">
                  <span className="section-kicker">Billing</span>
                  <h2>{billingEnabled ? "Keep the free flow, upgrade when it proves value." : "Keep billing off until the closed beta proves real demand."}</h2>
                </div>
                <div className="billing-card">
                  <div className="summary-card-top">
                    <strong>{formatPlan(profile?.subscription.plan)}</strong>
                    <span className="muted-meta">{profile?.subscription.status || "active"}</span>
                  </div>
                  <p>
                    {billingEnabled
                      ? `Free includes ${profile?.usage.daily_limit ?? 5} analyses per day. Pro removes that limit and keeps the premium digest workflow active.`
                      : "For the first live cohort, billing stays disabled. Use this panel to communicate plan status while you validate retention and analysis quality."}
                  </p>
                  {billingEnabled ? (
                    <button className="button button-primary button-block" type="button" onClick={() => void onUpgrade()} disabled={busy}>
                      Upgrade To Pro
                    </button>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
