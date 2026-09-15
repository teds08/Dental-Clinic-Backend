import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { AdminUpdateUserService } from "../../../services/admin/index";
import { adminUpdateUserValidator } from "../../../validators/admin.service.validator";

const adminUpdateUserService = new AdminUpdateUserService();

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    const validated = adminUpdateUserValidator.parse(req.body);

    const user = await adminUpdateUserService.adminUpdateUser(
      userId,
      validated,
      req.user.id,
    );

    return res.status(200).json({
      message: "User updated successfully.",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
