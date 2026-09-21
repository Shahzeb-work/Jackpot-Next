"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppState } from "@/components/providers/app-state";
import TournamentCountdown from "./tournament-countdown";

type MyRank = {
  place: number;
  points: number;
  gcPrize: number;
  scPrize: number;
  availableToClaim: boolean;
  isClaimed: boolean;
} | null;

type Props = {
  tournamentId: string;
  status: string;
  endTime: string;
  startTime: string;
  coinMode: string;
};

function formatPrize(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function rankSuffix(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;
  if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;
  if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;
  return `${n}th`;
}

export default function TournamentDetailPanel({ tournamentId, status, endTime, startTime, coinMode }: Props) {
  const { user, openSignIn, setUser } = useAppState();
  const [myRank, setMyRank] = useState<MyRank>(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [joining, setJoining] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadRank = useCallback(async () => {
    if (!user) return;
    const res = await fetch(`/api/tournaments/${tournamentId}/my-rank`);
    if (!res.ok) return;
    const data = await res.json();
    setMyRank(data.rank ?? null);
    setIsParticipant(data.isParticipant ?? false);
  }, [user, tournamentId]);

  useEffect(() => { loadRank(); }, [loadRank]);

  async function handleJoin() {
    if (!user) { openSignIn(); return; }
    setJoining(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/join`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setIsParticipant(true);
        await loadRank();
      } else {
        setFeedback(data.error ?? "Failed to join");
      }
    } finally {
      setJoining(false);
    }
  }

  async function handleClaim() {
    if (!user) return;
    setClaiming(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/claim`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Claimed! +${formatPrize(data.gcPrize)} GC${data.scPrize > 0 ? ` +${formatPrize(data.scPrize)} SC` : ""}`);
        setUser({ ...user, goldCoins: data.goldCoins, sweepsCoins: data.sweepsCoins });
        await loadRank();
      } else {
        setFeedback(data.error ?? "Failed to claim");
      }
    } finally {
      setClaiming(false);
    }
  }

  const isActive = status === "active";
  const isUpcoming = status === "commingup";
  const isEnded = status === "ended";

  return (
    <div className="flex flex-col gap-6">
      {(isActive || isUpcoming) && (
        <div className="rounded-2xl border border-line bg-cream-surface p-5">
          {isActive
            ? <TournamentCountdown target={endTime} label="Ends in" />
            : <TournamentCountdown target={startTime} label="Starts in" />}
        </div>
      )}

      {user && myRank && (
        <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/5 to-transparent p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-soft">My Stats</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-cream p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-soft">Rank</p>
              <p className="font-display text-2xl tracking-wide text-gold-bright">
                {myRank.place > 0 ? rankSuffix(myRank.place) : "--"}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-cream p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-soft">Points</p>
              <p className="font-display text-2xl tracking-wide text-ink">
                {myRank.points.toLocaleString()}
              </p>
            </div>
            {(myRank.gcPrize > 0 || myRank.scPrize > 0) && (
              <div className="col-span-2 rounded-xl border border-gold/20 bg-gold/5 p-3">
                <p className="text-[10px] uppercase tracking-wider text-ink-soft">Potential Prize</p>
                <div className="mt-1 flex gap-3">
                  {myRank.gcPrize > 0 && (
                    <span className="font-display text-xl tracking-wide text-gold-bright">{formatPrize(myRank.gcPrize)} GC</span>
                  )}
                  {myRank.scPrize > 0 && (
                    <span className="font-display text-xl tracking-wide text-emerald-bright">{formatPrize(myRank.scPrize)} SC</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {myRank.availableToClaim && !myRank.isClaimed && (
            <button
              type="button"
              onClick={handleClaim}
              disabled={claiming}
              className="mt-4 w-full rounded-full bg-gradient-to-b from-gold-bright to-gold py-2.5 text-sm font-bold text-cream shadow transition hover:brightness-110 disabled:opacity-60"
            >
              {claiming ? "Claiming…" : "Claim Prize"}
            </button>
          )}
          {myRank.isClaimed && (
            <p className="mt-3 text-center text-xs text-emerald-bright">Prize claimed!</p>
          )}
        </div>
      )}

      {isActive && !isParticipant && (
        <button
          type="button"
          onClick={handleJoin}
          disabled={joining}
          className="w-full rounded-full bg-gradient-to-b from-gold-bright to-gold py-3 text-sm font-bold text-cream shadow-md transition hover:brightness-110 disabled:opacity-60"
        >
          {joining ? "Joining…" : user ? "Join Tournament" : "Sign In to Join"}
        </button>
      )}

      {isActive && isParticipant && !myRank?.availableToClaim && (
        <div className="rounded-2xl border border-emerald/30 bg-emerald/5 px-4 py-3 text-center text-sm font-medium text-ink">
          You&apos;re in! Play the tournament games to earn points.
        </div>
      )}

      {isUpcoming && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-center text-sm text-ink-soft">
          Tournament starts soon — check back to join.
        </div>
      )}

      {isEnded && !myRank?.availableToClaim && (
        <div className="rounded-2xl border border-line bg-cream-surface px-4 py-3 text-center text-sm text-ink-soft">
          This tournament has ended.
        </div>
      )}

      {feedback && (
        <p className={`rounded-xl px-3 py-2 text-center text-sm font-medium ${feedback.startsWith("Claimed") ? "text-gold-bright" : "text-red-400"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
