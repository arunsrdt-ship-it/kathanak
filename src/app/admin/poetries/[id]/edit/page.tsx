'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Save, Upload } from 'lucide-react';
import { type Poetry } from '@/lib/api';
import { useAdminPoetry, useUpdatePoetry } from '@/lib/hooks';

type FormState = {
  title: string;
  description: string;
  content: string;
  type: Poetry['type'];
  language: Poetry['language'];
  tags: string;
  duration: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
};

const EMPTY_FORM: FormState = {
  title: '', description: '', content: '', type: 'text', language: 'english',
  tags: '', duration: '', thumbnailUrl: '', isFeatured: false, isPublished: true,
};

export default function EditPoetry() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { data, isLoading, error } = useAdminPoetry(id);
  const updateMutation = useUpdatePoetry();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [media, setMedia] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const poetry = data?.data;
    if (!poetry) return;
    setForm({
      title: poetry.title || '',
      description: poetry.description || '',
      content: poetry.content || '',
      type: poetry.type,
      language: poetry.language,
      tags: poetry.tags.join(', '),
      duration: poetry.duration == null ? '' : String(poetry.duration),
      thumbnailUrl: poetry.thumbnailUrl || '',
      isFeatured: poetry.isFeatured,
      isPublished: poetry.isPublished,
    });
  }, [data]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    if (form.type !== 'text' && !data?.data.hasMedia && !media) {
      setMessage('Choose an audio or video file before saving this entry.');
      return;
    }
    if (form.type !== 'text' && form.type !== data?.data.type && !media) {
      setMessage('Choose a new media file when changing the media type.');
      return;
    }
    if (form.type === 'text' && !form.content.trim()) {
      setMessage('Add the poem text before saving this entry.');
      return;
    }

    const body = new FormData();
    body.append('title', form.title.trim());
    body.append('description', form.description);
    body.append('content', form.content);
    body.append('type', form.type);
    body.append('language', form.language);
    body.append('tags', JSON.stringify(form.tags.split(',').map(tag => tag.trim()).filter(Boolean)));
    body.append('duration', form.duration);
    body.append('thumbnailUrl', form.thumbnailUrl.trim());
    body.append('isFeatured', String(form.isFeatured));
    body.append('isPublished', String(form.isPublished));
    if (media) body.append('media', media);
    if (thumbnail) body.append('thumbnail', thumbnail);

    updateMutation.mutate({ id, formData: body }, {
      onSuccess: () => router.push('/admin/poetries'),
      onError: err => setMessage(err.message || 'Could not save this poetry.'),
    });
  };

  if (isLoading) {
    return <div className="p-8 font-mono text-sm uppercase tracking-widest text-white/45">Loading entry…</div>;
  }
  if (error || !data?.data) {
    return (
      <div className="max-w-3xl p-6 md:p-10">
        <p className="mb-5 text-red-200">{error instanceof Error ? error.message : 'Poetry not found.'}</p>
        <Link href="/admin/poetries" className="btn-outline"><ArrowLeft size={14} /> BACK TO POETRIES</Link>
      </div>
    );
  }

  const poetry = data.data;
  const labelClass = 'font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/55';

  return (
    <div className="max-w-5xl p-6 md:p-10">
      <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
        <Link href="/admin/poetries" aria-label="Back to poetries" className="btn-outline !p-2.5">
          <ArrowLeft size={15} />
        </Link>
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">POETRY MANAGEMENT</p>
          <h1 className="truncate font-display text-2xl font-bold text-white">Edit: {poetry.title}</h1>
        </div>
      </div>

      {message && (
        <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-amber-300/20 bg-amber-300/8 p-4 text-sm text-amber-100/90">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <section className="grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-2 md:p-7">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Title *</span>
            <input className="form-input" required maxLength={200} value={form.title} onChange={e => setField('title', e.target.value)} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Type</span>
            <select className="form-input" value={form.type} onChange={e => setField('type', e.target.value as Poetry['type'])}>
              <option value="text">Written poem</option><option value="audio">Audio</option><option value="video">Video</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Language</span>
            <select className="form-input" value={form.language} onChange={e => setField('language', e.target.value as Poetry['language'])}>
              <option value="english">English</option><option value="hindi">Hindi</option><option value="urdu">Urdu</option><option value="other">Other</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Tags, comma separated</span>
            <input className="form-input" value={form.tags} onChange={e => setField('tags', e.target.value)} placeholder="love, life, hope" />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea className="form-input resize-y" rows={3} maxLength={1000} value={form.description} onChange={e => setField('description', e.target.value)} />
          </label>
          {form.type === 'text' && (
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className={labelClass}>Poem text *</span>
              <textarea className="form-input min-h-64 resize-y" required value={form.content} onChange={e => setField('content', e.target.value)} />
            </label>
          )}
          {form.type !== 'text' && (
            <div className="flex flex-col gap-3 md:col-span-2">
              <span className={labelClass}>Media file {poetry.hasMedia ? '(leave empty to keep current file)' : '(required)'}</span>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-white/70 hover:bg-white/10">
                <Upload size={16} />
                <span className="min-w-0 flex-1 truncate">{media?.name || (poetry.hasMedia ? 'Replace current media' : `Choose ${form.type} file`)}</span>
                <input className="sr-only" type="file" accept={form.type === 'audio' ? 'audio/*' : 'video/*'} onChange={e => setMedia(e.target.files?.[0] || null)} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Duration in seconds</span>
                <input className="form-input max-w-xs" type="number" min="0" value={form.duration} onChange={e => setField('duration', e.target.value)} />
              </label>
            </div>
          )}
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className={labelClass}>Thumbnail URL</span>
            <input className="form-input" type="url" value={form.thumbnailUrl} onChange={e => setField('thumbnailUrl', e.target.value)} placeholder="https://…" />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className={labelClass}>Or upload a thumbnail image</span>
            <input className="form-input file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => setThumbnail(e.target.files?.[0] || null)} />
          </label>
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-2">
            <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isFeatured} onChange={e => setField('isFeatured', e.target.checked)} /> Featured</label>
            <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isPublished} onChange={e => setField('isPublished', e.target.checked)} /> Published</label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/45">Created {new Date(poetry.createdAt).toLocaleDateString()}</p>
          <button className="btn-primary" type="submit" disabled={updateMutation.isPending}>
            <Save size={14} /> {updateMutation.isPending ? 'SAVING…' : 'SAVE CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
}
