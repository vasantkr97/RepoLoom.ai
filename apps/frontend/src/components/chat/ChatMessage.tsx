import { Check, Circle, Loader2 } from "lucide-react";

interface ChatMessageProps {
  type: "issue" | "task" | "user" | "ai";
  content: string;
  status: "complete" | "active" | "pending";
  isActive?: boolean;
}

const typeLabels = {
  issue: "Issue",
  task: "Task",
  user: "Input",
  ai: "Agent",
};

export default function ChatMessage({
  type,
  content,
  status,
  isActive,
}: ChatMessageProps) {
  return (
    <div
      className={`relative z-10 grid grid-cols-[36px_1fr] gap-3 rounded-[var(--radius-md)] border p-3 transition-colors duration-[var(--duration-base)] ${
        isActive
          ? "border-[var(--color-accent)] bg-[color:rgba(207,82,47,0.12)]"
          : "border-white/15 bg-[var(--color-text)]"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          status === "complete"
            ? "bg-[var(--color-success)]"
            : status === "active"
              ? "bg-[var(--color-accent)]"
              : "border border-white/20 bg-[var(--color-text)]"
        }`}
      >
        {status === "complete" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : status === "active" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Circle className="h-3 w-3 text-white/45" aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 py-0.5">
        <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/35">
          {typeLabels[type]}
        </p>
        <p className="mt-1 text-xs leading-5 text-white/75">{content}</p>
      </div>
    </div>
  );
}
