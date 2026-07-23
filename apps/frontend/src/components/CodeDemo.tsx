import Link from "next/link";
import { ArrowUpRight, Check, Github } from "lucide-react";
import LangGraphFlow from "@/components/LangGraphFlow";

export default function CodeDemo() {
  return (
    <section
      id="method"
      className="precision-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:py-4">
          <div className="lg:sticky lg:top-32">
            <p className="precision-label mb-4 text-[var(--color-accent)]">
              Reviewable by design
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
              A pull request your team can review.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
              The handoff answers four questions: what changed, why it changed,
              whether it validated, and where the engineer can review it.
              RepoLoom prepares the work; your team decides what merges.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/dashboard"
                className="loom-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-text)] px-5 text-[13px] font-bold text-[var(--color-surface)] hover:bg-[var(--color-accent)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Open the workspace
              </Link>
              <Link
                href="/documentation"
                className="loom-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-5 text-[13px] font-bold hover:border-[var(--color-text)]"
              >
                Technical documentation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-y border-[var(--color-rule-strong)] py-4 sm:py-5 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="precision-label">What the reviewer receives</p>
              <p className="mt-1 text-sm font-bold">
                checkout-retry / run-8f31
              </p>
            </div>
            <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 text-xs font-extrabold text-[var(--color-accent)]">
              4 of 4 complete
            </span>
          </div>
          <LangGraphFlow />
          <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-text)] text-[var(--color-surface)] shadow-[var(--shadow-md)]">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <div>
                <p className="precision-label !text-white/45">Final proof</p>
                <p className="mt-1 text-sm font-semibold">
                  Sandbox validation output
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-success)]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Passed
              </span>
            </div>
            <div className="overflow-x-auto p-4 font-[family-name:var(--font-mono)] text-[11px] leading-5 sm:p-5">
              <p className="text-white/40">
                $ repoloom validate --task checkout-retry
              </p>
              <p className="mt-3 text-white/75">
                → hybrid retrieval complete
              </p>
              <p className="text-white/75">
                → dependency context assembled
              </p>
              <p className="text-white/75">→ syntax and types passed</p>
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
