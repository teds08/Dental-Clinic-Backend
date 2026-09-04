import { Request, Response } from "express";
import { ApproveAppointmentService } from "../../../services/appointment/index";

const approveAppointmentService = new ApproveAppointmentService();

export const approveAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await approveAppointmentService.approve(id);

    return res.status(200).json({
      message: "Appointment approved successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
