import type { Metadata } from 'next';
import NexumHero from '@/components/NexumHero/NexumHero';

export const metadata: Metadata = {
  title: 'Nexum Hero',
  description:
    'Ship AI workers that grind while you rest. Nexum handles recurring ops so your team can focus on what matters.',
  keywords: ['AI ops', 'automation', 'AI workers', 'nexum', 'operations'],
  openGraph: {
    title: 'Nexum Hero',
    description: 'Ship AI workers that grind while you rest.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexum Hero',
    description: 'Ship AI workers that grind while you rest.',
  },
};

/* Standalone page — no global Navbar/Footer */
export default function NexumPage() {
  return <NexumHero />;
}
