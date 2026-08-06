'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { uploadPoetry } from '@/lib/api';
import { ArrowLeft, Save, Upload } from 'lucide-react';

export default function NewPoetry() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'text',
    language: 'english',
    tags: '',
    content: '',
    thumbnailUrl: '',
    isFeatured: false,
    isPublished: true,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'tags') {
          // split tags by comma
          const t = (val as string).split(',').map(s => s.trim()).filter(Boolean);
          data.append('tags', JSON.stringify(t));
        } else {
          data.append(key, String(val));
        }
      });

      if (file && (formData.type === 'audio' || formData.type === 'video')) {
        data.append('media', file);
      }

      await uploadPoetry(data);
      router.push('/admin/poetries');
    } catch (err: any) {
      setError(err.message || 'Failed to upload poetry');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-4xl max-w-full overflow-hidden">
      
      <div className="mb-12 border-b-2 border-border pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/poetries" className="w-10 h-10 border-2 border-border rounded-full flex items-center justify-center hover:bg-white brutalist-card shadow-none">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-1">NEW ENTRY</h1>
            <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">ADD POETRY TO ARCHIVE</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="brutalist-card bg-white p-8 md:p-12 flex flex-col gap-8 shadow-none">
        
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700 font-mono text-xs font-bold uppercase tracking-widest">
            ERR: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Col */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">TITLE</label>
              <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="ENTRY TITLE" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">TYPE</label>
              <select className="form-input appearance-none cursor-pointer" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="text">TEXT ONLY</option>
                <option value="audio">AUDIO STREAM</option>
                <option value="video">VIDEO STREAM</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">LANGUAGE</label>
              <select className="form-input appearance-none cursor-pointer" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                <option value="english">ENGLISH</option>
                <option value="hindi">HINDI</option>
                <option value="urdu">URDU</option>
                <option value="other">OTHER</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">THUMBNAIL URL (OPTIONAL)</label>
              <input type="text" className="form-input" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} placeholder="https://..." />
            </div>
          </div>

          {/* Right Col */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 h-full">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">DESCRIPTION</label>
              <textarea className="form-input resize-none h-full" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="SHORT SUMMARY..." />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] font-bold tracking-widest uppercase">TAGS (COMMA SEPARATED)</label>
              <input type="text" className="form-input" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="LIFE, LOVE, NATURE..." />
            </div>
          </div>
        </div>

        {/* Media Upload (conditionally shown) */}
        {(formData.type === 'audio' || formData.type === 'video') && (
          <div className="flex flex-col gap-2 pt-6 border-t-2 border-border">
            <label className="font-mono text-[10px] font-bold tracking-widest uppercase">MEDIA FILE (UPLOADS TO GOOGLE DRIVE)</label>
            <div className="border-2 border-dashed border-border p-8 flex flex-col items-center justify-center gap-4 bg-bg-alt hover:bg-accent-blue/10 transition-colors relative cursor-pointer group">
              <input type="file" required onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept={formData.type === 'audio' ? 'audio/*' : 'video/*'} />
              <div className="w-12 h-12 rounded-full border-2 border-border bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={20} />
              </div>
              <div className="text-center">
                <p className="font-display font-black text-xl uppercase tracking-tighter">
                  {file ? file.name : `SELECT ${formData.type.toUpperCase()} FILE`}
                </p>
                <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted mt-1">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'CLICK OR DRAG & DROP'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col gap-2 pt-6 border-t-2 border-border">
          <label className="font-mono text-[10px] font-bold tracking-widest uppercase">POEM TEXT / LYRICS</label>
          <textarea rows={10} className="form-input resize-y font-prose text-lg" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="The text of the poetry..." />
        </div>

        {/* Toggles */}
        <div className="flex gap-8 pt-6 border-t-2 border-border">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 border-2 border-border appearance-none checked:bg-accent-dark checked:border-accent-dark cursor-pointer brutalist-card shadow-none" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">FEATURED</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} className="w-5 h-5 border-2 border-border appearance-none checked:bg-accent-dark checked:border-accent-dark cursor-pointer brutalist-card shadow-none" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">PUBLISH IMMEDIATELY</span>
          </label>
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'TRANSMITTING...' : 'SAVE ENTRY'} <Save size={16} />
          </button>
        </div>

      </form>
    </div>
  );
}
