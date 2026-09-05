import { Request, Response } from "express";
import { ArchiveListService } from "../../../services/manage-services/index";

const archiveListService = new ArchiveListService();

export const archiveList = async (req: Request, res: Response) => {
  try {
    const result = await archiveListService.getArchivedServices();

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
