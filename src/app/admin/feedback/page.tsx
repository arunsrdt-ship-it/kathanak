'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/api';
import { useFeedback, useDeleteFeedback } from '@/lib/hooks';
import { Mail, Trash2 } from 'lucide-react';
import DeleteModal from '@/components/DeleteModal/DeleteModal';

export default function AdminFeedback() {
  const [deleteId,    setDeleteId]    = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  const { data: res, isLoading: loading } = useFeedback();
  const deleteMutation = useDeleteFeedback();
  const feedback = res?.data || [];

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError:   () => alert('Failed to delete feedback.'),
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-full">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-white/8">
        <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">
          COMMUNICATION LOG
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white/85">
          System Inbox
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            {[1,2,3].map(i => (
              <div key={i} className="h-32 rounded-2xl bg-white/5 border border-white/6" />
            ))}
          </div>
        ) : feedback.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-16 text-center">
            <div className="h-12 w-12 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/25">
              <Mail size={18} />
            </div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/20">
              No messages received yet.
            </p>
          </div>
        ) : (
          feedback.map(item => (
            <div
              key={item._id}
              className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm flex flex-col gap-5"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/8">
                <div className="flex items-center gap-4">
                  {/* Avatar pill */}
                  <div className="h-10 w-10 rounded-full border border-white/10 bg-white/6 flex items-center justify-center text-white/40 shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight text-white/80">
                      {item.name}
                    </h2>
                    <a
                      href={`mailto:${item.email}`}
                      className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-white/30 hover:text-white/55 transition-colors"
                    >
                      {item.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <div className="rounded-full border border-white/8 bg-white/4 px-3 py-1">
                    <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-white/25">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => { setDeleteId(item._id); setDeleteTitle(`Feedback from ${item.name}`); }}
                    className="h-8 w-8 rounded-xl border border-white/8 bg-white/4 flex items-center justify-center text-white/25 hover:bg-red-500/10 hover:text-red-400/70 hover:border-red-500/20 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-white/25 mb-3">
                  Subject: {item.subject || 'N/A'}
                </p>
                {/* Message */}
                <div
                  className="rounded-xl border-l-2 border-white/15 bg-white/3 px-5 py-4 text-white/55 leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1rem' }}
                >
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
