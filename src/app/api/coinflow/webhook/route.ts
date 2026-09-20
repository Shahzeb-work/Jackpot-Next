import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidWebhookAuth } from "@/lib/coinflow";

const SETTLED_EVENTS = ["Settled", "Credits Minted"];
const DECLINED_EVENTS = ["Card Payment Declined", "Card Payment Suspected Fraud"];
const AUTHORIZED_EVENTS = ["Card Payment Authorized", "Payment Authorized"];

export async function POST(req: Request) {
  if (!isValidWebhookAuth(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const { eventType, data } = body as { eventType?: string; data?: Record<string, unknown> };
  const webhookInfo = data?.webhookInfo as Record<string, unknown> | undefined;
  const transactionCode = typeof webhookInfo?.transactionCode === "string" ? webhookInfo.transactionCode : undefined;
  const paymentId = typeof data?.id === "string" ? data.id : undefined;

  const tx = transactionCode
    ? await prisma.transaction.findUnique({ where: { code: transactionCode } })
    : paymentId
      ? await prisma.transaction.findUnique({ where: { paymentId } })
      : null;

  if (!tx) {
    console.error("Coinflow webhook: no matching transaction", { eventType, transactionCode, paymentId });
    return NextResponse.json({ success: true });
  }

  if (eventType && SETTLED_EVENTS.includes(eventType) && tx.status !== "confirmed") {
    const updated = await prisma.transaction.updateMany({
      where: { id: tx.id, status: { not: "confirmed" } },
      data: { status: "confirmed", paymentId: paymentId ?? tx.paymentId },
    });

    if (updated.count > 0) {
      await prisma.user.update({
        where: { id: tx.userId },
        data: {
          goldCoins: { increment: tx.goldCoins },
          sweepsCoins: { increment: tx.sweepsCoins },
        },
      });
    }
  } else if (eventType && DECLINED_EVENTS.includes(eventType)) {
    await prisma.transaction.update({
      where: { id: tx.id },
      data: {
        status: "rejected",
        reason: typeof data?.error === "string" ? data.error : "Payment declined",
      },
    });
  } else if (eventType === "Payment Pending Review") {
    await prisma.transaction.update({ where: { id: tx.id }, data: { status: "waiting" } });
  } else if (eventType && AUTHORIZED_EVENTS.includes(eventType) && !tx.paymentId && paymentId) {
    await prisma.transaction.update({ where: { id: tx.id }, data: { paymentId } });
  }

  return NextResponse.json({ success: true });
}
