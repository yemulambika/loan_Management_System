import rateLimit from "express-rate-limit";

// More lenient auth limits for better UX
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Increased from 20 to 100 (login/register attempts per 15 min)
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV !== "production", // Skip in development
  message: {
    message: "Too many auth requests from this IP, please try again later.",
  },
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 300, // Increased from 100 to 300
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV !== "production",
  message: {
    message: "Too many requests, please wait a moment.",
  },
});
