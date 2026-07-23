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
    <div className="loom-glow relative min-h-[400px] overflow-hidden rounded-[var(--radius-lg)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-md)] sm:p-6">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative flex items-start justify-between gap-6 border-b border-white/15 pb-5">
        <div>
          <p className="precision-label !text-white/45">
            Repository workflow / example
          </p>
          <h3 className="mt-2 max-w-md font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.05] tracking-[-0.03em]">
            A visible path from task to proof.
          </h3>
        </div>
        <span className="hidden rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/60 sm:block">
          Context scoped
        </span>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1rem] border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-sm">
          <p className="precision-label !text-white/45">Input / issue 4287</p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Add resilient error handling to concurrent payment operations.
          </p>
        </div>
        <div className="rounded-[1rem] border border-[#dc8d63]/45 bg-[#dc8d63]/10 p-3.5 backdrop-blur-sm">
          <p className="precision-label !text-white/45">Output / pull 4288</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <GitPullRequest className="h-4 w-4" aria-hidden="true" />
            Ready for human review
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="loom-thread absolute left-[18px] top-4 h-[calc(100%-2rem)] w-[3px] rounded-full sm:left-0 sm:right-0 sm:top-[18px] sm:h-[3px] sm:w-full" />
        <ol
          className="grid gap-5 sm:grid-cols-4"
          aria-label="RepoLoom repository workflow"
        >
          {stages.map((stage, index) => (
            <li
              key={stage.label}
              className="relative flex items-center gap-4 sm:block"
            >
              <span
                className={`relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full border ${
                  index === stages.length - 1
                    ? "border-[var(--color-copper)] bg-[var(--color-copper)]"
                    : "border-white/20 bg-[#142a23]"
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
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-7 rounded-[1rem] bg-[var(--color-surface)] p-4 text-[var(--color-text)] shadow-[var(--shadow-md)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="precision-label">Validation ledger</p>
            <p className="mt-1 text-sm font-semibold">
              Syntax checked, types checked, ready for review
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Syntax", "Types", "Sandbox"].map((item) => (
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
