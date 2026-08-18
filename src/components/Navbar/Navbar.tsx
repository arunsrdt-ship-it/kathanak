'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disc, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/',        label: 'HOME' },
  { href: '/listen',  label: 'LISTEN' },
  { href: '/watch',   label: 'WATCH' },
  { href: '/read',    label: 'READ' },
  { href: '/about',   label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  /* Tint nav bg after 8px scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close drawer on nav */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main nav bar ───────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/8'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="Kathanak home"
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:border-white/25"
        >
          <Disc
            size={16}
            className="text-white/80 transition-all duration-700 group-hover:rotate-180 group-hover:text-white"
          />
          <span className="font-display text-sm font-black uppercase tracking-tighter text-white/90 group-hover:text-white leading-none transition-colors">
            KATHANAK
          </span>
        </Link>

        {/* ── Desktop glass pill cluster ───────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/12 bg-white/8 px-1.5 py-1.5 backdrop-blur-xl gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold tracking-widest transition-all duration-200 ${
                    active
                      ? 'bg-white text-[#080808] shadow-sm'
                      : 'text-white/65 hover:bg-white/10 hover:text-white/90'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* EXPLORE CTA pill */}
          <Link
            href="/read"
            className="rounded-full px-5 py-2 text-[11px] font-mono font-bold tracking-widest uppercase text-white transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
            style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            EXPLORE
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────────────── */}
        <button
          id="kathanak-nav-toggle"
          onClick={() => setMobileOpen(p => !p)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden relative h-10 w-10 rounded-full border border-white/15 bg-white/8 backdrop-blur-lg flex items-center justify-center"
          style={{ zIndex: 110 }}
        >
          <Menu
            size={17}
            className={`absolute text-white transition-all duration-300 ${
              mobileOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            size={17}
            className={`absolute text-white transition-all duration-300 ${
              mobileOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* ── Mobile backdrop ────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 105 }}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col md:hidden border-l border-white/8 transition-transform duration-500 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          zIndex: 108,
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Drawer logo */}
        <div className="flex items-center gap-2 px-6 pt-8">
          <Disc size={16} className="text-white/50 animate-spin-slow" />
          <span className="font-display text-sm font-black uppercase tracking-tighter text-white/70">
            KATHANAK
          </span>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-5 h-px bg-white/8" />

        {/* Links */}
        <nav className="flex flex-col gap-1 px-4 pt-4">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
                  active
                    ? 'bg-white/12 text-white'
                    : 'text-white/55 hover:bg-white/8 hover:text-white/85'
                }`}
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `opacity 350ms ease ${(i + 1) * 55}ms, transform 350ms cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 55}ms`,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-white/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div
          className="mt-auto px-5 pb-10"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 400ms ease 340ms, transform 400ms cubic-bezier(0.16,1,0.3,1) 340ms',
          }}
        >
          <Link
            href="/read"
            className="block w-full rounded-full py-3.5 text-center text-xs font-mono font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(to bottom, #2b2b2b, #101010)', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={() => setMobileOpen(false)}
          >
            EXPLORE POETRIES
          </Link>
        </div>
      </div>
    </>
  );
}
