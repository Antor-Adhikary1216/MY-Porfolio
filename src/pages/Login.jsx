import { AlertTriangle, ArrowLeft, LoaderCircle, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/response";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, login, googleLogin, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/dashboard";

  if (user) return <Navigate to="/dashboard" replace />;

  const completeLogin = async (action) => {
    setSubmitting(true);
    setError("");
    try {
      await action();
      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(getErrorMessage(loginError, "Unable to sign in."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-shell flex min-h-screen items-center justify-center py-24">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to portfolio
        </Link>

        <div className="gradient-border glass-card rounded-[2rem] p-7 sm:p-9">
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-cyan-accent">
            <LockKeyhole className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-semibold text-white">Admin login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Sign in with the Firebase account assigned an admin role by the backend.
          </p>

          {!isFirebaseConfigured && (
            <div className="mt-6 flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100/80">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
              Firebase is not configured. Add the VITE_FIREBASE_* values to your environment to
              enable login.
            </div>
          )}

          <form
            className="mt-7 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              completeLogin(() => login(credentials.email, credentials.password));
            }}
          >
            <label className="block text-sm text-slate-300">
              Email
              <input
                className="field mt-2"
                type="email"
                autoComplete="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials({ ...credentials, email: event.target.value })
                }
                disabled={!isFirebaseConfigured}
                required
              />
            </label>
            <label className="block text-sm text-slate-300">
              Password
              <input
                className="field mt-2"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials({ ...credentials, password: event.target.value })
                }
                disabled={!isFirebaseConfigured}
                required
              />
            </label>

            {error && <p className="text-sm text-rose-300" role="alert">{error}</p>}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={!isFirebaseConfigured || submitting}
            >
              {submitting && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-slate-600">
            <span className="h-px flex-1 bg-white/8" />
            or
            <span className="h-px flex-1 bg-white/8" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={!isFirebaseConfigured || submitting}
            onClick={() => completeLogin(googleLogin)}
          >
            <span className="grid size-5 place-items-center rounded-full bg-white text-xs font-bold text-blue-600">
              G
            </span>
            Continue with Google
          </button>
        </div>
      </div>
    </section>
  );
}
