"use client";

import { Toaster } from "sonner";

export default function Toasters() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-[var(--radius-md)] !border-[var(--color-rule-strong)] !bg-[var(--color-surface)] !text-[var(--color-text)] !shadow-[var(--shadow-lg)]",
          title: "!font-semibold !tracking-[-0.02em]",
          description: "!text-[var(--color-muted)]",
          actionButton:
            "!rounded-[var(--radius-sm)] !bg-[var(--color-text)] !text-[var(--color-surface)]",
        },
      }}
    />
  );
}
