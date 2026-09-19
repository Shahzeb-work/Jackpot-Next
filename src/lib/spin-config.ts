export const SPIN_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export type SpinPrize = {
  label: string;
  goldCoins: number;
  sweepsCoins: number;
  weight: number;
};

export const SPIN_PRIZES: SpinPrize[] = [
  { label: "500 GC", goldCoins: 500, sweepsCoins: 0, weight: 24 },
  { label: "1 SC", goldCoins: 0, sweepsCoins: 1, weight: 6 },
  { label: "1,000 GC", goldCoins: 1000, sweepsCoins: 0, weight: 18 },
  { label: "2,500 GC", goldCoins: 2500, sweepsCoins: 0, weight: 10 },
  { label: "2 SC", goldCoins: 0, sweepsCoins: 2, weight: 3 },
  { label: "250 GC", goldCoins: 250, sweepsCoins: 0, weight: 28 },
  { label: "5,000 GC", goldCoins: 5000, sweepsCoins: 0, weight: 5 },
  { label: "5 SC", goldCoins: 0, sweepsCoins: 5, weight: 1 },
];
