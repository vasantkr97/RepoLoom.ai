"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { GitHubRepo, ChatResponse } from "@/types";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  GitBranch,
  Loader2,
  LockKeyhole,
  LogOut,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();

  // State management
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [task, setTask] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobStatus, setJobStatus] = useState<ChatResponse | null>(null);
  const [loadingRepos, setLoadingRepos] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const fetchRepositories = useCallback(async () => {
    if (!token) return;

    try {
      setLoadingRepos(true);
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.100xswe.app";

      const response = await fetch(`${backendUrl}/auth/repos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const data = await response.json();
      setRepos(data.repos);
      setFilteredRepos(data.repos);
    } catch (error) {
      console.error("[Dashboard] Error fetching repos:", error);
      alert("Failed to fetch repositories. Please try again.");
    } finally {
      setLoadingRepos(false);
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      fetchRepositories();
    }
  }, [user, token, fetchRepositories]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRepos(repos);
    } else {
      const filtered = repos.filter(
        (repo) =>
          repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRepos(filtered);
    }
  }, [searchQuery, repos]);

  const handleRepoSelect = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setSearchQuery(repo.full_name);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRepo || !task.trim()) {
      alert("Please select a repository and describe your task");
      return;
    }

    setIsSubmitting(true);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.100xswe.app";
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          repoUrl: selectedRepo.html_url,
          task: task,
        }),
      });

      const data = await response.json();
      setJobStatus(data);

      setTask("");

      // Handle both response formats: indexing (codeGenJobId) and direct (jobId)
      const actualJobId = data.codeGenJobId || data.jobId;

      setTimeout(() => {
        router.push(`/chat?jobId=${actualJobId}`);
      }, 1500);
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to submit task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  // Show loading only while auth is resolving
  if (isLoading) {
    return (
      <LoadingScreen
        label="Opening your workspace"
        detail="Securing the RepoLoom session"
      />
    );
  }

  // If not authenticated, don't render anything (useEffect will redirect to "/")
  if (!user) {
    return null;
  }

  // Show loading while fetching repos (only for authenticated users)
  if (loadingRepos) {
    return (
      <LoadingScreen
        label="Reading your repositories"
        detail="Preparing the code map"
      />
    );
  }

  return (
    <div className="precision-canvas min-h-screen text-[var(--color-text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[color:rgba(241,238,229,0.94)] backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <LoomMark />
            <div className="min-w-0">
              <p className="truncate font-semibold tracking-[-0.025em]">
                RepoLoom.ai
              </p>
              <p className="precision-label hidden sm:block">
                Repository intelligence
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-surface)] px-3 py-1.5 md:flex">
            <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
            <span className="precision-label text-[var(--color-text)]">
              GitHub connected
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden max-w-48 text-right sm:block">
              <p className="truncate text-sm font-semibold">
                {user.name || user.username}
              </p>
              <p className="truncate text-xs text-[var(--color-muted)]">
                {user.email}
              </p>
            </div>
            {/* GitHub avatars use external hosts not configured for next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={`${user.username}'s GitHub avatar`}
              className="h-10 w-10 rounded-full border border-[var(--color-rule-strong)] object-cover"
            />
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border border-transparent px-3 text-sm font-semibold transition duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-[var(--color-rule)] hover:bg-[var(--color-surface)] active:translate-y-px focus-visible:outline-[var(--color-focus)]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-16">
        <aside className="precision-enter lg:col-span-4 lg:pr-4">
          <p className="precision-label mb-5">New code weave / 001</p>
          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.3rem)] leading-[0.9] tracking-[-0.045em]">
            Turn intent into a pull request.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            Choose the repository. Describe the outcome. RepoLoom traces the
            codebase, validates the work, and returns a review-ready change.
          </p>

          <div className="relative mt-10 max-w-md pb-2">
            <div className="loomline-draw absolute bottom-8 left-[15px] top-4 w-px bg-[var(--color-rule-strong)]" />
            <div className="space-y-7">
              <LoomStage
                number="01"
                title="Repository"
                detail={selectedRepo?.full_name || "Choose the codebase"}
                status={selectedRepo ? "complete" : "active"}
              />
              <LoomStage
                number="02"
                title="Build brief"
                detail={task.trim() ? "Intent captured" : "Define the outcome"}
                status={
                  jobStatus
                    ? "complete"
                    : task.trim()
                      ? "active"
                      : selectedRepo
                        ? "active"
                        : "pending"
                }
              />
              <LoomStage
                number="03"
                title="Validated PR"
                detail={
                  jobStatus
                    ? "Moving to live execution"
                    : "Generated and tested"
                }
                status={jobStatus ? "active" : "pending"}
              />
            </div>
          </div>
        </aside>

        <section
          className="precision-enter lg:col-span-8"
          style={{ animationDelay: "110ms" }}
          aria-labelledby="task-composer-title"
        >
          <div className="precision-surface overflow-visible rounded-[var(--radius-lg)]">
            <div className="flex flex-col gap-4 border-b border-[var(--color-rule)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="precision-label">Task composer</p>
                <h2
                  id="task-composer-title"
                  className="mt-1 text-xl font-semibold tracking-[-0.025em]"
                >
                  What should RepoLoom ship?
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                Private repositories stay scoped to your installation
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
              <div className="relative z-20">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="repository-search"
                    className="text-sm font-semibold"
                  >
                    Repository
                  </label>
                  <span className="precision-label">Required</span>
                </div>

                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)]"
                    aria-hidden="true"
                  />
                  <input
                    id="repository-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search repositories"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={showDropdown}
                    aria-controls="repository-options"
                    aria-autocomplete="list"
                    className="min-h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] py-3 pl-12 pr-28 text-base outline-none transition duration-[var(--duration-fast)] placeholder:text-[color:rgba(94,105,99,0.72)] hover:border-[var(--color-text)] focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[color:rgba(36,89,232,0.14)]"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center gap-2">
                    {selectedRepo?.language && (
                      <span className="rounded-full bg-[var(--color-surface-strong)] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-wide">
                        {selectedRepo.language}
                      </span>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--color-muted)] transition-transform duration-[var(--duration-fast)] ${showDropdown ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {showDropdown && filteredRepos.length > 0 && (
                  <div
                    id="repository-options"
                    role="listbox"
                    aria-label="Available repositories"
                    className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-lg)]"
                  >
                    {filteredRepos.map((repo) => (
                      <button
                        key={repo.id}
                        type="button"
                        role="option"
                        aria-selected={selectedRepo?.id === repo.id}
                        onClick={() => handleRepoSelect(repo)}
                        className="group flex min-h-16 w-full items-center gap-3 rounded-[calc(var(--radius-md)-2px)] px-3 py-3 text-left transition duration-[var(--duration-fast)] hover:bg-[var(--color-surface-strong)] active:translate-y-px focus-visible:bg-[var(--color-surface-strong)]"
                      >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-rule)] bg-[var(--color-bg)]">
                          <GitBranch className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">
                            {repo.full_name}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-[var(--color-muted)]">
                            {repo.description ||
                              "Repository ready for analysis"}
                          </span>
                        </span>
                        <span className="flex flex-none items-center gap-2">
                          {repo.private && (
                            <LockKeyhole
                              className="h-3.5 w-3.5 text-[var(--color-muted)]"
                              aria-label="Private repository"
                            />
                          )}
                          {selectedRepo?.id === repo.id && (
                            <Check
                              className="h-4 w-4 text-[var(--color-success)]"
                              aria-label="Selected"
                            />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {showDropdown && filteredRepos.length === 0 && searchQuery && (
                  <div
                    id="repository-options"
                    role="status"
                    className="absolute z-30 mt-2 w-full rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)]"
                  >
                    <p className="font-semibold">No matching repository</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      Try an organization name, repository name, or clear the
                      search.
                    </p>
                  </div>
                )}

                {showDropdown && (
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                    aria-hidden="true"
                  />
                )}
              </div>

              {!loadingRepos && repos.length === 0 && !searchQuery && (
                <div className="mt-4 grid gap-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-rule-strong)] bg-[var(--color-bg)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="precision-label mb-2">Installation needed</p>
                    <h3 className="font-semibold">Connect a repository</h3>
                    <p className="mt-1 max-w-lg text-sm text-[var(--color-muted)]">
                      Install the GitHub App and choose the repositories
                      RepoLoom can read and update.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        "https://github.com/apps/100xSWE/installations/new";
                    }}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-[var(--color-surface)] transition duration-[var(--duration-fast)] hover:bg-[var(--color-accent)] active:translate-y-px"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Install GitHub App
                  </button>
                </div>
              )}

              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="build-brief"
                    className="text-sm font-semibold"
                  >
                    Build brief
                  </label>
                  <span className="precision-label hidden sm:inline">
                    Ctrl / ⌘ + Enter to submit
                  </span>
                </div>
                <textarea
                  id="build-brief"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the outcome, constraints, and acceptance criteria…"
                  rows={8}
                  className="w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] px-4 py-4 text-base leading-7 outline-none transition duration-[var(--duration-fast)] placeholder:text-[color:rgba(94,105,99,0.72)] hover:border-[var(--color-text)] focus:border-[var(--color-focus)] focus:ring-2 focus:ring-[color:rgba(36,89,232,0.14)]"
                />
                <div className="mt-2 flex min-h-5 items-center justify-between gap-3">
                  <p className="text-xs text-[var(--color-muted)]">
                    {selectedRepo
                      ? `Working in ${selectedRepo.name}`
                      : "Select a repository to scope the work"}
                  </p>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-muted)]">
                    {task.length.toLocaleString()} chars
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-4 border-t border-[var(--color-rule)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <Sparkles
                    className="h-4 w-4 text-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  Analysis, generation, and validation run as one trace.
                </div>
                <button
                  type="submit"
                  disabled={!selectedRepo || !task.trim() || isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-accent-strong)] hover:shadow-[var(--shadow-md)] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[var(--color-surface-strong)] disabled:text-[var(--color-muted)] disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Starting the weave
                    </>
                  ) : (
                    <>
                      Generate pull request
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {jobStatus && (
            <div
              className="precision-enter mt-5 grid gap-5 rounded-[var(--radius-lg)] border border-[var(--color-rule-strong)] bg-[var(--color-text)] p-5 text-[var(--color-surface)] shadow-[var(--shadow-lg)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
              role="status"
              aria-live="polite"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)]">
                {jobStatus.indexing ? (
                  <Loader2
                    className="h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Check className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div>
                <p className="precision-label !text-[color:rgba(251,249,243,0.58)]">
                  Task accepted
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {jobStatus.indexing
                    ? "Mapping the repository"
                    : "Opening the live execution trace"}
                </h3>
                <p className="mt-1 text-sm text-[color:rgba(251,249,243,0.68)]">
                  {jobStatus.message}
                </p>
              </div>
              <div className="font-[family-name:var(--font-mono)] text-xs text-[color:rgba(251,249,243,0.62)] sm:text-right">
                <span className="block text-[10px] uppercase tracking-[0.12em]">
                  Job ID
                </span>
                {jobStatus.jobId || jobStatus.codeGenJobId}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-[var(--color-rule)] px-4 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>RepoLoom.ai / Repository intelligence that ships</p>
        <p className="font-[family-name:var(--font-mono)] uppercase tracking-[0.1em]">
          Secure GitHub workspace
        </p>
      </footer>
    </div>
  );
}

function LoomMark() {
  return (
    <span
      className="relative flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-text)]"
      aria-hidden="true"
    >
      <span className="absolute h-6 w-px -rotate-[28deg] bg-[var(--color-accent)]" />
      <span className="absolute h-6 w-px rotate-[28deg] bg-[var(--color-surface)]" />
      <span className="absolute h-px w-5 bg-[var(--color-surface)]" />
    </span>
  );
}

function LoadingScreen({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="precision-canvas flex min-h-screen items-center justify-center px-6">
      <div className="text-center" role="status" aria-live="polite">
        <div className="relative mx-auto mb-6 h-20 w-20">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-rule-strong)]" />
          <div
            className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "loom-pulse 1.4s ease-in-out infinite" }}
          />
          <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--color-text)] bg-[var(--color-bg)]" />
        </div>
        <p className="precision-label mb-2">RepoLoom.ai</p>
        <p className="text-lg font-semibold">{label}</p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{detail}</p>
      </div>
    </div>
  );
}

function LoomStage({
  number,
  title,
  detail,
  status,
}: {
  number: string;
  title: string;
  detail: string;
  status: "complete" | "active" | "pending";
}) {
  return (
    <div className="relative z-10 flex items-start gap-4">
      <span
        className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border font-[family-name:var(--font-mono)] text-[9px] font-bold transition-colors duration-[var(--duration-base)] ${
          status === "complete"
            ? "border-[var(--color-success)] bg-[var(--color-success)] text-white"
            : status === "active"
              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
              : "border-[var(--color-rule-strong)] bg-[var(--color-bg)] text-[var(--color-muted)]"
        }`}
      >
        {status === "complete" ? <Check className="h-3.5 w-3.5" /> : number}
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-[var(--color-muted)]">{detail}</p>
      </div>
    </div>
  );
}
