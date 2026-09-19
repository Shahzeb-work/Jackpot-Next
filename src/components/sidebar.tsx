import {
  GiftIcon,
  HomeIcon,
  MedalIcon,
  PackageIcon,
  ProvidersIcon,
  ReferIcon,
  TierIcon,
} from "./icons";

const NAV_ITEMS = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "VIP Tiers", icon: TierIcon },
  { label: "Promotions", icon: GiftIcon },
  { label: "Achievements", icon: MedalIcon },
  { label: "Refer a Friend", icon: ReferIcon },
  { label: "Providers", icon: ProvidersIcon },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-line bg-cream-surface-2 px-3 py-5 lg:flex">
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
    </aside>
  );
}
