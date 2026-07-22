const phases = [
  {
    number: "01",
    title: "Frame the intent",
    detail:
      "The issue becomes an explicit, repository-scoped implementation brief.",
  },
  {
    number: "02",
    title: "Assemble context",
    detail:
      "Hybrid retrieval and the code graph expose the smallest coherent change surface.",
  },
  {
    number: "03",
    title: "Generate and challenge",
    detail:
      "The change is produced, checked, and retried against concrete failures.",
  },
  {
    number: "04",
    title: "Hand off evidence",
    detail:
      "The pull request arrives with a readable diff and validation trace.",
  },
];

export default function LangGraphFlow() {
  return (
    <div className="border-y border-[var(--color-rule-strong)]">
      {phases.map((phase, index) => (
        <div
          key={phase.number}
          className="group grid grid-cols-[auto_1fr] gap-4 border-b border-[var(--color-rule)] py-5 last:border-b-0 sm:gap-6 sm:py-6"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-[9px] font-bold transition-colors ${
              index === phases.length - 1
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-rule-strong)] group-hover:border-[var(--color-text)]"
            }`}
          >
            {phase.number}
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-[-0.025em]">
              {phase.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              {phase.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
