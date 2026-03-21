export interface AuthSession {
  email: string;
  accessToken?: string;
  mode: "demo" | "supabase";
}

export type AppLocale = "en";
export type AppDirection = "ltr" | "rtl";
export type ThemeMode = "dark";
export type WorkspaceNavId =
  | "overview"
  | "resume"
  | "role"
  | "analysis"
  | "matches"
  | "alternatives"
  | "digest"
  | "billing";

export interface WorkspaceNavItem {
  id: WorkspaceNavId;
  label: string;
  href: string;
  icon: string; // lucide-react icon name
}

export interface MetricCardConfig {
  id: string;
  label: string;
  tone: "default" | "accent" | "positive";
}

export interface CtaIntent {
  key: "analysis";
  href: string;
  label: string;
}

export interface Subscription {
  plan: string;
  status: string;
  current_period_end: string | null;
}

export interface UsageStatus {
  analysis_count: number;
  daily_limit: number | null;
  remaining: number | null;
  unlimited: boolean;
}

export interface RoleAnalysisSnapshot {
  analysis_id: string;
  target_role: string;
  match_score: number;
  missing_skills: string[];
  strengths: string[];
  suggestions: string[];
  created_at: string;
}

export interface ProfileSummary {
  profile_id: string;
  email: string;
  locale: string;
  subscription: Subscription;
  usage: UsageStatus;
  active_resume_id: string | null;
  target_role: string | null;
  latest_analysis: RoleAnalysisSnapshot | null;
}

export interface ResumeExtractionPayload {
  raw_text: string;
  skills: string[];
  experience: Array<Record<string, string>>;
  projects: Array<Record<string, string>>;
  education: Array<Record<string, string>>;
  summary: string;
}

export interface ResumeUploadResponse {
  resume_id: string;
  file_name: string;
  mime_type: string;
  extracted_at: string;
  extraction: ResumeExtractionPayload;
}

export interface JobMatch {
  id: string;
  job_posting_id: string;
  company_name: string;
  title: string;
  location: string;
  apply_url: string;
  score: number;
  strengths: string[];
  missing_skills: string[];
  rationale: string;
  posted_at: string | null;
  created_at: string;
}

export interface RoleFitResponse {
  analysis_id: string;
  target_role_id: string;
  target_role: string;
  match_score: number;
  missing_skills: string[];
  strengths: string[];
  suggestions: string[];
  matched_jobs: JobMatch[];
  created_at: string;
}

export interface PaginatedJobMatchesResponse {
  page: number;
  page_size: number;
  total: number;
  items: JobMatch[];
}

export interface CareerAlternative {
  id: string;
  role_name: string;
  rationale: string;
  score: number;
  created_at: string;
}

export interface CareerAlternativesResponse {
  alternatives: CareerAlternative[];
}

export interface NotificationPreview {
  id: string;
  channel: string;
  content: string;
  status: string;
  created_at: string;
}

export interface NotificationPreviewsResponse {
  notifications: NotificationPreview[];
}

export interface BillingCheckoutResponse {
  checkout_url: string;
  session_id: string;
  mode: string;
}
