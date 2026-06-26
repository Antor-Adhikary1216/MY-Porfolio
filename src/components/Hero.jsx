import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      <div className="absolute left-[8%] top-1/4 size-56 rounded-full bg-blue-500/10 blur-[90px]" />
      <div className="absolute right-[10%] top-1/3 size-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="container-shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3.5 py-2 text-xs font-medium text-cyan-100">
            <Sparkles className="size-3.5 text-cyan-accent" aria-hidden="true" />
            Available for ambitious product teams
          </div>
          <p className="mb-4 text-lg text-slate-400">Hello, I&apos;m</p>
          <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Antor <span className="gradient-text">Adhikari</span>
          </h1>
          <h2 className="mt-5 text-xl font-medium text-blue-100 sm:text-2xl">
            Full-Stack Developer
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            I build responsive frontend interfaces and powerful backend APIs, turning product ideas
            into fast, reliable, and genuinely enjoyable digital experiences.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
            >
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-accent/35 hover:bg-white/8"
              >
                <Download className="size-4" aria-hidden="true" />
                Download Resume
              </a>
            ) : (
              <span
                title="Add VITE_RESUME_URL to enable resume downloads"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-5 py-3 text-sm font-semibold text-slate-600"
              >
                <Download className="size-4" aria-hidden="true" />
                Resume coming soon
              </span>
            )}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-300 transition hover:text-cyan-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md"
        >
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-cyan-400/25 to-purple-500/25 blur-[70px]" />
          <div className="gradient-border glass-card relative aspect-[3/4] overflow-hidden rounded-[2.25rem] p-2">
            <div className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-ink-900">
              <img
                src="/hero-portrait.jpeg"
                alt="Antor Adhikari portrait"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-accent">
                  Code / Craft / Curiosity
                </p>
                <p className="mt-2 text-2xl font-bold text-white">Antor Adhikari</p>
              </div>
            </div>
          </div>
          <div className="glass-card absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 text-sm shadow-glow sm:-left-10">
            <p className="text-xs text-slate-500">Primary stack</p>
            <p className="mt-1 font-semibold text-white">React + Node.js</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
