import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Skill from "../models/Skill.js";

const skills = [
  ...["HTML", "CSS", "Tailwind CSS", "JavaScript", "React.js"].map((name, index) => ({
    name,
    category: "frontend",
    level: 94 - index * 3,
  })),
  ...["Node.js", "Express.js", "REST API", "Firebase Auth", "JWT token verification"].map(
    (name, index) => ({
      name,
      category: "backend",
      level: 90 - index * 3,
    }),
  ),
  { name: "MongoDB", category: "database", level: 88 },
  { name: "Mongoose", category: "database", level: 86 },
  ...["Git", "GitHub", "VS Code", "Postman", "Netlify", "Vercel", "Render"].map(
    (name, index) => ({
      name,
      category: "tools",
      level: 92 - index * 2,
    }),
  ),
];

try {
  await connectDatabase();
  await Promise.all(
    skills.map((skill) =>
      Skill.findOneAndUpdate(
        { name: skill.name, category: skill.category },
        { $set: skill },
        { upsert: true, runValidators: true },
      ),
    ),
  );
  console.log(`Seeded ${skills.length} skills.`);
} finally {
  await disconnectDatabase();
}
