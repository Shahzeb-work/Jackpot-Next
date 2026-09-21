-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "tournamentType" TEXT NOT NULL,
    "coinMode" TEXT NOT NULL,
    "prizePoolGc" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "prizePoolSc" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "prizePoolRates" JSONB,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'commingup',
    "winners" INTEGER NOT NULL DEFAULT 20,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isPrizeDistributed" BOOLEAN NOT NULL DEFAULT false,
    "prizeDistributedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentGame" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "TournamentGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentParticipant" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TournamentParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentLeaderboard" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "place" INTEGER NOT NULL DEFAULT 0,
    "prevPlace" INTEGER NOT NULL DEFAULT 0,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gcPrize" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "scPrize" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gcBet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "scBet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availableToClaim" BOOLEAN NOT NULL DEFAULT false,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentLeaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tournament_status_isDeleted_startTime_idx" ON "Tournament"("status", "isDeleted", "startTime");
CREATE INDEX "Tournament_status_isDeleted_idx" ON "Tournament"("status", "isDeleted");
CREATE INDEX "TournamentGame_tournamentId_idx" ON "TournamentGame"("tournamentId");
CREATE UNIQUE INDEX "TournamentParticipant_tournamentId_userId_key" ON "TournamentParticipant"("tournamentId", "userId");
CREATE INDEX "TournamentParticipant_tournamentId_idx" ON "TournamentParticipant"("tournamentId");
CREATE INDEX "TournamentParticipant_userId_idx" ON "TournamentParticipant"("userId");
CREATE UNIQUE INDEX "TournamentLeaderboard_tournamentId_userId_key" ON "TournamentLeaderboard"("tournamentId", "userId");
CREATE INDEX "TournamentLeaderboard_tournamentId_place_idx" ON "TournamentLeaderboard"("tournamentId", "place");
CREATE INDEX "TournamentLeaderboard_userId_availableToClaim_isClaimed_idx" ON "TournamentLeaderboard"("userId", "availableToClaim", "isClaimed");

-- AddForeignKey
ALTER TABLE "TournamentGame" ADD CONSTRAINT "TournamentGame_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TournamentLeaderboard" ADD CONSTRAINT "TournamentLeaderboard_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TournamentLeaderboard" ADD CONSTRAINT "TournamentLeaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
