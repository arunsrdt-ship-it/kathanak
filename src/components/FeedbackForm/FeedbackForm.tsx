'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { submitFeedbackToAPI } from '@/lib/api';

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState<'idle' | 'success' | 'error'>('idle');
  const [msg,     setMsg]     = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus('idle'); setMsg('');
    try {
      await submitFeedbackToAPI(formData);
      setStatus('success');
      setMsg('Message sent. We will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setMsg('Transmission failed. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ fontFamily: "'Geist', sans-serif" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
            Name
          </label>
          <input
            type="text" id="name" name="name" required
            value={formData.name} onChange={handleChange}
            className="form-input"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
            Email
          </label>
          <input
            type="email" id="email" name="email" required
            value={formData.email} onChange={handleChange}
            className="form-input"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
          Subject
        </label>
        <input
          type="text" id="subject" name="subject"
          value={formData.subject} onChange={handleChange}
          className="form-input"
          placeholder="What is this about?"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">
          Message
        </label>
        <textarea
          id="message" name="message" required rows={5}
          value={formData.message} onChange={handleChange}
          className="form-input resize-y"
          placeholder="Write your message here..."
        />
      </div>

      {status !== 'idle' && (
        <div
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm backdrop-blur-sm ${
            status === 'success'
              ? 'border-green-500/20 bg-green-500/8 text-green-300/80'
              : 'border-red-500/20 bg-red-500/8 text-red-300/80'
          }`}
        >
          {status === 'success'
            ? <CheckCircle size={15} />
            : <AlertTriangle size={15} />
          }
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{msg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-1 justify-between py-3"
      >
        <span>{loading ? 'Sending...' : 'Send Message'}</span>
        <Send size={14} className={loading ? 'animate-pulse' : ''} />
      </button>
    </form>
  );
}
