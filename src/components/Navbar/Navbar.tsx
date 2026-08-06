'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Disc, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/listen', label: 'LISTEN' },
  { href: '/watch',  label: 'WATCH' },
  { href: '/read',   label: 'READ' },
  { href: '/about',   label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const pathname    = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Nav bar ────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] h-20 flex items-center transition-all duration-300 border-b-2 border-border
        ${scrolled ? 'bg-bg shadow-brutalist' : 'bg-bg'}`}>

        <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          {/* Logo (Pill shape) */}
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-border bg-bg group hover:bg-accent-dark hover:text-white transition-colors brutalist-card hover:shadow-none hover:translate-x-0 hover:translate-y-0">
            <Disc size={18} className="group-hover:animate-spin-slow" />
            <span className="font-display text-lg font-black tracking-tighter uppercase leading-none mt-0.5">KATHANAK</span>
          </Link>

          {/* Desktop nav (Pill shape container) */}
          <div className="hidden md:flex items-center rounded-full border-2 border-border bg-bg p-1 brutalist-card hover:shadow-none hover:translate-x-0 hover:translate-y-0">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-widest transition-colors block
                      ${pathname === link.href ? 'bg-accent-dark text-white' : 'text-text-primary hover:bg-accent-beige'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Login / Action */}
          <div className="hidden md:flex items-center">
             <Link href="/read" className="btn-primary py-2.5 px-6">
                EXPLORE
             </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(p => !p)}
            className="md:hidden w-12 h-12 rounded-full border-2 border-border bg-bg flex items-center justify-center text-text-primary hover:bg-accent-beige transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <div className={`fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-bg border-l-2 border-border z-[200] flex flex-col
        transition-transform duration-400 ease-out-expo shadow-[-8px_0_0_0_rgba(17,17,17,1)]
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'calc(80px + 2rem)', padding: 'calc(80px + 2rem) 2rem 2rem' }}>
        
        <div className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className={`block px-4 py-3 border-2 border-border font-mono text-sm font-bold tracking-widest text-center transition-all brutalist-card hover:shadow-none hover:translate-x-0 hover:translate-y-0
                ${pathname === item.href ? 'bg-accent-dark text-white' : 'bg-white text-text-primary hover:bg-accent-beige'}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-accent-dark/20 z-[199] backdrop-blur-sm animate-fade-in both-fill" />
      )}
    </>
  );
}
