"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";
import { getPackageById } from "@/lib/packages";
import { createCheckoutLink, generateTransactionCode, type CoinflowPaymentMethod } from "@/lib/coinflow";

async function getClientIp() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headerList.get("x-real-ip") || "127.0.0.1";
}

export type CoinflowCheckoutResult =
  | { ok: true; link: string; code: string }
  | { ok: false; error: string };

export async function createCoinflowCheckoutAction(input: {
  packageId: string;
  paymentMethod: CoinflowPaymentMethod;
}): Promise<CoinflowCheckoutResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false, error: "You need to sign in to make a purchase." };
  }

  const pkg = getPackageById(input.packageId);
  if (!pkg) {
    return { ok: false, error: "That package is no longer available." };
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) {
    return { ok: false, error: "You need to sign in to make a purchase." };
  }

  const code = generateTransactionCode();

  try {
    const { link } = await createCheckoutLink({
      email: user.email,
      userId,
      amountCents: pkg.priceCents,
      transactionCode: code,
      paymentMethod: input.paymentMethod,
      endUserDeviceIpAddress: await getClientIp(),
    });

    await prisma.transaction.create({
      data: {
        userId,
        code,
        amountCents: pkg.priceCents,
        goldCoins: pkg.goldCoins,
        sweepsCoins: pkg.sweepsCoins,
        paymentMethod: input.paymentMethod,
        status: "waiting",
      },
    });

    return { ok: true, link, code };
  } catch (err) {
    console.error("createCoinflowCheckoutAction failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Coinflow initialization failed. Try again.",
    };
  }
}

export type CoinflowStatusResult =
  | { ok: true; status: "waiting" | "success" | "failed"; goldCoins: number; sweepsCoins: number; reason?: string }
  | { ok: false; error: string };

export async function getCoinflowTransactionStatusAction(code: string): Promise<CoinflowStatusResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false, error: "You need to sign in to check this transaction." };
  }

  const tx = await prisma.transaction.findUnique({ where: { code } });
  if (!tx || tx.userId !== userId) {
    return { ok: false, error: "Transaction not found." };
  }

  const status = tx.status === "confirmed" ? "success" : tx.status === "rejected" ? "failed" : "waiting";

  return {
    ok: true,
    status,
    goldCoins: tx.goldCoins,
    sweepsCoins: tx.sweepsCoins,
    reason: tx.reason ?? undefined,
  };
}

export type UserTransaction = {
  id: string;
  code: string;
  createdAt: string;
  amountCents: number;
  goldCoins: number;
  sweepsCoins: number;
  paymentMethod: string;
  status: "waiting" | "confirmed" | "rejected";
};

export type UserTransactionsResult =
  | { ok: true; transactions: UserTransaction[] }
  | { ok: false; error: string };

export async function getUserTransactionsAction(): Promise<UserTransactionsResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return { ok: false, error: "You need to sign in to view transaction history." };
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    ok: true,
    transactions: transactions.map((tx) => ({
      id: tx.id,
      code: tx.code,
      createdAt: tx.createdAt.toISOString(),
      amountCents: tx.amountCents,
      goldCoins: tx.goldCoins,
      sweepsCoins: tx.sweepsCoins,
      paymentMethod: tx.paymentMethod,
      status: tx.status as UserTransaction["status"],
    })),
  };
}
