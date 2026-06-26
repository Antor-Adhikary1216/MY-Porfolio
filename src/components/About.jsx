import { Braces, Layers3, ServerCog } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const strengths = [
  {
    icon: Braces,
    title: "Frontend precision",
    text: "Responsive, accessible interfaces with clean React architecture and careful visual polish.",
  },
  {
    icon: ServerCog,
    title: "Backend confidence",
    text: "REST APIs, authentication flows, and data models designed for reliability and clarity.",
  },
  {
    icon: Layers3,
    title: "End-to-end thinking",
    text: "I connect the entire product journey, from an idea and UI to deployed, maintainable code.",
  },
];

export default function About() {
  return (
    <section className="py-24" id="about">
      <div className="container-shell">
        <SectionHeading
          eyebrow="About me"
          title="I care about the details users feel."
          description="I am a full-stack developer focused on building useful products that look refined, respond quickly, and stay understandable behind the scenes."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {strengths.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6"
              key={title}
            >
              <span className="mb-5 grid size-11 place-items-center rounded-xl border border-blue-300/15 bg-blue-400/8 text-cyan-accent">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
