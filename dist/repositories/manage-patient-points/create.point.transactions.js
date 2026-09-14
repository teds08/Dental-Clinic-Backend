"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePointTransactionRepository = void 0;
const db_1 = require("../../config/db");
class CreatePointTransactionRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(userId, appointmentId, points, balanceBefore, balanceAfter, remarks) {
        const result = await this.db.query(`
      INSERT INTO point_transactions
      (

        user_id,
        appointment_id,
        points,
        transaction_type,
        balance_before,
        balance_after,
        remarks

      )

      VALUES
      ($1,$2,$3,'EARNED',$4,$5,$6)

      RETURNING *
      `, [
            userId,
            appointmentId,
            points,
            balanceBefore,
            balanceAfter,
            remarks
        ]);
        return result.rows[0];
    }
    async createRedeemTransaction(userId, patientCouponId, redeemedPoints, balanceBefore, balanceAfter, remarks) {
        const result = await this.db.query(`
            INSERT INTO point_transactions
            (user_id, patient_coupon_id, transaction_type, points, balance_before, balance_after, remarks)

            VALUES
            (
                $1,
                $2,
                'REDEEMED',
                $3,
                $4,
                $5,
                $6
            )

            RETURNING *
            `, [
            userId,
            patientCouponId,
            redeemedPoints,
            balanceBefore,
            balanceAfter,
            remarks
        ]);
        return result.rows[0];
    }
}
exports.CreatePointTransactionRepository = CreatePointTransactionRepository;
