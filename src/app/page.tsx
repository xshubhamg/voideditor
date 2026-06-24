"use client";

import { useState } from "react";
import AuthContainer from "@/components/auth/auth-container";
import Header from "@/components/dashboard/header";
import ModelsTab from "@/components/dashboard/models-tab";
import ProfileTab from "@/components/dashboard/profile-tab";
import SessionTab from "@/components/dashboard/session-tab";
import Sidebar from "@/components/dashboard/sidebar";
import Loading from "@/components/loading";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "profile" | "session" | "models"
  >("profile");

  // UI state for sign out and general messages
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      setSuccessMessage("Signed out successfully.");
      setErrorMessage(null);
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
    return <Loading />;
  }

  // Logged In Dashboard View
  if (session) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
        {/* Sidebar */}
        <Sidebar
          activeDashboardTab={activeDashboardTab}
          setActiveDashboardTab={setActiveDashboardTab}
          handleSignOut={handleSignOut}
          loading={loading}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header Dashboard */}
          <Header handleSignOut={handleSignOut} loading={loading} />

          <div className="mt-8 max-w-4xl">
            {successMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-500 animate-fadeIn">
                <svg
                  className="h-5 w-5 shrink-0"
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

            {errorMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive animate-shake">
                <svg
                  className="h-5 w-5 shrink-0"
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

            {/* Profile Tab */}
            {activeDashboardTab === "profile" && (
              <ProfileTab session={session} />
            )}

            {/* Session Tab */}
            {activeDashboardTab === "session" && (
              <SessionTab session={session} />
            )}

            {/* Local Models Tab */}
            {activeDashboardTab === "models" && <ModelsTab />}
          </div>
        </main>
      </div>
    );
  }

  // Logged Out Sign In / Sign Up Forms View
  return (
    <AuthContainer
      initialSuccessMessage={successMessage}
      initialErrorMessage={errorMessage}
    />
  );
}
