"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { label: "Product", href: "/#product" },
  { label: "Method", href: "/#method" },
  { label: "Documentation", href: "/documentation" },
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-rule)] bg-[color:rgba(241,238,229,0.94)] backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="RepoLoom.ai home"
          className="rounded-[var(--radius-sm)]"
        >
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text)] active:translate-y-px after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] px-4 text-sm font-semibold transition-colors hover:bg-[var(--color-surface)] active:translate-y-px"
          >
            Open workspace
          </Link>
          <button
            type="button"
            onClick={() => window.open("https://github.com/signup", "_blank")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 text-sm font-bold text-[var(--color-surface)] transition duration-[var(--duration-fast)] hover:bg-[var(--color-accent)] active:translate-y-px"
          >
            Start with GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
}
