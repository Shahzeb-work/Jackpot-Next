"use client";

import { useEffect, useState } from "react";

type LeaderboardEntry = {
  id: string;
  place: number;
  points: number;
  gcPrize: number;
  scPrize: number;
  user: { id: string; username: string | null };
};

type Props = {
  tournamentId: string;
  isActive: boolean;
  currentUserId?: string;
};

function formatPrize(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function avatarInitial(username: string | null) {
  return (username ?? "?").charAt(0).toUpperCase();
}

const MEDAL_STYLES = [
  "bg-gradient-to-b from-gold-bright to-gold text-cream",
  "bg-gradient-to-b from-[#c0c0c0] to-[#9a9a9a] text-cream",
  "bg-gradient-to-b from-[#cd7f32] to-[#a0522d] text-cream",
];

function PodiumCard({ entry, rank, isSelf }: { entry: LeaderboardEntry; rank: number; isSelf: boolean }) {
  const medalStyle = MEDAL_STYLES[rank - 1] ?? "bg-cream-surface-2 text-ink";
  const heights = ["h-28", "h-20", "h-16"];
  return (
    <div className={`flex flex-1 flex-col items-center gap-2 ${rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"}`}>
      <div className={`flex w-full flex-col items-center gap-1 rounded-2xl border ${isSelf ? "border-gold/60 shadow-[0_0_16px_-4px_rgba(244,199,102,0.5)]" : "border-line"} bg-cream-surface p-3`}>
        <div className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold ${medalStyle}`}>
          {avatarInitial(entry.user.username)}
        </div>
        <p className="w-full truncate text-center text-xs font-semibold text-ink">
          {entry.user.username ?? "Unknown"}
        </p>
        <p className="text-[10px] text-ink-soft">{entry.points.toLocaleString()} pts</p>
        {entry.gcPrize > 0 && (
          <span className="text-[10px] font-bold text-gold-bright">{formatPrize(entry.gcPrize)} GC</span>
        )}
        {entry.scPrize > 0 && (
          <span className="text-[10px] font-bold text-emerald-bright">{formatPrize(entry.scPrize)} SC</span>
        )}
      </div>
      <div className={`w-full rounded-b-xl ${heights[rank - 1] ?? "h-12"} rounded-t-sm ${rank === 1 ? "bg-gradient-to-b from-gold/40 to-gold/10" : rank === 2 ? "bg-gradient-to-b from-[#c0c0c0]/30 to-[#c0c0c0]/5" : "bg-gradient-to-b from-[#cd7f32]/30 to-[#cd7f32]/5"} flex items-center justify-center`}>
        <span className="font-display text-2xl tracking-wide text-ink-soft/60">{rank}</span>
      </div>
    </div>
  );
}

export default function TournamentLeaderboard({ tournamentId, isActive, currentUserId }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tournaments/${tournamentId}/leaderboard?limit=20`)
      .then((r) => r.json())
      .then((data) => setEntries(data.leaderboard ?? []))
      .finally(() => setLoading(false));
  }, [tournamentId]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="font-display text-2xl tracking-wide text-ink">Leaderboard</h2>
        {isActive && (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        )}
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-sm text-ink-soft">Loading…</span>
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-cream-surface">
          <p className="text-sm text-ink-soft">No rankings yet</p>
          <p className="text-xs text-ink-soft/60">Be the first to score!</p>
        </div>
      )}

      {!loading && entries.length > 0 && (
        <>
          {top3.length > 0 && (
            <div className="flex items-end gap-2">
              {top3.map((e) => (
                <PodiumCard
                  key={e.id}
                  entry={e}
                  rank={e.place}
                  isSelf={currentUserId === e.user.id}
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="flex max-h-[400px] flex-col gap-1 overflow-y-auto rounded-2xl border border-line bg-cream-surface scrollbar-none">
              {rest.map((entry) => {
                const isSelf = currentUserId === entry.user.id;
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-3 px-4 py-3 transition ${isSelf ? "bg-gold/10" : "hover:bg-cream-surface-2"}`}
                  >
                    <span className="w-6 shrink-0 text-center text-sm font-bold text-ink-soft">{entry.place}</span>
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-cream-surface-2 text-xs font-bold text-ink-soft">
                      {avatarInitial(entry.user.username)}
                    </div>
                    <span className="flex-1 truncate text-sm font-medium text-ink">
                      {entry.user.username ?? "Unknown"}
                      {isSelf && <span className="ml-1.5 text-[10px] text-gold-bright">(you)</span>}
                    </span>
                    <span className="text-xs text-ink-soft">{entry.points.toLocaleString()} pts</span>
                    <div className="flex flex-col items-end gap-0.5">
                      {entry.gcPrize > 0 && (
                        <span className="text-xs font-semibold text-gold-bright">{formatPrize(entry.gcPrize)} GC</span>
                      )}
                      {entry.scPrize > 0 && (
                        <span className="text-xs font-semibold text-emerald-bright">{formatPrize(entry.scPrize)} SC</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
