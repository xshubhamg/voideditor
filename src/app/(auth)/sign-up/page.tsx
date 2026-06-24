"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { SignupForm } from "@/components/signup-form";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
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
    return <Loading />; // Show loading while redirecting
  }

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

        <SignupForm />
      </div>
    </div>
  );
}
