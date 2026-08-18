import PoetryCard from '@/components/PoetryCard/PoetryCard';
import type { Poetry } from '@/lib/api';
import { Music, Video, BookOpen } from 'lucide-react';

interface Props {
  type: 'audio' | 'video' | 'text';
  poetries: Poetry[];
  total: number;
  page: number;
  pages: number;
  title: string;
  hindiTitle: string;
  desc: string;
}

const typeConfig = {
  audio: {
    icon: <Music size={32} strokeWidth={1.5} />,
    glow: 'rgba(255,200,100,0.12)',
    accent: 'rgba(255,200,100,0.6)',
  },
  video: {
    icon: <Video size={32} strokeWidth={1.5} />,
    glow: 'rgba(100,180,255,0.12)',
    accent: 'rgba(100,180,255,0.6)',
  },
  text: {
    icon: <BookOpen size={32} strokeWidth={1.5} />,
    glow: 'rgba(200,200,200,0.08)',
    accent: 'rgba(200,200,200,0.5)',
  },
};

export default function ModulePageLayout({
  type, poetries, total, page, pages, title, hindiTitle, desc,
}: Props) {
  const cfg = typeConfig[type];

  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Cinematic page header ────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-20 border-b border-white/8"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, ${cfg.glow} 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%),
            #090909
          `,
        }}
      >
        {/* Huge ghost type */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
          aria-hidden
        >
          <span
            className="font-display font-black uppercase leading-none whitespace-nowrap opacity-[0.03]"
            style={{ fontSize: 'clamp(8rem,18vw,16rem)', letterSpacing: '-0.04em', color: '#fff' }}
          >
            {title}
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="flex flex-col gap-6">
            {/* Icon pill */}
            <div
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-5 py-2.5 w-fit backdrop-blur-lg"
            >
              <span style={{ color: cfg.accent }}>{cfg.icon}</span>
              <span className="font-prose text-lg italic text-white/55">{hindiTitle}</span>
            </div>

            <h1
              className="font-display font-black uppercase leading-[0.85] text-white"
              style={{ fontSize: 'clamp(3.5rem,9vw,7rem)', letterSpacing: '-0.04em' }}
            >
              {title}
            </h1>

            <p className="font-mono text-xs font-bold uppercase tracking-widest max-w-lg leading-relaxed text-white/40 border-l-2 border-white/15 pl-4">
              {desc}
            </p>
          </div>

          {/* Total count */}
          {total > 0 && (
            <div className="text-right shrink-0">
              <span
                className="block font-silk text-white/80 leading-none"
                style={{ fontSize: 'clamp(3rem,7vw,5rem)' }}
              >
                {total}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                {total === 1 ? 'ENTRY' : 'ENTRIES'} INDEXED
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        {poetries.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-lg p-20 text-center"
          >
            <div className="h-16 w-16 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/30">
              {cfg.icon}
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white/50">
              Archive Empty
            </h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/25">
              Check back soon for new additions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {poetries.map((p, i) => (
              <div
                key={p._id}
                className="card-rise"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <PoetryCard poetry={p} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-white/8">
            {page > 1 ? (
              <a href={`?page=${page - 1}`} className="btn-outline">PREV</a>
            ) : (
              <span className="btn-outline opacity-40 pointer-events-none">PREV</span>
            )}
            <span className="font-mono text-xs font-bold tracking-widest text-white/40">
              {page} / {pages}
            </span>
            {page < pages ? (
              <a href={`?page=${page + 1}`} className="btn-outline">NEXT</a>
            ) : (
              <span className="btn-outline opacity-40 pointer-events-none">NEXT</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
