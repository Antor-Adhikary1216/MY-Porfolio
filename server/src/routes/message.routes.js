import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import Message from "../models/Message.js";
import { asyncHandler, sendData } from "../utils/http.js";

const router = Router();

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const message = await Message.create(request.body);
    return sendData(response, { _id: message._id }, 201);
  }),
);

router.get(
  "/",
  authenticate,
  requireAdmin,
  asyncHandler(async (_request, response) => {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return sendData(response, messages);
  }),
);

export default router;
