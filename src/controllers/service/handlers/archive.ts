import { Request, Response } from "express";
import { SoftDeleteService } from "../../../services/manage-services/index";

const softDeleteService = new SoftDeleteService();

export const archive = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await softDeleteService.deleteService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
