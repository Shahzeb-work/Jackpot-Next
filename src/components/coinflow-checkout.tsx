"use client";

import { useEffect, useRef, useState } from "react";
import { getCoinflowTransactionStatusAction } from "@/lib/actions/coinflow";
import { CloseIcon } from "./icons";

const COINFLOW_WIDGET_ORIGIN =
  process.env.NEXT_PUBLIC_COINFLOW_WIDGET_ORIGIN || "https://sandbox.coinflow.cash";
const POLL_INTERVAL_MS = 2500;

export type CoinflowResult =
  | { status: "success"; goldCoins: number; sweepsCoins: number }
  | { status: "failed"; reason?: string };

export default function CoinflowCheckout({
  url,
  code,
  onClose,
  onResult,
}: {
  url: string;
  code: string;
  onClose: () => void;
  onResult: (result: CoinflowResult) => void;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    function startPolling() {
      if (pollRef.current) return;
      pollRef.current = setInterval(async () => {
        const res = await getCoinflowTransactionStatusAction(code);
        if (!res.ok || res.status === "waiting") return;

        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }

        if (res.status === "success") {
          onResult({ status: "success", goldCoins: res.goldCoins, sweepsCoins: res.sweepsCoins });
        } else {
          onResult({ status: "failed", reason: res.reason });
        }
      }, POLL_INTERVAL_MS);
    }

    function handleMessage(event: MessageEvent) {
      if (event.origin !== COINFLOW_WIDGET_ORIGIN) return;

      let parsed: unknown = event.data;
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          return;
        }
      }

      const { method, info } = (parsed ?? {}) as { method?: string; info?: { code?: unknown } };
      if (method === "success" || method === "authDeclined" || info?.code) {
        setFinishing(true);
        startPolling();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [code, onResult]);

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-cream">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-cream-surface text-ink shadow-lg transition hover:bg-cream-surface-2"
      >
        <CloseIcon className="size-4.5" />
      </button>

      {(!iframeLoaded || finishing) && (
        <div className="absolute inset-0 grid place-items-center bg-cream">
          <div className="size-10 animate-spin rounded-full border-4 border-line border-t-gold-bright" />
        </div>
      )}

      {!finishing && (
        <iframe
          src={url}
          onLoad={() => setIframeLoaded(true)}
          allow="camera *; microphone *; fullscreen *; payment *"
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}
