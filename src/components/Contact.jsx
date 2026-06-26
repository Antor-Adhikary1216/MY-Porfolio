import { CheckCircle2, LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import axiosPublic from "../api/axiosPublic";
import { getErrorMessage } from "../api/response";
import SectionHeading from "./ui/SectionHeading";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axiosPublic.post("/messages", form);
      setForm(initialForm);
      setStatus({ type: "success", message: "Thanks! Your message has been sent." });
    } catch (error) {
      setStatus({
        type: "error",
        message: getErrorMessage(error, "Your message could not be sent. Please try again."),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24" id="contact">
      <div className="container-shell">
        <div className="glass-card overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden border-b border-white/8 bg-gradient-to-br from-blue-500/12 to-purple-500/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -left-20 -top-20 size-48 rounded-full bg-cyan-400/10 blur-[70px]" />
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something worth remembering."
                description="Have a role, freelance project, or interesting product idea? Tell me what you are working on."
              />
              <div className="space-y-4 text-sm">
                <a
                  className="flex items-center gap-3 text-slate-300 transition hover:text-cyan-accent"
                  href="mailto:antor@example.com"
                >
                  <Mail className="size-4 text-cyan-accent" aria-hidden="true" />
                  antor@example.com
                </a>
                <p className="flex items-center gap-3 text-slate-300">
                  <MapPin className="size-4 text-purple-300" aria-hidden="true" />
                  Open to remote opportunities
                </p>
              </div>
            </div>

            <form className="space-y-5 p-7 sm:p-10" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Name
                  <input
                    className="field mt-2"
                    name="name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Email
                  <input
                    className="field mt-2"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>
              </div>
              <label className="block text-sm text-slate-300">
                Subject
                <input
                  className="field mt-2"
                  name="subject"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  required
                />
              </label>
              <label className="block text-sm text-slate-300">
                Message
                <textarea
                  className="field mt-2 min-h-36 resize-y"
                  name="message"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                />
              </label>
              {status.message && (
                <p
                  role="status"
                  className={`flex items-center gap-2 text-sm ${
                    status.type === "success" ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {status.type === "success" && <CheckCircle2 className="size-4" />}
                  {status.message}
                </p>
              )}
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submitting}
                type="submit"
              >
                {submitting ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {submitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
