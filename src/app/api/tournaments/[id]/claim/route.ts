import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tournamentLeaderboard } from "@/lib/prisma-tournament";
import { getSessionUserId } from "@/lib/auth/session";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const prize = await tournamentLeaderboard.findUnique({
    where: { tournamentId_userId: { tournamentId: id, userId } },
    select: { id: true, gcPrize: true, scPrize: true, availableToClaim: true, isClaimed: true, place: true },
  });

  if (!prize || !prize.availableToClaim || prize.isClaimed) {
    return NextResponse.json({ error: "No claimable prize found" }, { status: 400 });
  }

  if (prize.gcPrize <= 0 && prize.scPrize <= 0) {
    return NextResponse.json({ error: "No prize amount to claim" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [updatedUser] = await (prisma as any).$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        goldCoins: { increment: Math.round(prize.gcPrize) },
        sweepsCoins: { increment: Math.round(prize.scPrize) },
      },
      select: { goldCoins: true, sweepsCoins: true },
    }),
    tournamentLeaderboard.update({
      where: { id: prize.id },
      data: { isClaimed: true, availableToClaim: false, claimedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    success: true,
    gcPrize: prize.gcPrize,
    scPrize: prize.scPrize,
    place: prize.place,
    goldCoins: updatedUser.goldCoins,
    sweepsCoins: updatedUser.sweepsCoins,
  });
}
