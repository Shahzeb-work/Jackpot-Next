const COLUMNS = [
  {
    title: "Play",
    links: ["Home", "VIP Tiers", "Promotions", "Providers"],
  },
  {
    title: "Account",
    links: ["Rewards", "Achievements", "Refer a Friend", "Support"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Policy", "Sweepstakes Rules", "Responsible Play"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-line bg-cream-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl tracking-wide text-gold-bright">
            JACKPOTRUSH<span className="text-ink-soft">.io</span>
          </span>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            A sweeps-coin rewards dashboard. Play for fun, climb the VIP
            tiers, and redeem prizes along the way.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold text-ink">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-ink-soft transition hover:text-gold-bright"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-xs text-ink-soft md:px-6">
        No purchase necessary. 18+. Play responsibly.
        © {new Date().getFullYear()} Jackpotrush.io. All rights reserved.
      </div>
    </footer>
  );
}
