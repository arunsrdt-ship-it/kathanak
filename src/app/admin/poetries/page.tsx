'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type Poetry, formatDate } from '@/lib/api';
import { usePoetries, useDeletePoetry } from '@/lib/hooks';
import { Plus, Edit2, Trash2, Search, FileAudio, FileVideo, FileText, CheckCircle } from 'lucide-react';
import DeleteModal from '@/components/DeleteModal/DeleteModal';

export default function AdminPoetries() {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');
  
  const { data: res, isLoading: loading } = usePoetries({ limit: 100 });
  const deleteMutation = useDeletePoetry();
  
  const poetries: Poetry[] = res?.data || [];

  const handleDelete = (id: string, title: string) => {
    setDeleteId(id);
    setDeleteTitle(title);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError: () => alert('Failed to delete poetry.')
    });
  };

  const filtered = poetries.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.type.includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-full overflow-hidden">
      <div className="mb-12 border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-2">ARCHIVES</h1>
          <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">MANAGE YOUR POETRY COLLECTION</p>
        </div>
        <Link href="/admin/poetries/new" className="btn-primary">
          <Plus size={16} /> NEW ENTRY
        </Link>
      </div>

      <div className="brutalist-card bg-white p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-none">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="SEARCH ENTRIES..." value={search} onChange={e => setSearch(e.target.value)}
            className="form-input pl-10 w-full" />
        </div>
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted">
          TOTAL: {filtered.length}
        </span>
      </div>

      <div className="brutalist-card bg-white overflow-x-auto shadow-none">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b-2 border-border bg-bg-alt">
              <th className="p-4 font-mono text-[10px] font-bold tracking-widest uppercase border-r-2 border-border">TYPE</th>
              <th className="p-4 font-mono text-[10px] font-bold tracking-widest uppercase border-r-2 border-border">TITLE</th>
              <th className="p-4 font-mono text-[10px] font-bold tracking-widest uppercase border-r-2 border-border">DATE</th>
              <th className="p-4 font-mono text-[10px] font-bold tracking-widest uppercase border-r-2 border-border">STATS</th>
              <th className="p-4 font-mono text-[10px] font-bold tracking-widest uppercase text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center font-mono text-xs font-bold uppercase">LOADING...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center font-mono text-xs font-bold uppercase text-text-muted">NO ENTRIES FOUND.</td></tr>
            ) : filtered.map((p) => (
              <tr key={p._id} className="border-b-2 border-border hover:bg-bg-alt transition-colors group">
                <td className="p-4 border-r-2 border-border">
                   <div className="flex items-center gap-2">
                     {p.type === 'audio' && <FileAudio size={16} className="text-accent-dark" />}
                     {p.type === 'video' && <FileVideo size={16} className="text-accent-blue" />}
                     {p.type === 'text'  && <FileText size={16} className="text-text-muted" />}
                     <span className="font-mono text-[10px] font-bold uppercase">{p.type}</span>
                   </div>
                </td>
                <td className="p-4 border-r-2 border-border">
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-black uppercase tracking-tighter">{p.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {p.isFeatured && <span className="px-1.5 py-0.5 bg-accent-dark text-white text-[8px] font-mono font-bold uppercase">FEAT</span>}
                      {p.isPublished ? <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[8px] font-mono font-bold uppercase">PUB</span> : <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[8px] font-mono font-bold uppercase">DRAFT</span>}
                    </div>
                  </div>
                </td>
                <td className="p-4 border-r-2 border-border font-mono text-xs">{formatDate(p.createdAt)}</td>
                <td className="p-4 border-r-2 border-border font-mono text-[10px] font-bold">
                  {p.views} V / {p.likes} L
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/poetries/${p._id}/edit`} className="w-8 h-8 flex items-center justify-center border-2 border-border hover:bg-white brutalist-card shadow-none">
                      <Edit2 size={14} />
                    </Link>
                    <button onClick={() => handleDelete(p._id, p.title)} className="w-8 h-8 flex items-center justify-center border-2 border-border hover:bg-red-50 hover:text-red-600 brutalist-card shadow-none">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
