import { pool } from "../../config/db";
import { Database } from "../../types/database.type";
import { ICreateTestimonial } from "../../interfaces/testimonial.interface";

export class CreateTestimonialRepository {
  constructor(private db: Database = pool) {}

  async create(userId: number, data: ICreateTestimonial) {
    const result = await this.db.query(
      `
      INSERT INTO testimonials
      (
        user_id,
        rating,
        testimonial
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *
      `,
      [userId, data.rating, data.testimonial],
    );

    return result.rows[0];
  }
}
