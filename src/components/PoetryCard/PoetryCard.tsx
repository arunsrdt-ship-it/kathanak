'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, Video, BookOpen, Heart, Eye, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import type { Poetry } from '@/lib/api';
import { formatDuration, formatDate, likePoetry } from '@/lib/api';

const typeConfig = {
  audio: { icon: <Music size={14} strokeWidth={2.5} />,    label: 'AUDIO', badge: 'badge-audio', placeholderBg: 'bg-accent-beige' },
  video: { icon: <Video size={14} strokeWidth={2.5} />,    label: 'VIDEO', badge: 'badge-video', placeholderBg: 'bg-accent-blue'  },
  text:  { icon: <BookOpen size={14} strokeWidth={2.5} />, label: 'READ',  badge: 'badge-text',  placeholderBg: 'bg-bg-alt'       },
};

interface Props { poetry: Poetry; featured?: boolean; }

export default function PoetryCard({ poetry, featured = false }: Props) {
  const [likes,  setLikes]  = useState(poetry.likes);
  const [liked,  setLiked]  = useState(false);
  const [liking, setLiking] = useState(false);

  const cfg  = typeConfig[poetry.type];
  const href = `/${poetry.type === 'text' ? 'read' : poetry.type === 'audio' ? 'listen' : 'watch'}/${poetry.slug}`;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked || liking) return;
    setLiking(true);
    try {
      const res = await likePoetry(poetry._id);
      setLikes(res.data.likes);
      setLiked(true);
    } catch {}
    setLiking(false);
  };

  return (
    <article className={`brutalist-card flex flex-col h-full group ${featured ? 'bg-bg-alt' : 'bg-white'}`}>
      <Link href={href} className="flex flex-col h-full relative">
        
        {/* Thumbnail area */}
        <div className="relative aspect-[4/3] border-b-2 border-border overflow-hidden">
          {poetry.thumbnailUrl ? (
            <Image src={poetry.thumbnailUrl} alt={poetry.title} fill sizes="400px"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${cfg.placeholderBg}`}>
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
               <div className="w-16 h-16 rounded-full border-2 border-border bg-white flex items-center justify-center z-10 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] transition-transform group-hover:scale-110">
                 {cfg.icon}
               </div>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
            {poetry.isFeatured && (
              <span className="badge badge-featured"><Star size={10} className="fill-white" /></span>
            )}
          </div>

          {/* Bottom Time */}
          {poetry.duration && (
            <div className="absolute bottom-3 right-3 bg-white border-2 border-border px-2 py-1 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]">
              <Clock size={10} strokeWidth={3} />
              <span className="font-mono text-[10px] font-bold tracking-widest">{formatDuration(poetry.duration)}</span>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="flex flex-col p-5 flex-1">
          {/* Top meta row */}
          <div className="flex items-center justify-between mb-3">
             {poetry.language && (
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase border border-border px-2 py-0.5">
                  {poetry.language}
                </span>
             )}
             <span className="font-mono text-[10px] font-bold tracking-widest text-text-muted">
               {formatDate(poetry.createdAt)}
             </span>
          </div>

          <h3 className={`font-display font-black text-text-primary tracking-tighter uppercase leading-[1.1] mb-2
            ${featured ? 'text-2xl' : 'text-xl'}`}>
            {poetry.title}
          </h3>

          {poetry.description && (
            <p className="font-mono text-[11px] leading-relaxed text-text-secondary uppercase mb-4 line-clamp-2">
              {poetry.description}
            </p>
          )}

          <div className="mt-auto pt-4 border-t-2 border-dotted border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                <Eye size={14} strokeWidth={2} /> {poetry.views.toLocaleString()}
              </span>
              <button onClick={handleLike} disabled={liking}
                className={`flex items-center gap-1.5 font-mono text-[10px] font-bold transition-transform hover:scale-110 ${liked ? 'text-accent-dark' : 'hover:text-accent-dark'}`}>
                <Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
                {likes.toLocaleString()}
              </button>
            </div>
            
            {/* Tiny arrow link */}
            <div className="w-6 h-6 border border-border rounded-full flex items-center justify-center group-hover:bg-accent-dark group-hover:text-white transition-colors">
              <span className="font-mono text-[10px] rotate-[-45deg] block">→</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
