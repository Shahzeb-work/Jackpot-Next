"use client";

import { ChatIcon } from "./icons";
import { showIntercom } from "@/lib/intercom";

export default function SupportButton() {
  return (
    <button
      type="button"
      aria-label="Open support chat"
      onClick={showIntercom}
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-emerald text-cream-surface shadow-lg transition hover:bg-emerald-deep"
    >
      <ChatIcon className="size-6" />
    </button>
  );
}
