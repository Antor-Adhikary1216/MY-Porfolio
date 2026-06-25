import { Edit3, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { EmptyState, ErrorState } from "../components/ui/AsyncStates";

export default function ResourceTable({
  title,
  description,
  endpoint,
  addTo,
  editBase,
  itemLabel,
  renderMeta,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosSecure.get(endpoint);
      const payload = getPayload(response, []);
      setItems(Array.isArray(payload) ? payload : []);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (item) => {
    const name = item.title || item.name || "this item";
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeleting(item._id);
    try {
      await axiosSecure.delete(`${endpoint}/${item._id}`);
      setItems((current) => current.filter((entry) => entry._id !== item._id));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setDeleting("");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-slate-400">{description}</p>
        </div>
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white"
          to={addTo}
        >
          <Plus className="size-4" />
          Add {itemLabel}
        </Link>
      </div>

      <div className="mt-7">
        {loading && (
          <div className="glass-card flex min-h-48 items-center justify-center rounded-2xl text-slate-400">
            <LoaderCircle className="mr-3 size-5 animate-spin text-cyan-accent" />
            Loading {title.toLowerCase()}...
          </div>
        )}
        {!loading && error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && !items.length && (
          <EmptyState title={`No ${title.toLowerCase()} yet`} description={`Add your first ${itemLabel} to get started.`} />
        )}
        {!loading && !error && items.length > 0 && (
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="divide-y divide-white/8">
              {items.map((item) => (
                <div
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  key={item._id}
                >
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-white">{item.title || item.name}</h2>
                    <div className="mt-1 text-sm text-slate-500">{renderMeta(item)}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      className="inline-flex items-center gap-2 rounded-lg border border-white/8 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
                      to={`${editBase}/${item._id}/edit`}
                    >
                      <Edit3 className="size-3.5" />
                      Edit
                    </Link>
                    <button
                      className="inline-flex items-center gap-2 rounded-lg border border-rose-300/10 px-3 py-2 text-xs text-rose-300 hover:bg-rose-400/8 disabled:opacity-50"
                      type="button"
                      disabled={deleting === item._id}
                      onClick={() => remove(item)}
                    >
                      {deleting === item._id ? (
                        <LoaderCircle className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
