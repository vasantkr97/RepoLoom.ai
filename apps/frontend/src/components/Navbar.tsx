"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";

const navigation = [
  { label: "How it works", href: "/#product" },
  { label: "Review output", href: "/#method" },
  { label: "Documentation", href: "/documentation" },
];

export default function Navbar() {
  return (
    <nav
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5"
      aria-label="Primary navigation"
    >
      <div className="relative mx-auto grid min-h-14 max-w-[1180px] grid-cols-[1fr_auto] items-center gap-4 rounded-full border border-[var(--color-rule-strong)] bg-[color:rgba(250,251,249,0.9)] px-2.5 shadow-[var(--shadow-md)] backdrop-blur-xl sm:px-3 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="RepoLoom.ai home"
          className="w-fit rounded-full px-1 py-1"
        >
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-bg)] p-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-9 items-center rounded-full px-3.5 text-[12px] font-bold text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] active:bg-[var(--color-surface-strong)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden justify-self-end lg:flex">
          <Link
            href="/dashboard"
            className="loom-button inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--color-text)] px-4 text-[12px] font-bold text-[var(--color-surface)] hover:bg-[var(--color-accent)]"
          >
            Open workspace
          </Link>
        </div>

        <div className="justify-self-end lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
