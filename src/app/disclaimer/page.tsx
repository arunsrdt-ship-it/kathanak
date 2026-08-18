import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — Kathanak',
  description: 'Disclaimer regarding content on Kathanak.',
};

const sections = [
  {
    title: 'Nature of Content',
    body: [
      'The poetry and views expressed on this platform are personal and artistic in nature. They do not necessarily reflect objective facts or represent any organization, company, or institution.',
      'Any resemblance to actual persons, living or dead, or actual events is purely coincidental unless explicitly stated.',
    ],
  },
  {
    title: 'No Professional Advice',
    body: [
      'The content provided on this site is for entertainment and artistic expression only. It should not be construed as professional advice (psychological, legal, financial, or otherwise).',
    ],
  },
  {
    title: 'External Links',
    body: [
      'This website may contain links to external sites (such as Google Drive streams or social media profiles). We are not responsible for the privacy practices or the content of such external websites.',
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Cinematic header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-16 border-b border-white/8"
        style={{
          background: `
            radial-gradient(ellipse at 85% 50%, rgba(100,180,255,0.06) 0%, transparent 55%),
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
            DISCLAIMER
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
            DISCLAIMER
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
