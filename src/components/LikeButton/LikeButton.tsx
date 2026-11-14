'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likePoetry } from '@/lib/api';

export default function LikeButton({
  id,
  initialLikes,
  className = '',
}: { id: string; initialLikes: number; className?: string }) {
  const [likes, setLikes] = useState(initialLikes);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleLike = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await likePoetry(id);
      setLikes(response.data.likes);
    } catch {
      setError('Could not save your like. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <button type="button" onClick={handleLike} disabled={busy} className="btn-primary disabled:opacity-50">
        <Heart size={16} /> {busy ? 'SAVING…' : `LIKE THIS POETRY · ${likes}`}
      </button>
      {error && <p role="status" className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
