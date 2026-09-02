import { pool } from "../../../config/db";
import { validateAppointment } from "./validateAppointment";
import { checkCouponConflict } from "./checkCouponConflict";
import { updateAppointmentStatus } from "./updateAppointmentStatus";
import { markCouponAsUsed } from "./markCouponAsUsed";
import { formatAppointmentDetails } from "./formatAppointmentDetails";
import { createNotificationMessage } from "./createNotificationMessage";
import { notifyPatient } from "./notifyPatient";

export class ApproveAppointmentService {
  async approve(appointmentId: number) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 1: Validate appointment
      const appointment = await validateAppointment(client, appointmentId);

      // Step 2: Check for coupon conflict
      await checkCouponConflict(client, appointmentId, appointment.patient_coupon_id);

      // Step 3: Update appointment status
      const updatedAppointment = await updateAppointmentStatus(
        client,
        appointmentId
      );

      // Step 4: Mark coupon as used
      await markCouponAsUsed(client, appointment.patient_coupon_id);

      // Step 5: Format appointment details
      const { formattedDate, formattedTime } = formatAppointmentDetails(appointment);

      // Step 6: Create notification message
      const notificationMessage = createNotificationMessage(
        appointment,
        formattedDate,
        formattedTime
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