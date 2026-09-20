"use client";

import {
  ChatIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneRingIcon,
  TelegramIcon,
  XSocialIcon,
} from "./icons";
import { showIntercom } from "@/lib/intercom";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Play",
    links: [
      { label: "Home", href: "#" },
      { label: "VIP Tiers", href: "#" },
      { label: "Promotions", href: "#" },
      { label: "Providers", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Rewards", href: "#" },
      { label: "Achievements", href: "#" },
      { label: "Refer a Friend", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms-of-use.pdf", external: true },
      { label: "Privacy Policy", href: "/legal/privacy-policy.pdf", external: true },
      { label: "Responsible Gaming", href: "/legal/responsible-gameplay.pdf", external: true },
      { label: "AML / CTF Policy", href: "/legal/aml-policy.pdf", external: true },
      { label: "Refund & Cancellation", href: "/legal/refund-cancellation.pdf", external: true },
      { label: "Official Rules", href: "/legal/official-rules.pdf", external: true },
      { label: "SSL Policy", href: "/legal/ssl-policy.pdf", external: true },
      { label: "Promotion Policy", href: "/legal/promotion-policy.pdf", external: true },
      { label: "About Us", href: "/legal/about-us.pdf", external: true },
    ],
  },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: XSocialIcon, label: "X" },
  { icon: TelegramIcon, label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-line bg-cream-surface-2">
      <div className="h-1 bg-gradient-to-r from-gold-bright via-gold to-emerald-bright" />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-3 md:px-6 xl:grid-cols-5">
        <div className="col-span-2 xl:col-span-1">
          <span className="font-display text-2xl tracking-wide text-gold-bright">
            JACKPOTRUSH<span className="text-ink-soft">.io</span>
          </span>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Proudly built for players who want a world-class social casino experience. Spin
            3,000+ premium games, collect daily bonuses, and compete for massive rewards — all
            completely free to play.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition hover:border-gold hover:text-gold-bright"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold text-ink">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-ink-soft transition hover:text-gold-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-bold text-ink">Get in Touch</p>
          <ul className="mt-3 flex flex-col gap-3">
            <li>
              <p className="text-xs text-ink-soft">Phone</p>
              <a
                href="tel:+19402051160"
                className="flex items-center gap-1.5 text-sm text-ink transition hover:text-gold-bright"
              >
                <PhoneRingIcon className="size-3.5 shrink-0 text-gold-bright" />
                +1 940 205 1160
              </a>
            </li>
            <li>
              <p className="text-xs text-ink-soft">Live Chat</p>
              <button
                type="button"
                onClick={showIntercom}
                className="flex items-center gap-1.5 text-sm text-ink transition hover:text-gold-bright"
              >
                <ChatIcon className="size-3.5 shrink-0 text-gold-bright" />
                Start Chat
              </button>
            </li>
            <li>
              <p className="text-xs text-ink-soft">Support</p>
              <a
                href="mailto:support@jackpotrush.io"
                className="flex items-center gap-1.5 text-sm text-ink transition hover:text-gold-bright"
              >
                <MailIcon className="size-3.5 shrink-0 text-gold-bright" />
                support@jackpotrush.io
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 md:px-6">
        <p className="mx-auto max-w-4xl text-center text-[11px] tracking-wide text-ink-soft uppercase">
          No purchase or payment necessary to enter, participate, or win. A purchase will not
          increase your chances of winning. 18+. Void where prohibited.
        </p>
        <p className="mt-2 text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} Jackpotrush.io. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
