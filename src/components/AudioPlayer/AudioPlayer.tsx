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

  /* Animate disc rotation */
  useEffect(() => {
    let id: number;
    if (playing) {
      id = requestAnimationFrame(function loop() {
        setRot(r => (r + 0.4) % 360);
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

  const seek     = (v: number) => { audioRef.current!.currentTime = v; setCurrent(v); };
  const skip     = (s: number) => seek(Math.min(Math.max(current + s, 0), duration));
  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d0d] p-6"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)', fontFamily: "'Geist', sans-serif" }}
    >
      {/* Atmospheric glow behind disc */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,200,100,0.4) 0%, transparent 70%)' }}
      />

      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoaded}
        onCanPlay={() => setLoading(false)}
        onEnded={onEnd}
        onError={onError}
      />

      {/* Vinyl disc visual */}
      <div className="relative w-full aspect-square rounded-full mb-6 flex items-center justify-center">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-white/6"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04), #111)' }}
        />

        {/* Spinning disc */}
        <div
          className="w-[85%] h-[85%] rounded-full relative flex items-center justify-center"
          style={{
            transform: `rotate(${rot}deg)`,
            background: 'conic-gradient(from 0deg, #1a1a1a, #222, #1a1a1a, #1c1c1c, #1a1a1a)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Groove rings */}
          {[12, 22, 32, 42, 52].map(n => (
            <div
              key={n}
              className="absolute rounded-full border border-white/[0.035]"
              style={{ inset: `${n}%` }}
            />
          ))}

          {/* Center label */}
          <div
            className="w-[28%] h-[28%] rounded-full border border-white/10 flex items-center justify-center overflow-hidden"
            style={{ background: 'rgba(255,200,100,0.12)' }}
          >
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="label" className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale" />
            ) : null}
            <div className="h-3 w-3 rounded-full bg-white/20 border border-white/15 z-10" />
          </div>
        </div>

        {/* Tonearm */}
        <div
          className="absolute top-3 right-5 w-1.5 origin-top transition-transform duration-700 z-10"
          style={{
            height: '42%',
            transform: playing ? 'rotate(28deg)' : 'rotate(8deg)',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '2px',
          }}
        >
          <div
            className="absolute -top-3 -left-2 h-5 w-5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* Loading/error overlay */}
        {loading && !error && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 z-20">
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/30 animate-pulse">Loading…</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/70 z-20">
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-red-400/60">Stream failed</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {/* Title */}
        <p className="font-display text-sm font-bold tracking-tight text-white/70 text-center truncate">
          {title}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold text-white/30 w-8 text-right">
            {formatDuration(Math.floor(current))}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.1}
            value={current}
            onChange={e => seek(Number(e.target.value))}
            className="flex-1"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          />
          <span className="font-mono text-[9px] font-bold text-white/30 w-8">
            {formatDuration(Math.floor(duration))}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-1">
          {/* Volume */}
          <button
            onClick={() => { setMuted(m => !m); audioRef.current!.muted = !muted; }}
            className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 transition-all hover:bg-white/10 hover:text-white/70"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Play controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => skip(-10)}
              className="text-white/35 hover:text-white/70 transition-colors hover:scale-105"
            >
              <SkipBack size={18} strokeWidth={2} />
            </button>

            <button
              onClick={toggle}
              className="h-14 w-14 rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-white transition-all hover:bg-white/18 hover:scale-105"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
            >
              {playing
                ? <Pause size={18} fill="currentColor" />
                : <Play size={18} fill="currentColor" className="translate-x-0.5" />
              }
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white/35 hover:text-white/70 transition-colors hover:scale-105"
            >
              <SkipForward size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Spacer */}
          <div className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}
