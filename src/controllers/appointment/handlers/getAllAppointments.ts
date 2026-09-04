import { Request, Response } from "express";
import { FindAllAppointmentsService } from "../../../services/appointment/index";

const findAllAppointmentsService = new FindAllAppointmentsService();

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await findAllAppointmentsService.getAppointments();

    return res.status(200).json({
      message: "Appointments fetched successfully.",
      data: appointments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
