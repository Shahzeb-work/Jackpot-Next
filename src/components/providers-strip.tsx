import { ProvidersIcon } from "./icons";

const PROVIDERS = [
  "Pragmatic Play",
  "Hacksaw Gaming",
  "Nolimit City",
  "Relax Gaming",
  "Evolution",
  "Push Gaming",
];

export default function ProvidersStrip() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <ProvidersIcon className="size-5 text-emerald" />
        <h2 className="font-display text-2xl tracking-wide text-ink sm:text-[28px]">
          Providers
        </h2>
        <a
          href="#"
          className="ml-auto text-sm font-semibold text-emerald-deep transition hover:text-emerald"
        >
          View all
        </a>
      </div>

      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {PROVIDERS.map((name) => (
          <div
            key={name}
            className="flex h-16 min-w-[10rem] shrink-0 items-center justify-center rounded-2xl border border-line bg-cream-surface px-5 text-sm font-semibold text-ink-soft transition hover:border-gold hover:text-emerald-deep"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
