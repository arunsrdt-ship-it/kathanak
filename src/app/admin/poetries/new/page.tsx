'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { createMediaUploadSession, uploadMediaToDrive, uploadPoetry } from '@/lib/api';
import { ArrowLeft, Save, Upload, AlertTriangle } from 'lucide-react';

/* ── reusable dark label ──────────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60">
      {children}
    </label>
  );
}

/* ── dark select ──────────────────────────────────────────────────── */
function DarkSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="form-input appearance-none cursor-pointer"
      style={{ backgroundImage: 'none' }}
    >
      {children}
    </select>
  );
}

/* ── toggle checkbox ──────────────────────────────────────────────── */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={event => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`relative h-5 w-9 rounded-full border transition-all duration-300 ${
          checked
            ? 'bg-ink/20 border-ink/30'
            : 'bg-ink/5 border-ink/10'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink/90 shadow transition-all duration-300 ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        />
      </span>
      <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-ink/70 group-hover:text-ink/75 transition-colors">
        {label}
      </span>
    </label>
  );
}

export default function NewPoetry() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title:        '',
    description:  '',
    type:         'text',
    language:     'english',
    tags:         '',
    content:      '',
    duration:     '',
    isFeatured:   false,
    isPublished:  true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const set = (k: string, v: string | boolean) =>
    setFormData(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === 'text' && !formData.content.trim()) {
      setError('Please add the poem text before saving.');
      return;
    }
    if ((formData.type === 'audio' || formData.type === 'video') && !file) {
      setError(`Please choose a ${formData.type} file before saving.`);
      return;
    }
    const maxMediaSize = formData.type === 'audio' ? 100 : 500;
    if (file && file.size > maxMediaSize * 1024 * 1024) {
      setError(`${formData.type === 'audio' ? 'Audio' : 'Video'} files must be under ${maxMediaSize} MB.`);
      return;
    }
    if (thumbnailFile && thumbnailFile.size > 10 * 1024 * 1024) {
      setError('Thumbnail images must be under 10 MB.');
      return;
    }
    setLoading(true); setError('');
    try {
      let driveFileId: string | null = null;
      if (file && (formData.type === 'audio' || formData.type === 'video')) {
        setUploadProgress(0);
        const uploadToken = await createMediaUploadSession(file, formData.type);
        driveFileId = await uploadMediaToDrive(uploadToken, file, setUploadProgress);
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'tags') {
          const t = (val as string).split(',').map(s => s.trim()).filter(Boolean);
          data.append('tags', JSON.stringify(t));
        } else {
          data.append(key, String(val));
        }
      });
      if (driveFileId) data.append('driveFileId', driveFileId);
      if (thumbnailFile) data.append('thumbnail', thumbnailFile);
      await uploadPoetry(data);
      await queryClient.invalidateQueries({ queryKey: ['admin-poetries'] });
      await queryClient.invalidateQueries({ queryKey: ['poetries'] });
      router.push('/admin/poetries');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload poetry');
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl">

      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-ink/8 flex items-center gap-4">
        <Link
          href="/admin/poetries"
          className="h-9 w-9 rounded-full border border-ink/10 bg-ink/6 flex items-center justify-center text-ink/70 hover:bg-ink/12 hover:text-ink/80 transition-all shrink-0"
        >
          <ArrowLeft size={15} />
        </Link>
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60 mb-0.5">
            POETRY MANAGEMENT
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink/85">
            New Entry
          </h1>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
          <AlertTriangle size={14} className="text-red-800 shrink-0" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-800">
            {error}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Main fields card */}
        <div className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left column */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Title *</FieldLabel>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="Entry title"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Type</FieldLabel>
                <DarkSelect value={formData.type} onChange={v => { set('type', v); setFile(null); }}>
                  <option value="text">Written poem</option>
                  <option value="audio">Audio poem — upload a file</option>
                  <option value="video">Video poem — upload a file</option>
                </DarkSelect>
                <p className="text-xs leading-relaxed text-ink/70">
                  Choose Audio or Video to show the required file upload.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Language</FieldLabel>
                <DarkSelect value={formData.language} onChange={v => set('language', v)}>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="urdu">Urdu</option>
                  <option value="other">Other</option>
                </DarkSelect>
              </div>

            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <FieldLabel>Description</FieldLabel>
                <textarea
                  rows={5}
                  className="form-input resize-none"
                  value={formData.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Short summary..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Tags (comma separated)</FieldLabel>
                <input
                  type="text"
                  className="form-input"
                  value={formData.tags}
                  onChange={e => set('tags', e.target.value)}
                  placeholder="life, love, nature..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media upload (conditional) */}
        {(formData.type === 'audio' || formData.type === 'video') && (
          <div className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm">
            <FieldLabel>{formData.type === 'audio' ? 'Audio file (required)' : 'Video file (required)'}</FieldLabel>
            <p className="mt-1 text-xs leading-relaxed text-ink/70">
              Large files are sent in small chunks through the API to Google Drive, avoiding one oversized request. Site players can fetch the file after saving.
              {formData.type === 'audio' ? ' Audio limit: 100 MB.' : ' Video limit: 500 MB.'}
            </p>
            <div className="relative mt-3 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink/12 bg-ink/3 py-10 cursor-pointer group hover:bg-ink/6 hover:border-ink/20 transition-all">
              <input
                type="file"
                required
                onChange={e => {
                  const selected = e.target.files?.[0] || null;
                  const maxSize = formData.type === 'audio' ? 100 : 500;
                  if (selected && selected.size > maxSize * 1024 * 1024) {
                    setError(`${formData.type === 'audio' ? 'Audio' : 'Video'} files must be under ${maxSize} MB.`);
                    setFile(null);
                    e.currentTarget.value = '';
                    return;
                  }
                  setError('');
                  setFile(selected);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept={formData.type === 'audio'
                  ? 'audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/aac,audio/flac,audio/mp4,audio/x-m4a,.mp3,.wav,.ogg,.aac,.flac,.m4a'
                  : 'video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/mpeg,.mp4,.webm,.mov,.avi,.mpeg,.mpg'}
              />
              <div className="h-12 w-12 rounded-full border border-ink/10 bg-ink/6 flex items-center justify-center text-ink/60 group-hover:scale-110 group-hover:text-ink/75 transition-all">
                <Upload size={18} />
              </div>
              <div className="text-center">
                <p className="font-display text-base font-bold tracking-tight text-ink/75 group-hover:text-ink/90 transition-colors">
                  {file ? file.name : `Select ${formData.type} file`}
                </p>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/60 mt-1">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : 'Click or drag & drop'
                  }
                </p>
              </div>
            </div>
            {loading && uploadProgress !== null && (
              <div className="mt-4" role="status" aria-live="polite">
                <div className="mb-2 flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-ink/65">
                  <span>{uploadProgress < 100 ? 'Uploading media to Google Drive' : 'Saving poetry entry'}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full rounded-full bg-ink/65 transition-[width] duration-200" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
            <div className="mt-5 flex max-w-xs flex-col gap-1.5">
                <FieldLabel>Duration in seconds (optional)</FieldLabel>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="form-input"
                  value={formData.duration}
                  onChange={e => set('duration', e.target.value)}
                  placeholder="e.g. 95"
                />
            </div>
          </div>
        )}

        {/* Poem text */}
        <div className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Poem Text / Lyrics</FieldLabel>
            <textarea
              rows={12}
              required={formData.type === 'text'}
              className="form-input resize-y"
              style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.05rem', lineHeight: '1.8' }}
              value={formData.content}
              onChange={e => set('content', e.target.value)}
              placeholder="The text of the poetry..."
            />
          </div>
        </div>

        <div className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm">
          <FieldLabel>Thumbnail image (optional, one file)</FieldLabel>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={e => {
              const selected = e.target.files?.[0] || null;
              if (selected && selected.size > 10 * 1024 * 1024) {
                setError('Thumbnail images must be under 10 MB.');
                setThumbnailFile(null);
                e.currentTarget.value = '';
                return;
              }
              setError('');
              setThumbnailFile(selected);
            }}
            className="form-input mt-3 file:mr-4 file:rounded-full file:border-0 file:bg-ink/10 file:px-4 file:py-2 file:text-sm file:text-ink"
          />
          {thumbnailFile && <p className="mt-2 text-xs text-ink/70">{thumbnailFile.name}</p>}
        </div>

        {/* Toggles + submit */}
        <div className="rounded-2xl border border-ink/8 bg-ink/4 p-5 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-6">
            <Toggle
              label="Featured"
              checked={formData.isFeatured}
              onChange={v => set('isFeatured', v)}
            />
            <Toggle
              label="Publish immediately"
              checked={formData.isPublished}
              onChange={v => set('isPublished', v)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary shrink-0 py-2.5 px-6"
          >
            {loading ? (
              <>{uploadProgress !== null && uploadProgress < 100 ? `UPLOADING ${uploadProgress}%` : 'SAVING…'} <span className="animate-spin ml-1 block h-3 w-3 rounded-full border border-ink/30 border-t-white/80" /></>
            ) : (
              <><Save size={13} /> SAVE ENTRY</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
