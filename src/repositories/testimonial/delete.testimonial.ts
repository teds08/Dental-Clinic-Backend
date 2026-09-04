import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class DeleteTestimonialRepository {
  constructor(private db: Database = pool) {}

  async delete(testimonialId: number, userId: number) {
    const result = await this.db.query(
      `
      UPDATE testimonials
      SET
        deleted_at = NOW(),
        updated_at = NOW()
      WHERE id = $1
        AND user_id = $2
        AND deleted_at IS NULL
      RETURNING *
      `,
      [testimonialId, userId],
    );

    return result.rows[0];
  }
}
