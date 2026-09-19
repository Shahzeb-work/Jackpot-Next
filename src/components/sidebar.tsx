"use client";

import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ClockIcon,
  CrownIcon,
  GiftIcon,
  HeadsetIcon,
  HeartIcon,
  HomeIcon,
  MagicHatIcon,
  MedalIcon,
  PackageIcon,
  ProvidersIcon,
  ReferIcon,
  SpinWheelIcon,
  TierIcon,
} from "./icons";
import { useAppState } from "./providers/app-state";
import { SPIN_COOLDOWN_MS } from "@/lib/spin-config";

const NAV_ITEMS = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "VIP Tiers", icon: TierIcon },
  { label: "Promotions", icon: GiftIcon },
  { label: "Achievements", icon: MedalIcon },
  { label: "Refer a Friend", icon: ReferIcon },
  { label: "Providers", icon: ProvidersIcon },
];

const LOGGED_IN_GROUPS: { label: string; icon: typeof HomeIcon; active?: boolean }[][] = [
  [
    { label: "Home", icon: HomeIcon, active: true },
    { label: "Recent Games", icon: ClockIcon },
    { label: "Favorite Games", icon: HeartIcon },
  ],
  [
    { label: "VIP Tiers", icon: TierIcon },
    { label: "Refer a Friend", icon: ReferIcon },
    { label: "Achievements", icon: MedalIcon },
  ],
  [
    { label: "Promotions", icon: GiftIcon },
    { label: "Providers", icon: ProvidersIcon },
    { label: "Contact us", icon: HeadsetIcon },
  ],
];

const TOP_CATEGORIES = [
  { label: "Jackpotrush Choice", icon: MagicHatIcon },
  { label: "BGaming Highlights", icon: null },
];

function formatCountdown(ms: number) {
  if (ms <= 0) return "00d 00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(d).padStart(2, "0")}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function NavList({ items }: { items: { label: string; icon: typeof HomeIcon; active?: boolean }[] }) {
  return (
    <nav className="flex flex-col gap-1 rounded-2xl border border-line bg-cream-surface p-2">
      {items.map(({ label, icon: Icon, active }) => (
        <a
          key={label}
          href="#"
          aria-current={active ? "page" : undefined}
          className={
            active
              ? "flex items-center gap-3 rounded-xl bg-emerald px-3.5 py-2.5 text-sm font-semibold text-cream-surface shadow-sm"
              : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          }
        >
          <Icon className="size-5 shrink-0" />
          {label}
        </a>
      ))}
    </nav>
  );
}

function LoggedInSidebar() {
  const { user, openSpin, openPackagesList } = useAppState();
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const nextAvailableAt = user?.lastSpinAt
    ? new Date(user.lastSpinAt).getTime() + SPIN_COOLDOWN_MS
    : null;
  const msRemaining = nextAvailableAt && now ? nextAvailableAt - now : 0;
  const spinReady = now !== null && (!nextAvailableAt || msRemaining <= 0);

  return (
    <nav className="flex flex-col gap-3">
      <button
        type="button"
        onClick={openSpin}
        className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-[#0c0905] to-[#241a08] p-4 text-left shadow-[0_0_30px_-12px_rgba(244,199,102,0.5)] transition hover:border-gold"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg tracking-wide text-ink">Spin &amp; Win!</p>
          <p className="mt-1 font-mono text-xs font-bold text-gold-bright">
            {now === null ? " " : spinReady ? "Spin available now!" : formatCountdown(msRemaining)}
          </p>
        </div>
        <SpinWheelIcon className="size-14 shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition group-hover:scale-105" />
      </button>

      <NavList items={LOGGED_IN_GROUPS[0]} />
      <NavList items={LOGGED_IN_GROUPS[1]} />
      <NavList items={LOGGED_IN_GROUPS[2]} />

      <div className="rounded-2xl border border-line bg-cream-surface p-2">
        <button
          type="button"
          onClick={() => setCategoriesOpen((v) => !v)}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink"
        >
          <CrownIcon className="size-5 shrink-0 text-gold-bright" />
          <span className="flex-1 text-left">top-categories</span>
          <ChevronDownIcon
            className={"size-4 shrink-0 transition " + (categoriesOpen ? "rotate-180" : "")}
          />
        </button>

        {categoriesOpen && (
          <div className="flex flex-col gap-1 pt-1">
            {TOP_CATEGORIES.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
              >
                {Icon ? (
                  <Icon className="size-5 shrink-0" />
                ) : (
                  <span className="grid size-5 shrink-0 place-items-center rounded bg-ink-soft/20 text-[10px] font-bold">
                    B
                  </span>
                )}
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={openPackagesList}
        className="mt-1 rounded-2xl border border-gold/30 bg-gradient-to-br from-emerald-deep to-emerald p-4 text-left text-cream-surface transition hover:brightness-105"
      >
        <span className="grid size-9 place-items-center rounded-full bg-gold-bright/90 text-emerald-deep">
          <PackageIcon className="size-5" />
        </span>
        <p className="mt-3 text-sm font-bold">Get Packages</p>
        <p className="text-xs text-cream-surface/75">Boost up your play</p>
      </button>
    </nav>
  );
}

export default function Sidebar() {
  const { user } = useAppState();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-cream-surface-2 px-3 py-5 lg:flex">
      {user ? (
        <LoggedInSidebar />
      ) : (
        <>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href="#"
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center gap-3 rounded-xl bg-emerald px-3.5 py-2.5 text-sm font-semibold text-cream-surface shadow-sm"
                    : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-cream-surface hover:text-ink"
                }
              >
                <Icon className="size-5 shrink-0" />
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-gold/30 bg-gradient-to-br from-emerald-deep to-emerald p-4 text-cream-surface">
            <span className="grid size-9 place-items-center rounded-full bg-gold-bright/90 text-emerald-deep">
              <PackageIcon className="size-5" />
            </span>
            <p className="mt-3 text-sm font-bold">Get Packages</p>
            <p className="text-xs text-cream-surface/75">Boost up your play</p>
          </div>
        </>
      )}
    </aside>
  );
}
