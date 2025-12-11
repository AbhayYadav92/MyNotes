import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // connected to User model
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
