import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import PrivateRoute from "./PrivateRoute";

vi.mock("../hooks/useAuth", () => ({ default: vi.fn() }));
vi.mock("../api/axiosSecure", () => ({ default: { get: vi.fn() } }));

function renderRoute() {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <p>Admin content</p>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<p>Login page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PrivateRoute", () => {
  beforeEach(() => vi.clearAllMocks());

  it("redirects signed-out visitors to login", () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    renderRoute();
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders protected content for an admin role", async () => {
    useAuth.mockReturnValue({ user: { uid: "admin" }, loading: false });
    axiosSecure.get.mockResolvedValue({ data: { data: { role: "admin" } } });
    renderRoute();
    expect(await screen.findByText("Admin content")).toBeInTheDocument();
  });
});
