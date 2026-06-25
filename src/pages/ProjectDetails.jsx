import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, PageLoader } from "../components/ui/AsyncStates";
import useApiResource from "../hooks/useApiResource";

export default function ProjectDetails() {
  const { id } = useParams();
  const { data: project, loading, error, reload } = useApiResource(`/projects/${id}`, null);

  if (loading) return <div className="container-shell pt-28"><PageLoader label="Loading project..." /></div>;

  if (error) {
    return (
      <div className="container-shell pb-24 pt-32">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  if (!project) return null;

  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <article className="container-shell pb-24 pt-32 sm:pt-40">
      <Link
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-accent"
        to="/projects"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to projects
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="glass-card overflow-hidden rounded-[2rem]">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt="" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-blue-500/15 to-purple-500/15">
              <span className="gradient-text text-8xl font-black">
                {project.title?.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-accent">
            Project details
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">{project.summary}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-cyan-300/12 bg-cyan-300/5 px-3 py-1.5 text-xs text-cyan-100"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white"
              >
                View live
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
              >
                <Github className="size-4" aria-hidden="true" />
                Source code
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card mt-10 rounded-2xl p-7 sm:p-10">
        <h2 className="text-2xl font-semibold text-white">About this project</h2>
        <div className="prose-content mt-5 whitespace-pre-line leading-8 text-slate-400">
          {project.description}
        </div>
      </div>
    </article>
  );
}
