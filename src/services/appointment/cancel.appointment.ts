import { pool } from "../../config/db";
import {UpdateAppointmentStatusRepository, FindAppointmentRepository} from "../../repositories/appointment/index";
import {FindAdminsRepository} from "../../repositories/admin/adminRepo/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";

export class CancelAppointmentService {

  private appointmentRepo = new FindAppointmentRepository();
  private adminRepo = new FindAdminsRepository();

  async cancel( appointmentId: number, userId: number) {

    const appointment = await this.appointmentRepo.findByIdAndUserId( appointmentId, userId );

    if (!appointment) {
      throw new Error(
        "Appointment not found."
      );
    }

    if (appointment.status !== "PENDING") {
      throw new Error(
        "Only pending appointments can be cancelled."
      );
    }

    const dateStr = new Date(
  new Date(appointment.appointment_date).getTime() + 8 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

const timeStr = appointment.appointment_time.slice(0, 5); // handles "11:00" or "11:00:00"
const appointmentDateTime = new Date(`${dateStr}T${timeStr}:00+08:00`);
if (isNaN(appointmentDateTime.getTime())) {
  throw new Error("Invalid appointment date/time.");
}
const now = new Date();
const difference = appointmentDateTime.getTime() - now.getTime();
const twentyFourHours = 24 * 60 * 60 * 1000;

if (difference < twentyFourHours) {
  throw new Error(
    "Appointments cannot be cancelled within 24 hours of the scheduled time."
  );
}

    const client = await pool.connect();
    try {

      await client.query("BEGIN");

      const statusRepo = new UpdateAppointmentStatusRepository(client);
      const notificationRepo = new CreateNotificationRepository(client);
      const updatedAppointment = await statusRepo.updateStatus( appointmentId, "PENDING", "CANCELLED" );

    if (!updatedAppointment) {
      throw new Error(
        "Appointment has already been updated."
      );
    }

      const admins = await this.adminRepo.findAll();
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

      for (const admin of admins) {

        await notificationRepo.create(

          admin.id,

          "Appointment Cancelled",

          `A patient cancelled an appointment.

Patient:
${appointment.patient_name}

Service:
${appointment.title}

Date:
${formattedDate}

Time:
${formattedTime}`

        );

      }

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