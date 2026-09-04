import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class ModerateTestimonialRepository {
  constructor(private db: Database = pool) {}

  async approve(testimonialId: number) {
    const result = await this.db.query(
      `
      UPDATE testimonials
      SET
        status = 'APPROVED',
        updated_at = NOW()
      WHERE id = $1
        AND status = 'PENDING'
        AND deleted_at IS NULL
      RETURNING *
      `,
      [testimonialId],
    );

    return result.rows[0];
  }

  async reject(testimonialId: number) {
    const result = await this.db.query(
      `
      UPDATE testimonials
      SET
        status = 'REJECTED',
        updated_at = NOW()
      WHERE id = $1
        AND status = 'PENDING'
        AND deleted_at IS NULL
      RETURNING *
      `,
      [testimonialId],
    );

    return result.rows[0];
  }
}
