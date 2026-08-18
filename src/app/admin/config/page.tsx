'use client';

import { useEffect, useState } from 'react';
import { type SiteConfig } from '@/lib/api';
import { useConfig, useUpdateConfig } from '@/lib/hooks';
import { Save, CheckCircle, AlertTriangle, RefreshCw, Layers, Sparkles, Globe, Mail } from 'lucide-react';

const DEFAULT_CONFIG: SiteConfig = {
  heroTagline: 'Welcome to my world of words',
  heroHindi: 'शब्दों में',
  heroTitle: 'Emotions',
  heroSubtitle: 'find their Voice',
  heroDescription:
    'A personal collection of original poetries — crafted in Hindi, Urdu & English. Listen, watch, or read. Let the words touch your heart.',
  siteTitle: 'Kathanak',
  siteSubtitle: 'शब्दों का संसार',
  siteDescription: 'A personal poetry platform',
  aboutText: '',
  contactEmail: 'kathanak19@outlook.com',
};

export default function AdminConfig() {
  const { data: res, isLoading: loading, isError, error: fetchError, refetch } = useConfig();
  const updateMutation = useUpdateConfig();

  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'hero' | 'meta' | 'general'>('hero');

  // Synchronize when server response arrives or updates
  useEffect(() => {
    if (res?.data) {
      setConfig(prev => ({
        ...prev,
        ...res.data,
      }));
    }
  }, [res]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setStatus('idle');
    updateMutation.mutate(config, {
      onSuccess: () => {
        setMsg('Configuration saved successfully.');
        setStatus('success');
      },
      onError: (err: any) => {
        setMsg(err?.message || 'Failed to save configuration. Please check your admin key.');
        setStatus('error');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-white/8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 mb-1">
            PLATFORM SETTINGS
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white/85">
            Site Configuration
          </h1>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={loading}
          className="btn-outline self-start sm:self-auto text-xs py-2 px-4 flex items-center gap-2"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          {loading ? 'SYNCING...' : 'RE-SYNC WITH SERVER'}
        </button>
      </div>

      {/* Warning banner if backend is unreachable / starting up */}
      {isError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 backdrop-blur-sm">
          <AlertTriangle size={16} className="text-amber-400/80 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-amber-300/80">
              Server Sync Notice
            </span>
            <p className="text-xs text-white/50 leading-relaxed">
              Unable to reach the live API ({fetchError instanceof Error ? fetchError.message : 'Server offline'}). Using local configuration defaults. You can still modify and save changes.
            </p>
          </div>
        </div>
      )}

      {/* Form status notification */}
      {status !== 'idle' && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-sm ${
            status === 'success'
              ? 'border-emerald-500/20 bg-emerald-500/8 text-emerald-300/80'
              : 'border-red-500/20 bg-red-500/8 text-red-300/80'
          }`}
        >
          {status === 'success' ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{msg}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/8 pb-4">
        {[
          { id: 'hero', label: 'HERO CONTENT', icon: <Sparkles size={13} /> },
          { id: 'meta', label: 'SITE BRANDING', icon: <Globe size={13} /> },
          { id: 'general', label: 'ABOUT & CONTACT', icon: <Mail size={13} /> },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white/12 text-white border border-white/15 shadow-sm'
                : 'text-white/40 hover:bg-white/6 hover:text-white/70 border border-transparent'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Tab 1: Hero Section */}
        {activeTab === 'hero' && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm flex flex-col gap-5">
            <div className="border-b border-white/8 pb-3 mb-1">
              <h2 className="font-display text-lg font-bold tracking-tight text-white/80">
                Hero Section Customization
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-0.5">
                Configure the headline, hindi accents, and description shown on the main hero
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Hero Tagline (Top Eyebrow)
                </label>
                <input
                  type="text"
                  name="heroTagline"
                  value={config.heroTagline || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Welcome to my world of words"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Hindi Accent Text
                </label>
                <input
                  type="text"
                  name="heroHindi"
                  value={config.heroHindi || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. शब्दों में"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Primary Title
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  value={config.heroTitle || ''}
                  onChange={handleChange}
                  className="form-input text-base font-bold"
                  placeholder="e.g. Emotions"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="heroSubtitle"
                  value={config.heroSubtitle || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. find their Voice"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                Hero Description
              </label>
              <textarea
                rows={3}
                name="heroDescription"
                value={config.heroDescription || ''}
                onChange={handleChange}
                className="form-input resize-y text-sm"
                placeholder="A personal collection of original poetries..."
              />
            </div>
          </div>
        )}

        {/* Tab 2: Site Branding & Meta */}
        {activeTab === 'meta' && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm flex flex-col gap-5">
            <div className="border-b border-white/8 pb-3 mb-1">
              <h2 className="font-display text-lg font-bold tracking-tight text-white/80">
                Site Branding &amp; Meta
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-0.5">
                Global branding titles and descriptions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Site Title
                </label>
                <input
                  type="text"
                  name="siteTitle"
                  value={config.siteTitle || ''}
                  onChange={handleChange}
                  className="form-input font-bold"
                  placeholder="Kathanak"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                  Site Subtitle
                </label>
                <input
                  type="text"
                  name="siteSubtitle"
                  value={config.siteSubtitle || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="शब्दों का संसार"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                Site Description
              </label>
              <input
                type="text"
                name="siteDescription"
                value={config.siteDescription || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="A personal poetry platform"
              />
            </div>
          </div>
        )}

        {/* Tab 3: About & Contact */}
        {activeTab === 'general' && (
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm flex flex-col gap-5">
            <div className="border-b border-white/8 pb-3 mb-1">
              <h2 className="font-display text-lg font-bold tracking-tight text-white/80">
                About &amp; Contact Info
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-0.5">
                Contact email and customized about text
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                Contact Email Address
              </label>
              <input
                type="email"
                name="contactEmail"
                value={config.contactEmail || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="kathanak19@outlook.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
                Custom About Text (Optional)
              </label>
              <textarea
                rows={5}
                name="aboutText"
                value={config.aboutText || ''}
                onChange={handleChange}
                className="form-input resize-y text-sm leading-relaxed"
                placeholder="Write custom about text or artist statement here..."
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="btn-primary py-3 px-8 text-xs font-mono font-bold tracking-widest flex items-center gap-2"
          >
            {updateMutation.isPending ? (
              <>
                SAVING... <RefreshCw size={13} className="animate-spin ml-1" />
              </>
            ) : (
              <>
                <Save size={14} /> SAVE CONFIGURATION
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
