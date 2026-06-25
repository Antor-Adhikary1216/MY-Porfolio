import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import { asyncHandler, sendData } from "../utils/http.js";

const router = Router();

router.get(
  "/",
  authenticate,
  requireAdmin,
  asyncHandler(async (_request, response) => {
    const users = await User.find()
      .select("-__v")
      .sort({ lastLoginAt: -1 })
      .lean();
    return sendData(response, users);
  }),
);

export default router;
