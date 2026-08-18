'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAdminKey, logoutAdmin } from '@/lib/api';
import { LayoutDashboard, FileAudio, Settings, MessageSquare, LogOut, Disc } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin',           label: 'DASHBOARD', icon: <LayoutDashboard size={15} /> },
  { href: '/admin/poetries',  label: 'ARCHIVES',  icon: <FileAudio size={15} /> },
  { href: '/admin/config',    label: 'CONFIG',    icon: <Settings size={15} /> },
  { href: '/admin/feedback',  label: 'INBOX',     icon: <MessageSquare size={15} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuth,  setIsAuth]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const key = getAdminKey();
    if (!key && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (key) {
      setIsAuth(true);
    }
  }, [pathname, router]);

  if (!mounted) return null;

  /* Login page — no sidebar */
  if (pathname === '/admin/login') {
    return (
      <div
        className="min-h-screen"
        style={{ background: '#050505', fontFamily: "'Geist', sans-serif" }}
      >
        {children}
      </div>
    );
  }

  if (!isAuth) return null;

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: '#070707', fontFamily: "'Geist', sans-serif" }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside
        className="hidden md:flex w-60 flex-col border-r border-white/8 shrink-0"
        style={{ background: '#0a0a0a' }}
      >
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3.5 py-2 w-full transition-all hover:bg-white/10"
          >
            <Disc
              size={14}
              className="text-white/60 transition-transform duration-700 group-hover:rotate-180"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white/80">
                KATHANAK
              </span>
              <span className="text-[8px] font-mono font-bold uppercase tracking-[0.15em] text-white/30 mt-0.5">
                ADMIN PANEL
              </span>
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active =
              pathname === href ||
              (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
                  active
                    ? 'bg-white/10 text-white border border-white/12'
                    : 'text-white/40 hover:bg-white/6 hover:text-white/70 border border-transparent'
                }`}
              >
                <span className={active ? 'text-white/80' : 'text-white/30'}>
                  {icon}
                </span>
                {label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/40" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-5 border-t border-white/8">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase text-red-400/60 transition-all duration-200 hover:bg-red-500/8 hover:text-red-400/90"
          >
            <LogOut size={15} />
            TERMINATE
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ───────────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0a0a0a]/95 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <Disc size={14} className="text-white/50" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white/70">
            KATHANAK ADMIN
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, icon }) => {
            const active =
              pathname === href ||
              (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                  active ? 'bg-white/12 text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {icon}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400/50 hover:text-red-400/80 ml-1"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto md:mt-0 mt-14">
        {children}
      </main>
    </div>
  );
}
