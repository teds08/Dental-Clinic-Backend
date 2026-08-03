import { pool } from "../../../config/db";
import { Database } from "../../../types/database.type";
import { IPatientCoupon } from "../../../interfaces/coupon.interface";

export class CreatePatientCouponRepository {
constructor(private db: Database = pool) {}


    async create(data: IPatientCoupon) {
        const result = await this.db.query(

                `
                INSERT INTO patient_coupons
                (user_id, patient_coupon_id)

                VALUES($1, $2)
                
                RETURNING *
                `,

                [data.user_id,data.coupon_id]

            );

        return result.rows[0];

    }

}