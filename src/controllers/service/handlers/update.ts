import { Request, Response } from "express";
import { UpdateService } from "../../../services/manage-services";
import { UpdateServiceValidator } from "../../../validators/admin.service.validator";

const updateService = new UpdateService();

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    const validatedData = UpdateServiceValidator.parse({
      ...req.body,
      ...(req.body.price !== undefined && {
        price: Number(req.body.price),
      }),
      ...(req.body.points !== undefined && {
        points: Number(req.body.points),
      }),
      ...(req.body.duration_minutes !== undefined && {
        duration_minutes: Number(req.body.duration_minutes),
      }),
    });

    const result = await updateService.updateService(
      id,
      validatedData,
      req.file?.buffer,
    );

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Update service error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        message: error.errors,
      });
    }

    if (error.message === "Service not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update service.",
    });
  }
};
