const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ── Admin Key Management ──────────────────────────────────────────────────
export const getAdminKey = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kathanak_admin_key');
};

export const setAdminKey = (key: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('kathanak_admin_key', key);
};

export const logoutAdmin = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('kathanak_admin_key');
};

const getHeaders = (isAdmin = false) => {
  const headers: Record<string, string> = {};
  if (isAdmin) {
    const key = getAdminKey();
    if (key) headers['X-Admin-Key'] = key;
  }
  return headers;
};

export interface SiteConfig {
  heroTagline: string;
  heroHindi: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  siteTitle: string;
  siteSubtitle: string;
  siteDescription: string;
  aboutText: string;
  contactEmail: string;
}

export interface Poetry {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  type: 'text' | 'audio' | 'video';
  thumbnailUrl?: string;
  language: 'hindi' | 'english' | 'urdu' | 'other';
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  likes: number;
  duration?: number;
  hasMedia: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  success: boolean;
  data: Poetry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface SingleResponse {
  success: boolean;
  data: Poetry;
}

export interface FetchPoetryParams {
  type?: 'text' | 'audio' | 'video';
  language?: string;
  tag?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

// ── Fetch all poetries ────────────────────────────────────────────────────
export async function fetchPoetrys(params: FetchPoetryParams = {}): Promise<PaginatedResponse> {
  const query = new URLSearchParams();
  if (params.type) query.set('type', params.type);
  if (params.language) query.set('language', params.language);
  if (params.tag) query.set('tag', params.tag);
  if (params.featured) query.set('featured', 'true');
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);

  const res = await fetch(`${API_BASE}/poetry?${query}`, {
    next: { revalidate: 60 }, // ISR — revalidate every 60s
  });

  if (!res.ok) throw new Error(`Failed to fetch poetrys: ${res.statusText}`);
  return res.json();
}

// ── Fetch site config ─────────────────────────────────────────────────────
export async function fetchConfig(): Promise<{ success: boolean; data: SiteConfig }> {
  const res = await fetch(`${API_BASE}/config`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch config');
  return res.json();
}

// ── Fetch single poetry ───────────────────────────────────────────────────
export async function fetchPoetry(idOrSlug: string): Promise<SingleResponse> {
  const res = await fetch(`${API_BASE}/poetry/${idOrSlug}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Poetry not found: ${res.statusText}`);
  return res.json();
}

// ── Get media stream URL (proxied — no Drive URL) ─────────────────────────
export function getStreamUrl(poetryId: string): string {
  return `${API_BASE}/files/${poetryId}`;
}

// ── Like a poetry ─────────────────────────────────────────────────────────
export async function likePoetry(id: string): Promise<{ success: boolean; data: { likes: number } }> {
  const res = await fetch(`${API_BASE}/poetry/${id}/like`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to like');
  return res.json();
}

// ── Submit feedback (backed by MongoDB) ───────────────────────────────────
export async function submitFeedbackToAPI(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ── Format duration (seconds → mm:ss) ────────────────────────────────────
export function formatDuration(seconds?: number): string {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Format date ───────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ── ADMIN: Check Google Auth Status ───────────────────────────────────────
export async function fetchAuthStatus(): Promise<{ success: boolean; authorized: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/auth/status`, { headers: getHeaders(true) });
  return res.json();
}

// ── ADMIN: Update config ──────────────────────────────────────────────────
export async function updateConfig(data: Partial<SiteConfig>): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/config`, {
    method: 'PATCH',
    headers: { ...getHeaders(true), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update config');
  return res.json();
}

// ── ADMIN: Delete poetry ──────────────────────────────────────────────────
export async function deletePoetry(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/poetry/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
}

// ── ADMIN: Upload Poetry (FormData) ───────────────────────────────────────
export async function uploadPoetry(formData: FormData): Promise<{ success: boolean; data: Poetry }> {
  // Do NOT set Content-Type, browser will automatically set it with boundary for FormData
  const res = await fetch(`${API_BASE}/poetry`, {
    method: 'POST',
    headers: getHeaders(true),
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Upload failed');
  }
  return res.json();
}

// ── ADMIN: Fetch feedback ─────────────────────────────────────────────────
export async function fetchFeedback(): Promise<{ success: boolean; data: any[] }> {
  const res = await fetch(`${API_BASE}/feedback`, { headers: getHeaders(true) });
  if (!res.ok) throw new Error('Failed to fetch feedback');
  return res.json();
}

// ── ADMIN: Delete feedback ────────────────────────────────────────────────
export async function deleteFeedback(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/feedback/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  if (!res.ok) throw new Error('Failed to delete feedback');
  return res.json();
}
