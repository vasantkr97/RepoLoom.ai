import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] px-4 py-10 text-[var(--color-surface)] sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <BrandMark inverse />
            <p className="mt-6 max-w-xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
              Turn engineering intent into reviewable evidence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm lg:col-span-5 lg:justify-self-end">
            <div className="space-y-3">
              <p className="precision-label !text-white/40">Navigate</p>
              <Link className="block text-white/70 hover:text-white" href="/">
                Product
              </Link>
              <Link
                className="block text-white/70 hover:text-white"
                href="/documentation"
              >
                Documentation
              </Link>
              <Link
                className="block text-white/70 hover:text-white"
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
                className="inline-flex items-center gap-2 text-white/70 hover:text-white"
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
