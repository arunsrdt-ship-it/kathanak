'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin  = pathname?.startsWith('/admin');
  const isNexum  = pathname?.startsWith('/nexum');
  const isHome   = pathname === '/';

  /* Admin, nexum standalone, and home all manage their own nav/footer */
  if (isAdmin || isNexum || isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: 'var(--nav-height)',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          background: '#080808',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
