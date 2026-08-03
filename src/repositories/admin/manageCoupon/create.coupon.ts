import { pool } from "../../../config/db";
import { ICoupon } from "../../../interfaces/coupon.interface";

export class CreateCouponRepository {

  async create(data: ICoupon) {
    const result = await pool.query(

        `
        INSERT INTO coupons
        (
          name,
          type,
          discount_percent,
          required_points,
          is_active,
          start_date,
          end_date

        )

        VALUES
        ($1, $2, $3, $4, $5, $6, $7)

        RETURNING *
        `,

        [
          data.name,
          data.type,
          data.discount_percent,
          data.required_points ?? null,
          data.is_active ?? true,
          data.start_date ?? null,
          data.end_date ?? null

        ]

      );

    return result.rows[0];

  }

}