import { getInitials } from "@/lib/utils";
import type { SessionType } from "@/types/auth";

interface ProfileTabProps {
  session: SessionType;
}

export default function ProfileTab({ session }: ProfileTabProps) {
  const userInitials = getInitials(session.user.name);

  return (
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
              <span className="text-xs text-muted-foreground">User Name</span>
              <p className="text-sm font-medium mt-0.5">{session.user.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">
                Email Address
              </span>
              <p className="text-sm font-medium mt-0.5">{session.user.email}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">
                Email Verified
              </span>
              <div className="text-sm mt-0.5 flex items-center gap-1.5">
                {session.user.emailVerified ? (
                  <span className="text-emerald-500 text-xs font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                    Verified
                  </span>
                ) : (
                  <span className="text-yellow-500 text-xs font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />{" "}
                    Pending
                  </span>
                )}
              </div>
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
              <span className="text-xs text-muted-foreground">Created On</span>
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
            Launch your workspace and get AI assistance powered by local models.
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
  );
}
