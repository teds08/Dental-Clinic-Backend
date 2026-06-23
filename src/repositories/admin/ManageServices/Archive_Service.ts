import { pool } from "../../../config/db";

export class SoftDeleteServiceRepository {

  async softDelete(id: number) {


    const result = await pool.query(
      `
      UPDATE services
      SET deleted_at = NOW(),
          updated_at = NOW()
      WHERE id = $1
      AND deleted_at IS NULL
      RETURNING *
      `,
      [id]
    );

    return result.rows[0];
  }

}