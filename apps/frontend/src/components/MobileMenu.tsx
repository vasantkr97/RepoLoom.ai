"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Product", href: "/#product" },
  { label: "Method", href: "/#method" },
  { label: "Documentation", href: "/documentation" },
  { label: "Workspace", href: "/dashboard" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-text)] active:translate-y-px"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-[var(--color-rule-strong)] bg-[var(--color-bg)] p-4 shadow-[var(--shadow-lg)]"
        >
          <div className="mx-auto max-w-[1440px] rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-surface)] p-3">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center justify-between rounded-[var(--radius-md)] px-3 text-base font-semibold transition-colors hover:bg-[var(--color-surface-strong)] active:translate-y-px"
              >
                <span className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-muted)]">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
