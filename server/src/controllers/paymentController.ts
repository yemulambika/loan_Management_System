import type { Request, Response } from "express";
import Payment from "../models/Payment.js";
import Loan from "../models/Loan.js";

export const addPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      loanId,
      utrNumber,
      amount: rawAmount,
    } = req.body;
    const amount = Number(rawAmount);

    if (!loanId || !utrNumber || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Loan, UTR number, and valid amount are required",
      });
    }

    const existingUTR = await Payment.findOne({
      utrNumber,
    });

    if (existingUTR) {
      return res.status(400).json({
        message: "Duplicate UTR Number",
      });
    }

    const payment = await Payment.create({
      loanId,
      utrNumber,
      amount,
    });

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    const outstanding =
      loan.totalRepayment != null ? loan.totalRepayment - loan.paidAmount : null;

    if (outstanding != null && amount > outstanding) {
      return res.status(400).json({
        message: "Payment amount cannot exceed outstanding balance",
      });
    }

    loan.paidAmount += amount;
    if (loan.totalRepayment != null && loan.paidAmount >= loan.totalRepayment) {
        loan.status = "CLOSED";
    }

    await loan.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Payment Failed",
    });
  }
};

export const getPayments = async (
  req: Request,
  res: Response
) => {
  try {
    const payments = await Payment.find()
      .populate("loanId")
      .sort({
        createdAt: -1,
      });

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch payments",
    });
  }
};
