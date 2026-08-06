'use client';

import { useEffect, useState } from 'react';
import { fetchAuthStatus } from '@/lib/api';
import { CheckCircle2, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [status, setStatus] = useState<{ authorized: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchAuthStatus();
      setStatus({ authorized: res.authorized, message: res.message });
    } catch (err) {
      setStatus({ authorized: false, message: 'Failed to connect to backend API.' });
    }
    setLoading(false);
  };

  useEffect(() => { checkStatus(); }, []);

  // Use the backend's base URL for the OAuth redirect
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  // Note: we need to pass the admin key in the query string or something because this is a browser redirect,
  // but since we redirect directly, headers won't be sent. 
  // Wait, the backend initiateAuth expects X-Admin-Key. 
  // If we just do window.location.href, it's a GET without headers.
  // We need to fetch the URL first, or pass token in URL.
  // Actually, the simplest way to hit a protected GET route from the browser is to fetch it.
  
  const handleConnectDrive = async () => {
    const key = localStorage.getItem('kathanak_admin_key');
    window.location.href = `${apiBase}/auth/google?key=${key}`;
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-full overflow-hidden">
      <div className="mb-12 border-b-2 border-border pb-6">
        <h1 className="font-display text-4xl font-black uppercase tracking-tighter mb-2">SYSTEM OVERVIEW</h1>
        <p className="font-mono text-xs font-bold tracking-widest uppercase text-text-muted">KATHANAK PLATFORM ADMINISTRATION PANEL</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Google Drive Status Module */}
        <div className="brutalist-card bg-white p-8">
          <div className="flex items-center justify-between mb-8 border-b-2 border-border pb-4">
             <h2 className="font-display text-2xl font-black uppercase tracking-tighter">STORAGE UPLINK</h2>
             <button onClick={checkStatus} className="p-2 border-2 border-border rounded-full hover:bg-bg-alt brutalist-card shadow-none">
               <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
             </button>
          </div>

          {loading ? (
            <div className="animate-pulse flex flex-col gap-4">
               <div className="h-12 bg-bg-alt w-full border-2 border-border" />
               <div className="h-4 bg-bg-alt w-2/3" />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className={`p-4 border-2 border-border font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-4 brutalist-card shadow-none
                ${status?.authorized ? 'bg-green-50 text-green-700 border-green-700' : 'bg-red-50 text-red-700 border-red-700'}`}>
                {status?.authorized ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                {status?.message}
              </div>

              {!status?.authorized && (
                <div className="bg-bg-alt border-2 border-border p-6 flex flex-col gap-4">
                  <p className="font-prose text-lg text-text-primary">
                    To upload audio and video files, Kathanak needs permission to store files in your Google Drive. 
                    Click the button below to authorize.
                  </p>
                  <button onClick={handleConnectDrive} className="btn-primary w-fit shadow-brutalist hover:shadow-brutalist-hover">
                    AUTHORIZE GOOGLE DRIVE <ExternalLink size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats (Placeholder) */}
        <div className="brutalist-card bg-bg-alt p-8 flex flex-col justify-between">
           <div>
             <h2 className="font-display text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-border pb-4">SYSTEM STATUS</h2>
             <ul className="flex flex-col gap-4 font-mono text-sm font-bold tracking-widest uppercase">
               <li className="flex justify-between border-b-2 border-dotted border-border pb-2">
                 <span className="text-text-muted">DATABASE</span>
                 <span className="text-green-600">ONLINE</span>
               </li>
               <li className="flex justify-between border-b-2 border-dotted border-border pb-2">
                 <span className="text-text-muted">FRONTEND</span>
                 <span className="text-green-600">OPERATIONAL</span>
               </li>
               <li className="flex justify-between border-b-2 border-dotted border-border pb-2">
                 <span className="text-text-muted">API VERSION</span>
                 <span>1.0.0</span>
               </li>
             </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
