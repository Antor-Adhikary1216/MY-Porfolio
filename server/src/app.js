import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { databaseState } from "./config/database.js";
import { env, isProduction } from "./config/env.js";
import { isFirebaseAdminConfigured } from "./config/firebaseAdmin.js";
import databaseReady from "./middleware/databaseReady.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import messageRoutes from "./routes/message.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, "../../dist");

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("This origin is not allowed by CORS."));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

if (!isProduction) {
  app.use(morgan("dev"));
}

app.get("/api/health", (_request, response) => {
  const database = databaseState();
  const ready = database === "connected" && isFirebaseAdminConfigured;
  response.status(ready ? 200 : 503).json({
    status: ready ? "ok" : "degraded",
    database,
    firebaseAdmin: isFirebaseAdminConfigured ? "configured" : "not-configured",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", databaseReady);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", messageRoutes);

app.use("/api", (_request, response) => {
  response.status(404).json({ message: "API route not found." });
});

if (isProduction) {
  app.use(express.static(clientDist));
  app.use((request, response, next) => {
    if (request.method === "GET") {
      return response.sendFile(path.join(clientDist, "index.html"));
    }
    return next();
  });
}

app.use((error, _request, response, _next) => {
  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ message: "The supplied resource ID is invalid." });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(" ");
    return response.status(400).json({ message });
  }

  if (error?.code === 11000) {
    return response.status(409).json({ message: "That record already exists." });
  }

  if (error?.message === "This origin is not allowed by CORS.") {
    return response.status(403).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: "Internal server error." });
});

export default app;
