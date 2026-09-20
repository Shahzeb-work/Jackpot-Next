"use client";

import { useState } from "react";
import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import {
  ApplePayIcon,
  CardPaymentIcon,
  // CashAppIcon,
  ChevronLeftIcon,
  CloseIcon,
  GooglePayIcon,
} from "./icons";
import { createCoinflowCheckoutAction } from "@/lib/actions/coinflow";
import type { CoinflowPaymentMethod } from "@/lib/coinflow";
import CoinflowCheckout, { type CoinflowResult } from "./coinflow-checkout";

const PAYMENT_METHODS: { id: string; label: string; icon: typeof ApplePayIcon; method: CoinflowPaymentMethod }[] = [
  { id: "apple-pay", label: "Apple Pay", icon: ApplePayIcon, method: "applePay" },
  { id: "google-pay", label: "Google Pay", icon: GooglePayIcon, method: "googlePay" },
  // { id: "cashapp", label: "CashApp", icon: CashAppIcon, method: "cashApp" },
  { id: "card", label: "Card Payment", icon: CardPaymentIcon, method: "card" },
];

export default function PackagesModal() {
  const { modal, closeModal, openPackagesList, user, setUser } = useAppState();
  const open = modal?.type === "packages-checkout";
  const pkg = modal?.type === "packages-checkout" ? modal.pkg : null;
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingMethod, setPendingMethod] = useState<string | null>(null);
  const [checkoutSession, setCheckoutSession] = useState<{ url: string; code: string } | null>(null);

  function handleClose() {
    setNotice(null);
    setCheckoutSession(null);
    closeModal();
  }

  function handleBack() {
    setNotice(null);
    openPackagesList();
  }

  async function handleSelectMethod(id: string, label: string, method: CoinflowPaymentMethod) {
    if (!pkg || !user) return;

    setNotice(null);
    setPendingMethod(id);

    const res = await createCoinflowCheckoutAction({ packageId: pkg.id, paymentMethod: method });

    setPendingMethod(null);

    if (!res.ok) {
      setNotice(res.error || `${label} isn't available right now — try again soon.`);
      return;
    }

    setCheckoutSession({ url: res.link, code: res.code });
  }

  function handleCheckoutResult(result: CoinflowResult) {
    setCheckoutSession(null);

    if (result.status === "success") {
      if (user) {
        setUser({
          ...user,
          goldCoins: user.goldCoins + result.goldCoins,
          sweepsCoins: user.sweepsCoins + result.sweepsCoins,
        });
      }
      handleClose();
      return;
    }

    setNotice(result.reason || "That payment didn't go through. Please try another method.");
  }

  if (!pkg) return null;

  return (
    <>
      <Modal open={open} onClose={handleClose} panelClassName="w-full max-w-md">
        <div className="rounded-3xl border border-line bg-cream-surface p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              aria-label="Back"
              onClick={handleBack}
              className="grid size-8 place-items-center rounded-full bg-emerald text-cream-surface transition hover:bg-emerald-deep"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <h2 className="font-display text-2xl tracking-wide text-ink">Get Packages</h2>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
            >
              <CloseIcon className="size-4.5" />
            </button>
          </div>

          <p className="mb-3 text-sm font-bold text-ink">Order Summary</p>
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <GCCoinIcon className="size-9 shrink-0" />
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                  {pkg.coins} GC
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                  Get Free
                  <SCCoinIcon className="size-3.5" />
                  {pkg.bonus} SC
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-ink">Total: {pkg.price}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {PAYMENT_METHODS.map(({ id, label, icon: Icon, method }) => (
              <button
                key={id}
                type="button"
                disabled={pendingMethod !== null}
                onClick={() => handleSelectMethod(id, label, method)}
                className="flex items-center gap-3 rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5 text-left transition hover:border-emerald disabled:opacity-60"
              >
                <Icon className="size-6 shrink-0 text-ink" />
                <span className="text-sm font-semibold text-ink">
                  {pendingMethod === id ? "Connecting…" : label}
                </span>
              </button>
            ))}
          </div>

          {notice && <p className="mt-4 text-center text-xs text-ink-soft">{notice}</p>}
        </div>
      </Modal>

      {checkoutSession && (
        <CoinflowCheckout
          url={checkoutSession.url}
          code={checkoutSession.code}
          onClose={() => setCheckoutSession(null)}
          onResult={handleCheckoutResult}
        />
      )}
    </>
  );
}
