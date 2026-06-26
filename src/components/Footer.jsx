import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
  { label: "Email", icon: Mail, href: "mailto:antor@example.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-950/70">
      <div className="container-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:items-start">
          <div>
            <Link
              className="relative block h-24 w-40 overflow-hidden rounded-xl transition hover:brightness-110"
              to="/"
              aria-label="Code with Antor home"
            >
              <img
                src="/code-with-antor-logo.png"
                alt="Code with Antor"
                className="absolute -top-4 left-0 size-40 max-w-none object-contain"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Designing sharp interfaces, reliable APIs, and full-stack products that feel
              polished from the first click to the final deploy.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3.5 py-2 text-xs font-medium text-cyan-100">
              <Sparkles className="size-3.5 text-cyan-accent" aria-hidden="true" />
              Available for remote opportunities
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Explore
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {footerLinks.map((item) => (
                <Link
                  className="group inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-accent"
                  key={item.label}
                  to={item.to}
                >
                  {item.label}
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Connect
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <a
                className="flex items-center gap-3 text-slate-300 transition hover:text-cyan-accent"
                href="mailto:antor@example.com"
              >
                <Mail className="size-4 text-cyan-accent" aria-hidden="true" />
                antor@example.com
              </a>
              <p className="flex items-center gap-3 text-slate-300">
                <MapPin className="size-4 text-purple-300" aria-hidden="true" />
                Open to remote work
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
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
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/6 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Antor Adhikari. Built with React.</p>
          <Link
            className="inline-flex items-center gap-2 font-medium text-slate-400 transition hover:text-cyan-accent"
            to="/"
          >
            Back to home
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
