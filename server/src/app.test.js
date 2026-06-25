// @vitest-environment node
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("API availability", () => {
  it("reports configuration state without exposing secrets", async () => {
    const response = await request(app).get("/api/health");

    expect([200, 503]).toContain(response.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        database: expect.any(String),
        firebaseAdmin: expect.any(String),
        timestamp: expect.any(String),
      }),
    );
    expect(JSON.stringify(response.body)).not.toContain("PRIVATE KEY");
  });

  it("returns a clear response while MongoDB is disconnected", async () => {
    const response = await request(app).get("/api/projects");

    expect(response.status).toBe(503);
    expect(response.body.message).toMatch(/Database connection/i);
  });
});
