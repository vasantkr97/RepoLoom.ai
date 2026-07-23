import {
  Braces,
  Check,
  GitPullRequest,
  Network,
  ScanSearch,
  TestTube2,
} from "lucide-react";

const stages = [
  {
    label: "Retrieve",
    detail: "Keyword + semantic",
    icon: ScanSearch,
  },
  {
    label: "Understand",
    detail: "AST + dependencies",
    icon: Network,
  },
  {
    label: "Generate",
    detail: "Scoped operations",
    icon: Braces,
  },
  {
    label: "Validate",
    detail: "Syntax + types",
    icon: TestTube2,
  },
];

export default function ProcessVisualization() {
  return (
    <div className="loom-glow relative overflow-hidden rounded-[var(--radius-lg)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-md)] sm:p-6">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative flex flex-col gap-3 border-b border-white/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="precision-label !text-white/45">
            Inside a RepoLoom run
          </p>
          <h3 className="mt-2 max-w-md font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.05] tracking-[-0.03em]">
            Context narrows before code changes.
          </h3>
        </div>
        <span className="w-fit rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-white/60">
          Repository scoped
        </span>
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
                <p className="mt-0.5 text-[10px] text-white/45">
                  {stage.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-7 grid gap-3 border-t border-white/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-accent)]">
            <GitPullRequest className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="precision-label !text-white/45">Delivery rule</p>
            <p className="mt-0.5 text-sm font-semibold">
              Validation passes before the PR opens.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Syntax", "Types", "Sandbox"].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.055] px-2.5 py-1 text-[10px] font-semibold"
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
  );
}
