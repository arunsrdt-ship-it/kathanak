import Link from 'next/link';
import { ArrowRight, MoveDown } from 'lucide-react';
import type { SiteConfig } from '@/lib/api';

interface Props {
  config: SiteConfig | null;
}

export default function HeroSection({ config }: Props) {
  // Use config or fallbacks
  const headlineWords = (config?.heroTitle || 'COMMUNITY POWERED POETRY').split(' ');
  const subtext = config?.heroDescription || 'A window into the soul, transcending conventional artistic boundaries.';
  const tagline = config?.heroTagline || 'transforming text into visual poetry';

  return (
    <section className="pt-32 pb-20 border-b-2 border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top minimal dots indicator (like in screenshot) */}
        <div className="hidden md:flex items-center gap-2 mb-12 opacity-40">
          <div className="w-4 h-4 bg-accent-dark rounded-full" />
          <div className="w-16 h-1 bg-accent-dark rounded-full" />
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 bg-accent-dark rounded-full" />)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          
          {/* ── Left Column: Typography ──────────────────────────────────────── */}
          <div className="flex flex-col gap-8 relative animate-fade-up both-fill">
            
            <div className="flex items-start gap-8">
              <div className="hidden sm:block font-mono text-[10px] font-bold tracking-widest uppercase w-32 leading-relaxed pt-2">
                {tagline}
              </div>
              
              <h1 className="font-display font-black text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.85] tracking-tighter uppercase text-text-primary flex flex-col">
                {headlineWords.map((word, i) => (
                  <span key={i} className="relative w-fit">
                    {word}
                    {i === 1 && (
                      <span className="absolute -top-4 -right-8 font-mono text-sm tracking-normal text-text-muted">
                        07
                      </span>
                    )}
                    {/* Add that small beige block behind the last word for editorial effect */}
                    {i === headlineWords.length - 1 && (
                      <span className="absolute bottom-0 left-0 w-full h-[40%] bg-accent-beige -z-10 -ml-2 mb-2" />
                    )}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-4">
              <p className="font-mono text-xs font-bold tracking-widest uppercase max-w-[200px] leading-relaxed ml-0 sm:ml-40">
                {subtext}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/read" className="btn-primary">
                GET STARTED <ArrowRight size={14} />
              </Link>
              <Link href="/listen" className="btn-outline">
                SUBSCRIBE
              </Link>
            </div>

            {/* Bottom Stats / Text block */}
            <div className="mt-16 pt-8 border-t-2 border-border max-w-[400px]">
              <h3 className="font-display text-4xl font-black tracking-tighter mb-4">150K +</h3>
              <p className="font-mono text-xs font-bold tracking-widest uppercase leading-relaxed text-text-primary mb-6">
                Art community, where artists from around the world unite to celebrate creativity, exchange ideas, and elevate artistic expressions.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-featured">ART SPACE *</span>
                <span className="badge badge-text">COLLABORATIVE</span>
              </div>
            </div>

            {/* Spinning Circular Badge */}
            <div className="absolute bottom-10 right-0 w-32 h-32 hidden md:flex items-center justify-center">
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  <text className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase fill-text-primary">
                    <textPath href="#circlePath" startOffset="0%">
                      READ POETRY • LISTEN POETRY • WATCH POETRY •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-dark text-white flex items-center justify-center relative z-10 hover:scale-110 transition-transform">
                <MoveDown size={16} />
              </div>
            </div>
          </div>

          {/* ── Right Column: Bricolage / Grid ───────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 animate-fade-up both-fill animate-delay-200">
            
            {/* Top Left: Blue Block */}
            <div className="bg-accent-blue border-2 border-border p-6 flex flex-col justify-between aspect-square brutalist-card">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest flex gap-4 leading-relaxed">
                <span className="w-1/2">The art of words dancing on the page, illuminating ideas with every stroke</span>
                <span className="w-1/2">through typography where letters transcend language and speak in visual harmony</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full border border-accent-dark bg-white" />
                   <div className="w-2 h-2 rounded-full border border-accent-dark" />
                   <div className="w-2 h-2 rounded-full border border-accent-dark" />
                </div>
                <div className="w-8 h-8 rounded-full border border-accent-dark flex items-center justify-center overflow-hidden">
                  {/* Sunburst pattern */}
                  <div className="w-full h-full bg-[repeating-conic-gradient(#111_0_15deg,transparent_15deg_30deg)]" />
                </div>
              </div>
            </div>

            {/* Top Right: Arched Image */}
            <div className="relative row-span-2 rounded-arch border-2 border-border overflow-hidden bg-bg-alt brutalist-card">
               <div className="absolute inset-0 bg-[url('/images/typewriter-bg.png')] bg-cover bg-center grayscale opacity-80 mix-blend-multiply" />
               
               <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                 {/* Abstract graphic */}
                 <div className="w-24 h-32 border border-white/40 rounded-full flex items-center justify-center mb-4">
                   <div className="w-16 h-24 border border-white/60 rounded-full" />
                 </div>
                 <h3 className="font-display text-4xl text-white font-bold tracking-tighter mix-blend-difference">abstract</h3>
                 <p className="font-mono text-[8px] text-white/80 uppercase tracking-widest mt-2 max-w-[140px] mix-blend-difference">
                   diving into the enigmatic realm of non representational art
                 </p>
               </div>
            </div>

            {/* Bottom Left: Vintage portrait */}
            <div className="border-2 border-border rounded-t-full overflow-hidden relative aspect-[3/4] bg-bg-alt brutalist-card group">
              <div className="absolute inset-0 bg-[url('/images/poet-portrait.png')] bg-cover bg-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-border p-2 flex justify-between items-center z-10 brutalist-card shadow-none">
                <span className="font-display font-black text-2xl tracking-tighter leading-none">MM</span>
                <span className="font-mono text-[8px] font-bold tracking-widest">•0101</span>
              </div>
            </div>

            {/* Bottom Right: Beige Graphic */}
            <div className="bg-accent-beige border-2 border-border rounded-bl-[4rem] p-6 relative aspect-square brutalist-card flex items-center justify-center overflow-hidden">
               <div className="absolute top-2 right-2 text-xl font-mono">┐</div>
               {/* Abstract circles pattern */}
               <div className="flex items-center -space-x-8">
                 <div className="w-24 h-24 rounded-full border-2 border-accent-dark flex items-center justify-center">
                   <div className="w-8 h-4 bg-accent-dark rounded-full" />
                 </div>
                 <div className="w-24 h-24 rounded-full border border-accent-dark" />
                 <div className="w-24 h-24 rounded-full border border-accent-dark/50" />
                 <span className="font-mono text-xs font-bold -rotate-90 origin-left ml-12">forms.</span>
               </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* Marquee Banner */}
      <div className="w-full border-y-2 border-border bg-accent-dark text-white py-3 overflow-hidden mt-20 flex">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-mono text-xs font-bold tracking-widest uppercase">
          {[...Array(6)].map((_, i) => (
             <span key={i} className="flex items-center gap-12">
               POETRY IN MOTION <span className="text-white/40">✦</span> 
               WORDS THAT SPEAK <span className="text-white/40">✦</span> 
               VISUAL HARMONY <span className="text-white/40">✦</span>
             </span>
          ))}
        </div>
      </div>
    </section>
  );
}
