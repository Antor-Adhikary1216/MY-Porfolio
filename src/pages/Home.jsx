import {
  ArrowRight,
  BriefcaseBusiness,
  CodeXml,
  Layers3,
  Mail,
  Newspaper,
  PanelsTopLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeading from "../components/ui/SectionHeading";

const pageLinks = [
  {
    title: "About",
    text: "How I think through product details, code quality, and user experience.",
    to: "/about",
    icon: Layers3,
  },
  {
    title: "Skills",
    text: "The frontend, backend, database, and tooling stack behind the work.",
    to: "/skills",
    icon: CodeXml,
  },
  {
    title: "Services",
    text: "Focused build support from interface polish to API implementation.",
    to: "/services",
    icon: PanelsTopLeft,
  },
  {
    title: "Projects",
    text: "Selected full-stack applications and portfolio case studies.",
    to: "/projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "Blog",
    text: "Practical notes, walkthroughs, and lessons from building software.",
    to: "/blog",
    icon: Newspaper,
  },
  {
    title: "Contact",
    text: "A direct path for roles, freelance work, and product ideas.",
    to: "/contact",
    icon: Mail,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="pb-24 pt-8">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Portfolio"
            title="Explore the work from every angle."
            description="A focused path through the story, toolkit, services, projects, writing, and contact details."
            align="center"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageLinks.map(({ title, text, to, icon: Icon }) => (
              <Link
                className="glass-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-accent/35"
                key={title}
                to={to}
              >
                <span className="mb-5 grid size-11 place-items-center rounded-xl border border-blue-300/15 bg-blue-400/8 text-cyan-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-accent transition group-hover:text-white">
                  View {title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
