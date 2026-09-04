import { Request, Response } from "express";
import { SoftDeleteUserAdminService } from "../../../services/admin/index";

const softDeleteService = new SoftDeleteUserAdminService();

export const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await softDeleteService.softDeleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User soft deleted successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
