"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemCouponService = void 0;
const db_1 = require("../../../config/db");
const validateCoupon_1 = require("./validateCoupon");
const findPatientPoints_1 = require("./findPatientPoints");
const checkSufficientPoints_1 = require("./checkSufficientPoints");
const updatePatientBalance_1 = require("./updatePatientBalance");
const recordRedemptionTransaction_1 = require("./recordRedemptionTransaction");
const createOwnedCoupon_1 = require("./createOwnedCoupon");
const createRedemptionNotification_1 = require("./createRedemptionNotification");
const notifyPatient_1 = require("./notifyPatient");
class RedeemCouponService {
    async redeem(userId, couponId) {
        // Step 1: Validate coupon exists and is active
        const coupon = await (0, validateCoupon_1.validateCoupon)(couponId);
        // Step 2: Start transaction
        const client = await db_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Step 3: Find patient points
            const patientPoints = await (0, findPatientPoints_1.findPatientPoints)(client, userId);
            const currentBalance = patientPoints.total_points;
            // Step 4: Check sufficient points
            (0, checkSufficientPoints_1.checkSufficientPoints)(currentBalance, coupon.required_points);
            // Step 5: Calculate new balance
            const newBalance = currentBalance - coupon.required_points;
            // Step 6: Update patient balance
            await (0, updatePatientBalance_1.updatePatientBalance)(client, userId, newBalance);
            // Step 7: Record redemption transaction
            await (0, recordRedemptionTransaction_1.recordRedemptionTransaction)(client, userId, coupon, currentBalance, newBalance);
            // Step 8: Create owned coupon
            await (0, createOwnedCoupon_1.createOwnedCoupon)(client, userId, coupon.id);
            // Step 9: Create notification message
            const notificationMessage = (0, createRedemptionNotification_1.createRedemptionNotification)(coupon);
            // Step 10: Notify patient
            await (0, notifyPatient_1.notifyPatient)(client, userId, notificationMessage);
            // Step 11: Commit transaction
            await client.query("COMMIT");
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
exports.RedeemCouponService = RedeemCouponService;
