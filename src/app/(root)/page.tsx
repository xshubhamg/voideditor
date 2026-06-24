"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";

export default function LandingPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (isPending) {
    return <Loading />;
  }

  if (session) {
    return <Loading />; // Show loading while redirecting to dashboard
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/20 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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

          <nav className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="/sign-in"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/10 hover:shadow-primary/20 hover:bg-primary/95 transition-all"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
          {/* Decorative Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Secure, AI-Powered <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Local Code Workspace
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
              Compile, execute, and refactor code offline with integrated local
              AI models. Keep your intellectual property fully secure, inside
              your environment.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                href="/sign-in"
                className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:bg-primary/95 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-7xl px-6 py-12 border-t border-border">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-center mb-12">
            Why choose Voideditor?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border border-border bg-card/45 p-6 space-y-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Offline-First AI
              </h3>
              <p className="text-sm text-muted-foreground">
                Run models like Llama and Qwen locally on your machine without
                cloud dependancy or subscription fees.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-border bg-card/45 p-6 space-y-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <svg
                  className="h-6 w-6"
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
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Maximum Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Your data never leaves your device. Perfect for enterprise
                compliance and strict IP requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-border bg-card/45 p-6 space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Robust Sandbox
              </h3>
              <p className="text-sm text-muted-foreground">
                Compile and execute code snippets securely inside an insulated
                virtual file sandbox.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center bg-card/10">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Voideditor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
