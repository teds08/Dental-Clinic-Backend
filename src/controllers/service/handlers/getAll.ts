import { Request, Response } from "express";
import { GetAllServiceService } from "../../../services/manage-services/index";

const getAllServiceService = new GetAllServiceService();

export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await getAllServiceService.getAllServices();

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
