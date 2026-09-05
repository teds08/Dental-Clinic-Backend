import { Request, Response } from "express";
import { ResetPasswordAuthService } from "../../../services/auth/index";
import { resetPasswordSchema } from "../../../validators/resetPassword.validation";

const resetPasswordAuthService = new ResetPasswordAuthService();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
      return res.status(400).json({ message: "Missing x-session-id header" });
    }

    const parsed = resetPasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    await resetPasswordAuthService.resetPassword(sessionId, parsed.data);

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
