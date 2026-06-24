"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        router.push("/dashboard");
        router.refresh();
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive animate-shake">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-semibold text-emerald-500 animate-fadeIn">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Signing in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
