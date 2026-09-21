"use client";

import Link from "next/link";
import TournamentCountdown from "./tournament-countdown";

type TournamentCardProps = {
  id: string;
  name: string;
  bannerUrl: string;
  startTime: string;
  endTime: string;
  tournamentType: string;
  coinMode: string;
  prizePoolGc: number;
  prizePoolSc: number;
  status: string;
  participantCount: number;
};

const STATUS_CONFIG: Record<string, { dot: string; label: string; ring: string }> = {
  active: { dot: "bg-emerald-400", label: "Live", ring: "border-emerald-400/30" },
  commingup: { dot: "bg-amber-400", label: "Upcoming", ring: "border-amber-400/30" },
  ended: { dot: "bg-ink-soft/50", label: "Ended", ring: "border-line" },
};

const TYPE_LABEL: Record<string, string> = {
  multiplier: "Multiplier",
  winning: "Top Wins",
  wagered: "Wagered",
  referral: "Referral",
  freespin: "Free Spin",
};

const COIN_LABEL: Record<string, string> = {
  gc: "Gold Coins",
  sc: "Sweeps Coins",
  gc_sc: "GC + SC",
};

function formatPrize(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export default function TournamentCard({
  id,
  name,
  bannerUrl,
  startTime,
  endTime,
  tournamentType,
  coinMode,
  prizePoolGc,
  prizePoolSc,
  status,
  participantCount,
}: TournamentCardProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.ended;

  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border ${cfg.ring} bg-cream-surface transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_8px_32px_-8px_rgba(217,164,56,0.2)]`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-cream-surface-2">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="chip-dots h-full w-full opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cream-surface/80 to-transparent" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
          <span className={`size-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-bright">
            {TYPE_LABEL[tournamentType] ?? tournamentType}
          </span>
          <span className="rounded-md border border-line bg-cream-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
            {COIN_LABEL[coinMode] ?? coinMode}
          </span>
        </div>

        <h3 className="font-display text-xl leading-tight tracking-wide text-ink line-clamp-2">{name}</h3>

        {(prizePoolGc > 0 || prizePoolSc > 0) && (
          <div className="flex items-center gap-3 rounded-xl border border-gold/15 bg-gradient-to-r from-gold/5 to-transparent p-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Prize Pool</span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                {prizePoolGc > 0 && (
                  <span className="font-display text-lg tracking-wide text-gold-bright">
                    {formatPrize(prizePoolGc)} GC
                  </span>
                )}
                {prizePoolSc > 0 && (
                  <span className="font-display text-lg tracking-wide text-emerald-bright">
                    {formatPrize(prizePoolSc)} SC
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-ink-soft">
          <span>{participantCount.toLocaleString()} players</span>
        </div>

        {status === "active" && (
          <div className="mt-auto pt-1">
            <TournamentCountdown target={endTime} label="Ends in" />
          </div>
        )}
        {status === "commingup" && (
          <div className="mt-auto pt-1">
            <TournamentCountdown target={startTime} label="Starts in" />
          </div>
        )}
        {status === "ended" && (
          <p className="mt-auto text-xs text-ink-soft">
            Ended {new Date(endTime).toLocaleDateString()}
          </p>
        )}

        <Link
          href={`/tournaments/${id}`}
          className="mt-2 block w-full rounded-full bg-gradient-to-b from-gold-bright to-gold py-2.5 text-center text-sm font-bold text-cream shadow transition hover:brightness-110"
        >
          {status === "ended" ? "View Results" : "View Tournament"}
        </Link>
      </div>
    </article>
  );
}
