import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// CORS configuration - allows all Vercel URLs + localhost + custom origins from env
const isOriginAllowed = (origin: string | undefined) => {
  if (!origin) return true; // Allow requests with no origin (like mobile apps)

  // Allow localhost
  if (origin.startsWith("http://localhost:")) return true;
  if (origin.startsWith("http://127.0.0.1:")) return true;

  // Allow ALL Vercel deployments (*.vercel.app)
  if (origin.includes("vercel.app")) return true;

  // Allow custom origins from environment variable
  if (process.env.ALLOWED_ORIGINS) {
    const customOrigins = process.env.ALLOWED_ORIGINS.split(",").map((o) =>
      o.trim()
    );
    if (customOrigins.includes(origin)) return true;
  }

  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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