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

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={base} />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 20s-7.5-4.6-9.5-9.3C1.2 7.4 3 4.5 6.2 4.5c1.9 0 3.3 1 4.3 2.4C11.5 5.5 13 4.5 14.9 4.5c3.2 0 5 2.9 3.6 6.2C16.5 15.4 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m5.5 9.5 6.5 7 6.5-7"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 9 7 12l5-6.5L17 12l3.5-3v8.5h-17V9Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M4 19.5h16" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function HeadsetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 13v-1a8 8 0 1 1 16 0v1"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
      <rect x="3" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth={base} />
      <rect x="17" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth={base} />
      <path
        d="M19 19v.5a3 3 0 0 1-3 3h-2.5"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MagicHatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 15 8 4.5h8L18 15"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <ellipse cx="12" cy="15" rx="9" ry="2.3" stroke="currentColor" strokeWidth={base} />
      <path d="M9.5 8.5h5" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function SpinWheelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#f4c766" />
      <path d="M12 12 21 12A9 9 0 0 0 12 3Z" fill="#f4655a" />
      <path d="M12 12 17.5 4.5A9 9 0 0 0 6.5 4.5Z" fill="#f4c766" />
      <path d="M12 12 4.7 7.2A9 9 0 0 0 3 12Z" fill="#f4655a" />
      <path d="M12 12 3 12A9 9 0 0 0 8.5 20Z" fill="#f4c766" />
      <path d="M12 12 8.5 20A9 9 0 0 0 17.5 19.5Z" fill="#f4655a" />
      <path d="M12 12 21 12A9 9 0 0 1 17.5 19.5Z" fill="#3fae6a" />
      <circle cx="12" cy="12" r="2.6" fill="#0e0c09" />
      <circle cx="12" cy="12" r="1.3" fill="#f4c766" />
    </svg>
  );
}

export function ApplePayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M8.3 7.6c-.5.6-1.3 1-2 1-.1-.8.3-1.6.7-2.1.5-.6 1.3-1 2-1.1.1.8-.2 1.6-.7 2.2Zm.7 1.1c-1.1-.1-2 .6-2.6.6-.6 0-1.3-.6-2.2-.6-1.1 0-2.2.7-2.7 1.7-1.2 2-.3 5.1.8 6.7.6.8 1.2 1.7 2.1 1.7.8 0 1.1-.5 2.1-.5s1.3.5 2.2.5c.9 0 1.5-.8 2.1-1.7.6-.9.9-1.8 1-1.9-.1 0-1.9-.7-1.9-2.8 0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.4-1.1Z"
        fill="currentColor"
      />
      <path
        d="M14.5 6.8h2.4c1.6 0 2.7 1.1 2.7 2.7s-1.1 2.7-2.8 2.7h-1.4v2.7h-1v-8.1Zm1 .9v3.6h1.3c1.1 0 1.8-.7 1.8-1.8s-.7-1.8-1.8-1.8h-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GooglePayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M11.5 11.2v2.5h3.5c-.2 1-1.2 2.9-3.5 2.9-2.1 0-3.8-1.8-3.8-3.9s1.7-3.9 3.8-3.9c1.2 0 2 .5 2.4.9l1.6-1.6c-1-1-2.4-1.6-4-1.6-3.3 0-6 2.7-6 6s2.7 6 6 6c3.5 0 5.8-2.4 5.8-5.9 0-.4 0-.7-.1-1h-5.7Z"
        fill="currentColor"
      />
      <path
        d="M18.6 11.1h-.9V9.3h-1v1.8h-.9v.9h.9v2.7c0 .9.4 1.3 1.3 1.3.3 0 .5 0 .7-.1v-.9c-.1 0-.3.1-.5.1-.4 0-.5-.2-.5-.5v-2.6h.9v-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CashAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="currentColor" />
      <path
        d="M13.4 6.7c-.3-.3-.7-.5-1.1-.6l-.2-.9h-1.6l.2 1c-.4.1-.8.4-1.1.7-.5.6-.8 1.4-.6 2.2.3 1.3 1.4 1.6 2.4 1.9.9.3 1.4.5 1.5 1 .1.6-.4 1-1 1.1-.7.1-1.4-.2-1.8-.9l-1.5.7c.4.9 1.1 1.5 2 1.7l-.2 1h1.6l.2-.9c.5-.1 1-.3 1.3-.7.6-.6.9-1.5.7-2.3-.3-1.3-1.5-1.6-2.4-1.9-.9-.3-1.3-.5-1.4-.9-.1-.5.3-.9.9-1 .6-.1 1.2.2 1.5.7l1.5-.6c-.2-.5-.6-.9-1-1.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function CardPaymentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="currentColor" strokeWidth={base} />
      <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth={base} />
      <path d="M5.5 14.5h4" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8.2" r="3.4" stroke="currentColor" strokeWidth={base} />
      <path
        d="M5 20c.7-3.8 3.5-6 7-6s6.3 2.2 7 6"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 10.5c0-3.3 2.7-6 6-6s6 2.7 6 6v3.3l1.5 2.7h-15l1.5-2.7V10.5Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path
        d="M10 18.5a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth={base} />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 3l18 18M9.9 5.2A10.6 10.6 0 0 1 12 5c6 0 9.5 6.5 9.5 6.5a15 15 0 0 1-3.2 3.9M6.5 6.8C3.9 8.6 2.5 11.5 2.5 11.5S6 18 12 18a9.7 9.7 0 0 0 3.3-.6"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 12.6a2.6 2.6 0 0 0 3.5 3.4"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PercentBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={base} />
      <path d="m8.5 15.5 7-7" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      <circle cx="15" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth={base} />
      <path d="m4.5 6.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth={base} strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H9.3v2.8h2.4V21h2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M21.3 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.2a4.5 4.5 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.1 2.9-7.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.5c2.6 0 4.8-.9 6.4-2.3l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.4-3.9H3.4v2.5A9.5 9.5 0 0 0 12 21.5Z"
        fill="#34A853"
      />
      <path
        d="M6.6 13.8a5.7 5.7 0 0 1 0-3.6V7.7H3.4a9.5 9.5 0 0 0 0 8.6l3.2-2.5Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.3c1.4 0 2.7.5 3.7 1.4l2.7-2.7C16.8 3.4 14.6 2.5 12 2.5A9.5 9.5 0 0 0 3.4 7.7l3.2 2.5c.8-2.2 2.9-3.9 5.4-3.9Z"
        fill="#EA4335"
      />
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

export function ReceiptIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 3.5h12v17l-2.2-1.4-1.8 1.2-1.6-1.2-2 1.2-2.2-1.2L6 20.5v-17Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function GearIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth={base} />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.6 6.4l-1.6 1.6M8 16l-1.6 1.6M17.6 17.6 16 16M8 8 6.4 6.4"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12h11m0 0-3-3m3 3-3 3"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 8h13M13 4l4 4-4 4" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16H7M11 20l-4-4 4-4" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5 5 6v5.5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="m9 12 2.2 2.2L15.5 10" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EnvelopeCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth={base} />
      <path d="m4.5 6.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth={base} strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 3.5h6a1.2 1.2 0 0 1 1.2 1.2v14.6A1.2 1.2 0 0 1 13 20.5H7a1.2 1.2 0 0 1-1.2-1.2V4.7A1.2 1.2 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
      <path d="M9.5 17.2h1" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth={base} />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={base} />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export function XSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M5 4.5h3.6l4 5.4 4.3-5.4H19l-6 7.4 6.4 7.6h-3.6l-4.3-5.6-4.6 5.6H4.5l6.4-7.8L5 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={base} />
      <path
        d="m6.5 12.3 10.2-4.1c.5-.2.9.2.7.7l-1.8 8.3c-.1.6-.7.8-1.2.5l-2.8-2.1-1.5 1.5c-.2.2-.5.2-.6-.1l-.4-2.4 6.3-5.9-7.3 4.6-1.6-.5c-.6-.2-.6-.6 0-.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={base} />
      <path d="m8 12.3 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneRingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 4.5h2.2l1.3 3.6-1.6 1.6a11 11 0 0 0 5.4 5.4l1.6-1.6 3.6 1.3V17c0 1.4-1.1 2.5-2.5 2.4-6.4-.5-11.5-5.6-12-12C3.5 5.6 4.6 4.5 6 4.5Z"
        stroke="currentColor"
        strokeWidth={base}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DiceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth={base} />
      <circle cx="8.2" cy="8.2" r="1.3" fill="currentColor" />
      <circle cx="15.8" cy="8.2" r="1.3" fill="currentColor" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <circle cx="8.2" cy="15.8" r="1.3" fill="currentColor" />
      <circle cx="15.8" cy="15.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function IdCardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.8" stroke="currentColor" strokeWidth={base} />
      <circle cx="8" cy="11.2" r="1.8" stroke="currentColor" strokeWidth={base} />
      <path d="M5.3 15.5c.4-1.5 1.5-2.3 2.7-2.3s2.3.8 2.7 2.3" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
      <path d="M14.5 10h4.2M14.5 13h4.2" stroke="currentColor" strokeWidth={base} strokeLinecap="round" />
    </svg>
  );
}
