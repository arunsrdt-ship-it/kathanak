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
      setMsg('TRANSMISSION SUCCESSFUL. WE WILL RESPOND SHORTLY.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setMsg('TRANSMISSION FAILED. PLEASE TRY AGAIN LATER.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-mono text-[10px] font-bold tracking-widest uppercase">ID / NAME</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
            className="form-input" placeholder="JOHN DOE" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-mono text-[10px] font-bold tracking-widest uppercase">COMM_LINK / EMAIL</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
            className="form-input" placeholder="JOHN@DOE.COM" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="subject" className="font-mono text-[10px] font-bold tracking-widest uppercase">SUBJECT_LINE</label>
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
          className="form-input" placeholder="WHAT IS THIS ABOUT?" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-mono text-[10px] font-bold tracking-widest uppercase">DATA_PAYLOAD / MESSAGE</label>
        <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={5}
          className="form-input resize-y" placeholder="WRITE YOUR MESSAGE HERE..." />
      </div>

      {status !== 'idle' && (
        <div className={`p-4 border-2 border-border font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-3 brutalist-card shadow-none ${status === 'success' ? 'bg-accent-blue text-text-primary' : 'bg-accent-beige text-text-primary'}`}>
          {status === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {msg}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full mt-2 justify-between">
        {loading ? 'TRANSMITTING...' : 'INITIATE_TRANSMISSION'}
        <Send size={16} />
      </button>
    </form>
  );
}
