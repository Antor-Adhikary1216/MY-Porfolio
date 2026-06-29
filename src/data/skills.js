import {
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNetlify,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { Braces, Boxes, Code2, CodeXml, Database, Rocket, Wrench } from "lucide-react";

export const CATEGORY_ORDER = ["frontend", "backend", "database", "tools"];

export const CATEGORY_META = {
  frontend: {
    title: "Frontend",
    description: "Interfaces that stay responsive, accessible, and fast.",
    icon: CodeXml,
    accent: "text-cyan-300",
    border: "border-cyan-300/20",
    surface: "from-cyan-400/12",
    badge: "bg-cyan-300/10 text-cyan-200",
  },
  backend: {
    title: "Backend",
    description: "Secure APIs, authentication, and dependable server logic.",
    icon: Boxes,
    accent: "text-blue-300",
    border: "border-blue-300/20",
    surface: "from-blue-500/12",
    badge: "bg-blue-300/10 text-blue-200",
  },
  database: {
    title: "Database",
    description: "Practical data models and reliable persistence layers.",
    icon: Database,
    accent: "text-purple-300",
    border: "border-purple-300/20",
    surface: "from-purple-500/12",
    badge: "bg-purple-300/10 text-purple-200",
  },
  tools: {
    title: "Tools & delivery",
    description: "A delivery workflow built for iteration and clean handoffs.",
    icon: Wrench,
    accent: "text-emerald-300",
    border: "border-emerald-300/20",
    surface: "from-emerald-400/12",
    badge: "bg-emerald-300/10 text-emerald-200",
  },
};

export const FALLBACK_SKILLS = [
  { name: "HTML", category: "frontend", level: 94 },
  { name: "CSS", category: "frontend", level: 91 },
  { name: "Tailwind CSS", category: "frontend", level: 88 },
  { name: "JavaScript", category: "frontend", level: 85 },
  { name: "React.js", category: "frontend", level: 82 },
  { name: "Node.js", category: "backend", level: 90 },
  { name: "Express.js", category: "backend", level: 87 },
  { name: "REST API", category: "backend", level: 84 },
  { name: "Firebase Auth", category: "backend", level: 81 },
  { name: "JWT token verification", category: "backend", level: 78 },
  { name: "MongoDB", category: "database", level: 88 },
  { name: "Mongoose", category: "database", level: 86 },
  { name: "Git", category: "tools", level: 92 },
  { name: "GitHub", category: "tools", level: 90 },
  { name: "VS Code", category: "tools", level: 88 },
  { name: "Postman", category: "tools", level: 86 },
  { name: "Netlify", category: "tools", level: 84 },
  { name: "Vercel", category: "tools", level: 82 },
  { name: "Render", category: "tools", level: 80 },
];

export const PRIMARY_SKILLS = [
  "React.js",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git",
  "Vercel",
];

export const WORKFLOW_STEPS = [
  { label: "UI", detail: "React", icon: CodeXml },
  { label: "API", detail: "Node + Express", icon: Braces },
  { label: "Data", detail: "MongoDB", icon: Database },
  { label: "Deploy", detail: "Vercel + Render", icon: Rocket },
];

export const SKILL_ICONS = {
  html: SiHtml5,
  css: Code2,
  "tailwind css": SiTailwindcss,
  javascript: SiJavascript,
  "react.js": SiReact,
  "node.js": SiNodedotjs,
  "express.js": SiExpress,
  "rest api": Braces,
  "firebase auth": SiFirebase,
  "jwt token verification": SiJsonwebtokens,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  git: SiGit,
  github: SiGithub,
  "vs code": Code2,
  postman: SiPostman,
  netlify: SiNetlify,
  vercel: SiVercel,
  render: SiRender,
};

export const DEFAULT_SKILL_ICON = Code2;

export function getCapabilityLabel(level) {
  const numericLevel = Number(level);
  if (numericLevel >= 90) return "Core";
  if (numericLevel >= 80) return "Advanced";
  return "Working knowledge";
}

export function getDisplaySkills(apiSkills) {
  if (!Array.isArray(apiSkills) || apiSkills.length === 0) return FALLBACK_SKILLS;

  const normalizedSkills = apiSkills
    .filter((skill) => skill?.name)
    .map((skill) => ({
      ...skill,
      category: CATEGORY_ORDER.includes(skill.category?.toLowerCase())
        ? skill.category.toLowerCase()
        : "tools",
      level: Math.min(Math.max(Number(skill.level) || 80, 0), 100),
    }));

  return normalizedSkills.length ? normalizedSkills : FALLBACK_SKILLS;
}

export function groupSkillsByCategory(skills) {
  return CATEGORY_ORDER.reduce(
    (groups, category) => ({
      ...groups,
      [category]: skills.filter((skill) => skill.category === category),
    }),
    {},
  );
}
