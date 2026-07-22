"use client";

import { useState } from "react";
import {
  X,
  Github,
  Loader2,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandMark from "@/components/BrandMark";
import { openOAuthPopup } from "@/lib/oauth-popup";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "login" | "install" | "complete";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://be.100xswe.app";
  const githubAppName = "100xSWE";

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const oauthUrl = `${backendUrl}/auth/github/login`;
      const result = await openOAuthPopup(oauthUrl);

      // Save authentication
      login(result.token, result.user);

      console.log("[AuthModal] Login successful:", result.user.username);

      // Check if THIS USER already has installations
      try {
        const installationsResponse = await fetch(
          `${backendUrl}/auth/installations`,
          {
            headers: {
              Authorization: `Bearer ${result.token}`,
            },
          }
        );

        if (!installationsResponse.ok) {
          throw new Error("Failed to check installations");
        }

        const installationsData = await installationsResponse.json();

        console.log("[AuthModal] User installations:", installationsData);

        if (installationsData.total > 0) {
          // User already has installations, redirect to dashboard
          console.log(
            "[AuthModal] User already has installations, redirecting to dashboard"
          );
          router.push("/dashboard");
          onClose();
        } else {
          // No installations, show installation step
          console.log(
            "[AuthModal] No installations found, showing install step"
          );
          setStep("install");
        }
      } catch (err) {
        console.error("[AuthModal] Error checking installations:", err);
        // If we can't check installations, show install step to be safe
        setStep("install");
      }
    } catch (err: unknown) {
      console.error("[AuthModal] OAuth error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to authenticate with GitHub"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInstallApp = () => {
    // Redirect to GitHub App installation page
    // After installation, GitHub will redirect back to our callback URL
    const frontendUrl =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const redirectUri = `${frontendUrl}/installation/callback`;
    const installUrl = `https://github.com/apps/${githubAppName}/installations/new?state=install`;

    console.log(
      "[AuthModal] Redirecting to GitHub App installation:",
      installUrl
    );

    // Full page redirect (GitHub App installation can't happen in popup/iframe)
    window.location.href = installUrl;
  };

  const handleSkipInstall = () => {
    // Go directly to dashboard without app installation
    router.push("/dashboard");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:rgba(11,20,17,0.74)] p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="animate-scale-in max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-lg)] border border-white/15 bg-[var(--color-surface)] shadow-[var(--shadow-lg)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-5 py-4 sm:px-7">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-rule)] transition-colors hover:border-[var(--color-text)] hover:bg-[var(--color-bg)] active:translate-y-px"
            aria-label="Close authentication"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid sm:grid-cols-[180px_1fr]">
          <aside className="border-b border-[var(--color-rule)] bg-[var(--color-bg)] p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="precision-label">Connection sequence</p>
            <div className="mt-5 flex gap-3 sm:flex-col">
              {["Authenticate", "Install", "Ready"].map((label, index) => {
                const currentIndex =
                  step === "login" ? 0 : step === "install" ? 1 : 2;
                return (
                  <div
                    key={label}
                    className="flex min-w-0 flex-1 items-center gap-2"
                  >
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-[9px] font-bold ${
                        index < currentIndex
                          ? "bg-[var(--color-success)] text-white"
                          : index === currentIndex
                            ? "bg-[var(--color-accent)] text-white"
                            : "border border-[var(--color-rule-strong)] text-[var(--color-muted)]"
                      }`}
                    >
                      {index < currentIndex ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        `0${index + 1}`
                      )}
                    </span>
                    <span className="truncate text-xs font-semibold">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="p-5 sm:p-8">
            {step === "login" && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-text)] text-[var(--color-surface)]">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="precision-label mt-6">Step one</p>
                <h2
                  id="auth-modal-title"
                  className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-[-0.035em]"
                >
                  Authenticate your workspace.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                  Use GitHub to identify your account and make your installed
                  repositories available to RepoLoom.
                </p>

                {error && (
                  <div
                    className="mt-5 flex items-start gap-3 rounded-[var(--radius-md)] border border-[color:rgba(197,60,52,0.35)] bg-[color:rgba(197,60,52,0.08)] p-4"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-[var(--color-danger)]" />
                    <p className="text-sm text-[var(--color-danger)]">
                      {error}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleGitHubLogin}
                  disabled={loading}
                  className="mt-7 min-h-12 w-full rounded-[var(--radius-md)] bg-[var(--color-accent)] font-bold text-white hover:bg-[var(--color-accent-strong)] active:translate-y-px"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connecting securely
                    </>
                  ) : (
                    <>
                      <Github className="mr-2 h-5 w-5" />
                      Continue with GitHub
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs leading-5 text-[var(--color-muted)]">
                  GitHub controls the authorization screen. RepoLoom receives
                  only the access granted to the installation.
                </p>
              </div>
            )}

            {step === "install" && (
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-success)] text-white">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="precision-label mt-6">Step two</p>
                <h2
                  id="auth-modal-title"
                  className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-[-0.035em]"
                >
                  Choose the repositories.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                  Install the GitHub App to scope RepoLoom to the codebases you
                  want it to understand and update.
                </p>

                <div className="mt-6 border-y border-[var(--color-rule)] py-4">
                  <ul className="space-y-3 text-xs">
                    {[
                      "Automatic indexing after repository updates",
                      "Incremental refreshes instead of full reprocessing",
                      "Scoped access controlled from GitHub",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-none text-[var(--color-success)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {error && (
                  <div
                    className="mt-5 flex items-start gap-3 rounded-[var(--radius-md)] border border-[color:rgba(197,60,52,0.35)] bg-[color:rgba(197,60,52,0.08)] p-4"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-[var(--color-danger)]" />
                    <p className="text-sm text-[var(--color-danger)]">
                      {error}
                    </p>
                  </div>
                )}

                <div className="mt-7 space-y-3">
                  <Button
                    onClick={handleInstallApp}
                    className="min-h-12 w-full rounded-[var(--radius-md)] bg-[var(--color-accent)] font-bold text-white hover:bg-[var(--color-accent-strong)] active:translate-y-px"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Install GitHub App
                  </Button>

                  <Button
                    onClick={handleSkipInstall}
                    variant="outline"
                    className="min-h-12 w-full rounded-[var(--radius-md)] border-[var(--color-rule-strong)] bg-transparent font-semibold text-[var(--color-text)] hover:border-[var(--color-text)] hover:bg-[var(--color-bg)] active:translate-y-px"
                  >
                    Continue without installing
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs leading-5 text-[var(--color-muted)]">
                  GitHub will return you to RepoLoom after repository selection.
                </p>
              </div>
            )}

            {step === "complete" && (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h2
                  id="auth-modal-title"
                  className="mt-6 font-[family-name:var(--font-display)] text-4xl"
                >
                  Workspace ready.
                </h2>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  Opening your repository workspace now.
                </p>
                <Loader2 className="mx-auto mt-6 h-5 w-5 animate-spin text-[var(--color-accent)]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
