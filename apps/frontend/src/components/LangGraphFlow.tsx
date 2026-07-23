const phases = [
  {
    number: "01",
    title: "Scoped file changes",
    detail:
      "A focused diff shows exactly which files and lines RepoLoom changed.",
  },
  {
    number: "02",
    title: "Change explanation",
    detail:
      "A concise summary connects the implementation back to the original task.",
  },
  {
    number: "03",
    title: "Validation result",
    detail:
      "Syntax and type checks make the handoff state explicit before review.",
  },
  {
    number: "04",
    title: "Pull request",
    detail:
      "The final branch and pull request remain under the engineer’s control.",
  },
];

export default function LangGraphFlow() {
  return (
    <ol
      className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule-strong)]"
      aria-label="RepoLoom review output"
    >
      {phases.map((phase, index) => (
        <li
          key={phase.number}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 py-3.5 sm:py-4"
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-[0.7rem] font-[family-name:var(--font-mono)] text-[9px] font-bold ${
              index === phases.length - 1
                ? "bg-[var(--color-copper)] text-white"
                : "border border-[var(--color-rule)] bg-[var(--color-bg)] text-[var(--color-accent)]"
            }`}
          >
            {phase.number}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-[-0.02em]">
              {phase.title}
            </h3>
            <p className="mt-0.5 text-[13px] leading-5 text-[var(--color-muted)]">
              {phase.detail}
            </p>
          </div>
          <span className="hidden font-[family-name:var(--font-mono)] text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] sm:block">
            Included
          </span>
        </li>
      ))}
    </ol>
  );
}
