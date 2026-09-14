"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentService = void 0;
const db_1 = require("../../../config/db");
const validateService_1 = require("./validateService");
const calculateAppointmentEndTime_1 = require("./calculateAppointmentEndTime");
const checkScheduleConflict_1 = require("./checkScheduleConflict");
const validatePatientCoupon_1 = require("./validatePatientCoupon");
const validateEventCoupon_1 = require("./validateEventCoupon");
const calculateAppointmentAmounts_1 = require("./calculateAppointmentAmounts");
const createAppointment_1 = require("./createAppointment");
const markPatientCouponAsUsed_1 = require("./markPatientCouponAsUsed");
const findAllAdmins_1 = require("./findAllAdmins");
const formatAppointmentDetails_1 = require("./formatAppointmentDetails");
const buildAdminNotificationMessage_1 = require("./buildAdminNotificationMessage");
const notifyAdmins_1 = require("./notifyAdmins");
class CreateAppointmentService {
    async createAppointment(data, userId) {
        // Step 1: Validate service
        const service = await (0, validateService_1.validateService)(data.service_id);
        // Step 2: Calculate appointment end time
        const endTime = (0, calculateAppointmentEndTime_1.calculateAppointmentEndTime)(data.appointment_time, service.duration_minutes);
        // Step 3: Check for schedule conflict
        await (0, checkScheduleConflict_1.checkScheduleConflict)(data.appointment_date, data.appointment_time, endTime);
        // Step 4: Start transaction
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 5: Validate patient coupon (if provided)
            const patientCoupon = await (0, validatePatientCoupon_1.validatePatientCoupon)(client, data.patient_coupon_id, userId);
            // Step 6: Validate event coupon (if provided)
            const eventCoupon = await (0, validateEventCoupon_1.validateEventCoupon)(data.coupon_id);
            // Step 7: Calculate appointment amounts
            const amounts = (0, calculateAppointmentAmounts_1.calculateAppointmentAmounts)(Number(service.price), Number(service.points), patientCoupon, eventCoupon);
            // Step 8: Create appointment
            const appointment = await (0, createAppointment_1.createAppointment)(client, data, userId, amounts);
            // Step 9: Mark patient coupon as used
            await (0, markPatientCouponAsUsed_1.markPatientCouponAsUsed)(client, data.patient_coupon_id);
            // Step 10: Get all admins
            const admins = await (0, findAllAdmins_1.findAllAdmins)();
            // Step 11: Format appointment details
            const { formattedDate, formattedTime } = (0, formatAppointmentDetails_1.formatAppointmentDetails)(data.appointment_date, data.appointment_time);
            // Step 12: Build admin notification message
            const message = (0, buildAdminNotificationMessage_1.buildAdminNotificationMessage)(data, service.title, formattedDate, formattedTime, patientCoupon !== null, eventCoupon !== null);
            // Step 13: Notify all admins
            await (0, notifyAdmins_1.notifyAdmins)(client, admins, message);
            // Step 14: Commit transaction
            await client.query("COMMIT");
            return appointment;
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
exports.CreateAppointmentService = CreateAppointmentService;
