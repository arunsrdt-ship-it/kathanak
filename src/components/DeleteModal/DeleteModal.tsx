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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-4 border-border brutalist-card max-w-md w-full shadow-brutalist animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-4 border-border bg-accent-beige">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={24} strokeWidth={2.5} />
            <h2 className="font-display text-xl font-black uppercase tracking-tighter">CONFIRM DELETION</h2>
          </div>
          <button onClick={onClose} disabled={isDeleting} className="hover:scale-110 transition-transform">
            <X size={24} strokeWidth={2.5} className="text-text-primary" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary leading-relaxed">
            Are you sure you want to delete:
          </p>
          <div className="mt-4 p-4 bg-bg-alt border-2 border-border border-dashed font-display text-lg font-black uppercase tracking-tighter text-red-600 break-words">
            "{title}"
          </div>
          <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
            This action cannot be undone. Data will be permanently erased.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-4 border-t-4 border-border bg-bg-alt">
          <button onClick={onClose} disabled={isDeleting} className="btn-secondary flex-1 py-3">
            CANCEL
          </button>
          <button onClick={onConfirm} disabled={isDeleting} className="btn-primary flex-1 py-3 bg-red-600 hover:bg-red-700 text-white">
            {isDeleting ? 'DELETING...' : 'DELETE'} <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
