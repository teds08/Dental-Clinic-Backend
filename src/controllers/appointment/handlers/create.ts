import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { CreateAppointmentService } from "../../../services/appointment/index";
import { createAppointmentValidator } from "../../../validators/appointment.validator";

const createAppointmentService = new CreateAppointmentService();

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const validated = createAppointmentValidator.parse(req.body);
    const userId = req.user.id;

    const appointment = await createAppointmentService.createAppointment(
      validated,
      userId,
    );

    return res.status(201).json({
      message: "Appointment created successfully.",
      data: appointment,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
