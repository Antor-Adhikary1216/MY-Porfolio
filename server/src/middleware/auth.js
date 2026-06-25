import { adminAuth } from "../config/firebaseAdmin.js";
import { env } from "../config/env.js";
import User from "../models/User.js";

const bearerToken = (header = "") => {
  const [scheme, token] = header.split(" ");
  return scheme === "Bearer" && token ? token : "";
};

export const createAuthenticate =
  ({ verifyIdToken, UserModel = User } = {}) =>
  async (request, response, next) => {
    const token = bearerToken(request.headers.authorization);

    if (!token) {
      return response.status(401).json({ message: "A Firebase ID token is required." });
    }

    if (!verifyIdToken) {
      return response.status(503).json({
        message: "Firebase Admin is not configured on the server.",
      });
    }

    try {
      const decoded = await verifyIdToken(token);
      const email = decoded.email?.toLowerCase();

      if (!email) {
        return response.status(403).json({
          message: "The authenticated Firebase account does not have an email address.",
        });
      }

      const isBootstrapAdmin = env.adminEmails.includes(email);
      const update = {
        firebaseUid: decoded.uid,
        email,
        displayName: decoded.name || "",
        photoURL: decoded.picture || "",
        provider: decoded.firebase?.sign_in_provider || "password",
        lastLoginAt: new Date(),
      };

      if (isBootstrapAdmin) {
        update.role = "admin";
      }

      const updateOperation = { $set: update };
      if (!isBootstrapAdmin) {
        updateOperation.$setOnInsert = { role: "user" };
      }

      const user = await UserModel.findOneAndUpdate(
        { firebaseUid: decoded.uid },
        updateOperation,
        { new: true, upsert: true, runValidators: true },
      );

      request.firebaseUser = decoded;
      request.user = user;
      return next();
    } catch (error) {
      if (error?.code === 11000) {
        return response.status(409).json({
          message: "A user profile already exists for this email address.",
        });
      }

      return response.status(401).json({
        message: "The Firebase ID token is invalid or expired.",
      });
    }
  };

export const authenticate = createAuthenticate({
  verifyIdToken: adminAuth ? (token) => adminAuth.verifyIdToken(token) : null,
});

export const requireAdmin = (request, response, next) => {
  if (request.user?.role !== "admin") {
    return response.status(403).json({ message: "Administrator access is required." });
  }

  return next();
};
