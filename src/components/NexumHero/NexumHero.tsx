'use client';

import { useState, useEffect, useRef } from 'react';
import { Disc, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ─── Site nav links (matches existing Navbar exactly) ───────────────────── */
const NAV_LINKS = [
  { href: '/',        label: 'HOME' },
  { href: '/listen',  label: 'LISTEN' },
  { href: '/watch',   label: 'WATCH' },
  { href: '/read',    label: 'READ' },
  { href: '/about',   label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
] as const;

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4';

const AVATAR_URL = 'https://i.pravatar.cc/72?img=12';

/* ─── Dark gradient pill button ──────────────────────────────────────────── */
function GradientButton({
  children,
  className = '',
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const base = `rounded-full text-xs font-mono font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90 ${className}`;
  const style = { background: 'linear-gradient(to bottom, #2B2B2B, #101010)' };
  if (href) {
    return (
      <Link href={href} className={base} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button className={base} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function NexumHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { setMounted(true); }, []);

  /* body scroll lock when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* track scroll to optionally tint nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      className="nexum-hero relative h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* ── Full-bleed Background Video ──────────────────────────────────── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Edge-vignette for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.26) 100%)',
        }}
      />

      {/* ── All content sits at z-10 ─────────────────────────────────────── */}
      <div className="relative flex h-full flex-col" style={{ zIndex: 10 }}>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/*  GLASSMORPHISM NAVBAR                                           */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <nav
          className={`flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-12 transition-all duration-300 ${
            scrolled ? 'bg-black/20 backdrop-blur-md' : ''
          }`}
        >
          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Kathanak home"
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
          >
            <Disc
              size={18}
              className="text-white transition-transform duration-700 group-hover:rotate-180"
            />
            <span className="text-sm font-black uppercase tracking-tighter text-white leading-none">
              Kathanak
            </span>
          </Link>

          {/* ── Desktop glass pill nav cluster ──────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Glass pill wrapping all links */}
            <div className="flex items-center rounded-full border border-white/15 bg-white/10 px-1.5 py-1.5 backdrop-blur-lg gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-full px-4 py-1.5 text-xs font-mono font-bold tracking-widest transition-all duration-200 ${
                      active
                        ? 'bg-white text-[#111] shadow-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Separate EXPLORE pill */}
            <GradientButton
              href="/read"
              className="self-stretch px-5 flex items-center"
            >
              EXPLORE
            </GradientButton>
          </div>

          {/* ── Mobile hamburger ────────────────────────────────────────── */}
          <button
            id="kathanak-menu-toggle"
            className="relative md:hidden h-10 w-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg flex items-center justify-center"
            style={{ zIndex: 50 }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {/* Menu icon */}
            <Menu
              size={18}
              className={`absolute text-white transition-all duration-300 ${
                menuOpen
                  ? 'rotate-90 scale-0 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            {/* X icon */}
            <X
              size={18}
              className={`absolute text-white transition-all duration-300 ${
                menuOpen
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>
        </nav>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/*  MOBILE DRAWER OVERLAY                                          */}
        {/* ════════════════════════════════════════════════════════════════ */}

        {/* Backdrop */}
        <div
          id="kathanak-backdrop"
          className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 40 }}
          onClick={closeMenu}
        />

        {/* Drawer panel */}
        <div
          id="kathanak-drawer"
          className={`fixed right-0 top-0 h-full w-72 bg-black/90 backdrop-blur-xl flex flex-col md:hidden transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            zIndex: 40,
            transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Drawer header — logo */}
          <div className="flex items-center gap-2 px-6 pt-8 pb-0">
            <Disc size={18} className="text-white/60 animate-spin-slow" />
            <span className="text-sm font-black uppercase tracking-tighter text-white/80">
              Kathanak
            </span>
          </div>

          {/* Divider */}
          <div className="mx-6 mt-5 mb-0 h-px bg-white/10" />

          {/* Links */}
          <div className="flex flex-col gap-1 px-4 pt-4">
            {NAV_LINKS.map(({ href, label }, i) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    mounted
                      ? {
                          opacity: menuOpen ? 1 : 0,
                          transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                          transition: `opacity 350ms ease ${(i + 1) * 60}ms, transform 350ms cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 60}ms`,
                        }
                      : {}
                  }
                  onClick={closeMenu}
                >
                  {label}
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer bottom CTA */}
          <div
            className="mt-auto px-5 pb-10"
            style={
              mounted
                ? {
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                    transition:
                      'opacity 400ms ease 300ms, transform 400ms cubic-bezier(0.16,1,0.3,1) 300ms',
                  }
                : {}
            }
          >
            <GradientButton href="/read" className="w-full py-3.5 block text-center">
              EXPLORE POETRIES
            </GradientButton>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/*  HERO CONTENT — bottom-anchored via mt-auto                    */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <div className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">

          {/* ── Left: Headline + CTA ──────────────────────────────────── */}
          <div className="flex flex-col nexum-fadeup" style={{ animationDelay: '0ms' }}>
            <div className="max-w-xl">
              {/* Eyebrow */}
              <p className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/60">
                Poetry Platform
              </p>
              {/* Main headline */}
              <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[3.5rem]">
                Where words breathe, bleed and become poetry
              </h1>
              {/* Sub-headline */}
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-md">
                Listen, watch and read original poetries in Hindi, Urdu and English.
                Let the words reach your heart.
              </p>
            </div>

            {/* CTA row */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              {/* Primary — inside a white capsule */}
              <div className="inline-flex items-center rounded-full bg-white p-1.5">
                <Link
                  href="/read"
                  className="rounded-full px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
                >
                  Start Reading
                </Link>
              </div>
              {/* Secondary ghost */}
              <Link
                href="/listen"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white"
              >
                Listen Now
              </Link>
            </div>
          </div>

          {/* ── Right: Glass Cards ────────────────────────────────────── */}
          <div
            className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5 nexum-fadeup"
            style={{ animationDelay: '150ms' }}
          >
            {/* Stats Card */}
            <div className="nexum-card relative flex min-h-[160px] flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-lg sm:w-60 sm:p-6">
              <div
                className="text-3xl tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "'Silkscreen', cursive", fontWeight: 'normal' }}
              >
                150K+
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:mt-4">
                Artists &amp; readers celebrating poetry and creativity together.
              </p>
            </div>

            {/* Quote / Testimonial Card */}
            <div className="nexum-card relative flex flex-col rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-lg sm:w-60 sm:p-6">
              {/* Brand row */}
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white/10 border border-white/20">
                  <Disc size={12} className="text-white/80" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80">
                  Kathanak
                </span>
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-white/80 italic">
                &ldquo;A window into the soul — transcending conventional artistic boundaries, one verse at a time.&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 sm:mt-5">
                <img
                  src={AVATAR_URL}
                  alt="Community reader"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Community Reader
                  </span>
                  <span className="text-xs text-white/50">
                    Poetry Enthusiast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
