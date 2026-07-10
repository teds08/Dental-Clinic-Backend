import { pool } from "../../../config/db";

export class FindServiceRepository {

  async findById(id: number) {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        description,
        price,
        points,
        duration_minutes,
        image,
        image_public_id,
        created_at,
        updated_at
      FROM services
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [id]
    );

    return result.rows[0];

  }

}