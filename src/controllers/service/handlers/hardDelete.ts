import { Request, Response } from "express";
import { DeletePermanentService } from "../../../services/manage-services/index";

const deletePermanentService = new DeletePermanentService();

export const hardDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deletePermanentService.deleteService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
