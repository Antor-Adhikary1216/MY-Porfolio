import { ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FormShell({
  title,
  description,
  backTo,
  children,
  onSubmit,
  submitting,
  success,
  error,
  submitLabel,
}) {
  return (
    <div className="max-w-3xl">
      <Link
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-accent"
        to={backTo}
      >
        <ArrowLeft className="size-4" />
        Back to management
      </Link>
      <h1 className="mt-5 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-slate-400">{description}</p>

      <form className="glass-card mt-7 space-y-5 rounded-2xl p-5 sm:p-7" onSubmit={onSubmit}>
        {children}
        {success && (
          <p role="status" className="flex items-center gap-2 text-sm text-emerald-300">
            <CheckCircle2 className="size-4" />
            {success}
          </p>
        )}
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting}
          type="submit"
        >
          {submitting && <LoaderCircle className="size-4 animate-spin" />}
          {submitting ? "Saving..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
