import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,
    stage: {
      type: String,
      default: "Registered"
    },
    hasLoan: Boolean,
    breStatus: {
      type: String,
      enum: ["PENDING", "PASSED", "FAILED"],
      default: "PENDING"
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
    },
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  },

);

export default mongoose.model("User", userSchema);