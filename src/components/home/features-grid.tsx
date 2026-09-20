import { CrownIcon, DiceIcon, HeadsetIcon, ShieldCheckIcon } from "../icons";

const FEATURES = [
  {
    icon: ShieldCheckIcon,
    number: "01",
    title: "Fort Knox Security",
    text: "Bank-grade encryption keeps your account and coins locked tight — always.",
    tag: "100% Safe",
    accent: "#3B82F6",
  },
  {
    icon: HeadsetIcon,
    number: "02",
    title: "Always-On Support",
    text: "Live agents on standby 24/7 — no bots, no wait, just real help when you need it.",
    tag: "24 / 7",
    accent: "#A855F7",
  },
  {
    icon: DiceIcon,
    number: "03",
    title: "Fresh Games Every Week",
    text: "New slots, fish tables & instant-wins drop weekly so there's always something to chase.",
    tag: "3,000+ Games",
    accent: "#10B981",
  },
  {
    icon: CrownIcon,
    number: "04",
    title: "VIP That Actually Pays",
    text: "The more you play, the more you earn — bigger bonuses, faster rewards, elite status.",
    tag: "Exclusive Perks",
    accent: "#F59E0B",
  },
];

export default function FeaturesGrid() {
  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl tracking-wide text-ink sm:text-5xl">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
            Play &amp; Win
          </span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, number, title, text, tag, accent }) => (
          <div
            key={title}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-cream-surface transition hover:-translate-y-1"
          >
            <div
              className="relative flex flex-col items-center gap-3 px-4 pt-6 pb-8"
              style={{ background: `linear-gradient(180deg, ${accent}26, transparent)` }}
            >
              <span
                className="absolute top-3 right-3 font-display text-2xl"
                style={{ color: `${accent}55` }}
              >
                {number}
              </span>
              <span
                className="grid size-16 place-items-center rounded-full"
                style={{ background: `${accent}1f`, color: accent }}
              >
                <Icon className="size-7" />
              </span>
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
                style={{ background: `${accent}26`, color: accent }}
              >
                {tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 border-t border-line px-4 py-4">
              <p className="font-display text-lg tracking-wide text-ink">{title}</p>
              <p className="text-xs text-ink-soft">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
