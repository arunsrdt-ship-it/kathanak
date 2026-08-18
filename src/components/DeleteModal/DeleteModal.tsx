import { AlertTriangle, Trash2, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDeleting: boolean;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title, isDeleting }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0f0f] overflow-hidden"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2.5 text-red-400/80">
            <AlertTriangle size={16} />
            <h2 className="font-display text-base font-bold tracking-tight">
              Confirm Deletion
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="h-7 w-7 rounded-full border border-white/8 bg-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/10 transition-all"
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/35">
            Are you sure you want to delete:
          </p>
          <div className="rounded-xl border border-red-500/15 bg-red-500/8 px-4 py-3">
            <span className="font-display text-base font-bold tracking-tight text-red-300/70 break-words">
              &ldquo;{title}&rdquo;
            </span>
          </div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/20">
            This action cannot be undone. Data will be permanently erased.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="btn-outline flex-1 py-2.5"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-mono font-bold tracking-widest uppercase text-white/90 transition-all hover:opacity-85"
            style={{ background: 'linear-gradient(to bottom, #b91c1c, #7f1d1d)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {isDeleting ? 'DELETING…' : 'DELETE'} <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
