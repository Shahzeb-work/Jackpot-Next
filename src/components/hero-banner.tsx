import { ChevronLeftIcon, ChevronRightIcon, CloverIcon, StarIcon } from "./icons";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-deep/40 bg-gradient-to-br from-[#0d2c1f] via-emerald-deep to-emerald px-6 py-9 text-cream-surface sm:px-10 sm:py-12">
      <div className="chip-dots pointer-events-none absolute inset-0 opacity-[0.07]" />

      <CloverIcon className="pointer-events-none absolute right-[19%] top-8 size-9 text-emerald-bright/50 sm:right-[24%]" />
      <StarIcon className="pointer-events-none absolute right-[10%] top-20 size-6 text-gold-bright/70 animate-glow sm:right-[14%]" />
      <CloverIcon className="pointer-events-none absolute right-[6%] bottom-10 size-6 text-emerald-bright/40" />

      <div className="relative flex flex-col gap-5 sm:max-w-md">
        <span className="w-fit rounded-full border border-gold-bright/40 bg-cream-surface/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-gold-bright uppercase">
          Limited Time
        </span>

        <h1 className="font-display text-6xl leading-[0.9] tracking-wide text-cream-surface sm:text-7xl">
          VIP Rewards
        </h1>

        <p className="font-display text-3xl leading-tight tracking-wide sm:text-4xl">
          <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
            Earn up to 12% cashback
          </span>
        </p>
        <p className="-mt-3 text-sm text-cream-surface/75 sm:text-base">
          paid out weekly, plus bonus spins &amp; exclusive drops.
        </p>

        <a
          href="#"
          className="w-fit rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-2.5 text-sm font-bold text-ink shadow-md transition hover:brightness-105"
        >
          View Tiers
        </a>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={
                i === 0
                  ? "h-1.5 w-6 rounded-full bg-gold-bright"
                  : "h-1.5 w-1.5 rounded-full bg-cream-surface/30"
              }
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="grid size-8 place-items-center rounded-full border border-cream-surface/25 text-cream-surface/80 transition hover:border-gold-bright hover:text-gold-bright"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="grid size-8 place-items-center rounded-full border border-cream-surface/25 text-cream-surface/80 transition hover:border-gold-bright hover:text-gold-bright"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
