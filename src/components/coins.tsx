import { useId } from "react";

type CoinProps = {
  className?: string;
};

export function GCCoinIcon({ className }: CoinProps) {
  const id = useId();
  const face = `gc-face-${id}`;
  const rim = `gc-rim-${id}`;
  const shine = `gc-shine-${id}`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id={face} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff6da" />
          <stop offset="32%" stopColor="#f8d778" />
          <stop offset="68%" stopColor="#dba63c" />
          <stop offset="100%" stopColor="#a97c22" />
        </radialGradient>
        <linearGradient id={rim} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff0c2" />
          <stop offset="50%" stopColor="#c1922f" />
          <stop offset="100%" stopColor="#6b4a12" />
        </linearGradient>
        <radialGradient id={shine} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#${rim})`} />
      <circle
        cx="32"
        cy="32"
        r="26.5"
        fill="none"
        stroke="#6b4a12"
        strokeOpacity="0.55"
        strokeWidth="2.2"
        strokeDasharray="2.6 2.9"
      />
      <circle cx="32" cy="32" r="24" fill={`url(#${face})`} />
      <ellipse
        cx="24"
        cy="21"
        rx="12"
        ry="7"
        fill={`url(#${shine})`}
        transform="rotate(-24 24 21)"
      />

      <text
        x="32"
        y="39.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#fff3cf"
        opacity="0.9"
      >
        GC
      </text>
      <text
        x="32"
        y="38.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#6b4a12"
      >
        GC
      </text>
    </svg>
  );
}

export function SCCoinIcon({ className }: CoinProps) {
  const id = useId();
  const face = `sc-face-${id}`;
  const rim = `sc-rim-${id}`;
  const shine = `sc-shine-${id}`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id={face} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="32%" stopColor="#eef1f4" />
          <stop offset="68%" stopColor="#b9c2cb" />
          <stop offset="100%" stopColor="#828b93" />
        </radialGradient>
        <linearGradient id={rim} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f7f9" />
          <stop offset="50%" stopColor="#9aa3ab" />
          <stop offset="100%" stopColor="#4a5158" />
        </linearGradient>
        <radialGradient id={shine} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#${rim})`} stroke="#4a5158" strokeOpacity="0.4" />
      <circle
        cx="32"
        cy="32"
        r="26.5"
        fill="none"
        stroke="#4a5158"
        strokeOpacity="0.45"
        strokeWidth="2.2"
        strokeDasharray="2.6 2.9"
      />
      <circle cx="32" cy="32" r="24" fill={`url(#${face})`} />
      <ellipse
        cx="24"
        cy="21"
        rx="12"
        ry="7"
        fill={`url(#${shine})`}
        transform="rotate(-24 24 21)"
      />

      <text
        x="32"
        y="39.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#ffffff"
        opacity="0.9"
      >
        SC
      </text>
      <text
        x="32"
        y="38.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#3f464d"
      >
        SC
      </text>
    </svg>
  );
}
