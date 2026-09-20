import crypto from "node:crypto";

const COINFLOW_BASE_URL = process.env.COINFLOW_BASE_URL || "https://api-sandbox.coinflow.cash/api";
const COINFLOW_API_SECRET = process.env.COINFLOW_API_SECRET;
const FRONTEND_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export type CoinflowPaymentMethod = "applePay" | "googlePay" | "card";

export function generateTransactionCode() {
  return crypto.randomBytes(6).toString("hex");
}

export async function createCheckoutLink(params: {
  email: string;
  userId: string;
  amountCents: number;
  transactionCode: string;
  paymentMethod: CoinflowPaymentMethod;
  endUserDeviceIpAddress: string;
}) {
  if (!COINFLOW_API_SECRET) {
    throw new Error("COINFLOW_API_SECRET is not configured");
  }

  const payload = {
    email: params.email,
    subtotal: {
      currency: "USD",
      cents: params.amountCents,
    },
    authOnly: false,
    standaloneLinkConfig: {
      callbackUrl: `${FRONTEND_URL}/`,
      endUserDeviceIpAddress: params.endUserDeviceIpAddress,
    },
    settlementType: "USDC",
    allowedPaymentMethods: [params.paymentMethod],
    metadata: {
      userId: params.userId,
      transactionCode: params.transactionCode,
    },
    payment: { capture: true },
    webhookInfo: {
      transactionCode: params.transactionCode,
      userId: params.userId,
    },
  };

  const res = await fetch(`${COINFLOW_BASE_URL}/checkout/link`, {
    method: "POST",
    headers: {
      Authorization: COINFLOW_API_SECRET,
      "Content-Type": "application/json",
      accept: "application/json",
      "x-coinflow-auth-user-id": params.userId,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.link) {
    console.error("Coinflow checkout/link error:", res.status, JSON.stringify(data));
    throw new Error(data?.message || "Failed to initialize Coinflow payment");
  }

  return { link: data.link as string };
}

export function isValidWebhookAuth(authHeader: string | null) {
  const expected = process.env.COINFLOW_WEBHOOK_KEY;
  return Boolean(expected) && authHeader === expected;
}

export function paymentMethodLabel(method: string) {
  switch (method) {
    case "applePay":
      return "Apple Pay";
    case "googlePay":
      return "Google Pay";
    case "card":
      return "Card Payment";
    default:
      return method;
  }
}
