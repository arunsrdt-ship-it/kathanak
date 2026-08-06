'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAdminKey, logoutAdmin } from '@/lib/api';
import { LayoutDashboard, FileAudio, Settings, MessageSquare, LogOut, Disc } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setMounted(true);
    const key = getAdminKey();
    if (!key && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (key) {
      setIsAuth(true);
    }
  }, [pathname, router]);

  if (!mounted) return null; // Prevent hydration mismatch

  // If on login page, don't show sidebar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  // If not authenticated and not on login page, render nothing while redirecting
  if (!isAuth) return null;

  const navItems = [
    { href: '/admin', label: 'DASHBOARD', icon: <LayoutDashboard size={16} /> },
    { href: '/admin/poetries', label: 'ARCHIVES', icon: <FileAudio size={16} /> },
    { href: '/admin/config', label: 'CONFIG', icon: <Settings size={16} /> },
    { href: '/admin/feedback', label: 'INBOX', icon: <MessageSquare size={16} /> },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-bg-alt border-r-2 border-b-2 md:border-b-0 border-border flex flex-col">
        
        <div className="p-6 border-b-2 border-border">
          <Link href="/" className="inline-flex items-center gap-2 bg-accent-dark text-white px-4 py-2 rounded-full border-2 border-border brutalist-card shadow-none hover:shadow-brutalist">
            <Disc size={16} />
            <span className="font-display font-black tracking-tighter uppercase leading-none mt-1">KATHANAK ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-2">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors brutalist-card shadow-none hover:translate-x-0 hover:translate-y-0 ${
                  active ? 'bg-accent-blue border-2 border-border' : 'bg-transparent border-2 border-transparent hover:border-border hover:bg-white'
                }`}>
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t-2 border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 font-mono text-xs font-bold tracking-widest uppercase text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-600 w-full transition-colors brutalist-card shadow-none hover:translate-x-0 hover:translate-y-0">
            <LogOut size={16} /> TERMINATE
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
