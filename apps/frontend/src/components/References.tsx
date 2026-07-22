import Image, { StaticImageData } from "next/image";
import { ArrowUpRight, BookOpen, Boxes, FileText } from "lucide-react";
import architecture from "../assets/Architecture.png";

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
  image?: StaticImageData;
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
        url: "https://github.com/Deepak7704/100xSWE",
      },
    ],
    image: architecture,
  },
];

export default function References() {
  return (
    <section className="bg-[var(--color-surface)] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 border-b border-[var(--color-rule-strong)] pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="precision-label mb-4">Evidence ledger</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]">
              Built from evidence,
              <span className="block text-[var(--color-muted)]">
                not AI folklore.
              </span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[var(--color-muted)] lg:col-span-4 lg:justify-self-end">
            RepoLoom’s choices are inspectable—from retrieval research to the
            architecture that turns a task into a tested pull request.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border-x border-b border-[var(--color-rule)] bg-[var(--color-rule)] lg:grid-cols-3">
          {references.map((reference) => (
            <article
              key={reference.number}
              className="flex min-h-[360px] flex-col bg-[var(--color-surface)] p-5 transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg)] sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--color-accent)]">
                  {reference.number}
                </span>
                <reference.icon
                  className="h-5 w-5 text-[var(--color-muted)]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">
                {reference.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {reference.description}
              </p>

              {reference.image && (
                <div className="relative mt-5 aspect-[16/8] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-white">
                  <Image
                    src={reference.image}
                    alt="RepoLoom system architecture preview"
                    fill
                    className="object-cover object-top opacity-80 grayscale transition duration-[var(--duration-base)] hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              )}

              <div className="mt-auto divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)] pt-2">
                {reference.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-11 items-center justify-between gap-3 py-2 text-xs font-semibold leading-5 transition-colors hover:text-[var(--color-accent)]"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 flex-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
