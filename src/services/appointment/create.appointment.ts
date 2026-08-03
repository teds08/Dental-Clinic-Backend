import { pool } from "../../config/db";
import { ICreateAppointment } from "../../interfaces/appointment.interface";
import { calculateEndTime } from "../../utils/appointment.time";

import {CheckAppointmentOverlapRepository, CreateAppointmentRepository} from "../../repositories/appointment";
import {FindAdminsRepository, FindServiceRepository, FindActiveCouponRepository, FindPatientCouponRepository, UpdatePatientCouponRepository} from "../../repositories/admin";
import { CreateNotificationRepository } from "../../repositories/notification";

export class CreateAppointmentService {

  private overlapRepo = new CheckAppointmentOverlapRepository();
  private serviceRepo = new FindServiceRepository();
  private adminRepo = new FindAdminsRepository();
  private couponRepository = new FindActiveCouponRepository();

  async createAppointment(data: ICreateAppointment, userId: number) {

    /**
     * Verify the selected service exists.
     */
    const service = await this.serviceRepo.findById(data.service_id);

    if (!service) {
      throw new Error(
        "Selected service does not exist."
      );
    }

  let originalAmount = Number(service.price);
  let discountAmount = 0;
  let finalAmount = originalAmount;
  let pointsEarned = service.points;

    // Calculate appointment end time.
    const endTime = calculateEndTime(
        data.appointment_time,
        service.duration_minutes
      );

    // Check schedule conflict.
    const hasConflict = await this.overlapRepo.hasConflict(
        data.appointment_date,
        data.appointment_time,
        endTime
      );

    if (hasConflict) {
      throw new Error(
        "The selected schedule is already occupied."
      );
    }

    // Start PostgreSQL transaction.
    const client = await pool.connect();

    try {

      await client.query("BEGIN");
      const appointmentRepo = new CreateAppointmentRepository(client);
      const notificationRepo = new CreateNotificationRepository(client);
      const patientCouponRepository = new FindPatientCouponRepository(client);
      const updatePatientCouponRepository = new UpdatePatientCouponRepository(client);

    if (data.patient_coupon_id) {

    const patientCoupon = await patientCouponRepository.findById(

            data.patient_coupon_id

        );

    if (!patientCoupon) {

        throw new Error(
            "Patient coupon does not exist."
        );

    }

    if (patientCoupon.user_id !== userId) {

        throw new Error(
            "This coupon does not belong to you."
        );

    }

    if (patientCoupon.status !== "UNUSED") {

        throw new Error(
            "This coupon has already been used."
        );

    }

    const discount = Number(patientCoupon.discount_percent);

    discountAmount = Number((originalAmount * (discount / 100)).toFixed(2));
    finalAmount = Number((originalAmount - discountAmount).toFixed(2));

    /**
     * Reward points are not earned
     * when a coupon is used.
     */

    pointsEarned = 0;

}




      // Create appointment.
      const appointment = await appointmentRepo.create({

          ...data,

          user_id: userId,
          patient_coupon_id: data.patient_coupon_id ?? null,
          original_amount: originalAmount,
          discount_amount: discountAmount,
          final_amount: finalAmount,
          points_earned: pointsEarned

        });

        if (data.patient_coupon_id) {

    await updatePatientCouponRepository.markAsUsed(
        data.patient_coupon_id

    );

}

      // Retrieve all administrators.
      const admins = await this.adminRepo.findAll();

      const formattedDate =
        new Date(
          data.appointment_date
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
          `1970-01-01T${data.appointment_time}`
        ).toLocaleTimeString(
          "en-PH",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }
        );

        let message =
`A new appointment has been booked.

Patient: ${data.patient_name}
Service: ${service.title}
Date: ${formattedDate}
Time: ${formattedTime}
Status: Pending`;

if (data.patient_coupon_id) {

    message +=

`

A reward coupon was applied to this appointment.`;

}
      // Notify every administrator.
      for (const admin of admins) {

       await notificationRepo.create(

    admin.id,

    "New Appointment",

    message

);
      }

      // Commit transaction.
      
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