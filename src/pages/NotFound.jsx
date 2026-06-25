import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-screen place-items-center py-20 text-center">
      <div>
        <p className="gradient-text text-8xl font-black">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">This page wandered off.</h1>
        <p className="mt-3 text-slate-400">The address may be incorrect or the page no longer exists.</p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Return home
        </Link>
      </div>
    </section>
  );
}
