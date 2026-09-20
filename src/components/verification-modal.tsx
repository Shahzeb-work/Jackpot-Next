"use client";

import { useEffect, useState } from "react";
import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { CloseIcon, EnvelopeCheckIcon, IdCardIcon, PhoneCheckIcon, ShieldCheckIcon } from "./icons";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import { REWARDS } from "@/lib/verification";
import {
  getVerificationStatusAction,
  sendEmailVerificationOtpAction,
  verifyEmailOtpAction,
  sendPhoneVerificationOtpAction,
  verifyPhoneOtpAction,
  submitKycAction,
  type VerificationStatus,
} from "@/lib/actions/verification";

type Tab = "email" | "phone" | "kyc";

const TABS: { id: Tab; label: string; icon: typeof EnvelopeCheckIcon }[] = [
  { id: "email", label: "Email", icon: EnvelopeCheckIcon },
  { id: "phone", label: "Phone", icon: PhoneCheckIcon },
  { id: "kyc", label: "KYC", icon: IdCardIcon },
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia",
];

function RewardLine({ source }: { source: keyof typeof REWARDS }) {
  const reward = REWARDS[source];
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
      Reward:
      <span className="flex items-center gap-1 text-ink">
        <GCCoinIcon className="size-4" />
        {reward.goldCoins.toLocaleString()}
      </span>
      <span className="flex items-center gap-1 text-emerald-bright">
        <SCCoinIcon className="size-4" />
        {reward.sweepsCoins}
      </span>
    </div>
  );
}

function VerifiedPanel({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald/40 bg-emerald/10 px-6 py-10 text-center">
      <ShieldCheckIcon className="size-9 text-emerald-bright" />
      <p className="text-base font-bold text-ink">{title}</p>
      {detail && <p className="text-sm text-ink-soft">{detail}</p>}
    </div>
  );
}

export default function VerificationModal() {
  const { modal, closeModal, user, setUser } = useAppState();
  const open = modal?.type === "verification";
  const [tab, setTab] = useState<Tab>("email");
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailReward, setEmailReward] = useState<{ goldCoins: number; sweepsCoins: number } | null>(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneBusy, setPhoneBusy] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneReward, setPhoneReward] = useState<{ goldCoins: number; sweepsCoins: number } | null>(null);

  const [kycFirstName, setKycFirstName] = useState("");
  const [kycLastName, setKycLastName] = useState("");
  const [kycDob, setKycDob] = useState("");
  const [kycAddress1, setKycAddress1] = useState("");
  const [kycAddress2, setKycAddress2] = useState("");
  const [kycCountry, setKycCountry] = useState("United States");
  const [kycState, setKycState] = useState("");
  const [kycCity, setKycCity] = useState("");
  const [kycZip, setKycZip] = useState("");
  const [kycBusy, setKycBusy] = useState(false);
  const [kycError, setKycError] = useState<string | null>(null);
  const [kycReward, setKycReward] = useState<{ goldCoins: number; sweepsCoins: number } | null>(null);

  function loadStatus() {
    getVerificationStatusAction().then((res) => {
      if (res.ok) {
        setStatusError(null);
        setStatus(res.status);
        if (res.status.phone.phoneNumber) setPhoneNumber(res.status.phone.phoneNumber);
      } else {
        setStatusError(res.error);
      }
    });
  }

  useEffect(() => {
    if (open) loadStatus();
  }, [open]);

  function handleClose() {
    setTab("email");
    setStatus(null);
    setStatusError(null);
    setEmailOtpSent(false);
    setEmailOtp("");
    setEmailError(null);
    setEmailReward(null);
    setPhoneOtpSent(false);
    setPhoneOtp("");
    setPhoneError(null);
    setPhoneReward(null);
    setKycFirstName("");
    setKycLastName("");
    setKycDob("");
    setKycAddress1("");
    setKycAddress2("");
    setKycCountry("United States");
    setKycState("");
    setKycCity("");
    setKycZip("");
    setKycError(null);
    setKycReward(null);
    closeModal();
  }

  function applyReward(goldCoins: number, sweepsCoins: number) {
    if (user) setUser({ ...user, goldCoins, sweepsCoins });
  }

  async function handleSendEmailOtp() {
    setEmailBusy(true);
    setEmailError(null);
    const res = await sendEmailVerificationOtpAction();
    setEmailBusy(false);
    if (!res.ok) {
      setEmailError(res.error);
      return;
    }
    setEmailOtpSent(true);
  }

  async function handleVerifyEmailOtp() {
    setEmailBusy(true);
    setEmailError(null);
    const res = await verifyEmailOtpAction(emailOtp);
    setEmailBusy(false);
    if (!res.ok) {
      setEmailError(res.error);
      return;
    }
    applyReward(res.goldCoins, res.sweepsCoins);
    setEmailReward(REWARDS.email_verification);
    setStatus((prev) => (prev ? { ...prev, email: { verified: true } } : prev));
  }

  async function handleSendPhoneOtp() {
    setPhoneBusy(true);
    setPhoneError(null);
    const res = await sendPhoneVerificationOtpAction(phoneNumber);
    setPhoneBusy(false);
    if (!res.ok) {
      setPhoneError(res.error);
      return;
    }
    setPhoneOtpSent(true);
  }

  async function handleVerifyPhoneOtp() {
    setPhoneBusy(true);
    setPhoneError(null);
    const res = await verifyPhoneOtpAction(phoneOtp);
    setPhoneBusy(false);
    if (!res.ok) {
      setPhoneError(res.error);
      return;
    }
    applyReward(res.goldCoins, res.sweepsCoins);
    setPhoneReward(REWARDS.phone_verification);
    setStatus((prev) => (prev ? { ...prev, phone: { verified: true, phoneNumber } } : prev));
  }

  const kycRequiredFilled =
    kycFirstName.trim() &&
    kycLastName.trim() &&
    kycDob.trim() &&
    kycAddress1.trim() &&
    kycCountry.trim() &&
    kycState.trim() &&
    kycCity.trim() &&
    /^\d{5,6}$/.test(kycZip.trim());

  async function handleSubmitKyc() {
    setKycBusy(true);
    setKycError(null);
    const res = await submitKycAction({
      firstName: kycFirstName,
      lastName: kycLastName,
      dateOfBirth: kycDob,
      address1: kycAddress1,
      address2: kycAddress2,
      country: kycCountry,
      state: kycState,
      city: kycCity,
      zip: kycZip,
    });
    setKycBusy(false);
    if (!res.ok) {
      setKycError(res.error);
      return;
    }
    applyReward(res.goldCoins, res.sweepsCoins);
    setKycReward(REWARDS.kyc_verification);
    setStatus((prev) =>
      prev ? { ...prev, kyc: { verified: true, fullName: `${kycFirstName} ${kycLastName}`.trim() } } : prev
    );
  }

  const loadingStatus = status === null;

  return (
    <Modal open={open} onClose={handleClose} panelClassName="w-full max-w-xl">
      <div className="flex flex-col rounded-3xl border border-line bg-cream-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ink">Verification</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>
        </div>

        <div className="mb-5 flex gap-1.5 rounded-2xl border border-line bg-cream-surface-2 p-1.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition " +
                (tab === id
                  ? "bg-gradient-to-b from-emerald-bright to-emerald text-cream-surface"
                  : "text-ink-soft hover:text-ink")
              }
            >
              <Icon className="size-4.5" />
              {label}
              {status &&
                (id === "email"
                  ? status.email.verified
                  : id === "phone"
                    ? status.phone.verified
                    : status.kyc.verified) && <ShieldCheckIcon className="size-4 text-emerald-bright" />}
            </button>
          ))}
        </div>

        {statusError ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="text-sm font-semibold text-rose-400">{statusError}</p>
            <button
              type="button"
              onClick={loadStatus}
              className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              Retry
            </button>
          </div>
        ) : loadingStatus ? (
          <p className="p-10 text-center text-sm text-ink-soft">Loading…</p>
        ) : tab === "email" ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-soft">
              Verify the email on your account: <span className="font-semibold text-ink">{user?.email}</span>
            </p>
            <RewardLine source="email_verification" />

            {status?.email.verified || emailReward ? (
              <VerifiedPanel
                title="Email Verified"
                detail={
                  emailReward
                    ? `+${emailReward.goldCoins.toLocaleString()} GC & +${emailReward.sweepsCoins} SC credited!`
                    : "You've already claimed this reward."
                }
              />
            ) : (
              <>
                {!emailOtpSent ? (
                  <button
                    type="button"
                    disabled={emailBusy}
                    onClick={handleSendEmailOtp}
                    className="rounded-xl bg-gradient-to-b from-emerald-bright to-emerald px-4 py-2.5 text-sm font-bold text-cream-surface transition hover:brightness-105 disabled:opacity-60"
                  >
                    {emailBusy ? "Sending…" : "Send verification code"}
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6-digit code"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium tracking-widest text-ink"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={emailBusy || emailOtp.length !== 6}
                        onClick={handleVerifyEmailOtp}
                        className="flex-1 rounded-xl bg-gradient-to-b from-emerald-bright to-emerald px-4 py-2.5 text-sm font-bold text-cream-surface transition hover:brightness-105 disabled:opacity-60"
                      >
                        {emailBusy ? "Verifying…" : "Verify"}
                      </button>
                      <button
                        type="button"
                        disabled={emailBusy}
                        onClick={handleSendEmailOtp}
                        className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:text-ink disabled:opacity-60"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                )}
                {emailError && <p className="text-xs font-semibold text-rose-400">{emailError}</p>}
              </>
            )}
          </div>
        ) : tab === "phone" ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-soft">Verify a phone number to secure your account.</p>
            <RewardLine source="phone_verification" />

            {status?.phone.verified || phoneReward ? (
              <VerifiedPanel
                title="Phone Verified"
                detail={
                  phoneReward
                    ? `+${phoneReward.goldCoins.toLocaleString()} GC & +${phoneReward.sweepsCoins} SC credited!`
                    : "You've already claimed this reward."
                }
              />
            ) : (
              <>
                <input
                  type="tel"
                  placeholder="+15551234567"
                  value={phoneNumber}
                  disabled={phoneOtpSent}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink disabled:opacity-60"
                />
                {!phoneOtpSent ? (
                  <button
                    type="button"
                    disabled={phoneBusy || !phoneNumber.trim()}
                    onClick={handleSendPhoneOtp}
                    className="rounded-xl bg-gradient-to-b from-emerald-bright to-emerald px-4 py-2.5 text-sm font-bold text-cream-surface transition hover:brightness-105 disabled:opacity-60"
                  >
                    {phoneBusy ? "Sending…" : "Send verification code"}
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6-digit code"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium tracking-widest text-ink"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={phoneBusy || phoneOtp.length !== 6}
                        onClick={handleVerifyPhoneOtp}
                        className="flex-1 rounded-xl bg-gradient-to-b from-emerald-bright to-emerald px-4 py-2.5 text-sm font-bold text-cream-surface transition hover:brightness-105 disabled:opacity-60"
                      >
                        {phoneBusy ? "Verifying…" : "Verify"}
                      </button>
                      <button
                        type="button"
                        disabled={phoneBusy}
                        onClick={handleSendPhoneOtp}
                        className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:text-ink disabled:opacity-60"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                )}
                {phoneError && <p className="text-xs font-semibold text-rose-400">{phoneError}</p>}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-ink-soft">Confirm your identity to unlock the full account.</p>
            <RewardLine source="kyc_verification" />

            {status?.kyc.verified || kycReward ? (
              <VerifiedPanel
                title="Identity Verified"
                detail={
                  kycReward
                    ? `+${kycReward.goldCoins.toLocaleString()} GC & +${kycReward.sweepsCoins} SC credited!`
                    : "You've already claimed this reward."
                }
              />
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wide text-ink-soft uppercase">
                      Personal Information
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First name"
                          value={kycFirstName}
                          onChange={(e) => setKycFirstName(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        />
                        <input
                          type="text"
                          placeholder="Last name"
                          value={kycLastName}
                          onChange={(e) => setKycLastName(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        />
                      </div>
                      <input
                        type="date"
                        aria-label="Date of birth"
                        value={kycDob}
                        onChange={(e) => setKycDob(e.target.value)}
                        className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wide text-ink-soft uppercase">
                      Address Information
                    </p>
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="Address 1"
                        value={kycAddress1}
                        onChange={(e) => setKycAddress1(e.target.value)}
                        className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                      />
                      <input
                        type="text"
                        placeholder="Address 2 (optional)"
                        value={kycAddress2}
                        onChange={(e) => setKycAddress2(e.target.value)}
                        className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Country"
                          value={kycCountry}
                          onChange={(e) => setKycCountry(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        />
                        <select
                          value={kycState}
                          onChange={(e) => setKycState(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        >
                          <option value="">State</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={kycCity}
                          onChange={(e) => setKycCity(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="ZIP"
                          value={kycZip}
                          onChange={(e) => setKycZip(e.target.value)}
                          className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5 text-sm font-medium text-ink"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={kycBusy || !kycRequiredFilled}
                    onClick={handleSubmitKyc}
                    className="rounded-xl bg-gradient-to-b from-emerald-bright to-emerald px-4 py-2.5 text-sm font-bold text-cream-surface transition hover:brightness-105 disabled:opacity-60"
                  >
                    {kycBusy ? "Submitting…" : "Submit for verification"}
                  </button>
                  {kycError && <p className="text-xs font-semibold text-rose-400">{kycError}</p>}
                  <p className="text-[11px] text-ink-soft">
                    Sandbox mode — submitted details are approved automatically for this demo.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
