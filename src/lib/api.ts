import type {
  AuthSession,
  BillingCheckoutResponse,
  CareerAlternativesResponse,
  NotificationPreviewsResponse,
  PaginatedJobMatchesResponse,
  ProfileSummary,
  ResumeUploadResponse,
  RoleFitResponse,
} from "../types";
import { getAuthHeaders } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

async function apiRequest<T>(
  path: string,
  session: AuthSession | null,
  init: RequestInit = {},
  expectsJson = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  const authHeaders = getAuthHeaders(session);
  Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, String(value)));
  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    let detail = "Request failed.";
    try {
      const payload = (await response.json()) as { detail?: string };
      detail = payload.detail || detail;
    } catch {
      detail = response.statusText || detail;
    }
    throw new Error(detail);
  }
  if (!expectsJson) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const api = {
  getProfile: (session: AuthSession | null) => apiRequest<ProfileSummary>("/profile/me", session),
  setTargetRole: (session: AuthSession | null, title: string) =>
    apiRequest("/profile/target-role", session, {
      method: "PUT",
      body: JSON.stringify({ title }),
    }),
  uploadResume: (session: AuthSession | null, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return apiRequest<ResumeUploadResponse>("/resumes/upload", session, {
      method: "POST",
      body: form,
    });
  },
  analyzeRoleFit: (session: AuthSession | null, resumeId: string, targetRole: string) =>
    apiRequest<RoleFitResponse>("/analysis/role-fit", session, {
      method: "POST",
      body: JSON.stringify({ resume_id: resumeId, target_role: targetRole }),
    }),
  getCareerAlternatives: (session: AuthSession | null, resumeId: string) =>
    apiRequest<CareerAlternativesResponse>("/analysis/career-alternatives", session, {
      method: "POST",
      body: JSON.stringify({ resume_id: resumeId }),
    }),
  getMatches: (session: AuthSession | null) => apiRequest<PaginatedJobMatchesResponse>("/jobs/matches", session),
  getNotifications: (session: AuthSession | null) =>
    apiRequest<NotificationPreviewsResponse>("/notifications/previews", session),
  createCheckout: (session: AuthSession | null) =>
    apiRequest<BillingCheckoutResponse>("/billing/create-checkout-session", session, {
      method: "POST",
      body: JSON.stringify({}),
    }),
};
