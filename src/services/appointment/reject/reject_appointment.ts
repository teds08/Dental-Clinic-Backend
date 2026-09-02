import { pool } from "../../../config/db";
import { validateAppointment } from "./validateAppointment";
import { updateAppointmentStatus } from "./updateAppointmentStatus";
import { restoreCoupon } from "./restoreCoupon";
import { formatAppointmentDetails } from "./formatAppointmentDetails";
import { createNotificationMessage } from "./createNotificationMessage";
import { notifyPatient } from "./notifyPatient";

export class RejectAppointmentService {
  async reject(appointmentId: number) {
    // Step 1: Validate appointment
    const appointment = await validateAppointment(appointmentId);

    // Step 2: Start transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 3: Update appointment status
      const updatedAppointment = await updateAppointmentStatus(
        client,
        appointmentId
      );

      // Step 4: Restore coupon if used
      const { couponWasUsed, couponConflictDetected } = await restoreCoupon(
        client,
        appointment.patient_coupon_id
      );

      // Step 5: Format appointment details
      const { formattedDate, formattedTime } = formatAppointmentDetails(appointment);

      // Step 6: Create notification message
      const notificationMessage = createNotificationMessage(
        appointment,
        formattedDate,
        formattedTime,
        couponWasUsed,
        couponConflictDetected
      );

      // Step 7: Notify patient
      await notifyPatient(client, appointment.user_id, notificationMessage);

      // Step 8: Commit transaction
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