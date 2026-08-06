'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/api';
import { useFeedback, useDeleteFeedback } from '@/lib/hooks';
import { Mail, MessageSquare, Trash2 } from 'lucide-react';
import DeleteModal from '@/components/DeleteModal/DeleteModal';

export default function AdminFeedback() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  const { data: res, isLoading: loading } = useFeedback();
  const deleteMutation = useDeleteFeedback();
  const feedback = res?.data || [];

  const handleDelete = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteTitle(`Feedback from ${name}`);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError: () => alert('Failed to delete feedback.')
    });
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-full overflow-hidden">
      <div className="mb-12 border-b-2 border-border pb-6">
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-2">SYSTEM INBOX</h1>
        <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">MANAGE INCOMING TRANSMISSIONS</p>
      </div>

      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="font-mono text-xs font-bold uppercase tracking-widest">LOADING INBOX...</div>
        ) : feedback.length === 0 ? (
          <div className="brutalist-card bg-white p-12 text-center font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
            NO TRANSMISSIONS RECEIVED YET.
          </div>
        ) : (
          feedback.map(item => (
            <div key={item._id} className="brutalist-card bg-white p-6 md:p-8 flex flex-col gap-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-border pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-border bg-accent-blue flex items-center justify-center brutalist-card shadow-none">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-black uppercase tracking-tighter">{item.name}</h2>
                    <a href={`mailto:${item.email}`} className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent-dark hover:underline">
                      {item.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted bg-bg-alt px-3 py-1 border-2 border-border">
                    {formatDate(item.createdAt)}
                  </div>
                  <button onClick={() => handleDelete(item._id, item.name)} className="w-8 h-8 flex items-center justify-center border-2 border-border hover:bg-red-50 hover:text-red-600 brutalist-card shadow-none transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted mb-2 border-b-2 border-dotted border-border pb-1 w-fit">
                  SUBJECT: {item.subject || 'N/A'}
                </h3>
                <div className="font-prose text-lg text-text-primary leading-relaxed whitespace-pre-wrap bg-bg-alt p-6 border-l-4 border-accent-dark">
                  {item.message}
                </div>
              </div>

            </div>
          ))
        )}
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
