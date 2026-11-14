'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminKey } from '@/lib/api';
import { Disc, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [key,   setKey]   = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      setAdminKey(key.trim());
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ background: '#f7f3e9' }}
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl opacity-12"
        style={{ background: 'radial-gradient(circle, rgba(150,100,255,0.5) 0%, transparent 70%)' }}
      />

      {/* Ghost background text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden
      >
        <span
          className="font-display font-black uppercase whitespace-nowrap text-ink -rotate-12"
          style={{ fontSize: 'clamp(6rem,18vw,16rem)', opacity: 0.025, letterSpacing: '-0.04em' }}
        >
          RESTRICTED
        </span>
      </div>

      {/* Login card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border border-ink/10 bg-ink/5 p-10 backdrop-blur-xl"
        style={{ boxShadow: '0 24px 60px rgba(59,48,31,0.14), 0 0 0 1px rgba(38,51,45,0.04) inset' }}
      >
        {/* Icon + title */}
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <div
            className="h-14 w-14 rounded-full border border-ink/12 bg-ink/8 flex items-center justify-center text-ink/75"
            style={{ boxShadow: '0 6px 20px rgba(59,48,31,0.12)' }}
          >
            <Lock size={22} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink/90 mb-1">
              SYSTEM AUTH
            </h1>
            <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60">
              ENTER CLEARANCE CODE TO CONTINUE
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="key"
              className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60"
            >
              Authorization Key
            </label>
            <input
              type="password"
              id="key"
              value={key}
              onChange={e => { setKey(e.target.value); setError(false); }}
              className={`form-input ${error ? 'border-red-500/40 bg-red-500/8' : ''}`}
              placeholder="••••••••••••"
              autoFocus
            />
            {error && (
              <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-red-800">
                Invalid clearance code
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-between py-3 mt-1"
          >
            <span>INITIALIZE UPLINK</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-ink/60 hover:text-ink/70 transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
