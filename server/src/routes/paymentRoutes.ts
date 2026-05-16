import express from "express";

import {
  addPayment,
  getPayments,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["collection", "admin"]),
  addPayment
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["collection", "admin"]),
  getPayments
);

export default router;
