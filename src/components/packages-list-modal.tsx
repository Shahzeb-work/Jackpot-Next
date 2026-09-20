"use client";

import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import { CloseIcon } from "./icons";
import { GET_PACKAGES, type PackageBadge } from "@/lib/packages";

const BADGE_STYLES: Record<PackageBadge, { chip: string; ring: string }> = {
  NEW: { chip: "bg-sky-500", ring: "border-sky-500/60 ring-1 ring-sky-500/30" },
  POPULAR: { chip: "bg-purple-500", ring: "border-purple-500/60 ring-1 ring-purple-500/30" },
  SALE: { chip: "bg-rose-500", ring: "border-rose-500/60 ring-1 ring-rose-500/30" },
};

export default function PackagesListModal() {
  const { modal, closeModal, openPackagesCheckout, user, openSignIn } = useAppState();
  const open = modal?.type === "packages-list";

  function handleSelect(pkg: (typeof GET_PACKAGES)[number]) {
    if (!user) {
      openSignIn();
      return;
    }
    openPackagesCheckout({ id: pkg.id, coins: pkg.coins, bonus: pkg.bonus, price: pkg.price });
  }

  return (
    <Modal open={open} onClose={closeModal} panelClassName="w-full max-w-md">
      <div className="flex max-h-[85vh] flex-col rounded-3xl border border-line bg-cream-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ink">Get Packages</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto pt-3 pr-1">
          {GET_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => handleSelect(pkg)}
              className={
                "relative flex items-center justify-between rounded-2xl border bg-cream-surface-2 px-4 py-3.5 text-left transition hover:-translate-y-0.5 " +
                (pkg.badge ? BADGE_STYLES[pkg.badge].ring : "border-line")
              }
            >
              {pkg.badge && (
                <span
                  className={
                    "absolute -top-2.5 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase " +
                    BADGE_STYLES[pkg.badge].chip
                  }
                >
                  {pkg.badge}
                </span>
              )}

              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <GCCoinIcon className="size-6 shrink-0" />
                {pkg.coins}
              </div>

              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-bright">
                <SCCoinIcon className="size-6 shrink-0" />
                {pkg.bonus} <span className="font-semibold">free</span>
              </div>

              <span className="relative shrink-0 rounded-full bg-gradient-to-b from-emerald-bright to-emerald px-3.5 py-1.5 text-sm font-bold text-cream-surface">
                {pkg.originalPrice && (
                  <span className="absolute -top-2.5 right-1 text-[10px] font-semibold text-ink-soft line-through">
                    {pkg.originalPrice}
                  </span>
                )}
                {pkg.price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
