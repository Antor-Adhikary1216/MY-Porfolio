import { CalendarDays, Mail } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { getErrorMessage, getPayload } from "../api/response";
import { EmptyState, ErrorState, PageLoader } from "../components/ui/AsyncStates";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosSecure.get("/messages");
      const payload = getPayload(response, []);
      setMessages(Array.isArray(payload) ? payload : []);
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
      <h1 className="text-3xl font-semibold text-white">Contact messages</h1>
      <p className="mt-2 text-slate-400">Inquiries sent through the public contact form.</p>

      <div className="mt-7">
        {loading && <PageLoader label="Loading messages..." />}
        {!loading && error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && !messages.length && (
          <EmptyState
            title="No messages yet"
            description="New contact form submissions will appear here."
          />
        )}
        {!loading && !error && messages.length > 0 && (
          <div className="grid gap-4">
            {messages.map((message) => (
              <article className="glass-card rounded-2xl p-5 sm:p-6" key={message._id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-white">{message.subject}</h2>
                    <a
                      className="mt-1 inline-flex items-center gap-2 text-sm text-cyan-accent"
                      href={`mailto:${message.email}`}
                    >
                      <Mail className="size-3.5" />
                      {message.name} · {message.email}
                    </a>
                  </div>
                  {message.createdAt && (
                    <span className="inline-flex items-center gap-2 text-xs text-slate-600">
                      <CalendarDays className="size-3.5" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-400">
                  {message.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
