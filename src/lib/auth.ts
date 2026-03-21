import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { AuthSession } from "../types";

const DEMO_STORAGE_KEY = "jobmind:demo-session";

function isDemoAuthEnabled(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_ALLOW_DEMO_AUTH === "true";
}

function getSupabaseClient(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
}

export function isSupabaseEnabled(): boolean {
  return Boolean(getSupabaseClient());
}

export async function restoreSession(): Promise<AuthSession | null> {
  const client = getSupabaseClient();
  if (client) {
    const { data } = await client.auth.getSession();
    const session = data.session;
    if (session?.user?.email) {
      return {
        email: session.user.email,
        accessToken: session.access_token,
        mode: "supabase",
      };
    }
  }

  if (!isDemoAuthEnabled()) {
    return null;
  }

  const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export async function signIn(email: string, password: string): Promise<AuthSession> {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      throw new Error(error?.message || "Sign in failed.");
    }
    return {
      email: data.session.user.email || email,
      accessToken: data.session.access_token,
      mode: "supabase",
    };
  }

  if (!isDemoAuthEnabled()) {
    throw new Error("Demo auth is disabled in production. Configure Supabase auth for this deployment.");
  }

  const demoSession: AuthSession = { email, mode: "demo" };
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoSession));
  return demoSession;
}

export async function signUp(email: string, password: string): Promise<AuthSession> {
  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error || !data.session) {
      throw new Error(error?.message || "Account created, but email verification is still required before sign in.");
    }
    return {
      email: data.session.user.email || email,
      accessToken: data.session.access_token,
      mode: "supabase",
    };
  }
  return signIn(email, password);
}

export async function signOut(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
  window.localStorage.removeItem(DEMO_STORAGE_KEY);
}

export function getAuthHeaders(session: AuthSession | null): HeadersInit {
  if (!session) {
    return {};
  }
  if (session.mode === "supabase" && session.accessToken) {
    return { Authorization: `Bearer ${session.accessToken}` };
  }
  return { "X-Demo-User": session.email };
}

export function isDemoModeAvailable(): boolean {
  return isDemoAuthEnabled();
}
