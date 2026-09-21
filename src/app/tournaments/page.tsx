import Link from "next/link";
import { tournament } from "@/lib/prisma-tournament";
import TournamentCard from "@/components/tournaments/tournament-card";
import { TrophyIcon } from "@/components/icons";

type SearchParams = Promise<{ status?: string; page?: string }>;

async function getTournaments(status: string, page: number) {
  const limit = 12;
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

  return { tournaments, totalPages: Math.ceil(total / limit), total };
}

const TABS = [
  { key: "active", label: "Active" },
  { key: "commingup", label: "Upcoming" },
  { key: "ended", label: "Ended" },
];

type TournamentRow = {
  id: string;
  name: string;
  bannerUrl: string;
  startTime: Date;
  endTime: Date;
  tournamentType: string;
  coinMode: string;
  prizePoolGc: number;
  prizePoolSc: number;
  status: string;
  winners: number;
  _count: { participants: number };
};

export default async function TournamentsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const status = sp.status ?? "active";
  const page = Math.max(1, Number(sp.page ?? 1));
  const { tournaments, totalPages } = await getTournaments(status, page);

  return (
    <div className="flex flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-b from-gold-bright to-gold text-cream">
            <TrophyIcon className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-4xl tracking-wide text-ink sm:text-5xl">Tournaments</h1>
            <p className="text-sm text-ink-soft">Compete, rank up, and claim prizes</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={`/tournaments?status=${tab.key}`}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
              status === tab.key
                ? "bg-gradient-to-b from-gold-bright to-gold text-cream shadow"
                : "border border-line bg-cream-surface text-ink-soft hover:border-gold/40 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {(tournaments as TournamentRow[]).length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-cream-surface py-20 text-center">
          <TrophyIcon className="size-12 text-ink-soft/30" />
          <p className="font-display text-2xl tracking-wide text-ink-soft">No tournaments found</p>
          <p className="text-sm text-ink-soft/60">
            {status === "active" ? "No active tournaments right now — check back soon." : "Nothing here yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {(tournaments as TournamentRow[]).map((t) => (
            <TournamentCard
              key={t.id}
              id={t.id}
              name={t.name}
              bannerUrl={t.bannerUrl}
              startTime={t.startTime instanceof Date ? t.startTime.toISOString() : String(t.startTime)}
              endTime={t.endTime instanceof Date ? t.endTime.toISOString() : String(t.endTime)}
              tournamentType={t.tournamentType}
              coinMode={t.coinMode}
              prizePoolGc={t.prizePoolGc}
              prizePoolSc={t.prizePoolSc}
              status={t.status}
              participantCount={t._count.participants}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/tournaments?status=${status}&page=${page - 1}`}
              className="rounded-full border border-line bg-cream-surface px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-gold/40 hover:text-ink"
            >
              ← Prev
            </Link>
          )}
          <span className="text-sm text-ink-soft">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/tournaments?status=${status}&page=${page + 1}`}
              className="rounded-full border border-line bg-cream-surface px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-gold/40 hover:text-ink"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
