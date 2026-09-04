import { Request, Response } from "express";
import { HardDeleteUserAdminService } from "../../../services/admin/index";

const hardDeleteService = new HardDeleteUserAdminService();

export const hardDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await hardDeleteService.hardDeleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User permanently deleted",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
