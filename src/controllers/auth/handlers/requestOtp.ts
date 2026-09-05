import { Request, Response } from "express";
import { ForgotPasswordAuthService } from "../../../services/auth/index";

const forgotPasswordAuthService = new ForgotPasswordAuthService();

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const result = await forgotPasswordAuthService.requestOtp(req.body.email);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
