import { NextResponse } from "next/server";
import { tournament } from "@/lib/prisma-tournament";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await tournament.findFirst({
    where: { id, isDeleted: false },
    include: {
      games: { select: { id: true, gameId: true, gameName: true, thumbnail: true } },
      _count: { select: { participants: true } },
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  return NextResponse.json({ tournament: data });
}
