import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "https://loan-management-system-seven-xi.vercel.app",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("Loan Management API Running");
});


app.use("/api/auth", authRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(errorMiddleware);

export default app;