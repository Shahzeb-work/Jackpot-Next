"use server";

import crypto from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";
import { sendEmailOtp } from "@/lib/sendgrid";
import { sendSmsOtp } from "@/lib/twilio";
import { generateOtp, OTP_TTL_MS, REWARDS, type RewardSource } from "@/lib/verification";

function generateRewardCode() {
  return crypto.randomBytes(6).toString("hex");
}

async function getOrCreateVerification(userId: string) {
  try {
    return await prisma.verification.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const existing = await prisma.verification.findUnique({ where: { userId } });
      if (existing) return existing;
    }
    throw err;
  }
}

async function grantReward(userId: string, source: RewardSource) {
  const reward = REWARDS[source];
  const code = generateRewardCode();

  await prisma.rewardTransaction.create({
    data: { userId, code, source, goldCoins: reward.goldCoins, sweepsCoins: reward.sweepsCoins },
  });

  return prisma.user.update({
    where: { id: userId },
    data: {
      goldCoins: { increment: reward.goldCoins },
      sweepsCoins: { increment: reward.sweepsCoins },
    },
    select: { goldCoins: true, sweepsCoins: true },
  });
}

export type VerificationStatus = {
  email: { verified: boolean };
  phone: { verified: boolean; phoneNumber: string | null };
  kyc: { verified: boolean; fullName: string | null };
};

export type KycInput = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export type VerificationStatusResult =
  | { ok: true; status: VerificationStatus }
  | { ok: false; error: string };

export async function getVerificationStatusAction(): Promise<VerificationStatusResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const v = await prisma.verification.findUnique({ where: { userId } });

  return {
    ok: true,
    status: {
      email: { verified: Boolean(v?.emailVerifiedAt) },
      phone: { verified: Boolean(v?.phoneVerifiedAt), phoneNumber: v?.phoneNumber ?? null },
      kyc: {
        verified: Boolean(v?.kycVerifiedAt),
        fullName: v?.kycFirstName ? `${v.kycFirstName} ${v.kycLastName ?? ""}`.trim() : null,
      },
    },
  };
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function sendEmailVerificationOtpAction(): Promise<ActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) return { ok: false, error: "You need to sign in." };

  await getOrCreateVerification(userId);
  const existing = await prisma.verification.findUnique({ where: { userId } });
  if (existing?.emailVerifiedAt) return { ok: false, error: "Email is already verified." };

  const otp = generateOtp();
  try {
    await sendEmailOtp(user.email, otp);
  } catch (err) {
    console.error("sendEmailVerificationOtpAction failed:", err);
    return { ok: false, error: "Couldn't send the verification email. Try again." };
  }

  await prisma.verification.update({
    where: { userId },
    data: { emailOtp: otp, emailOtpExpiresAt: new Date(Date.now() + OTP_TTL_MS) },
  });

  return { ok: true };
}

export type VerifyResult = { ok: true; goldCoins: number; sweepsCoins: number } | { ok: false; error: string };

export async function verifyEmailOtpAction(otp: string): Promise<VerifyResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const v = await prisma.verification.findUnique({ where: { userId } });
  if (!v?.emailOtp || !v.emailOtpExpiresAt) return { ok: false, error: "Request a code first." };
  if (v.emailVerifiedAt) return { ok: false, error: "Email is already verified." };
  if (v.emailOtpExpiresAt.getTime() < Date.now()) {
    return { ok: false, error: "Code has expired. Request a new one." };
  }
  if (v.emailOtp !== otp.trim()) return { ok: false, error: "Incorrect code." };

  await prisma.verification.update({
    where: { userId },
    data: { emailVerifiedAt: new Date(), emailOtp: null, emailOtpExpiresAt: null, emailRewardClaimed: true },
  });

  const balances = await grantReward(userId, "email_verification");
  return { ok: true, ...balances };
}

export async function sendPhoneVerificationOtpAction(phoneNumber: string): Promise<ActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const trimmed = phoneNumber.trim();
  if (!/^\+?[1-9]\d{7,14}$/.test(trimmed)) {
    return { ok: false, error: "Enter a valid phone number, e.g. +15551234567." };
  }
  const normalized = trimmed.startsWith("+") ? trimmed : `+${trimmed}`;

  await getOrCreateVerification(userId);
  const existing = await prisma.verification.findUnique({ where: { userId } });
  if (existing?.phoneVerifiedAt) return { ok: false, error: "Phone number is already verified." };

  const otp = generateOtp();
  try {
    await sendSmsOtp(normalized, otp);
  } catch (err) {
    console.error("sendPhoneVerificationOtpAction failed:", err);
    return { ok: false, error: "Couldn't send the verification text. Try again." };
  }

  await prisma.verification.update({
    where: { userId },
    data: {
      phoneNumber: normalized,
      phoneOtp: otp,
      phoneOtpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
  });

  return { ok: true };
}

export async function verifyPhoneOtpAction(otp: string): Promise<VerifyResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const v = await prisma.verification.findUnique({ where: { userId } });
  if (!v?.phoneOtp || !v.phoneOtpExpiresAt) return { ok: false, error: "Request a code first." };
  if (v.phoneVerifiedAt) return { ok: false, error: "Phone number is already verified." };
  if (v.phoneOtpExpiresAt.getTime() < Date.now()) {
    return { ok: false, error: "Code has expired. Request a new one." };
  }
  if (v.phoneOtp !== otp.trim()) return { ok: false, error: "Incorrect code." };

  await prisma.verification.update({
    where: { userId },
    data: { phoneVerifiedAt: new Date(), phoneOtp: null, phoneOtpExpiresAt: null, phoneRewardClaimed: true },
  });

  const balances = await grantReward(userId, "phone_verification");
  return { ok: true, ...balances };
}

export async function submitKycAction(input: KycInput): Promise<VerifyResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in." };

  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const dateOfBirth = input.dateOfBirth.trim();
  const address1 = input.address1.trim();
  const address2 = input.address2?.trim() || null;
  const city = input.city.trim();
  const state = input.state.trim();
  const country = input.country.trim();
  const zip = input.zip.trim();

  if (!firstName || !lastName || !dateOfBirth || !address1 || !city || !state || !country || !zip) {
    return { ok: false, error: "Fill in all required identity fields." };
  }
  if (!/^\d{5,6}$/.test(zip)) {
    return { ok: false, error: "ZIP code must be 5 or 6 digits." };
  }

  await getOrCreateVerification(userId);
  const existing = await prisma.verification.findUnique({ where: { userId } });
  if (existing?.kycVerifiedAt) return { ok: false, error: "Identity is already verified." };

  await prisma.verification.update({
    where: { userId },
    data: {
      kycFirstName: firstName,
      kycLastName: lastName,
      kycDateOfBirth: dateOfBirth,
      kycAddress1: address1,
      kycAddress2: address2,
      kycCity: city,
      kycState: state,
      kycCountry: country,
      kycZip: zip,
      kycVerifiedAt: new Date(),
      kycRewardClaimed: true,
    },
  });

  const balances = await grantReward(userId, "kyc_verification");
  return { ok: true, ...balances };
}

export type UserRewardTransaction = {
  id: string;
  code: string;
  source: string;
  goldCoins: number;
  sweepsCoins: number;
  createdAt: string;
};

export type UserRewardTransactionsResult =
  | { ok: true; transactions: UserRewardTransaction[] }
  | { ok: false; error: string };

export async function getUserRewardTransactionsAction(): Promise<UserRewardTransactionsResult> {
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: "You need to sign in to view reward history." };

  const transactions = await prisma.rewardTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    ok: true,
    transactions: transactions.map((tx) => ({
      id: tx.id,
      code: tx.code,
      source: tx.source,
      goldCoins: tx.goldCoins,
      sweepsCoins: tx.sweepsCoins,
      createdAt: tx.createdAt.toISOString(),
    })),
  };
}
