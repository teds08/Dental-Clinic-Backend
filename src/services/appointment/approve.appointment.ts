import { pool } from "../../config/db";
import {FindAppointmentRepository , UpdateAppointmentStatusRepository} from "../../repositories/appointment/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";

export class ApproveAppointmentService {

  private findRepo = new FindAppointmentRepository();

  async approve( appointmentId: number ) {

    const appointment = await this.findRepo.findById( appointmentId );
    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.status !== "PENDING") {
      throw new Error(
        "Only pending appointments can be approved."
      );
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const statusRepo = new UpdateAppointmentStatusRepository(client);
      const notificationRepo = new CreateNotificationRepository(client);
      const updatedAppointment = await statusRepo.updateStatus( appointmentId, "PENDING", "APPROVED" );
  
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
        "Appointment Approved",
      `Your appointment has been approved.
      
Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}
Please arrive at least 15 minutes before your appointment.`
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