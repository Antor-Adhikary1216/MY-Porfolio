import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import Skill from "../models/Skill.js";
import { asyncHandler, sendData } from "../utils/http.js";

const router = Router();
const categoryOrder = { frontend: 1, backend: 2, database: 3, tools: 4 };

router.get(
  "/",
  asyncHandler(async (_request, response) => {
    const skills = await Skill.find().sort({ category: 1, level: -1, name: 1 }).lean();
    skills.sort(
      (left, right) =>
        categoryOrder[left.category] - categoryOrder[right.category] ||
        right.level - left.level,
    );
    return sendData(response, skills);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const skill = await Skill.findById(request.params.id).lean();
    if (!skill) return response.status(404).json({ message: "Skill not found." });
    return sendData(response, skill);
  }),
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const skill = await Skill.create(request.body);
    return sendData(response, skill, 201);
  }),
);

router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const skill = await Skill.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return response.status(404).json({ message: "Skill not found." });
    return sendData(response, skill);
  }),
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const skill = await Skill.findByIdAndDelete(request.params.id);
    if (!skill) return response.status(404).json({ message: "Skill not found." });
    return response.json({ success: true });
  }),
);

export default router;
