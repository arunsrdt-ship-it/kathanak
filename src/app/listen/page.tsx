import type { Metadata } from 'next';
import { fetchPoetrys } from '@/lib/api';
import ModulePageLayout from '@/components/ModulePageLayout/ModulePageLayout';

export const metadata: Metadata = {
  title: 'Listen — Audio Poetries',
  description: 'Listen to original audio poetries in Hindi, Urdu & English. Close your eyes and let the words flow.',
};

interface Props { searchParams: Promise<{ page?: string }> }

export default async function ListenPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const res = await fetchPoetrys({ type: 'audio', page, limit: 12 }).catch(() => null);
  const poetries = res?.data ?? [];
  const pagination = res?.pagination ?? { total: 0, page: 1, pages: 1, limit: 12 };

  return (
    <ModulePageLayout
      type="audio"
      poetries={poetries}
      total={pagination.total}
      page={pagination.page}
      pages={pagination.pages}
      title="Listen"
      hindiTitle="कानों से महसूस करें"
      desc="Close your eyes and let the words flow through you. Original audio poetries, recorded with emotion and feeling."
    />
  );
}
