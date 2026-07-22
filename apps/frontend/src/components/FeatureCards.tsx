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
      "Generated changes run through syntax, type, consistency, and sandbox checks before the pull request is opened.",
  },
];

export default function FeatureCards() {
  return (
    <section
      id="product"
      className="bg-[var(--color-surface)] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid gap-6 border-b border-[var(--color-rule-strong)] pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="precision-label mb-4">Product system</p>
            <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]">
              Context is the difference between code and contribution.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--color-muted)] lg:col-span-5 lg:justify-self-end lg:text-lg">
            Each layer exists to reduce uncertainty: find the right surface,
            understand its dependencies, make the smallest coherent change, and
            prove it works.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProcessVisualization />
          </div>
          <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)] lg:col-span-5">
            {capabilities.map((capability) => (
              <article
                key={capability.number}
                className="group grid grid-cols-[auto_1fr] gap-4 py-6 transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg)] sm:gap-6 sm:px-4"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] font-bold text-[var(--color-accent)]">
                    {capability.number}
                  </span>
                  <capability.icon
                    className="h-5 w-5 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-text)]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
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
