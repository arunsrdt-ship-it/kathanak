'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type Poetry, formatDate } from '@/lib/api';
import { usePoetries, useDeletePoetry } from '@/lib/hooks';
import { Plus, Edit2, Trash2, Search, FileAudio, FileVideo, FileText } from 'lucide-react';
import DeleteModal from '@/components/DeleteModal/DeleteModal';

const typeIcon = {
  audio: <FileAudio size={13} className="text-amber-400/70" />,
  video: <FileVideo size={13} className="text-sky-400/70" />,
  text:  <FileText  size={13} className="text-white/40" />,
};

export default function AdminPoetries() {
  const [search,      setSearch]      = useState('');
  const [deleteId,    setDeleteId]    = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  const { data: res, isLoading: loading } = usePoetries({ limit: 100 });
  const deleteMutation = useDeletePoetry();
  const poetries: Poetry[] = res?.data || [];

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError:   () => alert('Failed to delete poetry.'),
    });
  };

  const filtered = poetries.filter(
    p => p.title.toLowerCase().includes(search.toLowerCase()) ||
         p.type.includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-full">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-white/8 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">
            POETRY MANAGEMENT
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white/85">
            Archives
          </h1>
        </div>
        <Link href="/admin/poetries/new" className="btn-primary shrink-0">
          <Plus size={14} /> NEW ENTRY
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center rounded-2xl border border-white/8 bg-white/4 p-4">
        <div className="relative w-full max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-9 w-full"
          />
        </div>
        <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-white/25 ml-auto shrink-0">
          {filtered.length} ENTRIES
        </span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="border-b border-white/8 bg-white/4">
                {['TYPE', 'TITLE', 'DATE', 'STATS', 'ACTIONS'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-white/30 border-r border-white/6 last:border-r-0 last:text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-white/20">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-white/20">
                    No entries found.
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr
                    key={p._id}
                    className="border-b border-white/5 hover:bg-white/4 transition-colors group"
                  >
                    {/* Type */}
                    <td className="px-4 py-3.5 border-r border-white/5">
                      <div className="flex items-center gap-2">
                        {typeIcon[p.type]}
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/35">
                          {p.type}
                        </span>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3.5 border-r border-white/5">
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-sm font-bold tracking-tight text-white/75">
                          {p.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {p.isFeatured && (
                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-amber-400/70">
                              FEAT
                            </span>
                          )}
                          {p.isPublished ? (
                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/8 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-emerald-400/70">
                              PUB
                            </span>
                          ) : (
                            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/8 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-yellow-400/60">
                              DRAFT
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 border-r border-white/5 font-mono text-[10px] text-white/30">
                      {formatDate(p.createdAt)}
                    </td>

                    {/* Stats */}
                    <td className="px-4 py-3.5 border-r border-white/5 font-mono text-[10px] font-bold text-white/30">
                      {p.views}V · {p.likes}L
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/poetries/${p._id}/edit`}
                          className="h-7 w-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/35 hover:bg-white/10 hover:text-white/70 transition-all"
                        >
                          <Edit2 size={12} />
                        </Link>
                        <button
                          onClick={() => { setDeleteId(p._id); setDeleteTitle(p.title); }}
                          className="h-7 w-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/35 hover:bg-red-500/12 hover:text-red-400/80 hover:border-red-500/20 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title={deleteTitle}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
