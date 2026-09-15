import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class FindArchivedCouponRepository {
  constructor(private db: Database = pool) {}

  async findAll() {
    const result = await this.db.query(
      `
      SELECT
        id,
        name,
        description,
        type,
        discount_percent,
        required_points,
        is_active,
        start_date,
        end_date,
        created_at,
        updated_at,
        deleted_at

      FROM coupons

      WHERE deleted_at IS NOT NULL

      ORDER BY deleted_at DESC
      `,
    );

    return result.rows;
  }
}
