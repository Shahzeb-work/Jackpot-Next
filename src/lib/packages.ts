export type PackageBadge = "NEW" | "POPULAR" | "SALE";

export type CoinPackageDef = {
  id: string;
  coins: string;
  bonus: string;
  price: string;
  goldCoins: number;
  sweepsCoins: number;
  priceCents: number;
  originalPrice?: string;
  badge?: PackageBadge;
};

export const GET_PACKAGES: CoinPackageDef[] = [
  {
    id: "gc-90k",
    coins: "90,000",
    bonus: "18",
    price: "$8.99",
    originalPrice: "$18",
    badge: "NEW",
    goldCoins: 90_000,
    sweepsCoins: 18,
    priceCents: 899,
  },
  {
    id: "gc-150k",
    coins: "150,000",
    bonus: "30",
    price: "$14.99",
    originalPrice: "$30",
    badge: "POPULAR",
    goldCoins: 150_000,
    sweepsCoins: 30,
    priceCents: 1499,
  },
  {
    id: "gc-300k",
    coins: "300,000",
    bonus: "60",
    price: "$29.99",
    originalPrice: "$60",
    badge: "SALE",
    goldCoins: 300_000,
    sweepsCoins: 60,
    priceCents: 2999,
  },
  {
    id: "gc-50k",
    coins: "50,000",
    bonus: "5",
    price: "$4.99",
    goldCoins: 50_000,
    sweepsCoins: 5,
    priceCents: 499,
  },
  {
    id: "gc-500k",
    coins: "500,000",
    bonus: "50",
    price: "$49.99",
    goldCoins: 500_000,
    sweepsCoins: 50,
    priceCents: 4999,
  },
  {
    id: "gc-1m",
    coins: "1,000,000",
    bonus: "101",
    price: "$99.99",
    originalPrice: "$101",
    goldCoins: 1_000_000,
    sweepsCoins: 101,
    priceCents: 9999,
  },
  {
    id: "gc-2m",
    coins: "2,000,000",
    bonus: "202",
    price: "$199.99",
    originalPrice: "$202",
    goldCoins: 2_000_000,
    sweepsCoins: 202,
    priceCents: 19_999,
  },
  {
    id: "gc-5m",
    coins: "5,000,000",
    bonus: "510",
    price: "$499.99",
    originalPrice: "$510",
    goldCoins: 5_000_000,
    sweepsCoins: 510,
    priceCents: 49_999,
  },
];

export type QuickBuyPackageDef = {
  id: string;
  coins: string;
  bonus: string;
  price: string;
  priceCents: number;
  goldCoins: number;
  sweepsCoins: number;
  featured?: boolean;
};

export const QUICK_BUY_PACKAGES: QuickBuyPackageDef[] = [
  { id: "qb-5k", coins: "5,000", price: "$4.99", bonus: "500", priceCents: 499, goldCoins: 5_000, sweepsCoins: 500 },
  { id: "qb-12k", coins: "12,000", price: "$9.99", bonus: "1,500", priceCents: 999, goldCoins: 12_000, sweepsCoins: 1_500 },
  { id: "qb-25k", coins: "25,000", price: "$19.99", bonus: "3,750", priceCents: 1999, goldCoins: 25_000, sweepsCoins: 3_750 },
  {
    id: "qb-60k",
    coins: "60,000",
    price: "$44.99",
    bonus: "10,000",
    priceCents: 4499,
    goldCoins: 60_000,
    sweepsCoins: 10_000,
    featured: true,
  },
  { id: "qb-125k", coins: "125,000", price: "$89.99", bonus: "22,000", priceCents: 8999, goldCoins: 125_000, sweepsCoins: 22_000 },
  { id: "qb-260k", coins: "260,000", price: "$179.99", bonus: "50,000", priceCents: 17_999, goldCoins: 260_000, sweepsCoins: 50_000 },
];

export function getPackageById(id: string): CoinPackageDef | QuickBuyPackageDef | undefined {
  return GET_PACKAGES.find((pkg) => pkg.id === id) ?? QUICK_BUY_PACKAGES.find((pkg) => pkg.id === id);
}
