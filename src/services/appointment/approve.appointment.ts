import { pool } from "../../config/db";
import {FindAppointmentRepository, UpdateAppointmentStatusRepository} from "../../repositories/appointment/index";
import {CreateNotificationRepository} from "../../repositories/notification/index";


export class ApproveAppointmentService {

    async approve(appointmentId: number) {

        const client = await pool.connect();

        try {

            await client.query("BEGIN");


            // --------------------------------------------------
            // 1. Create repositories using the transaction client
            // --------------------------------------------------

            const findRepo = new FindAppointmentRepository(client);
            const statusRepo = new UpdateAppointmentStatusRepository(client);
            const notificationRepo =  new CreateNotificationRepository(client);


            // --------------------------------------------------
            // 2. Find the appointment
            // --------------------------------------------------

            const appointment = await findRepo.findById(appointmentId);

            if (!appointment) {

                throw new Error(
                    "Appointment not found."
                );

            }


            // --------------------------------------------------
            // 3. Only PENDING appointments can be approved
            // --------------------------------------------------

            if (appointment.status !== "PENDING") {

                throw new Error(
                    "Only pending appointments can be approved."
                );

            }


            // --------------------------------------------------
            // 4. Check for coupon conflict
            // --------------------------------------------------

            if (appointment.patient_coupon_id !== null && appointment.patient_coupon_id !== undefined) {

                const conflictingAppointment =  await statusRepo.findCouponConflict(
                        appointment.id,
                        appointment.patient_coupon_id);


                if (conflictingAppointment) {

                    throw new Error(

                        `Coupon conflict detected. ` +
                        `The patient coupon used by this appointment ` +
                        `is already assigned to appointment ID ` +
                        `${conflictingAppointment.id} ` +
                        `with status ${conflictingAppointment.status}. ` +
                        `Please resolve the conflicting appointment before approving this appointment.`

                    );

                }

            }


            // --------------------------------------------------
            // 5. Approve the appointment
            // --------------------------------------------------

            const updatedAppointment =
                await statusRepo.updateStatus(

                    appointmentId,

                    "PENDING",

                    "APPROVED"

                );


            if (!updatedAppointment) {

                throw new Error(
                    "Appointment has already been updated."
                );

            }


            // --------------------------------------------------
            // 6. Format appointment date
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
            // 7. Format appointment time
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
            // 8. Notify the patient
            // --------------------------------------------------

            await notificationRepo.create(

                appointment.user_id,

                "Appointment Approved",

                `Your appointment has been approved.

Service:
${appointment.title}
Date:
${formattedDate}
Time:
${formattedTime}

Please arrive at least 15 minutes before your appointment.`

            );


            // --------------------------------------------------
            // 9. Commit the transaction
            // --------------------------------------------------

            await client.query("COMMIT");


            // --------------------------------------------------
            // 10. Return the approved appointment
            // --------------------------------------------------

            return updatedAppointment;


        } catch (error) {

            // --------------------------------------------------
            // Rollback all database changes
            // --------------------------------------------------

            await client.query("ROLLBACK");

            throw error;

        } finally {

            // --------------------------------------------------
            // Release database connection
            // --------------------------------------------------

            client.release();

        }

    }

}