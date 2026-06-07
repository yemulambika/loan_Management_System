import type { Request, Response, NextFunction } from "express";

export const validateRequest = (
  validator: (payload: any) => string | null
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const error = validator(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    next();
  };
};
