import { pool } from "../../../config/db";
import { validateCoupon } from "./validateCoupon";
import { findPatientPoints } from "./findPatientPoints";
import { checkSufficientPoints } from "./checkSufficientPoints";
import { updatePatientBalance } from "./updatePatientBalance";
import { recordRedemptionTransaction } from "./recordRedemptionTransaction";
import { createOwnedCoupon } from "./createOwnedCoupon";
import { createRedemptionNotification } from "./createRedemptionNotification";
import { notifyPatient } from "./notifyPatient";

export class RedeemCouponService {
  async redeem(userId: number, couponId: number) {
    // Step 1: Validate coupon exists and is active
    const coupon = await validateCoupon(couponId);

    // Step 2: Start transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Step 3: Find patient points
      const patientPoints = await findPatientPoints(client, userId);
      const currentBalance = patientPoints.total_points;

      // Step 4: Check sufficient points
      checkSufficientPoints(currentBalance, coupon.required_points);

      // Step 5: Calculate new balance
      const newBalance = currentBalance - coupon.required_points;

      // Step 6: Update patient balance
      await updatePatientBalance(client, userId, newBalance);

      // Step 7: Record redemption transaction
      await recordRedemptionTransaction(
        client,
        userId,
        coupon,
        currentBalance,
        newBalance
      );

      // Step 8: Create owned coupon
      await createOwnedCoupon(client, userId, coupon.id);

      // Step 9: Create notification message
      const notificationMessage = createRedemptionNotification(coupon);

      // Step 10: Notify patient
      await notifyPatient(client, userId, notificationMessage);

      // Step 11: Commit transaction
      await client.query("COMMIT");
    } catch (error) {
      // Rollback
      await client.query("ROLLBACK");
      throw error;
    } finally {
      // Release connection
      client.release();
    }
  }
}