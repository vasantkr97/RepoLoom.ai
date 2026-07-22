"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import CodeWorkspace from "@/components/chat/CodeWorkspace";
import BrandMark from "@/components/BrandMark";
import { useJobStatus } from "@/hooks/useJobStatus";
import { getProgressMessages } from "@/lib/progressMessages";
import { useAuth } from "@/contexts/AuthContext";

function ChatContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { token } = useAuth();
  const { status, error, isLoading } = useJobStatus(jobId, token);

  const messages = status
    ? getProgressMessages(status.progress || 0, status.state)
    : [];

  if (!jobId) {
    return (
      <WorkspaceNotice
        title="No execution trace found"
        detail="Start a task from the workspace to create a trace and follow its validation progress."
      />
    );
  }

  if (error) {
    return (
      <WorkspaceNotice
        title="The trace could not be loaded"
        detail={error}
        tone="danger"
      />
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[var(--color-bg)] lg:flex-row">
      <ChatSidebar messages={messages} jobId={jobId} isLoading={isLoading} />
      <CodeWorkspace
        jobId={jobId}
        status={status}
        isCompleted={status?.state === "completed"}
        prUrl={status?.result?.prUrl}
        token={token}
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="precision-canvas flex h-dvh items-center justify-center px-6">
          <div className="text-center" role="status" aria-live="polite">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-[var(--color-accent)]" />
            <p className="precision-label mt-4">Opening execution trace</p>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}

function WorkspaceNotice({
  title,
  detail,
  tone = "neutral",
}: {
  title: string;
  detail: string;
  tone?: "neutral" | "danger";
}) {
  return (
    <main className="precision-canvas flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
        <BrandMark />
        <div
          className={`mt-10 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${
            tone === "danger"
              ? "bg-[color:rgba(197,60,52,0.12)] text-[var(--color-danger)]"
              : "bg-[var(--color-text)] text-[var(--color-surface)]"
          }`}
        >
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-none tracking-[-0.035em]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
          {detail}
        </p>
        <Link
          href="/dashboard"
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 text-sm font-bold text-[var(--color-surface)] transition hover:bg-[var(--color-accent)] active:translate-y-px"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Return to workspace
        </Link>
      </div>
    </main>
  );
}
