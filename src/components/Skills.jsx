import { ArrowRight, Layers3, Orbit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useApiResource from "../hooks/useApiResource";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getDisplaySkills,
  groupSkillsByCategory,
  WORKFLOW_STEPS,
} from "../data/skills";
import SectionHeading from "./ui/SectionHeading";
import SkillMark from "./SkillMark";

const dashboardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

export default function Skills() {
  const { data: apiSkills } = useApiResource("/skills", []);
  const skills = getDisplaySkills(apiSkills);
  const groupedSkills = groupSkillsByCategory(skills);
  const activeCategories = CATEGORY_ORDER.filter((category) => groupedSkills[category].length);

  const metrics = [
    { label: "Technologies", value: skills.length, icon: Sparkles },
    { label: "Disciplines", value: activeCategories.length, icon: Layers3 },
    { label: "Primary stack", value: "React + Node", icon: Orbit },
  ];

  return (
    <section className="pb-24 pt-20 sm:pt-24" id="skills">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Technical toolkit"
          title="A stack built for complete products."
          description="From polished interfaces to secure APIs and dependable deployments, this is the toolkit I use to move ideas into production."
          align="center"
        />

        <motion.div
          variants={dashboardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            {metrics.map(({ label, value, icon: Icon }) => (
              <motion.div
                variants={panelVariants}
                className="glass-card flex items-center gap-4 rounded-2xl px-5 py-4"
                key={label}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white">{value}</span>
                  <span className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {activeCategories.map((category, index) => {
              const meta = CATEGORY_META[category];
              const Icon = meta.icon;
              const items = groupedSkills[category];

              return (
                <motion.article
                  variants={panelVariants}
                  className={`glass-card relative self-start overflow-hidden rounded-2xl border ${meta.border} p-5 sm:p-6`}
                  key={category}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.surface} via-transparent to-transparent`}
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute -right-6 -top-8 text-[8rem] font-black leading-none text-white/[0.025]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`grid size-11 place-items-center rounded-xl ${meta.badge}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-white">{meta.title}</h3>
                        <p className="mt-1 text-xs text-slate-500">{meta.description}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}>
                      {items.length}
                    </span>
                  </div>

                  <div className="relative grid gap-2.5 sm:grid-cols-2">
                    {items.map((skill) => (
                      <SkillMark
                        categoryMeta={meta}
                        key={skill._id || `${skill.category}-${skill.name}`}
                        skill={skill}
                      />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            variants={panelVariants}
            className="gradient-border glass-card relative mt-5 overflow-hidden rounded-2xl p-5 sm:p-7"
          >
            <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-purple-500/[0.09] to-transparent lg:block" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-accent">
                  Full-stack workflow
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">One connected delivery loop.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Every layer is considered together, from the first component to the final deployment.
                </p>
              </div>

              <ol className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-4">
                {WORKFLOW_STEPS.map(({ label, detail, icon: Icon }, index) => (
                  <li className="relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-950/45 p-3" key={label}>
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-cyan-accent">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{label}</span>
                      <span className="block text-xs text-slate-500">{detail}</span>
                    </span>
                    {index < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight
                        className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-ink-900 p-1 text-slate-600 lg:block"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
