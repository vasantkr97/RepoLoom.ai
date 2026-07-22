import Link from "next/link";
import { ArrowUpRight, Check, Github } from "lucide-react";
import LangGraphFlow from "@/components/LangGraphFlow";

export default function CodeDemo() {
  return (
    <section
      id="method"
      className="precision-canvas px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="precision-label mb-4">Operating method</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3.4rem,6vw,6.5rem)] leading-[0.86] tracking-[-0.05em]">
              A visible process, not a black box.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              Every task moves through the same legible sequence. Your team can
              see what RepoLoom is doing, what passed, and where intervention is
              needed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-text)] px-5 text-sm font-bold text-[var(--color-surface)] transition hover:bg-[var(--color-accent)] active:translate-y-px"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Open the workspace
              </Link>
              <Link
                href="/documentation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-5 text-sm font-bold transition hover:border-[var(--color-text)] active:translate-y-px"
              >
                Technical documentation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <LangGraphFlow />
          <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-text)] text-[var(--color-surface)] shadow-[var(--shadow-lg)]">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <div>
                <p className="precision-label !text-white/45">
                  Validation output
                </p>
                <p className="mt-1 text-sm font-semibold">worker / run-8f31</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-success)]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Passed
              </span>
            </div>
            <div className="overflow-x-auto p-5 font-[family-name:var(--font-mono)] text-xs leading-6 sm:p-7">
              <p className="text-white/40">
                $ repoloom validate --task checkout-retry
              </p>
              <p className="mt-3 text-white/75">→ 8 relevant files retrieved</p>
              <p className="text-white/75">→ 3 dependency paths evaluated</p>
              <p className="text-white/75">→ 6 tests executed in sandbox</p>
              <p className="mt-3 text-[var(--color-success)]">
                ✓ change is ready for human review
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
