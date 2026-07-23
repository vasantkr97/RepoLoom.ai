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
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-rule)] bg-[color:rgba(246,247,244,0.9)] px-4 backdrop-blur-xl sm:px-6"
      aria-label="Primary navigation"
    >
      <div className="relative mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="RepoLoom.ai home"
          className="rounded-[var(--radius-md)]"
        >
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-10 items-center rounded-full px-3 py-2 text-[13px] font-semibold text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] active:bg-[var(--color-surface-strong)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/dashboard"
            className="loom-button inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--color-text)] px-4 text-[13px] font-bold text-[var(--color-surface)] hover:bg-[var(--color-accent)]"
          >
            Open workspace
          </Link>
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
}
