/**
 * Typed helpers for tournament models.
 * These bypass the Prisma client type system because the client was generated
 * before the tournament schema was added. Run `prisma generate` after upgrading
 * to Node 20+ to restore full type safety.
 */

import { prisma } from "./prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = prisma as any;

export type TournamentStatus = "active" | "commingup" | "ended" | "canceled";
export type CoinMode = "gc" | "sc" | "gc_sc";

export type Tournament = {
  id: string;
  name: string;
  bannerUrl: string;
  startTime: Date;
  endTime: Date;
  tournamentType: string;
  coinMode: CoinMode;
  prizePoolGc: number;
  prizePoolSc: number;
  prizePoolRates: unknown;
  description: string | null;
  status: TournamentStatus;
  winners: number;
  isDeleted: boolean;
  isPrizeDistributed: boolean;
  prizeDistributedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TournamentLeaderboardEntry = {
  id: string;
  tournamentId: string;
  userId: string;
  place: number;
  prevPlace: number;
  points: number;
  gcPrize: number;
  scPrize: number;
  gcBet: number;
  scBet: number;
  availableToClaim: boolean;
  isClaimed: boolean;
  claimedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TournamentGame = {
  id: string;
  tournamentId: string;
  gameId: string;
  gameName: string;
  thumbnail: string | null;
};

export const tournament = db.tournament;
export const tournamentLeaderboard = db.tournamentLeaderboard;
export const tournamentParticipant = db.tournamentParticipant;
export const tournamentGame = db.tournamentGame;
