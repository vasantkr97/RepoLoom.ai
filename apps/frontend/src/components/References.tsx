import { ArrowUpRight, BookOpen, Boxes, FileText } from "lucide-react";

interface ReferenceItem {
  title: string;
  url: string;
}

interface Reference {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: ReferenceItem[];
}

const references: Reference[] = [
  {
    number: "01",
    icon: FileText,
    title: "Research",
    description: "The retrieval and issue-resolution work behind the system.",
    items: [
      {
        title: "SWE-Fixer: LLMs for GitHub Issue Resolution",
        url: "https://arxiv.org/abs/2501.05040",
      },
      {
        title: "Fusion Functions for Hybrid Retrieval",
        url: "https://arxiv.org/pdf/2210.11934",
      },
    ],
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Retrieval notes",
    description: "Practical foundations for hybrid code search and ranking.",
    items: [
      {
        title: "Why Grep-Only Retrieval Falls Short",
        url: "https://milvus.io/blog/why-im-against-claude-codes-grep-only-retrieval-it-just-burns-too-many-tokens.md",
      },
      {
        title: "Hybrid Search & RRF Explained",
        url: "https://www.elastic.co/what-is/hybrid-search",
      },
      {
        title: "BM25 + Vector Search Implementation",
        url: "https://milvus.io/ai-quick-reference/how-do-i-implement-bm25-alongside-vector-search",
      },
    ],
  },
  {
    number: "03",
    icon: Boxes,
    title: "Architecture",
    description: "The services, queues, retrieval layers, and validation loop.",
    items: [
      {
        title: "Inspect the source repository",
        url: "https://github.com/vasantkr97/RepoLoom.ai",
      },
    ],
  },
];

export default function References() {
  return (
    <section className="bg-[var(--color-surface)] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="precision-label mb-4 text-[var(--color-accent)]">
              Evidence ledger
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.04em]">
              Inspect the thinking,
              <span className="block text-[var(--color-muted)]">
                not just the output.
              </span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[var(--color-muted)] lg:col-span-4 lg:justify-self-end">
            RepoLoom’s choices are inspectable—from retrieval research to the
            architecture that turns a task into a tested pull request.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {references.map((reference) => (
            <article
              key={reference.number}
              className="group flex min-h-[280px] flex-col rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-bg)] p-5 transition duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-[var(--color-rule-strong)] hover:bg-[var(--color-surface)] hover:shadow-[var(--shadow-md)] sm:p-6 lg:col-span-4"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-accent)]">
                  {reference.number}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
                  <reference.icon
                    className="h-4 w-4 text-[var(--color-muted)]"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {reference.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {reference.description}
              </p>

              <div className="mt-auto divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)] pt-2">
                {reference.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex min-h-11 items-center justify-between gap-3 rounded-lg px-1 py-2 text-xs font-semibold leading-5 transition-colors hover:text-[var(--color-accent)]"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 flex-none transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
