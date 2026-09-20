"use client";

import { GCCoinIcon, SCCoinIcon } from "../coins";
import {
  ApplePayIcon,
  CardPaymentIcon,
  ChevronRightIcon,
  CloverIcon,
  CoinIcon,
  CrownIcon,
  DiceIcon,
  GiftIcon,
  GooglePayIcon,
  MagicHatIcon,
  SpinWheelIcon,
  StarIcon,
  SwapIcon,
} from "../icons";
import { useAppState } from "../providers/app-state";

const GAME_TILES = [
  { icon: SpinWheelIcon, from: "#7c3aed", to: "#4c1d95" },
  { icon: CoinIcon, from: "#059669", to: "#064e3b" },
  { icon: CloverIcon, from: "#dc2626", to: "#7f1d1d" },
  { icon: StarIcon, from: "#d97706", to: "#78350f" },
  { icon: MagicHatIcon, from: "#2563eb", to: "#1e3a8a" },
  { icon: CrownIcon, from: "#db2777", to: "#831843" },
];

const PAYMENT_METHODS = [
  { icon: ApplePayIcon, label: "Apple Pay" },
  { icon: GooglePayIcon, label: "Google Pay" },
  { icon: CardPaymentIcon, label: "Card" },
];

const STEPS = [
  { number: "01", icon: GiftIcon, tag: "Free to Start", accent: "#F4C766" },
  { number: "02", icon: DiceIcon, tag: "3,000+ Games", accent: "#34D399" },
  { number: "03", icon: SwapIcon, tag: "Instant Payout", accent: "#38BDF8" },
];

export default function HowToPlay() {
  const { user, openSignUp } = useAppState();

  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-gold/40 bg-cream-surface px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-gold-bright uppercase">
          Casino Guide
        </span>
        <h2 className="mt-4 font-display text-4xl tracking-wide text-ink sm:text-5xl">
          How to Play in{" "}
          <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
            3 Easy Steps
          </span>
        </h2>
      </div>

      <div className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, i) => (
          <div key={step.number} className="relative">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream-surface transition hover:-translate-y-1">
              <div
                className="relative flex flex-col items-center gap-3 px-6 pt-7 pb-9 text-center"
                style={{ background: `linear-gradient(180deg, ${step.accent}2e, transparent)` }}
              >
                <span
                  className="absolute top-3 right-4 font-display text-3xl"
                  style={{ color: `${step.accent}55` }}
                >
                  {step.number}
                </span>
                <span
                  className="grid size-16 place-items-center rounded-full"
                  style={{ background: `${step.accent}22`, color: step.accent }}
                >
                  <step.icon className="size-7" />
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
                  style={{ background: `${step.accent}26`, color: step.accent }}
                >
                  {step.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 border-t border-line px-6 py-6">
                {i === 0 && (
                  <>
                    <div>
                      <h3 className="font-display text-xl tracking-wide text-ink">Sign Up &amp; Get</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Create your free account and claim your welcome bonus instantly.
                      </p>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="flex gap-2">
                        <span className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-gold/30 bg-cream-surface-2 py-2.5">
                          <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
                            <GCCoinIcon className="size-4.5" />
                            1,000
                          </span>
                          <span className="text-[10px] font-semibold tracking-wide text-ink-soft uppercase">
                            Gold Coins
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-emerald/30 bg-cream-surface-2 py-2.5">
                          <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-bright">
                            <SCCoinIcon className="size-4.5" />2
                          </span>
                          <span className="text-[10px] font-semibold tracking-wide text-ink-soft uppercase">
                            Sweeps Coins
                          </span>
                        </span>
                      </div>
                      {!user && (
                        <button
                          type="button"
                          onClick={openSignUp}
                          className="rounded-full bg-gradient-to-b from-gold-bright to-gold px-4 py-2.5 text-sm font-bold text-cream shadow-md transition hover:brightness-105"
                        >
                          Claim Now
                        </button>
                      )}
                    </div>
                  </>
                )}

                {i === 1 && (
                  <>
                    <div>
                      <h3 className="font-display text-xl tracking-wide text-ink">Play &amp; Win</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Enjoy 3,000+ slots, fish tables, and more using your free coins.
                      </p>
                    </div>
                    <div className="mt-auto grid grid-cols-3 gap-2.5">
                      {GAME_TILES.map(({ icon: Icon, from, to }, tileIndex) => (
                        <div
                          key={tileIndex}
                          className="grid aspect-square place-items-center rounded-xl text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.5)] transition hover:scale-105"
                          style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
                        >
                          <Icon className="size-6" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {i === 2 && (
                  <>
                    <div>
                      <h3 className="font-display text-xl tracking-wide text-ink">Redeem Your SC</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        Instantly withdraw your Sweeps Coins to your bank account.
                      </p>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      {PAYMENT_METHODS.map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-2.5 rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2.5"
                        >
                          <Icon className="size-4.5 shrink-0 text-ink-soft" />
                          <span className="text-sm font-semibold text-ink">{label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 md:block">
                <span className="grid size-8 place-items-center rounded-full border border-gold/40 bg-cream text-gold-bright shadow-md">
                  <ChevronRightIcon className="size-4" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
