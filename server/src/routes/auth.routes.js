import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { sendData } from "../utils/http.js";

const router = Router();

router.get("/me", authenticate, (request, response) =>
  sendData(response, {
    _id: request.user._id,
    firebaseUid: request.user.firebaseUid,
    email: request.user.email,
    displayName: request.user.displayName,
    photoURL: request.user.photoURL,
    provider: request.user.provider,
    role: request.user.role,
    lastLoginAt: request.user.lastLoginAt,
    createdAt: request.user.createdAt,
  }),
);

export default router;
