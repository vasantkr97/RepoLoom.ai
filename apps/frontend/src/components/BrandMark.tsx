import { cn } from "@/lib/utils";

interface BrandMarkProps {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
}

export default function BrandMark({
  compact = false,
  inverse = false,
  className,
}: BrandMarkProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-md)]",
          inverse ? "bg-[var(--color-surface)]" : "bg-[var(--color-text)]"
        )}
        aria-hidden="true"
      >
        <span className="absolute h-6 w-px -rotate-[28deg] bg-[var(--color-accent)]" />
        <span
          className={cn(
            "absolute h-6 w-px rotate-[28deg]",
            inverse ? "bg-[var(--color-text)]" : "bg-[var(--color-surface)]"
          )}
        />
        <span
          className={cn(
            "absolute h-px w-5",
            inverse ? "bg-[var(--color-text)]" : "bg-[var(--color-surface)]"
          )}
        />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-base font-bold tracking-[-0.03em]">
            RepoLoom.ai
          </span>
          <span
            className={cn(
              "precision-label block",
              inverse && "text-[color:rgba(251,249,243,0.58)]"
            )}
          >
            Repository intelligence
          </span>
        </span>
      )}
    </div>
  );
}
