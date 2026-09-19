import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";

export type SafeUser = {
  id: string;
  email: string;
  username: string | null;
  goldCoins: number;
  sweepsCoins: number;
  lastSpinAt: string | null;
};

type UserRecord = {
  id: string;
  email: string;
  username: string | null;
  goldCoins: number;
  sweepsCoins: number;
  lastSpinAt: Date | null;
};

export function toSafeUser(user: UserRecord): SafeUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    goldCoins: user.goldCoins,
    sweepsCoins: user.sweepsCoins,
    lastSpinAt: user.lastSpinAt ? user.lastSpinAt.toISOString() : null,
  };
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      goldCoins: true,
      sweepsCoins: true,
      lastSpinAt: true,
    },
  });

  return user ? toSafeUser(user) : null;
}
