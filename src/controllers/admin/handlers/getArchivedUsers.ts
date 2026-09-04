import { Request, Response } from "express";
import { FindArchiveUsersService } from "../../../services/admin/index";

const findArchiveUsersService = new FindArchiveUsersService();

export const getArchivedUsers = async (req: Request, res: Response) => {
  try {
    const result = await findArchiveUsersService.getArchivedUsers();

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
