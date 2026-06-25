import ResourceTable from "./ResourceTable";

export default function ManageProjects() {
  return (
    <ResourceTable
      title="Manage projects"
      description="Review, update, and remove portfolio projects."
      endpoint="/projects"
      addTo="/dashboard/projects/new"
      editBase="/dashboard/projects"
      itemLabel="project"
      renderMeta={(project) =>
        `${(project.technologies || []).slice(0, 4).join(" · ") || "No technologies"}${project.featured ? " · Featured" : ""}`
      }
    />
  );
}
