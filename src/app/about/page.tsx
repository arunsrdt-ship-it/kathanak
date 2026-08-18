import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Kathanak',
  description: 'The story behind the words.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Cinematic header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-20 border-b border-white/8"
        style={{
          background: `
            radial-gradient(ellipse at 10% 60%, rgba(200,160,255,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(255,255,255,0.04) 0%, transparent 50%),
            #090909
          `,
        }}
      >
        {/* Ghost typography */}
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none" aria-hidden>
          <span
            className="font-display font-black uppercase whitespace-nowrap opacity-[0.03] text-white"
            style={{ fontSize: 'clamp(8rem,16vw,14rem)', letterSpacing: '-0.04em' }}
          >
            ABOUT ABOUT
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
            THE STORY BEHIND THE WORDS
          </p>
          <h1
            className="font-display font-black uppercase leading-[0.85] text-white"
            style={{ fontSize: 'clamp(3.5rem,8vw,6rem)', letterSpacing: '-0.04em' }}
          >
            ABOUT <br /> KATHANAK
          </h1>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

          {/* Image / visual column */}
          <div className="relative">
            <div
              className="sticky top-28 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-lg overflow-hidden aspect-[3/4]"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
                style={{ backgroundImage: "url('/images/typewriter-bg.png')" }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-sm">
                  <span className="block font-display text-lg font-bold text-white/90 tracking-tight">THE ARCHIVE</span>
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35 mt-1 block">EST. 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="flex flex-col gap-12 text-white/70 leading-[1.85]" style={{ fontSize: '1.1rem', fontFamily: "'Crimson Pro', serif" }}>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white/85 mb-5 pb-4 border-b border-white/8">
                THE INCEPTION
              </h2>
              <p className="mb-4">
                Kathanak was born out of a profound need to archive fleeting emotions. It is a digital sanctuary for words that refuse to stay confined within the pages of a physical journal.
              </p>
              <p>
                Here, poetry is not just written — it is experienced. Through audio renditions, visual storytelling, and raw text, the platform aims to bridge the gap between the poet&apos;s mind and the reader&apos;s heart.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white/85 mb-5 pb-4 border-b border-white/8">
                THE VISION
              </h2>
              <p className="mb-4">
                We believe that words possess an inherent architectural structure. By stripping away unnecessary noise, we leave only the raw, unpolished truth of the poetry itself.
              </p>
              <p>
                Our goal is to create a community-powered space where artists can unite, exchange ideas, and elevate their artistic expressions without boundaries.
              </p>
            </div>

            {/* Quote card */}
            <div
              className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-lg p-8"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            >
              <p className="font-display text-xl font-bold tracking-tight text-white/80 mb-4 leading-snug">
                &ldquo;Poetry is the language in which man explores his own amazement.&rdquo;
              </p>
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
                — CHRISTOPHER FRY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
