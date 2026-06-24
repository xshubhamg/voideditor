export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-all duration-300">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
        <div className="absolute inset-0 m-auto h-8 w-8 animate-ping rounded-full bg-primary/20"></div>
      </div>
      <p className="mt-6 text-sm font-medium tracking-wider text-muted-foreground animate-pulse">
        INITIALIZING SECURE SESSION...
      </p>
    </div>
  );
}
