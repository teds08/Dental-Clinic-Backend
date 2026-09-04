import { pool } from "../../config/db";
import { Database } from "../../types/database.type";
import { IUpdateTestimonial } from "../../interfaces/testimonial.interface";

export class UpdateTestimonialRepository {
  constructor(private db: Database = pool) {}

  async update(
    testimonialId: number,
    userId: number,
    data: IUpdateTestimonial,
  ) {
    const result = await this.db.query(
      `
      UPDATE testimonials
      SET
        rating = COALESCE($1, rating),
        testimonial = COALESCE($2, testimonial),
        status = 'PENDING',
        updated_at = NOW()
      WHERE id = $3
        AND user_id = $4
        AND deleted_at IS NULL
      RETURNING *
      `,
      [data.rating, data.testimonial, testimonialId, userId],
    );

    return result.rows[0];
  }
}
