import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — Kathanak',
  description: 'Disclaimer regarding content on Kathanak.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b-2 border-border bg-bg-alt pt-32 pb-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="section-label mb-8">LEGAL DOCUMENTATION</div>
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[0.8]">
            DISCLAIMER
          </h1>
          <p className="font-mono text-xs font-bold tracking-widest uppercase mt-6">LAST UPDATED: AUGUST 2026</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="brutalist-card bg-white p-8 md:p-16 flex flex-col gap-12 font-prose text-lg text-text-primary leading-[1.8]">
          
          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">Nature of Content</h2>
            <p>
              The poetry and views expressed on this platform are personal and artistic in nature. They do not necessarily reflect objective facts or represent any organization, company, or institution.
            </p>
            <p className="mt-4">
              Any resemblance to actual persons, living or dead, or actual events is purely coincidental unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">No Professional Advice</h2>
            <p>
              The content provided on this site is for entertainment and artistic expression only. It should not be construed as professional advice (psychological, legal, financial, or otherwise).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">External Links</h2>
            <p>
              This website may contain links to external sites (such as Google Drive streams or social media profiles). We are not responsible for the privacy practices or the content of such external websites.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
