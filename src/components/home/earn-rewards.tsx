import { CrownIcon, PercentBadgeIcon, ReferIcon, SpinWheelIcon } from "../icons";

const REWARDS = [
  {
    icon: ReferIcon,
    title: "Referral Bonus",
    desc: "Invite friends, earn extra coins.",
  },
  {
    icon: PercentBadgeIcon,
    title: "Rakeback",
    desc: "Get a % back on every play.",
  },
  {
    icon: SpinWheelIcon,
    title: "Daily Spin",
    desc: "Free coins waiting every day.",
  },
  {
    icon: CrownIcon,
    title: "Level Up Bonus",
    desc: "Unlock big rewards as you climb.",
  },
];

export default function EarnRewards() {
  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl tracking-wide text-ink sm:text-5xl">
          Earn Rewards
        </h2>
        <p className="mt-1 font-display text-2xl tracking-wide text-gold-bright italic">
          as You Play
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4">
        {REWARDS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-cream-surface p-5 text-center transition hover:-translate-y-1 hover:border-gold/50"
          >
            <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-gold-bright to-gold text-cream">
              <Icon className="size-6" />
            </span>
            <p className="font-display text-lg tracking-wide text-ink">{title}</p>
            <p className="text-xs text-ink-soft">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
