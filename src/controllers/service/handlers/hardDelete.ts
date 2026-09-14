import { Request, Response } from "express";
import { DeletePermanentService } from "../../../services/manage-services/index";

const deletePermanentService = new DeletePermanentService();

export const hardDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    const result = await deletePermanentService.deleteService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Service not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message?.includes("associated with existing appointments")) {
      return res.status(409).json({
        message:
          "This service cannot be permanently deleted because it is associated with existing appointments. Archive it instead.",
      });
    }

    return res.status(500).json({
      message: "Failed to permanently delete service.",
    });
  }
};
