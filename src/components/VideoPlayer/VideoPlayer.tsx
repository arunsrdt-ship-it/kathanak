'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, RotateCw } from 'lucide-react';
import { getStreamUrl, formatDuration } from '@/lib/api';

interface Props { poetryId: string; title: string; thumbnailUrl?: string; }

export default function VideoPlayer({ poetryId, title, thumbnailUrl }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const [controls, setControls] = useState(false);

  const src = getStreamUrl(poetryId);

  const onTimeUpdate = () => setCurrent(videoRef.current!.currentTime);
  const onLoaded     = () => { setDuration(videoRef.current!.duration); setLoading(false); };
  const onEnd        = () => setPlaying(false);
  const onError      = () => { setError(true); setLoading(false); };

  const toggle = () => {
    const v = videoRef.current!;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play().then(() => setPlaying(true)).catch(() => setError(true)); }
  };

  const seek  = (v: number) => { videoRef.current!.currentTime = v; setCurrent(v); };
  const skip  = (s: number) => seek(Math.min(Math.max(current + s, 0), duration));
  const fullscreen = () => wrapRef.current?.requestFullscreen?.();

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div ref={wrapRef}
      className="relative w-full aspect-video bg-white border-2 border-border brutalist-card overflow-hidden group p-2"
      onMouseEnter={() => setControls(true)} onMouseLeave={() => setControls(false)}>

      <div className="relative w-full h-full border-2 border-border bg-bg overflow-hidden">
        <video ref={videoRef} src={src} preload="auto"
          poster={thumbnailUrl} className="w-full h-full object-contain"
          onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoaded}
          onCanPlay={() => setLoading(false)} onEnded={onEnd} onError={onError} />

        {/* Loading */}
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
             <div className="font-mono text-xs font-bold tracking-widest uppercase animate-pulse">BUFFERING_STREAM...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
            <p className="font-mono text-xs font-bold text-red-600 uppercase">ERR: VIDEO_UNAVAILABLE</p>
          </div>
        )}

        {/* Click to play overlay */}
        {!error && (
          <div className="absolute inset-0 cursor-pointer" onClick={toggle}>
            {!playing && !loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent-blue border-2 border-border flex items-center justify-center text-text-primary shadow-brutalist transition-transform hover:scale-105">
                  <Play size={26} fill="currentColor" className="translate-x-1" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controls overlay */}
        {!error && (
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-border transition-transform duration-300 ${controls || !playing ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex flex-col gap-2">
              
              {/* Progress */}
              <input type="range" min={0} max={duration || 1} step={0.1} value={current}
                onChange={e => seek(Number(e.target.value))}
                className="w-full" style={{ '--progress': `${progress}%` } as React.CSSProperties} />

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <button onClick={toggle} className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform">
                    {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-px" />}
                  </button>
                  <button onClick={() => skip(-10)} className="hover:scale-110 transition-transform"><RotateCcw size={16} strokeWidth={2.5}/></button>
                  <button onClick={() => skip(10)} className="hover:scale-110 transition-transform"><RotateCw size={16} strokeWidth={2.5}/></button>
                  <button onClick={() => { setMuted(m => !m); videoRef.current!.muted = !muted; }} className="hover:scale-110 transition-transform ml-2">
                    {muted ? <VolumeX size={16} strokeWidth={2.5}/> : <Volume2 size={16} strokeWidth={2.5}/>}
                  </button>
                  <span className="font-mono text-[10px] font-bold tracking-widest hidden sm:block border-l-2 border-border pl-4 ml-2">
                    {formatDuration(Math.floor(current))} / {formatDuration(Math.floor(duration))}
                  </span>
                </div>
                <button onClick={fullscreen} className="hover:scale-110 transition-transform">
                  <Maximize2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
