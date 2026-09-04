import { Request, Response } from "express";
import { RestoreUserAdminService } from "../../../services/admin/index";

const restoreUserService = new RestoreUserAdminService();

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await restoreUserService.restoreUser(id);

    return res.status(200).json({
      message: "User restored successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
