import { ShieldCheck, UserRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { EmptyState, ErrorState, PageLoader } from "../components/ui/AsyncStates";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosSecure.get("/users");
      const payload = getPayload(response, []);
      setUsers(Array.isArray(payload) ? payload : []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">Registered users</h1>
      <p className="mt-2 text-slate-400">
        Firebase identities synchronized with MongoDB when they access the protected API.
      </p>

      <div className="mt-7">
        {loading && <PageLoader label="Loading users..." />}
        {!loading && error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && !users.length && (
          <EmptyState
            title="No users synchronized yet"
            description="A profile is created automatically after the first authenticated request."
          />
        )}
        {!loading && !error && users.length > 0 && (
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="divide-y divide-white/8">
              {users.map((user) => (
                <article
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  key={user._id}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="size-11 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/5 text-slate-400">
                        <UserRound className="size-5" aria-hidden="true" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-white">
                        {user.displayName || "Unnamed user"}
                      </h2>
                      <p className="truncate text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-white/8 px-3 py-1.5 text-slate-400">
                      {user.provider}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
                        user.role === "admin"
                          ? "bg-cyan-400/8 text-cyan-200"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {user.role === "admin" && <ShieldCheck className="size-3.5" />}
                      {user.role}
                    </span>
                    <span className="text-slate-600">
                      Last login{" "}
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : "not recorded"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
