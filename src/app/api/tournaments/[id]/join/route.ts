import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tournament, tournamentParticipant, tournamentLeaderboard } from "@/lib/prisma-tournament";
import { getSessionUserId } from "@/lib/auth/session";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const t = await tournament.findFirst({
    where: { id, isDeleted: false, status: "active" },
    select: { id: true },
  });

  if (!t) {
    return NextResponse.json({ error: "Tournament not found or not active" }, { status: 404 });
  }

  const existing = await tournamentParticipant.findUnique({
    where: { tournamentId_userId: { tournamentId: id, userId } },
  });

  if (existing) {
    return NextResponse.json({ joined: true, alreadyJoined: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).$transaction([
    tournamentParticipant.create({ data: { tournamentId: id, userId } }),
    tournamentLeaderboard.upsert({
      where: { tournamentId_userId: { tournamentId: id, userId } },
      create: { tournamentId: id, userId, place: 0, points: 0, gcPrize: 0, scPrize: 0 },
      update: {},
    }),
  ]);

  return NextResponse.json({ joined: true });
}
