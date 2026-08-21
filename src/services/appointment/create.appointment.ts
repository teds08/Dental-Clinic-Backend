import { pool } from "../../config/db";

import { ICreateAppointment } from "../../interfaces/appointment.interface";

import { calculateEndTime } from "../../utils/appointment.time";

import {
  CheckAppointmentOverlapRepository,
  CreateAppointmentRepository,
} from "../../repositories/appointment/index";

import {
  FindPatientCouponRepository,
  UpdatePatientCouponRepository,
  FindActiveCouponRepository,
} from "../../repositories/manage-coupon/index";

import { CreateNotificationRepository } from "../../repositories/notification/index";

import { FindAdminsRepository } from "../../repositories/admin/index";

import { FindServiceRepository } from "../../repositories/manage-services/index";

export class CreateAppointmentService {
  private overlapRepo = new CheckAppointmentOverlapRepository();

  private serviceRepo = new FindServiceRepository();

  private adminRepo = new FindAdminsRepository();

  private couponRepository = new FindActiveCouponRepository();

  async createAppointment(data: ICreateAppointment, userId: number) {
    // ==================================================
    // 1. VERIFY SERVICE
    // ==================================================

    const service = await this.serviceRepo.findById(data.service_id);

    if (!service) {
      throw new Error("Selected service does not exist.");
    }

    // ==================================================
    // 2. DEFAULT APPOINTMENT AMOUNTS
    // ==================================================

    const originalAmount = Number(service.price);

    let discountAmount = 0;

    let finalAmount = originalAmount;

    let pointsEarned = Number(service.points);

    // ==================================================
    // 3. CALCULATE APPOINTMENT END TIME
    // ==================================================

    const endTime = calculateEndTime(
      data.appointment_time,

      service.duration_minutes,
    );

    // ==================================================
    // 4. CHECK APPOINTMENT SCHEDULE CONFLICT
    // ==================================================

    const hasConflict = await this.overlapRepo.hasConflict(
      data.appointment_date,

      data.appointment_time,

      endTime,
    );

    if (hasConflict) {
      throw new Error("The selected schedule is already occupied.");
    }

    // ==================================================
    // 5. START TRANSACTION
    // ==================================================

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // ==================================================
      // 6. CREATE TRANSACTION REPOSITORIES
      // ==================================================

      const appointmentRepo = new CreateAppointmentRepository(client);

      const notificationRepo = new CreateNotificationRepository(client);

      const patientCouponRepository = new FindPatientCouponRepository(client);

      const updatePatientCouponRepository = new UpdatePatientCouponRepository(
        client,
      );

      // ==================================================
      // 7. NORMAL COUPON
      // ==================================================

      if (
        data.patient_coupon_id !== null &&
        data.patient_coupon_id !== undefined
      ) {
        // ------------------------------------------------
        // Find patient's coupon inventory record
        // ------------------------------------------------

        const patientCoupon = await patientCouponRepository.findById(
          data.patient_coupon_id,
        );

        if (!patientCoupon) {
          throw new Error("Patient coupon does not exist.");
        }

        // ------------------------------------------------
        // Verify ownership
        // ------------------------------------------------

        if (patientCoupon.user_id !== userId) {
          throw new Error("This coupon does not belong to you.");
        }

        // ------------------------------------------------
        // Verify coupon is unused
        // ------------------------------------------------

        if (patientCoupon.status !== "UNUSED") {
          throw new Error("This coupon has already been used.");
        }

        // ------------------------------------------------
        // Verify the actual coupon is NORMAL
        // ------------------------------------------------

        if (patientCoupon.type !== "NORMAL") {
          throw new Error("This patient coupon is not a normal coupon.");
        }

        // ------------------------------------------------
        // Calculate discount
        // ------------------------------------------------

        const discountPercent = Number(patientCoupon.discount_percent);

        discountAmount = Number(
          (originalAmount * (discountPercent / 100)).toFixed(2),
        );

        finalAmount = Number((originalAmount - discountAmount).toFixed(2));

        // ------------------------------------------------
        // Coupon means no reward points
        // ------------------------------------------------

        pointsEarned = 0;
      }

      // ==================================================
      // 8. EVENT COUPON
      // ==================================================

      if (data.coupon_id !== null && data.coupon_id !== undefined) {
        // ------------------------------------------------
        // Find active Event Coupon
        // ------------------------------------------------

        const eventCoupon =
          await this.couponRepository.findActiveEventCouponById(data.coupon_id);

        if (!eventCoupon) {
          throw new Error(
            "The selected Event Coupon is not active or has expired.",
          );
        }

        // ------------------------------------------------
        // Calculate Event Coupon discount
        // ------------------------------------------------

        const discountPercent = Number(eventCoupon.discount_percent);

        discountAmount = Number(
          (originalAmount * (discountPercent / 100)).toFixed(2),
        );

        finalAmount = Number((originalAmount - discountAmount).toFixed(2));

        // ------------------------------------------------
        // Event Coupon means no reward points
        // ------------------------------------------------

        pointsEarned = 0;
      }

      // ==================================================
      // 9. CREATE APPOINTMENT
      // ==================================================

      const appointment = await appointmentRepo.create({
        ...data,

        user_id: userId,

        doctor_notes: data.doctor_notes ?? null,

        patient_coupon_id: data.patient_coupon_id ?? null,

        coupon_id: data.coupon_id ?? null,

        original_amount: originalAmount,

        discount_amount: discountAmount,

        final_amount: finalAmount,

        points_earned: pointsEarned,
      });

      // ==================================================
      // 10. MARK NORMAL COUPON AS USED
      // ==================================================

      if (
        data.patient_coupon_id !== null &&
        data.patient_coupon_id !== undefined
      ) {
        const updatedPatientCoupon =
          await updatePatientCouponRepository.markAsUsed(
            data.patient_coupon_id,
          );

        if (!updatedPatientCoupon) {
          throw new Error("The patient coupon could not be marked as used.");
        }
      }

      // ==================================================
      // 11. RETRIEVE ADMINISTRATORS
      // ==================================================

      const admins = await this.adminRepo.findAll();

      // ==================================================
      // 12. FORMAT APPOINTMENT DATE
      // ==================================================

      const formattedDate = new Date(data.appointment_date).toLocaleDateString(
        "en-PH",

        {
          year: "numeric",

          month: "long",

          day: "numeric",
        },
      );

      // ==================================================
      // 13. FORMAT APPOINTMENT TIME
      // ==================================================

      const formattedTime = new Date(
        `1970-01-01T${data.appointment_time}`,
      ).toLocaleTimeString(
        "en-PH",

        {
          hour: "numeric",

          minute: "2-digit",

          hour12: true,
        },
      );

      // ==================================================
      // 14. CREATE ADMIN NOTIFICATION
      // ==================================================

      let message = `A new appointment has been booked.

Patient: ${data.first_name} ${data.last_name}
Service: ${service.title}
Date: ${formattedDate}
Time: ${formattedTime}
Notes: ${data.doctor_notes ?? "None"}
Status: Pending`;

      // --------------------------------------------------
      // Normal Coupon notification
      // --------------------------------------------------

      if (
        data.patient_coupon_id !== null &&
        data.patient_coupon_id !== undefined
      ) {
        message += `

A reward coupon was applied to this appointment.`;
      }

      // --------------------------------------------------
      // Event Coupon notification
      // --------------------------------------------------

      if (data.coupon_id !== null && data.coupon_id !== undefined) {
        message += `

An Event Coupon was applied to this appointment.`;
      }

      // ==================================================
      // 15. NOTIFY EVERY ADMINISTRATOR
      // ==================================================

      for (const admin of admins) {
        await notificationRepo.create(
          admin.id,

          "New Appointment",

          message,
        );
      }

      // ==================================================
      // 16. COMMIT TRANSACTION
      // ==================================================

      await client.query("COMMIT");

      // ==================================================
      // 17. RETURN APPOINTMENT
      // ==================================================

      return appointment;
    } catch (error) {
      // ==================================================
      // ROLLBACK
      // ==================================================

      await client.query("ROLLBACK");

      throw error;
    } finally {
      // ==================================================
      // RELEASE DATABASE CONNECTION
      // ==================================================

      client.release();
    }
  }
}
