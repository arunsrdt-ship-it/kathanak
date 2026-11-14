'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type Poetry, formatDate } from '@/lib/api';
import { useAdminPoetries, useDeletePoetry } from '@/lib/hooks';
import { Plus, Edit2, Trash2, Search, FileAudio, FileVideo, FileText, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import DeleteModal from '@/components/DeleteModal/DeleteModal';

const typeIcon = {
  audio: <FileAudio size={13} className="text-amber-800" />,
  video: <FileVideo size={13} className="text-sky-800" />,
  text:  <FileText  size={13} className="text-ink/70" />,
};

export default function AdminPoetries() {
  const [search,      setSearch]      = useState('');
  const [deleteId,    setDeleteId]    = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [page,        setPage]        = useState(1);

  const { data: res, isLoading: loading, isError, error } = useAdminPoetries({ limit: 100, page, search });
  const deleteMutation = useDeletePoetry();
  const poetries: Poetry[] = res?.data || [];

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError:   () => alert('Failed to delete poetry.'),
    });
  };

  const filtered = poetries;

  return (
    <div className="p-6 md:p-10 max-w-full">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-ink/8 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink/60 mb-1">
            ALL ENTRIES · INCLUDING DRAFTS
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink/85">
            Your poetries
          </h1>
        </div>
        <Link href="/admin/poetries/new" className="btn-primary shrink-0">
          <Plus size={14} /> NEW ENTRY
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center rounded-2xl border border-ink/8 bg-ink/4 p-4">
        <div className="relative w-full max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/60" />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="form-input pl-9 w-full"
          />
        </div>
        <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-ink/60 ml-auto shrink-0">
          {res?.pagination.total ?? 0} ENTRIES
        </span>
      </div>

      {isError && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-700/20 bg-red-700/8 px-4 py-3 text-red-800">
          <AlertTriangle size={15} className="mt-0.5 shrink-0" />
          <p className="text-sm">{error instanceof Error ? error.message : 'Could not load your poetries.'}</p>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-ink/8 bg-ink/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="border-b border-ink/8 bg-ink/4">
                {['TYPE', 'TITLE', 'DATE', 'STATS', 'ACTIONS'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-ink/60 border-r border-ink/6 last:border-r-0 last:text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                    No entries found.
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr
                    key={p._id}
                    className="border-b border-ink/5 hover:bg-ink/4 transition-colors group"
                  >
                    {/* Type */}
                    <td className="px-4 py-3.5 border-r border-ink/5">
                      <div className="flex items-center gap-2">
                        {typeIcon[p.type]}
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/60">
                          {p.type}
                        </span>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3.5 border-r border-ink/5">
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-sm font-bold tracking-tight text-ink/85">
                          {p.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {p.isFeatured && (
                            <span className="rounded-full border border-amber-700/20 bg-amber-700/10 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-amber-800">
                              FEAT
                            </span>
                          )}
                          {p.isPublished ? (
                            <span className="rounded-full border border-emerald-700/20 bg-emerald-700/8 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-emerald-800">
                              PUB
                            </span>
                          ) : (
                            <span className="rounded-full border border-yellow-700/20 bg-yellow-700/8 px-1.5 py-px text-[8px] font-mono font-bold uppercase tracking-widest text-yellow-800">
                              DRAFT
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 border-r border-ink/5 font-mono text-[10px] text-ink/60">
                      {formatDate(p.createdAt)}
                    </td>

                    {/* Stats */}
                    <td className="px-4 py-3.5 border-r border-ink/5 font-mono text-[10px] font-bold text-ink/60">
                      {p.views}V · {p.likes}L
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/poetries/${p._id}/edit`}
                          className="h-7 w-7 rounded-lg border border-ink/10 bg-ink/5 flex items-center justify-center text-ink/60 hover:bg-ink/10 hover:text-ink/80 transition-all"
                        >
                          <Edit2 size={12} />
                        </Link>
                        <button
                          onClick={() => { setDeleteId(p._id); setDeleteTitle(p.title); }}
                          className="h-7 w-7 rounded-lg border border-ink/10 bg-ink/5 flex items-center justify-center text-ink/60 hover:bg-red-700/10 hover:text-red-800 hover:border-red-700/20 transition-all"
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

      {!loading && (res?.pagination.pages ?? 1) > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-xs text-ink/70">
            Page {res?.pagination.page} of {res?.pagination.pages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-outline px-3 py-2"
              disabled={page <= 1}
              onClick={() => setPage(value => Math.max(1, value - 1))}
              aria-label="Previous page"
            ><ChevronLeft size={15} /></button>
            <button
              type="button"
              className="btn-outline px-3 py-2"
              disabled={page >= (res?.pagination.pages ?? 1)}
              onClick={() => setPage(value => value + 1)}
              aria-label="Next page"
            ><ChevronRight size={15} /></button>
          </div>
        </div>
      )}

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
