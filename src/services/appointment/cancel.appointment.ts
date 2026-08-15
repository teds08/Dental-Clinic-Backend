import { pool } from "../../config/db";
import {UpdateAppointmentStatusRepository, FindAppointmentRepository} from "../../repositories/appointment/index";
import {FindAdminsRepository, UpdatePatientCouponRepository} from "../../repositories/admin/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";

export class CancelAppointmentService {

    private appointmentRepo = new FindAppointmentRepository();


    async cancel(appointmentId: number,userId: number) {

        // --------------------------------------------------
        // 1. Find the appointment
        // --------------------------------------------------

        const appointment = await this.appointmentRepo.findByIdAndUserId(appointmentId,userId);


        if (!appointment) {

            throw new Error(
                "Appointment not found."
            );

        }


        // --------------------------------------------------
        // 2. Only PENDING appointments can be cancelled
        // --------------------------------------------------

        if (appointment.status !== "PENDING") {

            throw new Error(
                "Only pending appointments can be cancelled."
            );

        }


        // --------------------------------------------------
        // 3. Build the appointment date and time
        // --------------------------------------------------

        const dateStr =
            new Date(
                new Date(
                    appointment.appointment_date
                ).getTime() +
                8 * 60 * 60 * 1000
            )
            .toISOString()
            .slice(0, 10);


        const timeStr = appointment.appointment_time.slice(0, 5);
        const appointmentDateTime = new Date(`${dateStr}T${timeStr}:00+08:00`);


        if (isNaN(appointmentDateTime.getTime())) 
          {

            throw new Error(
                "Invalid appointment date/time."
            );

        }


        // --------------------------------------------------
        // 4. Check how much time remains
        // --------------------------------------------------

        const now = new Date();
        const difference = appointmentDateTime.getTime() - now.getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;


        // --------------------------------------------------
        // 5. Appointment cannot be cancelled
        //    within 24 hours
        // --------------------------------------------------

        if (difference <= twentyFourHours) {

            throw new Error(
                "Appointments cannot be cancelled within 24 hours of the scheduled time."
            );

        }


        // --------------------------------------------------
        // 6. Start database transaction
        // --------------------------------------------------

        const client = await pool.connect();


        try {

            await client.query("BEGIN");


            // --------------------------------------------------
            // 7. Create repositories using transaction client
            // --------------------------------------------------

            const statusRepo = new UpdateAppointmentStatusRepository(client);
            const patientCouponRepo = new UpdatePatientCouponRepository(client);
            const notificationRepo = new CreateNotificationRepository(client);
            const adminRepo = new FindAdminsRepository(client);


            // --------------------------------------------------
            // 8. Cancel the appointment
            //
            // This update only succeeds if the appointment
            // is still PENDING.
            // --------------------------------------------------

            const updatedAppointment = await statusRepo.updateStatus(

                    appointmentId,

                    "PENDING",
                    "CANCELLED"

                );


            if (!updatedAppointment) {

                throw new Error(
                    "Appointment has already been updated."
                );

            }


            // --------------------------------------------------
            // 9. Restore the patient's coupon
            //
            // appointments.patient_coupon_id references
            // patient_coupons.id
            // --------------------------------------------------

            if (appointment.patient_coupon_id !== null && appointment.patient_coupon_id !== undefined) {

                const restoredCoupon = await patientCouponRepo.markAsUnused(appointment.patient_coupon_id);

                if (!restoredCoupon) {

                    throw new Error(
                        "The patient coupon could not be restored."
                    );

                }

            }


            // --------------------------------------------------
            // 10. Find all administrators
            // --------------------------------------------------

            const admins = await adminRepo.findAll();


            // --------------------------------------------------
            // 11. Format appointment date
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
            // 12. Format appointment time
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
            // 13. Notify every administrator
            // --------------------------------------------------

            for (
                const admin of admins
            ) {

                await notificationRepo.create(

                    admin.id,

                    "Appointment Cancelled",

                    `A patient cancelled an appointment.

Patient:
${appointment.patient_name}
Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}`

                );

            }


            // --------------------------------------------------
            // 14. Commit transaction
            // --------------------------------------------------

            await client.query("COMMIT");


            // --------------------------------------------------
            // 15. Return updated appointment
            // --------------------------------------------------

            return updatedAppointment;


        } catch (error) {

            // --------------------------------------------------
            // Rollback everything
            // --------------------------------------------------

            await client.query(
                "ROLLBACK"
            );

            throw error;


        } finally {

            // --------------------------------------------------
            // Release database connection
            // --------------------------------------------------

            client.release();

        }

    }

}