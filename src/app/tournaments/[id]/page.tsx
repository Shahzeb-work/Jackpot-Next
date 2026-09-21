import { notFound } from "next/navigation";
import Link from "next/link";
import { tournament } from "@/lib/prisma-tournament";
import { getCurrentUser } from "@/lib/auth/current-user";
import TournamentLeaderboard from "@/components/tournaments/tournament-leaderboard";
import TournamentDetailPanel from "@/components/tournaments/tournament-detail";
import { TrophyIcon } from "@/components/icons";

type Params = Promise<{ id: string }>;

const TYPE_LABEL: Record<string, string> = {
  multiplier: "Multiplier",
  winning: "Top Wins",
  wagered: "Wagered",
  referral: "Referral",
  freespin: "Free Spin",
};

const COIN_LABEL: Record<string, string> = {
  gc: "Gold Coins",
  sc: "Sweeps Coins",
  gc_sc: "GC + SC",
};

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  active: { label: "Live", classes: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400" },
  commingup: { label: "Upcoming", classes: "border-amber-400/40 bg-amber-400/10 text-amber-400" },
  ended: { label: "Ended", classes: "border-line bg-cream-surface-2 text-ink-soft" },
};

function formatPrize(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

type TournamentGame = {
  id: string;
  gameId: string;
  gameName: string;
  thumbnail: string | null;
};

export default async function TournamentDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const [data, user] = await Promise.all([
    tournament.findFirst({
      where: { id, isDeleted: false },
      include: {
        games: { select: { id: true, gameId: true, gameName: true, thumbnail: true } },
        _count: { select: { participants: true } },
      },
    }),
    getCurrentUser(),
  ]);

  if (!data) notFound();

  const statusCfg = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.ended;
  const hasPrizeGc = data.prizePoolGc > 0;
  const hasPrizeSc = data.prizePoolSc > 0;

  const startIso = data.startTime instanceof Date ? data.startTime.toISOString() : String(data.startTime);
  const endIso = data.endTime instanceof Date ? data.endTime.toISOString() : String(data.endTime);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <Link
        href="/tournaments"
        className="flex w-fit items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
      >
        ← Back to Tournaments
      </Link>

      <div className="relative aspect-[3/1] w-full overflow-hidden rounded-3xl border border-gold/20 bg-cream-surface-2">
        {data.bannerUrl ? (
          <img
            src={data.bannerUrl}
            alt={data.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="chip-dots h-full w-full opacity-10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-cream/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusCfg.classes}`}>
                {statusCfg.label}
              </span>
              <span className="rounded-full border border-gold/20 bg-black/40 px-3 py-1 text-xs font-semibold text-gold-bright backdrop-blur-sm">
                {TYPE_LABEL[data.tournamentType] ?? data.tournamentType}
              </span>
              <span className="rounded-full border border-line bg-black/40 px-3 py-1 text-xs font-semibold text-ink-soft backdrop-blur-sm">
                {COIN_LABEL[data.coinMode] ?? data.coinMode}
              </span>
            </div>
            <h1 className="font-display text-3xl leading-tight tracking-wide text-ink drop-shadow-lg sm:text-5xl">
              {data.name}
            </h1>
          </div>
          {(hasPrizeGc || hasPrizeSc) && (
            <div className="rounded-2xl border border-gold/30 bg-black/50 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Prize Pool</p>
              <div className="mt-1 flex items-center gap-3">
                {hasPrizeGc && (
                  <span className="font-display text-2xl tracking-wide text-gold-bright">
                    {formatPrize(data.prizePoolGc)} GC
                  </span>
                )}
                {hasPrizeSc && (
                  <span className="font-display text-2xl tracking-wide text-emerald-bright">
                    {formatPrize(data.prizePoolSc)} SC
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4 text-sm text-ink-soft">
            <span>
              <span className="font-semibold text-ink">{(data._count.participants as number).toLocaleString()}</span> players
            </span>
            <span>·</span>
            <span>
              Top <span className="font-semibold text-ink">{data.winners}</span> win prizes
            </span>
            <span>·</span>
            <span>
              {new Date(startIso).toLocaleDateString()} – {new Date(endIso).toLocaleDateString()}
            </span>
          </div>

          {data.description && (
            <div className="rounded-2xl border border-line bg-cream-surface p-5">
              <h2 className="mb-2 font-display text-xl tracking-wide text-ink">Tournament Rules</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{data.description}</p>
            </div>
          )}

          {(data.games as TournamentGame[]).length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-xl tracking-wide text-ink">Featured Games</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {(data.games as TournamentGame[]).map((game) => (
                  <div
                    key={game.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-line bg-cream-surface transition hover:border-gold/30"
                  >
                    {game.thumbnail ? (
                      <img
                        src={game.thumbnail}
                        alt={game.gameName}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-square w-full bg-cream-surface-2 grid place-items-center">
                        <TrophyIcon className="size-8 text-ink-soft/30" />
                      </div>
                    )}
                    <p className="truncate px-2 py-1.5 text-[11px] font-medium text-ink-soft">{game.gameName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <TournamentLeaderboard
            tournamentId={data.id}
            isActive={data.status === "active"}
            currentUserId={user?.id}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <TournamentDetailPanel
            tournamentId={data.id}
            status={data.status}
            endTime={endIso}
            startTime={startIso}
            coinMode={data.coinMode}
          />
        </div>
      </div>
    </div>
  );
}
