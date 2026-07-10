import {CancelAppointmentRepository, FindAppointmentDetailsRepository} from "../../repositories/appointment/index";

export class CancelAppointmentService {

  private repo = new CancelAppointmentRepository();
  private findRepo = new FindAppointmentDetailsRepository();

  async cancel(appointmentId: number, userId: number) {

    const appointment = await this.findRepo.findById( appointmentId, userId);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (
      appointment.status === "REJECTED" ||
      appointment.status === "COMPLETED" ||
      appointment.status === "CANCELLED"
    ) {
      throw new Error(
        "This appointment can no longer be cancelled."
      );
    }

    const appointmentDateTime =
      new Date(
        `${appointment.appointment_date}T${appointment.appointment_time}:00+08:00`);

    const now = new Date();
    // To Calculate How many hours remaining 
    const hoursRemaining = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursRemaining < 24) {
      throw new Error(
        "Appointments cannot be cancelled within 24 hours of the scheduled time."
      );
    }

    return await this.repo.cancel(
      appointmentId,
      userId
    );

  }

}