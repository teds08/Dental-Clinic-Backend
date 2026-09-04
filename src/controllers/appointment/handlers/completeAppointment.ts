import { Request, Response } from "express";
import { CompleteAppointmentService } from "../../../services/appointment/index";

const completeAppointmentService = new CompleteAppointmentService();

export const completeAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = Number(req.params.id);

    if (Number.isNaN(appointmentId)) {
      return res.status(400).json({
        message: "Invalid appointment id.",
      });
    }

    const appointment =
      await completeAppointmentService.complete(appointmentId);

    return res.status(200).json({
      message: "Appointment completed successfully.",
      data: appointment,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
