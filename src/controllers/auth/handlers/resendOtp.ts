import { Request, Response } from "express";
import { ResendOtpAuthService } from "../../../services/auth/index";

const resendOtpAuthService = new ResendOtpAuthService();

export const resendOtp = async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers["x-session-id"] as string;

    const result = await resendOtpAuthService.resendOtp(sessionId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
