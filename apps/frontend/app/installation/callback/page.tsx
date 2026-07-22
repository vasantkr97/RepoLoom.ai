"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import BrandMark from "@/components/BrandMark";

interface Installation {
  installationId: number;
  targetType: string;
  account: {
    login: string;
    avatarUrl: string;
  };
}

function InstallationCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, isLoading } = useAuth();
  const [status, setStatus] = useState<"checking" | "success" | "error">(
    "checking"
  );
  const [message, setMessage] = useState("Verifying installation...");

  useEffect(() => {
    // Wait for authentication to be ready
    if (isLoading) return;

    if (!user || !token) {
      setStatus("error");
      setMessage("Authentication failed. Please log in again.");
      return;
    }

    const verifyInstallation = async () => {
      try {
        const installationId = searchParams.get("installation_id");
        const setupAction = searchParams.get("setup_action");

        console.log("[Installation Callback] Installation ID:", installationId);
        console.log("[Installation Callback] Setup Action:", setupAction);

        if (!installationId) {
          throw new Error("No installation ID received");
        }

        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.100xswe.app";

        // Polling configuration
        const maxAttempts = 15; // 30 seconds total
        const interval = 2000; // 2 seconds
        let attempts = 0;
        let verified = false;

        while (attempts < maxAttempts && !verified) {
          setMessage(
            attempts === 0 ? "Processing installation..." : "Still verifying..."
          );

          try {
            const response = await fetch(`${backendUrl}/installation/list`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log(
                `[Installation Callback] Attempt ${attempts + 1}:`,
                data
              );

              const installation = data.installations?.find(
                (inst: Installation) =>
                  inst.installationId === parseInt(installationId)
              );

              if (installation) {
                console.log(
                  "[Installation Callback] Installation verified!",
                  installation
                );
                setStatus("success");
                setMessage(
                  "Installation successful! Redirecting to dashboard..."
                );
                verified = true;

                // Redirect to dashboard after short delay
                setTimeout(() => {
                  router.push("/dashboard");
                }, 1500);
                return;
              }
            }
          } catch (err) {
            console.warn(
              `[Installation Callback] Attempt ${attempts + 1} failed:`,
              err
            );
          }

          // Wait before next attempt if not verified
          if (!verified) {
            await new Promise((resolve) => setTimeout(resolve, interval));
            attempts++;
          }
        }

        if (!verified) {
          throw new Error(
            "Installation verification timed out. It may still be processing."
          );
        }
      } catch (error: unknown) {
        console.error("[Installation Callback] Error:", error);
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to verify installation"
        );

        // Redirect to dashboard anyway after 5 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      }
    };

    verifyInstallation();
  }, [searchParams, router, user, token, isLoading]);

  return <InstallationFrame status={status} message={message} />;
}

function InstallationFrame({
  status,
  message,
}: {
  status: "checking" | "success" | "error";
  message: string;
}) {
  const copy = {
    checking: {
      eyebrow: "Installation trace / verifying",
      title: "Connecting the repository loom.",
      note: "GitHub may need a few seconds to publish the installation.",
    },
    success: {
      eyebrow: "Installation trace / complete",
      title: "Repositories connected.",
      note: "Opening your workspace with the new repository scope.",
    },
    error: {
      eyebrow: "Installation trace / attention",
      title: "The handoff needs attention.",
      note: "You can finish or retry repository setup from the workspace.",
    },
  }[status];

  return (
    <main className="precision-canvas flex min-h-screen items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-rule-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]"
        role="status"
        aria-live="polite"
      >
        <div className="border-b border-[var(--color-rule)] px-5 py-4 sm:px-8">
          <BrandMark />
        </div>
        <div className="grid sm:grid-cols-[150px_1fr]">
          <div className="flex items-center justify-center border-b border-[var(--color-rule)] bg-[var(--color-text)] p-8 text-[var(--color-surface)] sm:border-b-0 sm:border-r">
            {status === "checking" && (
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent)]" />
            )}
            {status === "success" && (
              <CheckCircle className="h-10 w-10 text-[var(--color-success)]" />
            )}
            {status === "error" && (
              <XCircle className="h-10 w-10 text-[var(--color-danger)]" />
            )}
          </div>
          <div className="p-6 sm:p-9">
            <p className="precision-label">{copy.eyebrow}</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.9] tracking-[-0.045em]">
              {copy.title}
            </h1>
            <p className="mt-5 text-sm font-semibold leading-6">{message}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {copy.note}
            </p>
            <div className="mt-8 h-px overflow-hidden bg-[var(--color-rule)]">
              <div
                className={`h-full transition-all duration-[var(--duration-slow)] ${
                  status === "checking"
                    ? "w-3/5 animate-pulse bg-[var(--color-accent)]"
                    : status === "success"
                      ? "w-full bg-[var(--color-success)]"
                      : "w-full bg-[var(--color-danger)]"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function InstallationCallback() {
  return (
    <Suspense
      fallback={
        <InstallationFrame
          status="checking"
          message="Preparing the installation callback."
        />
      }
    >
      <InstallationCallbackContent />
    </Suspense>
  );
}
