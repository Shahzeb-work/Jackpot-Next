type IconProps = {
  className?: string;
};

const base = "1.8";

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 11.5 12 4l8 7.5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9a1 1 0 0 0 1 1h3.2v-5.2a1.8 1.8 0 0 1 1.8-1.8v0a1.8 1.8 0 0 1 1.8 1.8V20H17a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TierIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 4h10l1.5 5L12 20 5.5 9 7 4Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M5.5 9h13M9.5 4 12 9l2.5-5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="4"
        y="9"
        width="16"
        height="11"
        rx="1.2"
        stroke="currentColor"
        strokeWidth={base}
      />
      <path
        d="M4 9h16v3.2H4V9Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M12 9v11" stroke="currentColor" strokeWidth={base} />
      <path
        d="M12 9c0-2.2-1.6-4-3.5-4S6 6.3 6 7.6C6 8.9 7.3 9 8.5 9H12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M12 9c0-2.2 1.6-4 3.5-4S18 6.3 18 7.6c0 1.3-1.3 1.4-2.5 1.4H12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MedalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="14.5" r="5.5" stroke="currentColor" strokeWidth={base} />
      <path
        d="m9 4 3 6 3-6M9 4H6.5l3.3 6.6M15 4h2.5l-3.3 6.6"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M12 12.2v4.6M9.8 14.5h4.4" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function ReferIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth={base} />
      <path
        d="M4 20c0-3 2.2-5 5-5s5 2 5 5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
      <path d="M17 8v5M14.5 10.5h5" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function ProvidersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M4 13.2 12 17.7l8-4.5M4 8.5v4.7M20 8.5v4.7"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 5h2l1.6 10.2A2 2 0 0 0 9.6 17h7.3a2 2 0 0 0 2-1.6L20 8H6.4"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20.5" r="1.3" stroke="currentColor" strokeWidth={base} />
      <circle cx="17" cy="20.5" r="1.3" stroke="currentColor" strokeWidth={base} />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth={base} />
      <path d="m19 19-4-4" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function BellGiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="10" width="14" height="9.5" rx="1.2" stroke="currentColor" strokeWidth={base} />
      <path d="M5 10h14v2.8H5V10Z" stroke="currentColor" strokeWidth={base} strokeLinejoin="round" />
      <path d="M12 10v9.5" stroke="currentColor" strokeWidth={base} />
      <path
        d="M12 10c0-1.8-1.3-3.2-2.8-3.2S6.5 8 6.5 9.1c0 1 1 .9 1.9.9H12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M12 10c0-1.8 1.3-3.2 2.8-3.2S17.5 8 17.5 9.1c0 1-1 .9-1.9.9H12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m14.5 5.5-7 6.5 7 6.5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m9.5 5.5 7 6.5-7 6.5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2.5 14.8 9l7 .7-5.3 4.6 1.6 6.9L12 17.8 5.9 21.2l1.6-6.9L2.2 9.7l7-.7L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloverIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 12c-2.5-1.5-3-4.7-1-6.7s5.2-1.5 6.7 1c1.5-2.5 4.7-3 6.7-1s1.5 5.2-1 6.7c2.5 1.5 3 4.7 1 6.7s-5.2 1.5-6.7-1c-1.5 2.5-4.7 3-6.7 1s-1.5-5.2 1-6.7Z"
        fill="currentColor"
        transform="scale(0.72) translate(4.5 4.5)"
      />
      <path d="M12 12v9" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <circle cx="12" cy="12" r="6.4" fill="none" stroke="#fff8e6" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="1.5 2.4" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.4-3.6A7.9 7.9 0 0 1 4 12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M8.5 11.5h7M8.5 14h4.5" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m4 7.5 8-4 8 4-8 4-8-4Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M4 7.5V16l8 4 8-4V7.5M12 11.5V20"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}
