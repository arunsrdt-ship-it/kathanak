import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Eye, Clock, Video } from 'lucide-react';
import { fetchPoetry, fetchPoetrys, formatDate, formatDuration } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import PoetryCard from '@/components/PoetryCard/PoetryCard';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetchPoetry(slug);
    return { title: `${res.data.title} — Video Poetry`, description: res.data.description || `Watch "${res.data.title}"` };
  } catch {
    return { title: 'Poetry Not Found' };
  }
}

export default async function WatchDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await fetchPoetry(slug).catch(() => null);
  if (!res || res.data.type !== 'video') notFound();

  const poetry = res.data;
  const moreRes = await fetchPoetrys({ type: 'video', limit: 4 }).catch(() => null);
  const more = (moreRes?.data ?? []).filter(p => p._id !== poetry._id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <div className="border-b-2 border-border bg-accent-blue h-12 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <Link href="/watch" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:underline">
            <ArrowLeft size={14} /> BACK TO WATCH
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col gap-12">

        {/* Info Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b-2 border-border">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-video"><Video size={11} strokeWidth={2.5}/> VIDEO</span>
              {poetry.isFeatured && <span className="badge badge-featured">FEATURED</span>}
              <span className="badge bg-white">{poetry.language}</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.9] tracking-tighter uppercase mb-6">
              {poetry.title}
            </h1>
            {poetry.description && (
              <p className="font-mono text-sm leading-relaxed text-text-secondary uppercase">
                {poetry.description}
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-4 font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted">
            <span className="flex items-center gap-2"><Eye size={14} /> {poetry.views.toLocaleString()} VIEWS</span>
            <span className="flex items-center gap-2"><Heart size={14} /> {poetry.likes.toLocaleString()} LIKES</span>
            {poetry.duration && <span className="flex items-center gap-2"><Clock size={14} /> {formatDuration(poetry.duration)}</span>}
            <span>{formatDate(poetry.createdAt)}</span>
          </div>
        </div>

        {/* Video player — full width */}
        <div className="max-w-[1000px] mx-auto w-full">
          <VideoPlayer poetryId={poetry._id} title={poetry.title} thumbnailUrl={poetry.thumbnailUrl} />
        </div>

        {/* Secondary info (Lyrics/Tags) */}
        <div className="max-w-[1000px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 mt-8">
           {poetry.content ? (
              <div className="brutalist-card bg-white p-8">
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-6 border-b-2 border-border pb-4">POEM TEXT</h2>
                <div className="font-prose text-lg text-text-primary leading-[1.8] whitespace-pre-wrap">{poetry.content}</div>
              </div>
            ) : <div />}

            <div className="flex flex-col gap-6">
               <button className="btn-primary w-full shadow-brutalist hover:shadow-brutalist-hover bg-accent-blue text-accent-dark border-border">
                 <Heart size={16} /> LIKE THIS POETRY
               </button>
               {poetry.tags.length > 0 && (
                <div className="brutalist-card bg-bg-alt p-6 mt-4">
                  <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase mb-4 border-b-2 border-border pb-2">TAGS</h3>
                  <div className="flex flex-wrap gap-2">
                    {poetry.tags.map(tag => (
                      <span key={tag} className="badge bg-white">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>

        {/* More videos */}
        {more.length > 0 && (
          <div className="mt-16 pt-16 border-t-2 border-border">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-black tracking-tighter uppercase">RELATED SHOTS</h2>
              <Link href="/watch" className="font-mono text-[10px] font-bold tracking-widest uppercase border-b border-accent-dark">VIEW ALL</Link>
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
