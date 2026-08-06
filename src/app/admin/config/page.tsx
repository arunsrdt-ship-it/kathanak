'use client';

import { useEffect, useState } from 'react';
import { type SiteConfig } from '@/lib/api';
import { useConfig, useUpdateConfig } from '@/lib/hooks';
import { Save } from 'lucide-react';

export default function AdminConfig() {
  const { data: res, isLoading: loading } = useConfig();
  const updateMutation = useUpdateConfig();
  
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [msg, setMsg] = useState('');

  // Sync query data to local state for editing
  useEffect(() => {
    if (res?.data && !config) {
      setConfig(res.data);
    }
  }, [res, config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setMsg('');
    updateMutation.mutate(config, {
      onSuccess: () => setMsg('Configuration saved successfully.'),
      onError: () => setMsg('Failed to save configuration.')
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (config) setConfig({ ...config, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-12 font-mono font-bold tracking-widest uppercase">LOADING...</div>;
  if (!config) return <div className="p-12 font-mono font-bold tracking-widest uppercase text-red-500">ERROR LOADING CONFIG</div>;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-12 border-b-2 border-border pb-6">
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-2">SYSTEM CONFIGURATION</h1>
        <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">EDIT HOMEPAGE HERO CONTENT</p>
      </div>

      <form onSubmit={handleSubmit} className="brutalist-card bg-white p-8 md:p-12 flex flex-col gap-8 shadow-none">
        
        {msg && (
          <div className={`p-4 border-2 font-mono text-xs font-bold uppercase tracking-widest ${msg.includes('success') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
            {msg}
          </div>
        )}

        <div className="flex flex-col gap-2 border-b-2 border-dotted border-border pb-6">
          <label className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent-dark">MAIN HERO TITLE</label>
          <input type="text" name="heroTitle" value={config.heroTitle} onChange={handleChange} className="form-input text-2xl font-display font-black tracking-tighter" />
          <p className="font-mono text-[10px] uppercase text-text-muted">Will be broken into separate words automatically (e.g. "COMMUNITY POWERED POETRY")</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent-dark">HERO SUBTEXT</label>
          <input type="text" name="heroDescription" value={config.heroDescription} onChange={handleChange} className="form-input" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent-dark">TOP TAGLINE</label>
          <input type="text" name="heroTagline" value={config.heroTagline} onChange={handleChange} className="form-input" />
        </div>

        <div className="pt-8 flex justify-end">
          <button type="submit" disabled={updateMutation.isPending} className="btn-primary">
            {updateMutation.isPending ? 'SAVING...' : 'SAVE CONFIGURATION'} <Save size={16} />
          </button>
        </div>

      </form>
    </div>
  );
}
