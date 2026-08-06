'use client';

import Link from 'next/link';
import { Mail, Globe, MessageCircle, Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg border-t-2 border-border pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-24 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
             <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-border bg-accent-dark text-white w-fit brutalist-card shadow-none">
               <Disc size={18} className="animate-spin-slow" />
               <span className="font-display text-lg font-black tracking-tighter uppercase leading-none mt-0.5">KATHANAK</span>
             </Link>
             <p className="font-mono text-xs font-bold uppercase tracking-widest leading-relaxed max-w-sm text-text-secondary">
               Transforming text into visual poetry. A brutalist approach to emotion and sound.
             </p>
             <div className="flex items-center gap-4 mt-2">
               <a href="#" className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-accent-beige transition-colors brutalist-card shadow-none"><Mail size={16} /></a>
               <a href="#" className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-accent-beige transition-colors brutalist-card shadow-none"><Globe size={16} /></a>
               <a href="#" className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-accent-beige transition-colors brutalist-card shadow-none"><MessageCircle size={16} /></a>
             </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 border-b-2 border-border pb-2 inline-block w-fit">INDEX</h4>
             <Link href="/listen" className="font-display font-black text-xl hover:translate-x-2 transition-transform">LISTEN</Link>
             <Link href="/watch" className="font-display font-black text-xl hover:translate-x-2 transition-transform">WATCH</Link>
             <Link href="/read" className="font-display font-black text-xl hover:translate-x-2 transition-transform">READ</Link>
             <Link href="/about" className="font-display font-black text-xl hover:translate-x-2 transition-transform">ABOUT</Link>
          </div>

          <div className="flex flex-col gap-4">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 border-b-2 border-border pb-2 inline-block w-fit">LEGAL</h4>
             <Link href="/terms" className="font-display font-black text-xl hover:translate-x-2 transition-transform">TERMS</Link>
             <Link href="/disclaimer" className="font-display font-black text-xl hover:translate-x-2 transition-transform">DISCLAIMER</Link>
             <Link href="/contact" className="font-display font-black text-xl hover:translate-x-2 transition-transform">CONTACT</Link>
          </div>
          
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
           <p>© {new Date().getFullYear()} KATHANAK PLATFORM. ALL RIGHTS RESERVED.</p>
           <p>SYSTEM v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
