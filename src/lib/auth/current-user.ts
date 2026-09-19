import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";

export type SafeUser = {
  id: string;
  email: string;
  username: string | null;
};

export function toSafeUser(user: { id: string; email: string; username: string | null }): SafeUser {
  return { id: user.id, email: user.email, username: user.username };
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true },
  });

  return user;
}
