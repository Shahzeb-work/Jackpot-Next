"use client";

import { useEffect, useState } from "react";

type TimeLeft = { d: number; h: number; m: number; s: number };

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    d: Math.floor(totalSec / 86400),
    h: Math.floor((totalSec % 86400) / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

function Block({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="min-w-[52px] rounded-xl border border-gold/30 bg-cream px-3 py-2 text-center shadow-[inset_0_1px_0_rgba(244,199,102,0.1)]">
        <span className="font-display text-3xl leading-none tracking-wide text-gold-bright">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">{label}</span>
    </div>
  );
}

function Sep() {
  return <span className="mb-4 font-display text-2xl text-gold/60">:</span>;
}

export default function TournamentCountdown({ target, label = "Ends in" }: { target: string; label?: string }) {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const expired = time.d === 0 && time.h === 0 && time.m === 0 && time.s === 0;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{label}</p>
      {expired ? (
        <p className="font-display text-xl tracking-wide text-ink-soft">Ended</p>
      ) : (
        <div className="flex items-end gap-2">
          <Block value={time.d} label="Days" />
          <Sep />
          <Block value={time.h} label="Hrs" />
          <Sep />
          <Block value={time.m} label="Min" />
          <Sep />
          <Block value={time.s} label="Sec" />
        </div>
      )}
    </div>
  );
}
