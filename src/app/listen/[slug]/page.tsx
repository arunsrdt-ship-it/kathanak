import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Eye, Clock, Music } from 'lucide-react';
import { fetchPoetry, fetchPoetrys, formatDate, formatDuration } from '@/lib/api';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import PoetryCard from '@/components/PoetryCard/PoetryCard';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetchPoetry(slug);
    return {
      title: `${res.data.title} — Audio Poetry`,
      description: res.data.description || `Listen to "${res.data.title}"`,
    };
  } catch {
    return { title: 'Poetry Not Found' };
  }
}

export default async function ListenDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await fetchPoetry(slug).catch(() => null);
  if (!res || res.data.type !== 'audio') notFound();

  const poetry = res.data;
  const moreRes = await fetchPoetrys({ type: 'audio', limit: 4 }).catch(() => null);
  const more = (moreRes?.data ?? []).filter(p => p._id !== poetry._id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <div className="border-b-2 border-border bg-accent-beige h-12 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <Link href="/listen" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:underline">
            <ArrowLeft size={14} /> BACK TO LISTEN
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">

          {/* ── Left: Info ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge badge-audio"><Music size={11} strokeWidth={2.5}/> AUDIO</span>
                {poetry.isFeatured && <span className="badge badge-featured">FEATURED</span>}
                <span className="badge bg-white">{poetry.language}</span>
              </div>
              <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter uppercase mb-6">
                {poetry.title}
              </h1>
              {poetry.description && (
                <p className="font-mono text-sm leading-relaxed text-text-secondary uppercase">
                  {poetry.description}
                </p>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-8 font-mono text-[10px] font-bold tracking-widest uppercase border-y-2 border-border py-6">
              <span className="flex items-center gap-2"><Eye size={14} /> {poetry.views.toLocaleString()} PLAYS</span>
              <span className="flex items-center gap-2"><Heart size={14} /> {poetry.likes.toLocaleString()} LIKES</span>
              {poetry.duration && <span className="flex items-center gap-2"><Clock size={14} /> {formatDuration(poetry.duration)}</span>}
              <span>{formatDate(poetry.createdAt)}</span>
            </div>

            {/* Tags */}
            {poetry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {poetry.tags.map(tag => (
                  <span key={tag} className="badge bg-white text-text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content (lyrics if any) */}
            {poetry.content && (
              <div className="brutalist-card bg-bg-alt p-8 mt-4">
                <h2 className="font-display text-3xl font-black uppercase tracking-tighter mb-6 border-b-2 border-border pb-4">TRANSCRIPT</h2>
                <div className="font-prose text-xl text-text-primary leading-[1.8] whitespace-pre-wrap">
                  {poetry.content}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Player ─────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-28 h-fit flex flex-col gap-6">
            <AudioPlayer poetryId={poetry._id} title={poetry.title} thumbnailUrl={poetry.thumbnailUrl} />

            <button className="btn-primary w-full shadow-brutalist hover:shadow-brutalist-hover bg-accent-beige text-accent-dark border-border">
              <Heart size={16} /> LIKE THIS POETRY
            </button>
          </div>
        </div>

        {/* ── More audio ────────────────────────────────────── */}
        {more.length > 0 && (
          <div className="mt-24 pt-16 border-t-2 border-border">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-black tracking-tighter uppercase">MORE ARCHIVES</h2>
              <Link href="/listen" className="font-mono text-[10px] font-bold tracking-widest uppercase border-b border-accent-dark">VIEW ALL</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {more.map(p => <PoetryCard key={p._id} poetry={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
