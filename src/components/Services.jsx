import { AppWindow, DatabaseZap, PanelsTopLeft } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const services = [
  {
    icon: PanelsTopLeft,
    number: "01",
    title: "Frontend Development",
    description:
      "Responsive React interfaces with component systems, thoughtful interactions, and accessible user journeys.",
  },
  {
    icon: DatabaseZap,
    number: "02",
    title: "Backend & API Development",
    description:
      "Maintainable Node.js and Express APIs with authentication, validation, MongoDB, and clean data flows.",
  },
  {
    icon: AppWindow,
    number: "03",
    title: "Full-Stack Applications",
    description:
      "Complete web products—from technical planning and UI implementation to deployment and iteration.",
  },
];

export default function Services() {
  return (
    <section className="py-24" id="services">
      <div className="container-shell">
        <SectionHeading
          eyebrow="What I do"
          title="From interface to infrastructure."
          description="I help turn early ideas into robust digital products without losing the details that make them feel premium."
          align="center"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map(({ icon: Icon, number, title, description }, index) => (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              key={title}
              className="gradient-border glass-card relative overflow-hidden rounded-2xl p-7"
            >
              <span className="absolute right-5 top-3 text-6xl font-black text-white/[0.035]">
                {number}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/18 to-purple-500/14 text-cyan-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
