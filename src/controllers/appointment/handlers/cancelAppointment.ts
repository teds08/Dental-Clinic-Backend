import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { CancelAppointmentService } from "../../../services/appointment/index";

const cancelAppointmentService = new CancelAppointmentService();

export const cancelAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const appointmentId = Number(req.params.id);
    const userId = req.user.id;

    const result = await cancelAppointmentService.cancel(appointmentId, userId);

    return res.status(200).json({
      message: "Appointment cancelled successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
