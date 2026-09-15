import { pool } from "../../config/db";
import { Database } from "../../types/database.type";
import { IAdminUpdateCoupon } from "../../interfaces/coupon.interface";

export class UpdateCouponRepository {
  constructor(private db: Database = pool) {}

  async update(id: number, data: IAdminUpdateCoupon) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) {
      fields.push(`name = $${values.length + 1}`);
      values.push(data.name);
    }

    if (data.description !== undefined) {
      fields.push(`description = $${values.length + 1}`);
      values.push(data.description);
    }

    if (data.type !== undefined) {
      fields.push(`type = $${values.length + 1}`);
      values.push(data.type);
    }

    if (data.discount_percent !== undefined) {
      fields.push(`discount_percent = $${values.length + 1}`);
      values.push(data.discount_percent);
    }

    if (data.required_points !== undefined) {
      fields.push(`required_points = $${values.length + 1}`);
      values.push(data.required_points);
    }

    if (data.is_active !== undefined) {
      fields.push(`is_active = $${values.length + 1}`);
      values.push(data.is_active);
    }

    if (data.start_date !== undefined) {
      fields.push(`start_date = $${values.length + 1}`);
      values.push(data.start_date);
    }

    if (data.end_date !== undefined) {
      fields.push(`end_date = $${values.length + 1}`);
      values.push(data.end_date);
    }

    if (fields.length === 0) {
      throw new Error("No fields were provided for update.");
    }

    fields.push("updated_at = NOW()");

    values.push(id);

    const result = await this.db.query(
      `
      UPDATE coupons
      SET
        ${fields.join(", ")}

      WHERE id = $${values.length}

      RETURNING *
      `,
      values,
    );

    if (result.rowCount === 0) {
      throw new Error("Coupon not found.");
    }

    return result.rows[0];
  }
}
