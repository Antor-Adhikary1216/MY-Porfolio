import "dotenv/config";

const splitList = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "",
  clientOrigins: splitList(process.env.CLIENT_ORIGINS || "http://localhost:5173"),
  adminEmails: splitList(process.env.ADMIN_EMAILS).map((email) => email.toLowerCase()),
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  },
};

export const isProduction = env.nodeEnv === "production";
