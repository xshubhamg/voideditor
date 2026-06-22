"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Active sub-section on the dashboard
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "profile" | "session" | "models"
  >("profile");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
      } else {
        setSuccessMessage("Signed in successfully!");
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setErrorMessage(error.message || "Could not complete registration.");
      } else {
        setSuccessMessage("Registered successfully! Welcome aboard.");
        // Auto sign-in or switch to sign-in tab
        setTimeout(() => {
          setActiveTab("signin");
          setPassword("");
        }, 1500);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      setSuccessMessage("Signed out successfully.");
      setErrorMessage(null);
      // Clear forms
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Could not sign out.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-all duration-300">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <div className="absolute inset-0 m-auto h-8 w-8 animate-ping rounded-full bg-primary/20"></div>
        </div>
        <p className="mt-6 text-sm font-medium tracking-wider text-muted-foreground animate-pulse">
          INITIALIZING SECURE SESSION...
        </p>
      </div>
    );
  }

  // Logged In Dashboard View
  if (session) {
    const userInitials = session.user.name
      ? session.user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
        {/* Sidebar */}
        <aside className="relative w-full shrink-0 border-b border-border bg-card/40 backdrop-blur-md md:w-64 md:border-r md:border-b-0">
          <div className="flex h-16 items-center px-6 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">
                Voideditor
              </span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button
              type="button"
              onClick={() => setActiveDashboardTab("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeDashboardTab === "profile"
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              User Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveDashboardTab("session")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeDashboardTab === "session"
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Active Session
            </button>
            <button
              type="button"
              onClick={() => setActiveDashboardTab("models")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeDashboardTab === "models"
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              AI Models (Local)
            </button>
          </nav>

          <div className="absolute bottom-4 left-4 right-4 hidden md:block">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-destructive-foreground"></div>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header Dashboard */}
          <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Secure Terminal
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your active authentication sandbox state.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-1.5 text-xs font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground md:hidden"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="mt-8 max-w-4xl">
            {successMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-500 animate-fadeIn">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
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

            {/* Profile Tab */}
            {activeDashboardTab === "profile" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground font-heading text-3xl font-bold shadow-lg shadow-primary/20 border border-primary/30">
                      {userInitials}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight">
                        {session.user.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                      <div className="flex items-center gap-2 pt-1.5">
                        <span className="rounded bg-muted px-2 py-0.5 text-2xs font-mono font-medium text-muted-foreground uppercase">
                          Prisma MongoDB Model
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                      ACCOUNT INFORMATION
                    </h3>
                    <div className="space-y-3.5">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          User Name
                        </span>
                        <p className="text-sm font-medium mt-0.5">
                          {session.user.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Email Address
                        </span>
                        <p className="text-sm font-medium mt-0.5">
                          {session.user.email}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Email Verified
                        </span>
                        <p className="text-sm mt-0.5 flex items-center gap-1.5">
                          {session.user.emailVerified ? (
                            <span className="text-emerald-500 text-xs font-semibold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{" "}
                              Verified
                            </span>
                          ) : (
                            <span className="text-yellow-500 text-xs font-semibold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>{" "}
                              Pending
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                      DATABASE METADATA
                    </h3>
                    <div className="space-y-3.5">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Unique ID (MongoDB ObjectId/CUID)
                        </span>
                        <p className="text-xs font-mono font-medium mt-0.5 bg-muted/50 p-2 rounded border border-border overflow-x-auto text-foreground">
                          {session.user.id}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Created On
                        </span>
                        <p className="text-sm font-medium mt-0.5">
                          {new Date(session.user.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Last Updated
                        </span>
                        <p className="text-sm font-medium mt-0.5">
                          {new Date(session.user.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-gradient-to-r from-primary/10 to-transparent p-6 backdrop-blur-md flex flex-col justify-between items-start gap-4 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-foreground">
                      Ready to start code editing?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Launch your workspace and get AI assistance powered by
                      local models.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2.5 text-sm shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Launch Editor Sandbox
                  </button>
                </div>
              </div>
            )}

            {/* Session Tab */}
            {activeDashboardTab === "session" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-5">
                  <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    BETTER AUTH SESSION STATE
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Session Expiration Date
                      </span>
                      <p className="text-sm font-medium mt-0.5">
                        {new Date(session.session.expiresAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        IP Address
                      </span>
                      <p className="text-sm font-medium mt-0.5">
                        {session.session.ipAddress || "Localhost (127.0.0.1)"}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">
                      Device User Agent
                    </span>
                    <p className="text-xs font-mono font-medium mt-1 bg-muted/50 p-2.5 rounded border border-border text-muted-foreground leading-relaxed">
                      {session.session.userAgent ||
                        "Next.js Server / UserAgent Context Unavailable"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    SESSION TOKEN & METRICS
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Session ID
                      </span>
                      <p className="text-xs font-mono mt-0.5 bg-muted/30 p-2 rounded overflow-x-auto text-foreground">
                        {session.session.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        Session Token
                      </span>
                      <p className="text-xs font-mono mt-0.5 bg-muted/30 p-2 rounded overflow-x-auto text-foreground truncate select-all">
                        {session.session.token}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Local Models Tab */}
            {activeDashboardTab === "models" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    CONNECTED LOCAL LLM INSTANCES
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Voideditor targets offline development environments. Here
                    you can monitor status of local models configured on your
                    system.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card/20">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Model Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-sm">
                        <tr>
                          <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                            qwen2.5-coder:7b
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">
                            Autocomplete & Chat
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-emerald-500 font-semibold text-xs">
                              Ready
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                            deepseek-coder:6.7b
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">
                            Inline Refactoring
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-emerald-500 font-semibold text-xs">
                              Ready
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                            llama3.2:3b
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">
                            Agent Planner
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-muted-foreground text-xs">
                              Offline
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Logged Out Sign In / Sign Up Forms View
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 overflow-hidden transition-all duration-300">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-primary/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>

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
              onClick={() => {
                setActiveTab("signin");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
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
              onClick={() => {
                setActiveTab("signup");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
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
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label
                  htmlFor="signin-email"
                  className="block text-xs font-bold tracking-wide text-muted-foreground uppercase mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full rounded-lg bg-muted/40 border border-border px-4 py-2.5 pl-10 text-sm placeholder-muted-foreground/60 transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="signin-password"
                    className="block text-xs font-bold tracking-wide text-muted-foreground uppercase"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    id="signin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full rounded-lg bg-muted/40 border border-border px-4 py-2.5 pl-10 text-sm placeholder-muted-foreground/60 transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-bold tracking-wide py-2.5 text-sm shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-primary-foreground"></div>
                ) : (
                  <span>Access Account</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-bold tracking-wide text-muted-foreground uppercase mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={loading}
                    className="w-full rounded-lg bg-muted/40 border border-border px-4 py-2.5 pl-10 text-sm placeholder-muted-foreground/60 transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-bold tracking-wide text-muted-foreground uppercase mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full rounded-lg bg-muted/40 border border-border px-4 py-2.5 pl-10 text-sm placeholder-muted-foreground/60 transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-bold tracking-wide text-muted-foreground uppercase mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    disabled={loading}
                    className="w-full rounded-lg bg-muted/40 border border-border px-4 py-2.5 pl-10 text-sm placeholder-muted-foreground/60 transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/40 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-bold tracking-wide py-2.5 text-sm shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-primary-foreground"></div>
                ) : (
                  <span>Create Workspace</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
