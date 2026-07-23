import { pool } from "../../config/db";
import {UpdateAppointmentStatusRepository, FindAppointmentRepository} from "../../repositories/appointment/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";

export class RejectAppointmentService {

  private findRepo = new FindAppointmentRepository();

  async reject( appointmentId: number
  ) {

    const appointment = await this.findRepo.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.status !== "PENDING") {
      throw new Error(
        "Only pending appointments can be rejected."
      );
    }

    const client = await pool.connect();

    try {

      await client.query("BEGIN");

      const statusRepo = new UpdateAppointmentStatusRepository(client);
      const notificationRepo = new CreateNotificationRepository(client);
      const updatedAppointment = await statusRepo.updateStatus( appointmentId, "PENDING", "REJECTED" );

      if (!updatedAppointment) {
        throw new Error(
          "Appointment has already been updated."
        );
      }

      const formattedDate =
        new Date(
          appointment.appointment_date
        ).toLocaleDateString(
          "en-PH",
          {
            year: "numeric",
            month: "long",
            day: "numeric"
          }
        );

      const formattedTime =
        new Date(
          `1970-01-01T${appointment.appointment_time}`
        ).toLocaleTimeString(
          "en-PH",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }
        );

      await notificationRepo.create(

        appointment.user_id,
        "Appointment Rejected",
        `Unfortunately, your appointment could not be approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}
Please contact the clinic or book another available schedule.`
 );

      await client.query("COMMIT");
      return updatedAppointment;
    } catch (error) {

      await client.query("ROLLBACK");
      throw error;

    } finally {
      client.release();

    }

  }

}