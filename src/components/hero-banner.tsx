"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloverIcon, StarIcon } from "./icons";
import { useAppState } from "./providers/app-state";

const AUTOPLAY_MS = 3000;

const SLIDES = [
  {
    badge: "Limited Time",
    title: "VIP Rewards",
    highlight: "Earn up to 12% cashback",
    description: "paid out weekly, plus bonus spins & exclusive drops.",
    cta: "View Tiers",
    action: "tiers" as const,
  },
  {
    badge: "Daily Freebie",
    title: "Spin & Win",
    highlight: "Free GC & SC every day",
    description: "spin the wheel once every 24 hours, totally free.",
    cta: "Spin Now",
    action: "spin" as const,
  },
  {
    badge: "New Player",
    title: "Welcome Bonus",
    highlight: "Up to 550,000 GC & 5 SC",
    description: "sign up in seconds and claim your bonus instantly.",
    cta: "Join Now",
    action: "join" as const,
  },
  {
    badge: "Share & Earn",
    title: "Refer a Friend",
    highlight: "Get rewarded for every invite",
    description: "share your link and earn bonus coins together.",
    cta: "Refer Now",
    action: "refer" as const,
  },
];

export default function HeroBanner() {
  const { user, openSpin, openSignIn, openSignUp, openRewards } = useAppState();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [paused, active]);

  function goTo(index: number) {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  function handleCta(action: (typeof SLIDES)[number]["action"]) {
    switch (action) {
      case "spin":
        if (user) {
          openSpin();
        } else {
          openSignIn();
        }
        break;
      case "join":
        openSignUp();
        break;
      case "refer":
        openRewards();
        break;
      case "tiers":
        break;
    }
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#0c0905] via-[#5c4013] to-[#e0ac48] px-6 py-9 text-ink shadow-[0_0_60px_-18px_rgba(212,175,55,0.45)] sm:px-10 sm:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="chip-dots pointer-events-none absolute inset-0 opacity-[0.07]" />

      <CloverIcon className="pointer-events-none absolute right-[19%] top-8 size-9 text-emerald-bright/50 sm:right-[24%]" />
      <StarIcon className="pointer-events-none absolute right-[10%] top-20 size-6 text-gold-bright/70 animate-glow sm:right-[14%]" />
      <CloverIcon className="pointer-events-none absolute right-[6%] bottom-10 size-6 text-emerald-bright/40" />

      <div className="relative min-h-[215px] sm:max-w-md sm:min-h-[235px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            aria-hidden={i !== active}
            className={
              "flex flex-col gap-5 transition-opacity duration-500 " +
              (i === active
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0")
            }
          >
            <span className="w-fit rounded-full border border-gold-bright/40 bg-ink/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-gold-bright uppercase">
              {slide.badge}
            </span>

            <h1 className="font-display text-6xl leading-[0.9] tracking-wide text-ink sm:text-7xl">
              {slide.title}
            </h1>

            <p className="font-display text-3xl leading-tight tracking-wide sm:text-4xl">
              <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </p>
            <p className="-mt-3 text-sm text-ink/70 sm:text-base">{slide.description}</p>

            <button
              type="button"
              onClick={() => handleCta(slide.action)}
              className="w-fit rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-2.5 text-sm font-bold text-cream shadow-md transition hover:brightness-105"
            >
              {slide.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex gap-2.5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={
                "relative overflow-hidden rounded-full bg-ink/20 transition-all " +
                (i === active ? "h-3 w-14" : "h-3 w-3 hover:bg-ink/35")
              }
            >
              {i === active && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-gold-bright"
                  style={{
                    animation: `slide-progress ${AUTOPLAY_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="grid size-8 place-items-center rounded-full border border-black/30 bg-black/10 text-black transition hover:border-black hover:bg-black hover:text-gold-bright"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="grid size-8 place-items-center rounded-full border border-black/30 bg-black/10 text-black transition hover:border-black hover:bg-black hover:text-gold-bright"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
