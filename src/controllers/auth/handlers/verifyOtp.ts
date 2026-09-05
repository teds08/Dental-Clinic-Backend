import { Request, Response } from "express";
import { VerifyOtpAuthService } from "../../../services/auth/index";

const verifyOtpAuthService = new VerifyOtpAuthService();

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers["x-session-id"] as string;

    await verifyOtpAuthService.verifyOtp(sessionId, req.body.otp);

    return res.status(200).json({
      message: "OTP verified",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
