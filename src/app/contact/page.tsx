import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';

export const metadata: Metadata = {
  title: 'Contact — Kathanak',
  description: 'Get in touch with us.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: "'Geist', sans-serif" }}>

      {/* ── Cinematic header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-20 border-b border-white/8"
        style={{
          background: `
            radial-gradient(ellipse at 80% 50%, rgba(100,180,255,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 50%),
            #090909
          `,
        }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none" aria-hidden>
          <span
            className="font-display font-black uppercase whitespace-nowrap opacity-[0.03] text-white"
            style={{ fontSize: 'clamp(8rem,16vw,14rem)', letterSpacing: '-0.04em' }}
          >
            CONTACT CONTACT
          </span>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
            INITIATE COMMUNICATION
          </p>
          <h1
            className="font-display font-black uppercase leading-[0.85] text-white"
            style={{ fontSize: 'clamp(3.5rem,8vw,6rem)', letterSpacing: '-0.04em' }}
          >
            CONTACT <br /> KATHANAK
          </h1>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info column */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white/85 mb-5 pb-4 border-b border-white/8">
                REACH OUT
              </h2>
              <p className="text-white/50 leading-[1.8]" style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.1rem' }}>
                Whether you want to collaborate, share your thoughts on a specific piece, or simply say hello — we are always open. Fill out the form and your message will reach us directly.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col gap-4">
              {[
                { Icon: Mail,   label: 'DIRECT INBOX',  value: 'kathanak19@outlook.com' },
                { Icon: MapPin, label: 'HQ LOCATION',   value: 'Lucknow, Uttar Pradesh, India' },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="h-10 w-10 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/40 shrink-0">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-0.5">{label}</p>
                    <p className="font-display text-base font-bold text-white/70">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div
            className="rounded-2xl border border-white/8 bg-white/5 p-8 lg:p-10 backdrop-blur-lg relative"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            {/* Corner glow */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-15 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(100,180,255,0.5) 0%, transparent 70%)' }}
            />
            <h3 className="font-display text-lg font-bold tracking-tight text-white/80 mb-6">
              Send a message
            </h3>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
