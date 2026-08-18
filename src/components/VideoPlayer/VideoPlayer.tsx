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

  const seek     = (v: number) => { videoRef.current!.currentTime = v; setCurrent(v); };
  const skip     = (s: number) => seek(Math.min(Math.max(current + s, 0), duration));
  const fullscreen = () => wrapRef.current?.requestFullscreen?.();
  const progress   = duration ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/8 bg-black group"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      onMouseEnter={() => setControls(true)}
      onMouseLeave={() => setControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        poster={thumbnailUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        onCanPlay={() => setLoading(false)}
        onEnded={onEnd}
        onError={onError}
      />

      {/* Loading */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-20">
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/40 animate-pulse">
            Loading...
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <p className="font-mono text-[10px] font-bold text-red-400/70 uppercase tracking-widest">
            Video unavailable
          </p>
        </div>
      )}

      {/* Click overlay to play/pause */}
      {!error && (
        <div className="absolute inset-0 cursor-pointer z-10" onClick={toggle}>
          {!playing && !loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-16 w-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
              >
                <Play size={22} fill="currentColor" className="translate-x-0.5" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls overlay */}
      {!error && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm transition-all duration-300 z-20 ${
            controls || !playing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {/* Progress */}
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={current}
            onChange={e => seek(Number(e.target.value))}
            className="w-full mb-3"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={toggle} className="text-white/70 hover:text-white transition-colors">
                {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="translate-x-px" />}
              </button>
              <button onClick={() => skip(-10)} className="text-white/50 hover:text-white transition-colors"><RotateCcw size={13} /></button>
              <button onClick={() => skip(10)} className="text-white/50 hover:text-white transition-colors"><RotateCw size={13} /></button>
              <button
                onClick={() => { setMuted(m => !m); videoRef.current!.muted = !muted; }}
                className="text-white/50 hover:text-white transition-colors"
              >
                {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
              <span className="font-mono text-[9px] font-bold tracking-widest text-white/35 hidden sm:block pl-2 border-l border-white/10 ml-1">
                {formatDuration(Math.floor(current))} / {formatDuration(Math.floor(duration))}
              </span>
            </div>
            <button onClick={fullscreen} className="text-white/40 hover:text-white transition-colors">
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
