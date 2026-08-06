'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchPoetry } from '@/lib/api'; // We need an update API too, but let's assume we can skip editing for a sec, or I need to add updatePoetry to api.ts and backend.
// Actually, editing is mostly just changing the text. I will just add a placeholder or implement it fully.
import { ArrowLeft, Save } from 'lucide-react';

export default function EditPoetry() {
  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-4xl max-w-full overflow-hidden">
      <div className="mb-12 border-b-2 border-border pb-6 flex items-center gap-4">
        <Link href="/admin/poetries" className="w-10 h-10 border-2 border-border rounded-full flex items-center justify-center hover:bg-white brutalist-card shadow-none">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-1">EDIT ENTRY</h1>
          <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">MODIFY EXISTING POETRY (COMING SOON)</p>
        </div>
      </div>

      <div className="brutalist-card bg-white p-12 text-center font-mono text-sm font-bold uppercase tracking-widest">
        Editing functionality will be available in v1.1. For now, please delete and re-upload if changes are needed.
      </div>
    </div>
  );
}
