import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Policy — Kathanak',
  description: 'Terms and Conditions for using Kathanak.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b-2 border-border bg-bg-alt pt-32 pb-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="section-label mb-8">LEGAL DOCUMENTATION</div>
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[0.8]">
            TERMS & POLICY
          </h1>
          <p className="font-mono text-xs font-bold tracking-widest uppercase mt-6">LAST UPDATED: AUGUST 2026</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="brutalist-card bg-white p-8 md:p-16 flex flex-col gap-12 font-prose text-lg text-text-primary leading-[1.8]">
          
          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Kathanak ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">2. Intellectual Property</h2>
            <p>
              All poetry, text, audio recordings, video recordings, and images published on this Platform are the exclusive intellectual property of the author/creator, unless otherwise explicitly stated.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, or create derivative works from this content without express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">3. User Conduct</h2>
            <p>
              When utilizing the feedback forms or engaging with the Platform, you agree not to submit any content that is abusive, harassing, threatening, or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-2">4. Privacy Policy</h2>
            <p>
              We respect your privacy. Any personal information submitted via feedback forms (such as names and email addresses) is used solely for the purpose of correspondence and is never sold to third parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
