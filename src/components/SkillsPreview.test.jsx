import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axiosPublic from "../api/axiosPublic";
import SkillsPreview from "./SkillsPreview";

vi.mock("../api/axiosPublic", () => ({ default: { get: vi.fn() } }));

describe("SkillsPreview", () => {
  it("links the homepage preview to the full skills dashboard", () => {
    axiosPublic.get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <SkillsPreview />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Explore my toolkit" })).toHaveAttribute(
      "href",
      "/skills",
    );
    expect(screen.getByText("React.js")).toBeInTheDocument();
  });
});
