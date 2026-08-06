import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About — Kathanak',
  description: 'The story behind the words.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Editorial Header */}
      <div className="border-b-2 border-border bg-accent-beige pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="flex flex-col items-start">
            <div className="section-label mb-8">THE STORY BEHIND THE WORDS</div>
            <h1 className="font-display text-[clamp(4rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              ABOUT <br /> KATHANAK
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Image Column */}
          <div className="relative">
             <div className="sticky top-28 rounded-arch border-2 border-border overflow-hidden aspect-[3/4] bg-bg-alt brutalist-card">
                <div className="absolute inset-0 bg-[url('/images/typewriter-bg.png')] bg-cover bg-center grayscale mix-blend-multiply opacity-80" />
                <div className="absolute bottom-6 left-6 bg-white border-2 border-border p-3 brutalist-card shadow-none flex flex-col z-10">
                   <span className="font-display font-black text-xl leading-none">THE ARCHIVE</span>
                   <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted mt-1">EST. 2026</span>
                </div>
             </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-12 font-prose text-xl text-text-primary leading-[1.8]">
             
             <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-6 border-b-2 border-border pb-4">
                  THE INCEPTION
                </h2>
                <p className="mb-4">
                  Kathanak was born out of a profound need to archive fleeting emotions. It is a digital sanctuary for words that refuse to stay confined within the pages of a physical journal. 
                </p>
                <p>
                  Here, poetry is not just written—it is experienced. Through audio renditions, visual storytelling, and raw text, the platform aims to bridge the gap between the poet's mind and the reader's heart.
                </p>
             </div>

             <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-6 border-b-2 border-border pb-4">
                  THE VISION
                </h2>
                <p className="mb-4">
                  We believe that words possess an inherent architectural structure. By adopting a brutalist design approach, we strip away the unnecessary noise, leaving only the raw, unpolished truth of the poetry itself.
                </p>
                <p>
                  Our goal is to create a community-powered space where artists can unite, exchange ideas, and elevate their artistic expressions without boundaries.
                </p>
             </div>

             <div className="bg-accent-blue border-2 border-border p-8 brutalist-card mt-8">
                <p className="font-display text-2xl font-bold tracking-tighter uppercase mb-4">
                  "Poetry is the language in which man explores his own amazement."
                </p>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">CHRISTOPHER FRY</span>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
}
