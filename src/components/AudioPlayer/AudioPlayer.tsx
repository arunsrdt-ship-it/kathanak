'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { getStreamUrl, formatDuration } from '@/lib/api';

interface Props { poetryId: string; title: string; thumbnailUrl?: string; }

export default function AudioPlayer({ poetryId, title, thumbnailUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const [rot,      setRot]      = useState(0);

  const src = getStreamUrl(poetryId);

  useEffect(() => {
    let id: number;
    if (playing) {
      id = requestAnimationFrame(function loop() {
        setRot(r => (r + 0.5) % 360);
        id = requestAnimationFrame(loop);
      });
    }
    return () => cancelAnimationFrame(id);
  }, [playing]);

  const onTimeUpdate = () => setCurrent(audioRef.current!.currentTime);
  const onLoaded     = () => { setDuration(audioRef.current!.duration); setLoading(false); };
  const onEnd        = () => setPlaying(false);
  const onError      = () => { setError(true); setLoading(false); };

  const toggle = () => {
    const a = audioRef.current!;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play().then(() => setPlaying(true)).catch(() => setError(true)); }
  };

  const seek = (v: number) => { audioRef.current!.currentTime = v; setCurrent(v); };
  const skip = (s: number) => seek(Math.min(Math.max(current + s, 0), duration));
  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="brutalist-card bg-bg-alt flex flex-col p-6 relative overflow-hidden group">
      
      {/* Decorative background circle */}
      <div className="absolute -top-20 -right-20 w-64 h-64 border-2 border-border rounded-full opacity-10 pointer-events-none" />

      <audio ref={audioRef} src={src} preload="auto"
        onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoaded}
        onCanPlay={() => setLoading(false)} onEnded={onEnd} onError={onError} />

      {/* Top: Record Player Visual */}
      <div className="relative w-full aspect-square bg-white border-2 border-border mb-6 flex items-center justify-center brutalist-card shadow-none overflow-hidden">
        
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
            <div className="font-mono text-xs font-bold tracking-widest uppercase animate-pulse">LOADING_AUDIO...</div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20 text-center p-4">
            <p className="font-mono text-[10px] font-bold text-red-600 uppercase">ERR: STREAM_FAILED</p>
          </div>
        )}

        {/* Record Disc */}
        <div className="w-[85%] h-[85%] rounded-full bg-accent-dark border-[8px] border-border relative flex items-center justify-center shadow-inner"
             style={{ transform: `rotate(${rot}deg)` }}>
          
          {/* Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full border border-white/10" />
          <div className="absolute inset-16 rounded-full border border-white/10" />
          
          {/* Label */}
          <div className="w-1/3 h-1/3 rounded-full bg-accent-beige border-4 border-border relative overflow-hidden flex items-center justify-center">
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt="label" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-multiply" />
            )}
            <div className="w-4 h-4 rounded-full bg-white border-2 border-border z-10" />
          </div>
        </div>
        
        {/* Tonearm (decorative) */}
        <div className={`absolute top-4 right-4 w-2 h-1/2 bg-bg-alt border-2 border-border origin-top transition-transform duration-700 z-10
          ${playing ? 'rotate-[25deg]' : 'rotate-[5deg]'}`}>
          <div className="w-6 h-6 rounded-full bg-accent-dark border-2 border-border absolute -top-3 -left-2" />
          <div className="w-4 h-8 bg-accent-dark border-2 border-border absolute bottom-0 -left-1" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-bold w-8 text-right">{formatDuration(Math.floor(current))}</span>
          <input type="range" min={0} max={duration || 1} step={0.1} value={current}
            onChange={e => seek(Number(e.target.value))}
            className="flex-1" style={{ '--progress': `${progress}%` } as React.CSSProperties} />
          <span className="font-mono text-[10px] font-bold w-8">{formatDuration(Math.floor(duration))}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => { setMuted(m => !m); audioRef.current!.muted = !muted; }}
            className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-white hover:bg-bg-alt transition-colors brutalist-card shadow-none hover:translate-x-0 hover:translate-y-0">
            {muted ? <VolumeX size={16} strokeWidth={2.5}/> : <Volume2 size={16} strokeWidth={2.5}/>}
          </button>
          
          <div className="flex items-center gap-4">
            <button onClick={() => skip(-10)} className="hover:scale-110 transition-transform">
              <SkipBack size={20} strokeWidth={2.5}/>
            </button>
            <button onClick={toggle}
              className="w-14 h-14 rounded-full bg-accent-dark text-white border-2 border-border flex items-center justify-center hover:scale-105 transition-transform brutalist-card shadow-none">
              {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <button onClick={() => skip(10)} className="hover:scale-110 transition-transform">
              <SkipForward size={20} strokeWidth={2.5}/>
            </button>
          </div>
          
          <div className="w-10 h-10 opacity-0" /> {/* Spacer */}
        </div>
      </div>
    </div>
  );
}
