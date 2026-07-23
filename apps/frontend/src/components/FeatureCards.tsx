import { Braces, GitPullRequest, Network, ScanSearch } from "lucide-react";
import ProcessVisualization from "./ProcessVisualization";

const capabilities = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Hybrid retrieval",
    description:
      "Keyword precision and semantic search are fused to locate the files that matter without flooding the model with noise.",
  },
  {
    number: "02",
    icon: Network,
    title: "Dependency awareness",
    description:
      "AST and code-graph analysis preserve the relationships between imports, functions, types, and call sites.",
  },
  {
    number: "03",
    icon: Braces,
    title: "Scoped generation",
    description:
      "RepoLoom writes against the relevant implementation surface instead of treating every task like a blank prompt.",
  },
  {
    number: "04",
    icon: GitPullRequest,
    title: "Validated delivery",
    description:
      "Generated changes run through syntax and type checks in an isolated sandbox before the pull request is opened.",
  },
];

export default function FeatureCards() {
  return (
    <section
      id="product"
      className="border-y border-[var(--color-rule)] bg-[var(--color-surface)] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="precision-label mb-4 text-[var(--color-accent)]">
              How RepoLoom works
            </p>
            <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
              Repository context in. Reviewable change out.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-md text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              RepoLoom does more than generate code. It narrows the repository
              to the relevant implementation surface, follows the impact of the
              change, and validates the result before delivery.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ProcessVisualization />
          </div>
          <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule-strong)] lg:col-span-4">
            {capabilities.map((capability) => (
              <article
                key={capability.number}
                className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 sm:grid-cols-[3rem_1fr] sm:gap-4 sm:py-5"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[0.75rem] border border-[var(--color-rule)] bg-[var(--color-bg)] text-[var(--color-accent)]">
                    <capability.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] font-bold text-[var(--color-muted)]">
                    {capability.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-[-0.02em]">
                    {capability.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-[var(--color-muted)]">
                    {capability.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
