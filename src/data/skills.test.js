import { describe, expect, it } from "vitest";
import { FALLBACK_SKILLS, getCapabilityLabel, getDisplaySkills } from "./skills";

describe("skills registry", () => {
  it.each([
    [79, "Working knowledge"],
    [80, "Advanced"],
    [89, "Advanced"],
    [90, "Core"],
  ])("maps level %s to %s", (level, label) => {
    expect(getCapabilityLabel(level)).toBe(label);
  });

  it("uses curated skills when API data is empty or invalid", () => {
    expect(getDisplaySkills([])).toBe(FALLBACK_SKILLS);
    expect(getDisplaySkills(null)).toBe(FALLBACK_SKILLS);
    expect(getDisplaySkills([{ category: "frontend", level: 90 }])).toBe(FALLBACK_SKILLS);
  });

  it("normalizes valid API skills without changing the API contract", () => {
    expect(getDisplaySkills([{ name: "TypeScript", category: "FRONTEND", level: 105 }])).toEqual([
      { name: "TypeScript", category: "frontend", level: 100 },
    ]);
  });
});
