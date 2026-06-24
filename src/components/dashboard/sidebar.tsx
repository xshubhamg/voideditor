"use client";

interface SidebarProps {
  activeDashboardTab: "profile" | "session" | "models";
  setActiveDashboardTab: (tab: "profile" | "session" | "models") => void;
  handleSignOut: () => Promise<void>;
  loading: boolean;
}

export default function Sidebar({
  activeDashboardTab,
  setActiveDashboardTab,
  handleSignOut,
  loading,
}: SidebarProps) {
  return (
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
              aria-hidden="true"
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
            aria-hidden="true"
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
            aria-hidden="true"
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
            aria-hidden="true"
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
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-destructive-foreground" />
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
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
  );
}
