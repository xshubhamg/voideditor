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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
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
        // Redirect to sign in page
        setTimeout(() => {
          router.push("/sign-in");
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
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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

        <form onSubmit={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </Field>
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
