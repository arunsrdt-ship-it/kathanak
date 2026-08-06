import type { Metadata } from 'next';
import Link from 'next/link';
import { Music, Video, BookOpen, ArrowRight, Star, MessageSquare } from 'lucide-react';
import HeroSection from '@/components/HeroSection/HeroSection';
import PoetryCard from '@/components/PoetryCard/PoetryCard';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import { fetchPoetrys, fetchConfig } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Home — Kathanak',
  description: 'Welcome to Kathanak — audio, video and written poetries.',
};

export default async function HomePage() {
  const [featuredRes, allRes, configRes] = await Promise.allSettled([
    fetchPoetrys({ featured: true, limit: 3 }),
    fetchPoetrys({ limit: 8, sort: '-createdAt' }),
    fetchConfig(),
  ]);

  const featured = featuredRes.status === 'fulfilled' ? featuredRes.value.data : [];
  const latest   = allRes.status       === 'fulfilled' ? allRes.value.data       : [];
  const config   = configRes.status    === 'fulfilled' ? configRes.value.data    : null;

  return (
    <>
      <HeroSection config={config} />

      {/* ── Module showcase (Editorial blocks) ─────────────────────────── */}
      <section id="main-section" className="py-24 bg-bg border-b-2 border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/listen', icon: <Music size={24} />,    title: 'LISTEN', hindi: 'सुनें', desc: 'Audio poetries recorded with raw emotion.', bg: 'bg-accent-beige' },
              { href: '/watch',  icon: <Video size={24} />,    title: 'WATCH',  hindi: 'देखें', desc: 'Poetry as a visual and auditory journey.',  bg: 'bg-accent-blue' },
              { href: '/read',   icon: <BookOpen size={24} />, title: 'READ',   hindi: 'पढ़ें', desc: 'Pause, breathe and read written verses.',   bg: 'bg-white' },
            ].map(mod => (
              <Link key={mod.href} href={mod.href}
                className={`brutalist-card p-8 flex flex-col gap-6 group ${mod.bg}`}>
                <div className="flex justify-between items-start">
                   <div className="w-12 h-12 rounded-full border-2 border-border bg-white flex items-center justify-center brutalist-card shadow-none">
                     {mod.icon}
                   </div>
                   <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-black tracking-tighter mb-1">{mod.title}</h2>
                  <span className="font-prose italic text-text-muted text-lg">{mod.hindi}</span>
                </div>
                <div className="border-t-2 border-border pt-4 mt-auto">
                   <p className="font-mono text-xs font-bold uppercase tracking-widest leading-relaxed">
                     {mod.desc}
                   </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured (Brutalist Grid) ──────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-24 bg-bg-alt border-b-2 border-border">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <div className="section-label mb-4"><Star size={12} /> HIGHLIGHTS</div>
                <h2 className="font-display text-5xl font-black tracking-tighter uppercase">
                  Featured Works
                </h2>
              </div>
              <Link href="/read" className="btn-outline">
                VIEW COLLECTION
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map(p => <PoetryCard key={p._id} poetry={p} featured />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Latest Releases ────────────────────────────────────────────── */}
      {latest.length > 0 && (
        <section className="py-24 bg-bg border-b-2 border-border">
          <div className="max-w-[1400px] mx-auto px-6">
             <div className="text-center mb-16 flex flex-col items-center gap-4">
               <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase tracking-tighter">
                 LATEST <span className="text-outline">ENTRIES</span>
               </h2>
               <div className="w-24 border-t-4 border-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latest.map(p => <PoetryCard key={p._id} poetry={p} />)}
            </div>
            <div className="mt-16 text-center">
              <Link href="/read" className="btn-primary">BROWSE ALL ARCHIVES</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Feedback (Wireframe form) ─────────────────────────────────── */}
      <section className="py-24 bg-accent-blue relative overflow-hidden" id="feedback">
        {/* Decorative large text behind */}
        <div className="absolute -top-10 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex">
           <span className="font-display text-[20rem] font-black tracking-tighter leading-none whitespace-nowrap">
             CONTACT CONTACT CONTACT
           </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left */}
            <div className="flex flex-col gap-8 bg-white border-2 border-border p-10 brutalist-card">
              <div>
                <div className="section-label mb-4"><MessageSquare size={12} /> INBOX</div>
                <h2 className="font-display text-5xl font-black tracking-tighter uppercase mb-6">
                  YOUR WORDS <br/> MATTER
                </h2>
                <p className="font-mono text-sm font-bold tracking-widest uppercase leading-relaxed text-text-secondary">
                  Poetry thrives on connection. If a verse touched you, made you think,
                  or you just want to say hello — drop a line.
                </p>
              </div>
              
              <div className="border-t-2 border-border pt-8 mt-4">
                <span className="font-prose text-2xl italic text-accent-dark">
                  "शब्द जो दिल से निकलें, दिल तक पहुँचते हैं।"
                </span>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest mt-4 opacity-60">
                  Words that come from the heart, reach the heart.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="bg-bg border-2 border-border p-8 brutalist-card">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
