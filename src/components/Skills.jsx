import { Boxes, CodeXml, Database, Wrench } from "lucide-react";
import useApiResource from "../hooks/useApiResource";
import { CardSkeleton, EmptyState, ErrorState } from "./ui/AsyncStates";
import SectionHeading from "./ui/SectionHeading";

const categoryMeta = {
  frontend: { title: "Frontend", icon: CodeXml, color: "text-cyan-300" },
  backend: { title: "Backend", icon: Boxes, color: "text-blue-300" },
  database: { title: "Database", icon: Database, color: "text-purple-300" },
  tools: { title: "Tools", icon: Wrench, color: "text-emerald-300" },
};

export default function Skills() {
  const { data: skills, loading, error, reload } = useApiResource("/skills", []);

  const groupedSkills = (Array.isArray(skills) ? skills : []).reduce((groups, skill) => {
    const category = skill.category?.toLowerCase() || "tools";
    groups[category] = [...(groups[category] || []), skill];
    return groups;
  }, {});

  return (
    <section className="py-24" id="skills">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Technical toolkit"
          title="Technologies I use to ship."
          description="A balanced stack for building responsive experiences, secure APIs, and production-ready applications."
          align="center"
        />

        {loading && <CardSkeleton count={4} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && !skills.length && (
          <EmptyState
            title="Skills are being prepared"
            description="Connect the backend and seed the skills collection to populate this section."
          />
        )}
        {!loading && !error && skills.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(groupedSkills).map(([category, items]) => {
              const meta = categoryMeta[category] || categoryMeta.tools;
              const Icon = meta.icon;
              return (
                <article className="glass-card rounded-2xl p-5" key={category}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-white/5">
                      <Icon className={`size-5 ${meta.color}`} aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-white">{meta.title || category}</h3>
                  </div>
                  <div className="space-y-3">
                    {items.map((skill) => (
                      <div key={skill._id || skill.name}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span className="text-slate-300">{skill.name}</span>
                          {skill.level && <span className="text-xs text-slate-600">{skill.level}%</span>}
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            style={{ width: `${Math.min(Number(skill.level) || 80, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
