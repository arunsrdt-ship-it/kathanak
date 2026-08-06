import type { Metadata } from 'next';
import { fetchPoetrys } from '@/lib/api';
import ModulePageLayout from '@/components/ModulePageLayout/ModulePageLayout';

export const metadata: Metadata = {
  title: 'Watch — Video Poetries',
  description: 'Watch original video poetry performances. Experience poetry as a visual journey.',
};

interface Props { searchParams: Promise<{ page?: string }> }

export default async function WatchPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const res = await fetchPoetrys({ type: 'video', page, limit: 12 }).catch(() => null);
  const poetries  = res?.data       ?? [];
  const pagination = res?.pagination ?? { total: 0, page: 1, pages: 1, limit: 12 };

  return (
    <ModulePageLayout
      type="video"
      poetries={poetries}
      total={pagination.total}
      page={pagination.page}
      pages={pagination.pages}
      title="Watch"
      hindiTitle="आँखों से पढ़ें"
      desc="Experience poetry as a visual journey. Video performances that bring words to life in ways that go beyond the written page."
    />
  );
}
