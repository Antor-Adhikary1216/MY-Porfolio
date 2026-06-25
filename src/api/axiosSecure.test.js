import { describe, expect, it, vi } from "vitest";

const getIdToken = vi.hoisted(() => vi.fn().mockResolvedValue("firebase-test-token"));

vi.mock("../firebase/firebase.config", () => ({
  auth: { currentUser: { getIdToken } },
}));

import axiosSecure from "./axiosSecure";

describe("axiosSecure", () => {
  it("adds the current Firebase ID token to protected requests", async () => {
    axiosSecure.defaults.adapter = async (config) => ({
      data: { success: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });

    const response = await axiosSecure.get("/auth/me");

    expect(getIdToken).toHaveBeenCalled();
    expect(response.config.headers.Authorization).toBe("Bearer firebase-test-token");
  });
});
