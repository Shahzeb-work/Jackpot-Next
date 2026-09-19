"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";
import { SPIN_COOLDOWN_MS, SPIN_PRIZES, type SpinPrize } from "@/lib/spin-config";

function pickPrizeIndex(): number {
  const totalWeight = SPIN_PRIZES.reduce((sum, p) => sum + p.weight, 0);
  let roll = Math.random() * totalWeight;
  for (let i = 0; i < SPIN_PRIZES.length; i++) {
    roll -= SPIN_PRIZES[i].weight;
    if (roll <= 0) return i;
  }
  return SPIN_PRIZES.length - 1;
}

export type SpinResult =
  | {
      ok: true;
      prizeIndex: number;
      prize: SpinPrize;
      goldCoins: number;
      sweepsCoins: number;
      lastSpinAt: string;
    }
  | { ok: false; error: string; nextAvailableAt?: string };

export async function spinWheelAction(): Promise<SpinResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false, error: "You need to sign in to spin the wheel." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastSpinAt: true },
  });
  if (!user) {
    return { ok: false, error: "You need to sign in to spin the wheel." };
  }

  const now = Date.now();
  if (user.lastSpinAt) {
    const nextAvailableAt = user.lastSpinAt.getTime() + SPIN_COOLDOWN_MS;
    if (now < nextAvailableAt) {
      return {
        ok: false,
        error: "Come back later for your next free spin.",
        nextAvailableAt: new Date(nextAvailableAt).toISOString(),
      };
    }
  }

  const prizeIndex = pickPrizeIndex();
  const prize = SPIN_PRIZES[prizeIndex];

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      goldCoins: { increment: prize.goldCoins },
      sweepsCoins: { increment: prize.sweepsCoins },
      lastSpinAt: new Date(now),
    },
    select: { goldCoins: true, sweepsCoins: true, lastSpinAt: true },
  });

  return {
    ok: true,
    prizeIndex,
    prize,
    goldCoins: updated.goldCoins,
    sweepsCoins: updated.sweepsCoins,
    lastSpinAt: updated.lastSpinAt!.toISOString(),
  };
}
