import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useApiResource from "../hooks/useApiResource";
import ProjectCard from "./ProjectCard";
import { CardSkeleton, EmptyState, ErrorState } from "./ui/AsyncStates";
import SectionHeading from "./ui/SectionHeading";

export default function Projects() {
  const {
    data: projects,
    loading,
    error,
    reload,
  } = useApiResource("/projects?featured=true&limit=6", []);

  return (
    <section className="py-24" id="projects">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured Projects"
            description="A selection of products where interface craft meets practical engineering."
          />
          <Link
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan-accent hover:text-white"
            to="/projects"
          >
            Explore all projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {loading && <CardSkeleton />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && !projects.length && (
          <EmptyState
            title="Projects are coming soon"
            description="Featured projects will appear here as soon as they are added from the dashboard."
          />
        )}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard project={project} key={project._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
