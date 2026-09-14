"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectAppointmentService = void 0;
const db_1 = require("../../../config/db");
const validateAppointment_1 = require("./validateAppointment");
const updateAppointmentStatus_1 = require("./updateAppointmentStatus");
const restoreCoupon_1 = require("./restoreCoupon");
const formatAppointmentDetails_1 = require("./formatAppointmentDetails");
const createNotificationMessage_1 = require("./createNotificationMessage");
const notifyPatient_1 = require("./notifyPatient");
class RejectAppointmentService {
    async reject(appointmentId) {
        // Step 1: Validate appointment
        const appointment = await (0, validateAppointment_1.validateAppointment)(appointmentId);
        // Step 2: Start transaction
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 3: Update appointment status
            const updatedAppointment = await (0, updateAppointmentStatus_1.updateAppointmentStatus)(client, appointmentId);
            // Step 4: Restore coupon if used
            const { couponWasUsed, couponConflictDetected } = await (0, restoreCoupon_1.restoreCoupon)(client, appointment.patient_coupon_id);
            // Step 5: Format appointment details
            const { formattedDate, formattedTime } = (0, formatAppointmentDetails_1.formatAppointmentDetails)(appointment);
            // Step 6: Create notification message
            const notificationMessage = (0, createNotificationMessage_1.createNotificationMessage)(appointment, formattedDate, formattedTime, couponWasUsed, couponConflictDetected);
            // Step 7: Notify patient
            await (0, notifyPatient_1.notifyPatient)(client, appointment.user_id, notificationMessage);
            // Step 8: Commit transaction
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
exports.RejectAppointmentService = RejectAppointmentService;
