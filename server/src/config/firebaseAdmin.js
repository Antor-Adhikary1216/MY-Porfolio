import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "./env.js";

export const isFirebaseAdminConfigured = Object.values(env.firebase).every(Boolean);

let adminAuth = null;

if (isFirebaseAdminConfigured) {
  const app =
    getApps()[0] ||
    initializeApp({
      credential: cert({
        projectId: env.firebase.projectId,
        clientEmail: env.firebase.clientEmail,
        privateKey: env.firebase.privateKey,
      }),
    });

  adminAuth = getAuth(app);
}

export { adminAuth };
