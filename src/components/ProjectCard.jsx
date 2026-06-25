import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <Link className="relative block overflow-hidden" to={`/projects/${project._id}`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt=""
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-500/18 via-purple-500/12 to-cyan-400/10">
            <span className="text-4xl font-bold text-white/20">
              {project.title?.slice(0, 2).toUpperCase() || "AA"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {technologies.slice(0, 4).map((technology) => (
            <span
              className="rounded-full border border-cyan-300/10 bg-cyan-300/5 px-2.5 py-1 text-[11px] font-medium text-cyan-100/80"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
          {project.summary || project.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-accent transition hover:text-white"
            to={`/projects/${project._id}`}
          >
            View details
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code`}
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
