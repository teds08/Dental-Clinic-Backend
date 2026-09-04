import { pool } from "../../config/db";

export class RestoreUserRepository {
  async restore(id: number) {
    const result = await pool.query(
      `
    UPDATE users
    SET
      deleted_at = NULL,
      updated_at = NOW()
    WHERE id = $1
      AND deleted_at IS NOT NULL
    RETURNING
      id,
      first_name,
      last_name,
      updated_at
    `,
      [id],
    );

    return result.rows[0];
  }
}
