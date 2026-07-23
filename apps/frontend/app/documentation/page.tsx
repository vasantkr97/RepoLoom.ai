import React from "react";
import Link from "next/link";
import {
  Code,
  GitBranch,
  Database,
  Cpu,
  CheckCircle,
  AlertCircle,
  Zap,
  FileCode,
  Search,
  GitPullRequest,
} from "lucide-react";
import DeepDive from "@/components/DeepDive";
import BrandMark from "@/components/BrandMark";

const documentationNav = [
  ["overview", "Overview"],
  ["architecture", "Architecture"],
  ["core-features", "Core features"],
  ["workflow", "Workflow"],
  ["technology", "Technology"],
  ["deep-dive", "Deep dive"],
  ["optimizations", "Optimizations"],
  ["journey", "User journey"],
] as const;

export default function DocumentationPage() {
  return (
    <div className="loomed-landing docs-shell precision-canvas min-h-screen text-[var(--color-text)]">
      <header className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex min-h-14 max-w-[1180px] items-center justify-between gap-4 rounded-full border border-[var(--color-rule)] bg-[color:rgba(250,251,249,0.88)] px-4 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:px-5">
          <Link href="/" aria-label="RepoLoom.ai home">
            <BrandMark />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden min-h-10 items-center rounded-full px-4 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)] sm:inline-flex"
            >
              Back to product
            </Link>
            <Link
              href="/dashboard"
              className="loom-button inline-flex min-h-10 items-center rounded-full bg-[var(--color-text)] px-4 text-sm font-bold text-[var(--color-surface)] hover:bg-[var(--color-accent-strong)]"
            >
              Open workspace
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[1180px] px-2 pb-12 pt-14 sm:px-4 sm:pb-16 sm:pt-20 lg:pt-24">
          <div className="mb-6 flex justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[color:rgba(250,251,249,0.76)] px-3 py-1.5 shadow-[var(--shadow-sm)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="precision-label">Technical field guide</span>
            </div>
          </div>
          <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="max-w-[850px] font-[family-name:var(--font-display)] text-[clamp(3.1rem,6.5vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.052em]">
                See the system
                <span className="block text-[var(--color-accent)]">
                  behind the pull request.
                </span>
              </h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-[var(--color-muted)] lg:col-span-4 lg:justify-self-end lg:text-lg">
              A precise guide to repository indexing, hybrid retrieval,
              AST-aware context, isolated validation, and delivery to GitHub.
            </p>
          </div>
        </div>
      </header>

      <nav
        className="mx-3 mb-8 flex gap-1 overflow-x-auto rounded-2xl border border-[var(--color-rule)] bg-[color:rgba(250,251,249,0.8)] p-1.5 shadow-[var(--shadow-sm)] backdrop-blur lg:hidden"
        aria-label="Documentation sections"
      >
        {documentationNav.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
          >
            {label}
          </a>
        ))}
      </nav>

      <main className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14 lg:px-4 lg:pb-24">
        <aside className="hidden lg:block">
          <nav
            className="sticky top-8 rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[color:rgba(250,251,249,0.74)] p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl"
            aria-label="Documentation sections"
          >
            <p className="precision-label mb-4">On this page</p>
            <div className="space-y-1">
              {documentationNav.map(([id, label], index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex min-h-9 items-center gap-3 rounded-lg px-2 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-[var(--color-accent)]">
                    0{index + 1}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <div className="docs-content min-w-0">
          {/* Overview Section */}
          <section id="overview" className="mb-12 scroll-mt-28 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              What RepoLoom does
            </h2>
            <div className="border-2 border-black p-5 sm:p-7 bg-gray-50">
              <p className="text-base sm:text-lg leading-relaxed mb-4">
                RepoLoom turns a scoped engineering task into a review-ready
                pull request. It indexes the selected repository, retrieves the
                code most relevant to the task, maps dependencies, and proposes
                the smallest coherent set of file operations.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Generated changes are applied inside an E2B sandbox and pass
                syntax and TypeScript type validation before RepoLoom commits
                the branch and opens a pull request. The result keeps the
                evidence visible: affected files, operations, diff, explanation,
                and PR link.
              </p>
            </div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="mb-12 scroll-mt-28 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Cpu className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              System Architecture
            </h2>

            <figure className="architecture-figure mb-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
              <div className="overflow-x-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/repoloom-architecture.svg"
                  alt="RepoLoom.ai system architecture: GitHub access and indexing feed hybrid retrieval, AST context construction, Gemini generation, E2B validation, and a review-ready pull request."
                  width="1800"
                  height="1120"
                  className="h-auto min-w-[760px] w-full"
                />
              </div>
              <figcaption className="flex flex-col gap-1 border-t border-[var(--color-rule)] px-4 py-3 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <span>
                  Current production flow, from repository connection to PR
                  delivery.
                </span>
                <a
                  href="/repoloom-architecture.svg"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
                >
                  Open full-size diagram ↗
                </a>
              </figcaption>
            </figure>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
              <ArchitectureCard
                title="Product surface"
                description="Next.js workspace for GitHub connection, repository selection, task submission, and evidence-rich results."
                deployment="Next.js 16"
                icon={<FileCode className="w-6 h-6" />}
              />
              <ArchitectureCard
                title="Control plane"
                description="Express and Bun handle OAuth, installations, repositories, task dispatch, and durable application data."
                deployment="Express + Bun"
                icon={<Database className="w-6 h-6" />}
              />
              <ArchitectureCard
                title="Execution plane"
                description="BullMQ workers index code, build retrieval context, generate operations, validate in E2B, and deliver the PR."
                deployment="Redis + BullMQ"
                icon={<GitBranch className="w-6 h-6" />}
              />
            </div>
          </section>

          {/* Core Features Section */}
          <section id="core-features" className="mb-12 scroll-mt-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              Core Features
            </h2>

            <div className="space-y-6">
              <FeatureBlock
                title="1. AST-Aware Code Graph"
                description="Parses candidate source files with Babel to map imports, exports, symbols, dependencies, and compact code skeletons before generation."
                techStack={[
                  "Babel Parser",
                  "AST Traversal",
                  "Dependency Graph",
                  "Code Skeletons",
                ]}
                useCases={[
                  "Extract symbols, signatures, and dependencies",
                  "Identify import/export relationships",
                  "Generate code skeletons for token efficiency",
                  "Expand context around retrieved candidate files",
                ]}
              />

              <FeatureBlock
                title="2. Hybrid Search & Retrieval"
                description="Combines BM25 keyword-based search with vector embeddings to retrieve the most relevant code files for any given task or issue."
                techStack={[
                  "BM25 Algorithm",
                  "Vector Embeddings",
                  "Adaptive RRF",
                  "Pinecone",
                ]}
                useCases={[
                  "Find relevant files when user describes a feature",
                  "Retrieve semantically similar code patterns",
                  "Balance keyword matching with semantic understanding",
                  "Reduce context window by selecting only relevant files",
                ]}
              />

              <FeatureBlock
                title="3. LangGraph Validation Loop"
                description="Uses LangGraph to apply generated file operations, run syntax and TypeScript checks, and feed actionable validation errors into a bounded correction loop."
                techStack={[
                  "LangGraph",
                  "State Graph",
                  "Syntax Validation",
                  "Type Validation",
                ]}
                useCases={[
                  "Apply explicit create, update, and delete operations",
                  "Catch syntax and TypeScript type failures",
                  "Return validation errors to the generation step",
                  "Cap correction attempts at three iterations",
                ]}
              />

              <FeatureBlock
                title="4. E2B Sandbox Execution"
                description="Clones the repository and applies proposed operations in an isolated E2B environment before any branch is committed or pushed."
                techStack={[
                  "E2B SDK",
                  "Isolated Filesystem",
                  "Git",
                  "Validation Commands",
                ]}
                useCases={[
                  "Apply file operations away from the user's machine",
                  "Validate syntax and TypeScript types",
                  "Capture command output for the correction loop",
                  "Commit and push only after validation succeeds",
                ]}
              />

              <FeatureBlock
                title="5. GitHub Integration"
                description="GitHub OAuth and GitHub App access provide repository selection, webhook-driven reindexing, secure cloning, branch pushes, and pull request creation."
                techStack={[
                  "GitHub App API",
                  "Webhooks",
                  "OAuth 2.0",
                  "Octokit SDK",
                ]}
                useCases={[
                  "Listen for repository changes that require reindexing",
                  "Authenticate users and clone private repositories",
                  "Create branches, commits, and pull requests",
                  "Return the PR URL, diff, operations, and explanation",
                ]}
              />
            </div>
          </section>

          {/* Workflow Section */}
          <section id="workflow" className="mb-12 scroll-mt-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <GitPullRequest className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              End-to-End Workflow
            </h2>

            <div className="border-2 border-black">
              {[
                {
                  step: 1,
                  title: "Connect Repository",
                  description:
                    "The engineer signs in with GitHub, installs the GitHub App, and selects the repository and branch RepoLoom may access.",
                },
                {
                  step: 2,
                  title: "Submit a Task",
                  description:
                    "The engineer describes a scoped code change in the RepoLoom workspace; the API creates a durable worker job.",
                },
                {
                  step: 3,
                  title: "Index or Refresh",
                  description:
                    "On first use or after repository changes, the indexing worker clones the branch, chunks code, and updates BM25 and Pinecone indexes.",
                },
                {
                  step: 4,
                  title: "Retrieve the Right Surface",
                  description:
                    "BM25 and vector results are combined with adaptive reciprocal rank fusion to rank the files most relevant to the task.",
                },
                {
                  step: 5,
                  title: "Build Structural Context",
                  description:
                    "Babel AST analysis expands candidate files into dependency-aware context and compact code skeletons.",
                },
                {
                  step: 6,
                  title: "Generate File Operations",
                  description:
                    "Gemini 2.5 Flash selects files and returns explicit create, update, and delete operations with an explanation.",
                },
                {
                  step: 7,
                  title: "Apply and Validate",
                  description:
                    "E2B applies the operations in isolation. LangGraph checks syntax and TypeScript types, with up to three correction attempts.",
                },
                {
                  step: 8,
                  title: "Deliver Evidence",
                  description:
                    "RepoLoom commits and pushes the branch, opens a pull request, and returns the PR link, diff, file operations, and explanation for review.",
                },
              ].map((item, index) => (
                <WorkflowStep
                  key={index}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                  isLast={index === 7}
                />
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="technology" className="mb-12 scroll-mt-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              Technology Stack
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TechStackCard
                category="Backend"
                technologies={[
                  "Node.js + Express",
                  "TypeScript",
                  "Prisma ORM",
                  "PostgreSQL",
                  "Redis + BullMQ",
                  "JWT Authentication",
                ]}
              />
              <TechStackCard
                category="AI & ML"
                technologies={[
                  "LangGraph",
                  "Gemini 2.5 Flash",
                  "Gemini Embeddings",
                  "BM25 Search",
                  "Adaptive RRF",
                  "Pinecone",
                  "LangSmith Tracing",
                ]}
              />
              <TechStackCard
                category="Frontend"
                technologies={[
                  "Next.js 16",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Lucide Icons",
                ]}
              />
              <TechStackCard
                category="Execution & Delivery"
                technologies={[
                  "E2B Sandbox",
                  "Redis + BullMQ",
                  "GitHub App",
                  "GitHub Webhooks",
                  "Syntax Validation",
                  "TypeScript Validation",
                ]}
              />
            </div>
          </section>

          {/* Technical Deep Dive */}
          <div id="deep-dive" className="scroll-mt-8">
            <DeepDive />
          </div>

          {/* Key Optimizations Section */}
          <section id="optimizations" className="mb-12 scroll-mt-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              Key Optimizations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <OptimizationCard
                title="Token Efficiency"
                points={[
                  "Code skeletons compress structural context",
                  "Candidate ranking limits full-file context",
                  "Adaptive fusion balances lexical and semantic signals",
                  "Incremental indexing scopes repository changes",
                ]}
              />
              <OptimizationCard
                title="Performance"
                points={[
                  "BullMQ keeps long-running work outside request handling",
                  "Dedicated indexing and generation queues",
                  "Prisma manages the application data layer",
                  "Repository indexes are reused between tasks",
                ]}
              />
              <OptimizationCard
                title="Reliability"
                points={[
                  "E2B isolates generated file operations",
                  "Syntax and type failures block PR delivery",
                  "Validation errors feed a bounded correction loop",
                  "Webhook signatures protect repository events",
                ]}
              />
              <OptimizationCard
                title="Scalability"
                points={[
                  "API and workers remain independently deployable",
                  "Indexing and generation workloads are separated",
                  "Pinecone namespaces isolate repository vectors",
                  "BullMQ provides durable asynchronous dispatch",
                ]}
              />
            </div>
          </section>

          {/* User Journey Section */}
          <section id="journey" className="mb-12 scroll-mt-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              User Journey Example
            </h2>

            <div className="border-2 border-black p-4 sm:p-6 bg-gray-50">
              <div className="space-y-4">
                <JourneyStep
                  number={1}
                  action="Install GitHub App"
                  detail="User installs the GitHub App on their repository, granting access to read code and create PRs"
                />
                <JourneyStep
                  number={2}
                  action="Submit a Task"
                  detail='User selects a repository and asks: "Add input validation to the user registration endpoint."'
                />
                <JourneyStep
                  number={3}
                  action="Retrieve and Understand"
                  detail="RepoLoom refreshes the repository index when needed, ranks relevant files with hybrid search, and maps the surrounding dependency graph."
                />
                <JourneyStep
                  number={4}
                  action="Generate and Validate"
                  detail="Gemini proposes explicit file operations. E2B applies them in isolation while LangGraph checks syntax and TypeScript types."
                />
                <JourneyStep
                  number={5}
                  action="PR Creation"
                  detail="After validation passes, RepoLoom commits the branch, pushes it, and creates a pull request with the generated change."
                />
                <JourneyStep
                  number={6}
                  action="Review & Merge"
                  detail="The engineer reviews the PR, diff, file operations, and explanation, then decides whether to merge."
                />
              </div>
            </div>
          </section>

          {/* Future Enhancements Section */}
          <section id="roadmap" className="scroll-mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              Future Enhancements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <EnhancementCard
                title="Multi-language Support"
                description="Extend AST parsing to Python, Java, Go, and Rust codebases"
              />
              <EnhancementCard
                title="Conversational Refinement"
                description="Allow users to iterate on generated code through chat interface"
              />
              <EnhancementCard
                title="Cost Optimization"
                description="Implement caching layer for repeated queries and code patterns"
              />
              <EnhancementCard
                title="Analytics Dashboard"
                description="Track PR success rates, token usage, and code generation metrics"
              />
              <EnhancementCard
                title="Custom Validation Rules"
                description="Let users define project-specific linting and validation rules"
              />
              <EnhancementCard
                title="Multi-agent Collaboration"
                description="Deploy specialized agents for testing, documentation, and refactoring"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[var(--color-rule-strong)] bg-[var(--color-text)] text-[var(--color-surface)] sm:mt-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>RepoLoom.ai technical field guide</p>
          <p className="font-[family-name:var(--font-mono)] uppercase tracking-[0.12em]">
            TypeScript / LangGraph / Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}

// Component Definitions

interface ArchitectureCardProps {
  title: string;
  description: string;
  deployment: string;
  icon: React.ReactNode;
}

function ArchitectureCard({
  title,
  description,
  deployment,
  icon,
}: ArchitectureCardProps) {
  return (
    <div className="border-2 border-black p-4 sm:p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="inline-block border border-black px-3 py-1 text-sm font-mono">
        {deployment}
      </div>
    </div>
  );
}

interface FeatureBlockProps {
  title: string;
  description: string;
  techStack: string[];
  useCases: string[];
}

function FeatureBlock({
  title,
  description,
  techStack,
  useCases,
}: FeatureBlockProps) {
  return (
    <div className="border-2 border-black p-4 sm:p-6 hover:bg-gray-50 transition-colors">
      <h3 className="text-xl sm:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="mb-4">
        <h4 className="font-bold mb-2">Tech Stack:</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="border border-black px-3 py-1 text-sm font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">Use Cases:</h4>
        <ul className="space-y-1">
          {useCases.map((useCase, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-black mt-1">▪</span>
              <span className="text-gray-700">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface WorkflowStepProps {
  step: number;
  title: string;
  description: string;
  isLast: boolean;
}

function WorkflowStep({ step, title, description, isLast }: WorkflowStepProps) {
  return (
    <div
      className={`flex gap-3 sm:gap-6 p-4 sm:p-6 ${!isLast ? "border-b border-black" : ""}`}
    >
      <div className="flex-shrink-0">
        <div className="w-9 h-9 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center font-bold text-sm sm:text-lg">
          {step}
        </div>
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface TechStackCardProps {
  category: string;
  technologies: string[];
}

function TechStackCard({ category, technologies }: TechStackCardProps) {
  return (
    <div className="border-2 border-black p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-4">{category}</h3>
      <ul className="space-y-2">
        {technologies.map((tech, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black"></div>
            <span className="font-mono text-sm">{tech}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface OptimizationCardProps {
  title: string;
  points: string[];
}

function OptimizationCard({ title, points }: OptimizationCardProps) {
  return (
    <div className="border-2 border-black p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface JourneyStepProps {
  number: number;
  action: string;
  detail: string;
}

function JourneyStep({ number, action, detail }: JourneyStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{action}</h4>
        <p className="text-gray-700">{detail}</p>
      </div>
    </div>
  );
}

interface EnhancementCardProps {
  title: string;
  description: string;
}

function EnhancementCard({ title, description }: EnhancementCardProps) {
  return (
    <div className="border-2 border-black p-3 sm:p-4 hover:bg-gray-50 transition-colors">
      <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        {title}
      </h3>
      <p className="text-gray-700 text-xs sm:text-sm">{description}</p>
    </div>
  );
}
