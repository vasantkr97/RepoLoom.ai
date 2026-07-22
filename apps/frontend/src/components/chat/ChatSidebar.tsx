"use client";

import ChatMessage from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressMessage } from "@/lib/progressMessages";
import { Loader2 } from "lucide-react";
import BrandMark from "@/components/BrandMark";

interface ChatSidebarProps {
  messages: ProgressMessage[];
  jobId: string;
  isLoading: boolean;
}

export default function ChatSidebar({
  messages,
  jobId,
  isLoading,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-[42dvh] w-full flex-none flex-col overflow-hidden border-b border-[var(--color-rule-strong)] bg-[var(--color-text)] text-[var(--color-surface)] lg:h-full lg:w-[390px] lg:border-b-0 lg:border-r">
      <div className="flex-none border-b border-white/15 p-4 sm:p-5">
        <BrandMark inverse />
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="precision-label !text-white/40">Execution trace</p>
            <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Job progress
            </h1>
          </div>
          {isLoading && messages.length === 0 && (
            <Loader2
              className="h-4 w-4 animate-spin text-[var(--color-accent)]"
              aria-label="Loading job progress"
            />
          )}
        </div>
        <p className="mt-3 truncate font-[family-name:var(--font-mono)] text-[10px] text-white/45">
          {jobId}
        </p>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="relative p-4 sm:p-5">
          <div className="absolute bottom-8 left-[35px] top-8 w-px bg-white/15" />
          {messages.length === 0 ? (
            <div className="relative z-10 flex min-h-28 items-center gap-4 rounded-[var(--radius-md)] border border-white/15 bg-white/[0.04] p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Initializing the weave</p>
                <p className="mt-1 text-xs text-white/45">
                  Waiting for the first repository signal.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  content={message.content}
                  status={message.status}
                  isActive={message.status === "active"}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
