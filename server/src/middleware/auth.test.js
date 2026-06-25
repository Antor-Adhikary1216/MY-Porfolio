// @vitest-environment node
import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAuthenticate, requireAdmin } from "./auth.js";

const findOneAndUpdate = vi.fn();
const verifyIdToken = vi.fn();
const UserModel = { findOneAndUpdate };

const createApp = (withAdminCheck = false) => {
  const app = express();
  const authenticate = createAuthenticate({ verifyIdToken, UserModel });
  app.get("/protected", authenticate, withAdminCheck ? requireAdmin : (_req, res) => res.json({ ok: true }), (req, res) =>
    res.json({ role: req.user.role }),
  );
  return app;
};

describe("Firebase authentication middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects requests without a Firebase bearer token", async () => {
    const response = await request(createApp()).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Firebase ID token/i);
  });

  it("verifies a token and synchronizes the user profile", async () => {
    verifyIdToken.mockResolvedValue({
      uid: "firebase-user-1",
      email: "user@example.com",
      name: "Portfolio User",
      picture: "https://example.com/avatar.png",
      firebase: { sign_in_provider: "google.com" },
    });
    findOneAndUpdate.mockResolvedValue({ role: "user" });

    const response = await request(createApp())
      .get("/protected")
      .set("Authorization", "Bearer valid-token");

    expect(response.status).toBe(200);
    expect(verifyIdToken).toHaveBeenCalledWith("valid-token");
    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { firebaseUid: "firebase-user-1" },
      expect.objectContaining({
        $set: expect.objectContaining({
          email: "user@example.com",
          provider: "google.com",
        }),
      }),
      expect.objectContaining({ upsert: true }),
    );
  });

  it("blocks a synchronized non-admin user from admin routes", async () => {
    verifyIdToken.mockResolvedValue({
      uid: "firebase-user-2",
      email: "member@example.com",
      firebase: { sign_in_provider: "password" },
    });
    findOneAndUpdate.mockResolvedValue({ role: "user" });

    const response = await request(createApp(true))
      .get("/protected")
      .set("Authorization", "Bearer valid-token");

    expect(response.status).toBe(403);
  });
});
