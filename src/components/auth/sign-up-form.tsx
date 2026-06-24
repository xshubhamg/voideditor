"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface SignUpFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (msg: string | null) => void;
  setSuccessMessage: (msg: string | null) => void;
  setActiveTab: (tab: "signin" | "signup") => void;
}

export default function SignUpForm({
  loading,
  setLoading,
  setErrorMessage,
  setSuccessMessage,
  setActiveTab,
}: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
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
              aria-hidden="true"
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
              aria-hidden="true"
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
              aria-hidden="true"
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
  );
}
