'use client';

import Link from 'next/link';
import { Mail, Globe, MessageCircle, Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/8 bg-[#050505] pt-16 pb-8 overflow-hidden"
      style={{ fontFamily: "'Geist', sans-serif" }}
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(200,180,255,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-24 mb-16">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 w-fit backdrop-blur-lg transition-all duration-300 hover:bg-white/12"
            >
              <Disc size={15} className="text-white/70 transition-all duration-700 group-hover:rotate-180 group-hover:text-white" />
              <span className="font-display text-sm font-black uppercase tracking-tighter text-white/80 group-hover:text-white">
                KATHANAK
              </span>
            </Link>

            <p className="font-mono text-[11px] uppercase tracking-widest leading-relaxed max-w-xs text-white/35">
              Transforming text into cinematic poetry. A dark sanctuary for words that refuse to stay silent.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: 'mailto:kathanak19@outlook.com', Icon: Mail },
                { href: 'https://kathanak.vercel.app',   Icon: Globe },
                { href: 'https://www.instagram.com/kathanak_19', Icon: MessageCircle },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="h-9 w-9 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/45 transition-all duration-200 hover:bg-white/12 hover:text-white/80 hover:border-white/20"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Index links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 mb-2">
              INDEX
            </h4>
            {[
              { href: '/listen',  label: 'LISTEN' },
              { href: '/watch',   label: 'WATCH' },
              { href: '/read',    label: 'READ' },
              { href: '/about',   label: 'ABOUT' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-base font-bold tracking-tight text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 mb-2">
              LEGAL
            </h4>
            {[
              { href: '/terms',      label: 'TERMS' },
              { href: '/disclaimer', label: 'DISCLAIMER' },
              { href: '/contact',    label: 'CONTACT' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-base font-bold tracking-tight text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            © {new Date().getFullYear()} KATHANAK PLATFORM. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            SYSTEM v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
