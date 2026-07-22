"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import BrandMark from "@/components/BrandMark";
import { Loader2, ShieldCheck } from "lucide-react";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [mode, setMode] = useState<"popup" | "redirect">(() => {
    // Detect if opened in popup (has window.opener)
    if (typeof window !== "undefined") {
      const isPopup = window.opener && !window.opener.closed;
      return isPopup ? "popup" : "redirect";
    }
    return "redirect";
  });

  useEffect(() => {
    // Get token and user from URL query parameters
    const token = searchParams.get("token");
    const userJson = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      if (mode === "popup" && window.opener) {
        // Send error to parent window
        window.opener.postMessage(
          {
            type: "OAUTH_ERROR",
            error: error,
          },
          window.location.origin
        );
        window.close();
      } else {
        router.push(`/?error=${error}`);
      }
      return;
    }

    if (token && userJson) {
      try {
        // Parse user data from JSON string
        const user = JSON.parse(userJson);

        if (mode === "popup" && window.opener) {
          // Popup mode: Send data to parent window
          console.log("[OAuth Callback] Popup mode - sending data to parent");
          window.opener.postMessage(
            {
              type: "OAUTH_SUCCESS",
              payload: { token, user },
            },
            window.location.origin
          );

          // Close popup after short delay
          setTimeout(() => window.close(), 500);
        } else {
          // Redirect mode: Save and redirect to dashboard
          console.log(
            "[OAuth Callback] Redirect mode - saving and redirecting"
          );
          login(token, user);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("[OAuth Callback] Error parsing user data:", error);
        if (mode === "popup" && window.opener) {
          window.opener.postMessage(
            {
              type: "OAUTH_ERROR",
              error: "Invalid callback data",
            },
            window.location.origin
          );
          window.close();
        } else {
          router.push("/?error=invalid_callback");
        }
      }
    } else {
      console.error("[OAuth Callback] Missing token or user data");
      if (mode === "popup" && window.opener) {
        window.opener.postMessage(
          {
            type: "OAUTH_ERROR",
            error: "Missing authentication data",
          },
          window.location.origin
        );
        window.close();
      } else {
        router.push("/?error=missing_params");
      }
    }
  }, [searchParams, login, router, mode]);

  return (
    <CallbackFrame
      title="Securing your workspace"
      detail="Completing the GitHub authentication handoff."
    />
  );
}

export default function OAuthCallback() {
  return (
    <Suspense
      fallback={
        <CallbackFrame
          title="Opening authentication"
          detail="Preparing the secure GitHub handoff."
        />
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}

function CallbackFrame({ title, detail }: { title: string; detail: string }) {
  return (
    <main className="precision-canvas flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
        <BrandMark />
        <div className="relative mt-12 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-text)] text-[var(--color-surface)]">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          <Loader2 className="absolute -right-2 -top-2 h-5 w-5 animate-spin rounded-full bg-[var(--color-accent)] p-1 text-white" />
        </div>
        <p className="precision-label mt-7">Authentication trace</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-[-0.045em]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
          {detail}
        </p>
        <div className="mt-8 h-px overflow-hidden bg-[var(--color-rule)]">
          <div className="h-full w-2/3 bg-[var(--color-accent)] motion-safe:animate-pulse" />
        </div>
      </div>
    </main>
  );
}
