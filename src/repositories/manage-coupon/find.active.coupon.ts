import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class FindActiveCouponRepository {
constructor(private db: Database = pool) {}

  async findById(couponId: number) {

    const result = await this.db.query(

      `
      SELECT * FROM coupons
      WHERE

          id = $1

      AND is_active = TRUE
      AND deleted_at IS NULL
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
      `,

      [couponId]

    );

    return result.rows[0];

  }

   async findActiveEventCouponById(couponId: number) {

    const result = await this.db.query(

      `
      SELECT * FROM coupons
      WHERE

          id = $1

      AND type = 'EVENT'
      AND is_active = TRUE
      AND deleted_at IS NULL
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
      `,

      [couponId]

    );

    return result.rows[0];

  }

   async findActiveNormalCouponById(couponId: number) {
    const result = await this.db.query(

      `
      SELECT * FROM coupons
      WHERE

          id = $1

      AND type = 'NORMAL'
      AND is_active = TRUE
      AND deleted_at IS NULL

      `,

      [couponId]

    );

    return result.rows[0];

  }




}