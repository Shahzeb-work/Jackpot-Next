import { ChatIcon } from "./icons";

export default function SupportButton() {
  return (
    <button
      type="button"
      aria-label="Open support chat"
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-emerald text-cream-surface shadow-lg transition hover:bg-emerald-deep"
    >
      <ChatIcon className="size-6" />
    </button>
  );
}
