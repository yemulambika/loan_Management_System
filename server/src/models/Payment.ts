import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },

    utrNumber: {
      type: String,
      unique: true,
    },

    amount: Number,

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Payment",
  paymentSchema
);