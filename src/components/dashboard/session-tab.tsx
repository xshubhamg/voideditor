import type { SessionType } from "@/types/auth";

interface SessionTabProps {
  session: SessionType;
}

export default function SessionTab({ session }: SessionTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-5">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          BETTER AUTH SESSION STATE
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <span className="text-xs text-muted-foreground">
              Session Expiration Date
            </span>
            <p className="text-sm font-medium mt-0.5">
              {new Date(session.session.expiresAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">IP Address</span>
            <p className="text-sm font-medium mt-0.5">
              {session.session.ipAddress || "Localhost (127.0.0.1)"}
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            Device User Agent
          </span>
          <p className="text-xs font-mono font-medium mt-1 bg-muted/50 p-2.5 rounded border border-border text-muted-foreground leading-relaxed">
            {session.session.userAgent ||
              "Next.js Server / UserAgent Context Unavailable"}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          SESSION TOKEN & METRICS
        </h3>
        <div className="space-y-4">
          <div>
            <span className="text-xs text-muted-foreground">Session ID</span>
            <p className="text-xs font-mono mt-0.5 bg-muted/30 p-2 rounded overflow-x-auto text-foreground">
              {session.session.id}
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Session Token</span>
            <p className="text-xs font-mono mt-0.5 bg-muted/30 p-2 rounded overflow-x-auto text-foreground truncate select-all">
              {session.session.token}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
