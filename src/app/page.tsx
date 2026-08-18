import type { Metadata } from 'next';
import Link from 'next/link';
import { Music, Video, BookOpen, ArrowRight, Star, MessageSquare } from 'lucide-react';
import NexumHero from '@/components/NexumHero/NexumHero';
import PoetryCard from '@/components/PoetryCard/PoetryCard';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import Footer from '@/components/Footer/Footer';
import { fetchPoetrys } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Kathanak — शब्दों का संसार',
  description: 'A personal poetry platform to listen, watch, and read original poetries in Hindi, Urdu, and English.',
};

export default async function HomePage() {
  const [featuredRes, allRes] = await Promise.allSettled([
    fetchPoetrys({ featured: true, limit: 3 }),
    fetchPoetrys({ limit: 8, sort: '-createdAt' }),
  ]);

  const featured = featuredRes.status === 'fulfilled' ? featuredRes.value.data : [];
  const latest   = allRes.status       === 'fulfilled' ? allRes.value.data       : [];

  return (
    <div style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Full-screen cinematic hero (own embedded nav) ──────────────── */}
      <NexumHero />

      {/* ── Module showcase ───────────────────────────────────────────── */}
      <section
        id="main-section"
        className="py-24 border-b border-white/8"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 100%)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12 flex flex-col gap-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              EXPLORE THE COLLECTION
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white/85">
              Three ways to feel.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                href: '/listen',
                Icon: Music,
                title: 'LISTEN',
                hindi: 'सुनें',
                desc: 'Audio poetries recorded with raw emotion.',
                glow: 'rgba(255,200,100,0.1)',
                accent: 'rgba(255,200,100,0.7)',
              },
              {
                href: '/watch',
                Icon: Video,
                title: 'WATCH',
                hindi: 'देखें',
                desc: 'Poetry as a visual and auditory journey.',
                glow: 'rgba(100,180,255,0.1)',
                accent: 'rgba(100,180,255,0.7)',
              },
              {
                href: '/read',
                Icon: BookOpen,
                title: 'READ',
                hindi: 'पढ़ें',
                desc: 'Pause, breathe and read written verses.',
                glow: 'rgba(200,200,200,0.06)',
                accent: 'rgba(200,200,200,0.6)',
              },
            ].map(({ href, Icon, title, hindi, desc, glow, accent }) => (
              <Link
                key={href}
                href={href}
                className="group relative flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm overflow-hidden transition-all duration-400 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${glow} 0%, transparent 60%)` }}
                />

                <div className="flex justify-between items-start">
                  <div
                    className="h-12 w-12 rounded-xl border border-white/10 bg-white/8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ color: accent }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white/85 mb-0.5">{title}</h2>
                  <span className="font-prose italic text-white/30 text-base">{hindi}</span>
                </div>

                <div className="pt-4 border-t border-white/8 mt-auto">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest leading-relaxed text-white/30">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ──────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section
          className="py-24 border-b border-white/8"
          style={{ background: '#0a0a0a' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <div className="section-label mb-3"><Star size={10} /> HIGHLIGHTS</div>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white/85">
                  Featured Works
                </h2>
              </div>
              <Link href="/read" className="btn-outline shrink-0">
                VIEW COLLECTION
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p, i) => (
                <div key={p._id} className="card-rise" style={{ animationDelay: `${i * 80}ms` }}>
                  <PoetryCard poetry={p} featured />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Latest ────────────────────────────────────────────────────── */}
      {latest.length > 0 && (
        <section
          className="py-24 border-b border-white/8"
          style={{ background: '#080808' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12 flex flex-col items-center gap-3">
              <h2
                className="font-display font-bold tracking-tight text-white/80"
                style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}
              >
                LATEST <span className="text-outline">ENTRIES</span>
              </h2>
              <div className="w-16 h-px bg-white/15" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latest.map((p, i) => (
                <div key={p._id} className="card-rise" style={{ animationDelay: `${i * 55}ms` }}>
                  <PoetryCard poetry={p} />
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link href="/read" className="btn-primary px-8 py-3">
                BROWSE ALL ARCHIVES
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Contact / Feedback ────────────────────────────────────────── */}
      <section
        id="feedback"
        className="py-24 relative overflow-hidden border-b border-white/8"
        style={{ background: '#090909' }}
      >
        {/* Atmospheric glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(150,100,255,0.5) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left info */}
            <div className="flex flex-col gap-8">
              <div>
                <div className="section-label mb-4"><MessageSquare size={10} /> INBOX</div>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white/85 mb-5">
                  YOUR WORDS<br />MATTER
                </h2>
                <p className="text-white/45 leading-[1.8]" style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.1rem' }}>
                  Poetry thrives on connection. If a verse touched you, made you think, or you just want to say hello — drop a line.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
                <p className="font-prose text-2xl italic text-white/60 leading-snug mb-3">
                  &ldquo;शब्द जो दिल से निकलें, दिल तक पहुँचते हैं।&rdquo;
                </p>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                  Words that come from the heart, reach the heart.
                </p>
              </div>
            </div>

            {/* Right form */}
            <div
              className="rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-lg"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
            >
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
