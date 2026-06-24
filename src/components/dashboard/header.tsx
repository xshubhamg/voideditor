"use client";

import { ModeToggle } from "@/components/mode-toggle";

interface HeaderProps {
  handleSignOut: () => Promise<void>;
  loading: boolean;
}

export default function Header({ handleSignOut, loading }: HeaderProps) {
  return (
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
        <ModeToggle />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Connected
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-1.5 text-xs font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground md:hidden"
        >
          {loading ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
