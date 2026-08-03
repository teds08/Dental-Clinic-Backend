import { pool } from "../../../config/db";
import { Database } from "../../../types/database.type";


export class CreatePointTransactionRepository {
constructor(private db: Database = pool) {}

   async create(
    userId: number,
    appointmentId: number,
    points: number,
    balanceBefore: number,
    balanceAfter: number,
    remarks: string
  ) {

    const result = await this.db.query(
      `
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
      `,
      [
        userId,
        appointmentId,
        points,
        balanceBefore,
        balanceAfter,
        remarks
      ]
    );

    return result.rows[0];

  }

  async createRedeemTransaction(

    userId: number,
    patientCouponId: number,
    redeemedPoints: number,
    balanceBefore: number,
    balanceAfter: number,
    remarks: string

) {

    const result = await this.db.query(

            `
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
            `,

            [

                userId,
                patientCouponId,
                redeemedPoints,
                balanceBefore,
                balanceAfter,
                remarks

            ]

        );

    return result.rows[0];

}

}