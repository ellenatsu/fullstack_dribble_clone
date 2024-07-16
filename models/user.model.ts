import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar is required"],
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    likedProjectIds: [String],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

