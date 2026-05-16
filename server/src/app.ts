import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import usersRouter from "./routes/authRoutes.js";

const app = express();

/* Middlewares */
app.use(cors());
app.use("/api", usersRouter);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* Static Folder */
app.use(
  "/uploads",
  express.static("uploads")
);

/* Health Route */
app.get("/", (req, res) => {
  res.send("Loan Management API Running");
});

/* Routes */
app.use("/api/auth", authRoutes);

app.use("/api/loan", loanRoutes);

app.use("/api/payment", paymentRoutes);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* Error Middleware */
app.use(errorMiddleware);

export default app;