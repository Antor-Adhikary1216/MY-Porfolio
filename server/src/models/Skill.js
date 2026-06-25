import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["frontend", "backend", "database", "tools"],
      lowercase: true,
      trim: true,
    },
    level: { type: Number, required: true, min: 0, max: 100, default: 80 },
  },
  { timestamps: true },
);

skillSchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.model("Skill", skillSchema);
