import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Eye, BookOpen } from 'lucide-react';
import { fetchPoetry, fetchPoetrys, formatDate } from '@/lib/api';
import PoetryCard from '@/components/PoetryCard/PoetryCard';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetchPoetry(slug);
    return { title: `${res.data.title} — Poetry`, description: res.data.description || `Read "${res.data.title}"` };
  } catch {
    return { title: 'Poetry Not Found' };
  }
}

export default async function ReadDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await fetchPoetry(slug).catch(() => null);
  if (!res || res.data.type !== 'text') notFound();

  const poetry = res.data;
  const moreRes = await fetchPoetrys({ type: 'text', limit: 4 }).catch(() => null);
  const more = (moreRes?.data ?? []).filter(p => p._id !== poetry._id).slice(0, 3);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <div className="border-b-2 border-border bg-bg-alt h-12 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <Link href="/read" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:underline">
            <ArrowLeft size={14} /> BACK TO ARCHIVE
          </Link>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="border-b-2 border-border bg-white pt-24 pb-16">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <span className="badge badge-text"><BookOpen size={11} strokeWidth={2.5}/> READ</span>
            {poetry.isFeatured && <span className="badge badge-featured">FEATURED</span>}
            <span className="badge bg-white">{poetry.language}</span>
          </div>
          
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
            {poetry.title}
          </h1>
          
          {poetry.description && (
            <p className="font-mono text-sm leading-relaxed text-text-secondary uppercase max-w-lg mx-auto">
              {poetry.description}
            </p>
          )}

          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t-2 border-border font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="flex items-center gap-2"><Eye size={14} /> {poetry.views.toLocaleString()} VIEWS</span>
            <span className="flex items-center gap-2"><Heart size={14} /> {poetry.likes.toLocaleString()} LIKES</span>
            <span>{formatDate(poetry.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Poem content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20 relative">
        
        {/* Background decorative text */}
        <div className="absolute top-40 -left-20 font-display text-[15rem] font-black tracking-tighter text-bg-alt select-none pointer-events-none -rotate-90 origin-right opacity-50 hidden xl:block">
          POETRY
        </div>

        {poetry.content ? (
          <article className="brutalist-card bg-white p-6 sm:p-12 md:p-20 relative z-10 max-w-[800px] mx-auto">
             <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-border" />
             <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-border" />
             <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-border" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-border" />
            
            <div className="font-prose text-[1.4rem] md:text-[1.75rem] text-text-primary leading-[2.2] whitespace-pre-wrap tracking-wide text-center">
              {poetry.content}
            </div>
            
            <div className="flex justify-center mt-16 pt-8 border-t-2 border-dotted border-border">
               <button className="btn-outline shadow-brutalist hover:shadow-brutalist-hover text-accent-dark">
                 <Heart size={16} /> LIKE THIS PIECE
               </button>
            </div>
          </article>
        ) : (
          <div className="text-center py-20 font-mono text-sm font-bold tracking-widest uppercase text-text-muted">
            <p>NO TEXT AVAILABLE.</p>
          </div>
        )}

        {/* Tags */}
        {poetry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 justify-center max-w-[800px] mx-auto">
            {poetry.tags.map(tag => (
              <span key={tag} className="badge bg-white">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* More to read */}
      {more.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 pb-24">
          <div className="dotted-divider" />
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-4xl font-black tracking-tighter uppercase">MORE FROM THE ARCHIVE</h2>
            <Link href="/read" className="font-mono text-[10px] font-bold tracking-widest uppercase border-b border-accent-dark">VIEW ALL</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {more.map(p => <PoetryCard key={p._id} poetry={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
