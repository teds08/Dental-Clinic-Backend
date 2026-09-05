import { Request, Response } from "express";
import { RestoreService } from "../../../services/manage-services/index";

const restoreService = new RestoreService();

export const restore = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await restoreService.restoreService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
