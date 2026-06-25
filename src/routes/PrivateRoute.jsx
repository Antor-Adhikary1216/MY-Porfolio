import { ShieldX } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { PageLoader } from "../components/ui/AsyncStates";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [access, setAccess] = useState({ loading: true, allowed: false, message: "" });

  useEffect(() => {
    let active = true;

    if (loading) return undefined;
    if (!user) return undefined;

    setAccess({ loading: true, allowed: false, message: "" });
    axiosSecure
      .get("/auth/me")
      .then((response) => {
        if (!active) return;
        const profile = getPayload(response, {});
        setAccess({
          loading: false,
          allowed: profile?.role === "admin",
          message:
            profile?.role === "admin"
              ? ""
              : "Your account is authenticated but does not have administrator access.",
        });
      })
      .catch((error) => {
        if (!active) return;
        setAccess({
          loading: false,
          allowed: false,
          message: getErrorMessage(error, "Unable to verify administrator access."),
        });
      });

    return () => {
      active = false;
    };
  }, [loading, user]);

  if (loading || (user && access.loading)) {
    return <PageLoader label="Verifying access..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!access.allowed) {
    return (
      <main className="container-shell grid min-h-screen place-items-center py-20">
        <div className="glass-card max-w-lg rounded-2xl p-8 text-center">
          <ShieldX className="mx-auto size-10 text-rose-300" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-semibold text-white">Access denied</h1>
          <p className="mt-3 leading-7 text-slate-400">{access.message}</p>
        </div>
      </main>
    );
  }

  return children;
}
