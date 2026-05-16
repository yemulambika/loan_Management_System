import type { Response } from "express";
import Loan from "../models/Loan.js";
import User from "../models/User.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { runBRE } from "../utils/bre.js";
import { calculateLoan } from "../utils/calculateLoan.js";

export const personalDetails = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { fullName, pan, dob, monthlySalary, employmentMode } = req.body;

    const breResult = runBRE(dob, monthlySalary, pan, employmentMode);

    if (breResult) {
      await User.findByIdAndUpdate(req.user.id, {
        breStatus: "FAILED",
        stage: "BRE_FAILED",
        lastActive: new Date(),
      });
      return res.status(400).json({ message: breResult });
    }

    await User.findByIdAndUpdate(req.user.id, {
      breStatus: "PASSED",
      stage: "SalaryApproved",
      lastActive: new Date(),
    });

    const loan = await Loan.create({
      borrower: req.user.id,
      fullName,
      pan,
      dob,
      monthlySalary,
      employmentMode,
    });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};


export const applyLoan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { amount, tenure, interestRate, loanId } = req.body;

    const { interest, totalRepayment } =
      calculateLoan(amount, tenure);

    const loanQuery = loanId
      ? { _id: loanId, borrower: req.user.id }
      : { borrower: req.user.id };

    const loan = await Loan.findOneAndUpdate(
      loanQuery,
      {
        amount,
        tenure,
        interestRate,
        interest,
        totalRepayment,
        status: "PENDING",
      },
      {
        new: true,
        sort: { createdAt: -1 },
      }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    await User.findByIdAndUpdate(req.user.id, {
  hasLoan: true,
  stage: "Applied",
  lastActive: new Date()
});

    res.json(loan);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPendingLoans = async (
  req: AuthRequest,
  res: Response
) => {
  const loans = await Loan.find({
    status: "PENDING",
  });

  res.json(loans);
};

export const updateLoanStatus = async (
  req: AuthRequest,
  res: Response
) => {
  const { status, rejectionReason } = req.body;

  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    {
      status,
      rejectionReason: status === "REJECTED" ? rejectionReason : undefined,
    },
    {
      new: true,
    }
  );

  res.json(loan);
};export const getSanctionedLoans = async (
  req: AuthRequest,
  res: Response
) => {
  const loans = await Loan.find({
    status: "SANCTIONED",
  });

  res.json(loans);
};

export const getDisbursedLoans = async (
  req: AuthRequest,
  res: Response
) => {
  const loans = await Loan.find({
    status: "DISBURSED",
  });

  res.json(loans);
};

export const getMyLoan = async (
  req: AuthRequest,
  res: Response
) => {
  const loan = await Loan.findOne({
    borrower: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(loan);
};
export const uploadDocuments = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // multer puts files here
    const files = req.files as Express.Multer.File[];

    // Store only filenames (they'll be served via /uploads route)
    const filePaths = files.map((file) => `/uploads/${file.filename}`);
    const { loanId } = req.body;

    const loanQuery = loanId
      ? { _id: loanId, borrower: req.user.id }
      : { borrower: req.user.id };

    const loan = await Loan.findOneAndUpdate(
      loanQuery,
      {
        documents: filePaths,
        stage: "DocumentsUploaded",
      },
      { new: true, sort: { createdAt: -1 } }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    await User.findByIdAndUpdate(req.user.id, {
  stage: "DocumentsUploaded",
  lastActive: new Date()
});

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};
export const getLeads = async (req: AuthRequest, res: Response) => {
  const users = await User.find({
    hasLoan: false,
    stage: "Registered",
  });

  res.json(users);
};
export const getFollowUps = async (req: AuthRequest, res: Response) => {
  try {
    const loans = await Loan.find({
      status: { $in: ["PENDING", "REJECTED", "SANCTIONED"] }
    }).populate("borrower", "fullName email stage lastActive");

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch follow-ups", error });
  }
};


export const deleteLoan = async (req: AuthRequest, res: Response) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete loan", error });
  }
};
export const updateLoan = async (req: AuthRequest, res: Response) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: "Failed to update loan", error });
  }
};

export const getLoanById = async (req: AuthRequest, res: Response) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loan", error });
  }
};
