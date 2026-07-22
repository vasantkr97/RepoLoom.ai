import {
  Braces,
  Check,
  GitPullRequest,
  Network,
  ScanSearch,
  TestTube2,
} from "lucide-react";

const stages = [
  { label: "Retrieve", icon: ScanSearch },
  { label: "Understand", icon: Network },
  { label: "Generate", icon: Braces },
  { label: "Validate", icon: TestTube2 },
];

export default function ProcessVisualization() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-text)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-lg)] sm:p-8">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative flex items-start justify-between gap-6 border-b border-white/15 pb-5">
        <div>
          <p className="precision-label !text-white/45">The Loomline</p>
          <h3 className="mt-2 max-w-md font-[family-name:var(--font-display)] text-3xl leading-none tracking-[-0.03em] sm:text-4xl">
            One trace through the whole codebase.
          </h3>
        </div>
        <span className="hidden rounded-full border border-white/15 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/55 sm:block">
          deterministic handoff
        </span>
      </div>

      <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-white/15 bg-white/[0.05] p-4">
          <p className="precision-label !text-white/45">Input / issue 4287</p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Add resilient error handling to concurrent payment operations.
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[color:rgba(207,82,47,0.12)] p-4">
          <p className="precision-label !text-white/45">Output / pull 4288</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <GitPullRequest className="h-4 w-4" aria-hidden="true" />
            Ready for human review
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px bg-white/20 sm:left-0 sm:right-0 sm:top-4 sm:h-px sm:w-full" />
        <div className="grid gap-5 sm:grid-cols-4">
          {stages.map((stage, index) => (
            <div
              key={stage.label}
              className="relative flex items-center gap-4 sm:block"
            >
              <span
                className={`relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full border ${
                  index === stages.length - 1
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                    : "border-white/20 bg-[var(--color-text)]"
                }`}
              >
                <stage.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="sm:mt-4">
                <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/40">
                  0{index + 1}
                </p>
                <p className="mt-0.5 text-sm font-semibold">{stage.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-10 rounded-[var(--radius-md)] bg-[var(--color-surface)] p-4 text-[var(--color-text)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="precision-label">Validation ledger</p>
            <p className="mt-1 text-sm font-semibold">
              Type-safe, test-passed, dependency-aware
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Types", "Tests", "Imports"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-rule)] px-2.5 py-1 text-[10px] font-semibold"
              >
                <Check
                  className="h-3 w-3 text-[var(--color-success)]"
                  aria-hidden="true"
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
