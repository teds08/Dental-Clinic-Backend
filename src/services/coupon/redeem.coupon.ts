import {pool} from "../../config/db";

import {FindPatientPointsRepository, UpdatePatientPointsRepository, CreatePatientCouponRepository, FindActiveCouponRepository, CreatePointTransactionRepository } from "../../repositories/admin"
import {CreateNotificationRepository} from "../../repositories/notification";


export class RedeemCouponService {
    private couponRepository = new FindActiveCouponRepository();

    async redeem(userId: number, couponId: number) {

        /**
         * Verify the coupon exists.
         */

        const coupon = await this.couponRepository.findActiveNormalCouponById(couponId);

        if (!coupon) {

            throw new Error(
                "Normal coupon does not exist or is inactive."
            );

        }

        /**
         * Start transaction.
         */

        const client = await pool.connect();

        try {

            await client.query("BEGIN");

            const patientPointsRepository = new FindPatientPointsRepository(client);
            const updatePointsRepository = new UpdatePatientPointsRepository(client);
            const patientCouponRepository = new CreatePatientCouponRepository(client);
            const pointTransactionRepository = new CreatePointTransactionRepository(client);
            const notificationRepository = new CreateNotificationRepository(client);

            /**
             * Retrieve patient's current points.
             */

            const patientPoints = await patientPointsRepository.findByUserId(userId);

            if (!patientPoints) {

                throw new Error(
                    "Patient reward points record not found."
                );

            }

            const currentBalance = patientPoints.total_points;

            /**
             * Verify enough reward points.
             */

            if (
                currentBalance < coupon.required_points
            ) {

                throw new Error(
                    "You do not have enough reward points."
                );

            }

            const newBalance = currentBalance - coupon.required_points;

            /**
             * Update patient's balance.
             */

            await updatePointsRepository.updateBalance(

                userId,
                newBalance

            );

            /**
             * Record redemption history.
             */

            await pointTransactionRepository.createRedeemTransaction(

                userId,
                coupon.id,
                coupon.required_points,
                currentBalance,
                newBalance,
                `Redeemed ${coupon.name}`

            );

            /**
             * Create owned coupon.
             */

            await patientCouponRepository.create({

                user_id: userId,
                coupon_id: coupon.id

            });

            /**
             * Notify patient.
             */

            await notificationRepository.create(

                userId,

                "Coupon Redeemed",
                `You successfully redeemed "${coupon.name}".

Discount:
${coupon.discount_percent}%

Reward Points Used:
${coupon.required_points}

The coupon has been added to your account and is ready to use during appointment booking.`

            );

            await client.query("COMMIT");

        } catch (error) {

            await client.query("ROLLBACK");
            throw error;

        } finally {

            client.release();

        }

    }

}