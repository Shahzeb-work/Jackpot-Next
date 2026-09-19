"use client";

import { useTransition } from "react";
import Link from "next/link";
import { BellGiftIcon, ChevronLeftIcon, SearchIcon } from "./icons";
import { useAppState } from "./providers/app-state";
import { signOutAction } from "@/lib/actions/auth";

export default function Header() {
  const { user, setUser, openSignIn, openSignUp, openRewards } = useAppState();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await signOutAction();
      setUser(null);
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-backdrop-blur:bg-cream/80">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          aria-label="Back"
          className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition hover:border-emerald hover:text-emerald"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <Link href="/" className="flex items-center gap-2 pr-2">
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-gold-bright to-gold text-cream">
            <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden>
              <path
                d="M12 2.5c1.9 2 3.6 4.4 3.6 7.3a3.6 3.6 0 1 1-7.2 0c0-2.9 1.7-5.3 3.6-7.3Z"
                fill="currentColor"
              />
              <path
                d="M6 21c1.2-4.5 3.4-6.6 6-6.6s4.8 2.1 6 6.6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-display text-2xl leading-none tracking-wide text-gold-bright">
            JACKPOTRUSH<span className="text-ink-soft">.io</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition hover:border-emerald hover:text-emerald"
          >
            <SearchIcon className="size-4.5" />
          </button>

          <button
            type="button"
            onClick={openRewards}
            className="relative hidden items-center gap-2 rounded-full border border-line bg-cream-surface px-3.5 py-2 text-sm font-medium text-ink transition hover:border-emerald sm:flex"
          >
            <BellGiftIcon className="size-4.5 text-emerald" />
            Rewards
            <span className="absolute -top-1.5 -right-1.5 grid size-4.5 place-items-center rounded-full bg-gold text-[10px] font-bold text-cream-surface">
              1
            </span>
          </button>

          {user ? (
            <>
              <span className="hidden max-w-[10rem] truncate text-sm font-semibold text-ink sm:block">
                {user.username ?? user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isPending}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-emerald hover:text-emerald-bright disabled:opacity-60"
              >
                {isPending ? "Signing Out…" : "Sign Out"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={openSignIn}
                className="hidden rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-emerald hover:text-emerald-bright sm:block"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={openSignUp}
                className="rounded-full bg-gradient-to-b from-gold-bright to-gold px-4 py-2 text-sm font-bold text-cream shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition hover:brightness-105 md:px-5"
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
