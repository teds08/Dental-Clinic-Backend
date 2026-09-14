"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveAppointmentService = void 0;
const db_1 = require("../../../config/db");
const validateAppointment_1 = require("./validateAppointment");
const checkCouponConflict_1 = require("./checkCouponConflict");
const updateAppointmentStatus_1 = require("./updateAppointmentStatus");
const markCouponAsUsed_1 = require("./markCouponAsUsed");
const formatAppointmentDetails_1 = require("./formatAppointmentDetails");
const createNotificationMessage_1 = require("./createNotificationMessage");
const notifyPatient_1 = require("./notifyPatient");
class ApproveAppointmentService {
    async approve(appointmentId) {
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 1: Validate appointment
            const appointment = await (0, validateAppointment_1.validateAppointment)(client, appointmentId);
            // Step 2: Check for coupon conflict
            await (0, checkCouponConflict_1.checkCouponConflict)(client, appointmentId, appointment.patient_coupon_id);
            // Step 3: Update appointment status
            const updatedAppointment = await (0, updateAppointmentStatus_1.updateAppointmentStatus)(client, appointmentId);
            // Step 4: Mark coupon as used
            await (0, markCouponAsUsed_1.markCouponAsUsed)(client, appointment.patient_coupon_id);
            // Step 5: Format appointment details
            const { formattedDate, formattedTime } = (0, formatAppointmentDetails_1.formatAppointmentDetails)(appointment);
            // Step 6: Create notification message
            const notificationMessage = (0, createNotificationMessage_1.createNotificationMessage)(appointment, formattedDate, formattedTime);
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
exports.ApproveAppointmentService = ApproveAppointmentService;
