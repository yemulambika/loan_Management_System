import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      default: "Registered",
    },
    hasLoan: {
      type: Boolean,
      default: false,
    },
    breStatus: {
      type: String,
      enum: ["PENDING", "PASSED", "FAILED"],
      default: "PENDING",
    },

    role: {
      type: String,
      enum: [
        "admin",
        "sales",
        "sanction",
        "disbursement",
        "collection",
        "borrower",
      ],
      default: "borrower",
      index: true,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
