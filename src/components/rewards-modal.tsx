"use client";

import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { CloseIcon, MailIcon, MedalIcon, PercentBadgeIcon, ReferIcon } from "./icons";

const ACHIEVEMENTS = [
  {
    icon: MailIcon,
    title: "150K FC & 1 SC",
    subtitle: "Click to verify your email",
  },
  {
    icon: MedalIcon,
    title: "1 SC Reward",
    subtitle: "You've leveled up. This reward is ready.",
  },
];

export default function RewardsModal() {
  const { modal, closeModal, openSignUp, user } = useAppState();
  const open = modal?.type === "rewards";

  function handleUnlock() {
    if (!user) {
      openSignUp();
    }
  }

  return (
    <Modal open={open} onClose={closeModal} panelClassName="w-full max-w-md">
      <div className="rounded-3xl border border-line bg-cream-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ink">My Rewards</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-ink-soft uppercase">
          Balances
        </p>
        <div className="mb-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream-surface-2 px-4 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-bright">
              <PercentBadgeIcon className="size-5" />
            </span>
            <p className="flex-1 text-sm font-semibold text-ink">Cashback</p>
            <RewardCta unlocked={Boolean(user)} onClick={handleUnlock} />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream-surface-2 px-4 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald/15 text-emerald-bright">
              <ReferIcon className="size-5" />
            </span>
            <p className="flex-1 text-sm font-semibold text-ink">Referral Balance</p>
            <RewardCta unlocked={Boolean(user)} onClick={handleUnlock} />
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-ink-soft uppercase">
          Achievements
        </p>
        <div className="flex flex-col gap-2.5">
          {ACHIEVEMENTS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl border border-line bg-cream-surface-2 px-4 py-3"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-bright">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{title}</p>
                <p className="truncate text-xs text-ink-soft">{subtitle}</p>
              </div>
              <RewardCta unlocked={Boolean(user)} onClick={handleUnlock} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 w-full text-center text-sm font-semibold text-emerald-bright transition hover:text-gold-bright"
        >
          Show More
        </button>
      </div>
    </Modal>
  );
}

function RewardCta({ unlocked, onClick }: { unlocked: boolean; onClick: () => void }) {
  if (unlocked) {
    return (
      <span className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink-soft">
        Locked
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full bg-gradient-to-b from-emerald-bright to-emerald px-3.5 py-1.5 text-xs font-bold text-cream-surface transition hover:brightness-105"
    >
      Join &amp; Unlock
    </button>
  );
}
