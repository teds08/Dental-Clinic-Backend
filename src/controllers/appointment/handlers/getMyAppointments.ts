import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { FindMyAppointmentsService } from "../../../services/appointment/index";

const findMyAppointmentsService = new FindMyAppointmentsService();

export const getMyAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const appointments =
      await findMyAppointmentsService.getAppointments(userId);

    return res.status(200).json({
      message: "Appointments retrieved successfully.",
      data: appointments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
