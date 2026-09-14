import { pool } from "../../config/db";

export class DeletePermanentRepository {
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
        updated_at,
        deleted_at
      FROM services
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0];
  }

  async delete(id: number) {
    const result = await pool.query(
      `
      DELETE FROM services
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    return result.rows[0];
  }
}
