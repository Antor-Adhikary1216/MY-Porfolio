import mongoose from "mongoose";

export default function databaseReady(_request, response, next) {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      message: "Database connection is unavailable. Try again shortly.",
    });
  }

  return next();
}
