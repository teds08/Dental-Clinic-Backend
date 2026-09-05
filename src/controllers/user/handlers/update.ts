import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { UpdateUserService } from "../../../services/user/index";
import { updateProfileValidator } from "../../../validators/user.validator";

const updateUserService = new UpdateUserService();

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const validated = updateProfileValidator.parse(req.body);
    const updatedUser = await updateUserService.updateUser(userId, validated);

    return res.status(200).json({
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
