import ProjectCard from "../components/ProjectCard";
import { CardSkeleton, EmptyState, ErrorState } from "../components/ui/AsyncStates";
import PageHeader from "../components/ui/PageHeader";
import useApiResource from "../hooks/useApiResource";

export default function ProjectsPage() {
  const { data: projects, loading, error, reload } = useApiResource("/projects", []);

  return (
    <>
      <PageHeader
        eyebrow="Project archive"
        title="Work built with purpose."
        description="Explore full-stack applications, frontend experiences, and backend systems designed to solve real problems."
      />
      <section className="container-shell pb-24">
        {loading && <CardSkeleton count={6} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && !projects.length && (
          <EmptyState
            title="No projects published yet"
            description="Projects added in the admin dashboard will appear here automatically."
          />
        )}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard project={project} key={project._id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
