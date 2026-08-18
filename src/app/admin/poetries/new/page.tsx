'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { uploadPoetry } from '@/lib/api';
import { ArrowLeft, Save, Upload, AlertTriangle, CheckCircle } from 'lucide-react';

/* ── reusable dark label ──────────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
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
      {/* Custom pill toggle */}
      <div
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full border transition-all duration-300 ${
          checked
            ? 'bg-white/20 border-white/30'
            : 'bg-white/5 border-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white/90 shadow transition-all duration-300 ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        />
      </div>
      <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/45 group-hover:text-white/65 transition-colors">
        {label}
      </span>
    </label>
  );
}

export default function NewPoetry() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const [formData, setFormData] = useState({
    title:        '',
    description:  '',
    type:         'text',
    language:     'english',
    tags:         '',
    content:      '',
    thumbnailUrl: '',
    isFeatured:   false,
    isPublished:  true,
  });

  const [file, setFile] = useState<File | null>(null);

  const set = (k: string, v: string | boolean) =>
    setFormData(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'tags') {
          const t = (val as string).split(',').map(s => s.trim()).filter(Boolean);
          data.append('tags', JSON.stringify(t));
        } else {
          data.append(key, String(val));
        }
      });
      if (file && (formData.type === 'audio' || formData.type === 'video')) {
        data.append('media', file);
      }
      await uploadPoetry(data);
      router.push('/admin/poetries');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload poetry');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl">

      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-white/8 flex items-center gap-4">
        <Link
          href="/admin/poetries"
          className="h-9 w-9 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/40 hover:bg-white/12 hover:text-white/70 transition-all shrink-0"
        >
          <ArrowLeft size={15} />
        </Link>
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-0.5">
            POETRY MANAGEMENT
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white/85">
            New Entry
          </h1>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
          <AlertTriangle size={14} className="text-red-400/70 shrink-0" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-300/70">
            {error}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Main fields card */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
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
                <DarkSelect value={formData.type} onChange={v => set('type', v)}>
                  <option value="text">Text Only</option>
                  <option value="audio">Audio Stream</option>
                  <option value="video">Video Stream</option>
                </DarkSelect>
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

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Thumbnail URL (optional)</FieldLabel>
                <input
                  type="text"
                  className="form-input"
                  value={formData.thumbnailUrl}
                  onChange={e => set('thumbnailUrl', e.target.value)}
                  placeholder="https://..."
                />
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
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
            <FieldLabel>
              Media file — uploads to Google Drive
            </FieldLabel>
            <div className="relative mt-3 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/12 bg-white/3 py-10 cursor-pointer group hover:bg-white/6 hover:border-white/20 transition-all">
              <input
                type="file"
                required
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept={formData.type === 'audio' ? 'audio/*' : 'video/*'}
              />
              <div className="h-12 w-12 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/35 group-hover:scale-110 group-hover:text-white/60 transition-all">
                <Upload size={18} />
              </div>
              <div className="text-center">
                <p className="font-display text-base font-bold tracking-tight text-white/60 group-hover:text-white/80 transition-colors">
                  {file ? file.name : `Select ${formData.type} file`}
                </p>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/25 mt-1">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : 'Click or drag & drop'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Poem text */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Poem Text / Lyrics</FieldLabel>
            <textarea
              rows={12}
              className="form-input resize-y"
              style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.05rem', lineHeight: '1.8' }}
              value={formData.content}
              onChange={e => set('content', e.target.value)}
              placeholder="The text of the poetry..."
            />
          </div>
        </div>

        {/* Toggles + submit */}
        <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
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
              <>Saving… <span className="animate-spin ml-1 block h-3 w-3 rounded-full border border-white/30 border-t-white/80" /></>
            ) : (
              <><Save size={13} /> SAVE ENTRY</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
