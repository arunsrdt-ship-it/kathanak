'use client';

import Link from 'next/link';
import { ArrowLeft, WrenchIcon } from 'lucide-react';

export default function EditPoetry() {
  return (
    <div className="p-6 md:p-10 max-w-4xl">

      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-white/8 flex items-center gap-4">
        <Link
          href="/admin/poetries"
          className="h-9 w-9 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/40 hover:bg-white/12 hover:text-white/70 transition-all shrink-0"
        >
          <ArrowLeft size={15} />
        </Link>
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-0.5">
            POETRY MANAGEMENT
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white/85">
            Edit Entry
          </h1>
        </div>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/8 bg-white/4 p-16 text-center backdrop-blur-sm">
        <div className="h-14 w-14 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/25">
          <WrenchIcon size={20} />
        </div>
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-white/55 mb-2">
            Coming in v1.1
          </p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/20 max-w-xs leading-relaxed">
            Editing functionality is not yet available. Delete and re-upload if changes are needed.
          </p>
        </div>
        <Link href="/admin/poetries" className="btn-outline mt-2">
          ← BACK TO ARCHIVES
        </Link>
      </div>

    </div>
  );
}
