'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music, Video, BookOpen, Heart, Eye, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import type { Poetry } from '@/lib/api';
import { formatDuration, formatDate, likePoetry } from '@/lib/api';

const typeConfig = {
  audio: {
    icon: <Music size={14} strokeWidth={2.5} />,
    label: 'AUDIO',
    glowColor: 'rgba(255,200,100,0.15)',
    badgeCls: 'badge-audio',
  },
  video: {
    icon: <Video size={14} strokeWidth={2.5} />,
    label: 'VIDEO',
    glowColor: 'rgba(100,180,255,0.15)',
    badgeCls: 'badge-video',
  },
  text: {
    icon: <BookOpen size={14} strokeWidth={2.5} />,
    label: 'READ',
    glowColor: 'rgba(200,200,200,0.1)',
    badgeCls: 'badge-text',
  },
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
    <article
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/8 bg-white/5 backdrop-blur-lg transition-all duration-400"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Card glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${cfg.glowColor} 0%, transparent 60%)` }}
      />

      <Link href={href} className="flex flex-col h-full relative">

        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
          {poetry.thumbnailUrl ? (
            <Image
              src={poetry.thumbnailUrl}
              alt={poetry.title}
              fill
              sizes="400px"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.4) 1px, transparent 0)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="relative z-10 h-14 w-14 rounded-full border border-white/15 bg-white/8 flex items-center justify-center text-white/60 transition-transform duration-300 group-hover:scale-110">
                {cfg.icon}
              </div>
            </div>
          )}

          {/* Gradient overlay on thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`badge ${cfg.badgeCls}`}>{cfg.label}</span>
            {poetry.isFeatured && (
              <span className="badge badge-featured">
                <Star size={9} className="fill-white" />
              </span>
            )}
          </div>

          {/* Duration */}
          {poetry.duration && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2 py-1 backdrop-blur-sm">
              <Clock size={9} strokeWidth={2.5} className="text-white/60" />
              <span className="font-mono text-[9px] font-bold tracking-widest text-white/70">
                {formatDuration(poetry.duration)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-3">
            {poetry.language && (
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase rounded-full border border-white/10 px-2 py-0.5 text-white/40">
                {poetry.language}
              </span>
            )}
            <span className="ml-auto font-mono text-[9px] font-bold tracking-widest text-white/30">
              {formatDate(poetry.createdAt)}
            </span>
          </div>

          <h3
            className={`font-display font-bold tracking-tight text-white/90 leading-[1.15] mb-2 group-hover:text-white transition-colors ${
              featured ? 'text-xl' : 'text-lg'
            }`}
          >
            {poetry.title}
          </h3>

          {poetry.description && (
            <p className="font-mono text-[10px] leading-relaxed text-white/35 uppercase tracking-wide mb-4 line-clamp-2">
              {poetry.description}
            </p>
          )}

          {/* Footer row */}
          <div className="mt-auto pt-4 border-t border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-white/35">
                <Eye size={12} strokeWidth={2} /> {poetry.views.toLocaleString()}
              </span>
              <button
                onClick={handleLike}
                disabled={liking}
                className={`flex items-center gap-1.5 font-mono text-[9px] font-bold transition-all hover:scale-110 ${
                  liked ? 'text-pink-400' : 'text-white/35 hover:text-pink-400'
                }`}
              >
                <Heart size={12} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
                {likes.toLocaleString()}
              </button>
            </div>

            {/* Arrow */}
            <div className="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/30 transition-all duration-200 group-hover:bg-white/12 group-hover:text-white/80 group-hover:border-white/20">
              <span className="font-mono text-[10px] -rotate-45 block">→</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
