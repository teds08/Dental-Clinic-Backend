import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class FindTestimonialRepository {
  constructor(private db: Database = pool) {}

  async findById(testimonialId: number) {
    const result = await this.db.query(
      `
      SELECT
        t.id,
        t.user_id,
        t.rating,
        t.testimonial,
        t.status,
        t.created_at,
        t.updated_at,
        t.deleted_at,
        u.first_name,
        u.last_name
      FROM testimonials t
      INNER JOIN users u
        ON u.id = t.user_id
      WHERE t.id = $1
        AND t.deleted_at IS NULL
      LIMIT 1
      `,
      [testimonialId],
    );

    return result.rows[0];
  }

  async findByIdAndUserId(testimonialId: number, userId: number) {
    const result = await this.db.query(
      `
      SELECT
        t.id,
        t.user_id,
        t.rating,
        t.testimonial,
        t.status,
        t.created_at,
        t.updated_at,
        t.deleted_at
      FROM testimonials t
      WHERE t.id = $1
        AND t.user_id = $2
        AND t.deleted_at IS NULL
      LIMIT 1
      `,
      [testimonialId, userId],
    );

    return result.rows[0];
  }

  async findMyTestimonials(userId: number) {
    const result = await this.db.query(
      `
      SELECT
        id,
        user_id,
        rating,
        testimonial,
        status,
        created_at,
        updated_at
      FROM testimonials
      WHERE user_id = $1
        AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [userId],
    );

    return result.rows;
  }

  async findApprovedTestimonials() {
    const result = await this.db.query(
      `
      SELECT
        t.id,
        t.rating,
        t.testimonial,
        t.created_at,
        u.first_name,
        u.last_name
      FROM testimonials t
      INNER JOIN users u
        ON u.id = t.user_id
      WHERE t.status = 'APPROVED'
        AND t.deleted_at IS NULL
        AND u.deleted_at IS NULL
      ORDER BY t.created_at DESC
      `,
    );

    return result.rows;
  }

  async findPendingTestimonials() {
    const result = await this.db.query(
      `
      SELECT
        t.id,
        t.user_id,
        t.rating,
        t.testimonial,
        t.status,
        t.created_at,
        t.updated_at,
        u.first_name,
        u.last_name,
        u.email
      FROM testimonials t
      INNER JOIN users u
        ON u.id = t.user_id
      WHERE t.status = 'PENDING'
        AND t.deleted_at IS NULL
        AND u.deleted_at IS NULL
      ORDER BY t.created_at ASC
      `,
    );

    return result.rows;
  }

  async findApprovedById(testimonialId: number) {
    const result = await this.db.query(
      `
    SELECT
      t.id,
      t.rating,
      t.testimonial,
      t.created_at,
      u.first_name,
      u.last_name
    FROM testimonials t
    INNER JOIN users u
      ON u.id = t.user_id
    WHERE t.id = $1
      AND t.status = 'APPROVED'
      AND t.deleted_at IS NULL
      AND u.deleted_at IS NULL
    LIMIT 1
    `,
      [testimonialId],
    );

    return result.rows[0];
  }
}
