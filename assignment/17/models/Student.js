import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "নাম দিতে হবে"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "ইমেইল দিতে হবে"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "সঠিক ইমেইল দিন"],
    },
    phone: {
      type: String,
      required: [true, "ফোন নম্বর দিতে হবে"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "বিভাগ দিতে হবে"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
