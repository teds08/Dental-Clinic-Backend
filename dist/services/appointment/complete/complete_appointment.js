"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteAppointmentService = void 0;
const db_1 = require("../../../config/db");
const validateAppointment_1 = require("./validateAppointment");
const validateAppointmentAmounts_1 = require("./validateAppointmentAmounts");
const updateAppointmentStatus_1 = require("./updateAppointmentStatus");
const findPatientPoints_1 = require("./findPatientPoints");
const calculateEarnedPoints_1 = require("./calculateEarnedPoints");
const createPointTransaction_1 = require("./createPointTransaction");
const updatePatientBalance_1 = require("./updatePatientBalance");
const createNotificationMessage_1 = require("./createNotificationMessage");
const notifyPatient_1 = require("./notifyPatient");
class CompleteAppointmentService {
    async complete(appointmentId) {
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 1: Validate appointment exists and is APPROVED
            const appointment = await (0, validateAppointment_1.validateAppointment)(client, appointmentId);
            // Step 2: Validate appointment amounts
            (0, validateAppointmentAmounts_1.validateAppointmentAmounts)(appointment);
            // Step 3: Update appointment status to COMPLETED
            const completedAppointment = await (0, updateAppointmentStatus_1.updateAppointmentStatus)(client, appointmentId);
            // Step 4: Find patient points
            const patientPoints = await (0, findPatientPoints_1.findPatientPoints)(client, appointment.user_id);
            // Step 5: Calculate earned points
            const { earnedPoints, balanceAfter } = (0, calculateEarnedPoints_1.calculateEarnedPoints)(appointment, patientPoints.total_points);
            // Step 6: Create point transaction (if no coupon used)
            await (0, createPointTransaction_1.createPointTransaction)(client, appointment, earnedPoints, patientPoints.total_points, balanceAfter);
            // Step 7: Update patient balance
            await (0, updatePatientBalance_1.updatePatientBalance)(client, appointment.user_id, balanceAfter);
            // Step 8: Create notification message
            const notificationMessage = (0, createNotificationMessage_1.createNotificationMessage)(appointment, earnedPoints);
            // Step 9: Notify patient
            await (0, notifyPatient_1.notifyPatient)(client, appointment.user_id, notificationMessage);
            // Step 10: Commit transaction
            await client.query("COMMIT");
            return completedAppointment;
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
exports.CompleteAppointmentService = CompleteAppointmentService;
