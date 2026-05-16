import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.js";

const roleMiddleware = (roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userRole = (req.user.role || "").toString().toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

export default roleMiddleware;