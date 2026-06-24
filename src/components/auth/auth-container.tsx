"use client";

import { useState } from "react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

interface AuthContainerProps {
  initialSuccessMessage?: string | null;
  initialErrorMessage?: string | null;
}

export default function AuthContainer({
  initialSuccessMessage = null,
  initialErrorMessage = null,
}: AuthContainerProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialErrorMessage,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(
    initialSuccessMessage,
  );

  const switchTab = (tab: "signin" | "signup") => {
    setActiveTab(tab);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 overflow-hidden transition-all duration-300">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 shadow-lg shadow-primary/5">
            <svg
              className="h-6 w-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
              Voideditor
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto">
              Your AI-powered secure local coding workspace.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card/45 backdrop-blur-xl p-8 shadow-xl shadow-background/50">
          {/* Tab Selector */}
          <div className="flex rounded-lg bg-muted/60 p-1 mb-6">
            <button
              type="button"
              onClick={() => switchTab("signin")}
              className={`flex-1 rounded-md py-1.5 text-sm font-semibold tracking-wide transition-all ${
                activeTab === "signin"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchTab("signup")}
              className={`flex-1 rounded-md py-1.5 text-sm font-semibold tracking-wide transition-all ${
                activeTab === "signup"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive animate-shake">
              <svg
                className="h-4.5 w-4.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-semibold text-emerald-500 animate-fadeIn">
              <svg
                className="h-4.5 w-4.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {/* Form Content */}
          {activeTab === "signin" ? (
            <SignInForm
              loading={loading}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          ) : (
            <SignUpForm
              loading={loading}
              setLoading={setLoading}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}
