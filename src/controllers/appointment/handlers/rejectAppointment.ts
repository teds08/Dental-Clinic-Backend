import { Request, Response } from "express";
import { RejectAppointmentService } from "../../../services/appointment/index";

const rejectAppointmentService = new RejectAppointmentService();

export const rejectAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await rejectAppointmentService.reject(id);

    return res.status(200).json({
      message: "Appointment rejected successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
