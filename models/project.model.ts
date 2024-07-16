import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveSiteUrl: { type: String },
    githubUrl: { type: String },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });
  
export const ProjectModel = mongoose.model("Project", ProjectSchema);