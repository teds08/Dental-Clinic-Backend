import { pool } from "../../config/db";

import {UpdateAppointmentStatusRepository,FindAppointmentRepository} from "../../repositories/appointment/index";
import {UpdatePatientCouponRepository} from "../../repositories/admin/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";


export class RejectAppointmentService {
    private findRepo = new FindAppointmentRepository();


    async reject(appointmentId: number) {

        // --------------------------------------------------
        // 1. Find the appointment
        // --------------------------------------------------

        const appointment = await this.findRepo.findById(appointmentId);


        if (!appointment) {

            throw new Error(
                "Appointment not found."
            );

        }


        // --------------------------------------------------
        // 2. Only PENDING appointments can be rejected
        // --------------------------------------------------

        if (appointment.status !== "PENDING") {

            throw new Error(
                "Only pending appointments can be rejected."
            );

        }


        // --------------------------------------------------
        // 3. Start database transaction
        // --------------------------------------------------

        const client = await pool.connect();


        try {

            await client.query("BEGIN");


            // --------------------------------------------------
            // 4. Create repositories using the transaction
            //    client
            // --------------------------------------------------

            const statusRepo = new UpdateAppointmentStatusRepository(client);
            const patientCouponRepo = new UpdatePatientCouponRepository(client);
            const notificationRepo = new CreateNotificationRepository(client);


            // --------------------------------------------------
            // 5. Change appointment status
            //
            // PENDING → REJECTED
            // --------------------------------------------------

            const updatedAppointment = await statusRepo.updateStatus(

                    appointmentId,
                    "PENDING",
                    "REJECTED"

                );


            if (!updatedAppointment) {

                throw new Error(
                    "Appointment has already been updated."
                );

            }

              // --------------------------------------------------
              // 6. Check whether the appointment used a coupon
              // --------------------------------------------------

              let couponWasUsed = false;
              let couponConflictDetected = false;


              if (appointment.patient_coupon_id !== null && appointment.patient_coupon_id !== undefined) {

                  // --------------------------------------------------
                  // Restore the patient's coupon
                  // --------------------------------------------------

                  const restoredCoupon = await patientCouponRepo.markAsUnused(appointment.patient_coupon_id);


                  // --------------------------------------------------
                  // Check whether the coupon could be restored
                  // --------------------------------------------------

                  if (!restoredCoupon) {

                      couponConflictDetected = true;

                  } else {

                      couponWasUsed = true;

                  }

              }

            // --------------------------------------------------
            // 7. Format appointment date
            // --------------------------------------------------

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


            // --------------------------------------------------
            // 8. Format appointment time
            // --------------------------------------------------

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


          // --------------------------------------------------
          // 9. Create the notification message
          // --------------------------------------------------

                const notificationMessage =
            `Unfortunately, your appointment could not be approved.

        Service:
        ${appointment.title}
        Date:
        ${formattedDate}
        Time:
        ${formattedTime}

        ${couponConflictDetected
                ? `Coupon Conflict Detected.
        There was a problem with the coupon associated with this appointment.`
                : couponWasUsed
                    ? `Your coupon has been returned to your coupon inventory.`
                    : ``
        }
        Please contact the clinic or book another available schedule.`;


            // --------------------------------------------------
            // 10. Notify the patient
            // --------------------------------------------------

            await notificationRepo.create(

                appointment.user_id,
                "Appointment Rejected",
                notificationMessage

            );


            // --------------------------------------------------
            // 11. Commit transaction
            // --------------------------------------------------

            await client.query(
                "COMMIT"
            );


            // --------------------------------------------------
            // 12. Return updated appointment
            // --------------------------------------------------

            return updatedAppointment;


        } catch (error) {

            // --------------------------------------------------
            // 13. Rollback all changes
            // --------------------------------------------------

            await client.query(
                "ROLLBACK"
            );

            throw error;

        } finally {

            // --------------------------------------------------
            // 14. Release database connection
            // --------------------------------------------------

            client.release();

        }

    }

}