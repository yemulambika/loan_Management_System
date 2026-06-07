import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { authLimiter, apiLimiter } from "./middleware/rateLimiter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploads directory as absolute path
const uploadsDir = path.join(__dirname, "../uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// Performance optimizations
app.use(compression()); // Enable gzip compression
app.disable("x-powered-by"); // Remove header

// Security headers and request logging
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "short" : "dev")); // Less verbose in production
app.use(cookieParser());

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


app.use("/uploads", express.static(uploadsDir));


app.get("/", (req, res) => {
  res.send("Loan Management API Running");
});

app.use(apiLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(errorMiddleware);

export default app;