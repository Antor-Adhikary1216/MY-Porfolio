import { BookOpenText, FolderKanban, Mail, Sparkles } from "lucide-react";

const cards = [
  {
    icon: FolderKanban,
    title: "Projects",
    text: "Publish work, update case studies, and choose featured projects.",
    color: "text-cyan-300",
  },
  {
    icon: Sparkles,
    title: "Skills",
    text: "Keep your technology stack and experience levels current.",
    color: "text-purple-300",
  },
  {
    icon: BookOpenText,
    title: "Blog",
    text: "Write and manage technical articles for your portfolio journal.",
    color: "text-blue-300",
  },
  {
    icon: Mail,
    title: "Messages",
    text: "Read opportunities and inquiries submitted through the contact form.",
    color: "text-emerald-300",
  },
];

export default function DashboardOverview() {
  return (
    <div>
      <p className="text-sm font-medium text-cyan-accent">Admin workspace</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, Antor.</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Manage the content that powers your public portfolio from one focused dashboard.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, text, color }) => (
          <article className="glass-card rounded-2xl p-6" key={title}>
            <Icon className={`size-6 ${color}`} aria-hidden="true" />
            <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
