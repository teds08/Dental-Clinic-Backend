import { pool } from "../../../config/db";

export class RestoreServiceRepository {

  async restore(id: number) {

    const result = await pool.query(
      `
      UPDATE services
      SET deleted_at = NULL,
          updated_at = NOW()
      WHERE id = $1
      AND deleted_at IS NOT NULL
      RETURNING *
      `,
      [id]
    );

    return result.rows[0];
  }
}