"use client";

import { useEffect, useState } from "react";
import { useAppState } from "./providers/app-state";
import { Modal } from "./ui/modal";
import { CloseIcon } from "./icons";
import { GCCoinIcon, SCCoinIcon } from "./coins";
import { getUserTransactionsAction, type UserTransaction } from "@/lib/actions/coinflow";
import { paymentMethodLabel } from "@/lib/coinflow";
import { getUserRewardTransactionsAction, type UserRewardTransaction } from "@/lib/actions/verification";
import { rewardSourceLabel } from "@/lib/verification";

type Tab = "payments" | "social" | "rewards";
type StatusFilter = "all" | UserTransaction["status"];

const TABS: { id: Tab; label: string }[] = [
  { id: "payments", label: "Payment History" },
  { id: "social", label: "Social Games transactions" },
  { id: "rewards", label: "Reward Transactions" },
];

const STATUS_STYLES: Record<UserTransaction["status"], { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-emerald/20 text-emerald-bright" },
  waiting: { label: "Pending", className: "bg-gold/20 text-gold-bright" },
  rejected: { label: "Failed", className: "bg-rose-500/20 text-rose-400" },
};

const TYPE_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "confirmed", label: "Confirmed" },
  { id: "waiting", label: "Pending" },
  { id: "rejected", label: "Failed" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatUsd(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function TransactionHistoryModal() {
  const { modal, closeModal } = useAppState();
  const open = modal?.type === "transaction-history";
  const [tab, setTab] = useState<Tab>("payments");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [transactions, setTransactions] = useState<UserTransaction[] | null>(null);
  const [rewardTransactions, setRewardTransactions] = useState<UserRewardTransaction[] | null>(null);

  useEffect(() => {
    if (!open) return;
    getUserTransactionsAction().then((res) => {
      if (res.ok) setTransactions(res.transactions);
    });
    getUserRewardTransactionsAction().then((res) => {
      if (res.ok) setRewardTransactions(res.transactions);
    });
  }, [open]);

  function handleClose() {
    setTab("payments");
    setTransactions(null);
    setRewardTransactions(null);
    closeModal();
  }

  const loading = transactions === null;
  const filtered = (transactions ?? []).filter(
    (tx) => statusFilter === "all" || tx.status === statusFilter
  );
  const totalPurchases = (transactions ?? []).filter((tx) => tx.status === "confirmed").length;

  const rewardsLoading = rewardTransactions === null;
  const totalRewardGold = (rewardTransactions ?? []).reduce((sum, tx) => sum + tx.goldCoins, 0);
  const totalRewardSweeps = (rewardTransactions ?? []).reduce((sum, tx) => sum + tx.sweepsCoins, 0);

  return (
    <Modal open={open} onClose={handleClose} panelClassName="w-full max-w-3xl">
      <div className="flex max-h-[85vh] flex-col rounded-3xl border border-line bg-cream-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ink">Transaction History</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="grid size-8 place-items-center rounded-full text-ink-soft transition hover:bg-cream-surface-2 hover:text-ink"
          >
            <CloseIcon className="size-4.5" />
          </button>
        </div>

        <div className="mb-4 flex gap-1.5 overflow-x-auto rounded-2xl border border-line bg-cream-surface-2 p-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                "shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition " +
                (tab === t.id
                  ? "bg-gradient-to-b from-emerald-bright to-emerald text-cream-surface"
                  : "text-ink-soft hover:text-ink")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "social" ? (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-line py-16">
            <p className="text-sm text-ink-soft">You don&apos;t have any available results yet.</p>
          </div>
        ) : tab === "rewards" ? (
          <>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
                <p className="text-xs text-ink-soft">Total GC Earned</p>
                <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-ink">
                  <GCCoinIcon className="size-4.5" />
                  {totalRewardGold.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
                <p className="text-xs text-ink-soft">Total SC Earned</p>
                <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-emerald-bright">
                  <SCCoinIcon className="size-4.5" />
                  {totalRewardSweeps.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl border border-line">
              {rewardsLoading ? (
                <p className="p-10 text-center text-sm text-ink-soft">Loading…</p>
              ) : (rewardTransactions ?? []).length === 0 ? (
                <p className="p-10 text-center text-sm text-ink-soft">
                  You don&apos;t have any available results yet.
                </p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-cream-surface-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Source</th>
                      <th className="px-4 py-3 font-semibold">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rewardTransactions ?? []).map((tx) => (
                      <tr key={tx.id} className="border-t border-line">
                        <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{formatDate(tx.createdAt)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-ink">{rewardSourceLabel(tx.source)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-ink">
                            <GCCoinIcon className="size-4 shrink-0" />
                            {tx.goldCoins.toLocaleString()}
                            <span className="ml-1.5 flex items-center gap-1 text-emerald-bright">
                              <SCCoinIcon className="size-4 shrink-0" />
                              {tx.sweepsCoins.toLocaleString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <label className="text-xs font-semibold text-ink-soft" htmlFor="tx-status-filter">
                Type
              </label>
              <select
                id="tx-status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="rounded-xl border border-line bg-cream-surface-2 px-3.5 py-2 text-sm font-medium text-ink"
              >
                {TYPE_FILTERS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
                <p className="text-xs text-ink-soft">Total Purchases</p>
                <p className="mt-1 text-lg font-bold text-ink">{totalPurchases}</p>
              </div>
              <div className="rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
                <p className="text-xs text-ink-soft">Total Winnings</p>
                <p className="mt-1 text-lg font-bold text-ink">0</p>
              </div>
              <div className="rounded-2xl border border-line bg-cream-surface-2 px-4 py-3.5">
                <p className="text-xs text-ink-soft">Redeemable</p>
                <p className="mt-1 text-lg font-bold text-ink">0</p>
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl border border-line">
              {loading ? (
                <p className="p-10 text-center text-sm text-ink-soft">Loading…</p>
              ) : filtered.length === 0 ? (
                <p className="p-10 text-center text-sm text-ink-soft">
                  You don&apos;t have any available results yet.
                </p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-cream-surface-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Package</th>
                      <th className="px-4 py-3 font-semibold">Method</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx) => (
                      <tr key={tx.id} className="border-t border-line">
                        <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{formatDate(tx.createdAt)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 whitespace-nowrap text-ink">
                            <GCCoinIcon className="size-4 shrink-0" />
                            {tx.goldCoins.toLocaleString()}
                            {tx.sweepsCoins > 0 && (
                              <span className="ml-1.5 flex items-center gap-1 text-emerald-bright">
                                <SCCoinIcon className="size-4 shrink-0" />
                                {tx.sweepsCoins.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-ink-soft">
                          {paymentMethodLabel(tx.paymentMethod)}
                        </td>
                        <td className="px-4 py-3 font-semibold whitespace-nowrap text-ink">
                          {formatUsd(tx.amountCents)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={
                              "rounded-full px-2.5 py-1 text-xs font-bold " + STATUS_STYLES[tx.status].className
                            }
                          >
                            {STATUS_STYLES[tx.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
