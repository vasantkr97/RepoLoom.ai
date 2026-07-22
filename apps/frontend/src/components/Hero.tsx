"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  GitBranch,
  Github,
  SearchCode,
  ShieldCheck,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

const trace = [
  {
    label: "Repository mapped",
    detail: "Dependencies and code paths resolved",
    icon: SearchCode,
  },
  {
    label: "Change generated",
    detail: "Implementation scoped to relevant files",
    icon: GitBranch,
  },
  {
    label: "Validation passed",
    detail: "Types, tests, and cross-file checks complete",
    icon: ShieldCheck,
  },
];

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section className="precision-canvas overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="precision-enter lg:col-span-7">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-accent)]" />
              <p className="precision-label text-[var(--color-text)]">
                Autonomous code operations
              </p>
            </div>

            <h1 className="max-w-[900px] font-[family-name:var(--font-display)] text-[clamp(4rem,9vw,9.5rem)] leading-[0.82] tracking-[-0.055em]">
              Codebase in.
              <span className="block pl-[0.12em] text-[var(--color-accent)]">
                Pull request out.
              </span>
            </h1>

            <div className="mt-9 grid max-w-3xl gap-7 border-t border-[var(--color-rule-strong)] pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                RepoLoom.ai understands the structure around an engineering
                task, writes the change, validates it in isolation, and opens a
                pull request your team can actually review.
              </p>
              <ArrowDownRight
                className="hidden h-10 w-10 text-[var(--color-accent)] sm:block"
                aria-hidden="true"
              />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] hover:bg-[var(--color-accent-strong)] hover:shadow-[var(--shadow-md)] active:translate-y-px"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Connect a repository
              </button>
              <Link
                href="/documentation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-5 py-3 text-sm font-bold transition duration-[var(--duration-fast)] hover:border-[var(--color-text)] hover:bg-[var(--color-surface-strong)] active:translate-y-px"
              >
                Read the system brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[var(--color-muted)]">
              {[
                "Private-repo ready",
                "Sandbox validated",
                "Human review first",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 text-[var(--color-success)]"
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="precision-enter lg:col-span-5 lg:pt-8"
            style={{ animationDelay: "140ms" }}
          >
            <div className="relative rounded-[var(--radius-lg)] bg-[var(--color-text)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-lg)] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <p className="precision-label !text-white/50">Live trace</p>
                  <p className="mt-1 font-semibold">checkout-service / #184</p>
                </div>
                <span className="rounded-full border border-white/15 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/60">
                  03:42
                </span>
              </div>

              <div className="relative py-7">
                <div className="loomline-draw absolute bottom-10 left-[17px] top-10 w-px bg-white/20" />
                <div className="space-y-7">
                  {trace.map((item, index) => (
                    <div key={item.label} className="relative z-10 flex gap-4">
                      <span
                        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${
                          index === trace.length - 1
                            ? "bg-[var(--color-accent)]"
                            : "bg-[var(--color-surface)] text-[var(--color-text)]"
                        }`}
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs leading-5 text-white/55">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[var(--radius-md)] border border-white/15 bg-white/[0.055] p-4 font-[family-name:var(--font-mono)] text-[11px] leading-5">
                <div className="flex justify-between text-white/45">
                  <span>pull/184</span>
                  <span className="text-[var(--color-success)]">ready</span>
                </div>
                <p className="mt-3 text-white/80">
                  + retry payment confirmation with idempotency key
                </p>
                <p className="text-white/50">
                  + 6 tests / 3 files / 0 failures
                </p>
              </div>

              <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] shadow-[var(--shadow-md)] sm:-left-8">
                <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                <span className="precision-label text-[var(--color-text)]">
                  PR ready for review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
