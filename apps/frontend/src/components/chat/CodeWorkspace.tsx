"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import E2BSandbox from "./Sandbox";
import GitDiff from "./GitDiff";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Job } from "@/types";

interface CodeWorkspaceProps {
  jobId: string;
  status: Job | null;
  isCompleted: boolean;
  prUrl?: string;
  token: string | null;
}

export default function CodeWorkspace({
  jobId,
  status,
  isCompleted,
  prUrl,
  token,
}: CodeWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("sandbox");
  const router = useRouter();

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--color-bg)]">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <header className="flex flex-none flex-col gap-3 border-b border-[var(--color-rule)] bg-[var(--color-surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <TabsList className="h-11 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-bg)] p-1">
              <TabsTrigger
                value="sandbox"
                className="min-h-8 rounded-[calc(var(--radius-md)-3px)] px-3 text-xs font-semibold data-[state=active]:bg-[var(--color-text)] data-[state=active]:text-[var(--color-surface)]"
              >
                Sandbox
              </TabsTrigger>
              <TabsTrigger
                value="diff"
                className="min-h-8 rounded-[calc(var(--radius-md)-3px)] px-3 text-xs font-semibold data-[state=active]:bg-[var(--color-text)] data-[state=active]:text-[var(--color-surface)]"
              >
                Git diff
              </TabsTrigger>
            </TabsList>
            <div className="hidden min-w-0 md:block">
              <p className="precision-label">Current state</p>
              <p className="truncate text-xs text-[var(--color-muted)]">
                {status?.state || "Connecting to worker"}
                {typeof status?.progress === "number" &&
                  ` / ${status.progress}%`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {isCompleted && prUrl && (
              <button
                type="button"
                className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-3 text-xs font-bold text-white transition hover:bg-[var(--color-accent-strong)] active:translate-y-px"
                onClick={() => window.open(prUrl, "_blank")}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                View pull request
              </button>
            )}
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-rule-strong)] px-3 text-xs font-semibold transition hover:border-[var(--color-text)] hover:bg-[var(--color-bg)] active:translate-y-px"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Workspace
            </button>
          </div>
        </header>

        <TabsContent
          value="sandbox"
          className="min-h-0 flex-1 overflow-hidden mt-0"
        >
          <E2BSandbox jobId={jobId} token={token} />
        </TabsContent>

        <TabsContent
          value="diff"
          className="min-h-0 flex-1 overflow-hidden mt-0"
        >
          <GitDiff jobId={jobId} token={token} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
