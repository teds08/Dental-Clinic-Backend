import {Request, Response} from 'express';
import {createAppointmentValidator} from "../validators/appointment.validator";
import {CreateAppointmentService, FindAllAppointmentsService, ApproveAppointmentService, RejectAppointmentService, FindMyAppointmentsService, FindAppointmentDetailsService, CancelAppointmentService} from "../services/appointment/index";
import {AuthRequest} from "../middlewares/auth.middleware";



const createAppointmentService = new CreateAppointmentService();
const findAllAppointmentsService = new FindAllAppointmentsService();
const approveAppointmentService = new ApproveAppointmentService();
const rejectAppointmentService = new RejectAppointmentService();
const findMyAppointmentsService = new FindMyAppointmentsService();
const findAppointmentDetailsService = new FindAppointmentDetailsService();
const cancelAppointmentService = new CancelAppointmentService();


export class AppointmentController {

  async create(req: AuthRequest, res: Response) {

    try {

      const validated = createAppointmentValidator.parse(req.body);

      // JWT user set by authenticate middleware
      const userId = req.user.id;

      const appointment =
        await createAppointmentService.createAppointment(
          validated,
          userId
        );

      return res.status(201).json({
        message: "Appointment created successfully.",
        data: appointment
      });

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      });

    }

  }

  async getAllAppointments(req: Request, res: Response) {

  try {

    const appointments = await findAllAppointmentsService.getAppointments();

    return res.status(200).json({
      message: "Appointments fetched successfully.",
      data: appointments
    });

  } catch (error: any) {

    return res.status(500).json({
      message: error.message
    });

  }

}

  async approveAppointment( req: Request, res: Response) {

  try {

    const id = Number(req.params.id);
    const result = await approveAppointmentService.approve(id);

    return res.status(200).json({
      message: "Appointment approved successfully.",
      data: result
    });

  } catch (error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}

  async rejectAppointment( req: Request, res: Response) {

  try {

    const id = Number(req.params.id);

    const result = await rejectAppointmentService.reject(id);

    return res.status(200).json({
      message: "Appointment rejected successfully.",
      data: result
    });

  } catch (error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}

  async getMyAppointments(req: AuthRequest, res: Response) {

  try {

    const userId = req.user.id;
    const appointments = await findMyAppointmentsService.getAppointments(userId);

    return res.status(200).json({
      message: "Appointments retrieved successfully.",
      data: appointments
    });

  } catch (error: any) {

    return res.status(500).json({
      message: error.message
    });

  }

}

  async getAppointmentDetails(req: AuthRequest, res: Response) {

  try {

    const appointmentId = Number(req.params.id);
    const userId = req.user.id;
    const appointment = await findAppointmentDetailsService.getAppointment( appointmentId, userId);

    return res.status(200).json({
      message: "Appointment retrieved successfully.",
      data: appointment
    });

  } catch (error: any) {

    return res.status(404).json({
      message: error.message
    });

  }

}

  async cancelAppointment(req: AuthRequest, res: Response) {

  try {

    const appointmentId = Number(req.params.id);
    const userId = req.user.id;

    const result =
      await cancelAppointmentService.cancel(
        appointmentId,
        userId
      );

    return res.status(200).json({
      message: "Appointment cancelled successfully.",
      data: result
    });

  } catch (error: any) {

    return res.status(400).json({
      message: error.message
    });

  }

}


}

