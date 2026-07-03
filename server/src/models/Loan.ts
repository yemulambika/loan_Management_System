import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
    },
    pan: String,
    dob: String,
    monthlySalary: Number,
    employmentMode: String,

    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    tenure: {
      type: Number,
      required: true,
      default: 0,
    },
    interestRate: Number,
    interest: Number,
    totalRepayment: Number,

    salarySlip: String,
    documents: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "PENDING",
        "SANCTIONED",
        "DISBURSED",
        "CLOSED",
        "REJECTED",
      ],
      default: "DRAFT",
    },
    rejectionReason: String,
    paidAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);
