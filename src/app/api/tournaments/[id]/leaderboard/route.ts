import { NextResponse } from "next/server";
import { tournament, tournamentLeaderboard } from "@/lib/prisma-tournament";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));

  const t = await tournament.findFirst({
    where: { id, isDeleted: false },
    select: { id: true, winners: true },
  });

  if (!t) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  const entries = await tournamentLeaderboard.findMany({
    where: { tournamentId: id, place: { gte: 1, lte: t.winners } },
    orderBy: { place: "asc" },
    take: limit,
    select: {
      id: true,
      place: true,
      prevPlace: true,
      points: true,
      gcPrize: true,
      scPrize: true,
      availableToClaim: true,
      isClaimed: true,
      user: { select: { id: true, username: true } },
    },
  });

  return NextResponse.json({ leaderboard: entries });
}
