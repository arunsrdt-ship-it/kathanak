import type { Metadata } from 'next';
import { fetchPoetrys } from '@/lib/api';
import ModulePageLayout from '@/components/ModulePageLayout/ModulePageLayout';

export const metadata: Metadata = {
  title: 'Read — Written Poetries',
  description: 'Read original written poetries in Hindi, Urdu & English. Pause, breathe, and let the words resonate.',
};

interface Props { searchParams: Promise<{ page?: string }> }

export default async function ReadPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const res = await fetchPoetrys({ type: 'text', page, limit: 12 }).catch(() => null);
  const poetries   = res?.data       ?? [];
  const pagination = res?.pagination ?? { total: 0, page: 1, pages: 1, limit: 12 };

  return (
    <ModulePageLayout
      type="text"
      poetries={poetries}
      total={pagination.total}
      page={pagination.page}
      pages={pagination.pages}
      title="Read"
      hindiTitle="दिल से पढ़ें"
      desc="Pause, breathe and read. Each verse crafted to resonate with your inner world — in Hindi, Urdu & English."
    />
  );
}
