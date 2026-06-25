import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, trim: true, default: "" },
    tags: [{ type: String, lowercase: true, trim: true }],
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

export default mongoose.model("Blog", blogSchema);
