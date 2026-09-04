import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { create } from "./handlers/create";
import { getAllAppointments } from "./handlers/getAllAppointments";
import { approveAppointment } from "./handlers/approveAppointment";
import { rejectAppointment } from "./handlers/rejectAppointment";
import { getMyAppointments } from "./handlers/getMyAppointments";
import { getAppointmentDetails } from "./handlers/getAppointmentDetails";
import { cancelAppointment } from "./handlers/cancelAppointment";
import { completeAppointment } from "./handlers/completeAppointment";

export class AppointmentController {
  async create(req: AuthRequest, res: Response) {
    return create(req, res);
  }

  async getAllAppointments(req: Request, res: Response) {
    return getAllAppointments(req, res);
  }

  async approveAppointment(req: Request, res: Response) {
    return approveAppointment(req, res);
  }

  async rejectAppointment(req: Request, res: Response) {
    return rejectAppointment(req, res);
  }

  async getMyAppointments(req: AuthRequest, res: Response) {
    return getMyAppointments(req, res);
  }

  async getAppointmentDetails(req: AuthRequest, res: Response) {
    return getAppointmentDetails(req, res);
  }

  async cancelAppointment(req: AuthRequest, res: Response) {
    return cancelAppointment(req, res);
  }

  async completeAppointment(req: Request, res: Response) {
    return completeAppointment(req, res);
  }
}
