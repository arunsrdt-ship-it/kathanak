import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import QueryProvider from '@/components/QueryProvider/QueryProvider';

export const metadata: Metadata = {
  title: {
    default: 'Kathanak — शब्दों का संसार',
    template: '%s | Kathanak',
  },
  description:
    'A personal poetry platform to listen, watch, and read original poetries in Hindi, Urdu, and English. Explore emotions through words and rhythm.',
  keywords: ['poetry', 'kathanak', 'hindi poetry', 'urdu poetry', 'audio poetry', 'video poetry', 'shayari'],
  authors: [{ name: 'Kathanak' }],
  creator: 'Kathanak',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kathanak.vercel.app',
    siteName: 'Kathanak',
    title: 'Kathanak — शब्दों का संसार',
    description: 'A personal poetry platform — listen, watch, and read original poetries.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kathanak — शब्दों का संसार',
    description: 'A personal poetry platform — listen, watch, and read original poetries.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <QueryProvider>
          {/* Subtle noise texture */}
          <div className="noise-overlay" aria-hidden="true" />
          <ClientLayout>{children}</ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
