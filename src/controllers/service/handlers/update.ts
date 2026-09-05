import { Request, Response } from "express";
import { UpdateService } from "../../../services/manage-services/index";
import { UpdateServiceValidator } from "../../../validators/admin.service.validator";

const updateService = new UpdateService();

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = UpdateServiceValidator.parse(req.body);

    const result = await updateService.updateService(id, data);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.errors || error.message,
    });
  }
};
