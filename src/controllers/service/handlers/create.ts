import { Request, Response } from "express";
import { CreateService } from "../../../services/manage-services/index";
import { CreateServiceValidator } from "../../../validators/admin.service.validator";

const createService = new CreateService();

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateServiceValidator.parse({
      ...req.body,
      price: Number(req.body.price),
    });

    const result = await createService.createService(validatedData);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.errors || error.message,
    });
  }
};
