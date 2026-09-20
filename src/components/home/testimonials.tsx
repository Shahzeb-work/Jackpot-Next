import { CheckCircleIcon, StarIcon } from "../icons";

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    initial: "M",
    quote:
      "Jackpot Rush is hands down the best social casino I've ever played. The game variety is incredible — new titles drop every week. Been playing for months and it just keeps getting better!",
  },
  {
    name: "Sofia R.",
    initial: "S",
    quote:
      "The customer support here is genuinely outstanding. I had a question about my Sweeps Coins and got a real, helpful response within minutes. You can tell they actually care about their players.",
  },
  {
    name: "Ashley M.",
    initial: "A",
    quote:
      "The VIP perks are next level! The more I play, the better the rewards get. Daily bonuses, exclusive offers — it genuinely feels like they value me as a player, not just another account.",
  },
  {
    name: "Ryan K.",
    initial: "R",
    quote:
      "Best social casino on mobile, period. Everything loads fast, the interface is smooth, and I can jump into any game in seconds. The daily Gold Coin bonuses make every single day feel fresh!",
  },
];

export default function Testimonials() {
  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 text-gold-bright">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-bright/60" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase">
            ★ Player Testimonials ★
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-bright/60" />
        </div>
        <h2 className="mt-4 font-display text-2xl tracking-wide text-ink-soft sm:text-3xl">
          The Players Have Spoken.
        </h2>
        <p className="font-display text-4xl tracking-wide sm:text-5xl">
          <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
            Real Reviews. Real Wins.
          </span>
        </p>
      </div>

      <div className="scrollbar-none mt-8 flex gap-4 overflow-x-auto pb-2">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="flex min-w-[280px] flex-1 flex-col gap-4 rounded-3xl border border-gold/25 bg-gradient-to-b from-cream-surface to-cream-surface-2 p-6 sm:min-w-[300px]"
          >
            <span className="font-display text-5xl leading-none text-gold-bright/30">&ldquo;</span>
            <p className="-mt-4 flex-1 text-sm text-ink-soft italic">{t.quote}</p>

            <div className="flex items-center gap-1 text-gold-bright">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-3.5" />
              ))}
              <span className="ml-1 text-xs font-bold text-ink-soft">5.0</span>
            </div>

            <div className="flex items-center gap-3 border-t border-line pt-4">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-bright to-gold text-sm font-bold text-cream">
                {t.initial}
              </span>
              <div>
                <p className="text-sm font-bold tracking-wide text-ink uppercase">{t.name}</p>
                <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-bright">
                  <CheckCircleIcon className="size-3.5" />
                  Verified Player
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
