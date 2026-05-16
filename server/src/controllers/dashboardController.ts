import type { Request, Response } from "express";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalLoans = await Loan.countDocuments();

    const pendingLoans = await Loan.countDocuments({
      status: "PENDING",
    });

    const sanctionedLoans =
      await Loan.countDocuments({
        status: "SANCTIONED",
      });

    const disbursedLoans =
      await Loan.countDocuments({
        status: "DISBURSED",
      });

    const closedLoans = await Loan.countDocuments({
      status: "CLOSED",
    });

    const totalAmount = await Loan.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalLoans,
      pendingLoans,
      sanctionedLoans,
      disbursedLoans,
      closedLoans,
      totalLoanAmount:
        totalAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Dashboard Error",
    });
  }
};