import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import Blog from "../models/Blog.js";
import { asyncHandler, sendData } from "../utils/http.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_request, response) => {
    const posts = await Blog.find().sort({ publishedAt: -1 }).lean();
    return sendData(response, posts);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const post = await Blog.findById(request.params.id).lean();
    if (!post) return response.status(404).json({ message: "Blog article not found." });
    return sendData(response, post);
  }),
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const post = await Blog.create(request.body);
    return sendData(response, post, 201);
  }),
);

router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const post = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return response.status(404).json({ message: "Blog article not found." });
    return sendData(response, post);
  }),
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  asyncHandler(async (request, response) => {
    const post = await Blog.findByIdAndDelete(request.params.id);
    if (!post) return response.status(404).json({ message: "Blog article not found." });
    return response.json({ success: true });
  }),
);

export default router;
