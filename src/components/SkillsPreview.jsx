import { ArrowUpRight, TerminalSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useApiResource from "../hooks/useApiResource";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getDisplaySkills,
  groupSkillsByCategory,
  PRIMARY_SKILLS,
} from "../data/skills";
import SkillMark from "./SkillMark";

export default function SkillsPreview() {
  const { data: apiSkills } = useApiResource("/skills", []);
  const skills = getDisplaySkills(apiSkills);
  const groupedSkills = groupSkillsByCategory(skills);
  const selectedSkills = [
    ...PRIMARY_SKILLS.map((name) => skills.find((skill) => skill.name === name)).filter(Boolean),
    ...skills.filter((skill) => !PRIMARY_SKILLS.includes(skill.name)),
  ].slice(0, 8);

  return (
    <section className="pb-16 pt-8" aria-labelledby="skills-preview-title">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="gradient-border glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(62,232,255,0.13),transparent_32%),radial-gradient(circle_at_8%_90%,rgba(157,108,255,0.1),transparent_35%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-accent">
                <TerminalSquare className="size-3.5" aria-hidden="true" />
                Stack snapshot
              </span>
              <h2 id="skills-preview-title" className="mt-5 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built across the whole product.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                A practical toolkit for shaping interfaces, connecting data, securing APIs, and shipping with confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {CATEGORY_ORDER.map((category) => {
                  const meta = CATEGORY_META[category];
                  const count = groupedSkills[category].length;
                  return (
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${meta.badge}`}
                      key={category}
                    >
                      {meta.title} · {count}
                    </span>
                  );
                })}
              </div>

              <Link
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                to="/skills"
              >
                Explore my toolkit
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {selectedSkills.map((skill) => (
                <SkillMark
                  categoryMeta={CATEGORY_META[skill.category]}
                  compact
                  key={skill._id || `${skill.category}-${skill.name}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
