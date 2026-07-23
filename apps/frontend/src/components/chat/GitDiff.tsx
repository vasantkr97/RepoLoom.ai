"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, FileCode, Files, Loader2 } from "lucide-react";

interface FileDiff {
  path: string;
  oldContent: string;
  newContent: string;
  diffOutput?: string;
}

interface GitDiffProps {
  jobId: string;
  token: string | null;
}

const GitDiff = ({ jobId, token }: GitDiffProps) => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [files, setFiles] = useState<FileDiff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId || !token) {
      setIsLoading(false);
      return;
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.repoloom.ai";
    let intervalId: NodeJS.Timeout | null = null;

    const fetchFileDiffs = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/job-details/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch file diffs");
        }

        const data = await response.json();
        setFiles(data.fileDiffs || []);
        setIsLoading(false);

        // Stop polling when job is completed or failed
        if (data.state === "completed" || data.state === "failed") {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchFileDiffs();

    // Poll for updates every 3 seconds
    intervalId = setInterval(fetchFileDiffs, 3000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId, token]);

  if (isLoading) {
    return (
      <DiffState
        icon={<Loader2 className="h-5 w-5 animate-spin" />}
        label="Loading file changes"
        detail="The diff will resolve as soon as the worker publishes it."
      />
    );
  }

  if (error) {
    return (
      <DiffState
        icon={<AlertTriangle className="h-5 w-5" />}
        label="Diff unavailable"
        detail={error}
        tone="danger"
      />
    );
  }

  if (!files || files.length === 0) {
    return (
      <DiffState
        icon={<Files className="h-5 w-5" />}
        label="No changes published yet"
        detail="This panel will populate after RepoLoom has generated the first coherent file change."
      />
    );
  }

  const renderUnifiedDiff = (diffOutput: string) => {
    if (!diffOutput) {
      return (
        <div className="p-5 text-sm text-[var(--color-muted)]">
          No diff output available
        </div>
      );
    }

    const lines = diffOutput.split("\n");

    return (
      <div className="bg-[var(--color-surface)] font-[family-name:var(--font-mono)] text-xs">
        {lines.map((line, idx) => {
          let bgColor = "";
          let textColor = "text-foreground";
          let linePrefix = "";

          if (line.startsWith("+")) {
            bgColor = "bg-[color:rgba(24,122,80,0.1)]";
            textColor = "text-[var(--color-success)]";
            linePrefix = "+";
          } else if (line.startsWith("-")) {
            bgColor = "bg-[color:rgba(197,60,52,0.1)]";
            textColor = "text-[var(--color-danger)]";
            linePrefix = "-";
          } else if (line.startsWith("@@")) {
            bgColor = "bg-[color:rgba(36,89,232,0.09)]";
            textColor = "text-[var(--color-focus)]";
          } else if (
            line.startsWith("diff --git") ||
            line.startsWith("index") ||
            line.startsWith("---") ||
            line.startsWith("+++") ||
            line.startsWith("new file") ||
            line.startsWith("deleted file")
          ) {
            bgColor = "bg-[var(--color-bg)]";
            textColor = "text-[var(--color-muted)]";
          }

          return (
            <div
              key={idx}
              className={`min-w-max px-4 py-0.5 ${bgColor} ${textColor}`}
            >
              <span className="mr-4 inline-block w-8 select-none text-right text-[color:rgba(94,105,99,0.65)]">
                {idx + 1}
              </span>
              <span className="whitespace-pre">{line || " "}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-none border-b border-[var(--color-rule)] bg-[var(--color-surface)] p-3 sm:px-5">
        <div className="flex items-center gap-3">
          <FileCode className="h-4 w-4 flex-none text-[var(--color-muted)]" />
          <Select
            value={selectedFile.toString()}
            onValueChange={(value: string) => setSelectedFile(parseInt(value))}
          >
            <SelectTrigger className="min-h-10 w-full max-w-md rounded-[var(--radius-md)] border-[var(--color-rule-strong)] bg-[var(--color-bg)]">
              <SelectValue>
                <span className="font-[family-name:var(--font-mono)] text-xs">
                  {files[selectedFile].path}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {files.map((file, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  <span className="font-[family-name:var(--font-mono)] text-xs">
                    {file.path}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="whitespace-nowrap text-xs text-[var(--color-muted)]">
            {selectedFile + 1} of {files.length}
          </span>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="m-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] sm:m-5">
          <div className="flex items-center justify-between border-b border-[var(--color-rule)] bg-[var(--color-bg)] px-4 py-3">
            <p className="font-[family-name:var(--font-mono)] text-xs">
              {files[selectedFile].path}
            </p>
            <span className="precision-label">Unified diff</span>
          </div>
          <div className="overflow-x-auto">
            {renderUnifiedDiff(files[selectedFile].diffOutput || "")}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

function DiffState({
  icon,
  label,
  detail,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
  tone?: "neutral" | "danger";
}) {
  return (
    <div className="flex h-full items-center justify-center p-6" role="status">
      <div className="max-w-sm text-center">
        <span
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${
            tone === "danger"
              ? "bg-[color:rgba(197,60,52,0.1)] text-[var(--color-danger)]"
              : "bg-[var(--color-text)] text-[var(--color-surface)]"
          }`}
        >
          {icon}
        </span>
        <p className="mt-5 font-semibold">{label}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default GitDiff;
