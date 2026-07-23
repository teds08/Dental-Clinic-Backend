import { pool } from "../../config/db";
import { IAppointment } from "../../interfaces/appointment.interface";
import { calculateEndTime } from "../../utils/appointment.time";

import { CheckAppointmentOverlapRepository, CreateAppointmentRepository} from "../../repositories/appointment";
import { FindAdminsRepository, FindServiceRepository} from "../../repositories/admin";
import {CreateNotificationRepository} from "../../repositories/notification";

export class CreateAppointmentService {

  private overlapRepo = new CheckAppointmentOverlapRepository();
  private serviceRepo = new FindServiceRepository();
  private adminRepo = new FindAdminsRepository();

  async createAppointment(
    data: Omit<IAppointment, "user_id">,
    userId: number
  ) {

    // 1. Verify service exists
    const service =
      await this.serviceRepo.findById(data.service_id);

    if (!service) {
      throw new Error("Selected service does not exist.");
    }

    // 2. Calculate appointment end time
    const endTime =
      calculateEndTime(
        data.appointment_time,
        service.duration_minutes
      );

    // 3. Check for overlapping appointments
    const hasConflict =
      await this.overlapRepo.hasConflict(
        data.appointment_date,
        data.appointment_time,
        endTime
      );

    if (hasConflict) {
      throw new Error(
        "The selected schedule is already occupied."
      );
    }

    // 4. Start transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const appointmentRepo = new CreateAppointmentRepository(client);
      const notificationRepo = new CreateNotificationRepository(client);

      // 5. Create appointment
      const appointment = await appointmentRepo.create({
          ...data,
          user_id: userId
        });

      // 6. Find all admins
      const admins = await this.adminRepo.findAll();
      const formattedDate =
        new Date(data.appointment_date).toLocaleDateString(
          "en-PH",
          {
            year: "numeric",
            month: "long",
            day: "numeric"
          }
        );

      const formattedTime =
        new Date(
          `1970-01-01T${data.appointment_time}`
        ).toLocaleTimeString(
          "en-PH",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }
        );

      // 7. Notify every admin
      for (const admin of admins) {

        await notificationRepo.create(
          admin.id,
        "New Appointment",
        `A new appointment has been booked.

        Patient: ${data.patient_name}
        Service: ${service.title}
        Date: ${formattedDate}
        Time: ${formattedTime}
        Status: Pending`
        );

      }

      // 8. Commit transaction
      await client.query("COMMIT");
      return appointment;

    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
      
    } finally {
      client.release();

    }

  }

}