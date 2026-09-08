import { pool } from "../../config/db";

export class FindServiceRepository {
  async findById(id: number) {
    const result = await pool.query(
      `
      SELECT
        id,
        image,
        image_public_id,
        title,
        description,
        category,
        price,
        points,
        duration_minutes,
        created_at,
        updated_at
      FROM services
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [id],
    );

    return result.rows[0];
  }
}
