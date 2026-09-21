import { NextResponse } from "next/server";
import { tournamentLeaderboard, tournamentParticipant } from "@/lib/prisma-tournament";
import { getSessionUserId } from "@/lib/auth/session";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [entry, participant] = await Promise.all([
    tournamentLeaderboard.findUnique({
      where: { tournamentId_userId: { tournamentId: id, userId } },
      select: {
        place: true,
        prevPlace: true,
        points: true,
        gcPrize: true,
        scPrize: true,
        availableToClaim: true,
        isClaimed: true,
        claimedAt: true,
      },
    }),
    tournamentParticipant.findUnique({
      where: { tournamentId_userId: { tournamentId: id, userId } },
      select: { id: true },
    }),
  ]);

  return NextResponse.json({ rank: entry ?? null, isParticipant: !!participant });
}
