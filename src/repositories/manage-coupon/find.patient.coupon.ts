import { pool } from "../../config/db";
import { Database } from "../../types/database.type";


export class FindPatientCouponRepository {
constructor(private db: Database = pool) {}


    async findById(patientCouponId: number) {

        const result = await this.db.query(

                `
                SELECT

                    pc.*,
                    c.name,
                    c.discount_percent,
                    c.type
                FROM patient_coupons pc
                INNER JOIN coupons c
                    ON c.id = pc.patient_coupon_id
                WHERE
                    pc.id = $1
                AND pc.deleted_at IS NULL
                `,

                [patientCouponId]

            );

        return result.rows[0];

    }

}