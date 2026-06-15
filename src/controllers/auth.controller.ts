import { Request, Response } from "express";
import { LoginAuthService, ResendOtpAuthService, ForgotPasswordAuthService, ResetPasswordAuthService, VerifyOtpAuthService  } from "../services/auth/index";
import { loginSchema } from "../validators/auth.validator";

const loginAuthService = new LoginAuthService();
const resendOtpAuthService = new ResendOtpAuthService();
const forgotPasswordAuthService = new ForgotPasswordAuthService();
const resetPasswordAuthService = new ResetPasswordAuthService();
const verifyOtpAuthService = new VerifyOtpAuthService();


export class AuthController {

 async login(req: Request, res: Response) {
    try {
      const validated = loginSchema.parse(req.body);

      const result = await loginAuthService.login(
        validated.email,
        validated.password
      );

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({
        message: error.message
      });
    }
  }


 async requestOtp(req: Request, res: Response) {
  const result = await forgotPasswordAuthService.requestOtp(req.body.email);

  return res.json(result);
}


 async verifyOtp(req: Request, res: Response) {
  const sessionId = req.headers["x-session-id"] as string;

  await verifyOtpAuthService.verifyOtp(sessionId, req.body.otp);

  return res.json({ message: "OTP verified" });
}


 async resetPassword(req: Request, res: Response) {
  const sessionId = req.headers["x-session-id"] as string;

  await resetPasswordAuthService.resetPassword(
    sessionId,
    req.body.new_password,
    req.body.confirm_password
  );

  return res.json({ message: "Password changed successfully" });
}


  async resendOtp(req: Request, res: Response) {
  try {
    const sessionId = req.headers[
      "x-session-id"
    ] as string;

    const result =
      await resendOtpAuthService.resendOtp(sessionId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
}

}