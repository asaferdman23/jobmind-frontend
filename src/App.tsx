import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import { AppShell } from "./components/AppShell";
import { AuthScreen } from "./components/AuthScreen";
import { PublicLanding } from "./components/PublicLanding";
import { appDirection, appLocale, primaryCta } from "./config/ui";
import { api } from "./lib/api";
import { buildUrl, useAppRoute } from "./lib/router";
import { restoreSession, signIn, signOut, signUp } from "./lib/auth";
import type {
  AuthMode,
  AuthSession,
  CareerAlternative,
  JobMatch,
  NotificationPreview,
  ProfileSummary,
  ResumeUploadResponse,
  RoleFitResponse,
} from "./types";

function App() {
  const { route, navigate, searchParams } = useAppRoute();
  const searchSignature = searchParams.toString();
  const intent = searchParams.get("intent");
  const billingEnabled = import.meta.env.VITE_ENABLE_BILLING === "true";

  const [session, setSession] = useState<AuthSession | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(searchParams.get("mode") === "signup" ? "sign-up" : "sign-in");

  const [authEmail, setAuthEmail] = useState("demo@jobmind.local");
  const [authPassword, setAuthPassword] = useState("demo1234");

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [resume, setResume] = useState<ResumeUploadResponse | null>(null);
  const [targetRole, setTargetRole] = useState("Fullstack Developer");
  const [analysis, setAnalysis] = useState<RoleFitResponse | null>(null);
  const [alternatives, setAlternatives] = useState<CareerAlternative[]>([]);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [notifications, setNotifications] = useState<NotificationPreview[]>([]);

  const intentSearch = useMemo(() => {
    const params = new URLSearchParams();
    if (intent) {
      params.set("intent", intent);
    }
    return params;
  }, [intent]);

  useEffect(() => {
    document.documentElement.lang = appLocale;
    document.documentElement.dir = appDirection;
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "JobMind | Premium Career Intelligence",
      "/auth": "JobMind | Sign In",
      "/app": "JobMind | Workspace",
    };
    document.title = titles[route];
  }, [route]);

  useEffect(() => {
    setAuthMode(searchParams.get("mode") === "signup" ? "sign-up" : "sign-in");
  }, [searchSignature]);

  useEffect(() => {
    restoreSession()
      .then((nextSession) => setSession(nextSession))
      .finally(() => setInitializing(false));
  }, []);

  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    void bootstrap(session);
  }, [session]);

  useEffect(() => {
    if (initializing) {
      return;
    }
    if (!session && route === "/app") {
      navigate(buildUrl("/auth", intentSearch), { replace: true });
      return;
    }
    if (session && route === "/auth") {
      navigate(buildUrl("/app", intentSearch), { replace: true });
    }
  }, [initializing, intentSearch, navigate, route, session]);

  async function bootstrap(activeSession: AuthSession) {
    setBusy(true);
    setError(null);
    try {
      const [profileResponse, matchesResponse, notificationsResponse] = await Promise.all([
        api.getProfile(activeSession),
        api.getMatches(activeSession).catch(() => ({ items: [] as JobMatch[] })),
        api.getNotifications(activeSession).catch(() => ({ notifications: [] as NotificationPreview[] })),
      ]);
      setProfile(profileResponse);
      setTargetRole(profileResponse.target_role || "Fullstack Developer");
      setMatches(matchesResponse.items || []);
      setNotifications(notificationsResponse.notifications || []);
      setAnalysis(
        profileResponse.latest_analysis
          ? {
              analysis_id: profileResponse.latest_analysis.analysis_id,
              target_role_id: "bootstrap",
              target_role: profileResponse.latest_analysis.target_role,
              match_score: profileResponse.latest_analysis.match_score,
              missing_skills: profileResponse.latest_analysis.missing_skills,
              strengths: profileResponse.latest_analysis.strengths,
              suggestions: profileResponse.latest_analysis.suggestions,
              matched_jobs: matchesResponse.items || [],
              created_at: profileResponse.latest_analysis.created_at,
            }
          : null,
      );
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function runAuth(mode: AuthMode) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const nextSession = mode === "sign-in" ? await signIn(authEmail, authPassword) : await signUp(authEmail, authPassword);
      setSession(nextSession);
      setNotice(mode === "sign-in" ? "Welcome back. Your workspace is ready." : "Account created. Opening your workspace now.");
      navigate(buildUrl("/app", intentSearch));
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleAuthSubmit(mode: AuthMode, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runAuth(mode);
  }

  async function handleResumeUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !session) {
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await api.uploadResume(session, file);
      setResume(response);
      setProfile((current) => (current ? { ...current, active_resume_id: response.resume_id } : current));
      setNotice("Resume parsed and stored successfully.");
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  async function handleTargetRoleSave() {
    if (!session) {
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await api.setTargetRole(session, targetRole);
      setProfile((current) => (current ? { ...current, target_role: targetRole } : current));
      setNotice("Target role saved.");
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleAnalyze() {
    if (!session || !(resume?.resume_id || profile?.active_resume_id)) {
      setError("Upload a resume before running analysis.");
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const activeResumeId = resume?.resume_id || profile?.active_resume_id;
      const roleFitResponse = await api.analyzeRoleFit(session, activeResumeId!, targetRole);
      const [alternativesResponse, notificationsResponse, profileResponse] = await Promise.all([
        api.getCareerAlternatives(session, activeResumeId!),
        api.getNotifications(session).catch(() => ({ notifications: [] as NotificationPreview[] })),
        api.getProfile(session),
      ]);
      setAnalysis(roleFitResponse);
      setAlternatives(alternativesResponse.alternatives);
      setMatches(roleFitResponse.matched_jobs);
      setNotifications(notificationsResponse.notifications);
      setProfile(profileResponse);
      setNotice("Analysis complete.");
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleUpgrade() {
    if (!session) {
      return;
    }
    if (!billingEnabled) {
      setNotice("Billing is disabled during the private beta.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await api.createCheckout(session);
      window.open(response.checkout_url, "_blank", "noopener,noreferrer");
      setNotice(response.mode === "mock" ? "Opened mock checkout for Pro." : "Redirecting to Stripe.");
    } catch (nextError) {
      setError((nextError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await signOut();
    setSession(null);
    setResume(null);
    setAnalysis(null);
    setAlternatives([]);
    setMatches([]);
    setNotifications([]);
    setNotice(null);
    navigate("/", { replace: true });
  }

  if (initializing) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        Loading JobMind…
      </div>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {route === "/" ? <PublicLanding onNavigate={navigate} /> : null}

      {route === "/auth" ? (
        <AuthScreen
          authEmail={authEmail}
          authMode={authMode}
          authPassword={authPassword}
          busy={busy}
          error={error}
          notice={notice}
          onAuthModeChange={setAuthMode}
          onEmailChange={setAuthEmail}
          onNavigate={navigate}
          onPasswordChange={setAuthPassword}
          onSubmit={handleAuthSubmit}
        />
      ) : null}

      {route === "/app" && session ? (
        <AppShell
          analysis={analysis}
          alternatives={alternatives}
          billingEnabled={billingEnabled}
          busy={busy}
          error={error}
          matches={matches}
          notice={notice}
          notifications={notifications}
          onAnalyze={handleAnalyze}
          onLogout={handleLogout}
          onNavigate={navigate}
          onResumeUpload={handleResumeUpload}
          onTargetRoleChange={setTargetRole}
          onTargetRoleSave={handleTargetRoleSave}
          onUpgrade={handleUpgrade}
          profile={profile}
          resume={resume}
          session={session}
          targetRole={targetRole}
        />
      ) : null}

      {route === "/" && !session ? (
        <a
          className="floating-cta"
          href={primaryCta.href}
          onClick={(event) => {
            event.preventDefault();
            navigate(primaryCta.href);
          }}
        >
          {primaryCta.label}
        </a>
      ) : null}
    </>
  );
}

export default App;
