"use client";

import { useEffect, useState } from "react";
import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { CloseIcon } from "./icons";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import { spinWheelAction } from "@/lib/actions/spin";
import { SPIN_COOLDOWN_MS, SPIN_PRIZES } from "@/lib/spin-config";

const SEGMENT_ANGLE = 360 / SPIN_PRIZES.length;
const SLICE_COLORS = ["#f2c265", "#0c3f27"];
const BULB_COUNT = 16;

const WHEEL_BACKGROUND = [
  "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 32%, transparent 55%)",
  `conic-gradient(from 0deg, ${SPIN_PRIZES.map((_, i) => {
    const color = SLICE_COLORS[i % 2];
    return `${color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`;
  }).join(", ")})`,
].join(", ");

function computeRotation(prevRotation: number, index: number) {
  const targetCenter = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
  const baseR = (360 - targetCenter) % 360;
  const prevMod = ((prevRotation % 360) + 360) % 360;
  let next = prevRotation - prevMod + 6 * 360 + baseR;
  if (next <= prevRotation) next += 360;
  return next;
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function SpinWheelModal() {
  const { modal, closeModal, user, setUser } = useAppState();
  const open = modal?.type === "spin";

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ label: string; goldCoins: number; sweepsCoins: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [open]);

  const nextAvailableAt = cooldownUntil
    ? cooldownUntil
    : user?.lastSpinAt
      ? new Date(user.lastSpinAt).getTime() + SPIN_COOLDOWN_MS
      : null;

  const onCooldown = Boolean(nextAvailableAt && nextAvailableAt > now);
  const spinReady = !spinning && !onCooldown;

  function handleClose() {
    if (spinning) return;
    setResult(null);
    setError(null);
    closeModal();
  }

  async function handleSpin() {
    if (spinning || onCooldown) return;
    setError(null);
    setResult(null);
    setSpinning(true);

    const response = await spinWheelAction();

    if (!response.ok) {
      setSpinning(false);
      setError(response.error);
      if (response.nextAvailableAt) {
        setCooldownUntil(new Date(response.nextAvailableAt).getTime());
      }
      return;
    }

    const nextRotation = computeRotation(rotation, response.prizeIndex);
    setRotation(nextRotation);

    window.setTimeout(() => {
      setSpinning(false);
      setResult({
        label: response.prize.label,
        goldCoins: response.prize.goldCoins,
        sweepsCoins: response.prize.sweepsCoins,
      });
      setCooldownUntil(new Date(response.lastSpinAt).getTime() + SPIN_COOLDOWN_MS);
      if (user) {
        setUser({ ...user, goldCoins: response.goldCoins, sweepsCoins: response.sweepsCoins, lastSpinAt: response.lastSpinAt });
      }
    }, 4200);
  }

  return (
    <Modal open={open} onClose={handleClose} panelClassName="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-[#0a0805] via-[#120c06] to-cream-surface p-6 text-center shadow-2xl">
        <div className="chip-dots pointer-events-none absolute inset-0 opacity-[0.05]" />

        <div className="relative mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-gold-bright drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Spin &amp; Win
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>
        </div>

        <div className="relative mx-auto mb-6 size-72">
          {/* ambient glow */}
          <div className="absolute inset-2 rounded-full bg-gold-bright/25 blur-2xl" />

          {/* bulb ring */}
          {Array.from({ length: BULB_COUNT }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${(i * 360) / BULB_COUNT}deg)` }}
            >
              <span
                className="animate-glow absolute left-1/2 top-0.5 size-2 -translate-x-1/2 rounded-full bg-gold-bright shadow-[0_0_6px_2px_rgba(244,199,102,0.75)]"
                style={{ animationDelay: `${(i % 4) * 0.15}s` }}
              />
            </div>
          ))}

          {/* pointer */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2">
            <div className="relative">
              <div
                className="size-0 border-x-[11px] border-t-[20px] border-x-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                style={{ borderTopColor: "#f4c766" }}
              />
              <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#fff3cf] to-gold shadow-[0_0_6px_rgba(244,199,102,0.8)]" />
            </div>
          </div>

          {/* rotating disc */}
          <div
            className="absolute inset-5 rounded-full border-[5px] border-gold-bright shadow-[0_0_35px_-6px_rgba(244,199,102,0.65),inset_0_0_18px_rgba(0,0,0,0.55)]"
            style={{
              background: WHEEL_BACKGROUND,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4.1s cubic-bezier(0.12,0.67,0.1,0.99)" : "none",
            }}
          >
            {SPIN_PRIZES.map((prize, i) => (
              <div
                key={`divider-${prize.label}`}
                className="absolute inset-0"
                style={{ transform: `rotate(${i * SEGMENT_ANGLE}deg)` }}
              >
                <span className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-gold-bright/70 via-gold-bright/25 to-transparent" />
              </div>
            ))}

            {SPIN_PRIZES.map((prize, i) => {
              const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              const Icon = prize.goldCoins > 0 ? GCCoinIcon : SCCoinIcon;
              return (
                <div key={prize.label} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="absolute left-1/2 top-3.5 flex w-max -translate-x-1/2 flex-col items-center gap-0.5">
                    <Icon className="size-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                    <span className="text-[10.5px] font-bold whitespace-nowrap text-cream drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                      {prize.label}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="absolute inset-0 rounded-full border border-cream/10" />
            <div className="absolute inset-2 rounded-full border border-cream/5" />
          </div>

          {/* center hub */}
          <div className="absolute inset-0 z-10 grid place-items-center">
            <button
              type="button"
              onClick={handleSpin}
              disabled={spinning || onCooldown}
              className={
                "relative grid size-[4.5rem] place-items-center rounded-full border-2 border-gold-bright/80 bg-[radial-gradient(circle_at_35%_30%,#fff3cf,rgb(244,199,102)_45%,rgb(169,124,34)_100%)] text-sm font-extrabold tracking-wide text-[#3a2606] shadow-[0_3px_10px_rgba(0,0,0,0.55),inset_0_1px_2px_rgba(255,255,255,0.6)] transition hover:brightness-105 disabled:opacity-70 " +
                (spinReady ? "animate-pulse" : "")
              }
            >
              {spinning ? "…" : "SPIN"}
            </button>
          </div>
        </div>

        {result && (
          <div className="relative mb-4 flex items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-cream-surface-2 px-4 py-3 text-sm font-bold text-ink shadow-[0_0_20px_-6px_rgba(244,199,102,0.5)]">
            You won {result.label}!
            {result.goldCoins > 0 && <GCCoinIcon className="size-5" />}
            {result.sweepsCoins > 0 && <SCCoinIcon className="size-5" />}
          </div>
        )}

        {error && !onCooldown && <p className="relative mb-2 text-sm font-medium text-red-400">{error}</p>}

        {onCooldown && nextAvailableAt && (
          <p className="relative text-sm font-semibold text-ink-soft">
            Next free spin in{" "}
            <span className="font-mono text-gold-bright">{formatCountdown(nextAvailableAt - now)}</span>
          </p>
        )}
      </div>
    </Modal>
  );
}
