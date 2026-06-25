import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axiosPublic from "../api/axiosPublic";
import ProjectsPage from "./ProjectsPage";

vi.mock("../api/axiosPublic", () => ({ default: { get: vi.fn() } }));

describe("ProjectsPage API states", () => {
  it("shows a useful API error and retry action", async () => {
    axiosPublic.get.mockRejectedValue({
      response: { data: { message: "Backend is unavailable" } },
    });

    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Backend is unavailable")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});
