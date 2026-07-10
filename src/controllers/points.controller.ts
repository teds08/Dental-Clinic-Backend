import {AuthRequest} from "../middlewares/auth.middleware";
import { Request, Response } from "express";
import {GetPatientPointsService} from "../services/points/index";

const getPatientPointsService = new GetPatientPointsService();

export class PointsController {

  async getMyPoints(req: AuthRequest, res: Response) {

    try {

      const userId = req.user!.id;

      const result =
        await getPatientPointsService.getPoints(userId);

      return res.status(200).json({
        message: "Patient points retrieved successfully.",
        data: result
      });

    } catch (error: any) {

      return res.status(404).json({
        message: error.message
      });

    }

  }

}