import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { AuthenticatedPasswordChangeService } from "../../../services/user/index";

const authenticatedPasswordChangeService =
  new AuthenticatedPasswordChangeService();

export const sendOTP = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const result =
      await authenticatedPasswordChangeService.sendPasswordChangeOTP(userId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
