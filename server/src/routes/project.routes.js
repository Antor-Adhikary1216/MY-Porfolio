import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import Project from "../models/Project.js";
import { asyncHandler, sendData } from "../utils/http.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (request, response) => {
    const filter = request.query.featured === "true" ? { featured: true } : {};
    const limit = Math.min(Math.max(Number(request.query.limit) || 50, 1), 50);
    const projects = await Project.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return sendData(response, projects);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const project = await Project.findById(request.params.id).lean();
    if (!project) return response.status(404).json({ message: "Project not found." });
    return sendData(response, project);
  }),
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const project = await Project.create(request.body);
    return sendData(response, project, 201);
  }),
);

router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const project = await Project.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return response.status(404).json({ message: "Project not found." });
    return sendData(response, project);
  }),
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const project = await Project.findByIdAndDelete(request.params.id);
    if (!project) return response.status(404).json({ message: "Project not found." });
    return response.json({ success: true });
  }),
);

export default router;
