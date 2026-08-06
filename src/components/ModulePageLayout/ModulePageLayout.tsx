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
  audio: { icon: <Music size={40} strokeWidth={2} />, bg: 'bg-accent-beige' },
  video: { icon: <Video size={40} strokeWidth={2} />, bg: 'bg-accent-blue'  },
  text:  { icon: <BookOpen size={40} strokeWidth={2}/>, bg: 'bg-bg-alt'       },
};

export default function ModulePageLayout({ type, poetries, total, page, pages, title, hindiTitle, desc }: Props) {
  const cfg = typeConfig[type];

  return (
    <div className="min-h-screen bg-bg">
      {/* Editorial Hero Banner */}
      <div className={`border-b-2 border-border pt-32 pb-16 ${cfg.bg}`}>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-border bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                {cfg.icon}
              </div>
              <span className="font-prose text-2xl italic text-text-primary">{hindiTitle}</span>
            </div>
            
            <h1 className="font-display text-[clamp(4rem,10vw,8rem)] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              {title}
            </h1>
            
            <p className="font-mono text-xs font-bold uppercase tracking-widest max-w-lg leading-relaxed text-text-primary border-l-4 border-accent-dark pl-4">
              {desc}
            </p>
          </div>

          <div className="flex items-end justify-end">
             {total > 0 && (
               <div className="text-right">
                 <span className="block font-display text-7xl font-black tracking-tighter leading-none">{total}</span>
                 <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                   {total === 1 ? 'ENTRY' : 'ENTRIES'} INDEXED
                 </span>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {poetries.length === 0 ? (
          <div className="brutalist-card p-16 flex flex-col items-center text-center gap-4 bg-white">
            <div className="w-16 h-16 rounded-full border-2 border-border bg-bg-alt flex items-center justify-center mb-4">
              {cfg.icon}
            </div>
            <h2 className="font-display text-3xl font-black uppercase tracking-tighter">ARCHIVE EMPTY</h2>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">Check back soon for new additions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {poetries.map(p => <PoetryCard key={p._id} poetry={p} />)}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t-2 border-border">
            {page > 1 ? (
              <a href={`?page=${page - 1}`} className="btn-outline">PREV</a>
            ) : <span className="btn-outline opacity-50 pointer-events-none">PREV</span>}
            
            <span className="font-mono text-sm font-bold tracking-widest">
              {page} / {pages}
            </span>
            
            {page < pages ? (
              <a href={`?page=${page + 1}`} className="btn-outline">NEXT</a>
            ) : <span className="btn-outline opacity-50 pointer-events-none">NEXT</span>}
          </div>
        )}
      </div>
    </div>
  );
}
