import type { authClient } from "@/lib/auth-client";

export type SessionType = NonNullable<
  ReturnType<typeof authClient.useSession>["data"]
>;
