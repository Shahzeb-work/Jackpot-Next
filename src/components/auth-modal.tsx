"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { signInAction, signUpAction } from "@/lib/actions/auth";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import { CloseIcon, CloverIcon, EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon, StarIcon } from "./icons";

export default function AuthModal() {
  const { modal, closeModal, setAuthTab, setUser } = useAppState();
  const open = modal?.type === "auth";
  const tab = modal?.type === "auth" ? modal.tab : "signin";

  return (
    <Modal open={open} onClose={closeModal} panelClassName="w-full max-w-3xl">
      <div className="flex overflow-hidden rounded-3xl border border-line bg-cream-surface shadow-2xl">
        <PromoPanel />

        <div className="flex w-full flex-col p-6 sm:w-[380px] sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex rounded-full border border-line bg-cream-surface-2 p-1">
              <button
                type="button"
                onClick={() => setAuthTab("signin")}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition " +
                  (tab === "signin"
                    ? "bg-gradient-to-b from-emerald-bright to-emerald text-cream-surface"
                    : "text-ink-soft hover:text-ink")
                }
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("signup")}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition " +
                  (tab === "signup"
                    ? "bg-gradient-to-b from-emerald-bright to-emerald text-cream-surface"
                    : "text-ink-soft hover:text-ink")
                }
              >
                Sign Up
              </button>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
            >
              <CloseIcon className="size-4.5" />
            </button>
          </div>

          {tab === "signin" ? (
            <SignInForm onSuccess={(user) => { setUser(user); closeModal(); }} />
          ) : (
            <SignUpForm onSuccess={(user) => { setUser(user); closeModal(); }} />
          )}

          <SocialRow />
        </div>
      </div>
    </Modal>
  );
}

function PromoPanel() {
  return (
    <div className="relative hidden w-[260px] shrink-0 flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#0c0905] via-[#4a3411] to-[#8a641f] px-5 py-7 text-center sm:flex">
      <div className="chip-dots pointer-events-none absolute inset-0 opacity-[0.06]" />
      <CloverIcon className="pointer-events-none absolute left-6 top-16 size-7 text-emerald-bright/40" />
      <StarIcon className="pointer-events-none absolute right-5 top-28 size-5 text-gold-bright/60 animate-glow" />
      <CloverIcon className="pointer-events-none absolute right-7 bottom-24 size-6 text-emerald-bright/30" />

      <div className="relative">
        <p className="font-display text-3xl leading-none tracking-wide text-emerald-bright">
          Jackpotrush
        </p>
        <p className="mt-1 font-display text-sm tracking-[0.3em] text-ink uppercase">
          Welcome Bonus
        </p>
      </div>

      <div className="relative grid size-24 place-items-center">
        <GCCoinIcon className="absolute -left-2 -top-1 size-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
        <SCCoinIcon className="absolute -right-3 bottom-0 size-14 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
      </div>

      <div className="relative">
        <p className="text-xs font-bold tracking-[0.2em] text-ink/80 uppercase">Up To</p>
        <p className="font-display text-4xl leading-none tracking-wide text-gold-bright">
          550,000 GC
        </p>
        <p className="font-display text-2xl leading-tight tracking-wide text-ink">&amp; 5 SC</p>
        <p className="mt-1 text-xs font-bold tracking-[0.2em] text-ink/80 uppercase">For Free</p>
      </div>
    </div>
  );
}

function SocialRow() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-line" />
        or Login With
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="grid size-10 place-items-center rounded-full border border-line bg-cream-surface-2 text-ink-soft opacity-60"
        >
          <FacebookIcon className="size-4.5" />
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="grid size-10 place-items-center rounded-full border border-line bg-cream-surface-2 text-ink-soft opacity-60"
        >
          <GoogleIcon className="size-4.5" />
        </button>
      </div>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 pr-11 text-sm text-ink placeholder:text-ink-soft focus:border-emerald focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft transition hover:text-ink"
      >
        {visible ? <EyeOffIcon className="size-4.5" /> : <EyeIcon className="size-4.5" />}
      </button>
    </div>
  );
}

function SignInForm({ onSuccess }: { onSuccess: (user: { id: string; email: string; username: string | null }) => void }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signInAction({ identifier, password });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSuccess(result.user);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <input
        type="text"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        placeholder="Username or email"
        autoComplete="username"
        required
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-emerald focus:outline-none"
      />

      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Password"
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-soft">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="size-4 rounded border-line accent-emerald"
          />
          Remember Me
        </label>
        <button type="button" className="font-semibold text-emerald-bright transition hover:text-gold-bright">
          Forgot password?
        </button>
      </div>

      {error && <p className="text-sm font-medium text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 w-full rounded-xl bg-gradient-to-b from-gold-bright to-gold py-3 text-sm font-bold text-cream shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition hover:brightness-105 disabled:opacity-60"
      >
        {isPending ? "Signing In…" : "Sign In"}
      </button>
    </form>
  );
}

function SignUpForm({ onSuccess }: { onSuccess: (user: { id: string; email: string; username: string | null }) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signUpAction({ email, password, confirmPassword, agreedToTerms });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSuccess(result.user);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        autoComplete="email"
        required
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-emerald focus:outline-none"
      />

      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="Password"
        autoComplete="new-password"
      />

      <PasswordInput
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Password confirmation"
        autoComplete="new-password"
      />

      <label className="flex items-start gap-2.5 text-xs text-ink-soft">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(event) => setAgreedToTerms(event.target.checked)}
          required
          className="mt-0.5 size-4 shrink-0 rounded border-line accent-emerald"
        />
        I confirm that I am at least 21 years old, agree to the Terms and Conditions,
        Sweepstakes Rules, and Privacy Policy, and am not located in or a resident of a
        Prohibited State.
      </label>

      {error && <p className="text-sm font-medium text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 w-full rounded-xl bg-gradient-to-b from-gold-bright to-gold py-3 text-sm font-bold text-cream shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition hover:brightness-105 disabled:opacity-60"
      >
        {isPending ? "Signing Up…" : "Sign Up"}
      </button>
    </form>
  );
}
