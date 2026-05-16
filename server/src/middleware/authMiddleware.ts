import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const parts = token?.split(" ");
if (!parts || parts.length < 2) {
  throw new Error("Invalid token format");
}

const decoded = jwt.verify(
  token?.split(" ")[1] ?? "",
  process.env.JWT_SECRET!
);


    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;