import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullName: String,
    pan: String,
    dob: String,
    monthlySalary: Number,
    employmentMode: String,

    amount: Number,
    tenure: Number,
    interestRate: Number,
    interest: Number,
    totalRepayment: Number,

    salarySlip: String,
    documents: [String],

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
