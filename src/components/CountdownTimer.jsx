import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Play, AlertCircle } from 'lucide-react';

export default function CountdownTimer({ targetDate, raceName, hippodrome, onTimerExpire }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.expired && onTimerExpire) {
        onTimerExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="glass-panel rounded-2xl p-6 border border-gold/30 shadow-gold-glow relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Race Header Info */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center text-racing-dark font-black shadow-lg">
            <Timer className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px] uppercase border border-emerald-500/30">
                Départ Imminent
              </span>
              <span className="text-xs text-slate-400 font-medium">| {hippodrome}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white font-display gold-gradient-text mt-0.5">
              {raceName}
            </h3>
          </div>
        </div>

        {/* Dynamic Countdown Display */}
        {timeLeft.expired ? (
          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-400 font-bold text-sm">
            <Play className="w-4 h-4 animate-ping" />
            <span>Course en cours ou arrivée imminente !</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-racing-dark border border-gold/40 flex items-center justify-center font-mono font-black text-2xl text-gold shadow-inner">
                {pad(timeLeft.hours)}
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Heures</span>
            </div>

            <span className="text-2xl font-black text-gold pb-4 animate-pulse">:</span>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-racing-dark border border-gold/40 flex items-center justify-center font-mono font-black text-2xl text-gold shadow-inner">
                {pad(timeLeft.minutes)}
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Minutes</span>
            </div>

            <span className="text-2xl font-black text-gold pb-4 animate-pulse">:</span>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-racing-dark border border-gold/40 flex items-center justify-center font-mono font-black text-2xl text-gold shadow-inner">
                {pad(timeLeft.seconds)}
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Secondes</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
