import type { Request, Response } from "express";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [
      totalUsers,
      totalLoans,
      pendingLoans,
      sanctionedLoans,
      disbursedLoans,
      closedLoans,
      totalAmountResult,
    ] = await Promise.all([
      User.countDocuments(),
      Loan.countDocuments(),
      Loan.countDocuments({ status: "PENDING" }),
      Loan.countDocuments({ status: "SANCTIONED" }),
      Loan.countDocuments({ status: "DISBURSED" }),
      Loan.countDocuments({ status: "CLOSED" }),
      Loan.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    res.json({
      totalUsers,
      totalLoans,
      pendingLoans,
      sanctionedLoans,
      disbursedLoans,
      closedLoans,
      totalLoanAmount: totalAmountResult[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Dashboard Error",
    });
  }
};