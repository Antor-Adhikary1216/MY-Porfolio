import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: [{ type: String, trim: true }],
    imageUrl: { type: String, trim: true, default: "" },
    liveUrl: { type: String, trim: true, default: "" },
    githubUrl: { type: String, trim: true, default: "" },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
