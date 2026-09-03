import { pool } from "../../../config/db";
import { validateAppointment } from "./validateAppointment";
import { validateAppointmentAmounts } from "./validateAppointmentAmounts";
import { updateAppointmentStatus } from "./updateAppointmentStatus";
import { findPatientPoints } from "./findPatientPoints";
import { calculateEarnedPoints } from "./calculateEarnedPoints";
import { createPointTransaction } from "./createPointTransaction";
import { updatePatientBalance } from "./updatePatientBalance";
import { createNotificationMessage } from "./createNotificationMessage";
import { notifyPatient } from "./notifyPatient";

export class CompleteAppointmentService {
  async complete(appointmentId: number) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 1: Validate appointment exists and is APPROVED
      const appointment = await validateAppointment(client, appointmentId);

      // Step 2: Validate appointment amounts
      validateAppointmentAmounts(appointment);

      // Step 3: Update appointment status to COMPLETED
      const completedAppointment = await updateAppointmentStatus(
        client,
        appointmentId
      );

      // Step 4: Find patient points
      const patientPoints = await findPatientPoints(client, appointment.user_id);

      // Step 5: Calculate earned points
      const { earnedPoints, balanceAfter } = calculateEarnedPoints(
        appointment,
        patientPoints.total_points
      );

      // Step 6: Create point transaction (if no coupon used)
      await createPointTransaction(
        client,
        appointment,
        earnedPoints,
        patientPoints.total_points,
        balanceAfter
      );

      // Step 7: Update patient balance
      await updatePatientBalance(client, appointment.user_id, balanceAfter);

      // Step 8: Create notification message
      const notificationMessage = createNotificationMessage(
        appointment,
        earnedPoints
      );

      // Step 9: Notify patient
      await notifyPatient(client, appointment.user_id, notificationMessage);

      // Step 10: Commit transaction
      await client.query("COMMIT");

      return completedAppointment;
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