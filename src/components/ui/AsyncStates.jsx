import { AlertTriangle, Inbox, LoaderCircle, RefreshCw } from "lucide-react";

export function PageLoader({ label = "Loading content..." }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-400">
      <LoaderCircle className="size-7 animate-spin text-cyan-accent" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading content">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="glass-card animate-pulse overflow-hidden rounded-2xl"
          key={`skeleton-${index}`}
        >
          <div className="h-44 bg-white/5" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 rounded bg-white/8" />
            <div className="h-6 w-4/5 rounded bg-white/8" />
            <div className="h-4 rounded bg-white/5" />
            <div className="h-4 w-2/3 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center rounded-2xl px-5 text-center">
      <AlertTriangle className="mb-4 size-8 text-amber-300" aria-hidden="true" />
      <p className="max-w-md text-slate-300">{message}</p>
      {onRetry && (
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-accent/40 hover:bg-white/5"
          onClick={onRetry}
          type="button"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", description }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center rounded-2xl px-5 text-center">
      <Inbox className="mb-4 size-8 text-blue-accent" aria-hidden="true" />
      <h3 className="font-semibold text-white">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>}
    </div>
  );
}
