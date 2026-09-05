import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { GetProfileService } from "../../../services/user/index";

const getProfileService = new GetProfileService();

export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const userProfile = await getProfileService.getProfile(userId);

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: userProfile,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
