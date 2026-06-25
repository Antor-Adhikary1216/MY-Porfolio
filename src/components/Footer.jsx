import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
  { label: "Email", icon: Mail, href: "mailto:antor@example.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-950/45">
      <div className="container-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            className="relative block h-28 w-44 overflow-hidden rounded-xl transition hover:brightness-110"
            to="/"
            aria-label="Code with Antor home"
          >
            <img
              src="/code-with-antor-logo.png"
              alt="Code with Antor"
              className="absolute -top-4 left-0 size-44 max-w-none object-contain"
            />
          </Link>
          <p className="mt-2 text-sm text-slate-500">
            Designing thoughtful interfaces and dependable APIs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="grid size-10 place-items-center rounded-xl border border-white/8 text-slate-400 transition hover:border-cyan-accent/30 hover:bg-white/5 hover:text-white"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Antor Adhikari. Built with React.
      </div>
    </footer>
  );
}
