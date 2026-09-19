import { CartIcon, ChevronLeftIcon, ChevronRightIcon, CoinIcon } from "./icons";

const PACKAGES = [
  { coins: "5,000", price: "$4.99", bonus: "+500 bonus", tone: "from-emerald-bright to-emerald" },
  { coins: "12,000", price: "$9.99", bonus: "+1,500 bonus", tone: "from-gold-bright to-gold" },
  { coins: "25,000", price: "$19.99", bonus: "+3,750 bonus", tone: "from-emerald-bright to-emerald" },
  { coins: "60,000", price: "$44.99", bonus: "+10,000 bonus", tone: "from-gold-bright to-gold", featured: true },
  { coins: "125,000", price: "$89.99", bonus: "+22,000 bonus", tone: "from-emerald-bright to-emerald" },
  { coins: "260,000", price: "$179.99", bonus: "+50,000 bonus", tone: "from-gold-bright to-gold" },
];

export default function QuickBuy() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <CartIcon className="size-5 text-emerald" />
        <h2 className="font-display text-2xl tracking-wide text-ink sm:text-[28px]">
          Quick Buy
        </h2>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold text-emerald-deep transition hover:text-emerald"
          >
            View all
          </a>
          <div className="hidden gap-1.5 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              className="grid size-7 place-items-center rounded-full border border-line text-ink-soft transition hover:border-emerald hover:text-emerald"
            >
              <ChevronLeftIcon className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              className="grid size-7 place-items-center rounded-full border border-line text-ink-soft transition hover:border-emerald hover:text-emerald"
            >
              <ChevronRightIcon className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {PACKAGES.map((pack) => (
          <div
            key={pack.coins}
            className={
              "group relative flex flex-col items-center gap-3 rounded-2xl border bg-cream-surface p-4 pt-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg " +
              (pack.featured
                ? "border-gold/60 ring-1 ring-gold/40"
                : "border-line")
            }
          >
            {pack.featured && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-cream-surface uppercase">
                Best Value
              </span>
            )}

            <div
              className={`relative grid size-14 place-items-center rounded-full bg-gradient-to-br ${pack.tone} text-cream-surface shadow-inner`}
            >
              <CoinIcon className="size-8" />
              <span className="absolute inset-0 rounded-full border-2 border-dashed border-cream-surface/40" />
            </div>

            <div>
              <p className="font-mono text-sm font-bold text-ink">
                {pack.coins}
              </p>
              <p className="text-[11px] font-medium text-ink-soft">
                {pack.bonus}
              </p>
            </div>

            <button
              type="button"
              className="mt-1 w-full rounded-full bg-emerald px-3 py-1.5 text-sm font-bold text-cream-surface transition group-hover:bg-emerald-deep"
            >
              {pack.price}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
