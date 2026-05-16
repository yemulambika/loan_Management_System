import express from "express";
import User from "../models/User.js";
import upload from "../middleware/uploadMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { deleteLoan } from "../controllers/loanController.js";
import { updateLoan } from "../controllers/loanController.js";
import {getLoanById} from "../controllers/loanController.js";
import {
  applyLoan,
  getFollowUps,
  getDisbursedLoans,
  getMyLoan,
  getPendingLoans,
  getSanctionedLoans,
  personalDetails,
  updateLoanStatus,
  uploadDocuments,
} from "../controllers/loanController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/personal-details",
  authMiddleware,
  roleMiddleware(["borrower"]),
  personalDetails
);

router.post(
  "/upload-documents",
  authMiddleware,
  roleMiddleware(["borrower"]),
  upload.array("documents"),
  uploadDocuments
);

router.post(
  "/apply",
  authMiddleware,
  roleMiddleware(["borrower"]),
  applyLoan
);

router.get(
  "/pending",
  authMiddleware,
  roleMiddleware(["sanction", "admin"]),
  getPendingLoans
);

router.get(
  "/followups",
  authMiddleware,
  getFollowUps
);

router.get(
  "/sanctioned",
  authMiddleware,
  roleMiddleware(["disbursement", "admin"]),
  getSanctionedLoans
);

router.get(
  "/disbursed",
  authMiddleware,
  roleMiddleware(["collection", "admin"]),
  getDisbursedLoans
);

router.get(
  "/my-loan",
  authMiddleware,
  getMyLoan
);

router.put("/:id/status", authMiddleware, roleMiddleware(["sanction","disbursement","collection","admin"]), updateLoanStatus);
router.delete("/:id", authMiddleware, roleMiddleware(["admin","sales"]), deleteLoan);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateLoan);
router.get("/:id", authMiddleware, getLoanById);


export default router;
