import ResourceTable from "./ResourceTable";

export default function ManageSkills() {
  return (
    <ResourceTable
      title="Manage skills"
      description="Keep your categorized toolkit accurate and current."
      endpoint="/skills"
      addTo="/dashboard/skills/new"
      editBase="/dashboard/skills"
      itemLabel="skill"
      renderMeta={(skill) => `${skill.category || "Uncategorized"} · ${skill.level || 0}%`}
    />
  );
}
