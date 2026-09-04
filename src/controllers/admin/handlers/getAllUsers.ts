import { Request, Response } from "express";
import { FindAllUserAdminService } from "../../../services/admin/index";

const findAllService = new FindAllUserAdminService();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllService.getUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
