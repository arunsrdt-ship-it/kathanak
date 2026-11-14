const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

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

  // Public content can be served from Next's persistent cache between visits.
  // The short revalidation window avoids waiting on a sleeping API instance
  // for every navigation while keeping edits reasonably fresh.
  const res = await fetch(`${API_BASE}/poetry?${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch poetrys: ${res.statusText}`);
  return res.json();
}

// Admin reads bypass the public published-only feed and every browser/Next cache.
export async function fetchAdminPoetries(params: FetchPoetryParams = {}): Promise<PaginatedResponse> {
  const query = new URLSearchParams();
  if (params.type) query.set('type', params.type);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);

  const res = await fetch(`${API_BASE}/poetry/admin?${query.toString()}`, {
    headers: getHeaders(true),
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to load admin poetries (${res.status})`);
  }
  return res.json();
}

export async function fetchAdminPoetry(id: string): Promise<SingleResponse> {
  const res = await fetch(`${API_BASE}/poetry/admin/${encodeURIComponent(id)}`, {
    headers: getHeaders(true),
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to load poetry (${res.status})`);
  }
  return res.json();
}

// ── Fetch site config ─────────────────────────────────────────────────────
export async function fetchConfig(): Promise<{ success: boolean; data: SiteConfig }> {
  try {
    const res = await fetch(`${API_BASE}/config`);
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Failed to fetch config (Status ${res.status})`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn('fetchConfig warning:', err.message);
    throw err;
  }
}

// ── Fetch single poetry ───────────────────────────────────────────────────
export async function fetchPoetry(idOrSlug: string): Promise<SingleResponse> {
  const res = await fetch(`${API_BASE}/poetry/${encodeURIComponent(idOrSlug)}`, {
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
  const res = await fetch(`${API_BASE}/poetry/${encodeURIComponent(id)}/like`, { method: 'POST' });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to like');
  }
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
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to send feedback (${res.status})`);
  }
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
  if (!res.ok) throw new Error(`Could not check Google Drive status (${res.status})`);
  return res.json();
}

// ── ADMIN: Update config ──────────────────────────────────────────────────
export async function updateConfig(data: Partial<SiteConfig>): Promise<{ success: boolean; data?: SiteConfig }> {
  const res = await fetch(`${API_BASE}/config`, {
    method: 'PATCH',
    headers: { ...getHeaders(true), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to update config (Status ${res.status})`);
  }
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
export async function createMediaUploadSession(file: File, type: 'audio' | 'video'): Promise<string> {
  const res = await fetch(`${API_BASE}/poetry/upload-session`, {
    method: 'POST',
    headers: { ...getHeaders(true), 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, mimeType: file.type, fileSize: file.size, type }),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || !payload.data?.sessionUrl) {
    throw new Error(payload.message || `Could not prepare media upload (${res.status})`);
  }
  return payload.data.sessionUrl;
}

// Send media in resumable 8 MB chunks directly to Google Drive. This keeps
// large video bytes out of the Render API request, which was returning 502s.
export async function uploadMediaToDrive(
  sessionUrl: string,
  file: File,
  onProgress: (percent: number) => void,
): Promise<string> {
  if (!sessionUrl.startsWith('https://www.googleapis.com/upload/drive/v3/files?')) {
    throw new Error('Google Drive returned an invalid upload session');
  }

  const chunkSize = 8 * 1024 * 1024; // Multiple of Google's 256 KB chunk size.
  let start = 0;

  const sendChunk = (from: number, to: number) => new Promise<XMLHttpRequest>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('PUT', sessionUrl);
    request.setRequestHeader('Content-Range', `bytes ${from}-${to - 1}/${file.size}`);
    request.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    request.upload.onprogress = event => {
      if (event.lengthComputable) onProgress(Math.min(99, Math.round(((from + event.loaded) / file.size) * 100)));
    };
    request.onload = () => resolve(request);
    request.onerror = () => reject(new Error('Network interrupted while uploading to Google Drive'));
    request.ontimeout = () => reject(new Error('Google Drive upload timed out. Please retry the upload.'));
    request.timeout = 120_000;
    request.send(file.slice(from, to));
  });

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const response = await sendChunk(start, end);

    if (response.status === 308) {
      const range = response.getResponseHeader('Range');
      const lastReceived = range?.match(/bytes=0-(\d+)/)?.[1];
      start = lastReceived ? Number(lastReceived) + 1 : end;
      onProgress(Math.min(99, Math.floor((start / file.size) * 100)));
      continue;
    }

    if (response.status === 200 || response.status === 201) {
      const uploadedFile = JSON.parse(response.responseText || '{}');
      if (!uploadedFile.id) throw new Error('Google Drive finished the upload but returned no file ID');
      onProgress(100);
      return uploadedFile.id as string;
    }

    let message = `Google Drive upload failed (${response.status})`;
    try {
      const body = JSON.parse(response.responseText);
      message = body.error?.message || body.message || message;
    } catch {
      if (response.statusText) message = `${message}: ${response.statusText}`;
    }
    throw new Error(message);
  }

  throw new Error('Google Drive did not confirm that the upload completed');
}

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

export async function updatePoetry(id: string, formData: FormData): Promise<{ success: boolean; data: Poetry }> {
  const res = await fetch(`${API_BASE}/poetry/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to update poetry (${res.status})`);
  }
  return res.json();
}

// ── ADMIN: Fetch feedback ─────────────────────────────────────────────────
export async function fetchFeedback(): Promise<{ success: boolean; data: any[] }> {
  const res = await fetch(`${API_BASE}/feedback`, { headers: getHeaders(true) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch feedback (${res.status})`);
  }
  return res.json();
}

// ── ADMIN: Delete feedback ────────────────────────────────────────────────
export async function deleteFeedback(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/feedback/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete feedback (${res.status})`);
  }
  return res.json();
}
