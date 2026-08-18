import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Policy — Kathanak',
  description: 'Terms and Conditions for using Kathanak.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing and using Kathanak ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.',
    ],
  },
  {
    title: '2. Intellectual Property',
    body: [
      'All poetry, text, audio recordings, video recordings, and images published on this Platform are the exclusive intellectual property of the author/creator, unless otherwise explicitly stated.',
      'You may not reproduce, distribute, or create derivative works from this content without express written permission.',
    ],
  },
  {
    title: '3. User Conduct',
    body: [
      'When utilizing the feedback forms or engaging with the Platform, you agree not to submit any content that is abusive, harassing, threatening, or otherwise objectionable.',
    ],
  },
  {
    title: '4. Privacy Policy',
    body: [
      'We respect your privacy. Any personal information submitted via feedback forms (such as names and email addresses) is used solely for the purpose of correspondence and is never sold to third parties.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Cinematic header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-16 border-b border-white/8"
        style={{
          background: `
            radial-gradient(ellipse at 15% 60%, rgba(255,200,100,0.06) 0%, transparent 55%),
            #090909
          `,
        }}
      >
        {/* Ghost text */}
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none" aria-hidden>
          <span
            className="font-display font-black uppercase whitespace-nowrap text-white opacity-[0.025]"
            style={{ fontSize: 'clamp(6rem,14vw,12rem)', letterSpacing: '-0.04em' }}
          >
            TERMS TERMS
          </span>
        </div>

        <div className="relative max-w-[900px] mx-auto px-6 md:px-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
            LEGAL DOCUMENTATION
          </p>
          <h1
            className="font-display font-black uppercase leading-[0.85] text-white mb-5"
            style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', letterSpacing: '-0.04em' }}
          >
            TERMS &amp; POLICY
          </h1>
          <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">
            LAST UPDATED: AUGUST 2026
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col gap-4">
          {sections.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-sm"
            >
              <h2 className="font-display text-lg font-bold tracking-tight text-white/75 mb-4 pb-3 border-b border-white/8">
                {title}
              </h2>
              <div
                className="flex flex-col gap-3 text-white/50 leading-[1.85]"
                style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.05rem' }}
              >
                {body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
