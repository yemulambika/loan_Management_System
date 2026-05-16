import express from "express";
import User from "../models/User.js"; // import your User schema
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);

// New Leads
router.get("/users/leads", async (req, res) => {
  try {
    const leads = await User.find({ hasLoan: false });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Follow Ups
// NOTE: followups moved to /api/loan/followups to return Loan documents.

// Maintenance: Normalize all roles to lowercase (one-time fix for existing seeded users)
router.post("/normalize-roles", async (req, res) => {
  try {
    const result = await User.updateMany(
      {},
      [{ $set: { role: { $toLower: "$role" } } }]
    );
    res.json({
      message: "Roles normalized to lowercase",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to normalize roles", error });
  }
});

export default router;
