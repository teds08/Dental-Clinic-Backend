import { pool } from "../../../config/db";
import { ICreateAppointment } from "../../../interfaces/appointment.interface";
import { validateService } from "./validateService";
import { calculateAppointmentEndTime } from "./calculateAppointmentEndTime";
import { checkScheduleConflict } from "./checkScheduleConflict";
import { validatePatientCoupon } from "./validatePatientCoupon";
import { validateEventCoupon } from "./validateEventCoupon";
import {
  calculateAppointmentAmounts,
  AppointmentAmounts,
} from "./calculateAppointmentAmounts";
import { createAppointment } from "./createAppointment";
import { markPatientCouponAsUsed } from "./markPatientCouponAsUsed";
import { findAllAdmins } from "./findAllAdmins";
import { formatAppointmentDetails } from "./formatAppointmentDetails";
import { buildAdminNotificationMessage } from "./buildAdminNotificationMessage";
import { notifyAdmins } from "./notifyAdmins";

export class CreateAppointmentService {
  async createAppointment(data: ICreateAppointment, userId: number) {
    // Step 1: Validate service
    const service = await validateService(data.service_id);

    // Step 2: Calculate appointment end time
    const endTime = calculateAppointmentEndTime(
      data.appointment_time,
      service.duration_minutes
    );

    // Step 3: Check for schedule conflict
    await checkScheduleConflict(data.appointment_date, data.appointment_time, endTime);

    // Step 4: Start transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 5: Validate patient coupon (if provided)
      const patientCoupon = await validatePatientCoupon(
        client,
        data.patient_coupon_id,
        userId
      );

      // Step 6: Validate event coupon (if provided)
      const eventCoupon = await validateEventCoupon(data.coupon_id);

      // Step 7: Calculate appointment amounts
      const amounts: AppointmentAmounts = calculateAppointmentAmounts(
        Number(service.price),
        Number(service.points),
        patientCoupon,
        eventCoupon
      );

      // Step 8: Create appointment
      const appointment = await createAppointment(
        client,
        data,
        userId,
        amounts
      );

      // Step 9: Mark patient coupon as used
      await markPatientCouponAsUsed(client, data.patient_coupon_id);

      // Step 10: Get all admins
      const admins = await findAllAdmins();

      // Step 11: Format appointment details
      const { formattedDate, formattedTime } = formatAppointmentDetails(
        data.appointment_date,
        data.appointment_time
      );

      // Step 12: Build admin notification message
      const message = buildAdminNotificationMessage(
        data,
        service.title,
        formattedDate,
        formattedTime,
        patientCoupon !== null,
        eventCoupon !== null
      );

      // Step 13: Notify all admins
      await notifyAdmins(client, admins, message);

      // Step 14: Commit transaction
      await client.query("COMMIT");

      return appointment;
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