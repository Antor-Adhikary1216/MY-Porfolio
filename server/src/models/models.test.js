// @vitest-environment node
import { describe, expect, it } from "vitest";
import Project from "./Project.js";
import Skill from "./Skill.js";
import User from "./User.js";

describe("MongoDB models", () => {
  it("accepts a Firebase-backed user profile", async () => {
    const user = new User({
      firebaseUid: "firebase-123",
      email: "ADMIN@EXAMPLE.COM",
      displayName: "Antor",
      role: "admin",
    });

    await expect(user.validate()).resolves.toBeUndefined();
    expect(user.email).toBe("admin@example.com");
  });

  it("validates skill categories and levels", async () => {
    const skill = new Skill({ name: "React", category: "frontend", level: 101 });
    await expect(skill.validate()).rejects.toThrow(/level/i);
  });

  it("requires core project content", async () => {
    const project = new Project({ title: "Incomplete project" });
    await expect(project.validate()).rejects.toThrow(/summary|description/i);
  });
});
