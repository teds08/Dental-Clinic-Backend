import { Request, Response, NextFunction } from "express";

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user.role_id !== 1) {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();
};