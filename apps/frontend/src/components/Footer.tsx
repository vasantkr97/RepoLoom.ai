import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] px-3 pb-3 text-[var(--color-surface)] sm:px-5 sm:pb-5">
      <div className="loom-glow mx-auto max-w-[1220px] overflow-hidden rounded-[var(--radius-lg)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <BrandMark inverse />
            <p className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              Give RepoLoom an issue. Get back a pull request you can review.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-surface)] px-5 text-[13px] font-bold text-[var(--color-text)] transition hover:bg-[var(--color-accent-soft)] active:translate-y-px"
            >
              Open the workspace
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm lg:col-span-5 lg:justify-self-end">
            <div className="space-y-3">
              <p className="precision-label !text-white/40">Navigate</p>
              <Link
                className="inline-flex min-h-11 items-center text-white/70 transition-colors hover:text-white"
                href="/#product"
              >
                How it works
              </Link>
              <Link
                className="flex min-h-11 items-center text-white/70 transition-colors hover:text-white"
                href="/#method"
              >
                Review output
              </Link>
              <Link
                className="flex min-h-11 items-center text-white/70 transition-colors hover:text-white"
                href="/documentation"
              >
                Documentation
              </Link>
              <Link
                className="flex min-h-11 items-center text-white/70 transition-colors hover:text-white"
                href="/dashboard"
              >
                Workspace
              </Link>
            </div>
            <div className="space-y-3">
              <p className="precision-label !text-white/40">Source</p>
              <a
                href="https://github.com/Deepak7704/100xSWE/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RepoLoom.ai. All rights reserved.</p>
          <p className="font-[family-name:var(--font-mono)] uppercase tracking-[0.12em]">
            Repository intelligence that ships
          </p>
        </div>
      </div>
    </footer>
  );
}
