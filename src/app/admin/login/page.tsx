'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminKey } from '@/lib/api';
import { Disc, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [key, setKey] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-bg p-6 relative overflow-hidden">
      
      {/* Decorative background text */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none select-none flex items-center justify-center">
        <span className="font-display text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap -rotate-12">
          RESTRICTED
        </span>
      </div>

      <div className="brutalist-card bg-white p-10 md:p-16 max-w-md w-full relative z-10 flex flex-col gap-8">
        
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-border bg-accent-dark text-white flex items-center justify-center mb-2 brutalist-card shadow-none">
            <Lock size={24} />
          </div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tighter leading-none">SYSTEM AUTH</h1>
          <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted">
            ENTER CLEARANCE CODE TO ACCESS KATHANAK ADMIN
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="key" className="font-mono text-[10px] font-bold tracking-widest uppercase">AUTHORIZATION KEY</label>
            <input
              type="password"
              id="key"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(false); }}
              className={`form-input ${error ? 'border-red-500 bg-red-50' : ''}`}
              placeholder="••••••••••••"
              autoFocus
            />
            {error && <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-500 mt-1">INVALID CLEARANCE CODE</span>}
          </div>

          <button type="submit" className="btn-primary w-full justify-between mt-2">
            INITIALIZE UPLINK <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
