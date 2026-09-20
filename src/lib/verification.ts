export const OTP_TTL_MS = 3 * 60 * 1000;

export type RewardSource = "email_verification" | "phone_verification" | "kyc_verification";

export const REWARDS: Record<RewardSource, { goldCoins: number; sweepsCoins: number }> = {
  email_verification: { goldCoins: 2500, sweepsCoins: 1 },
  phone_verification: { goldCoins: 2500, sweepsCoins: 1 },
  kyc_verification: { goldCoins: 5000, sweepsCoins: 2 },
};

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function rewardSourceLabel(source: string) {
  switch (source) {
    case "email_verification":
      return "Email Verification";
    case "phone_verification":
      return "Phone Verification";
    case "kyc_verification":
      return "KYC Verification";
    default:
      return source;
  }
}
