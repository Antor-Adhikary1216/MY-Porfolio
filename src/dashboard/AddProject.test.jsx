import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import axiosSecure from "../api/axiosSecure";
import AddProject from "./AddProject";

vi.mock("../api/axiosSecure", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("AddProject", () => {
  it("submits normalized project data to the protected API", async () => {
    const user = userEvent.setup();
    axiosSecure.post.mockResolvedValue({ data: { data: { _id: "new-project" } } });

    render(
      <MemoryRouter>
        <AddProject />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Project title"), "Portfolio");
    await user.type(screen.getByLabelText("Short summary"), "A modern portfolio");
    await user.type(screen.getByLabelText("Full description"), "Built with React and care.");
    await user.type(screen.getByLabelText("Technologies (comma separated)"), "React, Node.js");
    await user.click(screen.getByRole("button", { name: "Add project" }));

    expect(axiosSecure.post).toHaveBeenCalledWith(
      "/projects",
      expect.objectContaining({
        title: "Portfolio",
        technologies: ["React", "Node.js"],
      }),
    );
    expect(await screen.findByText("Project added successfully.")).toBeInTheDocument();
  });
});
