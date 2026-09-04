import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { FindAppointmentDetailsService } from "../../../services/appointment/index";

const findAppointmentDetailsService = new FindAppointmentDetailsService();

export const getAppointmentDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const appointmentId = Number(req.params.id);
    const userId = req.user.id;

    const appointment = await findAppointmentDetailsService.getAppointment(
      appointmentId,
      userId,
    );

    return res.status(200).json({
      message: "Appointment retrieved successfully.",
      data: appointment,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
