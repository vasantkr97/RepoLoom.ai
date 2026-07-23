"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
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
    detail: "Syntax and type checks complete",
    icon: ShieldCheck,
  },
];

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section className="precision-canvas overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-[72px] sm:pt-32 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="precision-enter lg:col-span-7">
              <p className="precision-label mb-4 text-[var(--color-accent)]">
                Repository-aware coding agent
              </p>
              <h1 className="max-w-[650px] font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.4vw,4.85rem)] font-semibold leading-[0.98] tracking-[-0.048em]">
                Assign the issue.
                <span className="block text-[var(--color-accent)]">
                  Review the pull request.
                </span>
              </h1>

              <p className="mt-5 max-w-[580px] text-base leading-7 text-[var(--color-muted)] sm:text-[17px]">
                Connect a GitHub repository and describe the task. RepoLoom
                retrieves the relevant code, traces its dependencies, prepares
                a scoped change, validates it in a sandbox, and opens a pull
                request for your team to review.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="loom-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-3 text-[13px] font-bold text-white hover:bg-[var(--color-accent)]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Connect a repository
                </button>
                <Link
                  href="/#product"
                  className="loom-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-5 py-3 text-[13px] font-bold hover:border-[var(--color-text)]"
                >
                  See how it works
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-rule)] pt-4 text-[11px] font-semibold text-[var(--color-muted)]">
                {[
                  "Repository-scoped access",
                  "Isolated sandbox",
                  "Human-controlled merge",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-soft)]">
                      <Check
                        className="h-3 w-3 text-[var(--color-accent)]"
                        aria-hidden="true"
                      />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="precision-enter mx-auto w-full max-w-[500px] lg:col-span-5 lg:translate-y-5"
              style={{ animationDelay: "140ms" }}
            >
              <div className="loom-glow relative overflow-hidden rounded-[var(--radius-lg)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-lg)] sm:p-6">
                <div className="relative flex flex-col gap-3 border-b border-white/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="precision-label !text-white/45">
                      Example task run
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      checkout-service / issue #184
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/65">
                    Pull request / 185
                  </span>
                </div>

                <div className="relative py-5">
                  <div className="loom-thread loomline-draw absolute bottom-10 left-[19px] top-10 w-[3px] rounded-full" />
                  <ol
                    className="space-y-4"
                    aria-label="Repository task progress"
                  >
                    {trace.map((item, index) => (
                      <li key={item.label} className="relative z-10 flex gap-4">
                        <span
                          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border-[3px] border-[var(--color-text)] ${
                            index === trace.length - 1
                              ? "bg-[var(--color-copper)] text-white"
                              : "bg-[var(--color-surface)] text-[var(--color-text)]"
                          }`}
                        >
                          <item.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold">{item.label}</p>
                            <Check
                              className="h-3.5 w-3.5 text-[#65d7a8]"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="mt-1 text-xs leading-5 text-white/55">
                            {item.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="relative rounded-[1rem] border border-white/15 bg-white/[0.055] p-3.5 font-[family-name:var(--font-mono)] text-[10px] leading-5">
                  <div className="flex justify-between text-white/45">
                    <span>pull/185</span>
                    <span className="inline-flex items-center gap-1.5 text-[#65d7a8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#65d7a8]" />
                      ready
                    </span>
                  </div>
                  <p className="mt-3 text-white/85">
                    + retry confirmation with idempotency key
                  </p>
                  <p className="text-white/50">
                    + syntax passed · types passed
                  </p>
                </div>

                <div className="relative mt-3 flex items-center justify-between rounded-[0.9rem] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)]">
                  <span className="inline-flex items-center gap-2 text-xs font-extrabold">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
                    Ready for review
                  </span>
                  <ArrowDownRight
                    className="h-4 w-4 text-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                </div>
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
