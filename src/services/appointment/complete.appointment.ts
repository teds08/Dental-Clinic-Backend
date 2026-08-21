import { pool } from "../../config/db";
import {FindAppointmentRepository, UpdateAppointmentStatusRepository} from "../../repositories/appointment/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";
import {FindPatientPointsRepository, UpdatePatientPointsRepository, CreatePointTransactionRepository} from "../../repositories/manage-patient-points/index";
export class CompleteAppointmentService {

  private appointmentRepository = new FindAppointmentRepository();

  async complete(appointmentId: number) {

    //  * Verify that the appointment exists.
    const appointment = await this.appointmentRepository.findById(appointmentId);
    
    if (!appointment) {
      throw new Error(
        "Appointment not found."
      );
    }

    //  * Only approved appointments may be completed.
    if (appointment.status !== "APPROVED") {
      throw new Error(
        "Only approved appointments can be completed."
      );
    }

    //  * Validate stored values before modifying patient points.
    if (appointment.points_earned < 0) {
      throw new Error(
        "Invalid reward points stored for this appointment."
      );
    }

    if (appointment.original_amount < 0) {
      throw new Error(
        "Invalid original amount stored for this appointment."
      );
    }

    if (appointment.discount_amount < 0) {
      throw new Error(
        "Invalid discount amount stored for this appointment."
      );
    }

    if (appointment.final_amount < 0) {
      throw new Error(
        "Invalid final amount stored for this appointment."
      );
    }

    if (appointment.final_amount >appointment.original_amount) {
      throw new Error(
        "Invalid payment information stored for this appointment."
      );
    }


    //  * Begin PostgreSQL transaction.
    const client = await pool.connect();

    try {

      await client.query("BEGIN");

     
    // Initialize repositories using the same transaction.
      const appointmentStatusRepository = new UpdateAppointmentStatusRepository(client);
      const patientPointsRepository = new UpdatePatientPointsRepository(client);
      const pointTransactionRepository = new CreatePointTransactionRepository(client);
      const notificationRepository = new CreateNotificationRepository(client);
      const findPatientPointsRepository = new FindPatientPointsRepository(client);

    //  Complete the appointment.
      const completedAppointment = await appointmentStatusRepository.updateStatus(
          appointment.id,
          "APPROVED",
          "COMPLETED"
        );

      if (!completedAppointment) {
        throw new Error(
          "Appointment has already been updated."
        );
      }

    let earnedPoints = 0;

/**
 * Retrieve the patient's current point balance.
 */
const patientPoints = await findPatientPointsRepository.findByUserId(appointment.user_id);
if (!patientPoints) {
  throw new Error(
    "Patient reward points record not found."
  );
}

/**
 * Calculate balances.
 */
const balanceBefore = patientPoints.total_points;

// Determine earned points
if (appointment.patient_coupon_id === null && appointment.coupon_id === null) {
  // No coupon used - earn full points
  earnedPoints = appointment.points_earned;
} else {
  // Coupon was used - no points earned 
  earnedPoints = 0;
}

const balanceAfter = balanceBefore + earnedPoints;

/**
 * Determine earned points based on whether coupon was used
 */
if (appointment.patient_coupon_id === null && appointment.coupon_id === null) {
  // No coupon used - earn full points
  earnedPoints = appointment.points_earned;
  
  /**
   * Record the transaction history (ONLY when no coupon is used).
   */
  await pointTransactionRepository.create(
    appointment.user_id,
    appointment.id,
    earnedPoints,
    balanceBefore,
    balanceAfter,
    `Reward points earned from ${appointment.title}`
  );
} else {
  // Coupon was used - no points earned and no transaction recorded
  earnedPoints = 0;
}

/**
 * Update the patient's total balance.
 */
await patientPointsRepository.updateBalance(appointment.user_id, balanceAfter);


    // Notify the patient. 
      await notificationRepository.create(

        appointment.user_id,

        "Appointment Completed",
        `Your appointment has been completed successfully.

Service:
${appointment.title}
Original Amount:
₱${Number(appointment.original_amount).toFixed(2)}
Discount:
₱${Number(appointment.discount_amount).toFixed(2)}
Final Amount:
₱${Number(appointment.final_amount).toFixed(2)}
Reward Points Earned:
${earnedPoints}

Thank you for choosing our dental clinic.`

      );

      await client.query("COMMIT");
      return completedAppointment;

    } catch (error) {

      await client.query("ROLLBACK");
      throw error;

    } finally {

      client.release();

    }

  }

}