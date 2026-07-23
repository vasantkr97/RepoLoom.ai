"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Loader2, Terminal } from "lucide-react";

interface SandboxProps {
  jobId: string;
  token: string | null;
}

interface LogEntry {
  type: "output" | "error" | "command" | "success" | "info";
  content: string;
  timestamp: Date;
}

const progressSteps = [
  { progress: 10, message: "Creating isolated E2B sandbox environment..." },
  { progress: 20, message: "Cloning repository and setting up workspace..." },
  { progress: 30, message: "Detecting package manager and dependencies..." },
  {
    progress: 40,
    message:
      "Searching for relevant files using hybrid search (BM25 + Vector)...",
  },
  {
    progress: 50,
    message: "Building code graph and analyzing dependencies...",
  },
  { progress: 60, message: "Selecting files to modify based on your task..." },
  { progress: 70, message: "Generating code changes with AI..." },
  { progress: 80, message: "Running validation checks (syntax, types)..." },
  { progress: 90, message: "Validating code changes and running tests..." },
  { progress: 95, message: "Committing changes and creating pull request..." },
  { progress: 100, message: "Pull request created successfully!" },
];

const E2BSandbox = ({ jobId, token }: SandboxProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "info",
      content: `Job ID: ${jobId}`,
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "Initializing E2B sandbox environment...",
      timestamp: new Date(),
    },
  ]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [jobState, setJobState] = useState<string>("waiting");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const lastProgressRef = useRef(0);
  const prUrlAddedRef = useRef(false);
  const errorAddedRef = useRef(false);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    if (!jobId || !token) return;

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.repoloom.ai";

    const fetchJobStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/status/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) return;

        const data = await response.json();
        const progress = data.progress || 0;
        const state = data.state;

        setCurrentProgress(progress);
        setJobState(state);

        // Add new log entries based on progress milestones
        progressSteps.forEach((step) => {
          if (
            progress >= step.progress &&
            lastProgressRef.current < step.progress
          ) {
            setLogs((prevLogs) => [
              ...prevLogs,
              {
                type: progress === 100 ? "success" : "output",
                content: step.message,
                timestamp: new Date(),
              },
            ]);
          }
        });

        lastProgressRef.current = progress;

        // Add completion or error log (only once)
        if (state === "completed" && progress === 100) {
          if (data.result?.prUrl && !prUrlAddedRef.current) {
            prUrlAddedRef.current = true;
            setLogs((prevLogs) => [
              ...prevLogs,
              {
                type: "success",
                content: `✓ PR created: ${data.result.prUrl}`,
                timestamp: new Date(),
              },
            ]);
          }
          // Stop polling once completed
          clearInterval(intervalId);
        } else if (state === "failed") {
          if (!errorAddedRef.current) {
            errorAddedRef.current = true;
            setLogs((prevLogs) => [
              ...prevLogs,
              {
                type: "error",
                content: `✗ Job failed: ${data.result?.error || "Unknown error"}`,
                timestamp: new Date(),
              },
            ]);
          }
          // Stop polling once failed
          clearInterval(intervalId);
        }
      } catch (error) {
        // Silently fail - we'll retry on next poll
      }
    };

    // Initial fetch
    fetchJobStatus();

    // Poll every 2 seconds
    const intervalId = setInterval(fetchJobStatus, 2000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, token]);

  return (
    <div className="flex h-full min-h-0 flex-col p-3 sm:p-5">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-text)] text-[var(--color-surface)] shadow-[var(--shadow-md)]">
        <div className="flex flex-none items-center justify-between gap-4 border-b border-white/15 px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[var(--color-accent)]" />
            <div>
              <p className="precision-label !text-white/40">
                Isolated execution
              </p>
              <p className="text-xs font-semibold">E2B sandbox terminal</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-2">
            {jobState === "active" && (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent)]" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/55">
                  {currentProgress}%
                </span>
              </>
            )}
            {jobState === "completed" && (
              <>
                <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                <span className="text-xs text-[var(--color-success)]">
                  Completed
                </span>
              </>
            )}
            {jobState === "failed" && (
              <span className="text-xs text-[var(--color-danger)]">Failed</span>
            )}
            {jobState === "waiting" && (
              <span className="text-xs text-white/45">Waiting</span>
            )}
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-2 p-4 font-[family-name:var(--font-mono)] text-xs leading-5 sm:p-5">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[68px_1fr] gap-3 ${
                  log.type === "error"
                    ? "text-[var(--color-danger)]"
                    : log.type === "success"
                      ? "font-semibold text-[var(--color-success)]"
                      : log.type === "command"
                        ? "text-[var(--color-focus)]"
                        : log.type === "info"
                          ? "text-[var(--color-accent)]"
                          : "text-white/72"
                }`}
              >
                <span className="text-[10px] text-white/30">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className="min-w-0 break-words">{log.content}</span>
              </div>
            ))}
            {jobState === "active" && (
              <div className="mt-5 flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[color:rgba(207,82,47,0.1)] p-3 text-xs text-white/75">
                <Loader2 className="h-4 w-4 flex-none animate-spin text-[var(--color-accent)]" />
                <div>
                  <strong className="text-white">Active trace.</strong> The
                  sandbox remains available for 30 minutes after completion.
                </div>
              </div>
            )}
            {jobState === "completed" && (
              <div className="mt-5 flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-success)] bg-[color:rgba(24,122,80,0.1)] p-3 text-xs text-white/75">
                <CheckCircle2 className="h-4 w-4 flex-none text-[var(--color-success)]" />
                <div>
                  <strong className="text-white">Validation complete.</strong>{" "}
                  The sandbox remains available for 30 minutes for review.
                </div>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default E2BSandbox;
