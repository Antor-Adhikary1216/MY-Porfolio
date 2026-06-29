import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axiosPublic from "../api/axiosPublic";
import Skills from "./Skills";

vi.mock("../api/axiosPublic", () => ({ default: { get: vi.fn() } }));

describe("Skills dashboard", () => {
  beforeEach(() => {
    axiosPublic.get.mockReset();
  });

  it("renders curated skills immediately while the API is loading", () => {
    axiosPublic.get.mockReturnValue(new Promise(() => {}));

    render(<Skills />);

    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getAllByText("MongoDB").length).toBeGreaterThan(0);
    expect(screen.getByText("Working knowledge")).toBeInTheDocument();
  });

  it("replaces fallback content with valid live API data", async () => {
    axiosPublic.get.mockResolvedValue({
      data: {
        data: [{ _id: "skill-1", name: "TypeScript", category: "frontend", level: 93 }],
      },
    });

    render(<Skills />);

    expect(await screen.findByText("TypeScript")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("HTML")).not.toBeInTheDocument());
    expect(screen.getByText("Core")).toBeInTheDocument();
  });

  it("keeps curated content visible when the API fails", async () => {
    axiosPublic.get.mockRejectedValue(new Error("Backend unavailable"));

    render(<Skills />);

    await waitFor(() => expect(axiosPublic.get).toHaveBeenCalledWith("/skills"));
    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.queryByText("Backend unavailable")).not.toBeInTheDocument();
  });
});
