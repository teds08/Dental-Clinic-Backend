"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAppointmentService = void 0;
const db_1 = require("../../../config/db");
const validateAppointment_1 = require("./validateAppointment");
const buildAppointmentDateTime_1 = require("./buildAppointmentDateTime");
const checkCancellationWindow_1 = require("./checkCancellationWindow");
const updateAppointmentStatus_1 = require("./updateAppointmentStatus");
const restoreCoupon_1 = require("./restoreCoupon");
const findAllAdmins_1 = require("./findAllAdmins");
const formatAppointmentDetails_1 = require("./formatAppointmentDetails");
const notifyAdmins_1 = require("./notifyAdmins");
class CancelAppointmentService {
    async cancel(appointmentId, userId) {
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 1: Validate appointment
            const appointment = await (0, validateAppointment_1.validateAppointment)(client, appointmentId, userId);
            // Step 2: Build appointment date/time
            const appointmentDateTime = (0, buildAppointmentDateTime_1.buildAppointmentDateTime)(appointment);
            // Step 3: Check cancellation window (24 hours)
            (0, checkCancellationWindow_1.checkCancellationWindow)(appointmentDateTime);
            // Step 4: Cancel the appointment
            const updatedAppointment = await (0, updateAppointmentStatus_1.updateAppointmentStatus)(client, appointmentId);
            // Step 5: Restore patient coupon
            await (0, restoreCoupon_1.restoreCoupon)(client, appointment.patient_coupon_id);
            // Step 6: Find all admins
            const admins = await (0, findAllAdmins_1.findAllAdmins)(client);
            // Step 7: Format appointment details
            const { formattedDate, formattedTime } = (0, formatAppointmentDetails_1.formatAppointmentDetails)(appointment);
            // Step 8: Notify all admins
            await (0, notifyAdmins_1.notifyAdmins)(client, admins, appointment, formattedDate, formattedTime);
            // Step 9: Commit transaction
            await client.query("COMMIT");
            return updatedAppointment;
        }
        catch (error) {
            // Rollback
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            // Release connection
            client.release();
        }
    }
}
exports.CancelAppointmentService = CancelAppointmentService;
