import { pool } from "../../../config/db";
import { validateAppointment } from "./validateAppointment";
import { buildAppointmentDateTime } from "./buildAppointmentDateTime";
import { checkCancellationWindow } from "./checkCancellationWindow";
import { updateAppointmentStatus } from "./updateAppointmentStatus";
import { restoreCoupon } from "./restoreCoupon";
import { findAllAdmins } from "./findAllAdmins";
import { formatAppointmentDetails } from "./formatAppointmentDetails";
import { notifyAdmins } from "./notifyAdmins";

export class CancelAppointmentService {

  async cancel(appointmentId: number, userId: number) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 1: Validate appointment
      const appointment = await validateAppointment(
        client,
        appointmentId,
        userId
      );

      // Step 2: Build appointment date/time
      const appointmentDateTime = buildAppointmentDateTime(appointment);

      // Step 3: Check cancellation window (24 hours)
      checkCancellationWindow(appointmentDateTime);

      // Step 4: Cancel the appointment
      const updatedAppointment = await updateAppointmentStatus(
        client,
        appointmentId
      );

      // Step 5: Restore patient coupon
      await restoreCoupon(client, appointment.patient_coupon_id);

      // Step 6: Find all admins
      const admins = await findAllAdmins(client);

      // Step 7: Format appointment details
      const { formattedDate, formattedTime } =
        formatAppointmentDetails(appointment);

      // Step 8: Notify all admins
      await notifyAdmins(
        client,
        admins,
        appointment,
        formattedDate,
        formattedTime
      );

      // Step 9: Commit transaction
      await client.query("COMMIT");

      return updatedAppointment;
    } catch (error) {
      // Rollback
      await client.query("ROLLBACK");
      throw error;
    } finally {
      // Release connection
      client.release();
    }
  }
}