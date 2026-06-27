import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user || user.role_id !== 1) {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();
};