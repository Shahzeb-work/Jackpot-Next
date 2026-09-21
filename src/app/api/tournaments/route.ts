import { NextResponse } from "next/server";
import { tournament } from "@/lib/prisma-tournament";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "active";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 12)));
  const skip = (page - 1) * limit;

  const validStatuses = ["active", "commingup", "ended"];
  const safeStatus = validStatuses.includes(status) ? status : "active";

  const where = { status: safeStatus, isDeleted: false };
  const orderBy =
    safeStatus === "ended"
      ? { endTime: "desc" }
      : safeStatus === "commingup"
        ? { startTime: "asc" }
        : { endTime: "asc" };

  const [total, tournaments] = await Promise.all([
    tournament.count({ where }),
    tournament.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        bannerUrl: true,
        startTime: true,
        endTime: true,
        tournamentType: true,
        coinMode: true,
        prizePoolGc: true,
        prizePoolSc: true,
        status: true,
        winners: true,
        _count: { select: { participants: true } },
      },
    }),
  ]);

  return NextResponse.json({
    tournaments,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
}
