import { pool } from "../../../config/db";
import { Database } from "../../../types/database.type";

export class UpdatePatientCouponRepository {
constructor(private db: Database = pool) {}


    async markAsUsed(patientCouponId: number) {

        const result = await this.db.query(

                `
                UPDATE patient_coupons
                SET
                    status = 'USED',
                    used_at = NOW(),
                    updated_at = NOW()
                WHERE
                    id = $1
                RETURNING *
                `,

                [patientCouponId]

            );

        return result.rows[0];

    }

}