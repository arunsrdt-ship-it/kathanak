'use client';

import { useEffect, useState } from 'react';
import { fetchAuthStatus } from '@/lib/api';
import { CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, Database, Cpu, Tag } from 'lucide-react';

export default function AdminDashboard() {
  const [status,  setStatus]  = useState<{ authorized: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchAuthStatus();
      setStatus({ authorized: res.authorized, message: res.message });
    } catch {
      setStatus({ authorized: false, message: 'Failed to connect to backend API.' });
    }
    setLoading(false);
  };

  useEffect(() => { checkStatus(); }, []);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleConnectDrive = async () => {
    const key = localStorage.getItem('kathanak_admin_key');
    window.location.href = `${apiBase}/auth/google?key=${key}`;
  };

  const systemItems = [
    { icon: <Database size={13} />, label: 'DATABASE',   value: 'ONLINE',      color: 'text-emerald-800' },
    { icon: <Cpu size={13} />,      label: 'FRONTEND',   value: 'OPERATIONAL', color: 'text-emerald-800' },
    { icon: <Tag size={13} />,      label: 'API VERSION',value: '1.0.0',       color: 'text-ink/70' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-full">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b border-ink/8">
        <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60 mb-2">
          KATHANAK PLATFORM
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink/85">
          System Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Google Drive Status ──────────────────────────────────── */}
        <div
          className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/8">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink/85">
              Storage Uplink
            </h2>
            <button
              onClick={checkStatus}
              className="h-7 w-7 rounded-full border border-ink/10 bg-ink/6 flex items-center justify-center text-ink/70 hover:text-ink/80 hover:bg-ink/10 transition-all"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-12 rounded-xl bg-ink/6 w-full" />
              <div className="h-3 rounded bg-ink/4 w-2/3" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Status pill */}
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  status?.authorized
                    ? 'border-emerald-700/20 bg-emerald-700/8 text-emerald-800'
                    : 'border-red-700/20 bg-red-700/8 text-red-800'
                }`}
              >
                {status?.authorized
                  ? <CheckCircle2 size={16} />
                  : <AlertTriangle size={16} />
                }
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                  {status?.message}
                </span>
              </div>

              {!status?.authorized && (
                <div className="rounded-xl border border-ink/6 bg-ink/3 p-5 flex flex-col gap-4">
                  <p className="text-sm text-ink/70 leading-relaxed" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    To upload audio and video files, Kathanak needs permission to store files in your Google Drive. Click below to authorize.
                  </p>
                  <button
                    onClick={handleConnectDrive}
                    className="btn-primary w-fit"
                  >
                    AUTHORIZE GOOGLE DRIVE <ExternalLink size={13} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── System Status ────────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-ink/8 bg-ink/4 p-6 backdrop-blur-sm"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
        >
          <h2 className="font-display text-lg font-bold tracking-tight text-ink/85 mb-6 pb-4 border-b border-ink/8">
            System Status
          </h2>
          <ul className="flex flex-col gap-2">
            {systemItems.map(({ icon, label, value, color }) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-xl border border-ink/6 bg-ink/3 px-4 py-3"
              >
                <div className="flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-widest uppercase text-ink/60">
                  {icon} {label}
                </div>
                <span className={`font-mono text-[10px] font-bold tracking-widest uppercase ${color}`}>
                  {value}
                </span>
              </li>
            ))}
          </ul>

          {/* Decorative glow dot */}
          <div className="mt-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-ink/60">
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
